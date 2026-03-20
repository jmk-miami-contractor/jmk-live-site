import type { ProjectType, InputMode } from "./quoteTypes";

// ── Interfaces ─────────────────────────────────────────────────────────────

export interface FinishOption {
  value: string;
  label: string;
  description?: string;
  /** Informational note shown to JMK — no price impact */
  notes?: string;
  emoji?: string;
  /** Additive adjustment to estimate.low */
  priceLow: number;
  /** Additive adjustment to estimate.high */
  priceHigh: number;
}

/**
 * Declarative show condition — pure data, safe to serialize.
 * A question with showIf is ONLY visible when its parent question
 * has been answered with one of the listed values.
 */
export interface ShowCondition {
  questionId: string;         // sibling question whose answer triggers visibility
  equals: string | string[];  // show when parent answer matches this value / any of these values
}

export interface FinishQuestion {
  id: string;             // unique within category — used as key suffix
  label: string;
  defaultValue?: string;  // falls back to first option if omitted
  /** Informational note displayed to the user above the options */
  notes?: string;
  showIf?: ShowCondition; // omit = always visible (root question)
  options: FinishOption[];
}

export interface FinishCategory {
  id: string;
  label: string;
  icon: string;
  appliesTo: ProjectType[];
  /**
   * Quick mode: 2–3 flat tier cards (Yes/No or Standard/Upgrade/Premium).
   * Stored as finishes["${catId}.tier"].
   */
  quickOptions: FinishOption[];
  /**
   * Detailed mode: full conditional question tree.
   * Stored as finishes["${catId}.${questionId}"].
   */
  detailedQuestions: FinishQuestion[];
}

