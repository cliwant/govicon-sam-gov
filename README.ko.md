# ⚠️ 이 레포는 이전되었습니다

> **상태:** Archived — 코드는 [cliwant/mcp-sam-gov](https://github.com/cliwant/mcp-sam-gov) 로 통합.

`@govicon/sam-gov` 단독 라이브러리는 **[`@cliwant/mcp-sam-gov`](https://github.com/cliwant/mcp-sam-gov) 로 통합**되었습니다. 모든 federal-data 작업의 정식 home:

- `SamGovClient` (이 레포에 있던 동일 클래스)
- USAspending 래퍼 (5개 카테고리 22개 함수)
- Federal Register, eCFR, Grants.gov 클라이언트
- AI 에이전트용 36-도구 MCP 서버
- Claude Code plugin / Skill 번들
- Claude Desktop 원클릭 `.mcpb` 익스텐션

## 마이그레이션

import 경로만 변경:

```diff
- import { SamGovClient } from "@govicon/sam-gov";
+ import { SamGovClient } from "@cliwant/mcp-sam-gov/sam-gov";
```

`SamGovClient` API 는 **변경 없음**. 모든 메소드 / 타입 동일.

## 왜 이전했나

처음에는 단독 라이브러리 수요를 예상했지만, 실제로는 USAspending / Federal Register / eCFR / Grants 등 federal-data 전체 surface 를 같이 쓰고 싶다는 게 매번 결론. MCP 서버가 이미 이 클라이언트를 vendor 한 상태에서 (Windows npm git-dep 버그 우회) 두 레포를 동기 유지하는 비용만 들었음.

단일 레포, 단일 npm 패키지, 단일 트리링구얼 README 세트.

## 새 home

- [`cliwant/mcp-sam-gov`](https://github.com/cliwant/mcp-sam-gov) — PUBLIC
- [한국어 README](https://github.com/cliwant/mcp-sam-gov/blob/main/README.ko.md)

## 라이선스

MIT.
