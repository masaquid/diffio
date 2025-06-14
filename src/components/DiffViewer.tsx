'use client';

import { DiffResult } from '@/lib/diff';

interface DiffViewerProps {
  diffResults: DiffResult[];
  title?: string;
  diffType: 'char' | 'word' | 'line';
  onDiffTypeChange: (type: 'char' | 'word' | 'line') => void;
}

export default function DiffViewer({ diffResults, title, diffType, onDiffTypeChange }: DiffViewerProps) {
  if (diffResults.length === 0) {
    return (
      <div className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/30 shadow-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">
            {title || '差分結果'}
          </h3>
          <div className="flex gap-2">
            <button 
              onClick={() => onDiffTypeChange('char')}
              className={`px-3 py-1 rounded-lg text-sm text-white transition-colors ${
                diffType === 'char' ? 'bg-white/50' : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              文字単位
            </button>
            <button 
              onClick={() => onDiffTypeChange('word')}
              className={`px-3 py-1 rounded-lg text-sm text-white transition-colors ${
                diffType === 'word' ? 'bg-white/50' : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              単語単位
            </button>
            <button 
              onClick={() => onDiffTypeChange('line')}
              className={`px-3 py-1 rounded-lg text-sm text-white transition-colors ${
                diffType === 'line' ? 'bg-white/50' : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              行単位
            </button>
          </div>
        </div>
        <div className="text-white/60 text-center py-8">
          差分を表示するにはテキストを入力してください
        </div>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/30 shadow-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white">
          {title || '差分結果'}
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={() => onDiffTypeChange('char')}
            className={`px-3 py-1 rounded-lg text-sm text-white transition-colors ${
              diffType === 'char' ? 'bg-white/50' : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            文字単位
          </button>
          <button 
            onClick={() => onDiffTypeChange('word')}
            className={`px-3 py-1 rounded-lg text-sm text-white transition-colors ${
              diffType === 'word' ? 'bg-white/50' : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            単語単位
          </button>
          <button 
            onClick={() => onDiffTypeChange('line')}
            className={`px-3 py-1 rounded-lg text-sm text-white transition-colors ${
              diffType === 'line' ? 'bg-white/50' : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            行単位
          </button>
        </div>
      </div>
      <div className="bg-white/5 rounded-xl overflow-hidden max-h-96">
        <div className="flex">
          {/* Line numbers */}
          <div className="flex-shrink-0 w-12 bg-white/5 border-r border-white/20 overflow-y-auto max-h-96">
            <div className="py-4 pr-2 text-right text-xs font-mono text-white/50 leading-5 select-none">
              {(() => {
                const lines = diffResults.reduce((acc, result) => {
                  const resultLines = result.value.split('\n');
                  return acc + resultLines.length - (result.value.endsWith('\n') ? 1 : 0);
                }, 0);
                const lineCount = Math.max(lines, 1);
                return Array.from({ length: lineCount }, (_, i) => (
                  <div key={i + 1} className="h-5">
                    {i + 1}
                  </div>
                ));
              })()}
            </div>
          </div>

          {/* Diff content */}
          <div className="flex-1 overflow-y-auto max-h-96">
            <pre className="text-sm font-mono whitespace-pre-wrap p-4 pl-3 leading-5">
              {diffResults.map((result, index) => {
                if (result.added) {
                  return (
                    <span
                      key={index}
                      className="bg-green-500/30 text-green-100 rounded px-1"
                    >
                      {result.value}
                    </span>
                  );
                } else if (result.removed) {
                  return (
                    <span
                      key={index}
                      className="bg-red-500/30 text-red-100 rounded px-1 line-through"
                    >
                      {result.value}
                    </span>
                  );
                } else {
                  return (
                    <span key={index} className="text-white">
                      {result.value}
                    </span>
                  );
                }
              })}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}