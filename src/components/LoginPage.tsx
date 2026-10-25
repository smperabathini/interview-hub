import React, { useState } from 'react';
import { 
  Terminal, 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Mail, 
  User, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Github,
  ArrowLeft
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
  const [rememberMe, setRememberMe] = useState(true);

  // Social Auth Handlers
  const handleGoogleLogin = () => {
    setIsLoading('google');
    setTimeout(() => {
      onLoginSuccess({
        name: 'Alex Chen',
        email: 'alex.chen@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
        provider: 'google',
        role: 'Senior Software Engineer'
      });
      setIsLoading(null);
    }, 800);
  };

  const handleGithubLogin = () => {
    setIsLoading('github');
    setTimeout(() => {
      onLoginSuccess({
        name: 'AlexChenDev',
        email: 'alex.chen@github.user',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
        provider: 'github',
        role: 'Full-Stack Developer'
      });
      setIsLoading(null);
    }, 800);
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
    }, 700);
  };

  const handleDemoLogin = () => {
    setIsLoading('demo');
    setTimeout(() => {
      onLoginSuccess({
        name: 'Jordan Taylor',
        email: 'jordan.taylor@prepmaster.io',
        provider: 'guest',
        role: 'CS Senior & Interview Candidate'
      });
      setIsLoading(null);
    }, 500);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#fafafa]">
      
      {/* Container Card (Gestalt: Common Region, Scale & Contrast) */}
      <div className="w-full max-w-5xl bg-white border border-slate-300 rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        
        {/* Left Brand & Showcase Pane (Visible on lg screens) */}
        <div className="hidden lg:flex lg:col-span-5 bg-slate-950 text-white p-8 flex-col justify-between relative overflow-hidden">
          
          {/* Subtle Decorative Grid Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10">
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold tracking-tight shadow-xs">
                <Terminal className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white block">
                  PrepMaster
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  GenAI Sandbox Interview Platform
                </span>
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Real Take-Home Simulation</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white leading-tight">
                Practice full-stack systems, not just single-function puzzles.
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Step into multi-file interactive sandboxes with AI-generated test cases, progressive hints, and verbal technical defense.
              </p>
            </div>

            {/* Feature Highlights Checklist */}
            <div className="mt-8 space-y-3.5">
              <div className="flex items-start space-x-3">
                <div className="p-1 rounded bg-slate-800 text-emerald-400 border border-slate-700 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Full-Stack Sandbox Environments</h4>
                  <p className="text-[11px] text-slate-400">Multi-file tree, server runtimes, and real API endpoints.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-1 rounded bg-slate-800 text-indigo-400 border border-slate-700 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">AI Accuracy & Scalability Grading</h4>
                  <p className="text-[11px] text-slate-400">Throughput curves, Big-O profiles, and bottleneck analysis.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-1 rounded bg-slate-800 text-amber-400 border border-slate-700 mt-0.5">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">STAR Behavioral Interview Coach</h4>
                  <p className="text-[11px] text-slate-400">Guided Situation, Task, Action, and Result evaluations.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof Quote */}
          <div className="relative z-10 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 mt-8">
            <p className="italic text-slate-300 mb-2">
              "Running multi-file code in a live sandbox with instant AI scalability feedback helped me clear my principal take-home round."
            </p>
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Verified Candidate Study</span>
              <span className="text-emerald-400 font-semibold">Tier-1 SWE</span>
            </div>
          </div>

        </div>

        {/* Right Authentication Form Pane */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-white">
          
          {/* Top Actions: Back to Catalog */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <button
              onClick={onCancel}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Problems</span>
            </button>
            <span className="text-xs text-slate-400 font-mono">
              Secure OAuth 2.0
            </span>
          </div>

          {/* Main Auth Form Content */}
          <div className="my-auto py-6 max-w-md w-full mx-auto">
            
            {/* Header (Hierarchy Tier 1 & 2) */}
            <div className="text-center sm:text-left mb-6">
              <h1 className="text-2xl font-black text-slate-950 tracking-tight">
                {isSignUp ? 'Create your PrepMaster account' : 'Welcome back'}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                {isSignUp 
                  ? 'Join hundreds of engineers mastering real-world full-stack interviews.' 
                  : 'Sign in to access your saved sandboxes, custom problems, and evaluation history.'}
              </p>
            </div>

            {/* Social Login Buttons (Google, GitHub) */}
            <div className="space-y-3 mb-6">
              
              {/* Google OAuth Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading !== null}
                className="w-full h-11 px-4 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 rounded-xl text-slate-800 text-xs font-bold flex items-center justify-center space-x-3 transition shadow-xs cursor-pointer active:scale-[0.99] disabled:opacity-50"
              >
                {isLoading === 'google' ? (
                  <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-800 rounded-full animate-spin" />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                )}
                <span>Continue with Google</span>
              </button>

              {/* GitHub OAuth Button */}
              <button
                type="button"
                onClick={handleGithubLogin}
                disabled={isLoading !== null}
                className="w-full h-11 px-4 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-3 transition shadow-xs cursor-pointer active:scale-[0.99] disabled:opacity-50 border border-slate-950"
              >
                {isLoading === 'github' ? (
                  <div className="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
                ) : (
                  <Github className="w-4 h-4 text-white" />
                )}
                <span>Continue with GitHub</span>
              </button>

            </div>

            {/* Separator Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-[11px] uppercase">
                <span className="bg-white px-3 text-slate-400 font-mono font-medium">
                  or continue with email
                </span>
              </div>
            </div>

            {/* Email / Password Form */}
            <form onSubmit={handleEmailAuth} className="space-y-4">
              
              {isSignUp && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Alex Chen"
                      className="w-full h-10 pl-10 pr-3 rounded-lg border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="candidate@university.edu or alex@company.com"
                    className="w-full h-10 pl-10 pr-3 rounded-lg border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Password
                  </label>
                  {!isSignUp && (
                    <button 
                      type="button" 
                      onClick={() => alert('Password reset link sent to demo email.')}
                      className="text-[11px] font-semibold text-slate-500 hover:text-slate-900 transition"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full h-10 pl-10 pr-10 rounded-lg border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Remember me checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center space-x-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-slate-300 text-slate-950 focus:ring-slate-950 accent-slate-950"
                  />
                  <span className="text-xs text-slate-600 font-medium">Keep me signed in</span>
                </label>
              </div>

              {/* Primary Submit Button */}
              <button
                type="submit"
                disabled={isLoading !== null}
                className="w-full h-10 mt-2 bg-slate-950 hover:bg-slate-800 text-white rounded-lg text-xs font-bold tracking-wide flex items-center justify-center space-x-2 transition shadow-xs cursor-pointer active:scale-[0.99] disabled:opacity-50"
              >
                {isLoading === 'email' ? (
                  <div className="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{isSignUp ? 'Create Account & Start Practicing' : 'Sign In'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

            </form>

            {/* Quick Demo Guest Button */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Just exploring?</span>
              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={isLoading !== null}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition flex items-center space-x-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-indigo-500" />
                <span>Instant Demo Login</span>
              </button>
            </div>

            {/* Toggle Sign in vs Sign up */}
            <div className="mt-6 text-center text-xs text-slate-600">
              {isSignUp ? (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="font-bold text-slate-950 hover:underline cursor-pointer"
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
                    className="font-bold text-slate-950 hover:underline cursor-pointer"
                  >
                    Sign Up Free
                  </button>
                </>
              )}
            </div>

          </div>

          {/* Footer Security / Terms */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
              <span>Encrypted sandbox session data</span>
            </div>
            <div className="flex items-center space-x-3">
              <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:underline">Terms</a>
              <span className="text-slate-300">•</span>
              <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:underline">Privacy Policy</a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
