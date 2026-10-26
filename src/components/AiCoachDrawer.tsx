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
  const [unlockedLevel, setUnlockedLevel] = useState<number>(1);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'coach',
      timestamp: 'Just now',
      text: `Hi! I am your AI coach. You can unlock step-by-step hints below or ask me questions about your code, trade-offs, or errors.`,
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

    setTimeout(() => {
      let replyText = "";
      if (userText.toLowerCase().includes('explain') || userText.toLowerCase().includes('simple')) {
        replyText = `Break the problem down into two parts: First, keep your data in a fast lookup store (like a Map). Second, apply incoming updates one by one so order is never lost.`;
      } else if (userText.toLowerCase().includes('hint') || userText.toLowerCase().includes('stuck')) {
        replyText = `Try checking Tier 2 of the hints. Think about what happens when two updates arrive at the exact same millisecond.`;
      } else if (userText.toLowerCase().includes('fast') || userText.toLowerCase().includes('speed')) {
        replyText = `To speed up this code, avoid copying large arrays on every change. Use direct key lookups to keep execution O(1).`;
      } else {
        replyText = `Good question! Double check your edge cases first—like empty strings or missing IDs. Would you like a pseudocode example?`;
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
    }, 500);
  };

  const unlockNextTier = () => {
    if (unlockedLevel < 4) {
      setUnlockedLevel(prev => prev + 1);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-white border-l border-slate-200 shadow-xl flex flex-col">
      
      {/* Header */}
      <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center">
            <Bot className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900">
              AI Coach
            </h3>
            <p className="text-[10px] text-slate-500 font-mono">
              Hints & Chat Help
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-700 rounded transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white text-xs font-medium">
        <button
          onClick={() => setActiveTab('hints')}
          className={`flex-1 py-2 text-center transition flex items-center justify-center space-x-1.5 ${
            activeTab === 'hints'
              ? 'border-b-2 border-slate-900 text-slate-900 font-semibold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          <span>Hints ({unlockedLevel}/4)</span>
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-2 text-center transition flex items-center justify-center space-x-1.5 ${
            activeTab === 'chat'
              ? 'border-b-2 border-slate-900 text-slate-900 font-semibold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5 text-indigo-500" />
          <span>Ask AI</span>
        </button>
      </div>

      {/* Tab 1: Progressive Hints */}
      {activeTab === 'hints' && (
        <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5 bg-slate-50">
          <div className="text-[11px] text-slate-500 mb-1">
            Unlock hints step-by-step when you get stuck.
          </div>

          {problem.aiHintLevels.map((hint) => {
            const isUnlocked = hint.level <= unlockedLevel;
            return (
              <div
                key={hint.level}
                className={`rounded-lg border transition ${
                  isUnlocked
                    ? 'bg-white border-slate-200'
                    : 'bg-slate-100/70 border-slate-200 opacity-70'
                }`}
              >
                <div className="p-2.5 flex items-center justify-between border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                      isUnlocked ? 'bg-slate-900 text-white' : 'bg-slate-300 text-slate-600'
                    }`}>
                      {hint.level}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{hint.name}</h4>
                    </div>
                  </div>

                  {isUnlocked ? (
                    <span className="text-[10px] font-mono text-emerald-600 flex items-center space-x-1">
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

                <div className="p-2.5 text-xs">
                  {isUnlocked ? (
                    <div className="text-slate-700 leading-relaxed font-mono text-[11px] bg-slate-50 p-2 rounded whitespace-pre-line">
                      {hint.content}
                    </div>
                  ) : (
                    <div className="text-center py-2">
                      {hint.level === unlockedLevel + 1 && (
                        <button
                          onClick={unlockNextTier}
                          className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-medium rounded transition cursor-pointer"
                        >
                          Unlock Level {hint.level} Hint
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

      {/* Tab 2: Chat */}
      {activeTab === 'chat' && (
        <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
          
          {/* Quick Prompts */}
          <div className="p-2 bg-white border-b border-slate-200 flex items-center gap-1 overflow-x-auto text-[11px]">
            <button
              onClick={() => setInputMessage("Explain this simply.")}
              className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 whitespace-nowrap cursor-pointer"
            >
              Explain simply
            </button>
            <button
              onClick={() => setInputMessage("How can I make this faster?")}
              className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 whitespace-nowrap cursor-pointer"
            >
              Make it faster
            </button>
            <button
              onClick={() => setInputMessage("Are there any edge cases?")}
              className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 whitespace-nowrap cursor-pointer"
            >
              Check edge cases
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-2.5 rounded-lg text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-slate-900 text-white'
                      : 'bg-white border border-slate-200 text-slate-800'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-400 mt-0.5 px-1 font-mono">
                  {msg.sender === 'user' ? 'You' : 'Coach'}
                </span>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-2.5 bg-white border-t border-slate-200 flex items-center space-x-1.5">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white transition"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-1.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-40 transition cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};