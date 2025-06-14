'use client';

import { useRef, useState } from 'react';

interface TextAreaWithLineNumbersProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

export default function TextAreaWithLineNumbers({
  value,
  onChange,
  placeholder,
  className = ""
}: TextAreaWithLineNumbersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [copied, setCopied] = useState(false);

  const lines = value.split('\n');
  const lineCount = Math.max(lines.length, 1);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = value;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden"
      style={{ minHeight: '208px', maxHeight: '400px' }}
    >
      {/* Line numbers - positioned absolutely */}
      <div
        className="absolute left-0 top-0 w-12 bg-white/5 border-r border-white/20 h-full overflow-hidden pointer-events-none z-10"
      >
        <div 
          className="py-4 pr-2 text-right text-xs font-mono text-white/50 leading-4 select-none"
          style={{ transform: `translateY(-${scrollTop}px)` }}
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i + 1} className="h-4">
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Copy button */}
      {value && (
        <button
          onClick={handleCopy}
          className={`absolute top-3 right-3 z-20 p-2 rounded-md transition-all group ${
            copied 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white'
          }`}
          title={copied ? 'コピーしました！' : 'テキストをコピー'}
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

      {/* Textarea */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={handleScroll}
        className={`w-full h-full p-4 pl-16 bg-transparent text-white placeholder-white/60 resize-none focus:outline-none focus:ring-2 focus:ring-white/50 font-mono text-xs leading-4 scrollbar-hidden ${className}`}
        placeholder={placeholder}
        style={{ minHeight: '208px', maxHeight: '400px', whiteSpace: 'pre', overflowWrap: 'normal' }}
      />
    </div>
  );
}