"use client";

import Image from "next/image";
import { getFinishCategories } from "@/lib/finishesConfig";
import { QUICK_TIERS } from "@/lib/quickTiersConfig";
import type { QuickTier } from "@/lib/quickTiersConfig";
import { PROJECT_TYPE_LABELS } from "@/lib/quoteTypes";
import type { ProjectType } from "@/lib/quoteTypes";

interface Props {
  projectType: ProjectType;
  typeIndex: number;
  totalTypes: number;
  /** Flat finishes answers for this project type: { "${catId}.tier": value } */
  value: Record<string, string>;
  onChange: (v: Record<string, string>) => void;
  onBack: () => void;
  onComplete: () => void;
}

// ── Price calculation ─────────────────────────────────────────────────────────

function fmt(n: number): string {
  if (n >= 1000) return `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`;
  return `$${n}`;
}

function calcTierPrice(
  projectType: ProjectType,
  tierValue: string,
): { low: number; high: number } {
  const cats = getFinishCategories(projectType, "quick");
  let low = 0,
    high = 0;
  for (const cat of cats) {
    const opt = cat.quickOptions.find((o) => o.value === tierValue);
    if (opt) {
      low += opt.priceLow;
      high += opt.priceHigh;
    }
  }
  return { low, high };
}

function priceLabel(projectType: ProjectType, tierValue: string): string {
  const { low, high } = calcTierPrice(projectType, tierValue);
  if (low === 0 && high === 0) return "Included";
  if (low === high) return `+${fmt(low)}`;
  return `+${fmt(low)} – ${fmt(high)}`;
}

// ── Tier card ─────────────────────────────────────────────────────────────────

interface TierCardProps {
  tier: QuickTier;
  selected: boolean;
  projectType: ProjectType;
  onSelect: () => void;
}

function TierCard({ tier, selected, projectType, onSelect }: TierCardProps) {
  const label = priceLabel(projectType, tier.value);
  const isIncluded = label === "Included";

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left rounded-2xl border-2 overflow-hidden transition-all duration-150 ${
        selected
          ? "border-brand-accent ring-2 ring-brand-accent shadow-lg"
          : "border-brand-light/40 hover:border-brand-primary/30 hover:shadow-md"
      }`}
    >
      {/* Photo section */}
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={tier.photo}
          alt={tier.label}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
        {/* Selected checkmark */}
        {selected && (
          <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-brand-accent flex items-center justify-center shadow">
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
        {/* Tier name overlaid at bottom of photo */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
          <div className="font-bold text-white text-lg leading-tight">{tier.label}</div>
        </div>
      </div>

      {/* Content area */}
      <div className={`p-4 ${selected ? "bg-brand-accent/5" : "bg-white"}`}>
        <p className={`text-sm font-semibold mb-2.5 ${selected ? "text-brand-accent" : "text-brand-primary"}`}>
          {tier.tagline}
        </p>
        <ul className="space-y-1 mb-3">
          {tier.bullets.map((bullet) => (
            <li key={bullet} className="text-xs text-brand-primary/60 flex gap-1.5 leading-snug">
              <span className="shrink-0 text-brand-primary/30 mt-0.5">•</span>
              {bullet}
            </li>
          ))}
        </ul>
        <div
          className={`text-sm font-bold ${
            isIncluded ? "text-brand-primary/40" : "text-brand-accent"
          }`}
        >
          {label}
        </div>
      </div>
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function Step3b_QuickTier({
  projectType,
  typeIndex,
  totalTypes,
  value,
  onChange,
  onBack,
  onComplete,
}: Props) {
  const cats = getFinishCategories(projectType, "quick");
  const typeLabel = PROJECT_TYPE_LABELS[projectType];

  // Determine current selection from the first applicable category (all should match)
  const firstCatKey = cats[0] ? `${cats[0].id}.tier` : undefined;
  const selectedTier =
    (firstCatKey && value[firstCatKey]) || QUICK_TIERS[0].value;

  // If no categories apply to this project type, skip straight through
  if (cats.length === 0) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">✨</span>
          <h2 className="text-2xl font-bold text-brand-primary">
            Overall Finish Quality
          </h2>
        </div>
        <p className="text-brand-primary/60 text-sm mb-6">{typeLabel}</p>
        <p className="text-brand-primary/40 text-sm italic">
          No finish selections needed for this project type.
        </p>
        <div className="mt-8 flex justify-between">
          <button
            onClick={onBack}
            className="text-brand-primary/50 hover:text-brand-primary text-sm transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={onComplete}
            className="bg-brand-accent hover:bg-brand-primary text-white font-bold px-8 py-3 rounded-xl transition-colors"
          >
            Continue →
          </button>
        </div>
      </div>
    );
  }

  // Set the same tier for every applicable category at once
  function handleSelect(tierValue: string) {
    const newFinishes: Record<string, string> = {};
    for (const cat of cats) {
      newFinishes[`${cat.id}.tier`] = tierValue;
    }
    onChange(newFinishes);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xl">✨</span>
        <h2 className="text-2xl font-bold text-brand-primary">
          Overall Finish Quality
        </h2>
      </div>
      <p className="text-brand-primary/60 text-sm mb-0.5">
        {typeLabel}
        {totalTypes > 1 && (
          <span className="ml-2 text-brand-primary/40">
            — Project {typeIndex + 1} of {totalTypes}
          </span>
        )}
      </p>
      <p className="text-brand-primary/40 text-xs mb-6">
        Pick one level — this sets the finish quality for all categories in one step.
      </p>

      {/* Tier cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {QUICK_TIERS.map((tier) => (
          <TierCard
            key={tier.value}
            tier={tier}
            selected={selectedTier === tier.value}
            projectType={projectType}
            onSelect={() => handleSelect(tier.value)}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={onBack}
          className="text-brand-primary/50 hover:text-brand-primary text-sm transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onComplete}
          className="bg-brand-accent hover:bg-brand-primary text-white font-bold px-8 py-3 rounded-xl transition-colors"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
