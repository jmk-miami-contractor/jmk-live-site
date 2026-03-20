export type ProjectType =
  | "kitchen"
  | "bathroom"
  | "fullHome"
  | "addition"
  | "flooring"
  | "windowsDoors"
  | "lighting"
  | "lowVoltage"
  | "roofing"
  | "hardscape"
  | "fencing"
  | "outdoorKitchen"
  | "pool"
  | "patioPergola"
  | "exteriorCladding";

export type InputMode = "quick" | "detailed";

export interface PriceRange {
  low: number;
  high: number;
}

export interface ContactInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zip: string;
}

// ── Kitchen ──────────────────────────────────────────────────────────────────
export interface KitchenAnswersQuick {
  sqftRange: "under100" | "100to150" | "150to200" | "over200";
  cabinetStyle: "stock" | "semi-custom" | "custom";
  countertopMaterial: "laminate" | "quartz" | "granite" | "marble";
  applianceLevel: "basic" | "mid" | "professional";
  layoutChange: boolean;
  islandAddition: boolean;
}
export interface KitchenAnswersDetailed {
  lowerCabinetLinFt: number;
  upperCabinetLinFt: number;
  countertopSqFt: number;
  ceilingHeight: number;
  appliancesToReplace: number;
  layoutChange: boolean;
  islandAddition: boolean;
  sinkCount: number;
  cabinetStyle: "stock" | "semi-custom" | "custom";
  countertopMaterial: "laminate" | "quartz" | "granite" | "marble";
  applianceLevel: "basic" | "mid" | "professional";
}

// ── Bathroom ─────────────────────────────────────────────────────────────────
export interface BathroomAnswersQuick {
  bathroomSize: "half" | "standard" | "master";
  tileLevel: "basic" | "mid" | "luxury";
  fixtureLevel: "builder" | "mid" | "designer";
  showerType: "tub-only" | "shower-only" | "combo" | "walk-in-custom";
  plumbingRelocation: boolean;
}
export interface BathroomAnswersDetailed {
  floorSqFt: number;
  wallTileSqFt: number;
  toilets: number;
  sinks: number;
  showers: number;
  tubs: number;
  ceilingHeight: number;
  plumbingRelocation: boolean;
  tileLevel: "basic" | "mid" | "luxury";
  fixtureLevel: "builder" | "mid" | "designer";
}

// ── Full Home ─────────────────────────────────────────────────────────────────
export interface FullHomeAnswersQuick {
  homeSqFt: number;
  bedrooms: number;
  bathrooms: number;
  scopeLevel: "cosmetic" | "mid" | "gut";
  includesHVAC: boolean;
  includesElectrical: boolean;
  includesPlumbing: boolean;
}
export interface FullHomeAnswersDetailed {
  sqFtPerFloor: number;
  floors: number;
  rooms: number;
  ceilingHeight: number;
  bathrooms: number;
  scopeLevel: "cosmetic" | "mid" | "gut";
  includesHVAC: boolean;
  includesElectrical: boolean;
  includesPlumbing: boolean;
}

// ── Addition ──────────────────────────────────────────────────────────────────
export interface AdditionAnswersQuick {
  additionType: "bedroom" | "bathroom" | "garage" | "sunroom" | "adu" | "second-story";
  sqftRange: "200" | "400" | "600" | "800plus";
  finishLevel: "standard" | "upgraded" | "premium";
  foundationType: "slab" | "crawl" | "full-basement";
}
export interface AdditionAnswersDetailed {
  sqFt: number;
  ceilingHeight: number;
  additionType: "bedroom" | "bathroom" | "garage" | "sunroom" | "adu" | "second-story";
  finishLevel: "standard" | "upgraded" | "premium";
  foundationType: "slab" | "crawl" | "full-basement";
  windowCount: number;
  doorCount: number;
}

// ── Flooring ──────────────────────────────────────────────────────────────────
export interface FlooringAnswersQuick {
  totalSqFt: number;
  material: "carpet" | "lvp" | "engineered" | "hardwood" | "tile";
  includesRemoval: boolean;
  subfloorCondition: "good" | "minor" | "major";
  stairsRange: "none" | "few" | "many";
}
export interface FlooringRoom {
  name: string;
  sqFt: number;
}
export interface FlooringAnswersDetailed {
  rooms: FlooringRoom[];
  material: "carpet" | "lvp" | "engineered" | "hardwood" | "tile";
  includesRemoval: boolean;
  subfloorCondition: "good" | "minor" | "major";
  stairCount: number;
}

