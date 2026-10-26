import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Bot, 
  Send, 
  Lightbulb, 
  MessageSquare,
  Lock,
  Unlock
} from 'lucide-react';
import { Problem, ChatMessage } from '../types';

interface AiCoachDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  problem: Problem;
}

export const AiCoachDrawer: React.FC<AiCoachDrawerProps> = ({
  isOpen,
  onClose,
  problem
}) => {
  const [activeTab, setActiveTab] = useState<'hints' | 'chat'>('hints');
  
  // Progressive Hint Unlocking state
  const [unlockedLevel, setUnlockedLevel] = useState<number>(1);

  // Chat conversation state
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'coach',
      timestamp: 'Just now',
      text: `Hello! I am your AI Coach. As designed, I will never interrupt your reasoning unsolicited. When you are ready for guidance, explore the progressive hint tiers below or ask me questions about architecture, trade-offs, or error messages.`,
      assistanceTier: 'nudge'
    }
  ]);

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage.trim();
    const newMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      timestamp: 'Just now',
      text: userText
    };

    setMessages(prev => [...prev, newMsg]);
    setInputMessage('');

    // Generate AI response
    setTimeout(() => {
      let replyText = "";
      if (userText.toLowerCase().includes('explain') || userText.toLowerCase().includes('style')) {
        replyText = `In a technical interview, structure your explanation with the "Constraint → Invariant → Trade-off" pattern. Start by stating: "To keep latency bounded, we maintain in-memory state while logging append-only delta journals." This directly signals senior engineering judgment.`;
      } else if (userText.toLowerCase().includes('hint') || userText.toLowerCase().includes('stuck')) {
        replyText = `Before checking code: consider what happens when two clients send requests at the same timestamp. Check Tier 2 of the hints to see how to order these deterministically without divergent states.`;
      } else if (userText.toLowerCase().includes('scale') || userText.toLowerCase().includes('slow')) {
        replyText = `From a scalability standpoint, the bottleneck here is usually sequential memory re-allocation or global mutex locks. If you stripe your locks into separate buckets, multiple CPU cores can write simultaneously without blocking each other.`;
      } else {
        replyText = `Analyzing your query against the problem constraints... To maintain proper design hygiene, verify your boundary conditions first. Would you like me to walk through the pseudocode structure without spoiling the final implementation?`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: `c-${Date.now()}`,
          sender: 'coach',
          timestamp: 'Just now',
          text: replyText
        }
      ]);
    }, 700);
  };

  const unlockNextTier = () => {
    if (unlockedLevel < 4) {
      setUnlockedLevel(prev => prev + 1);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-white border-l border-slate-300 shadow-modal flex flex-col animate-in slide-in-from-right duration-200">
      
      {/* Header */}
      <div className="p-4 bg-slate-50 border-b border-slate-300 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
            <Bot className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-bold text-slate-900">
                AI Coach & Chatbot
              </h3>
              <span className="text-[10px] font-mono px-1.5 py-0.2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded font-semibold">
                On-Demand
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">
              Progressive Hints & Architecture Guidance
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Principle Banner */}
      <div className="px-4 py-2 bg-amber-50/70 border-b border-amber-200/80 flex items-center space-x-2 text-[11px] text-amber-900">
        <Lightbulb className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
        <span>
          <strong className="font-semibold">Non-intrusive:</strong> Hints are revealed progressively only at your request to let you solve the core problem yourself first.
        </span>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white">
        <button
          onClick={() => setActiveTab('hints')}
          className={`flex-1 py-2.5 text-xs font-semibold tracking-wide border-b-2 transition flex items-center justify-center space-x-1.5 ${
            activeTab === 'hints'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Progressive Hints ({unlockedLevel}/4)</span>
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-2.5 text-xs font-semibold tracking-wide border-b-2 transition flex items-center justify-center space-x-1.5 ${
            activeTab === 'chat'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
          <span>Interactive Chatbot</span>
        </button>
      </div>

      {/* Tab 1: Progressive Hints */}
      {activeTab === 'hints' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/30">
          <div className="text-xs text-slate-600 mb-1">
            Unlock hints step-by-step so you preserve the opportunity to solve the core architectural problem yourself.
          </div>

          {problem.aiHintLevels.map((hint) => {
            const isUnlocked = hint.level <= unlockedLevel;
            return (
              <div
                key={hint.level}
                className={`rounded-xl border transition-all ${
                  isUnlocked
                    ? 'bg-white border-slate-300 shadow-xs'
                    : 'bg-slate-100/60 border-slate-200 opacity-75'
                }`}
              >
                <div className="p-3.5 flex items-center justify-between border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                      isUnlocked ? 'bg-indigo-600 text-white' : 'bg-slate-300 text-slate-600'
                    }`}>
                      {hint.level}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{hint.name}</h4>
                      <p className="text-[10px] text-slate-500">{hint.description}</p>
                    </div>
                  </div>

                  {isUnlocked ? (
                    <span className="text-[10px] font-mono text-emerald-600 flex items-center space-x-1 font-semibold">
                      <Unlock className="w-3 h-3" />
                      <span>Unlocked</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-400 flex items-center space-x-1">
                      <Lock className="w-3 h-3" />
                      <span>Locked</span>
                    </span>
                  )}
                </div>

                <div className="p-3.5">
                  {isUnlocked ? (
                    <div className="text-xs text-slate-700 leading-relaxed font-mono bg-slate-50 p-3 rounded-lg border border-slate-200 whitespace-pre-line">
                      {hint.content}
                    </div>
                  ) : (
                    <div className="text-center py-3">
                      <p className="text-xs text-slate-500 mb-2">
                        Try solving with previous hints first.
                      </p>
                      {hint.level === unlockedLevel + 1 && (
                        <button
                          onClick={unlockNextTier}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-md shadow-sm transition active:scale-95 cursor-pointer"
                        >
                          Unlock Tier {hint.level} Hint
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Interactive Coach Chat */}
      {activeTab === 'chat' && (
        <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/30">
          
          {/* Quick Prompts */}
          <div className="p-2.5 bg-slate-100/70 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[11px]">
            <button
              onClick={() => setInputMessage("Help me explain my solution style for an interviewer.")}
              className="px-2.5 py-1 bg-white border border-slate-300 rounded-full text-slate-700 hover:bg-slate-50 whitespace-nowrap"
            >
              Explain solution style
            </button>
            <button
              onClick={() => setInputMessage("Why would this solution be slow under 50k req/s?")}
              className="px-2.5 py-1 bg-white border border-slate-300 rounded-full text-slate-700 hover:bg-slate-50 whitespace-nowrap"
            >
              Analyze scale bottleneck
            </button>
            <button
              onClick={() => setInputMessage("Could my state update cause a race condition?")}
              className="px-2.5 py-1 bg-white border border-slate-300 rounded-full text-slate-700 hover:bg-slate-50 whitespace-nowrap"
            >
              Check concurrency risk
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-slate-900 text-white shadow-sm rounded-br-none'
                      : 'bg-white border border-slate-300 text-slate-800 shadow-xs rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1 font-mono">
                  {msg.sender === 'user' ? 'You' : 'AI Coach'} • {msg.timestamp}
                </span>
              </div>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-300 flex items-center space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask the coach about trade-offs, debugging, or style..."
              className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};
