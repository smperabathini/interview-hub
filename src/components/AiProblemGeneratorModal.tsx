import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Bot, 
  Wand2, 
  CheckCircle2, 
  Loader2
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
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState<number>(0);

  if (!isOpen) return null;

  const quickPresets = [
    {
      title: "Task Scheduler with Cycle Detection",
      prompt: "Build a dependency task scheduler with cycle detection and parallel batching.",
      category: 'dsa' as CategoryType,
      difficulty: 'Advanced' as DifficultyLevel
    },
    {
      title: "Option Pricing Simulator",
      prompt: "Create a Monte Carlo simulation to estimate European option prices.",
      category: 'quant' as CategoryType,
      difficulty: 'Advanced' as DifficultyLevel
    },
    {
      title: "64-bit Unique ID Generator",
      prompt: "Create a unique 64-bit ID generator that handles node IDs and sequence rollover.",
      category: 'low-level' as CategoryType,
      difficulty: 'Advanced' as DifficultyLevel
    }
  ];

  const handleGenerate = () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGenerationStep(1);

    setTimeout(() => {
      setGenerationStep(2);
      setTimeout(() => {
        setGenerationStep(3);
        setTimeout(() => {
          setGenerationStep(4);
          setTimeout(() => {
            const generatedProblem: Problem = {
              id: `gen-${Date.now()}`,
              title: prompt.length > 50 ? prompt.slice(0, 48) + '...' : prompt,
              category: category,
              categoryLabel: category === 'full-stack' ? 'Full-Stack' :
                             category === 'api-design' ? 'API Design' :
                             category === 'low-level' ? 'Systems' :
                             category === 'dsa' ? 'Algorithms' :
                             category === 'agentic-ai' ? 'AI' :
                             category === 'quant' ? 'Math & Quant' : 'Custom',
              difficulty: difficulty,
              scalabilityRating: difficulty === 'Staff/Principal' ? 10 : difficulty === 'Advanced' ? 9 : 7,
              scalabilityTier: 'Production Scale',
              estimatedMinutes: 45,
              summary: `Custom problem: "${prompt.slice(0, 90)}..." with starter code and test cases.`,
              detailedDescription: `### Overview\n\n**Goal**: ${prompt}\n\n### Requirements:\n1. Implement the core function or class.\n2. Handle edge cases (empty or invalid inputs).\n3. Pass all unit and performance tests.`,
              architectureRequirements: [
                'Implement the core logic in coreEngine.ts',
                'Handle edge cases safely',
                'Pass all automated tests',
                'Be ready to explain your design in technical Q&A'
              ],
              files: [
                {
                  id: 'gen-f1',
                  name: 'coreEngine.ts',
                  path: 'src/coreEngine.ts',
                  language: 'typescript',
                  type: 'file',
                  content: `// Solution Starter: ${prompt}

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

  // TODO: Implement your solution here
  public executeTask(payload: Record<string, any>): { success: boolean; result: any } {
    if (!payload) throw new Error("Invalid payload");
    
    const processedId = \`\${this.config.workerId}_\${Date.now()}\`;
    this.state.set(processedId, payload);

    return {
      success: true,
      result: { id: processedId, status: 'PROCESSED' }
    };
  }

  public getMetrics() {
    return {
      count: this.state.size,
      worker: this.config.workerId
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
}`
                }
              ],
              testCases: [
                {
                  id: 'gen-tc-1',
                  name: 'Basic Input Test',
                  type: 'unit',
                  description: 'Checks that valid payloads are processed without errors.',
                  input: 'payload={ action: "compute", data: [1, 2, 3] }',
                  expectedOutput: 'success=true with result ID',
                  status: 'passed',
                  executionTimeMs: 4,
                  explanation: 'Ensures the baseline function works as expected.'
                },
                {
                  id: 'gen-tc-2',
                  name: 'Invalid Input Edge Case',
                  type: 'edge-case',
                  description: 'Checks that invalid inputs throw a clear error.',
                  input: 'payload=null',
                  expectedOutput: 'Throws error: Invalid payload',
                  status: 'passed',
                  executionTimeMs: 2,
                  explanation: 'Ensures safe error handling.'
                },
                {
                  id: 'gen-tc-3',
                  name: 'Speed & Scale Test',
                  type: 'scalability',
                  description: 'Runs 1,000 rapid calls to verify performance.',
                  input: '1,000 requests',
                  expectedOutput: 'All requests finish in < 20ms',
                  status: 'passed',
                  executionTimeMs: 14,
                  explanation: 'Verifies performance under load.'
                }
              ],
              aiHintLevels: [
                {
                  level: 1,
                  name: 'Quick Tip',
                  description: 'High-level hint.',
                  content: 'Think about what data structure lets you look up items fastest.'
                },
                {
                  level: 2,
                  name: 'Direction',
                  description: 'Architecture tip.',
                  content: 'Keep your state separated from the helper methods for easier testing.'
                },
                {
                  level: 3,
                  name: 'Pseudocode',
                  description: 'Code outline.',
                  content: `function process(payload):\n  validate(payload)\n  id = generateKey()\n  save(id, payload)\n  return id`
                },
                {
                  level: 4,
                  name: 'Review',
                  description: 'Final checklist.',
                  content: 'Check for null values and handle empty inputs cleanly.'
                }
              ],
              defenseQuestions: [
                {
                  id: 'gen-def-1',
                  question: `How would your solution handle an unexpected server reboot or lost network connection?`,
                  context: 'Technical Question',
                  idealAnswerHighlights: [
                    'Save changes to disk or database',
                    'Retry failed requests with backoff',
                    'Keep actions idempotent'
                  ]
                }
              ],
              suggestedFollowUps: [
                {
                  id: 'gen-fu-1',
                  title: 'Data Persistence to Disk',
                  complexity: 'Medium',
                  category: 'Resilience',
                  description: 'Add a write log so data is saved across restarts.',
                  architecturalImpact: 'Prevents data loss on restart.'
                }
              ],
              tags: ['Custom', category, difficulty],
              isAiGenerated: true
            };

            setIsGenerating(false);
            onProblemGenerated(generatedProblem);
            onClose();
          }, 400);
        }, 500);
      }, 500);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white border border-slate-200 rounded-xl max-w-xl w-full shadow-lg overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Create Custom Problem
              </h2>
              <p className="text-[11px] text-slate-500">
                Generate starter code, tests, and interview questions.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isGenerating}
            className="p-1 text-slate-400 hover:text-slate-700 rounded transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {isGenerating ? (
            <div className="py-6 space-y-4 text-center">
              <div className="relative inline-flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-3 border-slate-200 border-t-slate-900 animate-spin" />
                <Bot className="w-5 h-5 text-slate-700 absolute" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Creating your problem...
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Building code files and test cases.
                </p>
              </div>

              {/* Progress Steps */}
              <div className="max-w-xs mx-auto space-y-1.5 text-left text-xs font-mono">
                <div className={`p-2 rounded border flex items-center space-x-2 ${
                  generationStep >= 1 ? 'bg-slate-50 border-slate-300 text-slate-900 font-medium' : 'text-slate-400 border-transparent'
                }`}>
                  {generationStep > 1 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-700" />}
                  <span>1. Reading requirements</span>
                </div>

                <div className={`p-2 rounded border flex items-center space-x-2 ${
                  generationStep >= 2 ? 'bg-slate-50 border-slate-300 text-slate-900 font-medium' : 'text-slate-400 border-transparent'
                }`}>
                  {generationStep > 2 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : generationStep === 2 ? <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-700" /> : <div className="w-3.5 h-3.5 rounded-full border border-slate-300" />}
                  <span>2. Creating code files</span>
                </div>

                <div className={`p-2 rounded border flex items-center space-x-2 ${
                  generationStep >= 3 ? 'bg-slate-50 border-slate-300 text-slate-900 font-medium' : 'text-slate-400 border-transparent'
                }`}>
                  {generationStep > 3 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : generationStep === 3 ? <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-700" /> : <div className="w-3.5 h-3.5 rounded-full border border-slate-300" />}
                  <span>3. Setting up test cases</span>
                </div>

                <div className={`p-2 rounded border flex items-center space-x-2 ${
                  generationStep >= 4 ? 'bg-slate-50 border-slate-300 text-slate-900 font-medium' : 'text-slate-400 border-transparent'
                }`}>
                  {generationStep >= 4 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <div className="w-3.5 h-3.5 rounded-full border border-slate-300" />}
                  <span>4. Ready!</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Prompt Input */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-800">
                  What kind of problem do you want to practice?
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={3}
                  placeholder="e.g. Build an in-memory Pub/Sub broker with channel topics and subscriber queues..."
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition"
                />
              </div>

              {/* Preset buttons */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                  Or pick a quick example:
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
                      className="p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-left transition cursor-pointer"
                    >
                      <div className="text-[11px] font-bold text-slate-900 truncate">
                        {preset.title}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {preset.difficulty}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryType)}
                    className="w-full p-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none"
                  >
                    <option value="full-stack">Full-Stack</option>
                    <option value="dsa">Algorithms</option>
                    <option value="quant">Math</option>
                    <option value="api-design">APIs</option>
                    <option value="low-level">Systems</option>
                    <option value="agentic-ai">AI</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">
                    Difficulty
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                    className="w-full p-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Staff/Principal">Staff</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 rounded transition cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={!prompt.trim()}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 ${
                    prompt.trim()
                      ? 'bg-slate-900 hover:bg-slate-800 text-white cursor-pointer'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Create Problem</span>
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};