export const FINISHES_CONFIG: FinishCategory[] = [

  // ── 1. Interior Doors ──────────────────────────────────────────────────────
  {
    id: "interiorDoors",
    label: "Interior Doors",
    icon: "🚪",
    appliesTo: ["fullHome", "addition", "windowsDoors"],
    quickOptions: [
      { value: "standard", label: "Standard",  emoji: "🚪", description: "Hollow-core shaker throughout",                 priceLow: 0,    priceHigh: 0     },
      { value: "upgrade",  label: "Upgrade",   emoji: "🪵", description: "Solid-core, barn doors, or specialty styles",  priceLow: 2000, priceHigh: 5000  },
      { value: "premium",  label: "Premium",   emoji: "✨", description: "Custom millwork, full-glass, or pivot doors",  priceLow: 5000, priceHigh: 12000 },
    ],
    detailedQuestions: [
      {
        id: "doorStyle", label: "Primary Door Style",
        options: [
          { value: "shaker",  emoji: "🚪", label: "Shaker",       description: "1, 2, or 3-panel shaker (standard)",       priceLow: 0,    priceHigh: 0    },
          { value: "flat",    emoji: "▪️",  label: "Flat / Slab",  description: "Flush slab — modern/contemporary",          priceLow: 0,    priceHigh: 0    },
          { value: "barn",    emoji: "🪵",  label: "Barn Door",    description: "Sliding barn-style hardware + door",        priceLow: 2500, priceHigh: 6000 },
          { value: "french",  emoji: "🪟",  label: "French Door",  description: "Double swing with glass panels",            priceLow: 2000, priceHigh: 5500 },
          { value: "pocket",  emoji: "↔️",  label: "Pocket Door",  description: "Slides into wall cavity",                   priceLow: 1500, priceHigh: 4000 },
        ],
      },
      // Shaker: panel count
      {
        id: "shakerPanel", label: "Shaker Panel Count",
        showIf: { questionId: "doorStyle", equals: "shaker" },
        options: [
          { value: "1-panel", label: "1-Panel",  emoji: "▪️",  description: "Single flat center panel",   priceLow: 0,   priceHigh: 0   },
          { value: "2-panel", label: "2-Panel",  emoji: "▪️▪️", description: "Two stacked panels (most common)", priceLow: 0,   priceHigh: 0   },
          { value: "3-panel", label: "3-Panel",  emoji: "▪️▪️▪️", description: "Three stacked panels — classic", priceLow: 200, priceHigh: 500 },
        ],
      },
      // Barn: hardware style
      {
        id: "barnHardwareStyle", label: "Barn Door Hardware Style",
        showIf: { questionId: "doorStyle", equals: "barn" },
        options: [
          { value: "strap-black",    emoji: "⚙️",  label: "Standard Strap",    description: "Classic black strap hardware",          priceLow: 0,   priceHigh: 0    },
          { value: "j-track-nickel", emoji: "🔩",  label: "J-Track (Nickel)",  description: "Sleek brushed nickel J-track",           priceLow: 300, priceHigh: 600  },
          { value: "industrial",     emoji: "🔧",  label: "Industrial Pipe",   description: "Black iron pipe — industrial look",      priceLow: 400, priceHigh: 800  },
          { value: "concealed",      emoji: "✨",  label: "Concealed Track",   description: "Hidden top track — ultra-modern",        priceLow: 600, priceHigh: 1200 },
        ],
      },
      // Barn: door material
      {
        id: "barnMaterial", label: "Barn Door Material",
        showIf: { questionId: "doorStyle", equals: "barn" },
        options: [
          { value: "solid-wood",  emoji: "🪵",  label: "Solid Wood Plank",  description: "Real wood plank construction",         priceLow: 0,    priceHigh: 0    },
          { value: "mdf-painted", emoji: "🎨",  label: "MDF Painted",       description: "Smooth painted finish — any color",    priceLow: 0,    priceHigh: 0    },
          { value: "glass-panel", emoji: "🪟",  label: "Glass Panel",       description: "Wood frame + glass inserts",           priceLow: 600,  priceHigh: 1400 },
          { value: "mirror",      emoji: "🪞",  label: "Mirror Panel",      description: "Full-length mirrored surface",         priceLow: 800,  priceHigh: 1800 },
          { value: "reclaimed",   emoji: "♻️",  label: "Reclaimed Wood",    description: "Weathered reclaimed character wood",   priceLow: 500,  priceHigh: 1200 },
        ],
      },
      // French: glass style
      {
        id: "frenchGlass", label: "French Door Glass Style",
        showIf: { questionId: "doorStyle", equals: "french" },
        options: [
          { value: "clear",          emoji: "🪟",  label: "Clear Glass",       description: "Standard clear tempered glass",        priceLow: 0,   priceHigh: 0   },
          { value: "frosted",        emoji: "🌫️",  label: "Frosted / Privacy",  description: "Privacy frosted glass",                priceLow: 200, priceHigh: 500 },
          { value: "divided-light",  emoji: "☰",   label: "Divided Light",     description: "Grille pattern — Colonial or Prairie",  priceLow: 300, priceHigh: 700 },
        ],
      },
      // Pocket: framing condition
      {
        id: "pocketFraming", label: "Pocket Door Framing",
        showIf: { questionId: "doorStyle", equals: "pocket" },
        notes: "JMK to confirm structural vs. partition wall on-site",
        options: [
          { value: "existing",        label: "Existing framing",     emoji: "✅",  description: "Framing already in place",           priceLow: 0,    priceHigh: 0    },
          { value: "new-partition",   label: "New partition framing", emoji: "🔨",  description: "New non-structural wall required",   priceLow: 800,  priceHigh: 2000 },
        ],
      },
      // Door color — applies to all styles
      {
        id: "doorColor", label: "Door Color / Finish",
        options: [
          { value: "white",   emoji: "⬜",  label: "Painted White",      description: "Standard semi-gloss white",             priceLow: 0,   priceHigh: 0    },
          { value: "stained", emoji: "🪵",  label: "Natural Wood Stain", description: "Real wood or veneer — stained finish",  priceLow: 800, priceHigh: 2000 },
          { value: "black",   emoji: "⬛",  label: "Painted Black",      description: "Matte or semi-gloss black",             priceLow: 300, priceHigh: 700  },
          { value: "custom",  emoji: "🎨",  label: "Custom Color",       description: "Any custom paint color (client spec)",  priceLow: 0,   priceHigh: 0    },
        ],
      },
      // Stain species
      {
        id: "stainSpecies", label: "Wood Species (Stain)",
        showIf: { questionId: "doorColor", equals: "stained" },
        options: [
          { value: "oak",    emoji: "🌳",  label: "White Oak",  description: "Prominent grain — most popular",   priceLow: 0,   priceHigh: 0    },
          { value: "maple",  emoji: "🍁",  label: "Maple",      description: "Fine, consistent grain",           priceLow: 0,   priceHigh: 0    },
          { value: "walnut", emoji: "🟫",  label: "Walnut",     description: "Dark, luxury look",                priceLow: 400, priceHigh: 900  },
          { value: "pine",   emoji: "🌲",  label: "Pine",       description: "Rustic, knotty character",         priceLow: 0,   priceHigh: 0    },
        ],
      },
      // Trim casing
      {
        id: "trimCasing", label: "Door Casing / Trim",
        options: [
          { value: "standard-2.5",   emoji: "📏",  label: "Standard 2.5\"",      description: "Basic painted casing (standard)",        priceLow: 0,    priceHigh: 0    },
          { value: "craftsman-3.5",  emoji: "🔨",  label: "Craftsman 3.5\"",     description: "Wider flat craftsman profile",            priceLow: 1000, priceHigh: 2500 },
          { value: "picture-frame",  emoji: "🖼️",  label: "Picture-Frame",       description: "Dual-band stacked casing — high-end",     priceLow: 2000, priceHigh: 5000 },
          { value: "frameless",      emoji: "✨",   label: "Frameless / Minimal", description: "Micro-reveal — contemporary flush look",  priceLow: 500,  priceHigh: 1500 },
        ],
      },
      // Fire rating
      {
        id: "fireRating", label: "Fire Rating (Garage / Utility Rooms)",
        options: [
          { value: "na",     emoji: "✅",  label: "Not Required",  description: "Standard interior rooms",              priceLow: 0,   priceHigh: 0    },
          { value: "20-min", emoji: "🛡️",  label: "20-Minute",     description: "Garage-to-home entry (code required)",  priceLow: 400, priceHigh: 900  },
          { value: "60-min", emoji: "🔥",  label: "60-Minute",     description: "High-risk utility areas",               priceLow: 800, priceHigh: 1800 },
        ],
      },
    ],
  },

  // ── 2. Door Hardware ───────────────────────────────────────────────────────
  {
    id: "doorHardware",
    label: "Door Hardware",
    icon: "🔑",
    appliesTo: ["fullHome", "addition"],
    quickOptions: [
      { value: "standard", label: "Standard",  emoji: "🔑",  description: "Matching builder-grade knobs & levers",      priceLow: 0,    priceHigh: 0    },
      { value: "designer", label: "Designer",  emoji: "✨",  description: "Coordinated designer set — matte black or brushed nickel", priceLow: 1000, priceHigh: 2500 },
      { value: "luxury",   label: "Luxury",    emoji: "👑",  description: "Premium solid brass, concealed hinges, smart locks", priceLow: 2500, priceHigh: 7000 },
    ],
    detailedQuestions: [
      // Hardware finish
      {
        id: "hwFinish", label: "Hardware Finish",
        options: [
          { value: "satin-nickel",   emoji: "🔩",  label: "Satin Nickel",      description: "Classic coordinated finish",            priceLow: 0,   priceHigh: 0    },
          { value: "matte-black",    emoji: "⬛",  label: "Matte Black",       description: "Modern matte black — very popular",     priceLow: 200, priceHigh: 600  },
          { value: "brushed-gold",   emoji: "🥇",  label: "Brushed Gold",      description: "Warm satin brass or champagne",         priceLow: 400, priceHigh: 1000 },
          { value: "brushed-bronze", emoji: "🟫",  label: "Brushed Bronze",    description: "Warm oil-rubbed or brushed bronze",     priceLow: 300, priceHigh: 800  },
          { value: "two-tone",       emoji: "🎨",  label: "Two-Tone Zones",    description: "Different finish by room zone",         priceLow: 200, priceHigh: 600  },
        ],
      },
      // Gold: lacquered or living finish
      {
        id: "goldLacquered", label: "Gold Finish Type",
        showIf: { questionId: "hwFinish", equals: "brushed-gold" },
        options: [
          { value: "lacquered",    label: "Lacquered (polished, stays consistent)", emoji: "✨",  priceLow: 0,   priceHigh: 0   },
          { value: "unlacquered",  label: "Unlacquered (living finish — patinas over time)", emoji: "🟡", priceLow: 200, priceHigh: 500 },
        ],
      },
      // Hinge style
      {
        id: "hingeStyle", label: "Hinge Style",
        options: [
          { value: "standard-butt",  emoji: "⚙️",  label: "Standard Butt Hinge",  description: "Visible hinge — standard",             priceLow: 0,    priceHigh: 0    },
          { value: "concealed",      emoji: "✨",   label: "Concealed / European",  description: "Hidden hinge — soft-close optional",   priceLow: 600,  priceHigh: 1500 },
          { value: "pivot",          emoji: "↻",    label: "Pivot Hinge",           description: "Floor-to-ceiling pivot — luxury",      priceLow: 2000, priceHigh: 5000 },
        ],
      },
      // Concealed: soft-close
      {
        id: "softClose", label: "Soft-Close Mechanism",
        showIf: { questionId: "hingeStyle", equals: "concealed" },
        options: [
          { value: "yes", label: "Include soft-close",  emoji: "🤫", priceLow: 300, priceHigh: 700 },
          { value: "no",  label: "Standard close",      emoji: "⬜", priceLow: 0,   priceHigh: 0   },
        ],
      },
      // Handle style
      {
        id: "handleStyle", label: "Handle Style",
        options: [
          { value: "lever",   emoji: "↔️",  label: "Lever Handle",  description: "Most common; ADA-compliant",    priceLow: 0,   priceHigh: 0   },
          { value: "knob",    emoji: "⚪",  label: "Knob",          description: "Traditional round or square",   priceLow: 0,   priceHigh: 0   },
          { value: "bar-pull",emoji: "➖",  label: "Bar Pull",      description: "Long pull — pocket/barn doors", priceLow: 100, priceHigh: 300 },
        ],
      },
      // Smart lock upgrade
      {
        id: "smartLock", label: "Smart Lock (Entry / Garage / Primary Doors)",
        options: [
          { value: "none",     emoji: "🔑",  label: "Standard Keyed",   description: "Traditional deadbolt or privacy lock",  priceLow: 0,    priceHigh: 0    },
          { value: "keypad",   emoji: "🔢",  label: "Keypad / Smart",   description: "App-controlled, keypad entry (1–2 doors)", priceLow: 400, priceHigh: 900  },
          { value: "full-set", emoji: "📱",  label: "Full Smart Set",   description: "Smart locks on all applicable doors",    priceLow: 900,  priceHigh: 2200 },
        ],
      },
    ],
  },

  // ── 3. Baseboards & Trim ───────────────────────────────────────────────────
  {
    id: "baseboardsTrim",
    label: "Baseboards & Trim",
    icon: "📏",
    appliesTo: ["fullHome", "addition", "flooring"],
    quickOptions: [
      { value: "standard",  label: "Standard",  emoji: "📏",  description: "3.5\" painted MDF throughout",           priceLow: 0,    priceHigh: 0    },
      { value: "upgrade",   label: "Upgrade",   emoji: "🔨",  description: "Craftsman profile, taller base, crown",  priceLow: 2000, priceHigh: 5000 },
      { value: "premium",   label: "Premium",   emoji: "✨",  description: "Built-up base, custom crown, LED reveal", priceLow: 5000, priceHigh: 12000},
    ],
    detailedQuestions: [
      // Baseboard profile
      {
        id: "baseProfile", label: "Baseboard Profile",
        options: [
          { value: "flat-minimal",  emoji: "➖",  label: "Flat / Minimal",       description: "Low-profile modern base — 2\"–3\"",    priceLow: 0,    priceHigh: 0    },
          { value: "standard",      emoji: "📏",  label: "Standard S-curve",     description: "3.5\"–4\" traditional profile",         priceLow: 0,    priceHigh: 0    },
          { value: "craftsman",     emoji: "🔨",  label: "Craftsman Flat-Top",   description: "Wider, cleaner craftsman look — 5\"–6\"", priceLow: 1000, priceHigh: 3000 },
          { value: "built-up",      emoji: "✨",  label: "Built-Up (3-Piece)",   description: "Base + cap + shoe — stacked tall",       priceLow: 2500, priceHigh: 6000 },
          { value: "led-reveal",    emoji: "💡",  label: "LED Reveal / Reglet",  description: "Shadow gap with integrated LED strip",   priceLow: 3000, priceHigh: 7000 },
        ],
      },
      // LED color temp (if LED reveal)
      {
        id: "ledColorTemp", label: "LED Strip Color Temperature",
        showIf: { questionId: "baseProfile", equals: "led-reveal" },
        options: [
          { value: "2700k",  emoji: "🟡",  label: "2700K — Warm White",    description: "Cozy, incandescent feel",   priceLow: 0,   priceHigh: 0   },
          { value: "3000k",  emoji: "🟠",  label: "3000K — Warm Neutral",  description: "Clean and warm (most popular)", priceLow: 0, priceHigh: 0   },
          { value: "rgb",    emoji: "🌈",  label: "RGB Color-Changing",     description: "Full color control via app",  priceLow: 500, priceHigh: 1200 },
        ],
      },
      // Crown molding
      {
        id: "crownMolding", label: "Crown Molding",
        options: [
          { value: "none",       emoji: "⬜",  label: "None",              description: "No crown molding",                        priceLow: 0,    priceHigh: 0     },
          { value: "simple",     emoji: "📏",  label: "Simple (2\"–3\")",  description: "Light profile — contemporary",             priceLow: 1000, priceHigh: 2500  },
          { value: "traditional",emoji: "🏛️",  label: "Traditional (4\"–5\")", description: "Classic profile — single piece",       priceLow: 2000, priceHigh: 4500  },
          { value: "built-up",   emoji: "✨",  label: "Elaborate / Built-Up", description: "Multi-piece stacked — 6\"+",            priceLow: 4000, priceHigh: 9000  },
          { value: "coffered",   emoji: "⬛",  label: "Coffered Ceiling",   description: "Grid beam system — architectural statement", priceLow: 8000, priceHigh: 20000 },
        ],
      },
      // Coffered: beam depth
      {
        id: "cofferedDepth", label: "Coffered Beam Depth",
        showIf: { questionId: "crownMolding", equals: "coffered" },
        options: [
          { value: "4in",  label: "4\"",  emoji: "▪️",  priceLow: 0,    priceHigh: 0    },
          { value: "6in",  label: "6\"",  emoji: "▪️",  priceLow: 1000, priceHigh: 2500 },
          { value: "8in",  label: "8\"",  emoji: "▪️",  priceLow: 2000, priceHigh: 4000 },
          { value: "10in", label: "10\"", emoji: "▪️",  priceLow: 3000, priceHigh: 6000 },
        ],
      },
      // Baseboard color
      {
        id: "baseColor", label: "Baseboard & Trim Color",
        options: [
          { value: "white",   emoji: "⬜",  label: "White (standard)",   description: "Semi-gloss white throughout",          priceLow: 0,   priceHigh: 0    },
          { value: "black",   emoji: "⬛",  label: "Black / Dark",       description: "High-contrast dramatic look",          priceLow: 200, priceHigh: 500  },
          { value: "stained", emoji: "🪵",  label: "Natural Wood/Stain", description: "Match floor or contrast — stained",    priceLow: 600, priceHigh: 1500 },
          { value: "wall",    emoji: "🎨",  label: "Match Wall Color",   description: "Same as wall paint — continuous look", priceLow: 0,   priceHigh: 0    },
        ],
      },
    ],
  },

  // ── 4. Electrical & Lighting ───────────────────────────────────────────────
  {
    id: "electrical",
    label: "Electrical & Lighting",
    icon: "💡",
    appliesTo: ["kitchen", "bathroom", "fullHome", "addition", "lighting", "lowVoltage", "outdoorKitchen", "patioPergola"],
    quickOptions: [
      { value: "standard", label: "Standard",  emoji: "💡",  description: "White Decora plates, standard switches",            priceLow: 0,    priceHigh: 0    },
      { value: "upgrade",  label: "Upgrade",   emoji: "⭐",  description: "Screwless plates, dimmers in key rooms, smart switches", priceLow: 1500, priceHigh: 4000 },
      { value: "premium",  label: "Premium",   emoji: "✨",  description: "Full smart home, whole-house dimming, custom lighting", priceLow: 4000, priceHigh: 12000},
    ],
    detailedQuestions: [
      // Plate style
      {
        id: "plateStyle", label: "Switch / Outlet Plate Style",
        options: [
          { value: "standard-decora",  emoji: "🔌",  label: "Standard Decora",    description: "White screwed Decora plates",           priceLow: 0,   priceHigh: 0    },
          { value: "screwless",        emoji: "✨",   label: "Screwless / Seamless", description: "No visible screws — Legrand Radiant", priceLow: 500, priceHigh: 1200 },
          { value: "specialty-finish", emoji: "🎨",   label: "Specialty Finish",   description: "Black, brushed nickel, or gold plates", priceLow: 400, priceHigh: 1000 },
        ],
      },
      // Dimmer switches
      {
        id: "dimmers", label: "Dimmer Switches",
        options: [
          { value: "none",        emoji: "⬜",  label: "None",             description: "Standard on/off switches throughout",     priceLow: 0,    priceHigh: 0    },
          { value: "key-rooms",   emoji: "🔆",  label: "Key Rooms",        description: "Living, dining, primary bedroom dimmers", priceLow: 600,  priceHigh: 1500 },
          { value: "whole-home",  emoji: "✨",  label: "Whole Home",       description: "Dimmers on all applicable circuits",      priceLow: 1500, priceHigh: 4000 },
        ],
      },
      // Smart home level
      {
        id: "smartHome", label: "Smart Home System",
        options: [
          { value: "none",        emoji: "⬜",  label: "Standard Switches",        description: "No smart system",                                    priceLow: 0,    priceHigh: 0    },
          { value: "wifi-basic",  emoji: "📱",  label: "Individual Smart Switches", description: "WiFi-connected per switch (no hub required)",        priceLow: 800,  priceHigh: 2000 },
          { value: "lutron-caseta",emoji: "⚡", label: "Lutron Caseta System",      description: "Full smart bridge + remotes (most reliable)",        priceLow: 2000, priceHigh: 5000 },
          { value: "full-auto",   emoji: "✨",  label: "Full Automation",          description: "Crestron / Control4 — requires integrator",          priceLow: 5000, priceHigh: 20000},
        ],
      },
      // Recessed lighting trim
      {
        id: "recessedTrim", label: "Recessed Lighting Trim Style",
        options: [
          { value: "white-baffle",  emoji: "⬜",  label: "Standard White Baffle", description: "Most common — blends into ceiling",     priceLow: 0,   priceHigh: 0    },
          { value: "black-baffle",  emoji: "⬛",  label: "Black Baffle",          description: "Modern accent in dark ceilings",        priceLow: 200, priceHigh: 600  },
          { value: "gimbal",        emoji: "🔦",  label: "Gimbal / Adjustable",   description: "Aim at art, counters, or reading areas", priceLow: 400, priceHigh: 900  },
          { value: "trimless",      emoji: "✨",  label: "Trimless / Plaster-In", description: "Flush with ceiling — premium look",     priceLow: 1500, priceHigh: 4000 },
        ],
      },
      // Color temperature
      {
        id: "colorTemp", label: "Recessed Light Color Temperature",
        options: [
          { value: "2700k",   emoji: "🟡",  label: "2700K — Warm",          description: "Cozy, residential feel (bedrooms/living)",    priceLow: 0, priceHigh: 0 },
          { value: "3000k",   emoji: "🟠",  label: "3000K — Warm Neutral",  description: "Clean + warm (most common choice)",           priceLow: 0, priceHigh: 0 },
          { value: "4000k",   emoji: "⬜",  label: "4000K — Neutral",       description: "Bright + clear (kitchens, garages, offices)", priceLow: 0, priceHigh: 0 },
          { value: "mixed",   emoji: "🌡️",  label: "Mixed Zones",           description: "Different temps per room zone",               priceLow: 200, priceHigh: 500 },
        ],
      },
      // EV charger rough-in
      {
        id: "evCharger", label: "EV Charger (Garage)",
        options: [
          { value: "none",       emoji: "⬜",  label: "None",                  description: "No EV charger planned",                    priceLow: 0,   priceHigh: 0    },
          { value: "rough-in",   emoji: "🔌",  label: "Rough-In Only",         description: "240V/50A conduit run for future install",  priceLow: 400, priceHigh: 900  },
          { value: "full",       emoji: "⚡",  label: "Full Level 2 Outlet",   description: "Complete 240V/50A NEMA outlet installed",  priceLow: 800, priceHigh: 1800 },
        ],
      },
    ],
  },

  // ── 5. Paint & Wall Finishes ───────────────────────────────────────────────
  {
    id: "paint",
    label: "Paint & Wall Finishes",
    icon: "🎨",
    appliesTo: ["kitchen", "bathroom", "fullHome", "addition"],
    quickOptions: [
      { value: "standard", label: "Standard",  emoji: "🎨",  description: "Quality latex, one paint palette throughout",       priceLow: 0,    priceHigh: 0    },
      { value: "upgrade",  label: "Upgrade",   emoji: "⭐",  description: "Premium paints (BM/Farrow & Ball), accent walls",  priceLow: 800,  priceHigh: 2500 },
      { value: "premium",  label: "Premium",   emoji: "✨",  description: "Specialty finishes: limewash, wallpaper, Venetian", priceLow: 2500, priceHigh: 8000 },
    ],
    detailedQuestions: [
      // Wall sheen
      {
        id: "wallSheen", label: "Wall Paint Sheen",
        options: [
          { value: "eggshell",   emoji: "🥚",  label: "Eggshell",    description: "Slight sheen, cleanable — best for most rooms",  priceLow: 0,   priceHigh: 0   },
          { value: "satin",      emoji: "✨",  label: "Satin",       description: "Higher sheen — good for kitchens, baths, halls", priceLow: 0,   priceHigh: 0   },
          { value: "semi-gloss", emoji: "💧",  label: "Semi-Gloss",  description: "High moisture areas — walls must be perfect",    priceLow: 100, priceHigh: 300 },
        ],
      },
      // Ceiling
      {
        id: "ceilingTreatment", label: "Ceiling Treatment",
        options: [
          { value: "flat-white",  emoji: "⬜",  label: "Standard Flat White",  description: "Most common — no decision needed",        priceLow: 0,    priceHigh: 0    },
          { value: "tray",        emoji: "⬛",  label: "Tray Ceiling",         description: "Recessed center panel — architectural",   priceLow: 2000, priceHigh: 5000 },
          { value: "match-wall",  emoji: "🎨",  label: "Match Wall Color",     description: "Moody / saturated wraparound look",       priceLow: 0,    priceHigh: 0    },
          { value: "exposed-beam",emoji: "🪵",  label: "Exposed Beams",        description: "Real or faux wood beams",                 priceLow: 3000, priceHigh: 8000 },
        ],
      },
      // Tray: LED in tray?
      {
        id: "trayLed", label: "LED Lighting in Tray",
        showIf: { questionId: "ceilingTreatment", equals: "tray" },
        options: [
          { value: "no",  label: "No LED",   emoji: "⬜",  priceLow: 0,   priceHigh: 0    },
          { value: "yes", label: "LED Cove", emoji: "💡",  priceLow: 800, priceHigh: 2000 },
        ],
      },
      // Specialty wall finish
      {
        id: "specialtyFinish", label: "Specialty Wall Finish",
        options: [
          { value: "none",            emoji: "⬜",  label: "Standard Paint",       description: "Regular latex — no specialty finish",   priceLow: 0,    priceHigh: 0    },
          { value: "limewash",        emoji: "🌿",  label: "Limewash",             description: "Natural texture — accent or full room", priceLow: 1500, priceHigh: 4000 },
          { value: "venetian-plaster",emoji: "✨",  label: "Venetian / Polished Plaster", description: "High-polish luxury — pro applicator", priceLow: 3000, priceHigh: 8000 },
          { value: "wallpaper",       emoji: "📋",  label: "Wallpaper",            description: "Pattern or texture — rooms TBD",        priceLow: 1500, priceHigh: 5000 },
          { value: "shiplap",         emoji: "🪵",  label: "Shiplap / Board & Batten", description: "Wood plank or panel accent wall",  priceLow: 1000, priceHigh: 3500 },
        ],
      },
      // Shiplap orientation
      {
        id: "shiplapOrientation", label: "Shiplap Orientation",
        showIf: { questionId: "specialtyFinish", equals: "shiplap" },
        options: [
          { value: "horizontal", label: "Horizontal (classic)",  emoji: "➡️",  priceLow: 0,   priceHigh: 0   },
          { value: "vertical",   label: "Vertical (modern)",     emoji: "⬆️",  priceLow: 0,   priceHigh: 0   },
          { value: "diagonal",   label: "Diagonal (statement)",  emoji: "↗️",  priceLow: 500, priceHigh: 1200},
        ],
      },
    ],
  },

  // ── 6. Flooring ────────────────────────────────────────────────────────────
  {
    id: "flooring",
    label: "Flooring",
    icon: "🪵",
    appliesTo: ["kitchen", "bathroom", "fullHome", "addition", "flooring"],
    quickOptions: [
      { value: "standard", label: "Standard",  emoji: "🪵",  description: "LVP or engineered HW, straight install",          priceLow: 0,    priceHigh: 0    },
      { value: "upgrade",  label: "Upgrade",   emoji: "⭐",  description: "Site-finished hardwood, premium LVP, or tile",    priceLow: 2000, priceHigh: 6000 },
      { value: "premium",  label: "Premium",   emoji: "✨",  description: "Natural stone, herringbone pattern, radiant heat", priceLow: 6000, priceHigh: 18000},
    ],
    detailedQuestions: [
      // Primary material
      {
        id: "floorMaterial", label: "Primary Flooring Material",
        options: [
          { value: "lvp",         emoji: "🪵",  label: "Luxury Vinyl Plank (LVP)", description: "Waterproof, durable — great for all areas",  priceLow: 0,    priceHigh: 0    },
          { value: "engineered",  emoji: "🌳",  label: "Engineered Hardwood",       description: "Real wood look — stable over concrete",     priceLow: 1500, priceHigh: 4000 },
          { value: "solid-hw",    emoji: "🌲",  label: "Solid Hardwood",            description: "Traditional — nail-down over wood sub",     priceLow: 2000, priceHigh: 6000 },
          { value: "tile",        emoji: "🔲",  label: "Large Format Tile",         description: "Porcelain or ceramic — bath/kitchen focus", priceLow: 1000, priceHigh: 4000 },
          { value: "stone",       emoji: "🪨",  label: "Natural Stone",             description: "Marble, travertine, slate — luxury",        priceLow: 4000, priceHigh: 12000},
          { value: "carpet",      emoji: "🛏️",  label: "Carpet (Bedrooms)",         description: "Soft underfoot — bedrooms only",            priceLow: 500,  priceHigh: 2000 },
          { value: "concrete",    emoji: "⬛",  label: "Polished Concrete",         description: "Industrial/modern — finish + seal",         priceLow: 2000, priceHigh: 6000 },
        ],
      },
      // LVP: wear layer
      {
        id: "lvpWearLayer", label: "LVP Wear Layer",
        showIf: { questionId: "floorMaterial", equals: "lvp" },
        options: [
          { value: "12mil", label: "12 mil — Standard",      emoji: "🪵",  description: "Good for low-traffic residential",       priceLow: 0,   priceHigh: 0   },
          { value: "20mil", label: "20 mil — Heavy Duty",    emoji: "⭐",  description: "Recommended for pets / high traffic",    priceLow: 500, priceHigh: 1200},
          { value: "28mil", label: "28+ mil — Commercial",   emoji: "✨",  description: "Maximum durability",                    priceLow: 1000,priceHigh: 2500},
        ],
      },
      // Engineered HW: finish type
      {
        id: "hwFinish", label: "Hardwood Finish",
        showIf: { questionId: "floorMaterial", equals: ["engineered", "solid-hw"] },
        options: [
          { value: "factory-prefinished", label: "Factory Pre-finished",   emoji: "✅",  description: "Standard — installed as-is",              priceLow: 0,    priceHigh: 0    },
          { value: "site-finished",       label: "Site-Finished (Custom)", emoji: "✨",  description: "Sanded + custom stained on-site",         priceLow: 2000, priceHigh: 5000 },
        ],
      },
      // Engineered HW: surface texture
      {
        id: "hwTexture", label: "Hardwood Surface Texture",
        showIf: { questionId: "floorMaterial", equals: ["engineered", "solid-hw"] },
        options: [
          { value: "smooth",       label: "Smooth",        emoji: "✨",  priceLow: 0,   priceHigh: 0   },
          { value: "wire-brushed", label: "Wire-Brushed",  emoji: "🪵",  priceLow: 300, priceHigh: 800 },
          { value: "hand-scraped", label: "Hand-Scraped",  emoji: "🔨",  priceLow: 500, priceHigh: 1200},
        ],
      },
      // Install pattern
      {
        id: "installPattern", label: "Installation Pattern",
        options: [
          { value: "straight",    emoji: "➡️",  label: "Straight Run",   description: "Standard straight install — most common",   priceLow: 0,    priceHigh: 0    },
          { value: "diagonal",    emoji: "↗️",  label: "Diagonal (45°)", description: "Angled run — elegant, more cut waste",      priceLow: 500,  priceHigh: 1200 },
          { value: "herringbone", emoji: "✨",  label: "Herringbone",    description: "V-pattern — premium labor + waste",         priceLow: 2000, priceHigh: 5000 },
        ],
      },
      // Radiant heat
      {
        id: "radiantHeat", label: "Radiant Floor Heat",
        options: [
          { value: "none",       emoji: "⬜",  label: "None",             description: "No floor heating",                         priceLow: 0,    priceHigh: 0    },
          { value: "bath-only",  emoji: "🔥",  label: "Bathrooms Only",   description: "Electric mat under bathroom tile",          priceLow: 800,  priceHigh: 2500 },
          { value: "multi-zone", emoji: "🌡️",  label: "Multiple Zones",   description: "Bathrooms + kitchen + select living areas", priceLow: 2500, priceHigh: 8000 },
          { value: "whole-home", emoji: "✨",  label: "Whole Home",       description: "Hydronic system — entire home",             priceLow: 8000, priceHigh: 20000},
        ],
      },
      // Stair treatment
      {
        id: "stairTreatment", label: "Staircase (if applicable)",
        options: [
          { value: "na",           emoji: "⬜",  label: "N/A — Single Story", description: "No stairs in scope",                     priceLow: 0,    priceHigh: 0    },
          { value: "match-main",   emoji: "🪵",  label: "Match Main Floor",   description: "Treads match primary floor material",    priceLow: 800,  priceHigh: 2500 },
          { value: "carpet-runner",emoji: "🛏️",  label: "Carpet Runner",      description: "Fabric runner on wood treads",           priceLow: 600,  priceHigh: 1800 },
          { value: "painted",      emoji: "🎨",  label: "Painted Wood",        description: "White or contrasting painted treads",   priceLow: 400,  priceHigh: 1200 },
        ],
      },
    ],
  },

  // ── 7. Tile & Backsplash ───────────────────────────────────────────────────
  {
    id: "tile",
    label: "Tile & Backsplash",
    icon: "🔲",
    appliesTo: ["kitchen", "bathroom", "fullHome", "addition"],
    quickOptions: [
      { value: "standard", label: "Standard",  emoji: "🔲",  description: "Ceramic subway tile, straight pattern",                  priceLow: 0,    priceHigh: 0    },
      { value: "upgrade",  label: "Upgrade",   emoji: "⭐",  description: "Large format porcelain, herringbone, or mosaic accent",  priceLow: 1500, priceHigh: 5000 },
      { value: "premium",  label: "Premium",   emoji: "✨",  description: "Zellige, marble, slab backsplash, heated shower floor",   priceLow: 5000, priceHigh: 15000},
    ],
    detailedQuestions: [
      // Kitchen backsplash material
      {
        id: "bsplashMaterial", label: "Kitchen Backsplash Material",
        options: [
          { value: "none",     emoji: "⬜",  label: "None / Painted Wall",  description: "No backsplash tile",                             priceLow: 0,    priceHigh: 0    },
          { value: "ceramic",  emoji: "🟫",  label: "Ceramic",              description: "Affordable, durable, paintable grout",          priceLow: 800,  priceHigh: 1800 },
          { value: "porcelain",emoji: "⬜",  label: "Porcelain",            description: "Dense, durable, wide pattern range",             priceLow: 1000, priceHigh: 2500 },
          { value: "glass",    emoji: "💎",  label: "Glass",                description: "Reflective, easy to clean",                      priceLow: 1200, priceHigh: 3000 },
          { value: "zellige",  emoji: "✨",  label: "Zellige / Handmade",   description: "Natural variation — artisan look",               priceLow: 2500, priceHigh: 6000 },
          { value: "marble",   emoji: "🪨",  label: "Natural Stone / Marble", description: "Luxury — requires sealing + maintenance",     priceLow: 2000, priceHigh: 6000 },
          { value: "slab",     emoji: "🔲",  label: "Slab (full-height)",   description: "Countertop material continues up wall",         priceLow: 1500, priceHigh: 5000 },
        ],
      },
      // Backsplash pattern
      {
        id: "bsplashPattern", label: "Backsplash Pattern",
        showIf: { questionId: "bsplashMaterial", equals: ["ceramic", "porcelain", "glass", "zellige", "marble"] },
        options: [
          { value: "horizontal",  emoji: "➡️",  label: "Horizontal Brick Offset", description: "Most common subway pattern",              priceLow: 0,   priceHigh: 0    },
          { value: "vertical",    emoji: "⬆️",  label: "Vertical Stack",          description: "More graphic, modern feel",               priceLow: 200, priceHigh: 500  },
          { value: "herringbone", emoji: "✨",  label: "Herringbone",             description: "V-pattern — premium labor + waste",        priceLow: 600, priceHigh: 1500 },
          { value: "chevron",     emoji: "🔺",  label: "Chevron",                 description: "Pointed — very modern",                    priceLow: 700, priceHigh: 1800 },
        ],
      },
      // Backsplash extent
      {
        id: "bsplashExtent", label: "Backsplash Extent",
        showIf: { questionId: "bsplashMaterial", equals: ["ceramic", "porcelain", "glass", "zellige", "marble", "slab"] },
        options: [
          { value: "standard-height", emoji: "▬",  label: "Counter to Upper Cabinet", description: "Standard height — most common",      priceLow: 0,   priceHigh: 0    },
          { value: "full-height",     emoji: "⬆️",  label: "Full Height to Ceiling",  description: "Seamless look — especially with open shelving", priceLow: 800, priceHigh: 2500 },
          { value: "accent-only",     emoji: "✨",  label: "Range / Hood Accent Only", description: "Statement tile behind range only",   priceLow: 400, priceHigh: 1200 },
        ],
      },
      // Grout type
      {
        id: "groutType", label: "Grout Type",
        showIf: { questionId: "bsplashMaterial", equals: ["ceramic", "porcelain", "glass", "zellige", "marble"] },
        options: [
          { value: "cement-match",    emoji: "✅",  label: "Cement — Matching",     description: "Blends in — tile reads as one field",   priceLow: 0,   priceHigh: 0   },
          { value: "cement-contrast", emoji: "🔲",  label: "Cement — Contrasting",  description: "Grid shows — graphic look",             priceLow: 0,   priceHigh: 0   },
          { value: "epoxy",           emoji: "🛡️",  label: "Epoxy (Non-Porous)",    description: "Stain-resistant — best for kitchens",   priceLow: 300, priceHigh: 800 },
        ],
      },
      // Primary shower wall tile
      {
        id: "showerWallTile", label: "Primary Shower Wall Tile",
        options: [
          { value: "ceramic-standard", emoji: "🔲",  label: "Ceramic — Standard",       description: "Reliable, affordable",                    priceLow: 0,    priceHigh: 0    },
          { value: "large-porcelain",  emoji: "⬜",  label: "Large Format Porcelain",   description: "24\"×48\"+ — nearly seamless look",       priceLow: 1000, priceHigh: 3000 },
          { value: "marble",           emoji: "🪨",  label: "Natural Marble / Stone",   description: "Luxury — requires sealing",               priceLow: 2000, priceHigh: 6000 },
          { value: "zellige",          emoji: "✨",  label: "Zellige",                  description: "Handmade — artisan character",             priceLow: 2000, priceHigh: 5000 },
        ],
      },
      // Shower niche
      {
        id: "showerNiche", label: "Shower Niche (Built-In Shelf)",
        options: [
          { value: "none",    emoji: "⬜",  label: "None",          description: "No built-in niche",                  priceLow: 0,   priceHigh: 0   },
          { value: "single",  emoji: "🔲",  label: "Single Niche",  description: "One built-in tiled shelf niche",     priceLow: 400, priceHigh: 900 },
          { value: "double",  emoji: "🔲🔲",label: "Double Niche",  description: "Two built-in tiled shelf niches",    priceLow: 700, priceHigh: 1600},
        ],
      },
      // Shower niche LED
      {
        id: "nicheLight", label: "Niche Lighting",
        showIf: { questionId: "showerNiche", equals: ["single", "double"] },
        options: [
          { value: "none", label: "No lighting",  emoji: "⬜", priceLow: 0,   priceHigh: 0   },
          { value: "led",  label: "LED Strip (waterproof)", emoji: "💡", notes: "Must be IP67+ rated", priceLow: 300, priceHigh: 700 },
        ],
      },
      // Shower bench
      {
        id: "showerBench", label: "Shower Bench",
        options: [
          { value: "none",       emoji: "⬜",  label: "None",               description: "No bench",                             priceLow: 0,   priceHigh: 0    },
          { value: "full-width", emoji: "🪑",  label: "Built-In Full Width", description: "Tiled bench — full shower width",     priceLow: 600, priceHigh: 1400 },
          { value: "corner",     emoji: "🔺",  label: "Corner Bench",        description: "Triangle corner bench — tiled",       priceLow: 500, priceHigh: 1200 },
          { value: "teak",       emoji: "🪵",  label: "Teak Float-In",       description: "Client provides teak bench (no build)", priceLow: 0,  priceHigh: 0    },
        ],
      },
      // Shower heated floor
      {
        id: "showerHeatedFloor", label: "Heated Shower Floor",
        options: [
          { value: "no",  emoji: "⬜",  label: "No",  description: "Standard shower floor",                    priceLow: 0,   priceHigh: 0    },
          { value: "yes", emoji: "🔥",  label: "Yes", description: "Electric radiant mat under shower floor",  priceLow: 600, priceHigh: 1500 },
        ],
      },
    ],
  },

  // ── 8. Countertops ─────────────────────────────────────────────────────────
  {
    id: "countertops",
    label: "Countertops",
    icon: "🥄",
    appliesTo: ["kitchen", "bathroom", "fullHome", "addition"],
    quickOptions: [
      { value: "standard", label: "Standard",  emoji: "🥄",  description: "Quartz or laminate — standard edge, undermount",      priceLow: 0,    priceHigh: 0    },
      { value: "upgrade",  label: "Upgrade",   emoji: "⭐",  description: "Premium quartz, granite, or Dekton",                  priceLow: 2000, priceHigh: 6000 },
      { value: "premium",  label: "Premium",   emoji: "✨",  description: "Marble, quartzite, or waterfall island edge",         priceLow: 6000, priceHigh: 18000},
    ],
    detailedQuestions: [
      // Kitchen counter material
      {
        id: "ctMaterial", label: "Kitchen Countertop Material",
        options: [
          { value: "laminate",   emoji: "▪️",  label: "Laminate",              description: "Budget-friendly — printed surface",       priceLow: 0,    priceHigh: 0    },
          { value: "quartz",     emoji: "⬜",  label: "Quartz (Engineered)",   description: "Durable, non-porous — no sealing needed", priceLow: 2000, priceHigh: 5000 },
          { value: "granite",    emoji: "🪨",  label: "Granite",               description: "Natural stone — requires annual sealing", priceLow: 2500, priceHigh: 6000 },
          { value: "marble",     emoji: "🤍",  label: "Marble",                description: "Luxury — etches with acids; high maintenance", priceLow: 4000, priceHigh: 10000 },
          { value: "quartzite",  emoji: "💎",  label: "Quartzite",             description: "Harder than marble, natural — slab selection required", priceLow: 4000, priceHigh: 10000 },
          { value: "dekton",     emoji: "🔲",  label: "Dekton / Sintered",     description: "Ultra-hard, heat & scratch-resistant",   priceLow: 3500, priceHigh: 9000  },
          { value: "butcher",    emoji: "🪵",  label: "Butcher Block / Wood",  description: "Warm, natural — needs periodic oiling",  priceLow: 1500, priceHigh: 4000  },
        ],
      },
      // Quartz veining
      {
        id: "quartzVeining", label: "Quartz Veining Style",
        showIf: { questionId: "ctMaterial", equals: "quartz" },
        options: [
          { value: "none",     label: "Solid / No Veining",   emoji: "⬜",  priceLow: 0,   priceHigh: 0   },
          { value: "subtle",   label: "Subtle Veining",       emoji: "〰️",  priceLow: 0,   priceHigh: 0   },
          { value: "dramatic", label: "Bold / Dramatic Veins",emoji: "✨",  priceLow: 500, priceHigh: 1500},
        ],
      },
      // Marble: client accepts maintenance
      {
        id: "marbleAccept", label: "Marble Maintenance Acceptance",
        showIf: { questionId: "ctMaterial", equals: "marble" },
        notes: "Marble etches with citrus, wine, and acids. Client must understand and accept this.",
        options: [
          { value: "accepts",  label: "Accept natural patina over time",  emoji: "✅",  priceLow: 0, priceHigh: 0 },
          { value: "honed",    label: "Use honed finish — hides etching better", emoji: "🤍", priceLow: 200, priceHigh: 500 },
        ],
      },
      // Island waterfall edge
      {
        id: "waterfallEdge", label: "Island Waterfall Edge",
        options: [
          { value: "none",       emoji: "⬜",  label: "No Waterfall",       description: "Standard overhang edge",                   priceLow: 0,    priceHigh: 0    },
          { value: "one-side",   emoji: "↩️",  label: "One Side",           description: "Waterfall on seating side only",           priceLow: 1500, priceHigh: 3500 },
          { value: "both-sides", emoji: "↔️",  label: "Both Sides",         description: "Full waterfall — requires bookmatched slab", priceLow: 3000, priceHigh: 7000 },
        ],
      },
      // Edge profile
      {
        id: "edgeProfile", label: "Edge Profile",
        options: [
          { value: "eased",     emoji: "➖",  label: "Eased (Micro-Bevel)",  description: "Clean, sharp — modern standard",     priceLow: 0,   priceHigh: 0    },
          { value: "beveled",   emoji: "◢",   label: "Beveled",              description: "Angled chamfer edge",                priceLow: 0,   priceHigh: 0    },
          { value: "bullnose",  emoji: "⭕",  label: "Bullnose",             description: "Fully rounded — traditional",        priceLow: 0,   priceHigh: 0    },
          { value: "mitered",   emoji: "✨",  label: "Mitered / Thick-Look", description: "Stacked 2-layer for dramatic depth", priceLow: 800, priceHigh: 2500 },
        ],
      },
      // Sink cutout
      {
        id: "sinkCutout", label: "Sink Integration",
        options: [
          { value: "undermount",  emoji: "🚰",  label: "Undermount",              description: "Stone overhangs sink rim — most popular",  priceLow: 0,   priceHigh: 0    },
          { value: "farmhouse",   emoji: "🏡",  label: "Farmhouse / Apron Front", description: "Countertop cut back — cabinet mod required", priceLow: 500, priceHigh: 1200 },
          { value: "integrated",  emoji: "✨",  label: "Integrated (Same Material)", description: "No seam between sink and counter",       priceLow: 800, priceHigh: 2000 },
        ],
      },
    ],
  },

  // ── 9. Cabinetry ───────────────────────────────────────────────────────────
  {
    id: "cabinetry",
    label: "Cabinetry",
    icon: "🗄️",
    appliesTo: ["kitchen", "bathroom", "fullHome", "addition"],
    quickOptions: [
      { value: "standard", label: "Standard",  emoji: "🗄️",  description: "Shaker style, painted, stock hardware",                priceLow: 0,    priceHigh: 0    },
      { value: "upgrade",  label: "Upgrade",   emoji: "⭐",  description: "Two-tone, semi-custom, designer hardware",             priceLow: 3000, priceHigh: 8000 },
      { value: "premium",  label: "Premium",   emoji: "✨",  description: "Custom millwork, glass inserts, full soft-close org", priceLow: 8000, priceHigh: 25000},
    ],
    detailedQuestions: [
      // Door style
      {
        id: "cabDoorStyle", label: "Cabinet Door Style",
        options: [
          { value: "shaker",         emoji: "🗄️",  label: "Shaker (5-Piece)",    description: "Most popular — works painted or stained",    priceLow: 0,    priceHigh: 0    },
          { value: "flat-mdf",       emoji: "▪️",   label: "Flat / Slab (MDF)",  description: "Ultra-smooth — paint only",                  priceLow: 0,    priceHigh: 0    },
          { value: "raised-panel",   emoji: "🔲",   label: "Raised Panel",        description: "Traditional — works best stained",           priceLow: 500,  priceHigh: 2000 },
          { value: "glass-upper",    emoji: "🪟",   label: "Glass Inserts (Uppers)", description: "Clear or reeded glass in upper doors",  priceLow: 1500, priceHigh: 4000 },
          { value: "open-shelving",  emoji: "📚",   label: "Open Shelving (Some Uppers)", description: "Remove uppers — floating shelves",  priceLow: 500,  priceHigh: 2000 },
        ],
      },
      // Glass insert type
      {
        id: "glassInsertType", label: "Glass Insert Type",
        showIf: { questionId: "cabDoorStyle", equals: "glass-upper" },
        options: [
          { value: "clear",    emoji: "🪟",  label: "Clear Tempered",    priceLow: 0,   priceHigh: 0   },
          { value: "reeded",   emoji: "🌊",  label: "Reeded / Fluted",   priceLow: 400, priceHigh: 900 },
          { value: "frosted",  emoji: "🌫️",  label: "Frosted",           priceLow: 200, priceHigh: 500 },
          { value: "seeded",   emoji: "✨",  label: "Seeded / Bubble",   priceLow: 300, priceHigh: 700 },
        ],
      },
      // Cabinet color
      {
        id: "cabColor", label: "Cabinet Color",
        options: [
          { value: "white",      emoji: "⬜",  label: "White / Off-White",    description: "Bright or warm white throughout",          priceLow: 0,    priceHigh: 0    },
          { value: "two-tone",   emoji: "🎨",  label: "Two-Tone",             description: "Upper color + different lower/island color", priceLow: 500,  priceHigh: 1500 },
          { value: "wood-stain", emoji: "🪵",  label: "Natural Wood / Stain", description: "Real wood species — stained finish",       priceLow: 2000, priceHigh: 6000 },
          { value: "bold",       emoji: "🎨",  label: "Bold Color",           description: "Navy, forest green, sage, black, etc.",    priceLow: 200,  priceHigh: 600  },
        ],
      },
      // Wood species for stained cabinets
      {
        id: "cabWoodSpecies", label: "Cabinet Wood Species",
        showIf: { questionId: "cabColor", equals: "wood-stain" },
        options: [
          { value: "white-oak", emoji: "🌳",  label: "White Oak",   description: "Open grain — most popular currently",  priceLow: 0,    priceHigh: 0    },
          { value: "maple",     emoji: "🍁",  label: "Maple",       description: "Fine, consistent grain",               priceLow: 0,    priceHigh: 0    },
          { value: "walnut",    emoji: "🟫",  label: "Walnut",      description: "Dark, rich — premium species",         priceLow: 2000, priceHigh: 5000 },
          { value: "hickory",   emoji: "🪵",  label: "Hickory",     description: "Pronounced grain — rustic character",  priceLow: 0,    priceHigh: 0    },
        ],
      },
      // Cabinet height to ceiling
      {
        id: "cabHeight", label: "Upper Cabinet Height",
        options: [
          { value: "standard-with-soffit", emoji: "▬",  label: "Standard (gap to ceiling)", description: "Space above cabinets — standard builder", priceLow: 0,   priceHigh: 0    },
          { value: "full-to-ceiling",      emoji: "⬆️",  label: "Full Height to Ceiling",   description: "No soffit — more storage, cleaner look",  priceLow: 800, priceHigh: 2500 },
        ],
      },
      // Interior organization
      {
        id: "cabOrganization", label: "Cabinet Interior Organization",
        options: [
          { value: "standard",    emoji: "🗄️",  label: "Standard Shelves",      description: "Fixed shelves — no pull-outs",              priceLow: 0,    priceHigh: 0    },
          { value: "pull-outs",   emoji: "↔️",   label: "Pull-Out Shelves",      description: "Drawer-style pull-outs in base cabinets",   priceLow: 800,  priceHigh: 2500 },
          { value: "full-org",    emoji: "✨",   label: "Full Organization Package", description: "Pull-outs, lazy Susan, pantry pull-outs, trash", priceLow: 2000, priceHigh: 5000 },
        ],
      },
      // Hardware
      {
        id: "cabHardware", label: "Cabinet Hardware",
        options: [
          { value: "basic",       emoji: "🔩",  label: "Basic Knobs / Pulls",   description: "Simple coordinated hardware",              priceLow: 0,   priceHigh: 0    },
          { value: "bar-pull",    emoji: "➖",  label: "Bar Pulls",             description: "Sleek linear pulls — 5\"–12\" length",     priceLow: 400, priceHigh: 1000 },
          { value: "no-hardware", emoji: "✨",  label: "No Hardware (Push-to-Open)", description: "Clean look — integrated push mechanism", priceLow: 600, priceHigh: 1500 },
        ],
      },
    ],
  },

  // ── 10. Plumbing Fixtures ──────────────────────────────────────────────────
  {
    id: "plumbing",
    label: "Plumbing Fixtures",
    icon: "🚰",
    appliesTo: ["kitchen", "bathroom", "fullHome", "addition"],
    quickOptions: [
      { value: "standard", label: "Standard",  emoji: "🚰",  description: "Chrome or brushed nickel — builder-grade",           priceLow: 0,    priceHigh: 0    },
      { value: "upgrade",  label: "Upgrade",   emoji: "⭐",  description: "Matte black or brushed gold, mid-range brands",      priceLow: 1500, priceHigh: 4500 },
      { value: "premium",  label: "Premium",   emoji: "✨",  description: "Luxury brands, smart valves, freestanding tub filler",priceLow: 4500, priceHigh: 14000},
    ],
    detailedQuestions: [
      // Fixture finish
      {
        id: "fixtureFinish", label: "Fixture Finish Throughout",
        options: [
          { value: "brushed-nickel", emoji: "🔩",  label: "Brushed Nickel",     description: "Timeless — coordinates broadly",         priceLow: 0,   priceHigh: 0    },
          { value: "matte-black",    emoji: "⬛",  label: "Matte Black",        description: "Modern, high-contrast",                  priceLow: 500, priceHigh: 1500 },
          { value: "brushed-gold",   emoji: "🥇",  label: "Brushed Gold / Brass", description: "Warm, on-trend — coordinates with wood", priceLow: 800, priceHigh: 2500 },
          { value: "chrome",         emoji: "✨",  label: "Polished Chrome",    description: "Classic, bright — high contrast on dark", priceLow: 0,   priceHigh: 0    },
          { value: "mixing",         emoji: "🎨",  label: "Mixed Metals",       description: "Two finishes by zone (kitchen vs. baths)", priceLow: 200, priceHigh: 600  },
        ],
      },
      // Gold: lacquered?
      {
        id: "goldFinishType", label: "Gold Finish Type",
        showIf: { questionId: "fixtureFinish", equals: "brushed-gold" },
        options: [
          { value: "lacquered",    label: "Lacquered (consistent appearance)",   emoji: "✨",  priceLow: 0,   priceHigh: 0   },
          { value: "unlacquered",  label: "Unlacquered (living finish — patinas)",emoji: "🟡",  priceLow: 300, priceHigh: 800 },
        ],
      },
      // Kitchen sink type
      {
        id: "kitchenSink", label: "Kitchen Sink Type",
        options: [
          { value: "stainless",   emoji: "🥣",  label: "Stainless Steel",      description: "Standard undermount — 16 or 18 gauge",        priceLow: 0,    priceHigh: 0    },
          { value: "farmhouse",   emoji: "🏡",  label: "Farmhouse / Apron",    description: "Fireclay or cast iron — cabinet mod required", priceLow: 800,  priceHigh: 2500 },
          { value: "composite",   emoji: "⬛",  label: "Composite Granite",    description: "Very durable — black or grey",                 priceLow: 300,  priceHigh: 900  },
          { value: "integrated",  emoji: "✨",  label: "Integrated (Same as Counter)", description: "Seamless — no visible seam",            priceLow: 1200, priceHigh: 3000 },
        ],
      },
      // Pot filler
      {
        id: "potFiller", label: "Pot Filler (Over Range)",
        options: [
          { value: "none", label: "None",     emoji: "⬜", priceLow: 0,   priceHigh: 0    },
          { value: "yes",  label: "Add One",  emoji: "🚿", description: "Wall-mount double-jointed faucet above range", priceLow: 800, priceHigh: 1800 },
        ],
      },
      // Primary bath tub type
      {
        id: "tubType", label: "Primary Bathroom Tub",
        options: [
          { value: "alcove",        emoji: "🛁",  label: "Alcove / Built-In",    description: "3-wall surround — standard",                  priceLow: 0,    priceHigh: 0    },
          { value: "freestanding",  emoji: "✨",  label: "Freestanding",          description: "Statement soaking tub — floor filler",       priceLow: 2000, priceHigh: 6000 },
          { value: "air-jets",      emoji: "💧",  label: "Air Jets / Whirlpool",  description: "Jetted soaking — dedicated 20A circuit",     priceLow: 1500, priceHigh: 5000 },
          { value: "none",          emoji: "🚿",  label: "No Tub — Shower Only",  description: "Skip tub, maximize shower size",             priceLow: 0,    priceHigh: 0    },
        ],
      },
      // Freestanding filler
      {
        id: "fsFillerType", label: "Freestanding Tub Filler",
        showIf: { questionId: "tubType", equals: "freestanding" },
        options: [
          { value: "floor-mount", emoji: "✨",  label: "Floor-Mount Filler",  description: "Most dramatic — floor rough-in required",  priceLow: 800,  priceHigh: 2500 },
          { value: "wall-mount",  emoji: "🚿",  label: "Wall-Mount Filler",   description: "Cleaner look — wall rough-in required",    priceLow: 600,  priceHigh: 1800 },
        ],
      },
      // Shower valve type
      {
        id: "showerValve", label: "Shower Valve / Controls",
        options: [
          { value: "pressure-balance", emoji: "🚿",  label: "Pressure Balance (Standard)", description: "Code-required — temperature stable",        priceLow: 0,    priceHigh: 0    },
          { value: "thermostatic",     emoji: "🌡️",  label: "Thermostatic",                description: "Set exact temperature — luxury upgrade",    priceLow: 1500, priceHigh: 4000 },
          { value: "digital-smart",    emoji: "📱",  label: "Digital / Smart Valve",       description: "App-preheat, voice control — Kohler/Moen",  priceLow: 3000, priceHigh: 8000 },
        ],
      },
      // Shower: curbless or curb
      {
        id: "showerEntry", label: "Shower Entry",
        options: [
          { value: "curb",      emoji: "▬",   label: "Curb (Standard)",      description: "3\"–4\" raised curb",                        priceLow: 0,   priceHigh: 0    },
          { value: "curbless",  emoji: "✨",   label: "Curbless / Walk-In",   description: "Zero threshold — linear drain required",    priceLow: 800, priceHigh: 2500 },
        ],
      },
      // Steam shower
      {
        id: "steamShower", label: "Steam Shower",
        options: [
          { value: "no",  label: "No Steam",     emoji: "🚿",  priceLow: 0,    priceHigh: 0    },
          { value: "yes", label: "Yes — Steam",  emoji: "💨",  description: "Generator + sealed door + porcelain tile required", priceLow: 3500, priceHigh: 8000 },
        ],
      },
    ],
  },

  // ── 11. Shelving & Built-Ins ───────────────────────────────────────────────
  {
    id: "shelving",
    label: "Shelving & Built-Ins",
    icon: "📚",
    appliesTo: ["kitchen", "bathroom", "fullHome", "addition"],
    quickOptions: [
      { value: "standard", label: "Standard",  emoji: "📚",  description: "Basic floating shelves where applicable",              priceLow: 0,    priceHigh: 0    },
      { value: "upgrade",  label: "Upgrade",   emoji: "⭐",  description: "Custom media wall or fireplace built-in",             priceLow: 3000, priceHigh: 8000 },
      { value: "premium",  label: "Premium",   emoji: "✨",  description: "Floor-to-ceiling built-ins, coffered, custom mantel", priceLow: 8000, priceHigh: 25000},
    ],
    detailedQuestions: [
      // Floating shelves
      {
        id: "floatingShelves", label: "Floating Shelves",
        options: [
          { value: "none",       emoji: "⬜",  label: "None",                 description: "No floating shelves",                     priceLow: 0,   priceHigh: 0    },
          { value: "kitchen",    emoji: "🍽️",  label: "Kitchen / Pantry",     description: "Open shelving in kitchen or pantry",       priceLow: 600, priceHigh: 2000 },
          { value: "throughout", emoji: "📚",  label: "Throughout Home",      description: "Multiple areas — living, hallways, etc.",  priceLow: 1500,priceHigh: 5000 },
        ],
      },
      // Shelf material
      {
        id: "shelfMaterial", label: "Shelf Material",
        showIf: { questionId: "floatingShelves", equals: ["kitchen", "throughout"] },
        options: [
          { value: "white-oak",  emoji: "🌳",  label: "White Oak",           description: "Natural wood — most popular",            priceLow: 0,   priceHigh: 0   },
          { value: "walnut",     emoji: "🪵",  label: "Walnut",              description: "Dark, luxury",                           priceLow: 400, priceHigh: 1000},
          { value: "mdf-painted",emoji: "⬜",  label: "MDF (Painted)",       description: "Smooth, affordable",                     priceLow: 0,   priceHigh: 0   },
          { value: "live-edge",  emoji: "✨",  label: "Live Edge",           description: "Natural irregular edge — statement piece", priceLow: 800, priceHigh: 2500},
        ],
      },
      // Media wall / TV niche
      {
        id: "mediaWall", label: "Media Wall / TV Niche",
        options: [
          { value: "none",         emoji: "⬜",  label: "None",                   description: "TV wall-mounted without built-in",            priceLow: 0,    priceHigh: 0    },
          { value: "simple-niche", emoji: "📺",  label: "Recessed TV Niche",      description: "Flush niche with cord routing",               priceLow: 1500, priceHigh: 4000 },
          { value: "full-builtin", emoji: "✨",  label: "Full Built-In Wall Unit", description: "Cabinets below, shelves flanking TV",        priceLow: 4000, priceHigh: 12000},
        ],
      },
      // TV placement
      {
        id: "tvPlacement", label: "TV Placement",
        showIf: { questionId: "mediaWall", equals: ["simple-niche", "full-builtin"] },
        notes: "Above fireplace may cause uncomfortable viewing angle — JMK to advise.",
        options: [
          { value: "wall-standard",    emoji: "📺",  label: "Standard Wall",         description: "Eye-level — most comfortable viewing",    priceLow: 0,   priceHigh: 0   },
          { value: "above-fireplace",  emoji: "🔥",  label: "Above Fireplace",       description: "Popular but can strain neck — confirm",   priceLow: 300, priceHigh: 800 },
        ],
      },
      // Fireplace mantel
      {
        id: "fireplace", label: "Fireplace Mantel (if applicable)",
        options: [
          { value: "na",           emoji: "⬜",  label: "No Fireplace",            description: "No fireplace in scope",                       priceLow: 0,    priceHigh: 0     },
          { value: "floating-shelf",emoji: "📏", label: "Simple Floating Shelf",   description: "Single mantel shelf — minimal",               priceLow: 400,  priceHigh: 1200  },
          { value: "traditional",  emoji: "🏛️",  label: "Traditional Built-Up Surround", description: "Columns + mantel + overmantel",         priceLow: 3000, priceHigh: 8000  },
          { value: "floor-ceiling",emoji: "✨",  label: "Floor-to-Ceiling Surround", description: "Full architectural statement surround",   priceLow: 6000, priceHigh: 18000 },
        ],
      },
    ],
  },

  // ── 12. Closet & Storage ───────────────────────────────────────────────────
  {
    id: "closet",
    label: "Closet & Storage",
    icon: "👔",
    appliesTo: ["fullHome", "addition"],
    quickOptions: [
      { value: "standard", label: "Standard",  emoji: "👔",  description: "Wire shelving or basic modular system",              priceLow: 0,    priceHigh: 0    },
      { value: "upgrade",  label: "Upgrade",   emoji: "⭐",  description: "Custom melamine system — drawers, shoe shelves",    priceLow: 2500, priceHigh: 6000 },
      { value: "premium",  label: "Premium",   emoji: "✨",  description: "Full custom carpentry — island, LED, specialty org", priceLow: 6000, priceHigh: 18000},
    ],
    detailedQuestions: [
      // Primary closet system
      {
        id: "primaryClosetSystem", label: "Primary Walk-In Closet System",
        options: [
          { value: "wire",        emoji: "🔗",  label: "Wire Shelving",          description: "Basic ClosetMaid / Schulte system",        priceLow: 0,    priceHigh: 0    },
          { value: "modular",     emoji: "🗄️",  label: "Modular System",         description: "California Closets / similar — melamine",  priceLow: 2000, priceHigh: 5000 },
          { value: "custom-built",emoji: "✨",  label: "Custom Site-Built",      description: "Carpentry — painted MDF or real wood",     priceLow: 4000, priceHigh: 12000},
        ],
      },
      // Closet layout
      {
        id: "closetLayout", label: "Primary Closet Layout",
        showIf: { questionId: "primaryClosetSystem", equals: ["modular", "custom-built"] },
        options: [
          { value: "straight",  emoji: "➖",  label: "Straight / One-Wall",  description: "One wall of built-ins",             priceLow: 0,    priceHigh: 0    },
          { value: "l-shape",   emoji: "⌐",   label: "L-Shape (Two Walls)",  description: "Two walls",                         priceLow: 500,  priceHigh: 1500 },
          { value: "u-shape",   emoji: "⊓",   label: "U-Shape (Three Walls)", description: "Full walk-in — most storage",      priceLow: 1000, priceHigh: 3000 },
        ],
      },
      // Island in closet
      {
        id: "closetIsland", label: "Center Island",
        showIf: { questionId: "closetLayout", equals: "u-shape" },
        options: [
          { value: "no",  label: "No Island",  emoji: "⬜",  priceLow: 0,    priceHigh: 0    },
          { value: "yes", label: "Add Island",  emoji: "✨",  description: "Center island with drawers + jewelry display top", priceLow: 2000, priceHigh: 5000 },
        ],
      },
      // Closet features
      {
        id: "closetFeatures", label: "Organization Features",
        showIf: { questionId: "primaryClosetSystem", equals: ["modular", "custom-built"] },
        options: [
          { value: "basic",    emoji: "🗄️",  label: "Basic (Rods + Shelves)", description: "Standard hanging + fixed shelves",              priceLow: 0,    priceHigh: 0    },
          { value: "drawers",  emoji: "📦",  label: "Drawers + Shoe Tower",   description: "Built-in drawers + angled shoe shelving",       priceLow: 1000, priceHigh: 3000 },
          { value: "full-org", emoji: "✨",  label: "Full Package",           description: "Drawers, shoe tower, hamper, valet rod, bench", priceLow: 2500, priceHigh: 7000 },
        ],
      },
      // Closet lighting
      {
        id: "closetLighting", label: "Closet Lighting",
        options: [
          { value: "standard",  emoji: "💡",  label: "Standard Overhead",        description: "Ceiling light on wall switch",                 priceLow: 0,   priceHigh: 0   },
          { value: "motion-led",emoji: "✨",  label: "Motion-Activated LED",     description: "Auto-on strips under shelves + recessed",     priceLow: 400, priceHigh: 1000},
        ],
      },
      // Secondary closets
      {
        id: "secondaryClosets", label: "Secondary Bedroom Closets",
        options: [
          { value: "wire",          emoji: "🔗",  label: "Wire Shelving",          description: "Basic wire system throughout",                  priceLow: 0,    priceHigh: 0    },
          { value: "double-hang",   emoji: "👗",  label: "Double Hang + Shelves",  description: "Two rods + shelf tower in each closet",         priceLow: 500,  priceHigh: 1500 },
          { value: "modular",       emoji: "🗄️",  label: "Modular Systems",        description: "Coordinated modular system in all bedrooms",    priceLow: 1500, priceHigh: 4000 },
        ],
      },
      // Pantry configuration
      {
        id: "pantryType", label: "Pantry",
        options: [
          { value: "none",         emoji: "⬜",  label: "No Pantry",           description: "No dedicated pantry space",                    priceLow: 0,   priceHigh: 0    },
          { value: "reach-in",     emoji: "🚪",  label: "Reach-In Pantry",     description: "Adjustable shelves + door organizer",          priceLow: 400, priceHigh: 1200 },
          { value: "walk-in",      emoji: "🚪✨", label: "Walk-In Pantry",      description: "Full walk-in with shelving + pull-outs",       priceLow: 1500,priceHigh: 5000 },
        ],
      },
    ],
  },
];

// ── Helper: get applicable categories for a project type + mode ────────────

export function getFinishCategories(
  projectType: ProjectType,
  _inputMode: InputMode
): FinishCategory[] {
  return FINISHES_CONFIG.filter((c) => c.appliesTo.includes(projectType));
}

/** Check if a detailed question is currently visible given stored answers */
export function isFinishQuestionVisible(
  question: FinishQuestion,
  answers: Record<string, string>,
  categoryId: string
): boolean {
  if (!question.showIf) return true;
  const parentKey = `${categoryId}.${question.showIf.questionId}`;
  const parentAnswer = answers[parentKey];
  if (parentAnswer === undefined) return false;
  const { equals } = question.showIf;
  return Array.isArray(equals) ? equals.includes(parentAnswer) : parentAnswer === equals;
}
