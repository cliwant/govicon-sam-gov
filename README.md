# ⚠️ This repository has moved

> **Status:** Archived — code consolidated into [cliwant/govicon-mcp-sam-gov](https://github.com/cliwant/govicon-mcp-sam-gov).

The `@govicon/sam-gov` standalone library has been **merged into**
[`@govicon/mcp-sam-gov`](https://github.com/cliwant/govicon-mcp-sam-gov),
which is now the **canonical home** for all GovIcon federal-data work:

- `SamGovClient` (the same class that lived here)
- USAspending wrappers (22 functions across 5 categories)
- Federal Register, eCFR, Grants.gov clients
- 36-tool MCP server for AI agents
- Claude Code plugin / Skill bundle
- One-click `.mcpb` Claude Desktop Extension

## Migration

Replace the old import path with the new package + subpath:

```diff
- import { SamGovClient } from "@govicon/sam-gov";
+ import { SamGovClient } from "@govicon/mcp-sam-gov/sam-gov";
```

The `SamGovClient` API is **unchanged**. All method signatures and types
are identical — this is a pure repackaging, not a breaking API change.

## Why the move

When this repo started, we expected demand for a standalone client.
Reality: every consumer also wants USAspending / Federal Register / eCFR
/ Grants — i.e. the full federal-data surface. Maintaining two repos
with overlapping code (the MCP server already vendored this client to
work around npm's Windows git-dep bug) doubled the maintenance cost
without serving any real consumer.

Single repo, single npm package, single set of trilingual READMEs.

## See also

- [`cliwant/govicon-mcp-sam-gov`](https://github.com/cliwant/govicon-mcp-sam-gov) — the new home (PUBLIC)
- [README in English](https://github.com/cliwant/govicon-mcp-sam-gov/blob/main/README.md)
- [한국어 README](https://github.com/cliwant/govicon-mcp-sam-gov/blob/main/README.ko.md)
- [日本語 README](https://github.com/cliwant/govicon-mcp-sam-gov/blob/main/README.ja.md)

## License

MIT — same as before.
