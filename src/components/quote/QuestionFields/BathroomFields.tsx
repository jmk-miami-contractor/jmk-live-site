"use client";

import type { BathroomAnswersQuick, BathroomAnswersDetailed } from "@/lib/quoteTypes";
import { RadioGroup, Toggle, NumberInput, Stepper } from "./FormPrimitives";

export const bathroomDefaultQuick: BathroomAnswersQuick = {
  bathroomSize: "standard", tileLevel: "mid", fixtureLevel: "mid",
  showerType: "shower-only", plumbingRelocation: false,
};
export const bathroomDefaultDetailed: BathroomAnswersDetailed = {
  floorSqFt: 50, wallTileSqFt: 120, toilets: 1, sinks: 1, showers: 1, tubs: 0,
  ceilingHeight: 9, plumbingRelocation: false, tileLevel: "mid", fixtureLevel: "mid",
};

export function BathroomQuickFields({ value, onChange }: { value: BathroomAnswersQuick; onChange: (v: BathroomAnswersQuick) => void }) {
  const set = <K extends keyof BathroomAnswersQuick>(k: K, v: BathroomAnswersQuick[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-6">
      <RadioGroup label="Which bathroom?" value={value.bathroomSize} onChange={(v) => set("bathroomSize", v as BathroomAnswersQuick["bathroomSize"])}
        options={[{ value: "half", label: "Half Bath" }, { value: "standard", label: "Full Bath" }, { value: "master", label: "Master Bath" }]} />
      <RadioGroup label="Tile finish level" value={value.tileLevel} onChange={(v) => set("tileLevel", v as BathroomAnswersQuick["tileLevel"])}
        options={[{ value: "basic", label: "Basic" }, { value: "mid", label: "Mid-Range" }, { value: "luxury", label: "Luxury" }]} />
      <RadioGroup label="Fixture level" value={value.fixtureLevel} onChange={(v) => set("fixtureLevel", v as BathroomAnswersQuick["fixtureLevel"])}
        options={[{ value: "builder", label: "Builder Grade" }, { value: "mid", label: "Mid-Range" }, { value: "designer", label: "Designer" }]} />
      <RadioGroup label="Shower / tub type" value={value.showerType} onChange={(v) => set("showerType", v as BathroomAnswersQuick["showerType"])}
        options={[{ value: "tub-only", label: "Tub Only" }, { value: "shower-only", label: "Shower Only" }, { value: "combo", label: "Tub/Shower Combo" }, { value: "walk-in-custom", label: "Walk-In Custom" }]} />
      <Toggle label="Any plumbing relocation?" value={value.plumbingRelocation} onChange={(v) => set("plumbingRelocation", v)} />
    </div>
  );
}

export function BathroomDetailedFields({ value, onChange }: { value: BathroomAnswersDetailed; onChange: (v: BathroomAnswersDetailed) => void }) {
  const set = <K extends keyof BathroomAnswersDetailed>(k: K, v: BathroomAnswersDetailed[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-6">
      <NumberInput label="Floor square footage" value={value.floorSqFt} onChange={(v) => set("floorSqFt", v)} unit="sqft" />
      <NumberInput label="Wall tile square footage" value={value.wallTileSqFt} onChange={(v) => set("wallTileSqFt", v)} unit="sqft" />
      <RadioGroup label="Tile finish level" value={value.tileLevel} onChange={(v) => set("tileLevel", v as BathroomAnswersDetailed["tileLevel"])}
        options={[{ value: "basic", label: "Basic" }, { value: "mid", label: "Mid-Range" }, { value: "luxury", label: "Luxury" }]} />
      <RadioGroup label="Fixture level" value={value.fixtureLevel} onChange={(v) => set("fixtureLevel", v as BathroomAnswersDetailed["fixtureLevel"])}
        options={[{ value: "builder", label: "Builder Grade" }, { value: "mid", label: "Mid-Range" }, { value: "designer", label: "Designer" }]} />
      <div className="grid grid-cols-2 gap-4">
        <Stepper label="Toilets" value={value.toilets} onChange={(v) => set("toilets", v)} max={3} />
        <Stepper label="Sinks" value={value.sinks} onChange={(v) => set("sinks", v)} max={4} />
        <Stepper label="Showers" value={value.showers} onChange={(v) => set("showers", v)} max={3} />
        <Stepper label="Tubs" value={value.tubs} onChange={(v) => set("tubs", v)} max={2} />
      </div>
      <NumberInput label="Ceiling height" value={value.ceilingHeight} onChange={(v) => set("ceilingHeight", v)} unit="ft" min={7} max={20} />
      <Toggle label="Any plumbing relocation?" value={value.plumbingRelocation} onChange={(v) => set("plumbingRelocation", v)} />
    </div>
  );
}
