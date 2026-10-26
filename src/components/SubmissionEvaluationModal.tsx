import React from 'react';
import { 
  X, 
  CheckCircle2, 
  Award, 
  Gauge, 
  Zap, 
  TrendingUp, 
  AlertTriangle, 
  ArrowRight, 
  ShieldCheck, 
  Activity, 
  MessageSquareCode
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
    timeComplexity: 'O(1) amortized lookup & insertion',
    spaceComplexity: 'O(N) bounded memory capacity',
    p99Latency: '1.42 ms',
    throughput: '64,800 req / sec',
    memoryFootprint: '24.2 MB RSS under load',
    verdict: 'Production Ready',
    strengths: [
      'Strict separation of concern between transformation math and socket transport layer',
      'Thread-safe lock striping eliminates global mutex bottleneck across concurrent workers',
      'Defensive error wrapping prevents unhandled promise rejections on malformed payloads'
    ],
    bottlenecks: [
      'Operation history journal does not currently checkpoint into cold storage after 1,000 revisions',
      'Garbage collector minor pause observed when client reconnection surge exceeds 10,000 sockets'
    ],
    optimizationTransparency: 'Our AI evaluated "optimized" as: (1) minimizing lock contention across multi-core processors, (2) bounding memory usage via deterministic LRU eviction so the process will never encounter an Out Of Memory crash, and (3) preserving standard response semantics without sacrificing throughput.',
    architectureGrading: {
      modularDesign: 98,
      errorHandling: 94,
      concurrencySafety: 95,
      dataIntegrity: 92
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white border border-slate-300 rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-modal">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
                  {evaluation.verdict}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Automated GenAI Evaluation
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
                Comprehensive Accuracy & Scalability Audit
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          
          {/* Top Score Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Accuracy Score Card */}
            <div className="p-5 rounded-xl border border-slate-300 bg-slate-50/60 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider">
                  Test Accuracy Score
                </span>
                <div className="text-3xl font-extrabold text-slate-900 mt-1">
                  {evaluation.accuracyScore}<span className="text-lg text-slate-400 font-semibold">/100</span>
                </div>
                <p className="text-xs text-emerald-700 font-medium mt-1 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>All core assertions & invariants passed</span>
                </p>
              </div>
              <div className="w-14 h-14 rounded-full border-4 border-emerald-500 bg-white flex items-center justify-center font-bold text-emerald-700 text-lg shadow-xs">
                96%
              </div>
            </div>

            {/* Scalability Score Card */}
            <div className="p-5 rounded-xl border border-slate-300 bg-slate-50/60 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider">
                  Production Scalability Score
                </span>
                <div className="text-3xl font-extrabold text-slate-900 mt-1">
                  {evaluation.scalabilityScore}<span className="text-lg text-slate-400 font-semibold">/100</span>
                </div>
                <p className="text-xs text-indigo-700 font-medium mt-1 flex items-center space-x-1">
                  <Gauge className="w-3.5 h-3.5" />
                  <span>Benchmarked to {problem.scalabilityTier}</span>
                </p>
              </div>
              <div className="w-14 h-14 rounded-full border-4 border-indigo-600 bg-white flex items-center justify-center font-bold text-indigo-700 text-lg shadow-xs">
                92%
              </div>
            </div>

          </div>

          {/* Performance & Big-O Breakdown Matrix */}
          <div className="bg-white border border-slate-300 rounded-xl p-4 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-2">
              <Activity className="w-4 h-4 text-slate-600" />
              <span>Algorithmic & Runtime Profile</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Time Complexity</span>
                <span className="text-slate-900 font-bold text-xs">{evaluation.timeComplexity}</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Space Complexity</span>
                <span className="text-slate-900 font-bold text-xs">{evaluation.spaceComplexity}</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-[10px] uppercase text-slate-400 font-bold block">p99 Latency</span>
                <span className="text-slate-900 font-bold text-xs">{evaluation.p99Latency}</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Throughput Peak</span>
                <span className="text-slate-900 font-bold text-xs">{evaluation.throughput}</span>
              </div>
            </div>
          </div>

          {/* Transparent Optimization Explanation */}
          <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-2">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-indigo-700" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-950">
                Optimization Rationale & Invariant Audit
              </h4>
            </div>
            <p className="text-xs text-indigo-950 leading-relaxed">
              {evaluation.optimizationTransparency}
            </p>
          </div>

          {/* Strengths & Trade-offs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Strengths */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Production Strengths</span>
              </span>
              <ul className="space-y-1.5 text-slate-600">
                {evaluation.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottlenecks */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase text-amber-700 flex items-center space-x-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Identified Bottlenecks & Scale Limits</span>
              </span>
              <ul className="space-y-1.5 text-slate-600">
                {evaluation.bottlenecks.map((bot, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{bot}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Call to Action: Proceed to Technical Defense Mode */}
          <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <MessageSquareCode className="w-4 h-4 text-amber-300" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  Next Step: Technical Questions
                </h4>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-md">
                Answer technical follow-up questions from the AI interviewer to explain your architectural choices and performance bounds.
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToDefense();
              }}
              className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs rounded-lg tracking-wide transition flex items-center space-x-1.5 whitespace-nowrap shadow-sm self-start sm:self-auto cursor-pointer"
            >
              <span>Answer Technical Questions</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-900" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
