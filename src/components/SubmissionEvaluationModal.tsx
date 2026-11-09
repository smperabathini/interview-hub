import React, { useState } from 'react';
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
  MessageSquareCode,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  XCircle,
  Info
} from 'lucide-react';
import { Problem, SubmissionEvaluation } from '../types';

interface SubmissionEvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  problem: Problem;
  onProceedToDefense: () => void;
  hasFailedTests?: boolean;
  onReviseSolution?: () => void;
  onViewCorrectSolution?: () => void;
}

export const SubmissionEvaluationModal: React.FC<SubmissionEvaluationModalProps> = ({
  isOpen,
  onClose,
  problem,
  onProceedToDefense,
  hasFailedTests = false,
  onReviseSolution,
  onViewCorrectSolution
}) => {
  const [showScoreExplanation, setShowScoreExplanation] = useState(false);

  if (!isOpen) return null;

  const evaluation: SubmissionEvaluation = hasFailedTests ? {
    accuracyScore: 48,
    scalabilityScore: 65,
    timeComplexity: 'O(N^2) unoptimized quadratic scan',
    spaceComplexity: 'O(N) unbounded memory buffer',
    p99Latency: '42.8 ms (High tail latency)',
    throughput: '8,200 req / sec',
    memoryFootprint: '112.4 MB RSS (Memory leak suspected)',
    verdict: 'Logic Bottlenecks Detected',
    strengths: [
      'Basic operational handlers wired up correctly',
      'Initial payload validation correctly catches empty strings'
    ],
    bottlenecks: [
      'Failed concurrency invariant: Race condition detected during simultaneous revisions at offset 0',
      'Unbounded array growth causes memory bloat under sustained 1,000 req/sec benchmark',
      'Missing client ID tie-breaking logic results in divergent client document forks'
    ],
    optimizationTransparency: 'Our automated evaluation identified a logic failure in revision synchronization. Tie-breaking between concurrent clients is required to guarantee eventual consistency across all replicas.',
    architectureGrading: {
      modularDesign: 70,
      errorHandling: 55,
      concurrencySafety: 40,
      dataIntegrity: 48
    }
  } : {
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

  const primaryFollowUpQuestion = problem.defenseQuestions?.[0]?.question || 
    `How does your architecture for ${problem.title} handle catastrophic hardware failure or network partition?`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white border border-slate-300 rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-modal">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl text-white flex items-center justify-center shadow-sm ${
              hasFailedTests ? 'bg-rose-600' : 'bg-emerald-600'
            }`}>
              {hasFailedTests ? <AlertTriangle className="w-5 h-5" /> : <Award className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded border ${
                  hasFailedTests 
                    ? 'bg-rose-50 text-rose-700 border-rose-200' 
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  {evaluation.verdict}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Automated GenAI Evaluation
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
                Comprehensive Accuracy & Scalability Audit
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-6">
          
          {/* USER REQUIREMENT: Don't show the follow up for the incorrect answer submission */}
          {!hasFailedTests && (
            <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-indigo-900/60 shadow-sm animate-in fade-in">
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-mono font-extrabold uppercase tracking-wider">
                    Recommended Next Step
                  </span>
                  <span className="text-xs font-mono text-indigo-200">
                    Architectural Follow-Up
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white flex items-start space-x-2">
                  <MessageSquareCode className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">"{primaryFollowUpQuestion}"</span>
                </h3>
                <p className="text-xs text-slate-300">
                  In real engineering loops, the coding solution is only part of the evaluation. Interviewers evaluate how you defend tradeoffs and design under failure.
                </p>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToDefense();
                }}
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg tracking-wide transition flex items-center space-x-1.5 whitespace-nowrap shadow-sm self-start sm:self-auto cursor-pointer"
              >
                <span>Answer Follow-up Question</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
              </button>
            </div>
          )}

          {/* Failed Test & Retry Banner if submitted with failed test */}
          {hasFailedTests && (
            <div className="p-4 bg-rose-50 border border-rose-300 rounded-xl space-y-2.5 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-rose-900 font-bold text-xs">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>1 Failed Testcase Detected in Submission</span>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 bg-rose-100 text-rose-800 rounded">
                  Revise & Resubmit Available
                </span>
              </div>
              <p className="text-xs text-rose-800 leading-relaxed">
                Your submitted solution failed invariant verification. You can view the correct solution directly in the sandbox studio to see the working implementation, or revise your code and retry.
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-2.5">
                {onViewCorrectSolution && (
                  <button
                    onClick={() => {
                      onClose();
                      onViewCorrectSolution();
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>See Correct Solution</span>
                  </button>
                )}

                {onReviseSolution && (
                  <button
                    onClick={() => {
                      onClose();
                      onReviseSolution();
                    }}
                    className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Revise Solution</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Top Score Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Accuracy Score Card */}
            <div className={`p-5 rounded-xl border shadow-xs flex items-center justify-between ${
              hasFailedTests 
                ? 'border-rose-300 bg-rose-50/40' 
                : 'border-slate-300 bg-slate-50/60'
            }`}>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider">
                  Test Accuracy Score
                </span>
                <div className="text-3xl font-extrabold text-slate-900 mt-1">
                  {evaluation.accuracyScore}<span className="text-lg text-slate-400 font-semibold">/100</span>
                </div>
                <p className={`text-xs font-medium mt-1 flex items-center space-x-1 ${
                  hasFailedTests ? 'text-rose-700' : 'text-emerald-700'
                }`}>
                  {hasFailedTests ? (
                    <>
                      <XCircle className="w-3.5 h-3.5" />
                      <span>1 invariant assertion violated</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>All core assertions & invariants passed</span>
                    </>
                  )}
                </p>
              </div>
              <div className={`w-14 h-14 rounded-full border-4 bg-white flex items-center justify-center font-bold text-lg shadow-xs ${
                hasFailedTests ? 'border-rose-500 text-rose-700' : 'border-emerald-500 text-emerald-700'
              }`}>
                {evaluation.accuracyScore}%
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
                {evaluation.scalabilityScore}%
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

          {/* Strengths & Trade-offs (Feedback Portion) */}
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

          {/* USER REQUIREMENT: Put the "What is this" at the bottom of the feedback portion */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/70">
            <button
              onClick={() => setShowScoreExplanation(!showScoreExplanation)}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-100/80 transition cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <Info className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-900">
                  What is this? Explaining What Each Part of the Feedback Scores Represents
                </span>
              </div>
              <div className="flex items-center space-x-1 text-slate-500 text-xs font-medium">
                <span>{showScoreExplanation ? 'Hide Guide' : 'Learn More'}</span>
                {showScoreExplanation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {showScoreExplanation && (
              <div className="p-4 sm:p-5 border-t border-slate-200 bg-white space-y-4 text-xs leading-relaxed text-slate-700 animate-in fade-in">
                <p className="text-slate-600">
                  PrepMaster scores solutions using automated invariant analysis, algorithmic complexity profiling, and simulated high-concurrency benchmarks. Here is what each section measures:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Accuracy */}
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-slate-900 font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Test Accuracy Score (0 - 100)</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      Measures deterministic correctness against unit, integration, boundary, and edge-case inputs. Passing requires strict adherence to return invariants, zero uncaught exceptions, and correct tie-breaking logic.
                    </p>
                  </div>

                  {/* Scalability */}
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-slate-900 font-bold text-xs">
                      <Gauge className="w-4 h-4 text-indigo-600" />
                      <span>Production Scalability Score (0 - 100)</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      Evaluates how the system handles sustained stress under simulated traffic (up to 100,000 concurrent events). Assesses memory bounding (LRU eviction), lock contention overhead, and resistance to Out-Of-Memory (OOM) crashes.
                    </p>
                  </div>

                  {/* Complexity & Latency */}
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-slate-900 font-bold text-xs">
                      <Activity className="w-4 h-4 text-amber-600" />
                      <span>Time & Space Complexity</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      <strong>Time:</strong> Big-O rate of CPU instruction growth relative to input size <em>N</em>. Amortized O(1) indicates constant hash-table lookup speed.<br />
                      <strong>Space:</strong> Heap memory footprint and auxiliary call stack buffers retained during processing.
                    </p>
                  </div>

                  {/* Latency & Throughput */}
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-slate-900 font-bold text-xs">
                      <Zap className="w-4 h-4 text-purple-600" />
                      <span>p99 Latency & Peak Throughput</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      <strong>p99 Latency:</strong> 99% of all requests complete faster than this duration. It isolates tail-latency spikes caused by garbage collection or lock queues.<br />
                      <strong>Throughput:</strong> Maximum concurrent transactions served per second before request degradation occurs.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-[11px] text-indigo-900 font-medium">
                  💡 <strong>Scoring Insight:</strong> High-level engineering screens evaluate both functional correctness (did your code work?) and systems maturity (will it collapse when 50,000 clients hit it simultaneously?).
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
