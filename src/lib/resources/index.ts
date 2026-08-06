import type { ResourceCategory } from "./types";

import { aiMl } from "./data/ai-ml";
import { backend } from "./data/backend";
import { career } from "./data/career";
import { cloud } from "./data/cloud";
import { cs } from "./data/cs";
import { databases } from "./data/databases";
import { design } from "./data/design";
import { devops } from "./data/devops";
import { gameDev } from "./data/gamedev";
import { hardware } from "./data/hardware";
import { languages } from "./data/languages";
import { linux } from "./data/linux";
import { mobile } from "./data/mobile";
import { productivity } from "./data/productivity";
import { science } from "./data/science";
import { security } from "./data/security";
import { web } from "./data/web";

/**
 * The complete resources registry, ordered for display.
 *
 * Note: the Resources page does NOT import this module at runtime — it uses
 * per-category dynamic imports to keep the initial bundle small. This static
 * registry is the canonical aggregate for anything server-side (sitemaps,
 * JSON endpoints, tooling) that needs the full collection at once.
 */
export const resourceCategories: ResourceCategory[] = [
  languages,
  web,
  mobile,
  backend,
  databases,
  devops,
  cloud,
  aiMl,
  security,
  cs,
  career,
  design,
  gameDev,
  hardware,
  science,
  linux,
  productivity,
];

export * from "./types";
