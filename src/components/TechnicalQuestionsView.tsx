import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Award, 
  Sparkles, 
  Bot, 
  ArrowLeft, 
  ChevronRight
} from 'lucide-react';
import { Problem } from '../types';

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
    question: `How would your code for ${problem.title} handle a sudden crash or failed request?`,
    context: 'Technical Follow-Up',
    idealAnswerHighlights: [
      'Save data before updating state',
      'Retry failed requests with backoff',
      'Handle disconnected users cleanly'
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
        verdict: 'Good Explanation',
        strengths: [
          'Clearly explained memory and speed trade-offs',
          'Explained how concurrent writes are kept safe',
          'Addressed system recovery after a crash'
        ],
        improvements: [
          'Mention how you would measure latency in production',
          'Briefly note how often data snapshots should be saved'
        ],
        aiCritique: `Clear and structured explanation. You started with the core approach and addressed failure cases well. In a real interview, mentioning specific numbers (e.g., "recovers in under 10ms") makes it even stronger.`
      });
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      
      {/* Return Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToSandbox}
          className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-xs font-medium text-slate-700 flex items-center space-x-1.5 transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Editor</span>
        </button>

        <div className="text-xs text-slate-500 font-mono">
          Problem: {problem.title}
        </div>
      </div>

      {/* Header Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-mono uppercase text-indigo-600 font-semibold mb-1">
              Follow-up Q&A
            </div>
            <h1 className="text-xl font-bold text-slate-900">
              Technical Interview Questions
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Explain how your code works, why you chose this design, and how it handles errors.
            </p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center self-start sm:self-auto min-w-[100px]">
            <span className="text-[10px] font-mono text-slate-400 block">
              Question
            </span>
            <span className="text-sm font-bold text-slate-900">
              {activeQuestionIdx + 1} of {problem.defenseQuestions.length || 1}
            </span>
          </div>
        </div>
      </div>

      {/* Question & Answer Box */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
        
        {/* Question Prompt */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
          <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700">
            <Bot className="w-4 h-4 text-indigo-600" />
            <span>Interviewer Question:</span>
          </div>
          <p className="text-sm font-semibold text-slate-900 leading-relaxed">
            "{currentQuestion.question}"
          </p>
        </div>

        {/* Answer Form */}
        <form onSubmit={handleSubmitResponse} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1.5 flex items-center justify-between">
              <span>Your Explanation:</span>
              <span className="text-[10px] text-slate-400 font-mono">Plain text or bullet points</span>
            </label>
            <textarea
              value={candidateResponse}
              onChange={(e) => setCandidateResponse(e.target.value)}
              rows={5}
              placeholder="Explain your approach, why you chose these data structures, and how your code behaves under heavy load or errors..."
              className="w-full p-3 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 transition leading-relaxed text-slate-900"
            />
          </div>

          {/* Quick Helper Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
            <span className="text-[10px] font-mono">Quick starter:</span>
            <button
              type="button"
              onClick={() => setCandidateResponse(prev => prev + "\n- Trade-off: I chose fast in-memory lookups instead of disk storage because...")}
              className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-[11px] text-slate-700 transition cursor-pointer"
            >
              + Note trade-off
            </button>
            <button
              type="button"
              onClick={() => setCandidateResponse(prev => prev + "\n- Crash recovery: If the process fails mid-operation, we can recover by...")}
              className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-[11px] text-slate-700 transition cursor-pointer"
            >
              + Note error handling
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end pt-1">
            <button
              type="submit"
              disabled={!candidateResponse.trim() || isSubmitting}
              className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition ${
                candidateResponse.trim() && !isSubmitting
                  ? 'bg-slate-900 hover:bg-slate-800 text-white cursor-pointer'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Checking answer...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Answer</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Feedback Report */}
        {submittedFeedback && (
          <div className="mt-6 p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {submittedFeedback.verdict} ({submittedFeedback.score}/100)
                  </h3>
                  <span className="text-[10px] text-emerald-700 font-mono">
                    Good Technical Signal
                  </span>
                </div>
              </div>
            </div>

            {/* Critique */}
            <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 leading-relaxed">
              <div className="font-semibold text-slate-900 mb-1 flex items-center space-x-1">
                <Bot className="w-3.5 h-3.5 text-indigo-600" />
                <span>Interviewer Feedback:</span>
              </div>
              <p className="text-slate-600">
                {submittedFeedback.aiCritique}
              </p>
            </div>

            {/* Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>What went well</span>
                </span>
                <ul className="space-y-1 text-slate-600">
                  {submittedFeedback.strengths.map((str, idx) => (
                    <li key={idx} className="flex items-start space-x-1">
                      <span className="text-emerald-500">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-indigo-700 flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ways to improve</span>
                </span>
                <ul className="space-y-1 text-slate-600">
                  {submittedFeedback.improvements.map((imp, idx) => (
                    <li key={idx} className="flex items-start space-x-1">
                      <span className="text-indigo-500">•</span>
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
                  className="px-3.5 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-medium flex items-center space-x-1 hover:bg-slate-800 transition cursor-pointer"
                >
                  <span>Next Question</span>
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