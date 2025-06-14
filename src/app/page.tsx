'use client';

import { useState, useEffect } from 'react';
import { calculateDiff, calculateStats, exportToHtml, exportToText, DiffResult, DiffStats, DiffType } from '@/lib/diff';
import DiffViewer from '@/components/DiffViewer';
import FileUpload from '@/components/FileUpload';
import TextAreaWithLineNumbers from '@/components/TextAreaWithLineNumbers';

export default function Home() {
  const [leftText, setLeftText] = useState('');
  const [rightText, setRightText] = useState('');
  const [diffType, setDiffType] = useState<DiffType>('line');
  const [diffResults, setDiffResults] = useState<DiffResult[]>([]);
  const [stats, setStats] = useState<DiffStats>({ added: 0, removed: 0, changed: 0 });

  useEffect(() => {
    if (leftText || rightText) {
      const results = calculateDiff(leftText, rightText, diffType);
      setDiffResults(results);
      setStats(calculateStats(results));
    } else {
      setDiffResults([]);
      setStats({ added: 0, removed: 0, changed: 0 });
    }
  }, [leftText, rightText, diffType]);

  const handleExportHtml = () => {
    const html = exportToHtml(diffResults, 'テキスト差分比較結果');
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diff-result.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportText = () => {
    const text = exportToText(diffResults);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diff-result.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
      <div className="container mx-auto p-2">
        <header className="p-4 mb-4">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-light text-white mb-1 tracking-[0.3em] animate-fade-in-up">
              Diffio
            </h1>
            <p className="text-white/80 text-sm font-serif animate-fade-in-up animation-delay-300">
              2つのテキストの差分を視覚的に比較
            </p>
          </div>
        </header>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/30 shadow-xl p-4">
            <div className="mb-4">
              <FileUpload
                onFileContent={(content) => setLeftText(content)}
              />
            </div>
            <TextAreaWithLineNumbers
              value={leftText}
              onChange={setLeftText}
              placeholder="左側のテキストを入力してください..."
            />
          </div>

          <div className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/30 shadow-xl p-4">
            <div className="mb-4">
              <FileUpload
                onFileContent={(content) => setRightText(content)}
              />
            </div>
            <TextAreaWithLineNumbers
              value={rightText}
              onChange={setRightText}
              placeholder="右側のテキストを入力してください..."
            />
          </div>
        </div>

        <div className="backdrop-blur-lg bg-white/20 rounded-2xl border border-white/30 shadow-xl p-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white whitespace-nowrap min-w-20 mr-2.5">統計情報</h3>
            <div className="flex gap-2">
              <button 
                onClick={handleExportHtml}
                className="px-4 py-2 bg-green-500/30 hover:bg-green-500/40 rounded-lg text-white transition-colors"
              >
                HTMLエクスポート
              </button>
              <button 
                onClick={handleExportText}
                className="px-4 py-2 bg-blue-500/30 hover:bg-blue-500/40 rounded-lg text-white transition-colors"
              >
                テキストエクスポート
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 rounded-lg p-2">
              <div className="text-2xl font-bold text-green-400">{stats.added}</div>
              <div className="text-white/80">追加</div>
            </div>
            <div className="bg-white/10 rounded-lg p-2">
              <div className="text-2xl font-bold text-red-400">{stats.removed}</div>
              <div className="text-white/80">削除</div>
            </div>
            <div className="bg-white/10 rounded-lg p-2">
              <div className="text-2xl font-bold text-yellow-400">{stats.changed}</div>
              <div className="text-white/80">変更</div>
            </div>
          </div>
        </div>

        <DiffViewer 
          diffResults={diffResults} 
          diffType={diffType}
          onDiffTypeChange={setDiffType}
        />
      </div>
    </div>
  );
}
