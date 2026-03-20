"use client";

import Image from "next/image";
import type { ProjectType } from "@/lib/quoteTypes";

const interiorTypes: { type: ProjectType; label: string; emoji: string; desc: string; photo?: string }[] = [
  { type: "kitchen", label: "Kitchen Remodel", emoji: "🍳", desc: "Cabinets, counters, appliances", photo: "/project-photos/kitchen.jpg" },
  { type: "bathroom", label: "Bathroom Remodel", emoji: "🚿", desc: "Tile, fixtures, walk-in showers", photo: "/project-photos/bathroom.jpg" },
  { type: "fullHome", label: "Full Home Remodel", emoji: "🏠", desc: "Whole-house renovations", photo: "/project-photos/full-home.jpg" },
  { type: "addition", label: "Addition / Room Build", emoji: "🔨", desc: "New rooms, ADUs, second stories", photo: "/project-photos/addition.jpg" },
  { type: "flooring", label: "Flooring", emoji: "🪵", desc: "Hardwood, LVP, tile, carpet", photo: "/project-photos/flooring.jpg" },
  { type: "windowsDoors", label: "Windows & Doors", emoji: "🪟", desc: "Impact, triple-pane, custom", photo: "/project-photos/windows-doors.jpg" },
  { type: "lighting", label: "Lighting", emoji: "💡", desc: "Recessed, fixtures, panel upgrades", photo: "/project-photos/lighting.jpg" },
  { type: "lowVoltage", label: "Low Voltage", emoji: "📡", desc: "Smart home, AV, security", photo: "/project-photos/low-voltage.jpg" },
];

const exteriorTypes: { type: ProjectType; label: string; emoji: string; desc: string; photo?: string }[] = [
  { type: "roofing",    label: "Roofing",    emoji: "🏗️", desc: "Asphalt, metal, tile, membrane" },
  { type: "hardscape",  label: "Hardscape",  emoji: "🪨", desc: "Pavers, driveway, exterior tile" },
  { type: "fencing",    label: "Fencing",    emoji: "🔩", desc: "Wood, vinyl, aluminum, iron" },
];

interface Props {
  selected: ProjectType[];
  onChange: (types: ProjectType[]) => void;
}

function TypeCard({ item, selected, onToggle }: { item: typeof interiorTypes[0]; selected: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle}
      className={`relative overflow-hidden rounded-xl aspect-[4/3] transition-all group
        ${selected ? "ring-3 ring-brand-accent ring-offset-2" : "hover:ring-2 hover:ring-brand-accent/50"}`}>

      {item.photo ? (
        <>
          <Image
            src={item.photo}
            alt={item.label}
            fill
            loading="eager"
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-accent" />
      )}

      {/* Selected checkmark */}
      {selected && (
        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-brand-accent flex items-center justify-center z-10 shadow">
          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      {/* Text pinned to bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
        {!item.photo && <span className="text-2xl mb-1 block">{item.emoji}</span>}
        <div className="font-bold text-white text-sm leading-snug">{item.label}</div>
        <div className="text-white/65 text-xs mt-0.5">{item.desc}</div>
      </div>

      {/* Dim overlay when selected */}
      {selected && <div className="absolute inset-0 bg-brand-accent/20" />}
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

      {exteriorTypes.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-3">Exterior</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {exteriorTypes.map((item) => (
              <TypeCard key={item.type} item={item} selected={selected.includes(item.type)} onToggle={() => toggle(item.type)} />
            ))}
          </div>
        </div>
      )}

      {selected.length === 0 && (
        <p className="mt-4 text-sm text-red-500">Please select at least one project type to continue.</p>
      )}
    </div>
  );
}
