import React, { useState } from 'react';
import { 
  Play, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ShieldCheck, 
  Loader2
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
      
      {/* Header Bar */}
      <div className="p-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Test Cases</span>
          </div>

          <div className="flex items-center space-x-1.5 text-xs font-mono">
            <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[11px] font-medium flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>{passedCount} Passed</span>
            </span>
            {failedCount > 0 && (
              <span className="px-1.5 py-0.5 bg-rose-50 text-rose-700 rounded text-[11px] font-medium flex items-center space-x-1">
                <XCircle className="w-3 h-3 text-rose-600" />
                <span>{failedCount} Failed</span>
              </span>
            )}
          </div>
        </div>

        {/* Run Tests Button */}
        <button
          onClick={onRunTests}
          disabled={isRunningTests}
          className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium flex items-center space-x-1.5 transition cursor-pointer"
        >
          {isRunningTests ? (
            <>
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Running...</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
              <span>Run Tests</span>
            </>
          )}
        </button>
      </div>

      {/* Main Split Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Test Case Tabs */}
        <div className="w-56 border-r border-slate-200 p-1.5 space-y-1 overflow-y-auto bg-slate-50">
          {testCases.map((tc, idx) => {
            const isSelected = tc.id === activeTest?.id;
            return (
              <button
                key={tc.id}
                onClick={() => setSelectedTestCaseId(tc.id)}
                className={`w-full text-left p-2 rounded-lg border transition flex flex-col space-y-0.5 cursor-pointer ${
                  isSelected
                    ? 'bg-white border-slate-900'
                    : 'bg-white/80 border-slate-200 hover:bg-white text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">
                    Test #{idx + 1}
                  </span>
                  {tc.status === 'passed' ? (
                    <span className="text-emerald-700 flex items-center space-x-1">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                      <span>{tc.executionTimeMs}ms</span>
                    </span>
                  ) : tc.status === 'failed' ? (
                    <span className="text-rose-700">Failed</span>
                  ) : (
                    <span className="text-slate-400">Ready</span>
                  )}
                </div>
                <div className="text-xs font-bold text-slate-900 truncate">
                  {tc.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Test Diagnostics */}
        {activeTest && (
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3">
            
            {/* Title & Status */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400">
                  {activeTest.type} test
                </span>
                <h4 className="text-xs font-bold text-slate-900">
                  {activeTest.name}
                </h4>
              </div>

              <span className="text-[11px] font-mono text-slate-400 flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{activeTest.executionTimeMs || 4}ms</span>
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {activeTest.description}
            </p>

            {/* Inputs & Outputs */}
            <div className="space-y-2 font-mono text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">
                  Input:
                </span>
                <div className="p-2 bg-slate-50 border border-slate-200 rounded text-slate-800 text-[11px]">
                  {activeTest.input}
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">
                  Expected Result:
                </span>
                <div className="p-2 bg-emerald-50/50 border border-emerald-200 rounded text-emerald-900 text-[11px]">
                  {activeTest.expectedOutput}
                </div>
              </div>
            </div>

            {/* Explanation */}
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600">
              <span className="font-semibold text-slate-800 block mb-0.5">Verification Note:</span>
              {activeTest.explanation}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};