"use client";

import type { PoolAnswersQuick, PoolAnswersDetailed } from "@/lib/quoteTypes";
import { RadioGroup, Toggle, NumberInput, Stepper } from "./FormPrimitives";

export const poolDefaultQuick: PoolAnswersQuick = {
  poolSize: "standard", poolType: "fiberglass", includesSpa: false, includesDecking: true,
};
export const poolDefaultDetailed: PoolAnswersDetailed = {
  lengthFt: 30, widthFt: 15, depthFt: 5, poolType: "fiberglass",
  spaSqFt: 0, deckingSqFt: 500, deckingMaterial: "pavers", waterFeatureCount: 0,
};

export function PoolQuickFields({ value, onChange }: { value: PoolAnswersQuick; onChange: (v: PoolAnswersQuick) => void }) {
  const set = <K extends keyof PoolAnswersQuick>(k: K, v: PoolAnswersQuick[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-6">
      <RadioGroup label="Pool size" value={value.poolSize} onChange={(v) => set("poolSize", v as PoolAnswersQuick["poolSize"])}
        options={[{ value: "plunge", label: "Plunge Pool", desc: "Under 200 sqft" }, { value: "standard", label: "Standard", desc: "200–450 sqft" }, { value: "large", label: "Large", desc: "450+ sqft" }]} />
      <RadioGroup label="Pool type / construction" value={value.poolType} onChange={(v) => set("poolType", v as PoolAnswersQuick["poolType"])}
        options={[{ value: "concrete", label: "Concrete / Gunite" }, { value: "fiberglass", label: "Fiberglass" }, { value: "vinyl", label: "Vinyl Liner" }]} />
      <Toggle label="Include spa / hot tub?" value={value.includesSpa} onChange={(v) => set("includesSpa", v)} />
      <Toggle label="Include pool decking?" value={value.includesDecking} onChange={(v) => set("includesDecking", v)} />
    </div>
  );
}

export function PoolDetailedFields({ value, onChange }: { value: PoolAnswersDetailed; onChange: (v: PoolAnswersDetailed) => void }) {
  const set = <K extends keyof PoolAnswersDetailed>(k: K, v: PoolAnswersDetailed[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <NumberInput label="Length" value={value.lengthFt} onChange={(v) => set("lengthFt", v)} unit="ft" />
        <NumberInput label="Width" value={value.widthFt} onChange={(v) => set("widthFt", v)} unit="ft" />
        <NumberInput label="Depth" value={value.depthFt} onChange={(v) => set("depthFt", v)} unit="ft" min={3} max={12} />
      </div>
      <RadioGroup label="Pool type / construction" value={value.poolType} onChange={(v) => set("poolType", v as PoolAnswersDetailed["poolType"])}
        options={[{ value: "concrete", label: "Concrete / Gunite" }, { value: "fiberglass", label: "Fiberglass" }, { value: "vinyl", label: "Vinyl Liner" }]} />
      <NumberInput label="Spa square footage (0 if none)" value={value.spaSqFt} onChange={(v) => set("spaSqFt", v)} unit="sqft" max={200} />
      <NumberInput label="Decking square footage" value={value.deckingSqFt} onChange={(v) => set("deckingSqFt", v)} unit="sqft" />
      <RadioGroup label="Decking material" value={value.deckingMaterial} onChange={(v) => set("deckingMaterial", v as PoolAnswersDetailed["deckingMaterial"])}
        options={[{ value: "concrete", label: "Concrete" }, { value: "pavers", label: "Pavers" }, { value: "travertine", label: "Travertine" }]} />
      <Stepper label="Water features (waterfalls, jets, etc.)" value={value.waterFeatureCount} onChange={(v) => set("waterFeatureCount", v)} max={5} />
    </div>
  );
}
