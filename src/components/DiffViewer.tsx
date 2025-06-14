'use client';

import { useState } from 'react';
import { DiffResult } from '@/lib/diff';

interface DiffViewerProps {
  diffResults: DiffResult[];
  title?: string;
  diffType: 'char' | 'word' | 'line';
  onDiffTypeChange: (type: 'char' | 'word' | 'line') => void;
}

export default function DiffViewer({ diffResults, title, diffType, onDiffTypeChange }: DiffViewerProps) {
  const [scrollTop, setScrollTop] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const handleCopy = async () => {
    const diffText = diffResults.map(result => result.value).join('');
    try {
      await navigator.clipboard.writeText(diffText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = diffText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (diffResults.length === 0) {
    return (
      <div className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/30 shadow-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white mr-2.5">
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
    <div className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/30 shadow-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white mr-2.5">
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
      <div className="relative bg-white/5 rounded-xl overflow-hidden max-h-96">
        {/* Copy button */}
        {diffResults.length > 0 && (
          <button
            onClick={handleCopy}
            className={`absolute top-3 right-3 z-20 p-2 rounded-md transition-all group ${
              copied 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white'
            }`}
            title={copied ? 'コピーしました！' : '差分結果をコピー'}
          >
            {copied ? (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        )}

        {/* Line numbers - positioned absolutely */}
        <div className="absolute left-0 top-0 w-12 bg-white/5 border-r border-white/20 h-full overflow-hidden pointer-events-none z-10">
          <div 
            className="py-4 pr-2 text-right text-xs font-mono text-white/50 leading-4 select-none"
            style={{ transform: `translateY(-${scrollTop}px)` }}
          >
            {(() => {
              const lines = diffResults.reduce((acc, result) => {
                const resultLines = result.value.split('\n');
                return acc + resultLines.length - (result.value.endsWith('\n') ? 1 : 0);
              }, 0);
              const lineCount = Math.max(lines, 1);
              return Array.from({ length: lineCount }, (_, i) => (
                <div key={i + 1} className="h-4">
                  {i + 1}
                </div>
              ));
            })()}
          </div>
        </div>

        {/* Diff content */}
        <div 
          className="overflow-y-auto max-h-96 scrollbar-hidden"
          onScroll={handleScroll}
        >
          <pre className="text-xs font-mono whitespace-pre p-4 pl-16 leading-4 overflow-x-auto scrollbar-hidden">
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
  );
}