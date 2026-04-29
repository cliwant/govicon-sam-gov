# @govicon/sam-gov

> **Keyless** SAM.gov client for Node.js, browsers, MCP servers, and AI agents.
> Search federal opportunities, look up entities, follow attachments — no API key required.

[한국어 README](./README.ko.md) · [日本語 README](./README.ja.md)

## Why this exists

SAM.gov publishes federal opportunity data through two layers:

1. The **authenticated v2 API** at `api.sam.gov` — requires registration, returns JSON,
   higher rate limits, full historical archive.
2. The **keyless public endpoints** at `sam.gov/api/prod/...` — the same data the
   SAM.gov website renders for itself, accessible with `Accept: application/hal+json`.
   No registration. Reasonable rate.

`@govicon/sam-gov` wraps both behind one normalized client. Pass an API key if you
have one (you'll get higher quota); skip it and the client uses the keyless layer
transparently. Either way, the same `searchOpportunities` / `getOpportunity` /
`fetchOpportunityDescription` API works.

## Install

```bash
npm install @govicon/sam-gov
# or
pnpm add @govicon/sam-gov
# or
bun add @govicon/sam-gov
```

Requires Node.js ≥ 20 (native `fetch` + `AbortSignal.timeout`).

### Pre-publish testing (private repo)

While this package is still in private review, you can install it directly
from the GitHub repo (the `prepare` script auto-runs `tsc` to build `dist/`):

```bash
# Requires `gh auth login` so npm can clone the private repo via HTTPS.
npm install github:seungdo-keum/govicon-sam-gov
# Or pin to a commit:
npm install github:seungdo-keum/govicon-sam-gov#main
```

Or clone and run the included quickstart against live SAM.gov:

```bash
gh repo clone seungdo-keum/govicon-sam-gov
cd govicon-sam-gov
npm install
npx tsx examples/quickstart.ts
```

## Quickstart (keyless)

```ts
import { SamGovClient } from "@govicon/sam-gov";

const sam = new SamGovClient(); // no API key — uses public endpoints

const result = await sam.searchOpportunities({
  ncode: "541512",
  limit: 5,
});

for (const o of result.opportunitiesData) {
  console.log(`${o.noticeId} — ${o.title} (${o.fullParentPathName})`);
}
```

## With an API key (higher rate limit + archives)

```ts
const sam = new SamGovClient({ apiKey: process.env.SAM_GOV_API_KEY });

// Same calls — the client picks the authenticated path automatically.
const r = await sam.searchOpportunities({ query: "cloud", limit: 10 });
```

## Get the full description body

```ts
const opp = await sam.getOpportunity("5ef3db5daeb54099a96d487783a38bd0");
if (opp?.description) {
  // Public path inlines the body directly; auth path returns a URL —
  // `fetchOpportunityDescription` handles both shapes.
  const text = await sam.fetchOpportunityDescription(opp.description);
  console.log(text);
}
```

## Embed live attachments

The client returns canonical download URLs in `opportunity.resourceLinks`. Each
URL returns a 303 redirect to a signed S3 URL — fetch with `redirect: "follow"`
and you get the file bytes. Works in iframes for inline PDF / DOCX viewers.

```ts
const opp = await sam.getOpportunity(noticeId);
for (const url of opp?.resourceLinks ?? []) {
  // url is e.g. https://sam.gov/api/prod/opps/v3/opportunities/resources/files/{resourceId}/download
  const file = await fetch(url, { redirect: "follow" });
  // ...
}
```

## API surface

```ts
class SamGovClient {
  constructor(options?: {
    apiKey?: string;
    userAgent?: string;
    fetch?: typeof fetch;
    logger?: { warn?: (msg: string, err?: unknown) => void };
  });

  searchOpportunities(filters: SamSearchFilters): Promise<SamSearchResult>;
  getOpportunity(noticeId: string): Promise<SamOpportunity | null>;
  fetchOpportunityDescription(input: string): Promise<string>;

  /** Requires an API key (no public mirror exists). */
  searchEntities(query: string): Promise<EntitySearchResult>;

  /** Build the public download URL from a resourceId. */
  publicDownloadUrl(resourceId: string): string;
}
```

Full `SamSearchFilters`, `SamOpportunity`, etc. types are exported from the
package root.

## Use cases

- **AI agents / MCP servers**: drop-in tool for "search SAM.gov" without
  forcing every user to provision their own key.
- **Federal contracting SaaS**: stop maintaining your own SAM.gov client.
  Three-tier fallback (auth → public → empty) is built in.
- **Pricing engines / proposal tools**: pull current opportunities + their
  attachments to ground RFP analysis.
- **Compliance / capture tools**: enumerate active opportunities with
  reasonable filters (NAICS, set-aside, agency, place of performance).

## Limits

- **Keyless rate**: SAM.gov throttles aggressive scraping. Be polite —
  this library doesn't auto-retry under 429. Production callers should
  wrap with their own rate limiter.
- **Historical archive**: Keyless endpoints surface only "active" notices
  (~12-month window). For older data, use an API key.
- **Entity search**: There's no public mirror; you need a SAM.gov key.

## License

MIT — see [LICENSE](./LICENSE).

## Disclaimer

This client wraps **publicly available** SAM.gov endpoints. It is not affiliated
with the General Services Administration, SAM.gov, or any federal agency.
SAM.gov data is in the public domain.
