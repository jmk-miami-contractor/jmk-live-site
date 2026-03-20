import type {
  ProjectType,
  InputMode,
  PriceRange,
  QuoteAnswers,
  KitchenAnswersQuick,
  KitchenAnswersDetailed,
  BathroomAnswersQuick,
  BathroomAnswersDetailed,
  FullHomeAnswersQuick,
  FullHomeAnswersDetailed,
  AdditionAnswersQuick,
  AdditionAnswersDetailed,
  FlooringAnswersQuick,
  FlooringAnswersDetailed,
  WindowsDoorsAnswersQuick,
  WindowsDoorsAnswersDetailed,
  LightingAnswersQuick,
  LightingAnswersDetailed,
  LowVoltageAnswersQuick,
  LowVoltageAnswersDetailed,
  RoofingAnswersQuick,
  RoofingAnswersDetailed,
  HardscapeAnswersQuick,
  HardscapeAnswersDetailed,
  FencingAnswersQuick,
  FencingAnswersDetailed,
  OutdoorKitchenAnswersQuick,
  OutdoorKitchenAnswersDetailed,
  PoolAnswersQuick,
  PoolAnswersDetailed,
  PatioPergolaAnswersQuick,
  PatioPergolaAnswersDetailed,
  ExteriorCladdingAnswersQuick,
  ExteriorCladdingAnswersDetailed,
} from "./quoteTypes";
import { FINISHES_CONFIG, isFinishQuestionVisible } from "./finishesConfig";
import { PRICING_CONFIG as C } from "./pricingConfig";

function clamp(range: PriceRange, floor: number, ceiling: number): PriceRange {
  return {
    low:  Math.max(floor, Math.min(ceiling, Math.round(range.low  / 500) * 500)),
    high: Math.max(floor, Math.min(ceiling, Math.round(range.high / 500) * 500)),
  };
}

// ── Kitchen ───────────────────────────────────────────────────────────────────
function kitchenQuick(a: KitchenAnswersQuick): PriceRange {
  const sqft        = C.kitchen.sqftMap[a.sqftRange];
  const cabinetBase = C.kitchen.cabinetPsf[a.cabinetStyle];
  const ctAdd       = C.kitchen.countertopAddQuick[a.countertopMaterial];
  const appAdd      = C.kitchen.applianceAdd[a.applianceLevel];
  const extras      = ctAdd + appAdd
    + (a.layoutChange    ? C.kitchen.layoutChangeAdd : 0)
    + (a.islandAddition  ? C.kitchen.islandAdd       : 0);
  return clamp(
    { low: cabinetBase[0] * sqft + extras, high: cabinetBase[1] * sqft + extras * 1.25 },
    C.kitchen.min, C.kitchen.max,
  );
}

function kitchenDetailed(a: KitchenAnswersDetailed): PriceRange {
  const cpLf       = C.kitchen.cabinetPricePerLf[a.cabinetStyle];
  const totalLinFt = a.lowerCabinetLinFt + a.upperCabinetLinFt;
  const ctPsf      = C.kitchen.countertopPsf[a.countertopMaterial];
  const appAdd     = C.kitchen.applianceAdd[a.applianceLevel] * a.appliancesToReplace;
  const extras     = (a.layoutChange   ? C.kitchen.layoutChangeAdd : 0)
                   + (a.islandAddition ? C.kitchen.islandAdd       : 0)
                   + a.sinkCount * C.kitchen.sinkCost;
  return clamp({
    low:  totalLinFt * cpLf[0]  + a.countertopSqFt * ctPsf[0] + appAdd       + extras + C.kitchen.laborBase[0],
    high: totalLinFt * cpLf[1]  + a.countertopSqFt * ctPsf[1] + appAdd * 1.3 + extras + C.kitchen.laborBase[1],
  }, C.kitchen.min, C.kitchen.max);
}

