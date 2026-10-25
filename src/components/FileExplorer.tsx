import React from 'react';
import { 
  Folder, 
  FileCode, 
  FileText, 
  Database, 
  ChevronRight, 
  ChevronDown, 
  Plus, 
  Cpu, 
  Layers
} from 'lucide-react';
import { FileNode } from '../types';

interface FileExplorerProps {
  files: FileNode[];
  activeFileId: string;
  onSelectFile: (fileId: string) => void;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  activeFileId,
  onSelectFile
}) => {
  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.sql')) return <Database className="w-3.5 h-3.5 text-amber-600" />;
    if (fileName.endsWith('.tsx') || fileName.endsWith('.jsx')) return <FileCode className="w-3.5 h-3.5 text-blue-600" />;
    if (fileName.endsWith('.ts') || fileName.endsWith('.js')) return <FileCode className="w-3.5 h-3.5 text-indigo-600" />;
    return <FileText className="w-3.5 h-3.5 text-slate-500" />;
  };

  return (
    <div className="w-56 flex-shrink-0 bg-white border-r border-slate-300 flex flex-col h-full select-none">
      {/* Explorer Header */}
      <div className="px-3 py-2.5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 flex items-center space-x-1.5">
          <Layers className="w-3 h-3 text-slate-500" />
          <span>Sandbox Files</span>
        </span>
        <span className="text-[10px] font-mono text-slate-400">
          {files.length} items
        </span>
      </div>

      {/* Workspace Directory Tree */}
      <div className="p-2 space-y-1 overflow-y-auto flex-1 font-mono text-xs">
        <div className="px-2 py-1 text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center space-x-1">
          <Folder className="w-3 h-3 text-slate-400" />
          <span>workspace-root</span>
        </div>

        <div className="pl-2 space-y-0.5">
          {files.map((file) => {
            const isActive = file.id === activeFileId;
            return (
              <button
                key={file.id}
                onClick={() => onSelectFile(file.id)}
                className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-md text-left transition group ${
                  isActive
                    ? 'bg-slate-900 text-white font-medium shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span className={isActive ? 'text-white' : ''}>
                  {getFileIcon(file.name)}
                </span>
                <span className="truncate flex-1 text-[11px] font-medium">
                  {file.name}
                </span>
                {file.isModified && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 ml-auto" title="Unsaved changes" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sandbox Environment Runtime Pill */}
      <div className="p-3 border-t border-slate-200 bg-slate-50 text-[10px] font-mono text-slate-500 space-y-1">
        <div className="flex items-center justify-between">
          <span className="flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="font-semibold text-slate-700">Sandbox V8 isolate</span>
          </span>
          <span className="text-slate-400">Node v20 LTS</span>
        </div>
        <p className="text-[9px] text-slate-400">Isolated memory container active</p>
      </div>
    </div>
  );
};
