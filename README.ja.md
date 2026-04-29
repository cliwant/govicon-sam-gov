# @govicon/sam-gov

> Node.js / ブラウザ / MCP サーバー / AI エージェント向け **APIキー不要** の SAM.gov クライアント。
> 米国連邦政府の調達案件を検索し、事業者情報を照会し、添付ファイルを取得 — APIキー登録不要。

[English README](./README.md) · [한국어 README](./README.ko.md)

## このパッケージの目的

SAM.gov は調達案件データを2層で提供しています：

1. **認証付き v2 API** (`api.sam.gov`) — 登録必須、高いレート制限、過去アーカイブ完全アクセス。
2. **公開キーレスエンドポイント** (`sam.gov/api/prod/...`) — SAM.gov ウェブサイト自身が
   使っているエンドポイント。`Accept: application/hal+json` ヘッダーで動作。登録不要。

`@govicon/sam-gov` は両層を1つの正規化されたクライアントにまとめます。APIキーがあれば
認証パスが自動選択され、なければ公開パスへフォールバック。呼び出しコードは同一です。

## インストール

```bash
npm install @govicon/sam-gov
```

Node.js ≥ 20 が必要（ネイティブ `fetch` + `AbortSignal.timeout`）。

## クイックスタート（キーなし）

```ts
import { SamGovClient } from "@govicon/sam-gov";

const sam = new SamGovClient();

const result = await sam.searchOpportunities({
  ncode: "541512", // NAICS code
  limit: 5,
});

for (const o of result.opportunitiesData) {
  console.log(`${o.noticeId} — ${o.title}`);
}
```

## APIキー使用時（レート制限緩和 + アーカイブ）

```ts
const sam = new SamGovClient({ apiKey: process.env.SAM_GOV_API_KEY });
const r = await sam.searchOpportunities({ query: "cloud", limit: 10 });
```

## 完全な説明本文の取得

```ts
const opp = await sam.getOpportunity("5ef3db5daeb54099a96d487783a38bd0");
if (opp?.description) {
  const text = await sam.fetchOpportunityDescription(opp.description);
  console.log(text);
}
```

## ユースケース

- AI エージェント / MCP サーバーに SAM.gov ツールをキーなしで組み込む
- 連邦調達 SaaS — 自前の SAM.gov クライアントを保守不要
- 調達分析 / コンプライアンス ツール

## ライセンス

MIT — [LICENSE](./LICENSE).

## 免責事項

このクライアントは **公開されている** SAM.gov エンドポイントのみを使用します。米国連邦
調達局（GSA）、SAM.gov、または連邦機関とは無関係です。SAM.gov データはパブリックドメインです。