// ── Bathroom ──────────────────────────────────────────────────────────────────
function bathroomQuick(a: BathroomAnswersQuick): PriceRange {
  const base       = C.bathroom.sizeBase[a.bathroomSize];
  const tileMult   = C.bathroom.tileMult[a.tileLevel];
  const fixtureAdd = C.bathroom.fixtureAdd[a.fixtureLevel];
  const showerAdd  = C.bathroom.showerAddQuick[a.showerType] ?? 0;
  const plumbAdd   = a.plumbingRelocation ? C.bathroom.plumbingAdd : 0;
  return clamp({
    low:  base * tileMult[0] + fixtureAdd + showerAdd + plumbAdd,
    high: base * tileMult[1] + fixtureAdd + showerAdd + plumbAdd * C.bathroom.plumbingMult,
  }, C.bathroom.min, C.bathroom.max);
}

function bathroomDetailed(a: BathroomAnswersDetailed): PriceRange {
  const tPsf       = C.bathroom.tilePsf[a.tileLevel];
  const tileCost   = (a.floorSqFt + a.wallTileSqFt) * tPsf[0];
  const tileCostH  = (a.floorSqFt + a.wallTileSqFt) * tPsf[1];
  const fixAdd     = C.bathroom.fixtureAdd[a.fixtureLevel];
  const fixtures   = a.toilets  * C.bathroom.fixtureCosts.toilets
                   + a.sinks    * C.bathroom.fixtureCosts.sinks
                   + a.showers  * C.bathroom.fixtureCosts.showers
                   + a.tubs     * C.bathroom.fixtureCosts.tubs;
  const plumbing   = a.plumbingRelocation ? C.bathroom.plumbingAdd : 0;
  const labor      = C.bathroom.laborBase + a.floorSqFt * C.bathroom.laborPsf;
  return clamp({
    low:  tileCost  + fixAdd       + fixtures       + plumbing + labor,
    high: tileCostH + fixAdd * 1.3 + fixtures * 1.2 + plumbing + labor * 1.3,
  }, C.bathroom.min, C.bathroom.max);
}

// ── Full Home ──────────────────────────────────────────────────────────────────
function fullHomeQuick(a: FullHomeAnswersQuick): PriceRange {
  const basePsf  = C.fullHome.basePsf[a.scopeLevel];
  const addons   = C.fullHome.kitchenPremium
                 + a.bathrooms * C.fullHome.bathPremiumPerBath
                 + (a.includesHVAC       ? C.fullHome.hvacAdd       : 0)
                 + (a.includesElectrical ? C.fullHome.electricalAdd  : 0)
                 + (a.includesPlumbing   ? C.fullHome.plumbingAdd    : 0);
  return clamp(
    { low: a.homeSqFt * basePsf[0] + addons, high: a.homeSqFt * basePsf[1] + addons },
    C.fullHome.min, C.fullHome.max,
  );
}

function fullHomeDetailed(a: FullHomeAnswersDetailed): PriceRange {
  const totalSqFt = a.sqFtPerFloor * a.floors;
  const basePsf   = C.fullHome.basePsf[a.scopeLevel];
  const addons    = a.bathrooms * C.fullHome.bathPremiumPerBath
                  + (a.includesHVAC       ? C.fullHome.hvacAdd      : 0)
                  + (a.includesElectrical ? C.fullHome.electricalAdd : 0)
                  + (a.includesPlumbing   ? C.fullHome.plumbingAdd   : 0);
  return clamp(
    { low: totalSqFt * basePsf[0] + addons, high: totalSqFt * basePsf[1] + addons },
    C.fullHome.min, C.fullHome.max,
  );
}

// ── Addition ───────────────────────────────────────────────────────────────────
function additionQuick(a: AdditionAnswersQuick): PriceRange {
  const sqft        = C.addition.sqftMap[a.sqftRange];
  const base        = C.addition.basePsf[a.additionType];
  const finMult     = C.addition.finishMult[a.finishLevel];
  const foundAdd    = C.addition.foundationAdd[a.foundationType];
  return clamp({
    low:  sqft * base[0] * finMult[0] + foundAdd + C.addition.laborBase,
    high: sqft * base[1] * finMult[1] + foundAdd + C.addition.laborBase,
  }, C.addition.min, C.addition.max);
}

