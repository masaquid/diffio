import * as Diff from 'diff';

export type DiffType = 'char' | 'word' | 'line';

export interface DiffResult {
  added: boolean;
  removed: boolean;
  value: string;
  count?: number;
}

export interface DiffStats {
  added: number;
  removed: number;
  changed: number;
}

export function calculateDiff(
  oldText: string, 
  newText: string, 
  type: DiffType
): DiffResult[] {
  let diffResults: Diff.Change[];

  switch (type) {
    case 'char':
      diffResults = Diff.diffChars(oldText, newText);
      break;
    case 'word':
      diffResults = Diff.diffWords(oldText, newText);
      break;
    case 'line':
      diffResults = Diff.diffLines(oldText, newText);
      break;
    default:
      diffResults = Diff.diffLines(oldText, newText);
  }

  return diffResults.map((change): DiffResult => ({
    added: change.added || false,
    removed: change.removed || false,
    value: change.value,
    count: change.count
  }));
}

export function calculateStats(diffResults: DiffResult[]): DiffStats {
  const stats: DiffStats = {
    added: 0,
    removed: 0,
    changed: 0
  };

  diffResults.forEach((result) => {
    if (result.added) {
      stats.added += result.count || result.value.length;
    } else if (result.removed) {
      stats.removed += result.count || result.value.length;
    }
  });

  stats.changed = Math.min(stats.added, stats.removed);

  return stats;
}

export function exportToHtml(
  diffResults: DiffResult[], 
  title: string = 'Text Diff'
): string {
  const htmlContent = diffResults
    .map((result) => {
      if (result.added) {
        return `<span class="diff-added" style="background-color: #d4edda; color: #155724;">${escapeHtml(result.value)}</span>`;
      } else if (result.removed) {
        return `<span class="diff-removed" style="background-color: #f8d7da; color: #721c24;">${escapeHtml(result.value)}</span>`;
      } else {
        return escapeHtml(result.value);
      }
    })
    .join('');

  return `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body { font-family: monospace; white-space: pre-wrap; }
        .diff-added { background-color: #d4edda; color: #155724; }
        .diff-removed { background-color: #f8d7da; color: #721c24; }
    </style>
</head>
<body>
    <h1>${title}</h1>
    <div>${htmlContent}</div>
</body>
</html>
  `.trim();
}

export function exportToText(diffResults: DiffResult[]): string {
  return diffResults
    .map((result) => {
      if (result.added) {
        return `+${result.value}`;
      } else if (result.removed) {
        return `-${result.value}`;
      } else {
        return ` ${result.value}`;
      }
    })
    .join('');
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}