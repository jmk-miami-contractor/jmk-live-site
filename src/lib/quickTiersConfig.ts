// ✏️  EDITABLE CONTENT FILE — Quick Estimate Tier Cards
//
// Open this file in any text editor to:
//   • Change the tier name, tagline, or bullet points
//   • Swap photos: drop new JPGs into /public/finishes-tiers/ and update the `photo` path below
//
// Photo path starts from /public — e.g. "/finishes-tiers/standard.jpg"

export interface QuickTier {
  value: "standard" | "upgrade" | "premium";
  label: string;
  tagline: string;
  bullets: string[];
  photo: string;
}

export const QUICK_TIERS: QuickTier[] = [
  {
    value: "standard",
    label: "Standard",
    tagline: "Clean, functional & timeless",
    bullets: [
      "Shaker cabinets, painted finish",
      "LVP or porcelain tile flooring",
      "Quartz-look laminate countertops",
      "Moen/Delta fixtures, white Decora plates",
    ],
    photo: "/finishes-tiers/standard.jpg",
  },
  {
    value: "upgrade",
    label: "Upgrade",
    tagline: "Elevated everyday living",
    bullets: [
      "Semi-custom cabinetry, two-tone options",
      "Engineered hardwood or designer tile",
      "Mid-grade quartz countertops",
      "Designer fixtures, dimmers, USB outlets",
    ],
    photo: "/finishes-tiers/upgrade.jpg",
  },
  {
    value: "premium",
    label: "Premium",
    tagline: "Custom luxury, no compromises",
    bullets: [
      "Full custom millwork & built-ins",
      "Natural stone or large-format porcelain",
      "Waterfall island, book-matched stone",
      "Whole-home dimming, smart switches, designer plumbing",
    ],
    photo: "/finishes-tiers/premium.jpg",
  },
];
