/**
 * 5-minute quickstart for @govicon/sam-gov.
 *
 * Run:
 *   npx tsx examples/quickstart.ts
 *
 * No environment variables required (keyless).
 */

import { SamGovClient } from "../src/index.js";

async function main() {
  const sam = new SamGovClient();

  // 1. Search recent opportunities by NAICS.
  console.log("=== search opportunities ===");
  const search = await sam.searchOpportunities({
    ncode: "541512",
    limit: 3,
  });
  console.log(`total: ${search.totalRecords}, returned: ${search.opportunitiesData.length}`);
  for (const o of search.opportunitiesData) {
    console.log(`  • ${o.noticeId} — ${o.title}`);
  }

  // 2. Drill into one notice.
  const top = search.opportunitiesData[0];
  if (!top) return;
  console.log("\n=== getOpportunity ===");
  const opp = await sam.getOpportunity(top.noticeId);
  if (!opp) return;
  console.log(`title:        ${opp.title}`);
  console.log(`agency:       ${opp.fullParentPathName}`);
  console.log(`solicitation: ${opp.solicitationNumber ?? "(none)"}`);
  console.log(`deadline:     ${opp.responseDeadLine ?? "(none)"}`);
  console.log(`POCs:         ${(opp.pointOfContact ?? []).length}`);
  console.log(`attachments:  ${(opp.resourceLinks ?? []).length}`);

  // 3. Pull the full description body.
  if (opp.description) {
    const text = await sam.fetchOpportunityDescription(opp.description);
    console.log(`\n=== description (${text.length} chars) ===`);
    console.log(text.slice(0, 280) + (text.length > 280 ? "…" : ""));
  }

  // 4. Embed an attachment download URL.
  if (opp.resourceLinks?.[0]) {
    console.log(`\n=== first attachment ===`);
    console.log(`download URL (303 → S3): ${opp.resourceLinks[0]}`);
  }
}

main().catch((err) => {
  console.error("FATAL:", err);
  process.exit(1);
});
