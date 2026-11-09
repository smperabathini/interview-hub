import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Filter, 
  Layers, 
  ArrowRight, 
  Gauge, 
  Clock, 
  FileCode2, 
  CheckCircle2, 
  Boxes, 
  Network, 
  Cpu, 
  Binary, 
  Bot, 
  GitBranch,
  Calculator
} from 'lucide-react';
import { Problem, CategoryType, DifficultyLevel } from '../types';

interface ProblemDirectoryProps {
  problems: Problem[];
  onSelectProblem: (problem: Problem) => void;
  onOpenGenerator: () => void;
}

export const ProblemDirectory: React.FC<ProblemDirectoryProps> = ({
  problems,
  onSelectProblem,
  onOpenGenerator
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [minScalability, setMinScalability] = useState<number>(0);

  const categories = [
    { id: 'all', label: 'All Disciplines', icon: Layers },
    { id: 'dsa', label: 'DSA & Algorithms', icon: GitBranch },
    { id: 'quant', label: 'Quant & Probability', icon: Calculator },
    { id: 'full-stack', label: 'Full-Stack', icon: Boxes },
    { id: 'api-design', label: 'API & Gateway', icon: Network },
    { id: 'low-level', label: 'Systems & Concurrency', icon: Cpu },
    { id: 'ml-fundamentals', label: 'ML Fundamentals', icon: Binary },
    { id: 'agentic-ai', label: 'Agentic AI', icon: Bot },
  ];

  const difficulties: ('all' | DifficultyLevel)[] = [
    'all',
    'Beginner',
    'Intermediate',
    'Advanced',
    'Staff/Principal'
  ];

  const filteredProblems = problems.filter((prob) => {
    const matchesCategory = selectedCategory === 'all' || prob.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || prob.difficulty === selectedDifficulty;
    const matchesScalability = prob.scalabilityRating >= minScalability;
    const matchesSearch = 
      prob.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prob.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prob.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesDifficulty && matchesScalability && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-7 animate-in fade-in">
      
      {/* Clean, Non-Overwhelming Hero Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-100 text-slate-800 rounded-full border border-slate-200 text-xs font-mono font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Interactive Multi-File Sandbox & Technical Defense</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Master Engineering & Architectural Interviews
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            Practice in isolated multi-file code sandboxes with automated AI test suites, on-demand coaching, and architectural follow-up questions to prepare for real senior technical screens.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenGenerator}
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs tracking-wide shadow-xs flex items-center space-x-2 transition active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Prompt AI to Generate Custom Problem</span>
            </button>

            <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono">
              <span className="flex items-center space-x-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Multi-File Sandboxes</span>
              </span>
              <span className="flex items-center space-x-1.5 text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200 font-medium">
                <Gauge className="w-3.5 h-3.5 text-indigo-600" />
                <span>Accuracy & Scalability Graded</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Discipline Tabs - Clean & Horizontal */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between pb-0.5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center space-x-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Browse Disciplines</span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Showing {filteredProblems.length} of {problems.length} Challenges
          </span>
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-2 rounded-xl border text-xs font-medium transition flex items-center space-x-2 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-300' : 'text-slate-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar - Clean & Compact */}
      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs flex flex-col md:flex-row gap-3 md:items-center justify-between">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems by title, keywords, or concepts..."
            className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition text-slate-900"
          />
        </div>

        {/* Difficulty Controls */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-slate-500">Difficulty:</span>
          <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2 py-1 text-xs rounded-md transition cursor-pointer font-medium ${
                  selectedDifficulty === diff
                    ? 'bg-white text-slate-900 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {diff === 'all' ? 'All' : diff}
              </button>
            ))}
          </div>
        </div>

        {/* Scalability Slider */}
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-600">
          <span>Min Scale: {minScalability}/10</span>
          <input
            type="range"
            min="0"
            max="10"
            value={minScalability}
            onChange={(e) => setMinScalability(Number(e.target.value))}
            className="w-20 accent-slate-900 cursor-pointer"
          />
        </div>

      </div>

      {/* Problem Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProblems.map((problem) => (
          <div
            key={problem.id}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Badges Bar */}
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-medium uppercase bg-slate-100 text-slate-700 border border-slate-200 rounded">
                    {problem.categoryLabel}
                  </span>
                  <span className={`px-2 py-0.5 text-[10px] font-mono font-medium uppercase rounded border ${
                    problem.difficulty === 'Beginner'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : problem.difficulty === 'Intermediate'
                      ? 'bg-blue-50 text-blue-800 border-blue-200'
                      : problem.difficulty === 'Advanced'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-purple-50 text-purple-800 border-purple-200'
                  }`}>
                    {problem.difficulty}
                  </span>
                </div>

                <span className="text-[10px] font-mono text-slate-400">
                  Scale: {problem.scalabilityRating}/10
                </span>
              </div>

              {/* Title */}
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition mb-1.5 leading-snug">
                {problem.title}
              </h3>

              {/* Summary */}
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                {problem.summary}
              </p>

              {/* Scalability Meter */}
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg mb-3 space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-600 flex items-center space-x-1">
                    <Gauge className="w-3 h-3 text-slate-500" />
                    <span>Target Scale Tier</span>
                  </span>
                  <span className="font-semibold text-slate-900">{problem.scalabilityRating}/10</span>
                </div>
                <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                  <div 
                    className="bg-indigo-600 h-full rounded-full"
                    style={{ width: `${(problem.scalabilityRating / 10) * 100}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-500 font-mono truncate">
                  {problem.scalabilityTier}
                </p>
              </div>

              {/* Follow-up features badge */}
              {problem.suggestedFollowUps && problem.suggestedFollowUps.length > 0 && (
                <div className="mb-3 px-2 py-1 bg-amber-50/70 border border-amber-200 rounded text-[11px] text-amber-900 flex items-center justify-between">
                  <span className="font-medium">✨ {problem.suggestedFollowUps.length} follow-up feature ideas</span>
                  <span className="font-mono text-[10px] text-amber-700">Ready</span>
                </div>
              )}

              {/* Files included */}
              <div className="mb-3">
                <div className="text-[10px] font-mono uppercase text-slate-400 font-medium mb-1 flex items-center space-x-1">
                  <FileCode2 className="w-3 h-3 text-slate-400" />
                  <span>Sandbox Files ({problem.files.length})</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {problem.files.map((file) => (
                    <span key={file.id} className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded">
                      {file.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Button Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-1 text-xs font-mono text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                <span>~{problem.estimatedMinutes}m</span>
              </div>

              <button
                onClick={() => onSelectProblem(problem)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-900 group-hover:bg-indigo-600 text-white text-xs font-medium transition flex items-center space-x-1.5 shadow-xs cursor-pointer"
              >
                <span>Open Sandbox</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
