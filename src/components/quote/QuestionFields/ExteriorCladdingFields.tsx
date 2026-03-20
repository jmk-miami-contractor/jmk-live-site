"use client";

import type { ExteriorCladdingAnswersQuick, ExteriorCladdingAnswersDetailed } from "@/lib/quoteTypes";
import { RadioGroup, Toggle, NumberInput, Stepper } from "./FormPrimitives";

export const exteriorCladdingDefaultQuick: ExteriorCladdingAnswersQuick = {
  homeSqFt: 2000, material: "stucco", includesTrim: true,
};
export const exteriorCladdingDefaultDetailed: ExteriorCladdingAnswersDetailed = {
  wallSqFt: 2300, material: "stucco", trimLinFt: 150, windowDoorCount: 12,
};

export function ExteriorCladdingQuickFields({ value, onChange }: { value: ExteriorCladdingAnswersQuick; onChange: (v: ExteriorCladdingAnswersQuick) => void }) {
  const set = <K extends keyof ExteriorCladdingAnswersQuick>(k: K, v: ExteriorCladdingAnswersQuick[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-6">
      <NumberInput label="Home square footage (we'll estimate wall area)" value={value.homeSqFt} onChange={(v) => set("homeSqFt", v)} unit="sqft" />
      <RadioGroup label="Cladding material" value={value.material} onChange={(v) => set("material", v as ExteriorCladdingAnswersQuick["material"])}
        options={[{ value: "stucco", label: "Stucco" }, { value: "siding", label: "Fiber Cement Siding" }, { value: "stone", label: "Stone Veneer" }, { value: "brick", label: "Brick" }]} />
      <Toggle label="Include trim & detail work?" value={value.includesTrim} onChange={(v) => set("includesTrim", v)} />
    </div>
  );
}

export function ExteriorCladdingDetailedFields({ value, onChange }: { value: ExteriorCladdingAnswersDetailed; onChange: (v: ExteriorCladdingAnswersDetailed) => void }) {
  const set = <K extends keyof ExteriorCladdingAnswersDetailed>(k: K, v: ExteriorCladdingAnswersDetailed[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-6">
      <NumberInput label="Total wall square footage" value={value.wallSqFt} onChange={(v) => set("wallSqFt", v)} unit="sqft" />
      <RadioGroup label="Cladding material" value={value.material} onChange={(v) => set("material", v as ExteriorCladdingAnswersDetailed["material"])}
        options={[{ value: "stucco", label: "Stucco" }, { value: "siding", label: "Fiber Cement Siding" }, { value: "stone", label: "Stone Veneer" }, { value: "brick", label: "Brick" }]} />
      <NumberInput label="Trim linear footage" value={value.trimLinFt} onChange={(v) => set("trimLinFt", v)} unit="lin ft" />
      <Stepper label="Windows & doors to work around" value={value.windowDoorCount} onChange={(v) => set("windowDoorCount", v)} max={40} />
    </div>
  );
}
