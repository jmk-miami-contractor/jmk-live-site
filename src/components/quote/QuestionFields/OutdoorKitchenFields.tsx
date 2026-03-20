"use client";

import type { OutdoorKitchenAnswersQuick, OutdoorKitchenAnswersDetailed } from "@/lib/quoteTypes";
import { RadioGroup, Toggle, NumberInput, Stepper } from "./FormPrimitives";

export const outdoorKitchenDefaultQuick: OutdoorKitchenAnswersQuick = {
  size: "medium", applianceLevel: "mid", countertopMaterial: "granite", isCovered: true,
};
export const outdoorKitchenDefaultDetailed: OutdoorKitchenAnswersDetailed = {
  sqFt: 150, coverType: "pergola", applianceCount: 3, applianceLevel: "mid",
  countertopSqFt: 30, countertopMaterial: "granite", hasSink: true, hasRefrigeration: true,
};

export function OutdoorKitchenQuickFields({ value, onChange }: { value: OutdoorKitchenAnswersQuick; onChange: (v: OutdoorKitchenAnswersQuick) => void }) {
  const set = <K extends keyof OutdoorKitchenAnswersQuick>(k: K, v: OutdoorKitchenAnswersQuick[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-6">
      <RadioGroup label="Outdoor kitchen size" value={value.size} onChange={(v) => set("size", v as OutdoorKitchenAnswersQuick["size"])}
        options={[{ value: "small", label: "Small", desc: "Under 100 sqft" }, { value: "medium", label: "Medium", desc: "100–200 sqft" }, { value: "large", label: "Large", desc: "200+ sqft" }]} />
      <RadioGroup label="Appliance level" value={value.applianceLevel} onChange={(v) => set("applianceLevel", v as OutdoorKitchenAnswersQuick["applianceLevel"])}
        options={[{ value: "basic", label: "Basic" }, { value: "mid", label: "Mid-Range" }, { value: "professional", label: "Professional" }]} />
      <RadioGroup label="Countertop material" value={value.countertopMaterial} onChange={(v) => set("countertopMaterial", v as OutdoorKitchenAnswersQuick["countertopMaterial"])}
        options={[{ value: "concrete", label: "Concrete" }, { value: "granite", label: "Granite" }, { value: "porcelain", label: "Porcelain" }, { value: "stainless", label: "Stainless Steel" }]} />
      <Toggle label="Covered structure?" value={value.isCovered} onChange={(v) => set("isCovered", v)} />
    </div>
  );
}

export function OutdoorKitchenDetailedFields({ value, onChange }: { value: OutdoorKitchenAnswersDetailed; onChange: (v: OutdoorKitchenAnswersDetailed) => void }) {
  const set = <K extends keyof OutdoorKitchenAnswersDetailed>(k: K, v: OutdoorKitchenAnswersDetailed[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-6">
      <NumberInput label="Total square footage" value={value.sqFt} onChange={(v) => set("sqFt", v)} unit="sqft" />
      <RadioGroup label="Cover type" value={value.coverType} onChange={(v) => set("coverType", v as OutdoorKitchenAnswersDetailed["coverType"])}
        options={[{ value: "none", label: "Open / No Cover" }, { value: "pergola", label: "Pergola" }, { value: "solid-roof", label: "Solid Roof" }]} />
      <Stepper label="Number of appliances" value={value.applianceCount} onChange={(v) => set("applianceCount", v)} max={10} />
      <RadioGroup label="Appliance level" value={value.applianceLevel} onChange={(v) => set("applianceLevel", v as OutdoorKitchenAnswersDetailed["applianceLevel"])}
        options={[{ value: "basic", label: "Basic" }, { value: "mid", label: "Mid-Range" }, { value: "professional", label: "Professional" }]} />
      <NumberInput label="Countertop square footage" value={value.countertopSqFt} onChange={(v) => set("countertopSqFt", v)} unit="sqft" />
      <RadioGroup label="Countertop material" value={value.countertopMaterial} onChange={(v) => set("countertopMaterial", v as OutdoorKitchenAnswersDetailed["countertopMaterial"])}
        options={[{ value: "concrete", label: "Concrete" }, { value: "granite", label: "Granite" }, { value: "porcelain", label: "Porcelain" }, { value: "stainless", label: "Stainless Steel" }]} />
      <Toggle label="Outdoor sink?" value={value.hasSink} onChange={(v) => set("hasSink", v)} />
      <Toggle label="Outdoor refrigeration?" value={value.hasRefrigeration} onChange={(v) => set("hasRefrigeration", v)} />
    </div>
  );
}
