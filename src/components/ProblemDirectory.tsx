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
  Calculator,
  SlidersHorizontal
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
    { id: 'dsa', label: 'Data Structures & Algos (DSA)', icon: GitBranch },
    { id: 'quant', label: 'Quant (Math & Probability)', icon: Calculator },
    { id: 'full-stack', label: 'Full-Stack Development', icon: Boxes },
    { id: 'api-design', label: 'API & Gateway Design', icon: Network },
    { id: 'low-level', label: 'Low-Level System Design', icon: Cpu },
    { id: 'ml-fundamentals', label: 'ML Fundamentals', icon: Binary },
    { id: 'agentic-ai', label: 'Agentic AI Systems', icon: Bot },
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      
      {/* Hero Banner (Gestalt: Common Region, Hierarchy: Tier 1) */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-300 p-8 sm:p-10 shadow-crisp">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-100 text-slate-800 rounded-full border border-slate-300 text-[11px] font-mono font-bold tracking-wide uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>GenAI Autonomous Problem & Sandbox Synthesizer</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Comprehensive computer science challenges. <br />
            <span className="text-indigo-600">From DSA & Quant Math to Full-Stack & Systems.</span>
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            Practice in isolated multi-file sandboxes with automated AI test suites, on-demand progressive coaching, suggested follow-up architecture features, and technical question screens.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenGenerator}
              className="px-5 py-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs tracking-wide shadow-sm flex items-center space-x-2 transition transform active:scale-95 border border-slate-950 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Prompt AI to Generate Custom Problem</span>
            </button>

            <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono pl-2">
              <span className="flex items-center space-x-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-300 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Multi-File Sandbox</span>
              </span>
              <span className="flex items-center space-x-1.5 text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-300 font-semibold">
                <Gauge className="w-3.5 h-3.5 text-indigo-600" />
                <span>Accuracy & Scalability Graded</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs (Gestalt: Similarity & Continuity, Scale: 8-grid) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center space-x-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Browse Disciplines</span>
          </h2>
          <span className="text-xs font-mono text-slate-500 font-medium">
            Showing {filteredProblems.length} of {problems.length} Challenges
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                  isSelected
                    ? 'border-slate-950 bg-slate-950 text-white shadow-xs font-semibold'
                    : 'border-slate-300 bg-white hover:border-slate-400 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 mb-2 ${isSelected ? 'text-indigo-300' : 'text-slate-500'}`} />
                <span className="text-[11px] font-bold leading-tight line-clamp-2">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar (Balance: Symmetrical controls, Contrast: High definition) */}
      <div className="bg-white border border-slate-300 rounded-xl p-4 shadow-crisp flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems by name, keywords, or math concepts..."
            className="w-full pl-10 pr-4 py-2 text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition"
          />
        </div>

        {/* Difficulty Controls */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono font-bold text-slate-500">Difficulty:</span>
          <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2.5 py-1 text-xs rounded-md font-semibold transition ${
                  selectedDifficulty === diff
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {diff === 'all' ? 'All' : diff}
              </button>
            ))}
          </div>
        </div>

        {/* Scalability Slider */}
        <div className="flex items-center space-x-3 text-xs font-mono text-slate-600">
          <span className="font-bold">Min Scale: {minScalability}/10</span>
          <input
            type="range"
            min="0"
            max="10"
            value={minScalability}
            onChange={(e) => setMinScalability(Number(e.target.value))}
            className="w-24 accent-slate-950 cursor-pointer"
          />
        </div>

      </div>

      {/* Problem Cards Grid (Gestalt: Proximity, Balance: Equal-Height Cards, Contrast: Clean borders) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProblems.map((problem) => (
          <div
            key={problem.id}
            className="bg-white border border-slate-300 rounded-xl p-6 shadow-crisp hover:shadow-elevated hover:border-slate-400 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Badges Bar (Gestalt: Common Region, Scale: 10px badges) */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-slate-100 text-slate-800 border border-slate-300 rounded">
                    {problem.categoryLabel}
                  </span>
                  <span className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded border ${
                    problem.difficulty === 'Beginner'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : problem.difficulty === 'Intermediate'
                      ? 'bg-blue-50 text-blue-800 border-blue-300'
                      : problem.difficulty === 'Advanced'
                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                      : 'bg-purple-50 text-purple-800 border-purple-300'
                  }`}>
                    {problem.difficulty}
                  </span>
                </div>

                <span className="text-[10px] font-mono font-bold text-slate-400">
                  Rating: {problem.scalabilityRating}/10
                </span>
              </div>

              {/* Title (Hierarchy: Tier 2) */}
              <h3 className="text-base font-bold text-slate-950 group-hover:text-indigo-600 transition mb-2">
                {problem.title}
              </h3>

              {/* Summary (Hierarchy: Tier 4) */}
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                {problem.summary}
              </p>

              {/* Scalability Metric Meter (Gestalt: Proximity within Inset Region) */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg mb-4 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-600 font-bold flex items-center space-x-1.5">
                    <Gauge className="w-3 h-3 text-slate-700" />
                    <span>Scalability Index</span>
                  </span>
                  <span className="font-extrabold text-slate-950">{problem.scalabilityRating} / 10</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-indigo-600 h-full rounded-full transition-all"
                    style={{ width: `${(problem.scalabilityRating / 10) * 100}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-500 font-mono truncate">
                  Target: {problem.scalabilityTier}
                </p>
              </div>

              {/* Follow-up features badge */}
              {problem.suggestedFollowUps && problem.suggestedFollowUps.length > 0 && (
                <div className="mb-3 px-2.5 py-1.5 bg-amber-50/70 border border-amber-200 rounded-lg flex items-center justify-between text-[11px] text-amber-900">
                  <span className="font-semibold">✨ Includes {problem.suggestedFollowUps.length} follow-up feature ideas</span>
                  <span className="font-mono text-[10px] text-amber-700 font-bold">Extensible</span>
                </div>
              )}

              {/* Files included in Sandbox (Gestalt: Similarity) */}
              <div className="mb-4">
                <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-1.5 flex items-center space-x-1">
                  <FileCode2 className="w-3 h-3 text-slate-400" />
                  <span>Sandbox Files ({problem.files.length})</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {problem.files.map((file) => (
                    <span key={file.id} className="text-[11px] font-mono px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded">
                      {file.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Button Footer (Emphasis: Actionable CTA, Balance: Bottom Alignment) */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-xs font-mono text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                <span>~{problem.estimatedMinutes} mins</span>
              </div>

              <button
                onClick={() => onSelectProblem(problem)}
                className="px-4 py-2 rounded-lg bg-slate-950 group-hover:bg-indigo-600 text-white text-xs font-semibold tracking-wide transition flex items-center space-x-1.5 shadow-xs cursor-pointer"
              >
                <span>Open in Sandbox</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
