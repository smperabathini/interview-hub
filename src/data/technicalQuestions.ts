import { TechnicalQuestion } from '../types';

export const TECHNICAL_QUESTIONS: TechnicalQuestion[] = [
  // --- Sandbox Studio Follow-Up Questions (Tied to Sandbox Problems) ---
  {
    id: 'tech-ot-crdt',
    category: 'Sandbox Follow-Up',
    problemId: 'prob-fullstack-collab',
    problemTitle: 'Real-Time Document Editor (OT)',
    title: 'Operational Transformation vs CRDTs in Collaborative Editors',
    question: 'Why did you choose Operational Transformation (OT) over Conflict-Free Replicated Data Types (CRDTs) like Yjs or Automerge for this collaborative editing system?',
    context: 'Full-Stack Architecture & Distributed Concurrency',
    idealAnswerHighlights: [
      'OT has significantly smaller memory overhead per character than state-based CRDTs (eliminates tombstone proliferation)',
      'Centralized server architecture makes OT straightforward because the central server acts as the canonical single source of revision truth',
      'CRDTs excel in peer-to-peer / decentralized scenarios, whereas OT is lighter for central SaaS platforms like Google Docs or Figma'
    ],
    suggestedTradeoff: 'Memory footprint vs decentralized offline-first capability',
    sampleResponse: `I selected Operational Transformation (OT) primarily due to memory footprint and the centralized nature of our architecture. State-based CRDTs retain "tombstones" for every deleted character to preserve causality across distributed peers, causing substantial RAM bloat over long-lived documents. 

Because our design features an authoritative central WebSocket server, we have a natural single source of truth to serialize revisions. The server orders incoming ops and transforms them against concurrent history in O(K) time, preserving sub-20ms broadcast latency with bounded memory.`
  },
  {
    id: 'tech-dsa-kahn',
    category: 'Sandbox Follow-Up',
    problemId: 'prob-dsa-scheduler',
    problemTitle: 'DAG Task Scheduler & Dependency Engine',
    title: 'Kahn’s Algorithm vs Recursive DFS for Topological Sort',
    question: 'Why would Kahn’s algorithm (in-degree BFS) be preferred over recursive DFS topological sort in a production distributed orchestrator?',
    context: 'Algorithmic Complexity & Execution Safety',
    idealAnswerHighlights: [
      'Kahn’s algorithm naturally partitions tasks into parallel execution stages batch by batch (all 0 in-degree nodes can run concurrently)',
      'Avoids call-stack overflow on deep graphs (DFS requires O(V) stack frames, risking StackOverflow on 50k+ nodes)',
      'Simpler integration with async worker thread pools where 0 in-degree nodes map directly to ready work queues'
    ],
    suggestedTradeoff: 'Iterative queue management vs recursive call-stack overhead',
    sampleResponse: `Kahn's algorithm (BFS with in-degree tracking) is substantially superior for production orchestrators for two reasons:

1. Stack Safety: Deeply nested DAGs with 50,000+ nodes will trigger Call Stack Exceeded crashes with recursive DFS. Kahn's uses an explicit heap queue.
2. Parallel Scheduling Batches: Kahn's naturally identifies all nodes with in-degree 0 at each level. These tasks have zero unresolved dependencies and can be dispatched across worker threads in parallel immediately.`
  },
  {
    id: 'tech-ratelimit-scale',
    category: 'Sandbox Follow-Up',
    problemId: 'prob-api-ratelimit',
    problemTitle: 'Distributed Rate Limiting Gateway',
    title: 'Sliding Window Log vs Sliding Window Counter at 1M Req/s',
    question: 'Under extreme high volume (1M req/s), sliding window log can consume excessive Redis memory. How would you redesign this for lower RAM usage without losing accuracy?',
    context: 'High-Throughput API Gateway & Memory Bounding',
    idealAnswerHighlights: [
      'Switch from sliding window log (sorted sets) to sliding window counter',
      'Reduces storage from O(N timestamps) to O(1) two counter integers per user window',
      'Yields ~99.5% accuracy while reducing Redis memory usage by over 92%'
    ],
    suggestedTradeoff: 'Micro-second precision timestamp logging vs bounded O(1) Redis memory footprint',
    sampleResponse: `At 1M requests/second, storing individual timestamps in Redis Sorted Sets (ZSET) requires O(N) memory per active client, creating massive memory bloat and GC overhead.

I would transition to a Sliding Window Counter algorithm. By storing only two 64-bit integers per client—the request count for the current minute and the previous minute—we compute the weighted sliding sum: current_count + previous_count * (1 - time_elapsed_in_current_window). This delivers 99.5% boundary accuracy while collapsing memory from megabytes to exactly 16 bytes per user.`
  },
  {
    id: 'tech-mc-pde',
    category: 'Sandbox Follow-Up',
    problemId: 'prob-quant-montecarlo',
    problemTitle: 'Monte Carlo Options Pricing Engine',
    title: 'Monte Carlo Simulation vs Analytic Black-Scholes PDE',
    question: 'Under what circumstances would you use Monte Carlo simulation instead of solving the Black-Scholes PDE using Finite Difference Methods (FDM) or analytic formulas?',
    context: 'Quantitative Systems & Mathematical Finance',
    idealAnswerHighlights: [
      'High dimensionality: When pricing multi-asset basket options (e.g., rainbow options on 30 stocks), FDM suffers from the curse of dimensionality O(M^D), while Monte Carlo convergence O(1/sqrt(N)) is independent of dimension',
      'Path dependency: Monte Carlo easily handles exotic path-dependent features like Asian options (arithmetic average) and lookback barriers',
      'Stochastic volatility and jumps (e.g., Heston or Merton jump diffusion) where closed-form solutions do not exist'
    ],
    suggestedTradeoff: 'Simulative computational iterations vs analytical mathematical closed forms',
    sampleResponse: `Monte Carlo is indispensable when analytic formulas fail or suffer from the curse of dimensionality:
1. High Dimensionality: For basket or rainbow options involving 20+ underlying assets, Finite Difference Methods scale exponentially O(M^D), whereas Monte Carlo convergence O(1/√N) is completely invariant to asset count.
2. Path Dependency: In Asian options where the payoff depends on the continuous arithmetic average S̄, there is no closed-form Black-Scholes solution. Monte Carlo records the entire path naturally.`
  },
  {
    id: 'tech-lru-striping',
    category: 'Sandbox Follow-Up',
    problemId: 'prob-lowlevel-lru',
    problemTitle: 'Concurrent LRU Cache with Lock Striping',
    title: 'Lock Striping Overhead on Global Cache Invariants',
    question: 'What is the trade-off of lock striping when executing global cache operations like size() or clear()?',
    context: 'Low-Level Concurrency & Synchronization',
    idealAnswerHighlights: [
      'Global operations require acquiring locks across all striped segments in deterministic order',
      'Risk of deadlocks if locks are not acquired strictly 0 to N-1',
      'Global size becomes an approximation under high write contention unless all segment mutexes are held simultaneously'
    ],
    suggestedTradeoff: 'Parallel read/write throughput across shards vs expensive global aggregation',
    sampleResponse: `Lock striping provides near-linear scaling for get() and put() by isolating concurrent threads to separate hash buckets. 

However, operations that require whole-cache consistency (like size() or clear()) must acquire all segment locks sequentially from index 0 to S-1. This introduces a global serialization barrier that temporarily halts all read/write threads. In production, we typically relax size() to return an eventually consistent atomic counter sum rather than halting the entire cache.`
  },
  {
    id: 'tech-agent-safety',
    category: 'Sandbox Follow-Up',
    problemId: 'prob-agent-react',
    problemTitle: 'Autonomous ReAct Agent Loop',
    title: 'Handling Mutating Side-Effects in Autonomous Agent Loops',
    question: 'How do you handle tools that execute mutating side-effects (e.g. database updates, emails) in an autonomous agent loop to prevent unintended damage?',
    context: 'Agentic Systems & Operational Safety',
    idealAnswerHighlights: [
      'Introduce tool permission classification (read-only vs state-mutating vs financial/critical)',
      'Mutating actions trigger human-in-the-loop confirmation barriers or dry-run validation',
      'Implement transactional rollback mechanisms and execution budget quotas'
    ],
    suggestedTradeoff: 'Full autonomy vs safety gates and human verification checkpoints',
    sampleResponse: `Autonomous loops require defensive execution boundaries:
1. Classification: Tools are categorized as Idempotent/Read-only or Mutating/Destructive.
2. Dry-Run Verification: Before committing mutations, the agent executes a dry-run to inspect the planned diff and payload invariants.
3. Human-in-the-loop Gates: High-consequence mutations (DB drops, mass emails, payment charges) halt the loop with a structured approval prompt before resuming.`
  },

  // --- Standalone Technical Questions (Not Specific to Sandbox) ---
  {
    id: 'tech-cap-pacelc',
    category: 'Distributed Systems',
    title: 'CAP & PACELC Theorem in Distributed Storage',
    question: 'Explain how the PACELC theorem extends the CAP theorem. In a globally distributed database like CockroachDB or Cassandra, what concrete tradeoffs are made between latency and consistency during normal non-partitioned operation?',
    context: 'Distributed Storage & Consistency Models',
    idealAnswerHighlights: [
      'CAP only considers behavior during network partitions (Availability vs Consistency)',
      'PACELC adds: If there is an (A)lternative partition, choose (A) or (C); (E)lse, choose (L)atency or (C)onsistency',
      'Cassandra chooses Availability and Latency (PA/EL); Spanner/CockroachDB chooses Consistency and Consistency (PC/EC)',
      'Synchronous multi-region quorum writes increase p99 latency by 50-150ms due to speed-of-light round trips'
    ],
    suggestedTradeoff: 'Strong serializable consistency vs low p99 write latency',
    sampleResponse: `While CAP only examines behavior during network partitions, PACELC recognizes that networks are healthy 99.9% of the time. The theorem states: If Partition (P), choose Availability (A) or Consistency (C); Else (E), choose Latency (L) or Consistency (C).

During normal operations, if you require strong consistency (EC), every write must execute synchronous quorum consensus (Raft/Paxos) across multiple data centers. This incurs cross-region latency (~80ms speed-of-light RTT). Conversely, systems optimizing for low latency (EL) perform local async replication, accepting the risk of stale reads.`
  },
  {
    id: 'tech-db-sharding',
    category: 'Database Internals',
    title: 'Database Sharding Strategies vs Read Replicas',
    question: 'When scaling a PostgreSQL cluster from 5,000 to 100,000 writes per second, why do read replicas fail to solve the bottleneck, and how do you design a robust sharding key to prevent write hotspots?',
    context: 'Relational Database Internals & Horizontal Scaling',
    idealAnswerHighlights: [
      'Read replicas only distribute read traffic; every replica must still execute 100% of the write stream via WAL replication',
      'Write scalability requires horizontal partitioning (sharding) across separate primary nodes',
      'A good sharding key must have high cardinality, uniform hash distribution, and co-locate frequently joined entities (e.g. tenant_id or user_id)',
      'Avoiding cross-shard distributed transactions (2PC) is critical for throughput'
    ],
    suggestedTradeoff: 'Relational joins and global ACID vs linear write throughput',
    sampleResponse: `Read replicas cannot solve write saturation because every single replica must process every write via write-ahead log (WAL) replay. When primary IOPS is exhausted, adding replicas actually worsens replication lag.

To scale writes, we must shard the database. Choosing the shard key requires analyzing query access patterns:
1. High Cardinality: Avoid keys like status or country which cause hotspotting. Use user_id or a compound hash(tenant_id, entity_id).
2. Entity Co-location: Store all child records (orders, items) on the same shard as the parent tenant to allow local ACID transactions without costly Two-Phase Commit (2PC).`
  },
  {
    id: 'tech-cache-invalidation',
    category: 'Concurrency & Multi-Threading',
    title: 'Thundering Herd & Distributed Cache Invalidation',
    question: 'What is the "Thundering Herd" problem (cache stampede), and how do you prevent it using probabilistic early expiration (XFetch) or distributed mutex locking?',
    context: 'Caching Architecture & Traffic Spike Resiliency',
    idealAnswerHighlights: [
      'Occurs when a popular cached key expires, and thousands of concurrent requests all miss simultaneously and hammer the primary database',
      'Distributed Mutex: Only the first worker acquires a lock to regenerate the cache while other requests wait or return stale data',
      'Probabilistic Early Expiration (XFetch): As TTL approaches expiration, background workers probabilistically regenerate the cache before it expires based on read frequency and computation time',
      'Stale-While-Revalidate pattern: Serve slightly outdated cache while a background worker updates'
    ],
    suggestedTradeoff: 'Cache regeneration compute spikes vs serving slightly stale data during warmups',
    sampleResponse: `A cache stampede happens when a hot key (e.g. homepage catalog) expires. Thousands of concurrent requests experience a cache miss at the exact same millisecond and all execute the heavy SQL query, frequently taking down the database.

Two proven defenses:
1. Mutex Locking: The first cache-miss acquires a short-lived Redis lock to compute the value. Other requests poll or receive a fallback.
2. XFetch (Probabilistic Expiration): Instead of hard TTL, we compute: -β * δ * ln(random()) > (expiration - now). If true, a request preemptively refreshes the cache before the TTL expires, guaranteeing 100% cache hit rate under continuous load.`
  },
  {
    id: 'tech-idempotency-keys',
    category: 'API & System Design',
    title: 'Distributed Idempotency in Payment & Order APIs',
    question: 'How do you design an end-to-end idempotent payment processing API to guarantee that network timeouts or duplicate client retries will never charge a customer twice?',
    context: 'API Design, Distributed State & Transactional Invariants',
    idealAnswerHighlights: [
      'Client generates a unique Idempotency-Key (UUIDv4) sent via HTTP header',
      'Gateway or service inserts idempotency key into a transactional store with status "IN_PROGRESS" using atomic conditional insert',
      'If key already exists with "COMPLETED", return the cached response immediately without re-executing payment gateway calls',
      'Transactional Outbox pattern guarantees that internal state mutation and downstream message dispatch commit atomically'
    ],
    suggestedTradeoff: 'Storage of request/response payloads vs financial correctness and zero duplicate charges',
    sampleResponse: `Idempotency ensures that identical retried requests yield the exact same result without duplicate side-effects:

1. Idempotency Key Header: Clients pass a unique Idempotency-Key: UUID in the POST request.
2. Atomic Reservation: The backend performs an atomic SQL INSERT INTO idempotency_keys (key, status, response_body) VALUES (?, 'IN_PROGRESS', NULL) ON CONFLICT DO NOTHING.
3. If the insert fails, an ongoing or completed transaction exists. If status is COMPLETED, return the saved response body immediately. If IN_PROGRESS, return 409 Conflict or poll.
4. If the insert succeeds, execute the external payment charge, write the response, and transition status to COMPLETED within an atomic transaction.`
  },
  {
    id: 'tech-ws-sse-grpc',
    category: 'API & System Design',
    title: 'WebSocket vs Server-Sent Events (SSE) vs gRPC Streaming',
    question: 'When building a real-time notification and AI streaming interface, under what criteria would you choose Server-Sent Events (SSE) over full-duplex WebSockets?',
    context: 'Protocols & Network Architecture',
    idealAnswerHighlights: [
      'SSE is unidirectional (server-to-client), operates over standard HTTP/2, and automatically supports HTTP proxying, TLS, and corporate firewalls',
      'SSE has native browser reconnection and event ID resumption built-in without custom client code',
      'WebSockets require custom handshake upgrade, keep-alive ping/pongs, and complex load balancer session affinity',
      'Choose WebSocket only when high-frequency bidirectional client messages (like gaming or drawing canvas) are required'
    ],
    suggestedTradeoff: 'Full-duplex bidirectional communication vs simplicity, HTTP/2 multiplexing, and auto-reconnect',
    sampleResponse: `For LLM token streaming and notifications, Server-Sent Events (SSE) is superior to WebSockets:
1. Native HTTP/2 Multiplexing: SSE runs over standard HTTP, allowing multiple event streams over a single TCP connection without the WebSocket connection-per-tab limit.
2. Built-in Resiliency: Browsers natively auto-reconnect SSE with Last-Event-ID headers, allowing seamless resumption after network drops.
3. Firewall & Gateway Friendly: Operates on standard port 443 without needing custom WebSocket upgrade handshakes that enterprise proxies frequently drop.`
  },
  {
    id: 'tech-circuit-breaker',
    category: 'Security & Reliability',
    title: 'Circuit Breakers & Cascading Failure Prevention',
    question: 'How does a Circuit Breaker pattern (Closed, Open, Half-Open) prevent cascading microservice outages, and how should exponential backoff with full jitter be parameterized?',
    context: 'Fault Tolerance & Distributed System Resiliency',
    idealAnswerHighlights: [
      'Closed: Requests flow normally; failure rate is measured over a rolling window',
      'Open: When failure threshold (e.g. 50% over 10s) is tripped, all requests fail-fast immediately without stressing the downstream service',
      'Half-Open: After a cooldown timeout, allows a limited canary probe of traffic to test if the dependency has recovered',
      'Full Jitter: Sleep = random_between(0, min(cap, base * 2^attempt)) prevents retry stampedes where all clients retry at synchronized intervals'
    ],
    suggestedTradeoff: 'Failing fast with degraded fallbacks vs continuing to queue doomed requests',
    sampleResponse: `When a downstream dependency slows down, upstream threads queue up waiting on timeouts, exhausting thread pools and causing cascading system-wide collapse.

The Circuit Breaker pattern mitigates this through 3 states:
- Closed: Normal operation. Tracks error rate.
- Open: Tripped when error rate exceeds threshold. Fails fast instantly, returning cached fallbacks and giving downstream systems room to recover.
- Half-Open: After a sleep window, routes a canary percentage of requests. If they succeed, it closes the circuit.
Combining this with Exponential Backoff + Full Jitter ensures that retrying clients desynchronize, preventing secondary retry waves.`
  }
];