function additionDetailed(a: AdditionAnswersDetailed): PriceRange {
  const base     = C.addition.basePsf[a.additionType];
  const finMult  = C.addition.finishMult[a.finishLevel];
  const foundAdd = C.addition.foundationAdd[a.foundationType];
  const winAdd   = a.windowCount * C.addition.windowCost;
  const doorAdd  = a.doorCount   * C.addition.doorCost;
  return clamp({
    low:  a.sqFt * base[0] * finMult[0] + foundAdd + C.addition.laborBase + winAdd             + doorAdd,
    high: a.sqFt * base[1] * finMult[1] + foundAdd + C.addition.laborBase + winAdd  * C.addition.openingMult + doorAdd * C.addition.openingMult,
  }, C.addition.min, C.addition.max);
}

// ── Flooring ───────────────────────────────────────────────────────────────────
function flooringCalc(sqFt: number, stairCount: number, a: FlooringAnswersQuick | FlooringAnswersDetailed): PriceRange {
  const matPsf      = C.flooring.matPsf[a.material];
  const removalAdd  = a.includesRemoval ? sqFt * C.flooring.removalPsf : 0;
  const subfloorAdd = C.flooring.subfloorAdd[a.subfloorCondition];
  return clamp({
    low:  sqFt * matPsf[0] + removalAdd + subfloorAdd + stairCount * C.flooring.stairCost.low,
    high: sqFt * matPsf[1] + removalAdd + subfloorAdd + stairCount * C.flooring.stairCost.high,
  }, C.flooring.min, C.flooring.max);
}

function flooringQuick(a: FlooringAnswersQuick): PriceRange {
  return flooringCalc(a.totalSqFt, C.flooring.stairMap[a.stairsRange], a);
}

function flooringDetailed(a: FlooringAnswersDetailed): PriceRange {
  const totalSqFt = a.rooms.reduce((s, r) => s + r.sqFt, 0);
  return flooringCalc(totalSqFt, a.stairCount, a);
}

// ── Windows & Doors ────────────────────────────────────────────────────────────
function windowsDoorsQuick(a: WindowsDoorsAnswersQuick): PriceRange {
  const winCost   = C.windowsDoors.winCost[a.windowType];
  const extD      = C.windowsDoors.extDoorCost;
  const intD      = C.windowsDoors.intDoorCost[a.doorStyle];
  const slidAdd   = a.hasSlidingDoors ? C.windowsDoors.slidingAddQuick : ([0, 0] as [number, number]);
  return clamp({
    low:  a.windowCount * winCost[0] + a.exteriorDoorCount * extD[0] + a.interiorDoorCount * intD[0] + slidAdd[0],
    high: a.windowCount * winCost[1] + a.exteriorDoorCount * extD[1] + a.interiorDoorCount * intD[1] + slidAdd[1],
  }, C.windowsDoors.min, C.windowsDoors.max);
}

function windowsDoorsDetailed(a: WindowsDoorsAnswersDetailed): PriceRange {
  const winCost     = C.windowsDoors.winCost[a.windowType];
  const extD        = C.windowsDoors.extDoorCost;
  const intD        = C.windowsDoors.intDoorCost[a.doorStyle];
  const baseboardAdd = a.baseboardLinFt * C.windowsDoors.baseboardPsf;
  const slidingAdd   = a.slidingDoorCount * C.windowsDoors.slidingDoorCostDetailed;
  return clamp({
    low:  a.windows.length * winCost[0] + a.exteriorDoorCount * extD[0] + a.interiorDoorCount * intD[0] + baseboardAdd              + slidingAdd,
    high: a.windows.length * winCost[1] + a.exteriorDoorCount * extD[1] + a.interiorDoorCount * intD[1] + baseboardAdd * C.windowsDoors.baseboardMult + slidingAdd * C.windowsDoors.slidingMult,
  }, C.windowsDoors.min, C.windowsDoors.max);
}

