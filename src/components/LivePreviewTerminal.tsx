import React, { useState } from 'react';
import { 
  Terminal, 
  Activity, 
  Eye, 
  Server
} from 'lucide-react';
import { Problem } from '../types';

interface LivePreviewTerminalProps {
  problem: Problem;
}

export const LivePreviewTerminal: React.FC<LivePreviewTerminalProps> = ({ problem }) => {
  const [activeTab, setActiveTab] = useState<'server-logs' | 'terminal' | 'preview'>('server-logs');
  const [commandInput, setCommandInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'prototype:~$ npm start',
    '> service started on port 8080',
    '> ready for requests...'
  ]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;

    const cmd = commandInput.trim();
    const newHistory = [...terminalHistory, `prototype:~$ ${cmd}`];

    if (cmd === 'npm test' || cmd === 'test') {
      newHistory.push(
        '> running test suite...',
        'PASS src/__tests__/solution.test.ts',
        '✓ All 3 tests passed (18ms)'
      );
    } else if (cmd === 'curl' || cmd.startsWith('curl')) {
      newHistory.push(
        'HTTP/1.1 200 OK',
        '{"status":"healthy","uptime":"active"}'
      );
    } else if (cmd === 'clear') {
      setTerminalHistory([]);
      setCommandInput('');
      return;
    } else {
      newHistory.push(`Executed: ${cmd} (OK)`);
    }

    setTerminalHistory(newHistory);
    setCommandInput('');
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Sub-nav Tab Bar */}
      <div className="px-3 py-1.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setActiveTab('server-logs')}
            className={`px-2 py-0.5 text-xs font-mono rounded font-medium transition flex items-center space-x-1 cursor-pointer ${
              activeTab === 'server-logs'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Server className="w-3 h-3" />
            <span>Server Logs</span>
          </button>

          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-2 py-0.5 text-xs font-mono rounded font-medium transition flex items-center space-x-1 cursor-pointer ${
              activeTab === 'terminal'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Terminal className="w-3 h-3" />
            <span>Terminal</span>
          </button>

          <button
            onClick={() => setActiveTab('preview')}
            className={`px-2 py-0.5 text-xs font-mono rounded font-medium transition flex items-center space-x-1 cursor-pointer ${
              activeTab === 'preview'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Live Output</span>
          </button>
        </div>

        <div className="flex items-center space-x-1 text-[10px] font-mono text-emerald-600">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Port 8080 • Active</span>
        </div>
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-hidden p-3 bg-white font-mono text-xs">
        {activeTab === 'server-logs' && (
          <div className="h-full overflow-y-auto space-y-1 text-slate-700 text-[11px] leading-relaxed">
            <div className="text-slate-400">--- [PROTOTYPE RUNTIME LOGS] ---</div>
            <div className="text-emerald-700">[SYSTEM] Node.js container ready</div>
            <div className="text-slate-600">[DB] Memory state initialized</div>
            <div className="text-blue-700">[HTTP] GET /health → 200 OK</div>
            <div className="text-slate-700">[LOG] Zero errors detected</div>
          </div>
        )}

        {activeTab === 'terminal' && (
          <div className="h-full flex flex-col justify-between text-[11px]">
            <div className="overflow-y-auto space-y-1 text-slate-800 flex-1">
              {terminalHistory.map((line, idx) => (
                <div key={idx} className={line.startsWith('prototype') ? 'text-indigo-600 font-bold' : 'text-slate-700'}>
                  {line}
                </div>
              ))}
            </div>

            <form onSubmit={handleCommandSubmit} className="pt-2 border-t border-slate-100 flex items-center space-x-1.5">
              <span className="text-indigo-600 font-bold text-xs">prototype:~$</span>
              <input
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                placeholder="Type command (e.g. npm test, curl, clear)..."
                className="flex-1 bg-transparent text-slate-900 outline-none text-xs font-mono"
              />
            </form>
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="h-full border border-slate-200 rounded p-4 bg-slate-50 flex flex-col items-center justify-center text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center">
              <Activity className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                Component Output Preview
              </h4>
              <p className="text-[11px] text-slate-500 max-w-sm mt-0.5">
                Output for <span className="font-semibold">{problem.title}</span>.
              </p>
            </div>
            <div className="p-2.5 bg-white border border-slate-200 rounded text-left text-xs max-w-sm w-full">
              <span className="text-emerald-600 font-semibold text-[10px] uppercase font-mono block mb-1">
                ● Live Render OK
              </span>
              <p className="text-slate-600 text-[11px]">
                Component rendered without errors.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};