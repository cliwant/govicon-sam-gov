/**
 * @govicon/sam-gov — keyless SAM.gov client.
 *
 * The published surface. Library consumers should import from this
 * file only:
 *
 *   import { SamGovClient } from "@govicon/sam-gov";
 *   const sam = new SamGovClient(); // keyless
 *   const r = await sam.searchOpportunities({ ncode: "541512", limit: 5 });
 *
 * Or with a key:
 *
 *   const sam = new SamGovClient({ apiKey: process.env.SAM_GOV_API_KEY });
 */

export { SamGovClient } from "./client.js";
export type {
  SamOpportunity,
  SamSearchFilters,
  SamSearchResult,
  SamProcurementType,
  SamSetAside,
  SamLocation,
  SamPointOfContact,
  EntitySearchResult,
  SamGovClientOptions,
} from "./types.js";
