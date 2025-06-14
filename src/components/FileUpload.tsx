'use client';

import { useCallback, useState } from 'react';

interface FileUploadProps {
  onFileContent: (content: string, filename: string) => void;
  accept?: string;
  label: string;
}

export default function FileUpload({ onFileContent, accept = '.txt,.md,.json,.csv', label }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileRead = useCallback(async (file: File) => {
    setIsLoading(true);
    try {
      const text = await file.text();
      onFileContent(text, file.name);
    } catch (error) {
      console.error('File reading error:', error);
      alert('ファイルの読み込みに失敗しました。');
    } finally {
      setIsLoading(false);
    }
  }, [onFileContent]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      handleFileRead(file);
    } else if (file) {
      alert('ファイルサイズが5MBを超えています。');
    }
  }, [handleFileRead]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileRead(file);
    }
  }, [handleFileRead]);

  return (
    <div className="relative">
      <div
        className={`border-2 border-dashed rounded-xl p-4 text-center transition-colors ${
          isDragOver
            ? 'border-white/60 bg-white/20'
            : 'border-white/30 bg-white/10 hover:bg-white/15'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isLoading}
        />
        
        {isLoading ? (
          <div className="text-white/80">
            <div className="animate-spin inline-block w-6 h-6 border-2 border-white/30 border-t-white rounded-full mb-2"></div>
            <p>読み込み中...</p>
          </div>
        ) : (
          <div className="text-white/80">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm">
              {label}にファイルをドロップまたはクリックして選択
            </p>
            <p className="text-xs text-white/60 mt-1">
              対応形式: .txt, .md, .json, .csv (最大5MB)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}