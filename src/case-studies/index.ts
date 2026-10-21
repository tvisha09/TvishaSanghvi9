import type { ComponentType } from "react";
import EpochCase, { theme as epochTheme } from "./epoch";
import GreenlyCase, { theme as greenlyTheme } from "./greenly";
import SeaRakshaCase, { theme as seaRakshaTheme } from "./searaksha";
import SwadishtCase, { theme as swadishtTheme } from "./swadisht";
import WastonicCase, { theme as wastonicTheme } from "./wastonic";

/** Projects rebuilt as native case studies. Anything not listed shows its original plates. */
export const caseStudies: Record<string, ComponentType> = {
  searaksha: SeaRakshaCase,
  greenly: GreenlyCase,
  epoch: EpochCase,
  wastonic: WastonicCase,
  swadisht: SwadishtCase,
};

/** Per-project identity applied to the whole project page, where one exists. */
export const caseThemes: Partial<Record<string, string>> = {
  searaksha: seaRakshaTheme,
  greenly: greenlyTheme,
  epoch: epochTheme,
  wastonic: wastonicTheme,
  swadisht: swadishtTheme,
};