// ── Lighting ───────────────────────────────────────────────────────────────────
function lightingQuick(a: LightingAnswersQuick): PriceRange {
  let scopeBase: [number, number];
  if (a.scope === "whole-home") {
    scopeBase = [
      C.lighting.wholeHomeBase + a.homeSqFt * C.lighting.wholeHomePsfLow,
      C.lighting.wholeHomeBase + a.homeSqFt * C.lighting.wholeHomePsfHigh,
    ];
  } else {
    scopeBase = C.lighting.scopeBaseFixed[a.scope] as [number, number];
  }
  const fixMult    = C.lighting.fixMult[a.fixtureLevel];
  const recAdd     = a.includesRecessed ? C.lighting.recessedAdd   : ([0, 0] as [number, number]);
  const outAdd     = a.includesOutdoor  ? C.lighting.outdoorAdd    : ([0, 0] as [number, number]);
  const panAdd     = a.panelUpgrade     ? C.lighting.panelAdd      : ([0, 0] as [number, number]);
  return clamp({
    low:  scopeBase[0] * fixMult[0] + recAdd[0] + outAdd[0] + panAdd[0],
    high: scopeBase[1] * fixMult[1] + recAdd[1] + outAdd[1] + panAdd[1],
  }, C.lighting.min, C.lighting.max);
}

function lightingDetailed(a: LightingAnswersDetailed): PriceRange {
  const fixCost      = C.lighting.fixCostPer[a.fixtureLevel];
  const totalFixtures = a.rooms.reduce((s, r) => s + r.fixtureCount, 0) + a.outdoorFixtureCount;
  const labor        = a.rooms.length * C.lighting.laborPerRoom;
  const panAdd       = a.panelUpgrade ? C.lighting.panelAdd : ([0, 0] as [number, number]);
  return clamp({
    low:  totalFixtures * fixCost[0] + labor + panAdd[0],
    high: totalFixtures * fixCost[1] + labor + panAdd[1],
  }, C.lighting.min, C.lighting.max);
}

// ── Low Voltage ────────────────────────────────────────────────────────────────
function lowVoltageCalc(
  services: string[],
  networkingScope: string,
  avScope: string,
  securityScope: string,
  smartHomeLevel: string,
): PriceRange {
  let low = 0, high = 0;
  if (services.includes("networking")) {
    const [l, h] = C.lowVoltage.networkingScope[networkingScope] ?? [0, 0];
    low += l; high += h;
  }
  if (services.includes("av")) {
    const [l, h] = C.lowVoltage.avScope[avScope] ?? [0, 0];
    low += l; high += h;
  }
  if (services.includes("security")) {
    const [l, h] = C.lowVoltage.securityScope[securityScope] ?? [0, 0];
    low += l; high += h;
  }
  if (services.includes("smart-home")) {
    const [l, h] = C.lowVoltage.smartHomeLevel[smartHomeLevel] ?? [0, 0];
    low += l; high += h;
  }
  return clamp({ low, high }, C.lowVoltage.min, C.lowVoltage.max);
}

function lowVoltageQuick(a: LowVoltageAnswersQuick): PriceRange {
  return lowVoltageCalc(a.services, a.networkingScope, a.avScope, a.securityScope, a.smartHomeLevel);
}

function lowVoltageDetailed(a: LowVoltageAnswersDetailed): PriceRange {
  const base     = lowVoltageCalc(a.services, a.networkingScope, a.avScope, a.securityScope, a.smartHomeLevel);
  const cableAdd = a.cableDropCount * C.lowVoltage.cableDropCost;
  return clamp({
    low:  base.low  + cableAdd,
    high: base.high + cableAdd * C.lowVoltage.cableDropMult,
  }, C.lowVoltage.min, C.lowVoltage.max);
}

// ── Roofing ────────────────────────────────────────────────────────────────────
function roofingQuick(a: RoofingAnswersQuick): PriceRange {
  const roofSqFt   = a.homeSqFt * C.roofing.roofAreaMultiplier;
  const matPsf     = C.roofing.matPsf[a.material];
  const pitchMult  = C.roofing.pitchMult[a.pitch];
  const gutterAdd  = a.includesGutters ? C.roofing.gutterAddQuick : 0;
  const skylightAdd = a.skylightCount * C.roofing.skylightCost;
  return clamp({
    low:  roofSqFt * matPsf[0] * pitchMult[0] + gutterAdd + skylightAdd,
    high: roofSqFt * matPsf[1] * pitchMult[1] + gutterAdd + skylightAdd,
  }, C.roofing.min, C.roofing.max);
}

