import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  RotateCcw, 
  FileCode2
} from 'lucide-react';
import { FileNode } from '../types';

interface CodeEditorProps {
  activeFile: FileNode;
  onCodeChange: (fileId: string, newContent: string) => void;
  onResetFile: (fileId: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  activeFile,
  onCodeChange,
  onResetFile
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = activeFile.content.split('\n');

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
      
      {/* Editor Tab Bar */}
      <div className="h-9 px-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between select-none">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded text-xs font-mono font-medium text-slate-900">
            <FileCode2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>{activeFile.name}</span>
            {activeFile.isModified && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 ml-1" />
            )}
          </div>
          <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
            {activeFile.path}
          </span>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center space-x-1">
          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
            {activeFile.language}
          </span>

          <button
            onClick={() => onResetFile(activeFile.id)}
            title="Reset code"
            className="p-1 text-slate-400 hover:text-slate-800 rounded transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleCopy}
            title="Copy code"
            className="p-1 text-slate-400 hover:text-slate-800 rounded transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Code Textarea & Gutter */}
      <div className="flex-1 relative flex overflow-hidden font-mono text-xs leading-relaxed bg-[#fdfdfd]">
        
        {/* Line Numbers */}
        <div className="w-10 py-3 bg-slate-50/60 border-r border-slate-100 text-slate-300 select-none text-right pr-2 font-mono text-[11px] leading-5">
          {lines.map((_, i) => (
            <div key={i}>
              {i + 1}
            </div>
          ))}
        </div>

        {/* Live typing area */}
        <textarea
          value={activeFile.content}
          onChange={(e) => onCodeChange(activeFile.id, e.target.value)}
          spellCheck={false}
          className="flex-1 p-3 bg-transparent text-slate-900 resize-none outline-none font-mono text-[12px] leading-5 overflow-auto border-none"
          placeholder="Write your code here..."
        />
      </div>

      {/* Status Bar */}
      <div className="h-6 px-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-400 select-none">
        <div className="flex items-center space-x-2">
          <span>{lines.length} lines</span>
          <span>•</span>
          <span>{activeFile.content.length} chars</span>
        </div>
        <div className="flex items-center space-x-1 text-emerald-600">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Editor Ready</span>
        </div>
      </div>

    </div>
  );
};