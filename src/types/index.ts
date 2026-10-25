export type CategoryType = 
  | 'full-stack' 
  | 'api-design' 
  | 'low-level' 
  | 'dsa'
  | 'ml-fundamentals' 
  | 'agentic-ai' 
  | 'quant'
  | 'custom';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Staff/Principal';

export type ScalabilityLevel = 'Standard (1K req/s)' | 'High (50K req/s)' | 'Ultra Scale (1M+ req/s)' | 'Distributed / Fault-Tolerant';

export interface FileNode {
  id: string;
  name: string;
  path: string;
  language: 'typescript' | 'javascript' | 'json' | 'sql' | 'python' | 'markdown' | 'css';
  content: string;
  isModified?: boolean;
  type: 'file' | 'directory';
  children?: FileNode[];
}

export interface TestCase {
  id: string;
  name: string;
  type: 'unit' | 'integration' | 'edge-case' | 'scalability';
  description: string;
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  status: 'idle' | 'running' | 'passed' | 'failed';
  executionTimeMs?: number;
  explanation: string;
}

export interface InterviewDefenseQuestion {
  id: string;
  question: string;
  context: string;
  idealAnswerHighlights: string[];
  candidateResponse?: string;
  aiFeedback?: string;
  score?: number;
}

export interface SuggestedFollowUpFeature {
  id: string;
  title: string;
  complexity: 'Low' | 'Medium' | 'High';
  category: 'Scalability' | 'Security' | 'Resilience' | 'Observability' | 'Extensibility';
  description: string;
  architecturalImpact: string;
  starterSnippet?: string;
}

export interface Problem {
  id: string;
  title: string;
  category: CategoryType;
  categoryLabel: string;
  difficulty: DifficultyLevel;
  scalabilityRating: number; // 1 to 10 scale
  scalabilityTier: string;
  estimatedMinutes: number;
  summary: string;
  detailedDescription: string;
  architectureRequirements: string[];
  files: FileNode[];
  testCases: TestCase[];
  aiHintLevels: {
    level: 1 | 2 | 3 | 4;
    name: string;
    description: string;
    content: string;
  }[];
  defenseQuestions: InterviewDefenseQuestion[];
  suggestedFollowUps: SuggestedFollowUpFeature[];
  tags: string[];
  isAiGenerated?: boolean;
}

export interface SubmissionEvaluation {
  accuracyScore: number; // 0-100
  scalabilityScore: number; // 0-100
  timeComplexity: string;
  spaceComplexity: string;
  p99Latency: string;
  throughput: string;
  memoryFootprint: string;
  verdict: 'Production Ready' | 'Needs Scale Optimization' | 'Logic Bottlenecks Detected';
  strengths: string[];
  bottlenecks: string[];
  optimizationTransparency: string;
  architectureGrading: {
    modularDesign: number;
    errorHandling: number;
    concurrencySafety: number;
    dataIntegrity: number;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'coach';
  timestamp: string;
  text: string;
  codeSnippet?: string;
  assistanceTier?: 'nudge' | 'direction' | 'pseudocode' | 'deep-review';
}

export interface BehavioralQuestion {
  id: string;
  category: 'Leadership & Initiative' | 'Conflict Resolution' | 'Overcoming Failure' | 'Delivering Under Pressure' | 'Technical Disagreement';
  title: string;
  question: string;
  context: string;
  starPrompts: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  sampleAnswer: string;
  evaluationRubric: string[];
}
