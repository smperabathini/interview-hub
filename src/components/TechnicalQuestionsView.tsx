import React, { useState, useEffect } from 'react';
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
  ShieldCheck,
  Filter,
  Eye,
  EyeOff,
  Flame,
  Layers
} from 'lucide-react';
import { Problem, TechnicalQuestion, TechnicalCategoryType } from '../types';
import { TECHNICAL_QUESTIONS } from '../data/technicalQuestions';

interface TechnicalQuestionsViewProps {
  problem?: Problem;
  onBackToSandbox: () => void;
  selectedQuestionId?: string | null;
}

export const TechnicalQuestionsView: React.FC<TechnicalQuestionsViewProps> = ({
  problem,
  onBackToSandbox,
  selectedQuestionId
}) => {
  // Find initial question ID
  const getInitialQuestionId = () => {
    if (selectedQuestionId) {
      const match = TECHNICAL_QUESTIONS.find(q => q.id === selectedQuestionId || q.problemId === selectedQuestionId);
      if (match) return match.id;
    }
    if (problem) {
      const matchedSandbox = TECHNICAL_QUESTIONS.find(q => q.problemId === problem.id);
      if (matchedSandbox) return matchedSandbox.id;
    }
    return TECHNICAL_QUESTIONS[0].id;
  };

  const [activeQuestionId, setActiveQuestionId] = useState<string>(getInitialQuestionId);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [candidateResponse, setCandidateResponse] = useState('');
  const [showSampleResponse, setShowSampleResponse] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedFeedback, setSubmittedFeedback] = useState<{
    score: number;
    verdict: string;
    strengths: string[];
    improvements: string[];
    aiCritique: string;
  } | null>(null);

  // Sync if selectedQuestionId prop changes
  useEffect(() => {
    if (selectedQuestionId) {
      const match = TECHNICAL_QUESTIONS.find(q => q.id === selectedQuestionId || q.problemId === selectedQuestionId);
      if (match) {
        setActiveQuestionId(match.id);
        setCandidateResponse('');
        setSubmittedFeedback(null);
        setShowSampleResponse(false);
      }
    }
  }, [selectedQuestionId]);

  const categories: ('all' | TechnicalCategoryType)[] = [
    'all',
    'Sandbox Follow-Up',
    'Distributed Systems',
    'Database Internals',
    'Concurrency & Multi-Threading',
    'API & System Design',
    'Security & Reliability'
  ];

  const filteredQuestions = TECHNICAL_QUESTIONS.filter(q => 
    activeCategory === 'all' || q.category === activeCategory
  );

  const currentQuestion = TECHNICAL_QUESTIONS.find(q => q.id === activeQuestionId) || TECHNICAL_QUESTIONS[0];

  const handleSelectQuestion = (qId: string) => {
    setActiveQuestionId(qId);
    setCandidateResponse('');
    setSubmittedFeedback(null);
    setShowSampleResponse(false);
  };

  const handleSubmitResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateResponse.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedFeedback({
        score: 95,
        verdict: 'Strong Technical & Architectural Signal',
        strengths: [
          'Directly identified memory footprint vs re-computation tradeoff',
          'Demonstrated clear understanding of race conditions and write serialization',
          'Articulated graceful degradation under heavy client reconnect spikes and network partitions'
        ],
        improvements: [
          'Explicitly mention monitoring metrics (e.g. tracking p99 tail latency on heartbeat)',
          'Reference cold-storage snapshot compaction cadence'
        ],
        aiCritique: `Excellent technical response! You structured your argument cleanly around system invariants before discussing failure modes. For a high-level screen, sharpen your answer by mentioning SLA thresholds (e.g., "we guarantee sub-10ms recovery within a 3-node cluster"). Overall, a very convincing technical explanation.`
      });
    }, 900);
  };

  const handlePreFillSample = () => {
    if (currentQuestion.sampleResponse) {
      setCandidateResponse(currentQuestion.sampleResponse);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in">
      
      {/* Navigation & Context Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToSandbox}
          className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center space-x-1.5 transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Sandbox Studio</span>
        </button>

        {problem && (
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Active Sandbox Problem: {problem.title}</span>
          </div>
        )}
      </div>

      {/* Header Banner (Clean, calm visual hierarchy) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200 text-xs font-mono font-medium mb-3">
            <MessageSquareCode className="w-3.5 h-3.5 text-indigo-600" />
            <span>Technical Screen & Architectural Follow-Up</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Technical Questions & Architectural Defense
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            In senior and staff technical interviews, engineers are evaluated on how they defend system tradeoffs, explain concurrency edge cases, and design under failure. Choose any question below or answer the follow-up routed from your sandbox.
          </p>
        </div>
      </div>

      {/* Category Tabs (USER REQUIREMENT: Choose different questions not specific to sandbox) */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg font-medium transition whitespace-nowrap border cursor-pointer ${
              activeCategory === cat
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {cat === 'all' ? 'All Questions' : cat}
          </button>
        ))}
      </div>

      {/* Main Split Grid: Question Selector (Left) vs Answer Workspace (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 1 Col: Question Selector List */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2 h-fit">
          <div className="px-2 py-1 text-xs font-mono uppercase font-bold text-slate-400 flex items-center justify-between">
            <span>Select Technical Prompt ({filteredQuestions.length})</span>
          </div>

          <div className="space-y-1.5 max-h-[700px] overflow-y-auto pr-1">
            {filteredQuestions.map((q) => {
              const isSelected = q.id === currentQuestion.id;
              const isSandboxFollowUp = q.category === 'Sandbox Follow-Up';
              return (
                <button
                  key={q.id}
                  onClick={() => handleSelectQuestion(q.id)}
                  className={`w-full text-left p-3 rounded-xl border transition flex flex-col space-y-1 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50/70 border-indigo-400 shadow-xs ring-1 ring-indigo-300'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-mono font-medium uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                      {q.category}
                    </span>
                    {isSandboxFollowUp && (
                      <span className="text-[9px] font-mono font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                        Sandbox Link
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                    {q.title}
                  </h4>
                  {q.problemTitle && (
                    <div className="text-[10px] font-mono text-slate-400 truncate">
                      Linked: {q.problemTitle}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 2 Cols: Question Details, Input & AI Feedback */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
            
            {/* Routed Sandbox indicator if applicable */}
            {currentQuestion.category === 'Sandbox Follow-Up' && currentQuestion.problemTitle && (
              <div className="px-3.5 py-2 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-600" />
                  <span>Routed Architectural Follow-Up for: <strong>{currentQuestion.problemTitle}</strong></span>
                </span>
                <span className="text-[10px] font-mono text-amber-700">Studio Question</span>
              </div>
            )}

            {/* Interviewer Question Box */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-700">
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-indigo-600" />
                  <span>Interviewer Technical Follow-Up:</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 font-normal">
                  {currentQuestion.context}
                </span>
              </div>
              <p className="text-sm sm:text-base font-semibold text-slate-950 leading-relaxed font-sans">
                "{currentQuestion.question}"
              </p>
              
              {currentQuestion.suggestedTradeoff && (
                <div className="text-xs text-indigo-900 font-medium bg-indigo-50/70 p-2.5 rounded-lg border border-indigo-100 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                  <span><strong>Core Trade-Off to Defend:</strong> {currentQuestion.suggestedTradeoff}</span>
                </div>
              )}
            </div>

            {/* Ideal Answer Highlights */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800 uppercase font-mono tracking-wider">
                Key Invariants & Evaluation Criteria:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                {currentQuestion.idealAnswerHighlights.map((hl, idx) => (
                  <li key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-start space-x-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Candidate Text Response Area */}
            <form onSubmit={handleSubmitResponse} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-900">
                    Your Technical Explanation & Architectural Rationale:
                  </label>
                  {currentQuestion.sampleResponse && (
                    <button
                      type="button"
                      onClick={handlePreFillSample}
                      className="text-xs font-medium text-indigo-600 hover:text-indigo-800 cursor-pointer flex items-center space-x-1"
                    >
                      <span>Pre-fill Sample Answer</span>
                    </button>
                  )}
                </div>
                <textarea
                  value={candidateResponse}
                  onChange={(e) => setCandidateResponse(e.target.value)}
                  rows={6}
                  placeholder="Explain your approach, why you chose this data structure, what trade-offs you considered, and how the system behaves under edge-case load..."
                  className="w-full p-4 text-xs font-mono bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition leading-relaxed text-slate-950"
                />
              </div>

              {/* Quick Starter Helpers */}
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

              {/* Submit Action */}
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
                      <span>Grading Response...</span>
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

            {/* Submitted Feedback Report */}
            {submittedFeedback && (
              <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-5 animate-in fade-in">
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

                {/* Rubric Breakdown */}
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
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
