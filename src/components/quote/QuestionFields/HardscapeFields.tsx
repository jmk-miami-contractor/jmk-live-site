"use client";

import type { HardscapeAnswersQuick, HardscapeAnswersDetailed } from "@/lib/quoteTypes";
import { RadioGroup, NumberInput } from "./FormPrimitives";

export const hardscapeDefaultQuick: HardscapeAnswersQuick = {
  sqftRange: "500to1000", material: "pavers", areaType: "walkway",
};
export const hardscapeDefaultDetailed: HardscapeAnswersDetailed = {
  sqFt: 750, material: "pavers", areaType: "walkway",
  edgeTreatment: "none", pattern: "standard",
};

export function HardscapeQuickFields({ value, onChange }: { value: HardscapeAnswersQuick; onChange: (v: HardscapeAnswersQuick) => void }) {
  const set = <K extends keyof HardscapeAnswersQuick>(k: K, v: HardscapeAnswersQuick[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-6">
      <RadioGroup label="Approximate area" value={value.sqftRange} onChange={(v) => set("sqftRange", v as HardscapeAnswersQuick["sqftRange"])}
        options={[
          { value: "under500",   label: "Under 500 sqft" },
          { value: "500to1000",  label: "500–1,000 sqft" },
          { value: "1000to2000", label: "1,000–2,000 sqft" },
          { value: "over2000",   label: "Over 2,000 sqft" },
        ]} />
      <RadioGroup label="Primary material" value={value.material} onChange={(v) => set("material", v as HardscapeAnswersQuick["material"])}
        options={[
          { value: "concrete",      label: "Concrete (poured / stamped)" },
          { value: "pavers",        label: "Pavers (concrete or clay)" },
          { value: "travertine",    label: "Travertine" },
          { value: "exterior-tile", label: "Exterior Porcelain Tile" },
        ]} />
      <RadioGroup label="Area type" value={value.areaType} onChange={(v) => set("areaType", v as HardscapeAnswersQuick["areaType"])}
        options={[
          { value: "driveway",  label: "Driveway" },
          { value: "walkway",   label: "Walkway / Entry" },
          { value: "pool-deck", label: "Pool Deck" },
          { value: "mixed",     label: "Mixed / Multiple areas" },
        ]} />
    </div>
  );
}

export function HardscapeDetailedFields({ value, onChange }: { value: HardscapeAnswersDetailed; onChange: (v: HardscapeAnswersDetailed) => void }) {
  const set = <K extends keyof HardscapeAnswersDetailed>(k: K, v: HardscapeAnswersDetailed[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-6">
      <NumberInput label="Total area" value={value.sqFt} onChange={(v) => set("sqFt", v)} unit="sqft" />
      <RadioGroup label="Primary material" value={value.material} onChange={(v) => set("material", v as HardscapeAnswersDetailed["material"])}
        options={[
          { value: "concrete",      label: "Concrete (poured / stamped)" },
          { value: "pavers",        label: "Pavers (concrete or clay)" },
          { value: "travertine",    label: "Travertine" },
          { value: "exterior-tile", label: "Exterior Porcelain Tile" },
        ]} />
      <RadioGroup label="Area type" value={value.areaType} onChange={(v) => set("areaType", v as HardscapeAnswersDetailed["areaType"])}
        options={[
          { value: "driveway",  label: "Driveway" },
          { value: "walkway",   label: "Walkway / Entry" },
          { value: "pool-deck", label: "Pool Deck" },
          { value: "mixed",     label: "Mixed / Multiple areas" },
        ]} />
      <RadioGroup label="Edge treatment" value={value.edgeTreatment} onChange={(v) => set("edgeTreatment", v as HardscapeAnswersDetailed["edgeTreatment"])}
        options={[
          { value: "none",          label: "None" },
          { value: "soldier-course",label: "Soldier course border" },
          { value: "banding",       label: "Contrasting banding" },
        ]} />
      <RadioGroup label="Lay pattern" value={value.pattern} onChange={(v) => set("pattern", v as HardscapeAnswersDetailed["pattern"])}
        options={[
          { value: "standard",     label: "Standard (stack / running bond)" },
          { value: "herringbone",  label: "Herringbone" },
          { value: "running-bond", label: "Running bond" },
        ]} />
    </div>
  );
}
