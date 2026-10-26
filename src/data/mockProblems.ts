import { Problem } from '../types';

export const MOCK_PROBLEMS: Problem[] = [
  {
    id: 'prob-fullstack-collab',
    title: 'Collaborative Document Editor',
    category: 'full-stack',
    categoryLabel: 'Full-Stack',
    difficulty: 'Advanced',
    scalabilityRating: 9,
    scalabilityTier: '100K Users',
    estimatedMinutes: 60,
    summary: 'Build a real-time collaborative document editor that syncs text changes and cursor positions without conflicts.',
    detailedDescription: `In this full-stack challenge, you will implement the core synchronization engine for a Google Docs-style real-time collaborative workspace.

### Core Architecture Requirements:
1. **Frontend Editor View (\`client/Editor.tsx\`)**:
   - Render document text with visual remote user cursor indicators.
   - Dispatch character insertion/deletion deltas to the backend over WebSocket.
2. **Backend Server (\`server/otServer.ts\`)**:
   - Maintain client revision state vector.
   - Transform incoming operations against unacknowledged client revisions using Operational Transformation.
   - Broadcast transformed ops to all connected session peers.
3. **Storage & Persistence (\`db/schema.sql\` & \`db/store.ts\`)**:
   - Snapshot document state periodically and log append-only operation journals.`,
    architectureRequirements: [
      'Implement transformOp(op1, op2) to reconcile concurrent string offsets',
      'Handle out-of-order packet delivery without document desynchronization',
      'Optimize WebSocket broadcast latency below 25ms under 500 connected peers per doc',
      'Ensure in-memory state can safely hydrate from SQL snapshot on server restart'
    ],
    tags: ['React', 'WebSocket', 'Concurrency', 'Operational Transformation', 'Full-Stack'],
    suggestedFollowUps: [
      {
        id: 'fu-fs-1',
        title: 'Redis Pub/Sub Socket Cluster Sharding',
        complexity: 'High',
        category: 'Scalability',
        description: 'Scale out WebSocket servers horizontally across 20 nodes using Redis Pub/Sub channels per document session.',
        architecturalImpact: 'Allows document rooms to span multiple container instances without state loss.',
        starterSnippet: `// Redis Adapter Fanout
import Redis from 'ioredis';
const pub = new Redis();
const sub = new Redis();
sub.subscribe('doc:channel:' + docId);
sub.on('message', (ch, msg) => broadcastLocalPeers(JSON.parse(msg)));`
      },
      {
        id: 'fu-fs-2',
        title: 'End-to-End Zero-Knowledge Payload Encryption (AES-GCM)',
        complexity: 'Medium',
        category: 'Security',
        description: 'Encrypt character deltas on the client so the central server can route operations without reading raw user text.',
        architecturalImpact: 'Guarantees enterprise zero-knowledge compliance for confidential documents.'
      },
      {
        id: 'fu-fs-3',
        title: 'Periodic Snapshot Compaction & S3 Cold Storage Archive',
        complexity: 'Medium',
        category: 'Resilience',
        description: 'Automatically compact the operation journal every 500 revisions and flush historical deltas to cold object storage.',
        architecturalImpact: 'Prevents unbounded PostgreSQL / SQLite disk growth over multi-year document lifecycles.'
      }
    ],
    files: [
      {
        id: 'f1',
        name: 'otServer.ts',
        path: 'server/otServer.ts',
        language: 'typescript',
        type: 'file',
        content: `// PrepMaster Sandbox: Server-side OT Engine
export interface Operation {
  type: 'insert' | 'delete';
  position: number;
  char?: string;
  revision: number;
  clientId: string;
}

export class DocumentSession {
  public content: string;
  public revision: number;
  private history: Operation[] = [];

  constructor(initialText = '') {
    this.content = initialText;
    this.revision = 0;
  }

  public applyClientOperation(incomingOp: Operation): { transformedOp: Operation; newRevision: number } {
    let transformed = { ...incomingOp };

    for (let i = incomingOp.revision; i < this.history.length; i++) {
      const pastOp = this.history[i];
      transformed = this.transform(transformed, pastOp);
    }

    if (transformed.type === 'insert' && transformed.char) {
      this.content =
        this.content.slice(0, transformed.position) +
        transformed.char +
        this.content.slice(transformed.position);
    } else if (transformed.type === 'delete') {
      this.content =
        this.content.slice(0, transformed.position) +
        this.content.slice(transformed.position + 1);
    }

    this.revision++;
    transformed.revision = this.revision;
    this.history.push(transformed);

    return { transformedOp: transformed, newRevision: this.revision };
  }

  public transform(op1: Operation, op2: Operation): Operation {
    const res = { ...op1 };
    if (op1.type === 'insert' && op2.type === 'insert') {
      if (op1.position > op2.position || (op1.position === op2.position && op1.clientId > op2.clientId)) {
        res.position += 1;
      }
    } else if (op1.type === 'insert' && op2.type === 'delete') {
      if (op1.position > op2.position) {
        res.position = Math.max(0, res.position - 1);
      }
    } else if (op1.type === 'delete' && op2.type === 'insert') {
      if (op1.position >= op2.position) {
        res.position += 1;
      }
    } else if (op1.type === 'delete' && op2.type === 'delete') {
      if (op1.position > op2.position) {
        res.position = Math.max(0, res.position - 1);
      }
    }
    return res;
  }
}`
      },
      {
        id: 'f2',
        name: 'Editor.tsx',
        path: 'client/Editor.tsx',
        language: 'typescript',
        type: 'file',
        content: `// PrepMaster Sandbox: Client Collaborative React Component
import React, { useState } from 'react';

export function CollaborativeEditor({ docId }: { docId: string }) {
  const [docText, setDocText] = useState("Hello world! Welcome to PrepMaster.");
  const [activeUsers] = useState(["Alice (Staff)", "Bob (Principal)"]);

  return (
    <div className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Session: {docId}</h2>
          <p className="text-xs text-slate-500">2 peers active • OT Synchronized</p>
        </div>
        <div className="flex gap-2">
          {activeUsers.map(user => (
            <span key={user} className="px-2 py-1 text-xs font-mono bg-blue-50 text-blue-700 border border-blue-200 rounded">
              {user}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <textarea
          value={docText}
          onChange={(e) => setDocText(e.target.value)}
          className="w-full h-48 p-4 font-mono text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Type here to test concurrent editing..."
        />
      </div>
    </div>
  );
}`
      },
      {
        id: 'f3',
        name: 'schema.sql',
        path: 'db/schema.sql',
        language: 'sql',
        type: 'file',
        content: `-- Persistence Schema for Document Store & Revision Log
CREATE TABLE documents (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  snapshot_content TEXT NOT NULL,
  current_revision INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE operation_journals (
  id BIGSERIAL PRIMARY KEY,
  document_id VARCHAR(64) REFERENCES documents(id),
  revision INT NOT NULL,
  client_id VARCHAR(64) NOT NULL,
  op_type VARCHAR(16) NOT NULL,
  op_payload JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`
      }
    ],
    testCases: [
      {
        id: 'tc-ot-1',
        name: 'Concurrent Insertion at Same Index with Tie-Breaking',
        type: 'unit',
        description: 'Two users simultaneously insert a character at index 0 on revision 0. Verifies deterministic client ID tie-breaking.',
        input: 'Alice inserts "A" at pos 0; Bob inserts "B" at pos 0',
        expectedOutput: 'Document matches deterministic converged sequence "AB" or "BA" across both client views',
        status: 'passed',
        executionTimeMs: 12,
        explanation: 'Operational Transformation requires deterministic ordering when two insertions occur at identical indices to prevent divergent document forks.'
      },
      {
        id: 'tc-ot-2',
        name: 'Interleaved Delete & Insert Boundary Conditions',
        type: 'edge-case',
        description: 'User A deletes index 3 while User B inserts at index 3 concurrently.',
        input: 'doc="cat"; User A deletes pos 2 ("t"); User B inserts "s" at pos 2',
        expectedOutput: 'doc="cas" without index out-of-bounds or lost updates',
        status: 'passed',
        executionTimeMs: 18,
        explanation: 'Tests position adjustment arithmetic when delete and insert operations intersect on the same cursor boundaries.'
      },
      {
        id: 'tc-ot-3',
        name: 'High-Throughput Concurrency (500 Ops / 10ms)',
        type: 'scalability',
        description: 'Simulates 500 interleaved client operations on a single document to evaluate revision tree replay overhead.',
        input: '500 operations generated from 20 simulated workers simultaneously',
        expectedOutput: 'All 20 workers converge on identical string hash in < 45ms',
        status: 'passed',
        executionTimeMs: 38,
        explanation: 'Evaluates algorithmic scalability of linear operation history replay. Passing indicates O(K) transformation step efficiency.'
      }
    ],
    aiHintLevels: [
      {
        level: 1,
        name: 'Conceptual Nudge',
        description: 'Mental model prompt.',
        content: 'Consider how two operations occurring at the same timestamp affect character indices.'
      },
      {
        level: 2,
        name: 'Structural Direction',
        description: 'State vector layout.',
        content: 'Store an append-only array of past committed operations with their revisions.'
      },
      {
        level: 3,
        name: 'Algorithmic Pseudocode',
        description: 'Step-by-step logic.',
        content: `function transform(incoming, past):
  if incoming.isInsert and past.isInsert:
    if incoming.pos > past.pos or (incoming.pos == past.pos and incoming.clientId > past.clientId):
      incoming.pos += 1
  return incoming`
      },
      {
        level: 4,
        name: 'Deep Review',
        description: 'Complete code review.',
        content: 'Ensure tie-breaking uses client ID lexicographical comparison to guarantee strict symmetry.'
      }
    ],
    defenseQuestions: [
      {
        id: 'def-1',
        question: 'Why did you choose Operational Transformation (OT) over Conflict-Free Replicated Data Types (CRDTs) like Yjs or Automerge for this design?',
        context: 'System Architecture & Trade-offs',
        idealAnswerHighlights: [
          'OT has smaller memory overhead per character than state-based CRDTs (no tombstone proliferation)',
          'Centralized server architecture makes OT easy to coordinate since the server is the single source of revision truth',
          'CRDTs excel in peer-to-peer / decentralized scenarios, whereas OT is lighter for central SaaS platforms like Google Docs'
        ]
      }
    ]
  },

  /* NEW: DSA QUESTION 1 */
  {
    id: 'prob-dsa-scheduler',
    title: 'Task Dependency Scheduler',
    category: 'dsa',
    categoryLabel: 'Algorithms',
    difficulty: 'Advanced',
    scalabilityRating: 9,
    scalabilityTier: '50K Tasks',
    estimatedMinutes: 50,
    summary: 'Build a task scheduler that detects circular dependencies and runs independent tasks in parallel.',
    detailedDescription: `Modern build systems (Bazel, Gradle) and task orchestrators (Airflow) require topological DAG scheduling.

### Problem Requirements:
1. **Dependency Resolution**:
   - Given \`N\` tasks and directed edges \`A -> B\` (Task B depends on Task A), compute a valid linear execution order.
2. **Cycle Detection & Deadlock Recovery**:
   - Detect circular dependencies (e.g. \`A -> B -> C -> A\`). If a cycle exists, return the exact cycle node path.
3. **Parallel Level Batching**:
   - Group tasks into parallel execution batches where all tasks at level \`L\` can be executed simultaneously.`,
    architectureRequirements: [
      'In-degree array + Queue (Kahn’s Algorithm) for O(V + E) complexity',
      'Cycle path reconstruction using Tarjan or 3-color DFS (White, Gray, Black)',
      'Parallel stage batching grouping tasks with zero remaining unmet dependencies',
      'Zero recursion stack overflow on 10,000 deep linear chains'
    ],
    tags: ['DSA', 'Graph Theory', 'Topological Sort', 'DAG', 'Concurrency'],
    suggestedFollowUps: [
      {
        id: 'fu-dsa-1',
        title: 'Dynamic Incremental Node Invalidation',
        complexity: 'High',
        category: 'Scalability',
        description: 'When a single file changes in a 50k-node graph, compute only downstream dirty nodes to minimize re-execution.',
        architecturalImpact: 'Transforms full builds into sub-second incremental builds like Bazel.'
      },
      {
        id: 'fu-dsa-2',
        title: 'Priority-Weighted Critical Path Scheduling',
        complexity: 'Medium',
        category: 'Extensibility',
        description: 'Assign weights (estimated execution duration) to nodes and schedule along the critical path to minimize total make-span.',
        architecturalImpact: 'Enables deterministic critical path optimization across distributed job clusters.'
      }
    ],
    files: [
      {
        id: 'f-dsa-1',
        name: 'taskScheduler.ts',
        path: 'src/taskScheduler.ts',
        language: 'typescript',
        type: 'file',
        content: `// PrepMaster DSA: Topological Task Graph Scheduler
export interface DependencyEdge {
  from: string; // Prerequisite task
  to: string;   // Dependent task
}

export interface SchedulePlan {
  valid: boolean;
  linearOrder: string[];
  parallelBatches: string[][];
  detectedCycle?: string[];
}

export class TaskScheduler {
  private adjList: Map<string, string[]> = new Map();
  private inDegree: Map<string, number> = new Map();
  private allNodes: Set<string> = new Set();

  public addTask(taskId: string) {
    this.allNodes.add(taskId);
    if (!this.adjList.has(taskId)) this.adjList.set(taskId, []);
    if (!this.inDegree.has(taskId)) this.inDegree.set(taskId, 0);
  }

  public addDependency(from: string, to: string) {
    this.addTask(from);
    this.addTask(to);
    this.adjList.get(from)!.push(to);
    this.inDegree.set(to, (this.inDegree.get(to) || 0) + 1);
  }

  // TODO: Compute Kahn's algorithm and parallel batches
  public computeSchedule(): SchedulePlan {
    const queue: string[] = [];
    const inDegreeCopy = new Map(this.inDegree);
    const linearOrder: string[] = [];
    const parallelBatches: string[][] = [];

    // Initialize with 0 in-degree nodes
    for (const [node, deg] of inDegreeCopy.entries()) {
      if (deg === 0) queue.push(node);
    }

    while (queue.length > 0) {
      const batchSize = queue.length;
      const currentBatch: string[] = [];

      for (let i = 0; i < batchSize; i++) {
        const u = queue.shift()!;
        currentBatch.push(u);
        linearOrder.push(u);

        for (const v of this.adjList.get(u) || []) {
          const newDeg = inDegreeCopy.get(v)! - 1;
          inDegreeCopy.set(v, newDeg);
          if (newDeg === 0) queue.push(v);
        }
      }

      parallelBatches.push(currentBatch);
    }

    // Cycle check
    if (linearOrder.length < this.allNodes.size) {
      return {
        valid: false,
        linearOrder: [],
        parallelBatches: [],
        detectedCycle: Array.from(this.allNodes).filter(n => (inDegreeCopy.get(n) || 0) > 0)
      };
    }

    return { valid: true, linearOrder, parallelBatches };
  }
}`
      }
    ],
    testCases: [
      {
        id: 'tc-dsa-1',
        name: 'Diamond Dependency Parallel Stages',
        type: 'unit',
        description: 'Tests A -> B, A -> C, B -> D, C -> D. B and C should execute in the same parallel batch.',
        input: 'Tasks: A, B, C, D with diamond topology',
        expectedOutput: 'Batch 1: [A], Batch 2: [B, C], Batch 3: [D]',
        status: 'passed',
        executionTimeMs: 4,
        explanation: 'Confirms that tasks at equal dependency depths are grouped for parallel thread execution.'
      },
      {
        id: 'tc-dsa-2',
        name: 'Circular Deadlock Detection',
        type: 'edge-case',
        description: 'Constructs triangle cycle A -> B -> C -> A and verifies invalid schedule with cycle nodes identified.',
        input: 'A -> B, B -> C, C -> A',
        expectedOutput: 'valid=false, detectedCycle contains [A, B, C]',
        status: 'passed',
        executionTimeMs: 3,
        explanation: 'Ensures pipeline terminates immediately rather than deadlocking on mutual dependencies.'
      }
    ],
    aiHintLevels: [
      {
        level: 1,
        name: 'Conceptual Nudge',
        description: 'In-degree intuition.',
        content: 'Which tasks have zero prerequisites? Those are the only tasks you can start with.'
      },
      {
        level: 2,
        name: 'Structural Direction',
        description: 'Queue and BFS.',
        content: 'When a prerequisite finishes, decrement the in-degree of its neighbors. Any neighbor reaching 0 can be added to the queue.'
      },
      {
        level: 3,
        name: 'Algorithmic Pseudocode',
        description: 'Kahn’s Batching.',
        content: `while queue is not empty:
  level = snapshot(queue)
  empty queue
  for node in level:
    decrement neighbors
  batches.push(level)`
      },
      {
        level: 4,
        name: 'Deep Review',
        description: 'Cycle path tracing.',
        content: 'To return the exact cycle sequence, use DFS with a recursion stack set (Gray nodes).'
      }
    ],
    defenseQuestions: [
      {
        id: 'def-dsa-1',
        question: 'Why would Kahn’s algorithm be preferred over recursive DFS topological sort in a production distributed orchestrator?',
        context: 'Algorithmic Complexity & Stack Safety',
        idealAnswerHighlights: [
          'Kahn’s algorithm naturally partitions tasks into parallel execution stages batch by batch',
          'Avoids call-stack overflow on deep graphs (DFS requires O(V) stack frames)',
          'Simpler integration with async thread pools where 0 in-degree nodes map directly to ready workers'
        ]
      }
    ]
  },

  /* NEW: QUANT MATH & PROBABILITY QUESTION 1 */
  {
    id: 'prob-quant-montecarlo',
    title: 'Monte Carlo Option Pricing',
    category: 'quant',
    categoryLabel: 'Math & Quant',
    difficulty: 'Advanced',
    scalabilityRating: 9,
    scalabilityTier: '10M Paths',
    estimatedMinutes: 55,
    summary: 'Simulate stock price movements using Monte Carlo methods to calculate European option prices.',
    detailedDescription: `Quantitative trading desks price non-linear derivatives using stochastic simulations.

### Mathematical & Probability Requirements:
1. **Geometric Brownian Motion (GBM)**:
   $$S_T = S_0 \\exp\\left(\\left(r - \\frac{1}{2}\\sigma^2\\right)T + \\sigma \\sqrt{T} Z\\right)$$
   where $Z \\sim \\mathcal{N}(0, 1)$ standard normal variable.
2. **Standard Normal Sampling (Box-Muller Transform)**:
   Generate standard normal variates from uniform random numbers without external libraries:
   $$Z_0 = \\sqrt{-2 \\ln U_1} \\cos(2\\pi U_2)$$
3. **Variance Reduction (Antithetic Variates)**:
   Pair each random path with its negation $-Z$ to double convergence speed and reduce standard error.
4. **Discounted Payoff Expectation**:
   $$\\text{Call} = e^{-rT} \\mathbb{E}[\\max(S_T - K, 0)]$$`,
    architectureRequirements: [
      'Box-Muller pseudorandom standard normal generator',
      'Antithetic variates variance reduction yielding 50% tighter 95% confidence intervals',
      'Memory streaming paths without storing 10M floats in heap memory simultaneously',
      'Sub-50ms execution for 100,000 paths'
    ],
    tags: ['Quant', 'Math', 'Probability', 'Monte Carlo', 'Stochastic Calculus', 'Finance'],
    suggestedFollowUps: [
      {
        id: 'fu-mc-1',
        title: 'Quasi-Monte Carlo with Sobol Low-Discrepancy Sequences',
        complexity: 'High',
        category: 'Scalability',
        description: 'Replace standard pseudo-random sampling with Sobol low-discrepancy sequences to accelerate convergence from O(1/sqrt(N)) to O(1/N).',
        architecturalImpact: 'Achieves identical pricing precision with 10x fewer sample paths.'
      },
      {
        id: 'fu-mc-2',
        title: 'Greeks Sensitivity Calculation (Delta & Gamma via Pathwise Derivatives)',
        complexity: 'Medium',
        category: 'Extensibility',
        description: 'Compute risk sensitivities dV/dS (Delta) and d2V/dS2 (Gamma) concurrently within the path simulation loop.',
        architecturalImpact: 'Allows real-time delta hedging without re-running distinct bumped simulations.'
      }
    ],
    files: [
      {
        id: 'f-mc-1',
        name: 'monteCarloPricer.ts',
        path: 'src/monteCarloPricer.ts',
        language: 'typescript',
        type: 'file',
        content: `// PrepMaster Quant: Monte Carlo Stochastic Option Pricer
export interface OptionParameters {
  spot: number;         // S0
  strike: number;       // K
  riskFreeRate: number; // r (e.g. 0.05)
  volatility: number;   // sigma (e.g. 0.20)
  timeToExpiry: number; // T in years (e.g. 1.0)
  numPaths: number;     // e.g. 100,000
}

export interface PricingResult {
  callPrice: number;
  putPrice: number;
  standardError: number;
  confidenceInterval95: [number, number];
}

export class MonteCarloOptionEngine {
  // Box-Muller transform: converts U(0,1) -> N(0,1)
  private sampleStandardNormal(): [number, number] {
    const u1 = Math.max(1e-15, Math.random());
    const u2 = Math.random();
    const mag = Math.sqrt(-2.0 * Math.log(u1));
    const z0 = mag * Math.cos(2.0 * Math.PI * u2);
    const z1 = mag * Math.sin(2.0 * Math.PI * u2);
    return [z0, z1];
  }

  public priceOption(params: OptionParameters): PricingResult {
    const { spot, strike, riskFreeRate, volatility, timeToExpiry, numPaths } = params;

    const drift = (riskFreeRate - 0.5 * volatility * volatility) * timeToExpiry;
    const diffusion = volatility * Math.sqrt(timeToExpiry);
    const discount = Math.exp(-riskFreeRate * timeToExpiry);

    let sumCallPayoffs = 0;
    let sumSquaredCallPayoffs = 0;
    let sumPutPayoffs = 0;

    // Simulate in pairs using Antithetic Variates (+Z, -Z)
    const pairs = Math.floor(numPaths / 2);

    for (let i = 0; i < pairs; i++) {
      const [z] = this.sampleStandardNormal();

      // Path 1 (+Z)
      const sT1 = spot * Math.exp(drift + diffusion * z);
      const call1 = Math.max(0, sT1 - strike);
      const put1 = Math.max(0, strike - sT1);

      // Path 2 (-Z) Antithetic pair
      const sT2 = spot * Math.exp(drift - diffusion * z);
      const call2 = Math.max(0, sT2 - strike);
      const put2 = Math.max(0, strike - sT2);

      const avgCall = 0.5 * (call1 + call2);
      sumCallPayoffs += avgCall;
      sumSquaredCallPayoffs += avgCall * avgCall;
      sumPutPayoffs += 0.5 * (put1 + put2);
    }

    const meanCall = (sumCallPayoffs / pairs) * discount;
    const meanPut = (sumPutPayoffs / pairs) * discount;

    const variance = (sumSquaredCallPayoffs / pairs - Math.pow(sumCallPayoffs / pairs, 2)) * discount * discount;
    const standardError = Math.sqrt(Math.max(0, variance) / pairs);

    return {
      callPrice: parseFloat(meanCall.toFixed(4)),
      putPrice: parseFloat(meanPut.toFixed(4)),
      standardError: parseFloat(standardError.toFixed(4)),
      confidenceInterval95: [
        parseFloat((meanCall - 1.96 * standardError).toFixed(4)),
        parseFloat((meanCall + 1.96 * standardError).toFixed(4))
      ]
    };
  }
}`
      }
    ],
    testCases: [
      {
        id: 'tc-mc-1',
        name: 'Black-Scholes Analytic Convergence (Call Strike 100)',
        type: 'unit',
        description: 'S0=100, K=100, r=5%, vol=20%, T=1yr. Analytic Black-Scholes price is ~10.45.',
        input: 'spot=100, strike=100, r=0.05, vol=0.20, T=1.0, paths=100000',
        expectedOutput: 'Call price within [10.35, 10.55] with standard error < 0.05',
        status: 'passed',
        executionTimeMs: 16,
        explanation: 'Stochastic path average converges to the risk-neutral discounted expectation per the Law of Large Numbers.'
      },
      {
        id: 'tc-mc-2',
        name: 'Put-Call Parity Invariant Verification',
        type: 'unit',
        description: 'Verifies Put-Call Parity: C - P = S0 - K * exp(-rT).',
        input: 'Evaluates C - P against S0 - K * exp(-rT) with S0=100, K=100',
        expectedOutput: '| (C - P) - (S0 - K*exp(-rT)) | < 0.10',
        status: 'passed',
        executionTimeMs: 14,
        explanation: 'Guarantees no-arbitrage boundary conditions hold across simulated stochastic trajectories.'
      }
    ],
    aiHintLevels: [
      {
        level: 1,
        name: 'Conceptual Nudge',
        description: 'Risk-neutral pricing.',
        content: 'Why is the expected return of the stock in Monte Carlo set to the risk-free rate r rather than the historical drift mu?'
      },
      {
        level: 2,
        name: 'Structural Direction',
        description: 'Antithetic variates.',
        content: 'Generate Z from Box-Muller. Compute two paths: exp(drift + diff*Z) and exp(drift - diff*Z). Their negative correlation halves the sample variance.'
      },
      {
        level: 3,
        name: 'Algorithmic Pseudocode',
        description: 'Expectation loop.',
        content: `for each pair:
  z = normal()
  s1 = S0 * exp(drift + vol * sqrt(T) * z)
  s2 = S0 * exp(drift - vol * sqrt(T) * z)
  payoff = 0.5 * (max(0, s1 - K) + max(0, s2 - K))
  accumulate(payoff)`
      },
      {
        level: 4,
        name: 'Deep Review',
        description: 'Standard Error calculation.',
        content: 'Standard error equals sqrt(sample_variance / N). By Central Limit Theorem, the 95% CI is Mean +/- 1.96 * SE.'
      }
    ],
    defenseQuestions: [
      {
        id: 'def-mc-1',
        question: 'Under what circumstances would you use Monte Carlo simulation instead of solving the Black-Scholes PDE using Finite Difference Methods (FDM) or analytic formulas?',
        context: 'Quantitative Systems & Mathematical Finance',
        idealAnswerHighlights: [
          'High dimensionality: When pricing multi-asset basket options (e.g., rainbow options on 30 stocks), FDM suffers from the curse of dimensionality O(M^D), while Monte Carlo convergence O(1/sqrt(N)) is independent of dimension',
          'Path dependency: Monte Carlo easily handles exotic path-dependent features like Asian options (arithmetic average) and lookback barriers',
          'Stochastic volatility and jumps (e.g., Heston or Merton jump diffusion) where closed-form solutions do not exist'
        ]
      }
    ]
  },

  /* NEW: QUANT MATH & PROBABILITY QUESTION 2 */
  {
    id: 'prob-quant-markov',
    title: 'Markov Chain Probability Simulator',
    category: 'quant',
    categoryLabel: 'Math & Quant',
    difficulty: 'Intermediate',
    scalabilityRating: 8,
    scalabilityTier: 'Fast Matrix Ops',
    estimatedMinutes: 45,
    summary: 'Model state transitions to compute long-term steady states and calculate gambler ruin chances.',
    detailedDescription: `Probability theory and discrete stochastic processes are foundational for quant trading and risk modelling.

### Mathematical Requirements:
1. **Transition Matrix & Stochastic Properties**:
   - Verify row stochasticity: $\\sum_j P_{ij} = 1$.
2. **Stationary Distribution ($\pi P = \pi$)**:
   - Compute the long-run equilibrium distribution via power iteration: $\pi^{(k+1)} = \pi^{(k)} P$.
3. **Gambler\'s Ruin Absorbing Markov Chain**:
   - A player starts with $\$k$ and bets $\$1$ each turn with win probability $p$ and lose probability $q = 1 - p$.
   - Goal is $\$N$ or ruin at $\$0$. Compute exact probability of absorption at $\$N$:
     $$P(\\text{Reach } N) = \\frac{1 - (q/p)^k}{1 - (q/p)^N} \\quad (p \\neq q)$$`,
    architectureRequirements: [
      'Dense transition probability matrix multiplication with floating-point tolerance check',
      'Power iteration convergence detector: $\\|\\pi^{(t+1)} - \\pi^{(t)}\\|_1 < 10^{-9}$',
      'Analytic closed-form vs stochastic path Monte Carlo validation',
      'O(N^3) matrix inversion / O(K) absorbing boundary computation'
    ],
    tags: ['Quant', 'Math', 'Probability', 'Markov Chains', 'Linear Algebra', 'Stochastics'],
    suggestedFollowUps: [
      {
        id: 'fu-mk-1',
        title: 'Continuous-Time Markov Chains (CTMC) & Infinitesimal Generators',
        complexity: 'High',
        category: 'Extensibility',
        description: 'Extend discrete steps to Poisson arrival times with generator matrix Q where P(t) = exp(Qt).',
        architecturalImpact: 'Allows modeling of high-frequency limit order book queue depletion rates.'
      }
    ],
    files: [
      {
        id: 'f-mk-1',
        name: 'markovEngine.ts',
        path: 'src/markovEngine.ts',
        language: 'typescript',
        type: 'file',
        content: `// PrepMaster Quant: Markov Chain Probability Engine
export class MarkovChain {
  private matrix: number[][];
  private size: number;

  constructor(transitionMatrix: number[][]) {
    this.matrix = transitionMatrix;
    this.size = transitionMatrix.length;
    this.validateStochastic();
  }

  private validateStochastic() {
    for (let r = 0; r < this.size; r++) {
      const rowSum = this.matrix[r].reduce((a, b) => a + b, 0);
      if (Math.abs(rowSum - 1.0) > 1e-6) {
        throw new Error(\`Row \${r} does not sum to 1.0 (got \${rowSum})\`);
      }
    }
  }

  // Power iteration: pi * P = pi
  public computeStationaryDistribution(maxIter = 500, epsilon = 1e-9): number[] {
    let pi = new Array(this.size).fill(1 / this.size);

    for (let iter = 0; iter < maxIter; iter++) {
      const nextPi = new Array(this.size).fill(0);
      for (let j = 0; j < this.size; j++) {
        for (let i = 0; i < this.size; i++) {
          nextPi[j] += pi[i] * this.matrix[i][j];
        }
      }

      // Check L1 convergence
      let diff = 0;
      for (let i = 0; i < this.size; i++) diff += Math.abs(nextPi[i] - pi[i]);
      pi = nextPi;

      if (diff < epsilon) break;
    }

    return pi.map(v => parseFloat(v.toFixed(6)));
  }

  // Gambler's Ruin Closed-Form Probability
  public static gamblersRuin(initialWealth: number, targetWealth: number, winProb: number): number {
    const k = initialWealth;
    const N = targetWealth;
    const p = winProb;
    const q = 1 - p;

    if (Math.abs(p - 0.5) < 1e-8) {
      return k / N;
    }

    const ratio = q / p;
    return (1 - Math.pow(ratio, k)) / (1 - Math.pow(ratio, N));
  }
}`
      }
    ],
    testCases: [
      {
        id: 'tc-mk-1',
        name: 'Ergodic 2-State Weather Markov Stationary Distribution',
        type: 'unit',
        description: 'Matrix [[0.7, 0.3], [0.4, 0.6]]. Theoretical steady state is [4/7, 3/7] ~= [0.5714, 0.4286].',
        input: 'P = [[0.7, 0.3], [0.4, 0.6]]',
        expectedOutput: 'pi ~= [0.571429, 0.428571]',
        status: 'passed',
        executionTimeMs: 2,
        explanation: 'Validates that iterative vector-matrix multiplications converge to the unique left-eigenvector corresponding to eigenvalue 1.'
      },
      {
        id: 'tc-mk-2',
        name: 'Unfair Gambler Ruin Probability Boundary Verification',
        type: 'unit',
        description: 'k=2, N=5, p=0.4 (unfavorable). Verifies ruin formula matches theoretical value.',
        input: 'initial=2, target=5, p=0.4',
        expectedOutput: 'P(Reach 5) ~= 0.0864',
        status: 'passed',
        executionTimeMs: 1,
        explanation: 'Tests absorption probability calculations in finite state birth-death processes.'
      }
    ],
    aiHintLevels: [
      {
        level: 1,
        name: 'Conceptual Nudge',
        description: 'Long-run memorylessness.',
        content: 'In an irreducible, aperiodic Markov chain, the initial state distribution is forgotten after many steps.'
      },
      {
        level: 2,
        name: 'Structural Direction',
        description: 'Vector-Matrix multiplication.',
        content: 'Multiply row vector pi by matrix P repeatedly. Each entry j is sum(pi[i] * P[i][j]).'
      },
      {
        level: 3,
        name: 'Algorithmic Pseudocode',
        description: 'Convergence check.',
        content: `while diff > 1e-9:
  nextPi = pi * P
  diff = sum(abs(nextPi - pi))
  pi = nextPi`
      },
      {
        level: 4,
        name: 'Deep Review',
        description: 'Perron-Frobenius Theorem.',
        content: 'By the Perron-Frobenius theorem, a row-stochastic matrix has a maximum eigenvalue of 1 with a non-negative eigenvector.'
      }
    ],
    defenseQuestions: [
      {
        id: 'def-mk-1',
        question: 'Under what condition does a Markov chain fail to have a unique stationary distribution?',
        context: 'Stochastic Processes & Mathematical Proofs',
        idealAnswerHighlights: [
          'Reducible chains: If the chain has multiple disjoint closed communicating classes (absorbing sub-graphs), the stationary distribution depends on the starting state',
          'Periodicity: If the chain is periodic (e.g. bipartite graph switching between 2 states), the state probabilities oscillate rather than settling, though time-averaged Cesaro limits still hold'
        ]
      }
    ]
  },

  {
    id: 'prob-api-ratelimit',
    title: 'API Rate Limiter & Idempotency Key',
    category: 'api-design',
    categoryLabel: 'API Design',
    difficulty: 'Intermediate',
    scalabilityRating: 8,
    scalabilityTier: '50K req/s',
    estimatedMinutes: 45,
    summary: 'Build an API rate limiter that restricts requests per second and prevents duplicate submissions.',
    detailedDescription: `High-scale payment and webhook APIs require robust defenses against double-spending and abuse.`,
    architectureRequirements: [
      'Implement atomic Redis-style sorted set logic in memory',
      'Idempotency state machine: PENDING -> RESOLVED / FAILED with 24-hour TTL',
      'Return RFC 7807 compliant Problem Details error bodies',
      'Benchmark p99 middleware overhead < 1.8ms under 20,000 requests/sec'
    ],
    tags: ['API Design', 'Rate Limiting', 'Idempotency', 'Concurrency', 'Redis'],
    suggestedFollowUps: [
      {
        id: 'fu-api-1',
        title: 'Sliding Window Counter Hybrid Compression',
        complexity: 'Medium',
        category: 'Scalability',
        description: 'Switch from sliding window log to sliding window counter to slash Redis memory by 90% under 10M active IP addresses.',
        architecturalImpact: 'Reduces memory per client from O(N timestamps) to O(1) two counter integers.'
      }
    ],
    files: [
      {
        id: 'f-rl-1',
        name: 'rateLimiter.ts',
        path: 'src/rateLimiter.ts',
        language: 'typescript',
        type: 'file',
        content: `export class SlidingWindowRateLimiter {
  private windowMs: number;
  private maxRequests: number;
  private requestLogs: Map<string, number[]> = new Map();

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  public checkRateLimit(clientId: string, now = Date.now()) {
    let timestamps = this.requestLogs.get(clientId) || [];
    const windowStart = now - this.windowMs;
    timestamps = timestamps.filter(ts => ts > windowStart);

    if (timestamps.length >= this.maxRequests) {
      return { allowed: false, remaining: 0 };
    }
    timestamps.push(now);
    this.requestLogs.set(clientId, timestamps);
    return { allowed: true, remaining: this.maxRequests - timestamps.length };
  }
}`
      }
    ],
    testCases: [
      {
        id: 'tc-rl-1',
        name: 'Within Limit Verification',
        type: 'unit',
        description: 'Sends 5 requests under maxRequests=10.',
        input: 'Client sends 5 requests',
        expectedOutput: 'allowed=true, remaining=5',
        status: 'passed',
        executionTimeMs: 2,
        explanation: 'Validates token decrementing.'
      }
    ],
    aiHintLevels: [
      { level: 1, name: 'Conceptual Nudge', description: 'Window bounds', content: 'Track individual timestamps.' },
      { level: 2, name: 'Structural Direction', description: 'Sorted set', content: 'Use timestamps as score.' },
      { level: 3, name: 'Pseudocode', description: 'Logic', content: 'Filter older than now - windowMs' },
      { level: 4, name: 'Deep Review', description: 'Scale', content: 'Use sliding window counters under 1M req/s' }
    ],
    defenseQuestions: [
      {
        id: 'def-rl-1',
        question: 'Under extreme high volume (1M req/s), sliding window log can consume excessive memory. How would you redesign this for lower RAM usage without losing accuracy?',
        context: 'System Scalability Trade-offs',
        idealAnswerHighlights: [
          'Switch from sliding window log to sliding window counter',
          'Reduces storage from O(N timestamps) to O(1) two counter integers per user',
          'Yields ~99.5% accuracy while reducing Redis memory usage by over 90%'
        ]
      }
    ]
  },
  {
    id: 'prob-lowlevel-lru',
    title: 'Fast In-Memory LRU Cache',
    category: 'low-level',
    categoryLabel: 'Systems',
    difficulty: 'Advanced',
    scalabilityRating: 10,
    scalabilityTier: '1M+ req/s',
    estimatedMinutes: 60,
    summary: 'Build an in-memory cache that evicts least recently used items and handles high-speed concurrent access.',
    detailedDescription: `Standard LRU implementations protect the doubly-linked list with a global mutex, severely bottlenecking multi-threaded throughput.

### Problem Requirements:
1. **Segmented Concurrency**:
   - Partition the key space into 16 independent stripes, each with its own local state.
2. **O(1) Time Complexity**:
   - \`get(key)\` and \`put(key, value)\` must execute in strict O(1) amortized time.
3. **Memory Bounding & Eviction**:
   - Strictly respect maximum capacity across all segments with sentinel nodes.`,
    architectureRequirements: [
      'Segmented lock striping to scale linearly across CPU cores',
      'Doubly linked list with dummy head and tail sentinel nodes to eliminate null checks',
      'Zero garbage collection spikes through node pooling reuse'
    ],
    tags: ['C++', 'Concurrency', 'LRU Cache', 'Lock Striping', 'Systems'],
    suggestedFollowUps: [
      {
        id: 'fu-lru-1',
        title: 'Asynchronous Window TinyLFU (W-TinyLFU) Admission Policy',
        complexity: 'High',
        category: 'Scalability',
        description: 'Implement a Count-Min Sketch frequency filter to prevent cache pollution from one-off sequential scans.',
        architecturalImpact: 'Boosts hit rates by 15-20% under zipfian access patterns like Caffeine cache.'
      }
    ],
    files: [
      {
        id: 'f-lru-1',
        name: 'stripedCache.ts',
        path: 'src/stripedCache.ts',
        language: 'typescript',
        type: 'file',
        content: `export class StripedLRUCache<K extends string, V> {
  private capacity: number;
  private map: Map<K, V> = new Map();

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  public get(key: K): V | undefined {
    if (!this.map.has(key)) return undefined;
    const val = this.map.get(key)!;
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }

  public put(key: K, value: V): void {
    if (this.map.has(key)) this.map.delete(key);
    else if (this.map.size >= this.capacity) {
      const oldestKey = this.map.keys().next().value;
      if (oldestKey) this.map.delete(oldestKey);
    }
    this.map.set(key, value);
  }
}`
      }
    ],
    testCases: [
      {
        id: 'tc-lru-1',
        name: 'O(1) Recency Refresh Invariant',
        type: 'unit',
        description: 'Verifies reading a key refreshes it to newest position.',
        input: 'put A, put B, get A, put C with cap=2',
        expectedOutput: 'B is evicted, A and C retained',
        status: 'passed',
        executionTimeMs: 2,
        explanation: 'Confirms that reading a key refreshes recency.'
      }
    ],
    aiHintLevels: [
      { level: 1, name: 'Conceptual Nudge', description: 'Lock granularity', content: 'Avoid global locks.' },
      { level: 2, name: 'Structural Direction', description: 'Sentinel nodes', content: 'Use dummy head and tail.' },
      { level: 3, name: 'Pseudocode', description: 'Node unlinking', content: 'node.prev.next = node.next' },
      { level: 4, name: 'Deep Review', description: 'Ring buffers', content: 'Record reads asynchronously.' }
    ],
    defenseQuestions: [
      {
        id: 'def-lru-1',
        question: 'What is the trade-off of lock striping when executing global cache operations like size() or clear()?',
        context: 'Concurrency Trade-offs',
        idealAnswerHighlights: [
          'Global operations require acquiring locks across all segments in deterministic order',
          'Risk of deadlocks if not acquired strictly 0 to N-1',
          'Global size becomes an approximation under high write contention'
        ]
      }
    ]
  },
  {
    id: 'prob-agent-react',
    title: 'AI Agent with Tool Calling',
    category: 'agentic-ai',
    categoryLabel: 'AI Systems',
    difficulty: 'Intermediate',
    scalabilityRating: 7,
    scalabilityTier: 'Agent Pipeline',
    estimatedMinutes: 50,
    summary: 'Build an AI loop that reasons about steps, calls available tools, and returns final answers safely.',
    detailedDescription: `Build an enterprise LLM agent orchestrator executing multi-turn tool calling pipelines.`,
    architectureRequirements: [
      'Pure deterministic state machine without unhandled exceptions',
      'Async tool execution pipeline with timeout cancellation',
      'Cyclic loop detection guardrail'
    ],
    tags: ['Agentic AI', 'LLM', 'Tool Calling', 'State Machine', 'Guardrails'],
    suggestedFollowUps: [
      {
        id: 'fu-ag-1',
        title: 'Human-In-The-Loop Approval Gates for Mutating Tools',
        complexity: 'Medium',
        category: 'Security',
        description: 'Introduce permission tiers where destructive tool calls pause execution for operator verification.',
        architecturalImpact: 'Prevents unauthorized financial or database mutations during autonomous runs.'
      }
    ],
    files: [
      {
        id: 'f-ag-1',
        name: 'agentEngine.ts',
        path: 'src/agentEngine.ts',
        language: 'typescript',
        type: 'file',
        content: `export class ReActAgent {
  private maxTurns = 5;
  public async run(query: string) {
    return { status: "SUCCESS", answer: "Synthesized result for " + query };
  }
}`
      }
    ],
    testCases: [
      {
        id: 'tc-ag-1',
        name: 'Loop Prevention Guardrail Under Hallucination',
        type: 'unit',
        description: 'Detects duplicate tool call with identical arguments.',
        input: 'query="Find port"',
        expectedOutput: 'Loop detector flags error without exceeding timeout',
        status: 'passed',
        executionTimeMs: 5,
        explanation: 'Ensures state machine transitions safely.'
      }
    ],
    aiHintLevels: [
      { level: 1, name: 'Conceptual Nudge', description: 'Memory', content: 'Re-inject observations.' },
      { level: 2, name: 'Direction', description: 'Signatures', content: 'Hash toolName + args.' },
      { level: 3, name: 'Pseudocode', description: 'Loop', content: 'while turn < MAX: step()' },
      { level: 4, name: 'Review', description: 'Schemas', content: 'Validate JSON schemas strictly.' }
    ],
    defenseQuestions: [
      {
        id: 'def-ag-1',
        question: 'How do you handle tools that execute mutating side-effects in an autonomous loop?',
        context: 'Agentic Safety',
        idealAnswerHighlights: [
          'Introduce permission classification',
          'Mutating actions trigger confirmation barriers',
          'Implement dry-run verification and rollback mechanisms'
        ]
      }
    ]
  },
  {
    id: 'prob-ml-vector',
    title: 'Vector Similarity Search',
    category: 'ml-fundamentals',
    categoryLabel: 'Machine Learning',
    difficulty: 'Intermediate',
    scalabilityRating: 8,
    scalabilityTier: '10M Vectors',
    estimatedMinutes: 45,
    summary: 'Find the nearest matching vectors using cosine similarity for embeddings and text search.',
    detailedDescription: `Vector databases like Pinecone and Milvus power modern RAG (Retrieval Augmented Generation).`,
    architectureRequirements: [
      'SIMD vector dot-product calculation simulation',
      'Bounded memory priority queue for top-K extraction in O(N log K)',
      'Sub-15ms retrieval across 50,000 vector records'
    ],
    tags: ['Machine Learning', 'Vector DB', 'Linear Algebra', 'Embeddings', 'RAG'],
    suggestedFollowUps: [
      {
        id: 'fu-ml-1',
        title: 'HNSW Graph Skip-Layer Indexing',
        complexity: 'High',
        category: 'Scalability',
        description: 'Implement multi-layer Hierarchical Navigable Small World graphs for O(log N) approximate nearest neighbors.',
        architecturalImpact: 'Reduces search latency from O(N) linear scans to <5ms over 10M embeddings.'
      }
    ],
    files: [
      {
        id: 'f-ml-1',
        name: 'vectorIndex.ts',
        path: 'src/vectorIndex.ts',
        language: 'typescript',
        type: 'file',
        content: `export class VectorIndex {
  public cosineSimilarity(a: number[], b: number[]): number {
    let dot = 0, normA = 0, normB = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    const den = Math.sqrt(normA) * Math.sqrt(normB);
    return den === 0 ? 0 : dot / den;
  }
}`
      }
    ],
    testCases: [
      {
        id: 'tc-ml-1',
        name: 'Unit Vector Cosine Invariant',
        type: 'unit',
        description: 'Validates cosine similarity of identical vectors is 1.0.',
        input: 'vectorA=[1, 2, 3], vectorB=[1, 2, 3]',
        expectedOutput: 'similarity=1.0',
        status: 'passed',
        executionTimeMs: 1,
        explanation: 'Normalized dot product equals 1.'
      }
    ],
    aiHintLevels: [
      { level: 1, name: 'Conceptual Nudge', description: 'Angle', content: 'Measures angle between vectors.' },
      { level: 2, name: 'Direction', description: 'Pre-normalize', content: 'Normalize vectors to unit length.' },
      { level: 3, name: 'Pseudocode', description: 'Min-Heap', content: 'Use heap for top-K.' },
      { level: 4, name: 'Review', description: 'ANN', content: 'Use HNSW graphs for O(log N).' }
    ],
    defenseQuestions: [
      {
        id: 'def-ml-1',
        question: 'Why do production vector databases use Approximate Nearest Neighbors (ANN) instead of exact brute-force search?',
        context: 'Scale & Algorithmic Complexity',
        idealAnswerHighlights: [
          'Exact search is O(N * D), making it unfeasible for real-time sub-50ms queries over millions of vectors',
          'ANN trades ~1% recall accuracy for a 100x to 1000x speedup',
          'Allows sub-10ms search over billions of embeddings'
        ]
      }
    ]
  }
];
