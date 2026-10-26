import React, { useState } from 'react';
import { 
  Users, 
  Send, 
  CheckCircle2, 
  Award, 
  Sparkles, 
  Bot, 
  Eye, 
  EyeOff, 
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
    { id: 'all', label: 'All' },
    { id: 'Technical Disagreement', label: 'Disagreements' },
    { id: 'Overcoming Failure', label: 'Mistakes' },
    { id: 'Delivering Under Pressure', label: 'Deadlines' },
    { id: 'Leadership & Initiative', label: 'Initiative' }
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
        verdict: 'Good Answer',
        strengths: [
          'Followed the STAR method cleanly',
          'Gave concrete numbers in the result section',
          'Showed calm problem-solving and teamwork'
        ],
        improvements: [
          'In the Action step, emphasize what you personally did ("I built", "I tested")',
          'Briefly mention what safeguards were added to prevent future issues'
        ],
        aiCritique: `Strong, well-structured answer. You focused on data and facts rather than personal friction. In senior interviews, highlight how your actions helped teammates as well.`
      });
    }, 800);
  };

  const handlePreFillSample = () => {
    setSituation('During our cloud migration, the database had slow queries that raised high CPU alarms.');
    setTask('I needed to find the bottleneck and keep checkout latency under 200ms.');
    setAction('I profiled the slow queries, found an unindexed join, and added a composite index migration behind a feature flag.');
    setResult('Checkout latency dropped from 380ms to 42ms, lowering CPU usage by 68% and clearing all alarms.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="max-w-2xl">
          <div className="text-[10px] font-mono uppercase text-indigo-600 font-semibold mb-1">
            Behavioral Questions
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            Behavioral Interview Practice
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Practice answering interview questions using the simple STAR format: Situation, Task, Action, and Result.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg font-medium transition whitespace-nowrap cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Left 1 Col: Question List */}
        <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-2 h-fit">
          <div className="px-2 py-1 text-[11px] font-mono uppercase font-bold text-slate-400">
            Questions ({filteredQuestions.length})
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
                  className={`w-full text-left p-3 rounded-lg border transition flex flex-col space-y-1 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-50 border-slate-900'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span className="text-[10px] font-mono text-indigo-600 font-medium">
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

        {/* Right 2 Cols: Question Workspace */}
        <div className="lg:col-span-2 space-y-5">
          
          {/* Question Banner */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
              <div>
                <span className="text-[10px] font-mono text-indigo-600 font-semibold uppercase">
                  {currentQuestion.category}
                </span>
                <h2 className="text-base font-bold text-slate-900">
                  {currentQuestion.title}
                </h2>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handlePreFillSample}
                  className="px-2.5 py-1 text-xs font-mono text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded transition cursor-pointer"
                >
                  Fill Example
                </button>

                <button
                  onClick={() => setShowSampleAnswer(!showSampleAnswer)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-xs font-medium flex items-center space-x-1 transition cursor-pointer"
                >
                  {showSampleAnswer ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showSampleAnswer ? 'Hide Sample' : 'Sample Answer'}</span>
                </button>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                "{currentQuestion.question}"
              </p>
            </div>

            {/* Sample Answer */}
            {showSampleAnswer && (
              <div className="p-3.5 bg-indigo-50/70 border border-indigo-200 rounded-lg space-y-1.5 animate-in fade-in">
                <div className="flex items-center space-x-1.5 text-indigo-900 text-xs font-semibold">
                  <Lightbulb className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Sample Answer (STAR):</span>
                </div>
                <p className="text-xs text-indigo-950 leading-relaxed">
                  "{currentQuestion.sampleAnswer}"
                </p>
              </div>
            )}

            {/* STAR Response Inputs */}
            <form onSubmit={handleEvaluate} className="space-y-3 pt-1">
              
              {/* Situation */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-800 flex items-center justify-between">
                  <span>S • Situation (What was the context?)</span>
                  <span className="text-[10px] text-slate-400 font-mono">1-2 sentences</span>
                </label>
                <textarea
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  rows={2}
                  placeholder={currentQuestion.starPrompts.situation}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition"
                />
              </div>

              {/* Task */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-800 flex items-center justify-between">
                  <span>T • Task (What was your role?)</span>
                  <span className="text-[10px] text-slate-400 font-mono">What had to be solved?</span>
                </label>
                <textarea
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  rows={2}
                  placeholder={currentQuestion.starPrompts.task}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition"
                />
              </div>

              {/* Action */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-800 flex items-center justify-between">
                  <span>A • Action (What did you do?)</span>
                  <span className="text-[10px] text-slate-400 font-mono">Focus on "I", not "We"</span>
                </label>
                <textarea
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                  rows={2}
                  placeholder={currentQuestion.starPrompts.action}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition"
                />
              </div>

              {/* Result */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-800 flex items-center justify-between">
                  <span>R • Result (What was the outcome?)</span>
                  <span className="text-[10px] text-slate-400 font-mono">Numbers, time saved, learnings</span>
                </label>
                <textarea
                  value={result}
                  onChange={(e) => setResult(e.target.value)}
                  rows={2}
                  placeholder={currentQuestion.starPrompts.result}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || (!action.trim() && !situation.trim())}
                  className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition ${
                    action.trim() || situation.trim()
                      ? 'bg-slate-900 hover:bg-slate-800 text-white cursor-pointer'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                      <span>Checking response...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Check with AI</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* Feedback */}
          {feedback && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {feedback.verdict} ({feedback.score}/100)
                    </h3>
                    <span className="text-[10px] font-mono text-emerald-700">
                      Positive Signal
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <div className="font-semibold text-xs text-slate-900 flex items-center space-x-1">
                  <Bot className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Feedback:</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  "{feedback.aiCritique}"
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>What worked well</span>
                  </span>
                  <ul className="space-y-1 text-slate-600">
                    {feedback.strengths.map((str, idx) => (
                      <li key={idx} className="flex items-start space-x-1">
                        <span className="text-emerald-500">•</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase text-indigo-700 flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ways to improve</span>
                  </span>
                  <ul className="space-y-1 text-slate-600">
                    {feedback.improvements.map((imp, idx) => (
                      <li key={idx} className="flex items-start space-x-1">
                        <span className="text-indigo-500">•</span>
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