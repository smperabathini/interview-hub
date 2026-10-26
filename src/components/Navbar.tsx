import React from 'react';
import { 
  Terminal, 
  Plus, 
  Layers, 
  MessageSquare, 
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
    { id: 'directory' as ViewType, label: 'Problems', icon: Layers },
    { id: 'sandbox' as ViewType, label: 'Code Editor', icon: Code2, hasIndicator: !!activeProblemTitle },
    { id: 'technical-questions' as ViewType, label: 'Tech Q&A', icon: MessageSquare },
    { id: 'behavioral-questions' as ViewType, label: 'Behavioral', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center space-x-6">
          <div 
            onClick={() => setCurrentView('directory')}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center group-hover:bg-slate-800 transition">
              <Terminal className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm tracking-tight text-slate-900">
                PrepMaster
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded">
                Prototype
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-1 pl-3 border-l border-slate-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {item.hasIndicator && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-0.5" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenGenerator}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium border border-slate-300 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-slate-600" />
            <span>New Problem</span>
          </button>

          {/* User Sign In / Profile */}
          {user ? (
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
              <div className="flex items-center space-x-2 px-2 py-1 bg-slate-50 border border-slate-200 rounded-md">
                <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-medium text-slate-800 hidden sm:block max-w-[100px] truncate">
                  {user.name}
                </span>
              </div>

              <button
                onClick={onLogout}
                title="Sign out"
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setCurrentView('login')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                currentView === 'login'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
};
