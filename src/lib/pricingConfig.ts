/**
 * ─────────────────────────────────────────────────────────────────────────────
 * JMK PRICING CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 * This file is the single source of truth for all cost rates, adders, and
 * price floors/ceilings used in the quote calculator.
 *
 * HOW TO EDIT:
 *  • Find the project type section below.
 *  • Each value is annotated with units and whether it applies to Quick mode,
 *    Detailed mode, or both.
 *  • After editing, save the file — the dev server will hot-reload.
 *  • Run `npm run build` to verify no TypeScript errors.
 *
 * STRUCTURE: PRICING_CONFIG.<projectType>.<fieldName>
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const PRICING_CONFIG = {

  // ── Global ──────────────────────────────────────────────────────────────────

  /** Fractional discount applied when 2 or more project types are selected (0.05 = 5%) */
  multiProjectDiscountRate: 0.05,


  // ── Kitchen ─────────────────────────────────────────────────────────────────
  kitchen: {
    // Quick mode ---------------------------------------------------------------
    /** Assumed kitchen floor area (sqft) for each size-range selection */
    sqftMap: { under100: 90, "100to150": 125, "150to200": 175, over200: 250 } as Record<string, number>,

    /** Cabinet cost per sqft of kitchen floor area [low, high] — Quick mode */
    cabinetPsf: {
      stock:          [130, 170],
      "semi-custom":  [220, 280],
      custom:         [360, 450],
    } as Record<string, [number, number]>,

    /** One-time dollar adder for countertop material selection — Quick mode */
    countertopAddQuick: {
      laminate: 0,
      quartz:   3000,
      granite:  2500,
      marble:   5000,
    } as Record<string, number>,

    /** One-time adder for appliance package (both modes) */
    applianceAdd: {
      basic:        2000,
      mid:          6000,
      professional: 15000,
    } as Record<string, number>,

    /** Extra cost for changing kitchen layout (both modes) */
    layoutChangeAdd: 8000,

    /** Extra cost to add a kitchen island (both modes) */
    islandAdd: 4000,

    // Detailed mode ------------------------------------------------------------
    /** Cabinet cost per linear foot [low, high] — Detailed mode */
    cabinetPricePerLf: {
      stock:          [180, 280],
      "semi-custom":  [300, 450],
      custom:         [500, 800],
    } as Record<string, [number, number]>,

    /** Countertop cost per sqft [low, high] — Detailed mode */
    countertopPsf: {
      laminate: [8,   15],
      quartz:   [55,  90],
      granite:  [45,  80],
      marble:   [80, 140],
    } as Record<string, [number, number]>,

    /** Cost per sink (Detailed mode) */
    sinkCost: 800,

    /** Base labor range added to Detailed estimate [low, high] */
    laborBase: [5000, 8000] as [number, number],

    // Clamp --------------------------------------------------------------------
    min: 15000,
    max: 110000,
  },


  // ── Bathroom ────────────────────────────────────────────────────────────────
  bathroom: {
    // Quick mode ---------------------------------------------------------------
    /** Base cost per bathroom size (before tile/fixture multipliers) */
    sizeBase: {
      half:     5000,
      standard: 10000,
      master:   18000,
    } as Record<string, number>,

    /** Multiplier [low, high] applied to sizeBase for tile quality */
    tileMult: {
      basic:   [1.0, 1.2],
      mid:     [1.3, 1.6],
      luxury:  [1.8, 2.3],
    } as Record<string, [number, number]>,

    /** One-time fixture package adder */
    fixtureAdd: {
      builder:  1500,
      mid:      3500,
      designer: 7000,
    } as Record<string, number>,

    /** Extra cost for shower type (Quick mode) */
    showerAddQuick: {
      "walk-in-custom": 4000,
      combo:             1500,
      standard:          0,
      "tub-only":        0,
    } as Record<string, number>,

    /** Extra cost for plumbing relocation (Quick mode, low-end) */
    plumbingAdd: 3500,

    /** Multiplier applied to plumbingAdd for high estimate (Quick mode) */
    plumbingMult: 1.35,

    // Detailed mode ------------------------------------------------------------
    /** Tile cost per sqft [low, high] */
    tilePsf: {
      basic:   [8,  15],
      mid:     [18, 35],
      luxury:  [40, 80],
    } as Record<string, [number, number]>,

    /** Per-unit fixture costs */
    fixtureCosts: {
      toilets: 400,
      sinks:   600,
      showers: 2000,
      tubs:    1500,
    } as Record<string, number>,

    /** Fixed labor base added to Detailed estimate */
    laborBase: 4000,

    /** Additional labor per sqft of floor area (Detailed mode) */
    laborPsf: 15,

    // Clamp --------------------------------------------------------------------
    min: 8000,
    max: 55000,
  },


  // ── Full Home Remodel ───────────────────────────────────────────────────────
  fullHome: {
    /** Cost per sqft [low, high] by scope level */
    basePsf: {
      cosmetic: [30,  60],
      mid:      [80, 130],
      gut:      [150, 250],
    } as Record<string, [number, number]>,

    /** Kitchen premium added regardless of scope */
    kitchenPremium: 20000,

    /** Premium added per bathroom */
    bathPremiumPerBath: 10000,

    /** HVAC system replacement adder */
    hvacAdd: 12000,

    /** Electrical system upgrade adder */
    electricalAdd: 8000,

    /** Plumbing system upgrade adder */
    plumbingAdd: 10000,

    // Clamp --------------------------------------------------------------------
    min: 25000,
    max: 500000,
  },


  // ── Addition / Room Build ───────────────────────────────────────────────────
  addition: {
    /** Assumed sqft from range selection (Quick mode) */
    sqftMap: {
      "200":     200,
      "400":     400,
      "600":     600,
      "800plus": 900,
    } as Record<string, number>,

    /** Base cost per sqft [low, high] by addition type */
    basePsf: {
      bedroom:        [150, 220],
      sunroom:        [150, 220],
      bathroom:       [200, 300],
      garage:         [80,  130],
      adu:            [200, 350],
      "second-story": [250, 400],
    } as Record<string, [number, number]>,

    /** Multiplier [low, high] applied by finish quality */
    finishMult: {
      standard: [1.0, 1.0],
      upgraded: [1.2, 1.25],
      premium:  [1.5, 1.6],
    } as Record<string, [number, number]>,

    /** Foundation type cost adder */
    foundationAdd: {
      slab:            0,
      crawl:           8000,
      "full-basement": 25000,
    } as Record<string, number>,

    /** Fixed base labor + permit allowance */
    laborBase: 3500,

    /** Per-window cost (Detailed mode) */
    windowCost: 600,

    /** Per-door cost (Detailed mode) */
    doorCost: 400,

    /** High-end multiplier for windows and doors */
    openingMult: 1.3,

    // Clamp --------------------------------------------------------------------
    min: 30000,
    max: 600000,
  },


  // ── Flooring ────────────────────────────────────────────────────────────────
  flooring: {
    /** Material cost per sqft [low, high] */
    matPsf: {
      carpet:     [3,  6],
      lvp:        [4,  7],
      engineered: [6, 10],
      hardwood:   [8, 14],
      tile:       [7, 13],
    } as Record<string, [number, number]>,

    /** Old-floor removal cost per sqft (when includesRemoval = true) */
    removalPsf: 1.5,

    /** Subfloor repair adder */
    subfloorAdd: {
      good:  0,
      minor: 500,
      major: 2500,
    } as Record<string, number>,

    /** Per-stair cost [low, high] */
    stairCost: { low: 75, high: 120 } as Record<string, number>,

    /** Assumed stair count from range selection (Quick mode) */
    stairMap: {
      none: 0,
      few:  8,
      many: 18,
    } as Record<string, number>,

    // Clamp --------------------------------------------------------------------
    min: 1500,
    max: 80000,
  },


  // ── Windows & Doors ─────────────────────────────────────────────────────────
  windowsDoors: {
    /** Per-window installed cost [low, high] by window type */
    winCost: {
      standard:      [350,  600],
      impact:        [800, 1400],
      "triple-pane": [700, 1100],
    } as Record<string, [number, number]>,

    /** Per-exterior-door cost [low, high] */
    extDoorCost: [800, 1800] as [number, number],

    /** Per-interior-door cost [low, high] by door style */
    intDoorCost: {
      "hollow-core": [200,  350],
      "solid-core":  [350,  550],
      custom:        [600, 1200],
    } as Record<string, [number, number]>,

    /** Sliding/pocket door adder for Quick mode [low, high] */
    slidingAddQuick: [1200, 2500] as [number, number],

    /** Baseboard cost per linear foot (Detailed mode) */
    baseboardPsf: 6,

    /** Per sliding door cost (Detailed mode) */
    slidingDoorCostDetailed: 1800,

    /** High multiplier for baseboard (Detailed) */
    baseboardMult: 1.2,

    /** High multiplier for sliding doors (Detailed) */
    slidingMult: 1.3,

    // Clamp --------------------------------------------------------------------
    min: 2000,
    max: 120000,
  },


  // ── Lighting ────────────────────────────────────────────────────────────────
  lighting: {
    /** Base cost range [low, high] for single-room and partial scopes (Quick mode) */
    scopeBaseFixed: {
      "single-room": [800,  2000],
      partial:       [2500, 6000],
    } as Record<string, [number, number]>,

    /** Whole-home scope: base + (homeSqFt × psf) [Quick mode] */
    wholeHomeBase: 5000,
    wholeHomePsfLow:  3.5,
    wholeHomePsfHigh: 7,

    /** Fixture quality multiplier [low, high] applied to scope base */
    fixMult: {
      standard: [1.0, 1.0],
      upgraded: [1.4, 1.4],
      designer: [2.0, 2.0],
    } as Record<string, [number, number]>,

    /** Recessed lighting package adder [low, high] */
    recessedAdd: [3500, 6000] as [number, number],

    /** Outdoor lighting adder [low, high] */
    outdoorAdd: [1500, 3500] as [number, number],

    /** Electrical panel upgrade adder [low, high] */
    panelAdd: [2500, 5000] as [number, number],

    /** Per-fixture installed cost [low, high] — Detailed mode */
    fixCostPer: {
      standard: [150,  300],
      upgraded: [300,  600],
      designer: [600, 1500],
    } as Record<string, [number, number]>,

    /** Labor cost per room (Detailed mode) */
    laborPerRoom: 800,

    // Clamp --------------------------------------------------------------------
    min: 800,
    max: 60000,
  },


  // ── Low Voltage ─────────────────────────────────────────────────────────────
  lowVoltage: {
    /** Networking service cost range [low, high] by scope */
    networkingScope: {
      basic:            [800,   1500],
      structured:       [2000,  4000],
      "whole-home-wifi": [3500, 7000],
    } as Record<string, [number, number]>,

    /** AV system cost range [low, high] by scope */
    avScope: {
      "single-room": [2000,  5000],
      "multi-room":  [6000, 15000],
      "whole-home":  [15000, 40000],
    } as Record<string, [number, number]>,

    /** Security system cost range [low, high] by scope */
    securityScope: {
      basic:         [1500,  3000],
      cameras:       [2500,  6000],
      "full-system": [6000, 15000],
    } as Record<string, [number, number]>,

    /** Smart-home automation cost range [low, high] by level */
    smartHomeLevel: {
      basic:              [2000,  4000],
      mid:                [5000, 12000],
      "full-automation":  [15000, 35000],
    } as Record<string, [number, number]>,

    /** Per structured-cabling drop cost (Detailed mode) */
    cableDropCost: 150,

    /** High-end multiplier for cable drops */
    cableDropMult: 1.5,

    // Clamp --------------------------------------------------------------------
    min: 800,
    max: 100000,
  },


  // ── Roofing ─────────────────────────────────────────────────────────────────
  roofing: {
    /** Multiplier applied to home sqft to estimate roof area (Quick mode) */
    roofAreaMultiplier: 1.3,

    /** Roofing material cost per sqft [low, high] */
    matPsf: {
      asphalt:          [4,  8],
      metal:            [10, 18],
      tile:             [12, 22],
      "flat-membrane":  [6,  12],
    } as Record<string, [number, number]>,

    /** Pitch labor multiplier [low, high] */
    pitchMult: {
      low:    [1.0,  1.0],
      medium: [1.1,  1.15],
      steep:  [1.25, 1.35],
    } as Record<string, [number, number]>,

    /** Gutter installation adder (Quick mode — flat rate) */
    gutterAddQuick: 2500,

    /** Per-skylight cost (both modes) */
    skylightCost: 1800,

    /** Tear-off cost per sqft per additional layer (Detailed mode) */
    tearOffPsf: 0.5,

    /** Gutter cost per linear foot (Detailed mode) */
    gutterLinFtCost: 12,

    /** High-end multiplier for gutters (Detailed mode) */
    gutterMult: 1.2,

    // Clamp --------------------------------------------------------------------
    min: 8000,
    max: 80000,
  },


  // ── Outdoor Kitchen ─────────────────────────────────────────────────────────
  outdoorKitchen: {
    // Quick mode ---------------------------------------------------------------
    /** Base cost range [low, high] by overall size */
    baseMap: {
      small:  [15000, 25000],
      medium: [30000, 55000],
      large:  [60000, 90000],
    } as Record<string, [number, number]>,

    /** Multiplier [low, high] for appliance quality (Quick mode) */
    applianceMult: {
      basic:        [1.0,  1.0],
      mid:          [1.2,  1.25],
      professional: [1.5,  1.6],
    } as Record<string, [number, number]>,

    /** Covered structure adder [low, high] (Quick mode) */
    coverAddQuick: [8000, 18000] as [number, number],

    // Detailed mode ------------------------------------------------------------
    /** Base construction cost per sqft [low, high] */
    baseCostPerSqFt: [600, 1000] as [number, number],

    /** Countertop material cost per sqft [low, high] */
    ctPsf: {
      concrete:   [80,  140],
      granite:    [60,  100],
      porcelain:  [50,   90],
      stainless:  [100, 180],
    } as Record<string, [number, number]>,

    /** Per-appliance cost by quality level (Detailed mode) */
    applianceCostDetailed: {
      basic:        1000,
      mid:          3000,
      professional: 7000,
    } as Record<string, number>,

    /** High-end multiplier applied to appliance cost (Detailed mode) */
    applianceMult2: 1.3,

    /** Cover / roof type adder (Detailed mode) */
    coverTypeAdd: {
      none:         0,
      pergola:      8000,
      "solid-roof": 18000,
    } as Record<string, number>,

    /** Sink installation adder */
    sinkAdd: 1500,

    /** Refrigeration unit adder */
    fridgeAdd: 2000,

    // Clamp --------------------------------------------------------------------
    min: 15000,
    max: 120000,
  },


  // ── Pool ────────────────────────────────────────────────────────────────────
  pool: {
    // Quick mode ---------------------------------------------------------------
    /** Base pool cost [low, high] by size */
    sizeCost: {
      plunge:   [40000,  60000],
      standard: [65000, 100000],
      large:    [100000, 160000],
    } as Record<string, [number, number]>,

    /** Multiplier [low, high] by construction type (Quick mode) */
    typeMult: {
      concrete:   [1.2,  1.3],
      fiberglass: [1.0,  1.0],
      vinyl:      [0.85, 0.9],
    } as Record<string, [number, number]>,

    /** Spa addition cost [low, high] (Quick mode) */
    spaAddQuick: [15000, 25000] as [number, number],

    /** Decking addition cost [low, high] (Quick mode) */
    deckAddQuick: [8000, 18000] as [number, number],

    // Detailed mode ------------------------------------------------------------
    /** Base pool cost per cubic foot [low, high] by construction type */
    baseCostPerCuFt: {
      concrete:   [300, 500],
      fiberglass: [200, 350],
      vinyl:      [150, 280],
    } as Record<string, [number, number]>,

    /** Decking material cost per sqft [low, high] */
    deckPsf: {
      concrete:    [8,  15],
      pavers:      [18, 35],
      travertine:  [25, 50],
    } as Record<string, [number, number]>,

    /** Spa cost per sqft (Detailed mode) */
    spaCostPerSqFt: 400,

    /** Per water feature cost (Detailed mode) */
    waterFeatureCost: 3500,

    /** High-end multiplier for spa (Detailed mode) */
    spaMult: 1.2,

    /** High-end multiplier for water features (Detailed mode) */
    waterMult: 1.2,

    // Clamp --------------------------------------------------------------------
    min: 40000,
    max: 200000,
  },


  // ── Patio / Pergola ─────────────────────────────────────────────────────────
  patioPergola: {
    /** Assumed patio sqft from range selection (Quick mode) */
    sqftMap: {
      under200:   150,
      "200to400": 300,
      "400to700": 550,
      over700:    800,
    } as Record<string, number>,

    /** Surface material cost per sqft [low, high] */
    surfPsf: {
      concrete:    [8,  15],
      pavers:      [18, 35],
      travertine:  [25, 50],
      "wood-deck": [15, 30],
    } as Record<string, [number, number]>,

    /** Covered patio adder [low, high] (Quick mode) */
    coverAddQuick: [5000, 10000] as [number, number],

    /** Pergola structure adder [low, high] (Quick mode) */
    pergolaAddQuick: [8000, 20000] as [number, number],

    /** Outdoor lighting adder [low, high] (Quick mode) */
    lightAddQuick: [1500, 3500] as [number, number],

    /** Pergola material cost per sqft [low, high] (Detailed mode) */
    pergolaPsf: {
      wood:      [40,  80],
      aluminum:  [50, 100],
      steel:     [60, 120],
    } as Record<string, [number, number]>,

    /** Per outdoor lighting fixture cost (Detailed mode) */
    lightFixtureCost: 400,

    /** Electrical run adder (Detailed mode) */
    electricalAdd: 2500,

    /** High-end multiplier for lighting fixtures */
    lightMult: 1.3,

    // Clamp --------------------------------------------------------------------
    min: 5000,
    max: 60000,
  },


  // ── Exterior Cladding ───────────────────────────────────────────────────────
  exteriorCladding: {
    /** Multiplier applied to home sqft to estimate wall area (Quick mode) */
    wallAreaMultiplier: 1.15,

    /** Cladding material cost per sqft [low, high] */
    matPsf: {
      stucco:  [10, 18],
      siding:  [6,  14],
      stone:   [25, 50],
      brick:   [20, 40],
    } as Record<string, [number, number]>,

    /** Trim package adder [low, high] (Quick mode) */
    trimAddQuick: [2000, 5000] as [number, number],

    /** Trim cost per linear foot (Detailed mode) */
    trimLinFtCost: 18,

    /** Per window/door cutout labor cost (Detailed mode) */
    cutoutAdd: 200,

    /** High-end multiplier for trim (Detailed mode) */
    trimMult: 1.2,

    // Clamp --------------------------------------------------------------------
    min: 8000,
    max: 90000,
  },

  // ── Hardscape ────────────────────────────────────────────────────────────────
  hardscape: {
    /** Assumed sqft for each range bucket (Quick mode) */
    sqftMap: { under500: 350, "500to1000": 750, "1000to2000": 1500, over2000: 2500 } as Record<string, number>,

    /** Material cost per sqft [low, high] (both modes) */
    matPsf: {
      concrete:       [8,  15],
      pavers:         [18, 35],
      travertine:     [25, 50],
      "exterior-tile":[20, 45],
    } as Record<string, [number, number]>,

    /** Area-type multiplier [low, high] */
    areaTypeMult: {
      driveway:  [1.1, 1.2],
      walkway:   [1.0, 1.1],
      "pool-deck":[1.0, 1.15],
      mixed:     [1.05, 1.15],
    } as Record<string, [number, number]>,

    /** Edge treatment adder (Detailed mode) */
    edgeTreatmentAdd: { none: 0, "soldier-course": 1500, banding: 2500 } as Record<string, number>,

    // Clamp -------------------------------------------------------------------
    min: 3000,
    max: 150000,
  },

  // ── Fencing ──────────────────────────────────────────────────────────────────
  fencing: {
    /** Assumed linear footage for each range bucket (Quick mode) */
    linearFtMap: { under100: 75, "100to250": 175, "250to500": 375, over500: 650 } as Record<string, number>,

    /** Gate count assumed LF for Quick mode pricing adder (multiplied by avg gate cost) */
    gateCountMap: { none: 0, "one-two": 1.5, "three-plus": 4 } as Record<string, number>,

    /** Material cost per linear foot [low, high] (both modes) */
    matPriceLf: {
      "chain-link":  [20, 35],
      wood:          [30, 55],
      vinyl:         [35, 60],
      aluminum:      [40, 70],
      "wrought-iron":[70, 120],
    } as Record<string, [number, number]>,

    /** Pedestrian gate cost [low, high] (Detailed mode) */
    pedestrianGateCost: [800, 2000] as [number, number],

    /** Vehicle gate cost (no motor) [low, high] (Detailed mode) */
    vehicleGateCost: [2000, 5000] as [number, number],

    /** Additional cost to motorize a vehicle gate [low, high] (Detailed mode) */
    vehicleMotorAdd: [2000, 5000] as [number, number],

    // Clamp -------------------------------------------------------------------
    min: 2000,
    max: 200000,
  },

} as const;
