import React, { useState } from 'react';
import { 
  Users, 
  Send, 
  CheckCircle2, 
  Award, 
  HelpCircle, 
  Sparkles, 
  Bot, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Layers, 
  MessageSquare,
  Flame,
  FileText,
  ThumbsUp,
  Lightbulb
} from 'lucide-react';
import { BehavioralQuestion } from '../types';
import { BEHAVIORAL_QUESTIONS } from '../data/behavioralQuestions';

export const BehavioralQuestionsView: React.FC = () => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>(BEHAVIORAL_QUESTIONS[0].id);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showSampleAnswer, setShowSampleAnswer] = useState(false);

  // STAR responses
  const [situation, setSituation] = useState('');
  const [task, setTask] = useState('');
  const [action, setAction] = useState('');
  const [result, setResult] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    score: number;
    verdict: string;
    strengths: string[];
    improvements: string[];
    aiCritique: string;
  } | null>(null);

  const categories = [
    'all',
    'Technical Disagreement',
    'Overcoming Failure',
    'Delivering Under Pressure',
    'Leadership & Initiative'
  ];

  const filteredQuestions = BEHAVIORAL_QUESTIONS.filter(
    q => activeCategory === 'all' || q.category === activeCategory
  );

  const currentQuestion = BEHAVIORAL_QUESTIONS.find(q => q.id === selectedQuestionId) || BEHAVIORAL_QUESTIONS[0];

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!action.trim() && !situation.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFeedback({
        score: 93,
        verdict: 'Strong Leadership & Culture Fit Signal',
        strengths: [
          'Excellent structural clarity following the STAR methodology',
          'Quantified business and engineering metrics in the Result section',
          'Highlighted blameless accountability and collaborative problem solving'
        ],
        improvements: [
          'In the Action step, emphasize your personal contribution ("I led", "I prototyped") rather than passive team voice',
          'Add a brief mention of long-term post-incident monitoring'
        ],
        aiCritique: `Compelling response! You anchored your argument in measurable technical data rather than personal friction. For senior engineering loops, ensure you highlight organizational leverage—how your solution empowered the wider team.`
      });
    }, 1100);
  };

  const handlePreFillSample = () => {
    setSituation('During our cloud migration, the database cluster experienced unexpected write amplification causing high CPU alarms.');
    setTask('I was tasked with diagnosing the bottleneck while keeping customer checkout latency under 200ms.');
    setAction('I set up localized profiling, identified an unindexed join query, and shipped a composite index migration behind a feature flag.');
    setResult('Checkout latency dropped from 380ms to 42ms, reducing database CPU load by 68% and eliminating all alarms.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      
      {/* Hero Header */}
      <div className="bg-white border border-slate-300 rounded-2xl p-6 sm:p-8 shadow-crisp">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200 text-xs font-mono font-medium mb-3">
            <Users className="w-3.5 h-3.5 text-indigo-600" />
            <span>Behavioral & Cultural Competency Studio</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Behavioral Questions & STAR Framework Practice
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Technical competency gets you the interview; behavioral excellence gets you the offer. Practice answering behavioral prompts using the structured STAR framework (Situation, Task, Action, Result) with instant AI evaluation.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition whitespace-nowrap border ${
              activeCategory === cat
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            {cat === 'all' ? 'All Competencies' : cat}
          </button>
        ))}
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 1 Col: Question Selector List */}
        <div className="bg-white border border-slate-300 rounded-2xl p-4 shadow-crisp space-y-2 h-fit">
          <div className="px-2 py-1 text-xs font-mono uppercase font-bold text-slate-400">
            Select Behavioral Prompt ({filteredQuestions.length})
          </div>

          <div className="space-y-1.5">
            {filteredQuestions.map((q) => {
              const isSelected = q.id === currentQuestion.id;
              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setSelectedQuestionId(q.id);
                    setFeedback(null);
                    setShowSampleAnswer(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition flex flex-col space-y-1 ${
                    isSelected
                      ? 'bg-indigo-50/50 border-indigo-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold uppercase text-indigo-600">
                    {q.category}
                  </span>
                  <span className="text-xs font-bold text-slate-900">
                    {q.title}
                  </span>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {q.question}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 2 Cols: Active Question Practice Workspace */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Question Banner */}
          <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-crisp space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-indigo-600">
                  {currentQuestion.category}
                </span>
                <h2 className="text-lg font-extrabold text-slate-900">
                  {currentQuestion.title}
                </h2>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handlePreFillSample}
                  className="px-2.5 py-1 text-xs font-mono text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition"
                  title="Fill in a mock STAR answer to test the evaluator"
                >
                  Pre-fill Template
                </button>

                <button
                  onClick={() => setShowSampleAnswer(!showSampleAnswer)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition"
                >
                  {showSampleAnswer ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showSampleAnswer ? 'Hide Sample' : 'View Sample Answer'}</span>
                </button>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <p className="text-sm font-semibold text-slate-900 leading-relaxed font-sans">
                "{currentQuestion.question}"
              </p>
              <p className="text-xs text-slate-500 mt-2 font-mono">
                Interviewer Focus: {currentQuestion.context}
              </p>
            </div>

            {/* Sample Ideal Answer Disclosure */}
            {showSampleAnswer && (
              <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-2 animate-in fade-in">
                <div className="flex items-center space-x-1.5 text-indigo-900 text-xs font-bold">
                  <Lightbulb className="w-4 h-4 text-indigo-600" />
                  <span>Sample High-Performing Response (STAR Format):</span>
                </div>
                <p className="text-xs text-indigo-950 leading-relaxed italic font-serif">
                  "{currentQuestion.sampleAnswer}"
                </p>
              </div>
            )}

            {/* STAR Response Inputs */}
            <form onSubmit={handleEvaluate} className="space-y-4 pt-2">
              
              {/* Situation */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
                  <span className="flex items-center space-x-1.5">
                    <span className="w-4 h-4 rounded bg-slate-900 text-white font-mono text-[10px] flex items-center justify-center">S</span>
                    <span>Situation — Context & Background</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Set the stage (1-2 sentences)</span>
                </label>
                <textarea
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  rows={2}
                  placeholder={currentQuestion.starPrompts.situation}
                  className="w-full p-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                />
              </div>

              {/* Task */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
                  <span className="flex items-center space-x-1.5">
                    <span className="w-4 h-4 rounded bg-slate-900 text-white font-mono text-[10px] flex items-center justify-center">T</span>
                    <span>Task — Challenge & Responsibility</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">What had to be solved?</span>
                </label>
                <textarea
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  rows={2}
                  placeholder={currentQuestion.starPrompts.task}
                  className="w-full p-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                />
              </div>

              {/* Action */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
                  <span className="flex items-center space-x-1.5">
                    <span className="w-4 h-4 rounded bg-indigo-600 text-white font-mono text-[10px] flex items-center justify-center font-bold">A</span>
                    <span className="text-indigo-900">Action — Your Concrete Technical Steps (Most Important)</span>
                  </span>
                  <span className="text-[10px] text-indigo-600 font-mono font-semibold">Focus on "I", not "We"</span>
                </label>
                <textarea
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                  rows={3}
                  placeholder={currentQuestion.starPrompts.action}
                  className="w-full p-3 text-xs bg-white border border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>

              {/* Result */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
                  <span className="flex items-center space-x-1.5">
                    <span className="w-4 h-4 rounded bg-emerald-600 text-white font-mono text-[10px] flex items-center justify-center font-bold">R</span>
                    <span>Result — Measurable Impact & Learnings</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Numbers, latency, team adoption</span>
                </label>
                <textarea
                  value={result}
                  onChange={(e) => setResult(e.target.value)}
                  rows={2}
                  placeholder={currentQuestion.starPrompts.result}
                  className="w-full p-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || (!action.trim() && !situation.trim())}
                  className={`px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide flex items-center space-x-2 transition ${
                    action.trim() || situation.trim()
                      ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                      <span>Evaluating Behavioral Response...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Evaluate with AI Interviewer</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* AI Rubric Feedback Section */}
          {feedback && (
            <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-crisp space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-emerald-700">
                      Behavioral Interview Grade
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      {feedback.verdict} ({feedback.score}/100)
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
                  Strong Hire Signal
                </span>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="font-bold text-xs text-slate-900 flex items-center space-x-1.5">
                  <Bot className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Interviewer Evaluation:</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic font-serif">
                  "{feedback.aiCritique}"
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Key Strengths Observed</span>
                  </span>
                  <ul className="space-y-1.5 text-slate-600">
                    {feedback.strengths.map((str, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-indigo-700 flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Suggestions for Greater Executive Presence</span>
                  </span>
                  <ul className="space-y-1.5 text-slate-600">
                    {feedback.improvements.map((imp, idx) => (
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
  );
};
