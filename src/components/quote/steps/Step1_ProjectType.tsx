"use client";

import type { ProjectType } from "@/lib/quoteTypes";

const interiorTypes: { type: ProjectType; label: string; emoji: string; desc: string }[] = [
  { type: "kitchen", label: "Kitchen Remodel", emoji: "🍳", desc: "Cabinets, counters, appliances" },
  { type: "bathroom", label: "Bathroom Remodel", emoji: "🚿", desc: "Tile, fixtures, walk-in showers" },
  { type: "fullHome", label: "Full Home Remodel", emoji: "🏠", desc: "Whole-house renovations" },
  { type: "addition", label: "Addition / Room Build", emoji: "🔨", desc: "New rooms, ADUs, second stories" },
  { type: "flooring", label: "Flooring", emoji: "🪵", desc: "Hardwood, LVP, tile, carpet" },
  { type: "windowsDoors", label: "Windows & Doors", emoji: "🪟", desc: "Impact, triple-pane, custom" },
  { type: "lighting", label: "Lighting", emoji: "💡", desc: "Recessed, fixtures, panel upgrades" },
  { type: "lowVoltage", label: "Low Voltage", emoji: "📡", desc: "Smart home, AV, security" },
];

const exteriorTypes: { type: ProjectType; label: string; emoji: string; desc: string }[] = [
  { type: "roofing",    label: "Roofing",    emoji: "🏗️", desc: "Asphalt, metal, tile, membrane" },
  { type: "hardscape",  label: "Hardscape",  emoji: "🪨", desc: "Pavers, driveway, exterior tile" },
  { type: "fencing",    label: "Fencing",    emoji: "🔩", desc: "Wood, vinyl, aluminum, iron" },
  // Deactivated — re-add to restore:
  // { type: "outdoorKitchen", label: "Outdoor Kitchen", emoji: "🔥", desc: "Built-in grills, counters, covered" },
  // { type: "pool", label: "Pool", emoji: "🏊", desc: "Concrete, fiberglass, spa & decking" },
  // { type: "patioPergola", label: "Patio / Pergola", emoji: "☀️", desc: "Pavers, travertine, wood decks" },
  // { type: "exteriorCladding", label: "Exterior Cladding", emoji: "🧱", desc: "Stucco, stone, brick, siding" },
];

interface Props {
  selected: ProjectType[];
  onChange: (types: ProjectType[]) => void;
}

function TypeCard({ item, selected, onToggle }: { item: typeof interiorTypes[0]; selected: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle}
      className={`relative flex flex-col items-start text-left p-4 rounded-xl border-2 transition-all
        ${selected ? "border-brand-accent bg-brand-primary text-white" : "border-brand-light/40 bg-white text-brand-primary hover:border-brand-accent"}`}>
      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-brand-accent flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
      <span className="text-2xl mb-2">{item.emoji}</span>
      <span className="font-semibold text-sm">{item.label}</span>
      <span className={`text-xs mt-0.5 ${selected ? "text-white/60" : "text-brand-primary/50"}`}>{item.desc}</span>
    </button>
  );
}

export default function Step1_ProjectType({ selected, onChange }: Props) {
  const toggle = (type: ProjectType) =>
    onChange(selected.includes(type) ? selected.filter((t) => t !== type) : [...selected, type]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-brand-primary mb-1">What are you working on?</h2>
      <p className="text-brand-primary/50 text-sm mb-6">Select all that apply — you can combine projects in one estimate.</p>

      <div className="mb-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-3">Interior</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {interiorTypes.map((item) => (
            <TypeCard key={item.type} item={item} selected={selected.includes(item.type)} onToggle={() => toggle(item.type)} />
          ))}
        </div>
      </div>

      {selected.length === 0 && (
        <p className="mt-4 text-sm text-red-500">Please select at least one project type to continue.</p>
      )}
    </div>
  );
}
