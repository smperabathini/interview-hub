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
      
      {/* Editor Header / Tab Bar (Gestalt: Common Region, Emphasis: Active File) */}
      <div className="h-10 px-4 bg-slate-50 border-b border-slate-300 flex items-center justify-between select-none">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 px-3 py-1 bg-white border-t-2 border-t-slate-950 border-l border-r border-slate-300 rounded-t-md text-xs font-mono font-bold text-slate-950 shadow-xs -mb-[1px]">
            <FileCode2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>{activeFile.name}</span>
            {activeFile.isModified && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 ml-1" title="Unsaved changes" />
            )}
          </div>
          <span className="text-[10px] font-mono text-slate-400 pl-2">
            Path: {activeFile.path}
          </span>
        </div>

        {/* Toolbar Controls (Gestalt: Proximity, Scale: 14px icons) */}
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-slate-200/80 text-slate-800 rounded font-bold border border-slate-300">
            {activeFile.language}
          </span>

          <button
            onClick={() => onResetFile(activeFile.id)}
            title="Reset to original starter code"
            className="p-1.5 text-slate-500 hover:text-slate-950 rounded hover:bg-slate-200/70 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleCopy}
            title="Copy file contents"
            className="p-1.5 text-slate-500 hover:text-slate-950 rounded hover:bg-slate-200/70 transition flex items-center space-x-1 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Editor Content Canvas (Contrast: High-legibility text & clean gutter) */}
      <div className="flex-1 relative flex overflow-hidden font-mono text-xs leading-relaxed bg-[#fcfcfc]">
        
        {/* Line Numbers Gutter */}
        <div className="w-12 py-3 bg-slate-100/70 border-r border-slate-200 text-slate-400 select-none text-right pr-3 font-mono text-[11px] leading-5">
          {lines.map((_, i) => (
            <div key={i} className="hover:text-slate-600 transition-colors">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Textarea for live typing */}
        <textarea
          value={activeFile.content}
          onChange={(e) => onCodeChange(activeFile.id, e.target.value)}
          spellCheck={false}
          className="flex-1 p-3 bg-transparent text-slate-950 resize-none outline-none font-mono text-[12px] leading-5 tab-4 overflow-auto selection:bg-indigo-100 selection:text-indigo-950 border-none"
          placeholder="Write your implementation code here..."
        />
      </div>

      {/* Footer Status Bar (Hierarchy: Tier 5 Micro-copy) */}
      <div className="h-6 px-4 bg-slate-100/80 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-500 select-none">
        <div className="flex items-center space-x-3">
          <span>Lines: {lines.length}</span>
          <span>Chars: {activeFile.content.length}</span>
          <span>UTF-8</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="flex items-center space-x-1 text-emerald-700 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Types Checked</span>
          </span>
          <span className="text-slate-400">|</span>
          <span>Tab Size: 2</span>
        </div>
      </div>

    </div>
  );
};
