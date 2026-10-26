import React, { useState } from 'react';
import { 
  Play, 
  Sparkles, 
  CheckCircle, 
  FileCode, 
  BookOpen, 
  ChevronLeft,
  Award,
  Lightbulb,
  PlusCircle,
  Check,
  Terminal,
  ShieldCheck
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
  
  // Left sidebar tabs: files vs instructions
  const [leftTab, setLeftTab] = useState<'files' | 'description'>('files');

  // Bottom pane tabs: tests vs terminal vs ideas
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
          executionTimeMs: Math.floor(Math.random() * 20) + 4
        }))
      );
      try {
        confetti({
          particleCount: 35,
          spread: 50,
          origin: { y: 0.85 }
        });
      } catch (e) {
        // Safe fallback
      }
    }, 900);
  };

  const handleSubmitSolution = () => {
    setIsEvaluationOpen(true);
  };

  const handleInsertBoilerplate = (feature: SuggestedFollowUpFeature) => {
    if (!feature.starterSnippet) return;
    const updatedContent = activeFile.content + `\n\n// --- BONUS FEATURE: ${feature.title} ---\n` + feature.starterSnippet;
    handleCodeChange(activeFile.id, updatedContent);
    setCopiedFeatureId(feature.id);
    setTimeout(() => setCopiedFeatureId(null), 2000);
  };

  const followUpCount = problem.suggestedFollowUps?.length || 0;

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] bg-white overflow-hidden">
      
      {/* Top Bar */}
      <div className="h-12 px-4 bg-white border-b border-slate-200 flex items-center justify-between z-20">
        
        {/* Left: Problem Title & Info */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToCatalog}
            className="text-xs font-medium text-slate-500 hover:text-slate-900 flex items-center space-x-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Problems</span>
          </button>

          <span className="text-slate-300">|</span>

          <h2 className="text-xs sm:text-sm font-bold text-slate-900 truncate max-w-xs sm:max-w-md">
            {problem.title}
          </h2>

          <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-slate-100 text-slate-600 rounded">
            {problem.difficulty}
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2">
          
          {/* Run Tests Button */}
          <button
            onClick={handleRunTests}
            disabled={isRunningTests}
            className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-medium flex items-center space-x-1.5 transition cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
            <span>Run Tests</span>
          </button>

          {/* Ideas Tab Trigger */}
          <button
            onClick={() => setBottomTab('follow-ups')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition cursor-pointer ${
              bottomTab === 'follow-ups'
                ? 'bg-amber-100 text-amber-900 font-semibold'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
            <span>Ideas ({followUpCount})</span>
          </button>

          {/* AI Coach Drawer Trigger */}
          <button
            onClick={() => setIsCoachOpen(true)}
            className="px-3 py-1.5 rounded-lg border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-xs font-medium flex items-center space-x-1.5 transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Hints</span>
          </button>

          {/* Submit Solution Button */}
          <button
            onClick={handleSubmitSolution}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium flex items-center space-x-1.5 transition cursor-pointer"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Submit</span>
          </button>
        </div>

      </div>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar: Files / Instructions */}
        <div className="w-64 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col h-full overflow-hidden">
          {/* Tab selector */}
          <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-medium">
            <button
              onClick={() => setLeftTab('files')}
              className={`flex-1 py-2 text-center transition flex items-center justify-center space-x-1.5 ${
                leftTab === 'files'
                  ? 'border-b-2 border-slate-900 text-slate-900 bg-white font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Files</span>
            </button>
            <button
              onClick={() => setLeftTab('description')}
              className={`flex-1 py-2 text-center transition flex items-center justify-center space-x-1.5 ${
                leftTab === 'description'
                  ? 'border-b-2 border-slate-900 text-slate-900 bg-white font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Task</span>
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
                  <h3 className="font-bold text-slate-900 mb-1">
                    {problem.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {problem.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <h4 className="text-[11px] font-mono font-bold uppercase text-slate-400 mb-2">
                    Requirements
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
                  <h4 className="text-[11px] font-mono font-bold uppercase text-slate-400 mb-1">
                    Target Goal
                  </h4>
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded text-slate-700 font-mono text-[11px]">
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
          <div className="flex-[6] min-h-[260px] flex flex-col overflow-hidden border-b border-slate-200">
            <CodeEditor
              activeFile={activeFile}
              onCodeChange={handleCodeChange}
              onResetFile={handleResetFile}
            />
          </div>

          {/* Bottom Half: Test Runner, Terminal & Ideas */}
          <div className="flex-[4] min-h-[200px] flex flex-col overflow-hidden bg-white">
            
            {/* Split Tab Controls */}
            <div className="h-9 px-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setBottomTab('tests')}
                  className={`px-3 py-1 text-xs rounded-md transition flex items-center space-x-1.5 cursor-pointer ${
                    bottomTab === 'tests'
                      ? 'bg-white text-slate-900 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Tests ({testCases.length})</span>
                </button>

                <button
                  onClick={() => setBottomTab('terminal')}
                  className={`px-3 py-1 text-xs rounded-md transition flex items-center space-x-1.5 cursor-pointer ${
                    bottomTab === 'terminal'
                      ? 'bg-white text-slate-900 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5 text-slate-600" />
                  <span>Terminal</span>
                </button>

                <button
                  onClick={() => setBottomTab('follow-ups')}
                  className={`px-3 py-1 text-xs rounded-md transition flex items-center space-x-1.5 cursor-pointer ${
                    bottomTab === 'follow-ups'
                      ? 'bg-white text-amber-900 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  <span>Ideas ({followUpCount})</span>
                </button>
              </div>

              <div className="text-[10px] font-mono text-slate-400">
                Ready to run
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

              {/* Ideas */}
              {bottomTab === 'follow-ups' && (
                <div className="h-full overflow-y-auto p-4 space-y-3 bg-slate-50/50">
                  <div className="pb-2 border-b border-slate-200">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                      <span>Extra Features to Try</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Try adding these extensions to your code to make it faster or more reliable.
                    </p>
                  </div>

                  {/* Feature Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {(problem.suggestedFollowUps && problem.suggestedFollowUps.length > 0) ? (
                      problem.suggestedFollowUps.map((feature) => (
                        <div
                          key={feature.id}
                          className="bg-white border border-slate-200 rounded-lg p-3.5 flex flex-col justify-between"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-[10px] font-mono">
                              <span className="font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                                {feature.category}
                              </span>
                              <span className="text-slate-400">
                                {feature.complexity}
                              </span>
                            </div>

                            <h5 className="text-xs font-bold text-slate-900">
                              {feature.title}
                            </h5>

                            <p className="text-[11px] text-slate-600 leading-relaxed">
                              {feature.description}
                            </p>
                          </div>

                          <div className="mt-3 pt-2 border-t border-slate-100">
                            {feature.starterSnippet ? (
                              <button
                                onClick={() => handleInsertBoilerplate(feature)}
                                className="w-full py-1.5 px-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-[11px] font-medium flex items-center justify-center space-x-1 transition cursor-pointer"
                              >
                                {copiedFeatureId === feature.id ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span>Added to code!</span>
                                  </>
                                ) : (
                                  <>
                                    <PlusCircle className="w-3 h-3" />
                                    <span>Add code scaffold</span>
                                  </>
                                )}
                              </button>
                            ) : (
                              <span className="text-[10px] text-slate-400 font-mono block text-center">
                                Conceptual extension
                              </span>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-3 text-center py-6 text-xs text-slate-400">
                        No extra features for this question yet.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* AI Coach Drawer */}
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