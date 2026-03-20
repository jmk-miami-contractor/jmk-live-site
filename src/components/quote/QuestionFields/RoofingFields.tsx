"use client";

import type { RoofingAnswersQuick, RoofingAnswersDetailed } from "@/lib/quoteTypes";
import { RadioGroup, Toggle, NumberInput } from "./FormPrimitives";

export const roofingDefaultQuick: RoofingAnswersQuick = {
  homeSqFt: 2000, pitch: "medium", material: "asphalt", includesGutters: true, skylightCount: 0,
};
export const roofingDefaultDetailed: RoofingAnswersDetailed = {
  roofSqFt: 2600, pitch: "medium", material: "asphalt", skylightCount: 0, gutterLinFt: 0, tearOffLayers: 1,
};

export function RoofingQuickFields({ value, onChange }: { value: RoofingAnswersQuick; onChange: (v: RoofingAnswersQuick) => void }) {
  const set = <K extends keyof RoofingAnswersQuick>(k: K, v: RoofingAnswersQuick[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-6">
      <NumberInput label="Home square footage (we'll estimate roof area)" value={value.homeSqFt} onChange={(v) => set("homeSqFt", v)} unit="sqft" />
      <RadioGroup label="Roof pitch" value={value.pitch} onChange={(v) => set("pitch", v as RoofingAnswersQuick["pitch"])}
        options={[{ value: "low", label: "Low", desc: "Flat to 4:12" }, { value: "medium", label: "Medium", desc: "4:12 to 7:12" }, { value: "steep", label: "Steep", desc: "8:12 and above" }]} />
      <RadioGroup label="Roofing material" value={value.material} onChange={(v) => set("material", v as RoofingAnswersQuick["material"])}
        options={[{ value: "asphalt", label: "Asphalt Shingles" }, { value: "metal", label: "Metal" }, { value: "tile", label: "Tile" }, { value: "flat-membrane", label: "Flat Membrane" }]} />
      <Toggle label="Include gutters?" value={value.includesGutters} onChange={(v) => set("includesGutters", v)} />
      <NumberInput label="Number of skylights" value={value.skylightCount} onChange={(v) => set("skylightCount", v)} unit="skylights" max={10} />
    </div>
  );
}

export function RoofingDetailedFields({ value, onChange }: { value: RoofingAnswersDetailed; onChange: (v: RoofingAnswersDetailed) => void }) {
  const set = <K extends keyof RoofingAnswersDetailed>(k: K, v: RoofingAnswersDetailed[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-6">
      <NumberInput label="Actual roof square footage" value={value.roofSqFt} onChange={(v) => set("roofSqFt", v)} unit="sqft" />
      <RadioGroup label="Roof pitch" value={value.pitch} onChange={(v) => set("pitch", v as RoofingAnswersDetailed["pitch"])}
        options={[{ value: "low", label: "Low", desc: "Flat to 4:12" }, { value: "medium", label: "Medium", desc: "4:12 to 7:12" }, { value: "steep", label: "Steep", desc: "8:12 and above" }]} />
      <RadioGroup label="Roofing material" value={value.material} onChange={(v) => set("material", v as RoofingAnswersDetailed["material"])}
        options={[{ value: "asphalt", label: "Asphalt Shingles" }, { value: "metal", label: "Metal" }, { value: "tile", label: "Tile" }, { value: "flat-membrane", label: "Flat Membrane" }]} />
      <NumberInput label="Layers to tear off" value={value.tearOffLayers} onChange={(v) => set("tearOffLayers", v)} unit="layers" min={1} max={3} />
      <NumberInput label="Number of skylights" value={value.skylightCount} onChange={(v) => set("skylightCount", v)} unit="skylights" max={10} />
      <NumberInput label="Gutter linear feet" value={value.gutterLinFt} onChange={(v) => set("gutterLinFt", v)} unit="lin ft" />
    </div>
  );
}
