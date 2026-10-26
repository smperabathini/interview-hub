import React from 'react';
import { 
  Folder, 
  FileCode, 
  FileText, 
  Database, 
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
    <div className="w-full flex-shrink-0 bg-white flex flex-col h-full select-none">
      {/* Explorer Header */}
      <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <span className="text-[11px] font-mono font-medium uppercase text-slate-500 flex items-center space-x-1">
          <Layers className="w-3 h-3 text-slate-400" />
          <span>Files</span>
        </span>
        <span className="text-[10px] font-mono text-slate-400">
          {files.length} items
        </span>
      </div>

      {/* Directory Tree */}
      <div className="p-2 space-y-0.5 overflow-y-auto flex-1 font-mono text-xs">
        <div className="px-1.5 py-1 text-[10px] text-slate-400 flex items-center space-x-1">
          <Folder className="w-3 h-3 text-slate-400" />
          <span>src</span>
        </div>

        <div className="pl-2 space-y-0.5">
          {files.map((file) => {
            const isActive = file.id === activeFileId;
            return (
              <button
                key={file.id}
                onClick={() => onSelectFile(file.id)}
                className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded text-left transition cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white font-medium'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className={isActive ? 'text-white' : ''}>
                  {getFileIcon(file.name)}
                </span>
                <span className="truncate flex-1 text-[11px]">
                  {file.name}
                </span>
                {file.isModified && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 ml-auto" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-slate-100 text-[10px] font-mono text-slate-400 flex items-center justify-between">
        <span className="flex items-center space-x-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Mock Runner</span>
        </span>
        <span>Node v20</span>
      </div>
    </div>
  );
};