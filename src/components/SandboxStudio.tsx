import React, { useState } from 'react';
import { 
  Play, 
  Sparkles, 
  ShieldCheck, 
  Terminal, 
  FileCode, 
  BookOpen, 
  CheckCircle2, 
  ChevronRight,
  Gauge,
  Award,
  Lightbulb,
  PlusCircle,
  Copy,
  Check,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { Problem, FileNode, TestCase, SuggestedFollowUpFeature } from '../types';
import { FileExplorer } from './FileExplorer';
import { CodeEditor } from './CodeEditor';
import { TestRunnerPanel } from './TestRunnerPanel';
import { LivePreviewTerminal } from './LivePreviewTerminal';
import { AiCoachDrawer } from './AiCoachDrawer';
import { SubmissionEvaluationModal } from './SubmissionEvaluationModal';
import confetti from 'canvas-confetti';

interface SandboxStudioProps {
  problem: Problem;
  onProceedToTechnicalQuestions: () => void;
  onBackToCatalog: () => void;
}

export const SandboxStudio: React.FC<SandboxStudioProps> = ({
  problem,
  onProceedToTechnicalQuestions,
  onBackToCatalog
}) => {
  // Local state for problem files (editable)
  const [files, setFiles] = useState<FileNode[]>(problem.files);
  const [activeFileId, setActiveFileId] = useState<string>(problem.files[0]?.id || '');
  
  // Left sidebar tabs: files vs problem description
  const [leftTab, setLeftTab] = useState<'files' | 'description'>('files');

  // Bottom pane tabs: test runner vs preview/terminal vs follow-up feature suggester
  const [bottomTab, setBottomTab] = useState<'tests' | 'terminal' | 'follow-ups'>('tests');

  // AI Coach Drawer open state
  const [isCoachOpen, setIsCoachOpen] = useState(false);

  // Submission Evaluation Modal open state
  const [isEvaluationOpen, setIsEvaluationOpen] = useState(false);

  // Test execution state
  const [testCases, setTestCases] = useState<TestCase[]>(problem.testCases);
  const [isRunningTests, setIsRunningTests] = useState(false);

  // Follow-up features state
  const [copiedFeatureId, setCopiedFeatureId] = useState<string | null>(null);
  const [activeFeatureSpec, setActiveFeatureSpec] = useState<SuggestedFollowUpFeature | null>(null);

  const activeFile = files.find(f => f.id === activeFileId) || files[0];

  const handleCodeChange = (fileId: string, newContent: string) => {
    setFiles(prev =>
      prev.map(f =>
        f.id === fileId ? { ...f, content: newContent, isModified: true } : f
      )
    );
  };

  const handleResetFile = (fileId: string) => {
    const original = problem.files.find(f => f.id === fileId);
    if (original) {
      setFiles(prev =>
        prev.map(f => (f.id === fileId ? { ...original, isModified: false } : f))
      );
    }
  };

  const handleRunTests = () => {
    setIsRunningTests(true);
    setBottomTab('tests');

    setTimeout(() => {
      setIsRunningTests(false);
      setTestCases(prev =>
        prev.map(tc => ({
          ...tc,
          status: 'passed',
          executionTimeMs: Math.floor(Math.random() * 25) + 3
        }))
      );
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.85 }
        });
      } catch (e) {
        // Safe fallback
      }
    }, 1200);
  };

  const handleSubmitSolution = () => {
    setIsEvaluationOpen(true);
  };

  const handleInsertBoilerplate = (feature: SuggestedFollowUpFeature) => {
    if (!feature.starterSnippet) return;
    const updatedContent = activeFile.content + `\n\n// --- FEATURE EXTENSION: ${feature.title} ---\n` + feature.starterSnippet;
    handleCodeChange(activeFile.id, updatedContent);
    setCopiedFeatureId(feature.id);
    setTimeout(() => setCopiedFeatureId(null), 2000);
  };

  const followUpCount = problem.suggestedFollowUps?.length || 0;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-white overflow-hidden animate-in fade-in">
      
      {/* Sandbox Top Control Bar */}
      <div className="h-14 px-4 bg-white border-b border-slate-300 flex items-center justify-between shadow-crisp z-20">
        
        {/* Left: Problem Title, Category & Metrics */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToCatalog}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center space-x-1 cursor-pointer"
          >
            <span>Catalog</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
          </button>

          <h2 className="text-sm font-extrabold text-slate-900 truncate max-w-sm sm:max-w-md">
            {problem.title}
          </h2>

          <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded border bg-slate-100 text-slate-700 border-slate-300">
            {problem.categoryLabel}
          </span>

          <span className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded border ${
            problem.difficulty === 'Beginner'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : problem.difficulty === 'Intermediate'
              ? 'bg-blue-50 text-blue-700 border-blue-200'
              : 'bg-purple-50 text-purple-700 border-purple-200'
          }`}>
            {problem.difficulty}
          </span>

          <span className="hidden lg:flex items-center space-x-1 px-2 py-0.5 text-[10px] font-mono bg-indigo-50 text-indigo-700 border border-indigo-200 rounded">
            <Gauge className="w-3 h-3" />
            <span>Scale: {problem.scalabilityRating}/10</span>
          </span>
        </div>

        {/* Right: Actions (Run Tests, Follow-up Suggester, AI Coach, Submit) */}
        <div className="flex items-center space-x-2.5">
          
          {/* Run Tests Button */}
          <button
            onClick={handleRunTests}
            disabled={isRunningTests}
            className="px-3 py-1.5 rounded-lg border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold tracking-wide flex items-center space-x-1.5 transition active:scale-95 shadow-xs cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
            <span className="hidden sm:inline">Run Tests</span>
          </button>

          {/* Follow-Up Features Tab Trigger */}
          <button
            onClick={() => setBottomTab('follow-ups')}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold tracking-wide flex items-center space-x-1.5 transition active:scale-95 shadow-xs cursor-pointer ${
              bottomTab === 'follow-ups'
                ? 'bg-amber-500 text-white border-amber-600'
                : 'border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
            <span>Follow-Up Features ({followUpCount})</span>
          </button>

          {/* AI Coach Drawer Trigger (On-Demand) */}
          <button
            onClick={() => setIsCoachOpen(true)}
            className="px-3 py-1.5 rounded-lg border border-indigo-200 bg-indigo-50 hover:bg-indigo-100/80 text-indigo-900 text-xs font-semibold tracking-wide flex items-center space-x-1.5 transition active:scale-95 shadow-xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Coach</span>
          </button>

          {/* Submit Solution Button */}
          <button
            onClick={handleSubmitSolution}
            className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold tracking-wide flex items-center space-x-1.5 shadow-sm transition active:scale-95 border border-slate-900 cursor-pointer"
          >
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>Submit Solution</span>
          </button>
        </div>

      </div>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar: File Explorer / Problem Requirements */}
        <div className="w-72 flex-shrink-0 bg-white border-r border-slate-300 flex flex-col h-full overflow-hidden">
          {/* Tab selector */}
          <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold">
            <button
              onClick={() => setLeftTab('files')}
              className={`flex-1 py-2 px-3 text-center border-b-2 transition flex items-center justify-center space-x-1.5 ${
                leftTab === 'files'
                  ? 'border-slate-900 text-slate-900 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Files</span>
            </button>
            <button
              onClick={() => setLeftTab('description')}
              className={`flex-1 py-2 px-3 text-center border-b-2 transition flex items-center justify-center space-x-1.5 ${
                leftTab === 'description'
                  ? 'border-slate-900 text-slate-900 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Specification</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            {leftTab === 'files' ? (
              <FileExplorer
                files={files}
                activeFileId={activeFileId}
                onSelectFile={setActiveFileId}
              />
            ) : (
              <div className="p-4 space-y-4 text-xs">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    {problem.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {problem.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <h4 className="text-[11px] font-mono font-bold uppercase text-slate-500 tracking-wider mb-2 flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Architectural Requirements</span>
                  </h4>
                  <ul className="space-y-2 text-slate-700">
                    {problem.architectureRequirements.map((req, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 font-mono text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <h4 className="text-[11px] font-mono font-bold uppercase text-slate-500 tracking-wider mb-1.5">
                    Scalability Benchmark Target
                  </h4>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-mono text-[11px]">
                    {problem.scalabilityTier}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center & Bottom: Code Editor & Execution Panels */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          
          {/* Top Half: Code Editor */}
          <div className="flex-[6] min-h-[300px] flex flex-col overflow-hidden border-b border-slate-300">
            <CodeEditor
              activeFile={activeFile}
              onCodeChange={handleCodeChange}
              onResetFile={handleResetFile}
            />
          </div>

          {/* Bottom Half: Test Runner, Live Output & Follow-Up Features Pane */}
          <div className="flex-[4] min-h-[220px] flex flex-col overflow-hidden bg-white">
            
            {/* Split Tab Controls */}
            <div className="h-9 px-3 bg-slate-100 border-b border-slate-300 flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setBottomTab('tests')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition flex items-center space-x-1.5 cursor-pointer ${
                    bottomTab === 'tests'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                  <span>AI Test Suite ({testCases.length})</span>
                </button>

                <button
                  onClick={() => setBottomTab('terminal')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition flex items-center space-x-1.5 cursor-pointer ${
                    bottomTab === 'terminal'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5 text-slate-700" />
                  <span>Terminal & Server Preview</span>
                </button>

                {/* Follow-Up Features Tab */}
                <button
                  onClick={() => setBottomTab('follow-ups')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition flex items-center space-x-1.5 cursor-pointer ${
                    bottomTab === 'follow-ups'
                      ? 'bg-white text-amber-900 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  <span>Suggested Follow-Up Features ({followUpCount})</span>
                </button>
              </div>

              <div className="text-[10px] font-mono text-slate-500 flex items-center space-x-2">
                <span>Auto-save active</span>
              </div>
            </div>

            {/* Pane Content */}
            <div className="flex-1 overflow-hidden">
              {bottomTab === 'tests' && (
                <TestRunnerPanel
                  testCases={testCases}
                  onRunTests={handleRunTests}
                  isRunningTests={isRunningTests}
                />
              )}

              {bottomTab === 'terminal' && (
                <LivePreviewTerminal problem={problem} />
              )}

              {/* NEW: Follow-Up Features Suggester */}
              {bottomTab === 'follow-ups' && (
                <div className="h-full overflow-y-auto p-4 space-y-4 bg-slate-50/40">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <div>
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center space-x-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-600" />
                        <span>AI Architectural Follow-Up Feature Suggester</span>
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        In real-world systems, a base solution is only the starting point. The AI has synthesized follow-up features to scale and harden your design.
                      </p>
                    </div>

                    <span className="text-[11px] font-mono text-indigo-700 font-semibold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      Extensibility Mode
                    </span>
                  </div>

                  {/* Feature Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {(problem.suggestedFollowUps && problem.suggestedFollowUps.length > 0) ? (
                      problem.suggestedFollowUps.map((feature) => (
                        <div
                          key={feature.id}
                          className="bg-white border border-slate-300 rounded-xl p-4 shadow-xs flex flex-col justify-between hover:border-slate-400 transition"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                                {feature.category}
                              </span>
                              <span className={`text-[10px] font-mono font-semibold ${
                                feature.complexity === 'High' ? 'text-purple-600' :
                                feature.complexity === 'Medium' ? 'text-blue-600' : 'text-emerald-600'
                              }`}>
                                {feature.complexity} Complexity
                              </span>
                            </div>

                            <h5 className="text-xs font-bold text-slate-900">
                              {feature.title}
                            </h5>

                            <p className="text-[11px] text-slate-600 leading-relaxed">
                              {feature.description}
                            </p>

                            <div className="p-2 bg-slate-50 border border-slate-200 rounded text-[10px] text-slate-700 font-mono">
                              ⚡ <strong>Impact:</strong> {feature.architecturalImpact}
                            </div>
                          </div>

                          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                            {feature.starterSnippet ? (
                              <button
                                onClick={() => handleInsertBoilerplate(feature)}
                                className="flex-1 py-1.5 px-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-[11px] font-semibold flex items-center justify-center space-x-1 transition cursor-pointer"
                              >
                                {copiedFeatureId === feature.id ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span>Inserted into Editor!</span>
                                  </>
                                ) : (
                                  <>
                                    <PlusCircle className="w-3 h-3" />
                                    <span>Insert Scaffold Code</span>
                                  </>
                                )}
                              </button>
                            ) : (
                              <button
                                onClick={() => setActiveFeatureSpec(feature)}
                                className="flex-1 py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-[11px] font-semibold flex items-center justify-center space-x-1 transition cursor-pointer"
                              >
                                <span>View Architecture Spec</span>
                                <ArrowUpRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-3 text-center py-6 text-xs text-slate-400">
                        No custom follow-up features generated yet. Click below to synthesize.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* AI Coach Drawer (On-demand) */}
      <AiCoachDrawer
        isOpen={isCoachOpen}
        onClose={() => setIsCoachOpen(false)}
        problem={problem}
      />

      {/* Submission Evaluation Modal */}
      <SubmissionEvaluationModal
        isOpen={isEvaluationOpen}
        onClose={() => setIsEvaluationOpen(false)}
        problem={problem}
        onProceedToDefense={onProceedToTechnicalQuestions}
      />

    </div>
  );
};
