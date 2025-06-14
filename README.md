# Diffio

2つのテキストの差分を視覚的に比較できるWebアプリケーション

![Diffio](https://img.shields.io/badge/Status-試験運用版-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-blue)

## 🚀 機能

### ✨ **コア機能**
- **リアルタイム差分比較**: 文字・単語・行単位での差分検出
- **行番号表示**: コードエディター風の行番号付きテキストエリア
- **ファイルアップロード**: ドラッグ&ドロップ対応（.txt, .md, .json, .csv）
- **差分ハイライト**: 追加・削除・変更箇所の視覚的表示
- **統計情報**: 変更行数・文字数の集計表示
- **エクスポート機能**: HTML・テキスト形式での結果出力

### 🎨 **デザイン**
- **ガラスモーフィズム**: 美しい半透明ガラス効果
- **ダークテーマ**: 黒と濃紺のグラデーション背景
- **レスポンシブ**: デスクトップ・ラップトップに最適化

## 🛠 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **差分計算**: diff ライブラリ
- **状態管理**: React Hooks
- **開発環境**: VS Code (濃紺テーマ設定済み)

## 📦 セットアップ

### 前提条件
- Node.js 18.0以上
- npm または yarn

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/yourusername/diffio.git
cd diffio

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて動作確認してください。

### VS Code設定

プロジェクトには `.vscode/settings.json` が含まれており、濃紺を基調としたダークテーマと推奨拡張機能が設定されています。

推奨拡張機能：
- Tailwind CSS IntelliSense
- TypeScript Hero
- Prettier
- ESLint
- Auto Rename Tag

## 🚀 ビルド・デプロイ

```bash
# プロダクションビルド
npm run build

# ビルド結果をローカルで確認
npm start

# 型チェック
npm run type-check

# リンター実行
npm run lint
```

### Vercelでのデプロイ

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/diffio)

## 📁 プロジェクト構造

```
diffio/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── page.tsx        # メインページ
│   │   └── globals.css     # グローバルスタイル
│   ├── components/         # Reactコンポーネント
│   │   ├── DiffViewer.tsx  # 差分表示コンポーネント
│   │   ├── FileUpload.tsx  # ファイルアップロード
│   │   └── TextAreaWithLineNumbers.tsx # 行番号付きテキストエリア
│   └── lib/
│       └── diff.ts         # 差分計算ロジック
├── docs/
│   └── _proposal.md        # 要件定義書
├── .vscode/                # VS Code設定
└── public/                 # 静的ファイル
```

## 🎯 使用方法

1. **テキスト入力**: 左右のテキストエリアに比較したいテキストを入力
2. **ファイルアップロード**: ドラッグ&ドロップまたはクリックでファイルを読み込み
3. **比較モード選択**: 文字単位・単語単位・行単位から選択
4. **結果確認**: リアルタイムで差分結果と統計情報を表示
5. **エクスポート**: HTMLまたはテキスト形式で結果をダウンロード

## 📊 パフォーマンス

- **応答時間**: 10,000文字以下で1秒以内の差分計算
- **ファイルサイズ**: 最大5MBまでの読み込み対応
- **メモリ使用量**: ブラウザクラッシュ回避設計

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/new-feature`)
3. 変更をコミット (`git commit -m 'Add new feature'`)
4. ブランチにプッシュ (`git push origin feature/new-feature`)
5. プルリクエストを作成

## 📄 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルを参照

## 🔄 更新履歴

### v1.0.0 (試験運用版)
- 基本的な差分比較機能
- ガラスモーフィズムデザイン
- 行番号表示
- ファイルアップロード機能
- エクスポート機能

---

**Diffio** - 美しく、高性能なテキスト差分比較ツール
