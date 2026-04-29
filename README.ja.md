# ⚠️ このリポジトリは移行しました

> **ステータス:** Archived — コードは [cliwant/govicon-mcp-sam-gov](https://github.com/cliwant/govicon-mcp-sam-gov) に統合。

`@govicon/sam-gov` スタンドアロンライブラリは **[`@govicon/mcp-sam-gov`](https://github.com/cliwant/govicon-mcp-sam-gov) に統合**されました。すべての GovIcon federal-data 作業の正式 home:

- `SamGovClient` (このレポにあった同一クラス)
- USAspending ラッパー (5 カテゴリ 22 関数)
- Federal Register, eCFR, Grants.gov クライアント
- AI エージェント向け 36 ツール MCP サーバー
- Claude Code plugin / Skill バンドル
- Claude Desktop ワンクリック `.mcpb` 拡張

## 移行

import パスを変更するだけ:

```diff
- import { SamGovClient } from "@govicon/sam-gov";
+ import { SamGovClient } from "@govicon/mcp-sam-gov/sam-gov";
```

`SamGovClient` API は **変更なし**。すべてのメソッド / 型は同一。

## 新しい home

- [`cliwant/govicon-mcp-sam-gov`](https://github.com/cliwant/govicon-mcp-sam-gov) — PUBLIC
- [日本語 README](https://github.com/cliwant/govicon-mcp-sam-gov/blob/main/README.ja.md)

## ライセンス

MIT.
