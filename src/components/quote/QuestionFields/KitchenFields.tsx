"use client";

import type { KitchenAnswersQuick, KitchenAnswersDetailed } from "@/lib/quoteTypes";
import { RadioGroup, Toggle, NumberInput, FormSection } from "./FormPrimitives";

const defaultQuick: KitchenAnswersQuick = {
  sqftRange: "100to150", cabinetStyle: "semi-custom", countertopMaterial: "quartz",
  applianceLevel: "mid", layoutChange: false, islandAddition: false,
};
const defaultDetailed: KitchenAnswersDetailed = {
  lowerCabinetLinFt: 20, upperCabinetLinFt: 16, countertopSqFt: 40, ceilingHeight: 9,
  appliancesToReplace: 3, layoutChange: false, islandAddition: false, sinkCount: 1,
  cabinetStyle: "semi-custom", countertopMaterial: "quartz", applianceLevel: "mid",
};

export function KitchenQuickFields({ value, onChange }: { value: KitchenAnswersQuick; onChange: (v: KitchenAnswersQuick) => void }) {
  const set = <K extends keyof KitchenAnswersQuick>(k: K, v: KitchenAnswersQuick[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-6">
      <RadioGroup label="Kitchen size" value={value.sqftRange} onChange={(v) => set("sqftRange", v as KitchenAnswersQuick["sqftRange"])}
        options={[{ value: "under100", label: "Under 100 sqft" }, { value: "100to150", label: "100–150 sqft" }, { value: "150to200", label: "150–200 sqft" }, { value: "over200", label: "200+ sqft" }]} />
      <RadioGroup label="Cabinet style" value={value.cabinetStyle} onChange={(v) => set("cabinetStyle", v as KitchenAnswersQuick["cabinetStyle"])}
        options={[{ value: "stock", label: "Stock", desc: "Pre-made, budget-friendly" }, { value: "semi-custom", label: "Semi-Custom", desc: "More options, mid-range" }, { value: "custom", label: "Custom", desc: "Built to order, premium" }]} />
      <RadioGroup label="Countertop material" value={value.countertopMaterial} onChange={(v) => set("countertopMaterial", v as KitchenAnswersQuick["countertopMaterial"])}
        options={[{ value: "laminate", label: "Laminate" }, { value: "quartz", label: "Quartz" }, { value: "granite", label: "Granite" }, { value: "marble", label: "Marble" }]} />
      <RadioGroup label="Appliance package" value={value.applianceLevel} onChange={(v) => set("applianceLevel", v as KitchenAnswersQuick["applianceLevel"])}
        options={[{ value: "basic", label: "Basic" }, { value: "mid", label: "Mid-Range" }, { value: "professional", label: "Professional Grade" }]} />
      <Toggle label="Moving walls or relocating plumbing?" value={value.layoutChange} onChange={(v) => set("layoutChange", v)} />
      <Toggle label="Adding a kitchen island?" value={value.islandAddition} onChange={(v) => set("islandAddition", v)} />
    </div>
  );
}

export function KitchenDetailedFields({ value, onChange }: { value: KitchenAnswersDetailed; onChange: (v: KitchenAnswersDetailed) => void }) {
  const set = <K extends keyof KitchenAnswersDetailed>(k: K, v: KitchenAnswersDetailed[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-6">
      <FormSection title="Cabinet Measurements">
        <NumberInput label="Lower cabinet linear feet" value={value.lowerCabinetLinFt} onChange={(v) => set("lowerCabinetLinFt", v)} unit="lin ft" />
        <NumberInput label="Upper cabinet linear feet" value={value.upperCabinetLinFt} onChange={(v) => set("upperCabinetLinFt", v)} unit="lin ft" />
      </FormSection>
      <RadioGroup label="Cabinet style" value={value.cabinetStyle} onChange={(v) => set("cabinetStyle", v as KitchenAnswersDetailed["cabinetStyle"])}
        options={[{ value: "stock", label: "Stock" }, { value: "semi-custom", label: "Semi-Custom" }, { value: "custom", label: "Custom" }]} />
      <NumberInput label="Countertop square footage" value={value.countertopSqFt} onChange={(v) => set("countertopSqFt", v)} unit="sqft" />
      <RadioGroup label="Countertop material" value={value.countertopMaterial} onChange={(v) => set("countertopMaterial", v as KitchenAnswersDetailed["countertopMaterial"])}
        options={[{ value: "laminate", label: "Laminate" }, { value: "quartz", label: "Quartz" }, { value: "granite", label: "Granite" }, { value: "marble", label: "Marble" }]} />
      <RadioGroup label="Appliance package" value={value.applianceLevel} onChange={(v) => set("applianceLevel", v as KitchenAnswersDetailed["applianceLevel"])}
        options={[{ value: "basic", label: "Basic" }, { value: "mid", label: "Mid-Range" }, { value: "professional", label: "Professional Grade" }]} />
      <NumberInput label="Number of appliances to replace" value={value.appliancesToReplace} onChange={(v) => set("appliancesToReplace", v)} unit="appliances" min={0} max={10} />
      <NumberInput label="Ceiling height" value={value.ceilingHeight} onChange={(v) => set("ceilingHeight", v)} unit="ft" min={7} max={20} />
      <NumberInput label="Number of sinks" value={value.sinkCount} onChange={(v) => set("sinkCount", v)} unit="sinks" min={1} max={3} />
      <Toggle label="Moving walls or relocating plumbing?" value={value.layoutChange} onChange={(v) => set("layoutChange", v)} />
      <Toggle label="Adding a kitchen island?" value={value.islandAddition} onChange={(v) => set("islandAddition", v)} />
    </div>
  );
}

export { defaultQuick as kitchenDefaultQuick, defaultDetailed as kitchenDefaultDetailed };
