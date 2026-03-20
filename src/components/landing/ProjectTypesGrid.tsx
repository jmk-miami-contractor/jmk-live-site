import Link from "next/link";
import Image from "next/image";
import type { ProjectType } from "@/lib/quoteTypes";

interface ProjectItem {
  label: string;
  emoji: string;
  desc: string;
  type: ProjectType;
  photo?: string;
}

const interiorProjects: ProjectItem[] = [
  { label: "Kitchen Remodel",      emoji: "🍳", desc: "Cabinets, counters, appliances",       type: "kitchen",      photo: "/project-photos/kitchen.jpg" },
  { label: "Bathroom Remodel",     emoji: "🚿", desc: "Tile, fixtures, walk-in showers",       type: "bathroom",     photo: "/project-photos/bathroom.jpg" },
  { label: "Full Home Remodel",    emoji: "🏠", desc: "Whole-house renovations",               type: "fullHome",     photo: "/project-photos/full-home.jpg" },
  { label: "Addition / Room Build",emoji: "🔨", desc: "New rooms, ADUs, second stories",       type: "addition",     photo: "/project-photos/addition.jpg" },
  { label: "Flooring",             emoji: "🪵", desc: "Hardwood, LVP, tile, carpet",           type: "flooring",     photo: "/project-photos/flooring.jpg" },
  { label: "Windows & Doors",      emoji: "🪟", desc: "Impact, triple-pane, custom",           type: "windowsDoors", photo: "/project-photos/windows-doors.jpg" },
  { label: "Lighting",             emoji: "💡", desc: "Recessed, fixtures, panel upgrades",    type: "lighting",     photo: "/project-photos/lighting.jpg" },
  { label: "Low Voltage",          emoji: "📡", desc: "Smart home, AV, security, networking",  type: "lowVoltage",   photo: "/project-photos/low-voltage.jpg" },
];

const exteriorProjects: ProjectItem[] = [
  { label: "Roofing",   emoji: "🏗️", desc: "Asphalt, metal, tile, membrane",  type: "roofing" },
  { label: "Hardscape", emoji: "🪨", desc: "Pavers, driveway, exterior tile",  type: "hardscape" },
  { label: "Fencing",   emoji: "🔩", desc: "Wood, vinyl, aluminum, iron",      type: "fencing" },
];

function ProjectCard({ label, emoji, desc, photo, type }: ProjectItem) {
  if (photo) {
    return (
      <Link href={`/quote?type=${type}`}>
        <div className="relative overflow-hidden rounded-xl aspect-[4/3] group cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300">
          <Image
            src={photo}
            alt={label}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Dark gradient overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/5" />
          {/* Text pinned to bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="font-bold text-white text-sm leading-snug">{label}</div>
            <div className="text-white/65 text-xs mt-0.5">{desc}</div>
          </div>
        </div>
      </Link>
    );
  }

  // Gradient card for categories without a photo
  return (
    <Link href="/quote">
      <div className="relative overflow-hidden rounded-xl aspect-[4/3] group cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-brand-primary to-brand-accent">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <span className="text-3xl mb-2 inline-block transition-transform duration-300 group-hover:scale-110">
            {emoji}
          </span>
          <div className="font-bold text-white text-sm leading-snug">{label}</div>
          <div className="text-white/60 text-xs mt-0.5">{desc}</div>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectTypesGrid() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-primary text-center mb-3">
          What Are You Working On?
        </h2>
        <p className="text-brand-primary/50 text-center mb-12">
          We quote all of these — and you can combine multiple projects in one estimate.
        </p>

        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-4">Interior</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {interiorProjects.map((p) => <ProjectCard key={p.label} {...p} />)}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-accent text-white font-bold text-lg px-10 py-4 rounded-xl transition-colors shadow"
          >
            Start My Estimate
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
