import React from 'react';
import { 
  Terminal, 
  Sparkles, 
  Layers, 
  MessageSquareCode, 
  Code2,
  Users,
  LogIn,
  LogOut,
  Github
} from 'lucide-react';
import { UserProfile } from './LoginPage';

export type ViewType = 'directory' | 'sandbox' | 'technical-questions' | 'behavioral-questions' | 'login';

interface NavbarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  onOpenGenerator: () => void;
  activeProblemTitle?: string;
  user: UserProfile | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  onOpenGenerator,
  activeProblemTitle,
  user,
  onLogout
}) => {
  const navItems = [
    { id: 'directory' as ViewType, label: 'Problem Catalog', icon: Layers },
    { id: 'sandbox' as ViewType, label: 'Sandbox Studio', icon: Code2, hasIndicator: !!activeProblemTitle },
    { id: 'technical-questions' as ViewType, label: 'Technical Questions', icon: MessageSquareCode },
    { id: 'behavioral-questions' as ViewType, label: 'Behavioral Questions', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-300 shadow-crisp select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Grouping (Gestalt: Proximity & Figure-Ground) */}
        <div className="flex items-center space-x-6">
          <div 
            onClick={() => setCurrentView('directory')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-950 text-white flex items-center justify-center font-bold tracking-tight shadow-xs group-hover:bg-slate-800 transition">
              <Terminal className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-950">
                  PrepMaster
                </span>
                <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 bg-slate-100 text-slate-800 border border-slate-300 rounded">
                  GenAI Sandbox
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Full-Stack, DSA & Systems Prep
              </p>
            </div>
          </div>

          {/* Navigation Cluster (Gestalt: Common Region & Similarity, Hierarchy Tier 3) */}
          <nav className="flex items-center space-x-1 pl-4 border-l border-slate-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition flex items-center space-x-1.5 border cursor-pointer ${
                    isActive
                      ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100 border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-300' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.hasIndicator && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" title="Live sandbox open" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Action (Emphasis: Primary Focal Anchor, Scale: 4px grid) */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenGenerator}
            className="hidden md:flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold tracking-wide shadow-xs transition transform active:scale-95 border border-slate-950 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Generate Custom Problem</span>
          </button>

          {/* Auth State Button / Profile Chip */}
          {user ? (
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
              <div className="flex items-center space-x-2.5 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover border border-slate-300"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="text-left hidden sm:block">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-bold text-slate-900 truncate max-w-[100px]">
                      {user.name}
                    </span>
                    {user.provider === 'google' && (
                      <span className="text-[10px] px-1 bg-blue-50 text-blue-600 rounded font-mono font-medium">G</span>
                    )}
                    {user.provider === 'github' && (
                      <Github className="w-2.5 h-2.5 text-slate-800" />
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 block leading-none">
                    {user.role || 'Member'}
                  </span>
                </div>
              </div>

              <button
                onClick={onLogout}
                title="Log out"
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg border border-transparent hover:border-rose-200 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setCurrentView('login')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-bold transition border cursor-pointer ${
                currentView === 'login'
                  ? 'bg-slate-950 text-white border-slate-950'
                  : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 hover:border-slate-400'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
};
