"use client";

import type { FullHomeAnswersQuick, FullHomeAnswersDetailed } from "@/lib/quoteTypes";
import { RadioGroup, Toggle, NumberInput, Stepper } from "./FormPrimitives";

export const fullHomeDefaultQuick: FullHomeAnswersQuick = {
  homeSqFt: 2000, bedrooms: 3, bathrooms: 2, scopeLevel: "mid",
  includesHVAC: false, includesElectrical: false, includesPlumbing: false,
};
export const fullHomeDefaultDetailed: FullHomeAnswersDetailed = {
  sqFtPerFloor: 2000, floors: 1, rooms: 8, ceilingHeight: 9, bathrooms: 2,
  scopeLevel: "mid", includesHVAC: false, includesElectrical: false, includesPlumbing: false,
};

export function FullHomeQuickFields({ value, onChange }: { value: FullHomeAnswersQuick; onChange: (v: FullHomeAnswersQuick) => void }) {
  const set = <K extends keyof FullHomeAnswersQuick>(k: K, v: FullHomeAnswersQuick[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-6">
      <NumberInput label="Home square footage" value={value.homeSqFt} onChange={(v) => set("homeSqFt", v)} unit="sqft" placeholder="e.g. 2000" />
      <div className="grid grid-cols-2 gap-4">
        <Stepper label="Bedrooms" value={value.bedrooms} onChange={(v) => set("bedrooms", v)} min={1} max={10} />
        <Stepper label="Bathrooms" value={value.bathrooms} onChange={(v) => set("bathrooms", v)} min={1} max={10} />
      </div>
      <RadioGroup label="Remodel scope" value={value.scopeLevel} onChange={(v) => set("scopeLevel", v as FullHomeAnswersQuick["scopeLevel"])}
        options={[
          { value: "cosmetic", label: "Cosmetic", desc: "Paint, flooring, fixtures" },
          { value: "mid", label: "Mid-Range", desc: "Partial gut, some structural" },
          { value: "gut", label: "Full Gut", desc: "Down to the studs" },
        ]} />
      <Toggle label="Replace HVAC system?" value={value.includesHVAC} onChange={(v) => set("includesHVAC", v)} />
      <Toggle label="Electrical panel or rewire?" value={value.includesElectrical} onChange={(v) => set("includesElectrical", v)} />
      <Toggle label="Plumbing updates?" value={value.includesPlumbing} onChange={(v) => set("includesPlumbing", v)} />
    </div>
  );
}

export function FullHomeDetailedFields({ value, onChange }: { value: FullHomeAnswersDetailed; onChange: (v: FullHomeAnswersDetailed) => void }) {
  const set = <K extends keyof FullHomeAnswersDetailed>(k: K, v: FullHomeAnswersDetailed[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-6">
      <NumberInput label="Square footage per floor" value={value.sqFtPerFloor} onChange={(v) => set("sqFtPerFloor", v)} unit="sqft" />
      <div className="grid grid-cols-2 gap-4">
        <Stepper label="Number of floors" value={value.floors} onChange={(v) => set("floors", v)} min={1} max={5} />
        <Stepper label="Number of rooms" value={value.rooms} onChange={(v) => set("rooms", v)} min={1} max={30} />
        <Stepper label="Bathrooms" value={value.bathrooms} onChange={(v) => set("bathrooms", v)} min={1} max={10} />
      </div>
      <NumberInput label="Ceiling height" value={value.ceilingHeight} onChange={(v) => set("ceilingHeight", v)} unit="ft" min={7} max={20} />
      <RadioGroup label="Remodel scope" value={value.scopeLevel} onChange={(v) => set("scopeLevel", v as FullHomeAnswersDetailed["scopeLevel"])}
        options={[
          { value: "cosmetic", label: "Cosmetic", desc: "Paint, flooring, fixtures" },
          { value: "mid", label: "Mid-Range", desc: "Partial gut, some structural" },
          { value: "gut", label: "Full Gut", desc: "Down to the studs" },
        ]} />
      <Toggle label="Replace HVAC system?" value={value.includesHVAC} onChange={(v) => set("includesHVAC", v)} />
      <Toggle label="Electrical panel or rewire?" value={value.includesElectrical} onChange={(v) => set("includesElectrical", v)} />
      <Toggle label="Plumbing updates?" value={value.includesPlumbing} onChange={(v) => set("includesPlumbing", v)} />
    </div>
  );
}
