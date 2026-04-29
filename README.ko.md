# @govicon/sam-gov

> Node.js / 브라우저 / MCP 서버 / AI 에이전트용 **키 없는** SAM.gov 클라이언트.
> 미국 연방 정부 입찰 공고를 검색하고, 사업자 정보를 조회하고, 첨부 파일을 가져옵니다 — API 키 등록 불필요.

[English README](./README.md) · [日本語 README](./README.ja.md)

## 왜 이 패키지가 필요한가

SAM.gov 는 입찰 데이터를 두 가지 방식으로 제공합니다:

1. **인증 v2 API** (`api.sam.gov`) — 등록 필요, 높은 rate limit, 전체 historical archive 접근.
2. **공개 키 없는 엔드포인트** (`sam.gov/api/prod/...`) — SAM.gov 웹사이트가 직접 사용하는 엔드포인트.
   `Accept: application/hal+json` 헤더만 있으면 동작. 등록 불필요.

`@govicon/sam-gov` 는 두 layer 를 하나의 정규화된 클라이언트로 묶습니다. API 키가 있으면
인증 path 가 자동 선택되고, 없으면 공개 path 로 fallback. 호출 코드는 동일합니다.

## 설치

```bash
npm install @govicon/sam-gov
```

Node.js ≥ 20 필요 (native `fetch` + `AbortSignal.timeout`).

## 빠른 시작 (키 없음)

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

## API 키 사용 시 (rate limit 상향 + archive)

```ts
const sam = new SamGovClient({ apiKey: process.env.SAM_GOV_API_KEY });
const r = await sam.searchOpportunities({ query: "cloud", limit: 10 });
```

## 전체 설명 본문 가져오기

```ts
const opp = await sam.getOpportunity("5ef3db5daeb54099a96d487783a38bd0");
if (opp?.description) {
  const text = await sam.fetchOpportunityDescription(opp.description);
  console.log(text);
}
```

## 사용 사례

- AI 에이전트 / MCP 서버에 SAM.gov 도구를 키 없이 임베드
- 연방 계약 SaaS — 직접 SAM.gov 클라이언트를 유지하지 않아도 됨
- 입찰 분석 / 컴플라이언스 도구

## 라이선스

MIT — [LICENSE](./LICENSE).

## 면책 조항

이 클라이언트는 **공개된** SAM.gov 엔드포인트만 사용합니다. 미국 연방 조달청
(GSA), SAM.gov 또는 연방 기관과 무관합니다. SAM.gov 데이터는 public domain.
