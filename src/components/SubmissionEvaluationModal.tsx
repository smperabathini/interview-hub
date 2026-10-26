import React from 'react';
import { 
  X, 
  CheckCircle2, 
  Award, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Activity, 
  MessageSquare
} from 'lucide-react';
import { Problem, SubmissionEvaluation } from '../types';

interface SubmissionEvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  problem: Problem;
  onProceedToDefense: () => void;
}

export const SubmissionEvaluationModal: React.FC<SubmissionEvaluationModalProps> = ({
  isOpen,
  onClose,
  problem,
  onProceedToDefense
}) => {
  if (!isOpen) return null;

  const evaluation: SubmissionEvaluation = {
    accuracyScore: 96,
    scalabilityScore: 92,
    timeComplexity: 'O(1) average lookup',
    spaceComplexity: 'O(N) memory',
    p99Latency: '1.4 ms',
    throughput: '65,000 req/sec',
    memoryFootprint: '24 MB',
    verdict: 'Production Ready',
    strengths: [
      'Separated state management from network code cleanly',
      'Thread-safe data structures avoid concurrency bugs',
      'Handled null and invalid inputs defensively'
    ],
    bottlenecks: [
      'History is not yet compressed after 1,000 updates',
      'Garbage collection pauses may occur during sudden traffic spikes'
    ],
    optimizationTransparency: 'Your code keeps memory bounded and handles multiple requests without blocking the main event loop.',
    architectureGrading: {
      modularDesign: 98,
      errorHandling: 94,
      concurrencySafety: 95,
      dataIntegrity: 92
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white border border-slate-200 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-emerald-50 text-emerald-700 rounded font-bold uppercase">
                  {evaluation.verdict}
                </span>
                <span className="text-xs text-slate-400">• Prototype Evaluation</span>
              </div>
              <h2 className="text-base font-bold text-slate-900">
                Solution Results
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          
          {/* Top Score Cards */}
          <div className="grid grid-cols-2 gap-3">
            
            {/* Accuracy Score */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                  Tests Passed
                </span>
                <div className="text-2xl font-bold text-slate-900 mt-0.5">
                  {evaluation.accuracyScore}<span className="text-sm text-slate-400 font-normal">/100</span>
                </div>
                <p className="text-[11px] text-emerald-700 mt-0.5">
                  All assertions passed
                </p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-emerald-500 bg-white flex items-center justify-center font-bold text-emerald-700 text-sm">
                96%
              </div>
            </div>

            {/* Scalability Score */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                  Speed & Scale
                </span>
                <div className="text-2xl font-bold text-slate-900 mt-0.5">
                  {evaluation.scalabilityScore}<span className="text-sm text-slate-400 font-normal">/100</span>
                </div>
                <p className="text-[11px] text-indigo-700 mt-0.5">
                  Fast execution
                </p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-indigo-600 bg-white flex items-center justify-center font-bold text-indigo-700 text-sm">
                92%
              </div>
            </div>

          </div>

          {/* Performance stats */}
          <div className="border border-slate-200 rounded-lg p-3 space-y-2">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
              Performance Stats
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
              <div className="p-2 bg-slate-50 border border-slate-100 rounded">
                <span className="text-[10px] text-slate-400 block">Time</span>
                <span className="text-slate-900 font-bold">{evaluation.timeComplexity}</span>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-100 rounded">
                <span className="text-[10px] text-slate-400 block">Space</span>
                <span className="text-slate-900 font-bold">{evaluation.spaceComplexity}</span>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-100 rounded">
                <span className="text-[10px] text-slate-400 block">Latency</span>
                <span className="text-slate-900 font-bold">{evaluation.p99Latency}</span>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-100 rounded">
                <span className="text-[10px] text-slate-400 block">Throughput</span>
                <span className="text-slate-900 font-bold">{evaluation.throughput}</span>
              </div>
            </div>
          </div>

          {/* Strengths & Improvements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Strengths */}
            <div className="p-3 rounded-lg border border-slate-200 bg-white space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>What went well</span>
              </span>
              <ul className="space-y-1 text-slate-600">
                {evaluation.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start space-x-1">
                    <span className="text-emerald-500">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvements */}
            <div className="p-3 rounded-lg border border-slate-200 bg-white space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase text-amber-700 flex items-center space-x-1">
                <Zap className="w-3.5 h-3.5" />
                <span>Things to improve</span>
              </span>
              <ul className="space-y-1 text-slate-600">
                {evaluation.bottlenecks.map((bot, idx) => (
                  <li key={idx} className="flex items-start space-x-1">
                    <span className="text-amber-500">•</span>
                    <span>{bot}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action: Next Step */}
          <div className="p-3.5 rounded-lg bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold text-white flex items-center space-x-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>Next: Technical Q&A</span>
              </h4>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Explain your architectural choices and how the code handles edge cases.
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToDefense();
              }}
              className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs rounded-lg transition flex items-center space-x-1 whitespace-nowrap self-start sm:self-auto cursor-pointer"
            >
              <span>Answer Questions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};