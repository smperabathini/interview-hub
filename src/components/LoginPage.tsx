import React, { useState } from 'react';
import { 
  Terminal, 
  ArrowRight, 
  Lock, 
  Mail, 
  User, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Github,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  provider: 'google' | 'github' | 'email' | 'guest';
  role?: string;
}

interface LoginPageProps {
  onLoginSuccess: (user: UserProfile) => void;
  onCancel: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onCancel }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<string | null>(null);

  // Social Auth Handlers
  const handleGoogleLogin = () => {
    setIsLoading('google');
    setTimeout(() => {
      onLoginSuccess({
        name: 'Alex Chen',
        email: 'alex.chen@example.com',
        provider: 'google',
        role: 'Software Engineer'
      });
      setIsLoading(null);
    }, 600);
  };

  const handleGithubLogin = () => {
    setIsLoading('github');
    setTimeout(() => {
      onLoginSuccess({
        name: 'AlexChenDev',
        email: 'alex.chen@github.user',
        provider: 'github',
        role: 'Developer'
      });
      setIsLoading(null);
    }, 600);
  };

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading('email');
    setTimeout(() => {
      onLoginSuccess({
        name: fullName || email.split('@')[0],
        email: email,
        provider: 'email',
        role: 'Candidate'
      });
      setIsLoading(null);
    }, 500);
  };

  const handleDemoLogin = (name: string, role: string) => {
    setIsLoading('demo');
    setTimeout(() => {
      onLoginSuccess({
        name: name,
        email: `${name.toLowerCase().replace(' ', '.')}@prototype.test`,
        provider: 'guest',
        role: role
      });
      setIsLoading(null);
    }, 400);
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center p-4 bg-slate-50">
      
      {/* Container Card */}
      <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[520px]">
        
        {/* Left Prototype Info Pane */}
        <div className="hidden md:flex md:col-span-5 bg-slate-900 text-white p-7 flex-col justify-between">
          
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base text-white">PrepMaster</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">
                  Prototype
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white leading-snug">
                Simple Interview Practice Prototype
              </h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Test coding challenges, automated test cases, and behavioral interview questions.
              </p>
            </div>

            {/* Simple Feature List */}
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Multi-file code editor</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Automated unit test runner</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>AI interview questions & hints</span>
              </div>
            </div>
          </div>

          {/* Quick Demo Logins Box */}
          <div className="p-3.5 bg-slate-800/80 border border-slate-700 rounded-xl space-y-2">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
              1-Click Demo Profiles
            </span>
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => handleDemoLogin('Alex Chen', 'Software Engineer')}
                className="w-full text-left px-2.5 py-1.5 bg-slate-900 hover:bg-slate-700 rounded text-xs text-slate-200 transition flex items-center justify-between cursor-pointer"
              >
                <span>Alex Chen</span>
                <span className="text-[10px] text-slate-400 font-mono">Engineer →</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('Jordan Taylor', 'CS Student')}
                className="w-full text-left px-2.5 py-1.5 bg-slate-900 hover:bg-slate-700 rounded text-xs text-slate-200 transition flex items-center justify-between cursor-pointer"
              >
                <span>Jordan Taylor</span>
                <span className="text-[10px] text-slate-400 font-mono">Student →</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Form Pane */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-white">
          
          {/* Top Return Action */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <button
              onClick={onCancel}
              className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-slate-900 transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Problems</span>
            </button>
            <span className="text-[11px] text-slate-400 font-mono">
              Prototype Mode
            </span>
          </div>

          {/* Auth Form */}
          <div className="my-auto py-4 max-w-sm w-full mx-auto">
            
            <div className="mb-5 text-center sm:text-left">
              <h1 className="text-xl font-bold text-slate-900">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                {isSignUp 
                  ? 'Sign up to test the prototype.' 
                  : 'Sign in to test the prototype.'}
              </p>
            </div>

            {/* Social Logins */}
            <div className="space-y-2 mb-4">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading !== null}
                className="w-full h-9 px-3 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-700 text-xs font-medium flex items-center justify-center space-x-2 transition cursor-pointer"
              >
                <span className="font-bold text-blue-500">G</span>
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={handleGithubLogin}
                disabled={isLoading !== null}
                className="w-full h-9 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium flex items-center justify-center space-x-2 transition cursor-pointer"
              >
                <Github className="w-3.5 h-3.5 text-white" />
                <span>Continue with GitHub</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-white px-2 text-slate-400 font-mono">
                  or email
                </span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailAuth} className="space-y-3">
              
              {isSignUp && (
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Name
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Alex Chen"
                      className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-900 transition"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="candidate@example.com"
                    className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-900 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full h-9 pl-9 pr-9 rounded-lg border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-900 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading !== null}
                className="w-full h-9 mt-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium flex items-center justify-center space-x-1.5 transition cursor-pointer"
              >
                <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </form>

            {/* Toggle */}
            <div className="mt-4 text-center text-xs text-slate-500">
              {isSignUp ? (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="font-semibold text-slate-900 hover:underline cursor-pointer"
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className="font-semibold text-slate-900 hover:underline cursor-pointer"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>

          </div>

          {/* Footer note */}
          <div className="pt-3 border-t border-slate-100 text-center text-[11px] text-slate-400">
            Interactive Prototype • No real password required
          </div>

        </div>

      </div>

    </div>
  );
};