// ── Windows & Doors ───────────────────────────────────────────────────────────
export interface WindowDimension {
  width: number;
  height: number;
}
export interface WindowsDoorsAnswersQuick {
  windowCount: number;
  windowType: "standard" | "impact" | "triple-pane";
  exteriorDoorCount: number;
  interiorDoorCount: number;
  doorStyle: "hollow-core" | "solid-core" | "custom";
  hasSlidingDoors: boolean;
}
export interface WindowsDoorsAnswersDetailed {
  windows: WindowDimension[];
  windowType: "standard" | "impact" | "triple-pane";
  exteriorDoorCount: number;
  interiorDoorCount: number;
  doorStyle: "hollow-core" | "solid-core" | "custom";
  baseboardLinFt: number;
  slidingDoorCount: number;
}

// ── Lighting ──────────────────────────────────────────────────────────────────
export interface LightingRoom {
  name: string;
  fixtureCount: number;
  fixtureType: "standard" | "recessed" | "pendant" | "chandelier";
}
export interface LightingAnswersQuick {
  homeSqFt: number;
  scope: "single-room" | "partial" | "whole-home";
  fixtureLevel: "standard" | "upgraded" | "designer";
  includesRecessed: boolean;
  includesOutdoor: boolean;
  panelUpgrade: boolean;
}
export interface LightingAnswersDetailed {
  rooms: LightingRoom[];
  outdoorFixtureCount: number;
  panelUpgrade: boolean;
  fixtureLevel: "standard" | "upgraded" | "designer";
}

// ── Low Voltage ───────────────────────────────────────────────────────────────
export type LowVoltageService = "smart-home" | "av" | "security" | "networking";
export interface LowVoltageAnswersQuick {
  homeSqFt: number;
  services: LowVoltageService[];
  networkingScope: "basic" | "structured" | "whole-home-wifi";
  avScope: "single-room" | "multi-room" | "whole-home";
  securityScope: "basic" | "cameras" | "full-system";
  smartHomeLevel: "basic" | "mid" | "full-automation";
}
export interface LowVoltageAnswersDetailed {
  roomCount: number;
  services: LowVoltageService[];
  networkingScope: "basic" | "structured" | "whole-home-wifi";
  cableDropCount: number;
  avScope: "single-room" | "multi-room" | "whole-home";
  securityScope: "basic" | "cameras" | "full-system";
  smartHomeLevel: "basic" | "mid" | "full-automation";
}

// ── Roofing ───────────────────────────────────────────────────────────────────
export interface RoofingAnswersQuick {
  homeSqFt: number;
  pitch: "low" | "medium" | "steep";
  material: "asphalt" | "metal" | "tile" | "flat-membrane";
  includesGutters: boolean;
  skylightCount: number;
}
export interface RoofingAnswersDetailed {
  roofSqFt: number;
  pitch: "low" | "medium" | "steep";
  material: "asphalt" | "metal" | "tile" | "flat-membrane";
  skylightCount: number;
  gutterLinFt: number;
  tearOffLayers: number;
}

// ── Outdoor Kitchen ───────────────────────────────────────────────────────────
export interface OutdoorKitchenAnswersQuick {
  size: "small" | "medium" | "large";
  applianceLevel: "basic" | "mid" | "professional";
  countertopMaterial: "concrete" | "granite" | "porcelain" | "stainless";
  isCovered: boolean;
}
export interface OutdoorKitchenAnswersDetailed {
  sqFt: number;
  coverType: "none" | "pergola" | "solid-roof";
  applianceCount: number;
  applianceLevel: "basic" | "mid" | "professional";
  countertopSqFt: number;
  countertopMaterial: "concrete" | "granite" | "porcelain" | "stainless";
  hasSink: boolean;
  hasRefrigeration: boolean;
}

// ── Pool ──────────────────────────────────────────────────────────────────────
export interface PoolAnswersQuick {
  poolSize: "plunge" | "standard" | "large";
  poolType: "concrete" | "fiberglass" | "vinyl";
  includesSpa: boolean;
  includesDecking: boolean;
}
export interface PoolAnswersDetailed {
  lengthFt: number;
  widthFt: number;
  depthFt: number;
  poolType: "concrete" | "fiberglass" | "vinyl";
  spaSqFt: number;
  deckingSqFt: number;
  deckingMaterial: "concrete" | "pavers" | "travertine";
  waterFeatureCount: number;
}

// ── Patio / Pergola ───────────────────────────────────────────────────────────
export interface PatioPergolaAnswersQuick {
  sqftRange: "under200" | "200to400" | "400to700" | "over700";
  surfaceMaterial: "concrete" | "pavers" | "travertine" | "wood-deck";
  isCovered: boolean;
  includesPergola: boolean;
  includesLighting: boolean;
}
export interface PatioPergolaAnswersDetailed {
  patioSqFt: number;
  surfaceMaterial: "concrete" | "pavers" | "travertine" | "wood-deck";
  pergolaSqFt: number;
  pergolaMaterial: "wood" | "aluminum" | "steel";
  lightingFixtureCount: number;
  includesElectrical: boolean;
}

