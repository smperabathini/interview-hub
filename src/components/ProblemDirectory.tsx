import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  Clock, 
  FileCode2, 
  GitBranch,
  Calculator,
  Boxes,
  Network,
  Cpu,
  Bot,
  CheckCircle2,
  Gauge
} from 'lucide-react';
import { Problem, DifficultyLevel } from '../types';

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
    { id: 'all', label: 'All', icon: Layers },
    { id: 'full-stack', label: 'Full-Stack', icon: Boxes },
    { id: 'dsa', label: 'Algorithms', icon: GitBranch },
    { id: 'quant', label: 'Math', icon: Calculator },
    { id: 'api-design', label: 'APIs', icon: Network },
    { id: 'low-level', label: 'Systems', icon: Cpu },
    { id: 'agentic-ai', label: 'AI', icon: Bot },
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Hero Banner with Visual Weight & Contrast */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 p-7 sm:p-10 shadow-xs">
        {/* Subtle pale purple ambient glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-purple-50/60 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200 text-[11px] font-mono font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Problem Catalog</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-950 tracking-tight leading-tight">
            Comprehensive computer science challenges.{' '}
            <span className="text-purple-600">From DSA &amp; Quant Math to Full-Stack &amp; Systems.</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl font-normal">
            Practice in isolated multi-file sandboxes with automated test suites, progressive hints, and follow-up technical interview questions.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenGenerator}
              className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs tracking-wide shadow-sm flex items-center space-x-2 transition transform active:scale-95 border border-slate-950 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>Prompt AI to Generate Custom Problem</span>
            </button>

            <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 pl-1">
              <span className="flex items-center space-x-1.5 text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Multi-File Sandbox</span>
              </span>
              <span className="flex items-center space-x-1.5 text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200 font-medium">
                <Gauge className="w-3.5 h-3.5 text-purple-600" />
                <span>Graded Performance</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search and Quick Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col md:flex-row gap-3 md:items-center justify-between">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition"
          />
        </div>

        {/* Difficulty Controls */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-500 font-medium">Difficulty:</span>
          <div className="flex bg-slate-100 p-0.5 rounded-lg">
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2 py-1 text-xs rounded-md font-medium transition cursor-pointer ${
                  selectedDifficulty === diff
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {diff === 'all' ? 'All' : diff === 'Staff/Principal' ? 'Staff' : diff}
              </button>
            ))}
          </div>
        </div>

        {/* Scale Slider */}
        <div className="flex items-center space-x-2 text-xs text-slate-600">
          <span>Min Level: {minScalability}/10</span>
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

      {/* Problem Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProblems.map((problem) => (
          <div
            key={problem.id}
            className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-400 transition flex flex-col justify-between"
          >
            <div>
              {/* Badges */}
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center space-x-1.5">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-medium uppercase bg-slate-100 text-slate-700 rounded">
                    {problem.categoryLabel}
                  </span>
                  <span className={`px-2 py-0.5 text-[10px] font-mono font-medium uppercase rounded ${
                    problem.difficulty === 'Beginner'
                      ? 'bg-emerald-50 text-emerald-700'
                      : problem.difficulty === 'Intermediate'
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-purple-50 text-purple-700'
                  }`}>
                    {problem.difficulty}
                  </span>
                </div>

                <span className="text-[10px] font-mono text-slate-400">
                  Level {problem.scalabilityRating}/10
                </span>
              </div>

              {/* Title */}
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                {problem.title}
              </h3>

              {/* Summary */}
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                {problem.summary}
              </p>

              {/* Files list */}
              <div className="mb-4">
                <div className="text-[10px] font-mono text-slate-400 mb-1 flex items-center space-x-1">
                  <FileCode2 className="w-3 h-3 text-slate-400" />
                  <span>Files ({problem.files.length})</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {problem.files.map((file) => (
                    <span key={file.id} className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                      {file.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-1 text-xs text-slate-400">
                <Clock className="w-3 h-3" />
                <span>~{problem.estimatedMinutes} min</span>
              </div>

              <button
                onClick={() => onSelectProblem(problem)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition flex items-center space-x-1 cursor-pointer"
              >
                <span>Open Editor</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};