function roofingDetailed(a: RoofingAnswersDetailed): PriceRange {
  const matPsf     = C.roofing.matPsf[a.material];
  const pitchMult  = C.roofing.pitchMult[a.pitch];
  const tearOffAdd = (a.tearOffLayers - 1) * a.roofSqFt * C.roofing.tearOffPsf;
  const gutterAdd  = a.gutterLinFt * C.roofing.gutterLinFtCost;
  const skylightAdd = a.skylightCount * C.roofing.skylightCost;
  return clamp({
    low:  a.roofSqFt * matPsf[0] * pitchMult[0] + tearOffAdd + gutterAdd              + skylightAdd,
    high: a.roofSqFt * matPsf[1] * pitchMult[1] + tearOffAdd + gutterAdd * C.roofing.gutterMult + skylightAdd,
  }, C.roofing.min, C.roofing.max);
}

// ── Outdoor Kitchen ────────────────────────────────────────────────────────────
function outdoorKitchenQuick(a: OutdoorKitchenAnswersQuick): PriceRange {
  const baseMap    = C.outdoorKitchen.baseMap[a.size];
  const appMult    = C.outdoorKitchen.applianceMult[a.applianceLevel];
  const coverAdd   = a.isCovered ? C.outdoorKitchen.coverAddQuick : ([0, 0] as [number, number]);
  return clamp({
    low:  baseMap[0] * appMult[0] + coverAdd[0],
    high: baseMap[1] * appMult[1] + coverAdd[1],
  }, C.outdoorKitchen.min, C.outdoorKitchen.max);
}

function outdoorKitchenDetailed(a: OutdoorKitchenAnswersDetailed): PriceRange {
  const bPsf       = C.outdoorKitchen.baseCostPerSqFt;
  const ctPsf      = C.outdoorKitchen.ctPsf[a.countertopMaterial];
  const appCost    = C.outdoorKitchen.applianceCostDetailed[a.applianceLevel] * a.applianceCount;
  const coverAdd   = C.outdoorKitchen.coverTypeAdd[a.coverType];
  const sinkAdd    = a.hasSink          ? C.outdoorKitchen.sinkAdd  : 0;
  const fridgeAdd  = a.hasRefrigeration ? C.outdoorKitchen.fridgeAdd : 0;
  return clamp({
    low:  a.sqFt * bPsf[0] + a.countertopSqFt * ctPsf[0] + appCost                            + coverAdd + sinkAdd + fridgeAdd,
    high: a.sqFt * bPsf[1] + a.countertopSqFt * ctPsf[1] + appCost * C.outdoorKitchen.applianceMult2 + coverAdd + sinkAdd + fridgeAdd,
  }, C.outdoorKitchen.min, C.outdoorKitchen.max);
}

// ── Pool ───────────────────────────────────────────────────────────────────────
function poolQuick(a: PoolAnswersQuick): PriceRange {
  const sizeCost  = C.pool.sizeCost[a.poolSize];
  const typeMult  = C.pool.typeMult[a.poolType];
  const spaAdd    = a.includesSpa     ? C.pool.spaAddQuick  : ([0, 0] as [number, number]);
  const deckAdd   = a.includesDecking ? C.pool.deckAddQuick : ([0, 0] as [number, number]);
  return clamp({
    low:  sizeCost[0] * typeMult[0] + spaAdd[0] + deckAdd[0],
    high: sizeCost[1] * typeMult[1] + spaAdd[1] + deckAdd[1],
  }, C.pool.min, C.pool.max);
}

