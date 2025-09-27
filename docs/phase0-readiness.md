# Phase 0 Readiness Checklist

## Account & Access Status
- **Sanity**: project IDとリードトークンを受領済み（`.env.local`に安全に保存）。
- **Vercel**: チーム/プロジェクト作成済み。環境変数は`.env.local`と同値で準備完了。
- **GitHub**: ローカルリポジトリを`main`ブランチで初期化済み。リモートURL登録のみオーナー確認待ち。

## Environment Variable Handling
- 機密情報は`.env.local`とVercelの環境変数に格納し、リポジトリへは未コミットで管理。
- 認証情報は安全なチャネルで共有済み。漏洩時は即時ローテーションする運用体制を確認。
- フロントエンドではリードオンリートークンのみ利用し、更新系はStudio内で完結させる方針を維持。
- コード内は`TODO_`プレースホルダーを保持し、必要なキー一覧を`docs/env-reference.md`に記載済み。

## Phase 0 Completion Notes
- 主要アカウント（Sanity/Vercel/GitHub）と環境変数の準備が整ったため、Phase 1のCMSスキーマ作業へ進行可能。
- GitHubのリモートURLはオーナー側で確定次第`git remote add origin <URL>`を実行する。
- 継続して`.env*`や`.vercel`等の機密ファイルがコミット対象にならないことを定期確認する。

