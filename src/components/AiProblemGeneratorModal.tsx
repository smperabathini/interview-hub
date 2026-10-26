import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Bot, 
  Wand2, 
  Cpu, 
  FileCode2, 
  CheckCircle2, 
  Layers, 
  Gauge, 
  ArrowRight, 
  Loader2,
  HelpCircle
} from 'lucide-react';
import { Problem, CategoryType, DifficultyLevel } from '../types';

interface AiProblemGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProblemGenerated: (newProblem: Problem) => void;
}

export const AiProblemGeneratorModal: React.FC<AiProblemGeneratorModalProps> = ({
  isOpen,
  onClose,
  onProblemGenerated
}) => {
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState<CategoryType>('full-stack');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Advanced');
  const [scalabilityTarget, setScalabilityTarget] = useState<string>('Ultra Scale (100k req/s)');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState<number>(0);

  if (!isOpen) return null;

  const quickPresets = [
    {
      title: "Topological Task DAG Scheduler with Cycle Detection",
      prompt: "Implement a dependency resolution engine using Kahn’s Algorithm / Topological sort with cycle detection, parallel batch execution levels, and O(V + E) complexity.",
      category: 'dsa' as CategoryType,
      difficulty: 'Advanced' as DifficultyLevel
    },
    {
      title: "Monte Carlo Option Pricing & Brownian Motion",
      prompt: "Create a vectorized Monte Carlo simulation to price European options using Geometric Brownian Motion (GBM) with Box-Muller normal transforms and antithetic variance reduction.",
      category: 'quant' as CategoryType,
      difficulty: 'Advanced' as DifficultyLevel
    },
    {
      title: "Distributed Snowflake 64-bit ID Generator",
      prompt: "Create a Twitter Snowflake 64-bit unique ID generator in TypeScript that handles clock backwards drift, worker node ID allocation, and multi-thread sequence rollover under 100k IDs/sec.",
      category: 'low-level' as CategoryType,
      difficulty: 'Advanced' as DifficultyLevel
    }
  ];

  const handleGenerate = () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGenerationStep(1);

    // Step 1: Synthesizing problem spec
    setTimeout(() => {
      setGenerationStep(2);
      // Step 2: Generating multi-file starter sandbox
      setTimeout(() => {
        setGenerationStep(3);
        // Step 3: Compiling AI testcases and scalability rubric
        setTimeout(() => {
          setGenerationStep(4);
          setTimeout(() => {
            // Finished: construct new Problem
            const generatedProblem: Problem = {
              id: `gen-${Date.now()}`,
              title: prompt.length > 50 ? prompt.slice(0, 48) + '...' : prompt,
              category: category,
              categoryLabel: category === 'full-stack' ? 'Full-Stack Development' :
                             category === 'api-design' ? 'API Design' :
                             category === 'low-level' ? 'Low-Level Systems' :
                             category === 'dsa' ? 'Data Structures & Algorithms' :
                             category === 'agentic-ai' ? 'Agentic AI Systems' :
                             category === 'quant' ? 'Quantitative Systems (Math & Probability)' : 'Custom Synthesized',
              difficulty: difficulty,
              scalabilityRating: difficulty === 'Staff/Principal' ? 10 : difficulty === 'Advanced' ? 9 : 7,
              scalabilityTier: scalabilityTarget,
              estimatedMinutes: 55,
              summary: `Custom AI-synthesized challenge generated from user requirements: "${prompt.slice(0, 100)}..." Complete with multi-file sandbox and automated grading.`,
              detailedDescription: `### AI-Synthesized Challenge Overview\n\n**User Prompt**: ${prompt}\n\n### Architectural Specifications:\n1. Construct the core engine with modular separation between state and network layers.\n2. Ensure thread-safety and race condition resilience under high concurrency.\n3. Implement automated self-recovery when downstream services fail.\n4. Comply with all AI-generated unit, edge-case, and scalability test scenarios.`,
              architectureRequirements: [
                'Implement deterministic state transitions',
                'Bound memory consumption under heavy load',
                'Pass all 3 automated AI test suites',
                'Be prepared to justify architectural trade-offs in the defense interview'
              ],
              files: [
                {
                  id: 'gen-f1',
                  name: 'coreEngine.ts',
                  path: 'src/coreEngine.ts',
                  language: 'typescript',
                  type: 'file',
                  content: `// PrepMaster AI Generated: Core Solution
// Challenge: ${prompt}

export interface EngineConfig {
  workerId: number;
  maxThroughput: number;
}

export class SynthesizedEngine {
  private config: EngineConfig;
  private state: Map<string, any> = new Map();

  constructor(config: EngineConfig) {
    this.config = config;
  }

  // TODO: Implement your high-performance solution according to the problem requirements
  public executeTask(payload: Record<string, any>): { success: boolean; result: any } {
    if (!payload) throw new Error("Invalid payload");
    
    // Your implementation logic here
    const processedId = \`\${this.config.workerId}_\${Date.now()}\`;
    this.state.set(processedId, payload);

    return {
      success: true,
      result: { id: processedId, status: 'PROCESSED' }
    };
  }

  public getThroughputMetrics() {
    return {
      processedCount: this.state.size,
      activeWorker: this.config.workerId
    };
  }
}`
                },
                {
                  id: 'gen-f2',
                  name: 'types.ts',
                  path: 'src/types.ts',
                  language: 'typescript',
                  type: 'file',
                  content: `export interface TaskPayload {
  id: string;
  timestamp: number;
  data: Record<string, any>;
}

export interface ExecutionResponse {
  success: boolean;
  result: any;
  latencyMs?: number;
}`
                }
              ],
              testCases: [
                {
                  id: 'gen-tc-1',
                  name: 'Functional Core Invariant Test',
                  type: 'unit',
                  description: 'Validates that executeTask correctly initializes and processes valid payloads.',
                  input: 'payload={ action: "compute", data: [1, 2, 3] }',
                  expectedOutput: 'success=true with deterministic result ID',
                  status: 'passed',
                  executionTimeMs: 5,
                  explanation: 'Ensures fundamental baseline contracts are preserved without unhandled exceptions.'
                },
                {
                  id: 'gen-tc-2',
                  name: 'Edge Case: Null/Empty Payload Resilience',
                  type: 'edge-case',
                  description: 'Passes malformed inputs to ensure defensive exception handling.',
                  input: 'payload=null',
                  expectedOutput: 'Properly caught with standard error message',
                  status: 'passed',
                  executionTimeMs: 2,
                  explanation: 'Ensures runtime stability without crashing the host sandbox process.'
                },
                {
                  id: 'gen-tc-3',
                  name: 'High Concurrency Scalability Benchmark (10,000 Ops)',
                  type: 'scalability',
                  description: 'Executes rapid batch invocations to evaluate memory growth and latency p99.',
                  input: '10,000 requests dispatched across concurrent promises',
                  expectedOutput: 'p99 latency < 12ms and zero lost state entries',
                  status: 'passed',
                  executionTimeMs: 22,
                  explanation: 'Verifies algorithmic complexity under target scalability threshold.'
                }
              ],
              aiHintLevels: [
                {
                  level: 1,
                  name: 'Conceptual Nudge',
                  description: 'Mental model prompt.',
                  content: 'Break down your state into immutable snapshot slices to prevent lock contention.'
                },
                {
                  level: 2,
                  name: 'Structural Direction',
                  description: 'Architectural separation.',
                  content: 'Keep the execution worker separate from the state store to facilitate testing.'
                },
                {
                  level: 3,
                  name: 'Algorithmic Pseudocode',
                  description: 'Logic walkthrough.',
                  content: `function process(payload):
  validate(payload)
  id = generateDeterministicKey()
  store.set(id, payload)
  return id`
                },
                {
                  level: 4,
                  name: 'Deep Review',
                  description: 'Full code review.',
                  content: 'Review thread-safety on map modifications and handle worker ID collisions.'
                }
              ],
              defenseQuestions: [
                {
                  id: 'gen-def-1',
                  question: `How does your solution for "${prompt.slice(0, 40)}" handle unexpected node crashes midway through state updates?`,
                  context: 'Custom Problem Technical Question',
                  idealAnswerHighlights: [
                    'Write-ahead logging (WAL) or atomic commit phases',
                    'Idempotent replay mechanisms on worker revival',
                    'Quorum consensus or leader election for high availability'
                  ]
                }
              ],
              suggestedFollowUps: [
                {
                  id: 'gen-fu-1',
                  title: 'Distributed State Synchronization & WAL Replication',
                  complexity: 'High',
                  category: 'Scalability',
                  description: 'Implement distributed consensus or write-ahead logging replication across multiple worker nodes.',
                  architecturalImpact: 'Ensures zero data loss under catastrophic process crashes.'
                },
                {
                  id: 'gen-fu-2',
                  title: 'Structured Metric Instrumentation & OpenTelemetry Export',
                  complexity: 'Low',
                  category: 'Observability',
                  description: 'Export Prometheus-compatible execution counters, p99 latency histograms, and error rates.',
                  architecturalImpact: 'Provides real-time observability in production clusters.'
                }
              ],
              tags: ['AI Generated', category, difficulty, 'Sandbox Ready'],
              isAiGenerated: true
            };

            setIsGenerating(false);
            onProblemGenerated(generatedProblem);
            onClose();
          }, 600);
        }, 800);
      }, 900);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white border border-slate-300 rounded-2xl max-w-2xl w-full shadow-modal overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-semibold uppercase bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
                  Autonomous Problem Synthesizer
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                Generate Custom Sandbox Problem
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isGenerating}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {isGenerating ? (
            /* Animated Generation Sequence */
            <div className="py-8 space-y-6 text-center">
              <div className="relative inline-flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-indigo-600 animate-spin" />
                <Bot className="w-7 h-7 text-indigo-600 absolute" />
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Synthesizing Custom Multi-File Sandbox...
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Our GenAI agent is assembling requirements, source files, and unit test suites.
                </p>
              </div>

              {/* Progress Steps */}
              <div className="max-w-md mx-auto space-y-2 text-left text-xs font-mono">
                <div className={`p-2.5 rounded-lg border flex items-center space-x-2.5 ${
                  generationStep >= 1 ? 'bg-indigo-50 border-indigo-200 text-indigo-900 font-semibold' : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}>
                  {generationStep > 1 ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />}
                  <span>1. Parsing prompt & architectural constraints</span>
                </div>

                <div className={`p-2.5 rounded-lg border flex items-center space-x-2.5 ${
                  generationStep >= 2 ? 'bg-indigo-50 border-indigo-200 text-indigo-900 font-semibold' : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}>
                  {generationStep > 2 ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : generationStep === 2 ? <Loader2 className="w-4 h-4 animate-spin text-indigo-600" /> : <div className="w-4 h-4 rounded-full border border-slate-300" />}
                  <span>2. Scaffolding multi-file starter sandbox & types</span>
                </div>

                <div className={`p-2.5 rounded-lg border flex items-center space-x-2.5 ${
                  generationStep >= 3 ? 'bg-indigo-50 border-indigo-200 text-indigo-900 font-semibold' : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}>
                  {generationStep > 3 ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : generationStep === 3 ? <Loader2 className="w-4 h-4 animate-spin text-indigo-600" /> : <div className="w-4 h-4 rounded-full border border-slate-300" />}
                  <span>3. Creating automated unit & scalability test cases</span>
                </div>

                <div className={`p-2.5 rounded-lg border flex items-center space-x-2.5 ${
                  generationStep >= 4 ? 'bg-indigo-50 border-indigo-200 text-indigo-900 font-semibold' : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}>
                  {generationStep >= 4 ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <div className="w-4 h-4 rounded-full border border-slate-300" />}
                  <span>4. Calibrating AI hint levels & oral defense rubrics</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Prompt Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>Describe the exact problem or architecture to practice:</span>
                  <span className="text-[11px] font-mono text-slate-400">Natural Language Prompt</span>
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  placeholder="e.g. Build an in-memory Pub/Sub message broker supporting wildcard topic matching, subscriber dead-letter queues, and backpressure under 50k msgs/sec..."
                  className="w-full p-3 text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                />
              </div>

              {/* Quick Preset Buttons */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono font-bold uppercase text-slate-500">
                  Or pick a curated prompt preset:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {quickPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setPrompt(preset.prompt);
                        setCategory(preset.category);
                        setDifficulty(preset.difficulty);
                      }}
                      className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-left transition group"
                    >
                      <div className="text-[11px] font-bold text-slate-900 group-hover:text-indigo-600 truncate">
                        {preset.title}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        {preset.category} • {preset.difficulty}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Discipline
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryType)}
                    className="w-full p-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="full-stack">Full-Stack Development</option>
                    <option value="dsa">Data Structures & Algorithms (DSA)</option>
                    <option value="quant">Quant (Math & Probability)</option>
                    <option value="api-design">API Design & Gateways</option>
                    <option value="low-level">Low-Level Systems</option>
                    <option value="ml-fundamentals">ML Fundamentals</option>
                    <option value="agentic-ai">Agentic AI Components</option>
                    <option value="custom">General Custom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Difficulty Level
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                    className="w-full p-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Staff/Principal">Staff / Principal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Scalability Benchmark
                  </label>
                  <select
                    value={scalabilityTarget}
                    onChange={(e) => setScalabilityTarget(e.target.value)}
                    className="w-full p-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="Standard (1K req/s)">Standard (1K req/s)</option>
                    <option value="High (50K req/s)">High (50K req/s)</option>
                    <option value="Ultra Scale (100k req/s)">Ultra Scale (100k req/s)</option>
                    <option value="Distributed Consensus">Distributed Consensus</option>
                  </select>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={!prompt.trim()}
                  className={`px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition flex items-center space-x-2 shadow-sm ${
                    prompt.trim()
                      ? 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-900 cursor-pointer active:scale-95'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-200'
                  }`}
                >
                  <Wand2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>Synthesize Sandbox & Testcases</span>
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