function poolDetailed(a: PoolAnswersDetailed): PriceRange {
  const volume     = a.lengthFt * a.widthFt * a.depthFt;
  const bCuFt      = C.pool.baseCostPerCuFt[a.poolType];
  const dPsf       = C.pool.deckPsf[a.deckingMaterial];
  const spaAdd     = a.spaSqFt           * C.pool.spaCostPerSqFt;
  const waterAdd   = a.waterFeatureCount * C.pool.waterFeatureCost;
  return clamp({
    low:  volume * bCuFt[0] + a.deckingSqFt * dPsf[0] + spaAdd              + waterAdd,
    high: volume * bCuFt[1] + a.deckingSqFt * dPsf[1] + spaAdd * C.pool.spaMult + waterAdd * C.pool.waterMult,
  }, C.pool.min, C.pool.max);
}

// ── Patio / Pergola ────────────────────────────────────────────────────────────
function patioPergolaQuick(a: PatioPergolaAnswersQuick): PriceRange {
  const sqft       = C.patioPergola.sqftMap[a.sqftRange];
  const surfPsf    = C.patioPergola.surfPsf[a.surfaceMaterial];
  const coverAdd   = a.isCovered        ? C.patioPergola.coverAddQuick   : ([0, 0] as [number, number]);
  const pergAdd    = a.includesPergola   ? C.patioPergola.pergolaAddQuick : ([0, 0] as [number, number]);
  const lightAdd   = a.includesLighting  ? C.patioPergola.lightAddQuick  : ([0, 0] as [number, number]);
  return clamp({
    low:  sqft * surfPsf[0] + coverAdd[0] + pergAdd[0] + lightAdd[0],
    high: sqft * surfPsf[1] + coverAdd[1] + pergAdd[1] + lightAdd[1],
  }, C.patioPergola.min, C.patioPergola.max);
}

function patioPergolaDetailed(a: PatioPergolaAnswersDetailed): PriceRange {
  const surfPsf    = C.patioPergola.surfPsf[a.surfaceMaterial];
  const pergPsf    = C.patioPergola.pergolaPsf[a.pergolaMaterial];
  const lightCost  = a.lightingFixtureCount * C.patioPergola.lightFixtureCost;
  const elecAdd    = a.includesElectrical ? C.patioPergola.electricalAdd : 0;
  return clamp({
    low:  a.patioSqFt * surfPsf[0] + a.pergolaSqFt * pergPsf[0] + lightCost              + elecAdd,
    high: a.patioSqFt * surfPsf[1] + a.pergolaSqFt * pergPsf[1] + lightCost * C.patioPergola.lightMult + elecAdd,
  }, C.patioPergola.min, C.patioPergola.max);
}

// ── Exterior Cladding ──────────────────────────────────────────────────────────
function exteriorCladdingQuick(a: ExteriorCladdingAnswersQuick): PriceRange {
  const wallSqFt  = a.homeSqFt * C.exteriorCladding.wallAreaMultiplier;
  const matPsf    = C.exteriorCladding.matPsf[a.material];
  const trimAdd   = a.includesTrim ? C.exteriorCladding.trimAddQuick : ([0, 0] as [number, number]);
  return clamp({
    low:  wallSqFt * matPsf[0] + trimAdd[0],
    high: wallSqFt * matPsf[1] + trimAdd[1],
  }, C.exteriorCladding.min, C.exteriorCladding.max);
}

function exteriorCladdingDetailed(a: ExteriorCladdingAnswersDetailed): PriceRange {
  const matPsf    = C.exteriorCladding.matPsf[a.material];
  const trimCost  = a.trimLinFt       * C.exteriorCladding.trimLinFtCost;
  const cutoutAdd = a.windowDoorCount * C.exteriorCladding.cutoutAdd;
  return clamp({
    low:  a.wallSqFt * matPsf[0] + trimCost              + cutoutAdd,
    high: a.wallSqFt * matPsf[1] + trimCost * C.exteriorCladding.trimMult + cutoutAdd,
  }, C.exteriorCladding.min, C.exteriorCladding.max);
}

// ── Hardscape ─────────────────────────────────────────────────────────────────
function hardscapeQuick(a: HardscapeAnswersQuick): PriceRange {
  const sqft      = C.hardscape.sqftMap[a.sqftRange];
  const matPsf    = C.hardscape.matPsf[a.material];
  const areaMult  = C.hardscape.areaTypeMult[a.areaType];
  return clamp({
    low:  sqft * matPsf[0] * areaMult[0],
    high: sqft * matPsf[1] * areaMult[1],
  }, C.hardscape.min, C.hardscape.max);
}

