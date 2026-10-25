import React, { useState } from 'react';
import { 
  Play, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ShieldCheck, 
  Loader2, 
  Sparkles
} from 'lucide-react';
import { TestCase } from '../types';

interface TestRunnerPanelProps {
  testCases: TestCase[];
  onRunTests: () => void;
  isRunningTests: boolean;
}

export const TestRunnerPanel: React.FC<TestRunnerPanelProps> = ({
  testCases,
  onRunTests,
  isRunningTests
}) => {
  const [selectedTestCaseId, setSelectedTestCaseId] = useState<string>(testCases[0]?.id || '');

  const activeTest = testCases.find(t => t.id === selectedTestCaseId) || testCases[0];

  const passedCount = testCases.filter(t => t.status === 'passed').length;
  const failedCount = testCases.filter(t => t.status === 'failed').length;

  return (
    <div className="flex flex-col h-full bg-white select-none">
      
      {/* Header Bar (Gestalt: Common Region, Emphasis: Run Button) */}
      <div className="p-3 bg-slate-50 border-b border-slate-300 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold text-slate-950 uppercase font-mono tracking-wider">
              AI-Generated Testcases
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded font-bold flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>{passedCount} Passed</span>
            </span>
            {failedCount > 0 && (
              <span className="px-2 py-0.5 bg-rose-50 text-rose-800 border border-rose-300 rounded font-bold flex items-center space-x-1">
                <XCircle className="w-3 h-3 text-rose-600" />
                <span>{failedCount} Failed</span>
              </span>
            )}
          </div>
        </div>

        {/* Run Tests Button (Emphasis: Primary CTA) */}
        <button
          onClick={onRunTests}
          disabled={isRunningTests}
          className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold tracking-wide flex items-center space-x-1.5 transition active:scale-95 shadow-xs cursor-pointer border border-slate-950"
        >
          {isRunningTests ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Evaluating Test Suite...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
              <span>Run AI Test Suite</span>
            </>
          )}
        </button>
      </div>

      {/* Main Content: Split Test List & Test Details (Balance: Equal Visual Weight) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Test Case Tabs (Gestalt: Proximity & Similarity) */}
        <div className="w-64 border-r border-slate-200 p-2 space-y-1 overflow-y-auto bg-slate-50/50">
          {testCases.map((tc, idx) => {
            const isSelected = tc.id === activeTest?.id;
            return (
              <button
                key={tc.id}
                onClick={() => setSelectedTestCaseId(tc.id)}
                className={`w-full text-left p-2.5 rounded-lg border transition flex flex-col space-y-1 cursor-pointer ${
                  isSelected
                    ? 'bg-white border-slate-950 shadow-xs'
                    : 'bg-white/70 border-slate-200 hover:bg-white text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                    Test #{idx + 1} • {tc.type}
                  </span>
                  {tc.status === 'passed' ? (
                    <span className="text-[10px] font-mono font-bold text-emerald-700 flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{tc.executionTimeMs}ms</span>
                    </span>
                  ) : tc.status === 'failed' ? (
                    <span className="text-[10px] font-mono font-bold text-rose-700 flex items-center space-x-1">
                      <XCircle className="w-3 h-3 text-rose-600" />
                      <span>Failed</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-400">Idle</span>
                  )}
                </div>
                <div className="text-xs font-bold text-slate-950 truncate">
                  {tc.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Selected Test Case Diagnostics (Hierarchy & Common Region) */}
        {activeTest && (
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            
            {/* Title & Status */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                  {activeTest.type} test suite
                </span>
                <h4 className="text-sm font-bold text-slate-950">
                  {activeTest.name}
                </h4>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono text-slate-500 flex items-center space-x-1 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Latency: {activeTest.executionTimeMs || 4}ms</span>
                </span>
                <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300">
                  Passed Verification
                </span>
              </div>
            </div>

            {/* Test Case Description */}
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              {activeTest.description}
            </p>

            {/* Input & Output Grids (Contrast: Distinct Inset Boxes) */}
            <div className="space-y-3 font-mono text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">
                  Input / Test Vector:
                </span>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 overflow-x-auto text-[11px] font-medium">
                  {activeTest.input}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">
                  Expected Invariant / Assertion:
                </span>
                <div className="p-2.5 bg-emerald-50/30 border border-emerald-200 rounded-lg text-emerald-950 overflow-x-auto text-[11px] font-medium">
                  {activeTest.expectedOutput}
                </div>
              </div>
            </div>

            {/* Why This Passed Diagnostic */}
            <div className="p-3.5 bg-indigo-50/60 border border-indigo-200 rounded-xl space-y-1.5">
              <div className="flex items-center space-x-1.5 text-indigo-950 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>AI Test Assertion Diagnostic (Why It Passed)</span>
              </div>
              <p className="text-xs text-indigo-950 leading-relaxed">
                {activeTest.explanation}
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