// ── Hardscape ─────────────────────────────────────────────────────────────────
export interface HardscapeAnswersQuick {
  sqftRange: "under500" | "500to1000" | "1000to2000" | "over2000";
  material: "concrete" | "pavers" | "travertine" | "exterior-tile";
  areaType: "driveway" | "walkway" | "pool-deck" | "mixed";
}
export interface HardscapeAnswersDetailed {
  sqFt: number;
  material: "concrete" | "pavers" | "travertine" | "exterior-tile";
  areaType: "driveway" | "walkway" | "pool-deck" | "mixed";
  edgeTreatment: "none" | "soldier-course" | "banding";
  pattern: "standard" | "herringbone" | "running-bond";
}

// ── Fencing ────────────────────────────────────────────────────────────────────
export interface FencingAnswersQuick {
  linearFtRange: "under100" | "100to250" | "250to500" | "over500";
  material: "wood" | "vinyl" | "aluminum" | "chain-link" | "wrought-iron";
  gateCount: "none" | "one-two" | "three-plus";
}
export interface FencingAnswersDetailed {
  linearFt: number;
  material: "wood" | "vinyl" | "aluminum" | "chain-link" | "wrought-iron";
  pedestrianGates: number;
  vehicleGates: number;
  vehicleGateMotorized: boolean;
}

// ── Exterior Cladding ─────────────────────────────────────────────────────────
export interface ExteriorCladdingAnswersQuick {
  homeSqFt: number;
  material: "stucco" | "siding" | "stone" | "brick";
  includesTrim: boolean;
}
export interface ExteriorCladdingAnswersDetailed {
  wallSqFt: number;
  material: "stucco" | "siding" | "stone" | "brick";
  trimLinFt: number;
  windowDoorCount: number;
}

// ── Finishes ──────────────────────────────────────────────────────────────────
/**
 * Flat finishes answers per project type.
 * Quick mode key format:    `${catId}.tier`
 * Detailed mode key format: `${catId}.${questionId}`
 */
export type ProjectTypeFinishes = Partial<Record<ProjectType, Record<string, string>>>;

// ── Aggregated ────────────────────────────────────────────────────────────────
export interface QuoteAnswers {
  projectTypes: ProjectType[];
  inputMode: InputMode;
  /** Finishes & materials selections per project type */
  finishes?: ProjectTypeFinishes;
  kitchen?: KitchenAnswersQuick | KitchenAnswersDetailed;
  bathroom?: BathroomAnswersQuick | BathroomAnswersDetailed;
  fullHome?: FullHomeAnswersQuick | FullHomeAnswersDetailed;
  addition?: AdditionAnswersQuick | AdditionAnswersDetailed;
  flooring?: FlooringAnswersQuick | FlooringAnswersDetailed;
  windowsDoors?: WindowsDoorsAnswersQuick | WindowsDoorsAnswersDetailed;
  lighting?: LightingAnswersQuick | LightingAnswersDetailed;
  lowVoltage?: LowVoltageAnswersQuick | LowVoltageAnswersDetailed;
  roofing?: RoofingAnswersQuick | RoofingAnswersDetailed;
  hardscape?: HardscapeAnswersQuick | HardscapeAnswersDetailed;
  fencing?: FencingAnswersQuick | FencingAnswersDetailed;
  outdoorKitchen?: OutdoorKitchenAnswersQuick | OutdoorKitchenAnswersDetailed;
  pool?: PoolAnswersQuick | PoolAnswersDetailed;
  patioPergola?: PatioPergolaAnswersQuick | PatioPergolaAnswersDetailed;
  exteriorCladding?: ExteriorCladdingAnswersQuick | ExteriorCladdingAnswersDetailed;
  contact: ContactInfo;
}

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  kitchen: "Kitchen Remodel",
  bathroom: "Bathroom Remodel",
  fullHome: "Full Home Remodel",
  addition: "Addition / Room Build",
  flooring: "Flooring",
  windowsDoors: "Windows & Doors",
  lighting: "Lighting",
  lowVoltage: "Low Voltage",
  roofing: "Roofing",
  hardscape: "Hardscape",
  fencing: "Fencing",
  outdoorKitchen: "Outdoor Kitchen",
  pool: "Pool",
  patioPergola: "Patio / Pergola",
  exteriorCladding: "Exterior Cladding",
};