function hardscapeDetailed(a: HardscapeAnswersDetailed): PriceRange {
  const matPsf   = C.hardscape.matPsf[a.material];
  const areaMult = C.hardscape.areaTypeMult[a.areaType];
  const edgeAdd  = C.hardscape.edgeTreatmentAdd[a.edgeTreatment];
  return clamp({
    low:  a.sqFt * matPsf[0] * areaMult[0] + edgeAdd,
    high: a.sqFt * matPsf[1] * areaMult[1] + edgeAdd,
  }, C.hardscape.min, C.hardscape.max);
}

// ── Fencing ────────────────────────────────────────────────────────────────────
function fencingQuick(a: FencingAnswersQuick): PriceRange {
  const lf      = C.fencing.linearFtMap[a.linearFtRange];
  const matLf   = C.fencing.matPriceLf[a.material];
  const gateEst = C.fencing.gateCountMap[a.gateCount];
  const gateAvg = (C.fencing.pedestrianGateCost[0] + C.fencing.pedestrianGateCost[1]) / 2;
  const gateAdd = gateEst * gateAvg;
  return clamp({
    low:  lf * matLf[0] + gateAdd * 0.8,
    high: lf * matLf[1] + gateAdd * 1.2,
  }, C.fencing.min, C.fencing.max);
}

function fencingDetailed(a: FencingAnswersDetailed): PriceRange {
  const matLf   = C.fencing.matPriceLf[a.material];
  const pgLow   = a.pedestrianGates * C.fencing.pedestrianGateCost[0];
  const pgHigh  = a.pedestrianGates * C.fencing.pedestrianGateCost[1];
  const vgLow   = a.vehicleGates    * C.fencing.vehicleGateCost[0];
  const vgHigh  = a.vehicleGates    * C.fencing.vehicleGateCost[1];
  const motLow  = a.vehicleGateMotorized ? a.vehicleGates * C.fencing.vehicleMotorAdd[0] : 0;
  const motHigh = a.vehicleGateMotorized ? a.vehicleGates * C.fencing.vehicleMotorAdd[1] : 0;
  return clamp({
    low:  a.linearFt * matLf[0] + pgLow  + vgLow  + motLow,
    high: a.linearFt * matLf[1] + pgHigh + vgHigh + motHigh,
  }, C.fencing.min, C.fencing.max);
}

