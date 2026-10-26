import React, { useState } from 'react';
import { 
  MessageSquareCode, 
  Send, 
  CheckCircle2, 
  Award, 
  Sparkles, 
  Bot, 
  ArrowLeft, 
  ChevronRight,
  Code2,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { Problem, InterviewDefenseQuestion } from '../types';

interface TechnicalQuestionsViewProps {
  problem: Problem;
  onBackToSandbox: () => void;
}

export const TechnicalQuestionsView: React.FC<TechnicalQuestionsViewProps> = ({
  problem,
  onBackToSandbox
}) => {
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [candidateResponse, setCandidateResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedFeedback, setSubmittedFeedback] = useState<{
    score: number;
    verdict: string;
    strengths: string[];
    improvements: string[];
    aiCritique: string;
  } | null>(null);

  const currentQuestion = problem.defenseQuestions[activeQuestionIdx] || {
    id: 'def-fallback',
    question: `How would your architecture for ${problem.title} handle catastrophic hardware failure of a primary node?`,
    context: 'Technical Interview Architectural Question',
    idealAnswerHighlights: [
      'State checkpointing to persistent storage',
      'Leader re-election mechanisms',
      'Client session reconnect idempotency'
    ]
  };

  const handleSubmitResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateResponse.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedFeedback({
        score: 94,
        verdict: 'Strong Technical Signal',
        strengths: [
          'Directly identified memory footprint vs re-computation tradeoff',
          'Demonstrated clear understanding of race conditions and write serialization',
          'Articulated graceful degradation under heavy client reconnect spikes'
        ],
        improvements: [
          'Explicitly mention monitoring metrics (e.g. tracking p99 tail latency on heartbeat)',
          'Reference cold-storage snapshot compaction cadence'
        ],
        aiCritique: `Excellent technical response! You structured your argument cleanly around system invariants before discussing failure modes. For a high-level screen, sharpen your answer by mentioning SLA thresholds (e.g., "we guarantee sub-10ms recovery within a 3-node cluster"). Overall, a very convincing technical explanation.`
      });
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in">
      
      {/* Navigation & Context Bar (Hierarchy & Balance) */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToSandbox}
          className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center space-x-1.5 transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Sandbox Studio</span>
        </button>

        <div className="flex items-center space-x-2 text-xs font-mono text-slate-500">
          <span className="w-2 h-2 rounded-full bg-indigo-600" />
          <span>Active Challenge: {problem.title}</span>
        </div>
      </div>

      {/* Hero Header (Gestalt: Similarity with Behavioral & Catalog) */}
      <div className="bg-white border border-slate-300 rounded-2xl p-6 sm:p-8 shadow-crisp">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200 text-xs font-mono font-medium mb-3">
              <MessageSquareCode className="w-3.5 h-3.5 text-indigo-600" />
              <span>Technical Screen & Architectural Follow-Up</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Technical Questions & Solution Explanation
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              In real technical screens, software engineers must defend their architecture, explain design trade-offs, and address failure modes in response to interviewer follow-ups.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-center self-start sm:self-auto min-w-[120px]">
            <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
              Question Progress
            </span>
            <span className="text-sm font-extrabold text-indigo-600">
              {activeQuestionIdx + 1} of {problem.defenseQuestions.length || 1}
            </span>
          </div>
        </div>
      </div>

      {/* Question & Candidate Input Workspace (Gestalt: Common Region) */}
      <div className="bg-white border border-slate-300 rounded-2xl p-6 sm:p-8 shadow-crisp space-y-6">
        
        {/* Interviewer Question Box (Contrast: Distinct Inset) */}
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-700">
            <Bot className="w-4 h-4 text-indigo-600" />
            <span>Interviewer Technical Follow-Up Question:</span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-slate-950 leading-relaxed font-sans">
            "{currentQuestion.question}"
          </p>
          <div className="text-[11px] font-mono text-slate-500 pt-1">
            Focus Context: {currentQuestion.context}
          </div>
        </div>

        {/* Candidate Text Response Area (Emphasis: Active input) */}
        <form onSubmit={handleSubmitResponse} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5 flex items-center justify-between">
              <span>Your Technical Explanation & Architectural Rationale:</span>
              <span className="text-[10px] font-mono text-slate-400">Markdown & bullets supported</span>
            </label>
            <textarea
              value={candidateResponse}
              onChange={(e) => setCandidateResponse(e.target.value)}
              rows={6}
              placeholder="Explain your approach, why you chose this data structure, what trade-offs you considered, and how the system behaves under edge-case load..."
              className="w-full p-4 text-xs font-mono bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition leading-relaxed text-slate-950"
            />
          </div>

          {/* Quick Starter Helpers (Gestalt: Proximity to textarea) */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
            <span className="font-mono text-[10px] text-slate-400 font-bold uppercase">Insert argument anchor:</span>
            <button
              type="button"
              onClick={() => setCandidateResponse(prev => prev + "\n- Architectural Trade-off: I prioritized O(1) memory lookup over disk persistence because...")}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition cursor-pointer font-medium"
            >
              + Trade-off statement
            </button>
            <button
              type="button"
              onClick={() => setCandidateResponse(prev => prev + "\n- Failure Mode: If the worker crashes mid-transaction, our idempotent replay mechanism will...")}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition cursor-pointer font-medium"
            >
              + Failure recovery
            </button>
          </div>

          {/* Submit Action (Emphasis: Primary Solid CTA) */}
          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="submit"
              disabled={!candidateResponse.trim() || isSubmitting}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide flex items-center space-x-2 transition ${
                candidateResponse.trim() && !isSubmitting
                  ? 'bg-slate-950 hover:bg-slate-800 text-white shadow-xs cursor-pointer active:scale-95 border border-slate-950'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-200'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Grading Technical Response...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Technical Explanation</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Submitted Feedback Report (Gestalt: Common Region, Balance: Two columns) */}
        {submittedFeedback && (
          <div className="mt-8 p-6 bg-slate-50 border border-slate-300 rounded-xl space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-800">
                    Interviewer Evaluation
                  </span>
                  <h3 className="text-base font-bold text-slate-950">
                    {submittedFeedback.verdict} ({submittedFeedback.score}/100)
                  </h3>
                </div>
              </div>

              <span className="text-xs font-mono font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
                Passed Technical Evaluation
              </span>
            </div>

            {/* AI Critique */}
            <div className="p-4 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 leading-relaxed space-y-1">
              <div className="font-bold text-slate-950 flex items-center space-x-1.5">
                <Bot className="w-3.5 h-3.5 text-indigo-600" />
                <span>Interviewer Feedback:</span>
              </div>
              <p className="italic font-serif text-slate-800 text-xs">
                "{submittedFeedback.aiCritique}"
              </p>
            </div>

            {/* Rubric Breakdown (Balance: Symmetrical columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-white border border-slate-200 rounded-lg space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-800 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Strong Articulations</span>
                </span>
                <ul className="space-y-1 text-slate-600">
                  {submittedFeedback.strengths.map((str, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 rounded-lg space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase text-indigo-800 flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Suggestions for Greater Impact</span>
                </span>
                <ul className="space-y-1 text-slate-600">
                  {submittedFeedback.improvements.map((imp, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5">
                      <span className="text-indigo-500 font-bold">•</span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Next Question Navigation */}
            {activeQuestionIdx < problem.defenseQuestions.length - 1 && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    setActiveQuestionIdx(prev => prev + 1);
                    setCandidateResponse('');
                    setSubmittedFeedback(null);
                  }}
                  className="px-4 py-2 bg-slate-950 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 shadow-xs hover:bg-slate-800 transition cursor-pointer"
                >
                  <span>Proceed to Next Technical Question</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
