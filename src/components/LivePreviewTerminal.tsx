import React, { useState } from 'react';
import { 
  Terminal, 
  Activity, 
  Eye, 
  Play, 
  CheckCircle2, 
  RefreshCw, 
  Server, 
  Layers
} from 'lucide-react';
import { Problem } from '../types';

interface LivePreviewTerminalProps {
  problem: Problem;
}

export const LivePreviewTerminal: React.FC<LivePreviewTerminalProps> = ({ problem }) => {
  const [activeTab, setActiveTab] = useState<'terminal' | 'server-logs' | 'preview'>('server-logs');
  const [commandInput, setCommandInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'prepmaster-isolate:~$ npm start',
    '> prepmaster-sandbox@1.0.0 start',
    '> ts-node-esm src/index.ts',
    '[Sandbox Daemon] Service booted on port 8080 (PID 44921)',
    '[Sandbox Daemon] In-memory persistence ready. Listening for WebSocket / HTTP...'
  ]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;

    const cmd = commandInput.trim();
    const newHistory = [...terminalHistory, `prepmaster-isolate:~$ ${cmd}`];

    if (cmd === 'npm test' || cmd === 'test') {
      newHistory.push(
        '> jest --runInBand --detectOpenHandles',
        'PASS src/__tests__/solution.test.ts',
        '✓ Core invariant verification (12 ms)',
        '✓ High concurrency boundary test (38 ms)',
        'Test Suites: 1 passed, 1 total',
        'Tests:       3 passed, 3 total',
        'Snapshots:   0 total',
        'Time:        0.652 s'
      );
    } else if (cmd === 'curl' || cmd.startsWith('curl')) {
      newHistory.push(
        'HTTP/1.1 200 OK',
        'Content-Type: application/json',
        'X-RateLimit-Remaining: 98',
        '{"status":"healthy","uptime_ms":12480,"active_peers":2}'
      );
    } else if (cmd === 'clear') {
      setTerminalHistory([]);
      setCommandInput('');
      return;
    } else {
      newHistory.push(`Executed: ${cmd} (status: 0 OK)`);
    }

    setTerminalHistory(newHistory);
    setCommandInput('');
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Sub-nav Tab Bar */}
      <div className="px-3 py-2 bg-slate-50 border-b border-slate-300 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setActiveTab('server-logs')}
            className={`px-2.5 py-1 text-xs font-mono rounded-md font-medium transition flex items-center space-x-1.5 ${
              activeTab === 'server-logs'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>Server Logs</span>
          </button>

          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-2.5 py-1 text-xs font-mono rounded-md font-medium transition flex items-center space-x-1.5 ${
              activeTab === 'terminal'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Sandbox CLI</span>
          </button>

          <button
            onClick={() => setActiveTab('preview')}
            className={`px-2.5 py-1 text-xs font-mono rounded-md font-medium transition flex items-center space-x-1.5 ${
              activeTab === 'preview'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Output Preview</span>
          </button>
        </div>

        <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Port 8080 • Active</span>
        </div>
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-hidden p-3 bg-white font-mono text-xs">
        {activeTab === 'server-logs' && (
          <div className="h-full overflow-y-auto space-y-1 text-slate-800 text-[11px] leading-relaxed">
            <div className="text-slate-400">--- [PREPMASTER SANDBOX RUNTIME LOGS] ---</div>
            <div className="text-emerald-700">[SYSTEM] Node.js container spin-up completed in 42ms</div>
            <div className="text-slate-600">[DB] SQLite in-memory snapshot initialized</div>
            <div className="text-blue-700">[HTTP] GET /api/v1/health → 200 OK (0.4ms)</div>
            <div className="text-slate-700">[WEBSOCKET] Client peer handshake authorized (session_id=doc_9918)</div>
            <div className="text-purple-700">[CONCURRENCY] Lock striping acquired segment [0x7F]</div>
            <div className="text-slate-500">[GC] Low-latency memory profile: HeapUsed 18.4MB / 128MB max</div>
            <div className="text-slate-700">[METRICS] p99 Response Latency: 1.4ms • Zero dropped frames</div>
          </div>
        )}

        {activeTab === 'terminal' && (
          <div className="h-full flex flex-col justify-between text-[11px]">
            <div className="overflow-y-auto space-y-1 text-slate-800 flex-1">
              {terminalHistory.map((line, idx) => (
                <div key={idx} className={line.startsWith('prepmaster-isolate') ? 'text-indigo-600 font-bold' : 'text-slate-700'}>
                  {line}
                </div>
              ))}
            </div>

            <form onSubmit={handleCommandSubmit} className="pt-2 border-t border-slate-200 flex items-center space-x-2">
              <span className="text-indigo-600 font-bold">prepmaster-isolate:~$</span>
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
          <div className="h-full border border-slate-200 rounded-lg p-4 bg-slate-50 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white border border-slate-300 flex items-center justify-center shadow-xs">
              <Activity className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Simulated Sandbox Component View
              </h4>
              <p className="text-[11px] text-slate-500 max-w-sm mt-1">
                Connected to <span className="font-mono text-slate-800">{problem.title}</span>. Client React DOM mounting and socket stream verification.
              </p>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-lg text-left text-xs max-w-md w-full shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-[10px] text-slate-400 uppercase font-mono">
                <span>Client Component Status</span>
                <span className="text-emerald-600 font-bold">● RENDERED OK</span>
              </div>
              <p className="text-slate-700 text-xs mt-2 font-mono">
                Component state vector synced with OT server. Listening for user keystrokes...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