// ── Public API ─────────────────────────────────────────────────────────────────
export function calculateProjectEstimate(
  type: ProjectType,
  answers: QuoteAnswers,
  mode: InputMode,
): PriceRange {
  if (mode === "quick") {
    switch (type) {
      case "kitchen":          return kitchenQuick(answers.kitchen              as KitchenAnswersQuick);
      case "bathroom":         return bathroomQuick(answers.bathroom            as BathroomAnswersQuick);
      case "fullHome":         return fullHomeQuick(answers.fullHome            as FullHomeAnswersQuick);
      case "addition":         return additionQuick(answers.addition            as AdditionAnswersQuick);
      case "flooring":         return flooringQuick(answers.flooring            as FlooringAnswersQuick);
      case "windowsDoors":     return windowsDoorsQuick(answers.windowsDoors    as WindowsDoorsAnswersQuick);
      case "lighting":         return lightingQuick(answers.lighting            as LightingAnswersQuick);
      case "lowVoltage":       return lowVoltageQuick(answers.lowVoltage        as LowVoltageAnswersQuick);
      case "roofing":          return roofingQuick(answers.roofing              as RoofingAnswersQuick);
      case "hardscape":        return hardscapeQuick(answers.hardscape          as HardscapeAnswersQuick);
      case "fencing":          return fencingQuick(answers.fencing              as FencingAnswersQuick);
      case "outdoorKitchen":   return outdoorKitchenQuick(answers.outdoorKitchen as OutdoorKitchenAnswersQuick);
      case "pool":             return poolQuick(answers.pool                    as PoolAnswersQuick);
      case "patioPergola":     return patioPergolaQuick(answers.patioPergola    as PatioPergolaAnswersQuick);
      case "exteriorCladding": return exteriorCladdingQuick(answers.exteriorCladding as ExteriorCladdingAnswersQuick);
    }
  } else {
    switch (type) {
      case "kitchen":          return kitchenDetailed(answers.kitchen              as KitchenAnswersDetailed);
      case "bathroom":         return bathroomDetailed(answers.bathroom            as BathroomAnswersDetailed);
      case "fullHome":         return fullHomeDetailed(answers.fullHome            as FullHomeAnswersDetailed);
      case "addition":         return additionDetailed(answers.addition            as AdditionAnswersDetailed);
      case "flooring":         return flooringDetailed(answers.flooring            as FlooringAnswersDetailed);
      case "windowsDoors":     return windowsDoorsDetailed(answers.windowsDoors    as WindowsDoorsAnswersDetailed);
      case "lighting":         return lightingDetailed(answers.lighting            as LightingAnswersDetailed);
      case "lowVoltage":       return lowVoltageDetailed(answers.lowVoltage        as LowVoltageAnswersDetailed);
      case "roofing":          return roofingDetailed(answers.roofing              as RoofingAnswersDetailed);
      case "hardscape":        return hardscapeDetailed(answers.hardscape          as HardscapeAnswersDetailed);
      case "fencing":          return fencingDetailed(answers.fencing              as FencingAnswersDetailed);
      case "outdoorKitchen":   return outdoorKitchenDetailed(answers.outdoorKitchen as OutdoorKitchenAnswersDetailed);
      case "pool":             return poolDetailed(answers.pool                    as PoolAnswersDetailed);
      case "patioPergola":     return patioPergolaDetailed(answers.patioPergola    as PatioPergolaAnswersDetailed);
      case "exteriorCladding": return exteriorCladdingDetailed(answers.exteriorCladding as ExteriorCladdingAnswersDetailed);
    }
  }
}

/** Sums all additive finishes adjustments for one project type (supports both modes) */
function calculateFinishesAddon(
  projectType: ProjectType,
  finishes: Record<string, string>,
  inputMode: InputMode,
): PriceRange {
  const categories = FINISHES_CONFIG.filter((c) => c.appliesTo.includes(projectType));
  let low = 0, high = 0;

  if (inputMode === "quick") {
    for (const cat of categories) {
      const tierKey = `${cat.id}.tier`;
      const selected = finishes[tierKey] ?? cat.quickOptions[0]?.value;
      const opt = cat.quickOptions.find((o) => o.value === selected);
      if (opt) { low += opt.priceLow; high += opt.priceHigh; }
    }
  } else {
    for (const cat of categories) {
      for (const q of cat.detailedQuestions) {
        if (!isFinishQuestionVisible(q, finishes, cat.id)) continue;
        const key = `${cat.id}.${q.id}`;
        const selected = finishes[key] ?? q.defaultValue ?? q.options[0]?.value;
        const opt = q.options.find((o) => o.value === selected);
        if (opt) { low += opt.priceLow; high += opt.priceHigh; }
      }
    }
  }
  return { low, high };
}

export function calculateTotalEstimate(answers: QuoteAnswers): PriceRange {
  let totalLow  = 0;
  let totalHigh = 0;
  for (const type of answers.projectTypes) {
    const range = calculateProjectEstimate(type, answers, answers.inputMode);
    totalLow  += range.low;
    totalHigh += range.high;
    // Add finishes & materials addon for this project type
    const finAddon = answers.finishes?.[type]
      ? calculateFinishesAddon(type, answers.finishes[type]!, answers.inputMode)
      : { low: 0, high: 0 };
    totalLow  += finAddon.low;
    totalHigh += finAddon.high;
  }
  if (answers.projectTypes.length >= 2) {
    totalLow  = Math.round(totalLow  * (1 - C.multiProjectDiscountRate));
    totalHigh = Math.round(totalHigh * (1 - C.multiProjectDiscountRate));
  }
  return { low: totalLow, high: totalHigh };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style:                "currency",
    currency:             "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
