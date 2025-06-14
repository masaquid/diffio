'use client';

import { useRef, useEffect, useState } from 'react';

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const lines = value.split('\n');
  const lineCount = Math.max(lines.length, 1);

  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      const newScrollTop = textareaRef.current.scrollTop;
      setScrollTop(newScrollTop);
      lineNumbersRef.current.scrollTop = newScrollTop;
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener('scroll', handleScroll);
      return () => textarea.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="relative flex bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden">
      {/* Line numbers */}
      <div
        ref={lineNumbersRef}
        className="flex-shrink-0 w-12 bg-white/5 border-r border-white/20 overflow-hidden"
        style={{ transform: `translateY(-${scrollTop}px)` }}
      >
        <div className="py-4 pr-2 text-right text-xs font-mono text-white/50 leading-5 select-none">
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i + 1} className="h-5">
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`flex-1 p-4 pl-3 bg-transparent text-white placeholder-white/60 resize-none focus:outline-none focus:ring-2 focus:ring-white/50 font-mono text-sm leading-5 ${className}`}
        placeholder={placeholder}
        style={{ minHeight: '208px' }} // h-52 equivalent
      />
    </div>
  );
}