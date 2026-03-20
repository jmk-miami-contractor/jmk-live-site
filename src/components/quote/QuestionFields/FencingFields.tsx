"use client";

import type { FencingAnswersQuick, FencingAnswersDetailed } from "@/lib/quoteTypes";
import { RadioGroup, Toggle, NumberInput } from "./FormPrimitives";

export const fencingDefaultQuick: FencingAnswersQuick = {
  linearFtRange: "100to250", material: "aluminum", gateCount: "none",
};
export const fencingDefaultDetailed: FencingAnswersDetailed = {
  linearFt: 175, material: "aluminum",
  pedestrianGates: 0, vehicleGates: 0, vehicleGateMotorized: false,
};

export function FencingQuickFields({ value, onChange }: { value: FencingAnswersQuick; onChange: (v: FencingAnswersQuick) => void }) {
  const set = <K extends keyof FencingAnswersQuick>(k: K, v: FencingAnswersQuick[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-6">
      <RadioGroup label="Total linear footage" value={value.linearFtRange} onChange={(v) => set("linearFtRange", v as FencingAnswersQuick["linearFtRange"])}
        options={[
          { value: "under100",  label: "Under 100 LF" },
          { value: "100to250",  label: "100–250 LF" },
          { value: "250to500",  label: "250–500 LF" },
          { value: "over500",   label: "Over 500 LF" },
        ]} />
      <RadioGroup label="Fence material" value={value.material} onChange={(v) => set("material", v as FencingAnswersQuick["material"])}
        options={[
          { value: "chain-link",  label: "Chain link" },
          { value: "wood",        label: "Wood" },
          { value: "vinyl",       label: "Vinyl / PVC" },
          { value: "aluminum",    label: "Aluminum" },
          { value: "wrought-iron",label: "Wrought iron" },
        ]} />
      <RadioGroup label="Gates needed" value={value.gateCount} onChange={(v) => set("gateCount", v as FencingAnswersQuick["gateCount"])}
        options={[
          { value: "none",      label: "None" },
          { value: "one-two",   label: "1–2 gates" },
          { value: "three-plus",label: "3 or more gates" },
        ]} />
    </div>
  );
}

export function FencingDetailedFields({ value, onChange }: { value: FencingAnswersDetailed; onChange: (v: FencingAnswersDetailed) => void }) {
  const set = <K extends keyof FencingAnswersDetailed>(k: K, v: FencingAnswersDetailed[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-6">
      <NumberInput label="Total linear footage" value={value.linearFt} onChange={(v) => set("linearFt", v)} unit="LF" />
      <RadioGroup label="Fence material" value={value.material} onChange={(v) => set("material", v as FencingAnswersDetailed["material"])}
        options={[
          { value: "chain-link",  label: "Chain link" },
          { value: "wood",        label: "Wood" },
          { value: "vinyl",       label: "Vinyl / PVC" },
          { value: "aluminum",    label: "Aluminum" },
          { value: "wrought-iron",label: "Wrought iron" },
        ]} />
      <NumberInput label="Pedestrian gates" value={value.pedestrianGates} onChange={(v) => set("pedestrianGates", v)} unit="gates" max={10} />
      <NumberInput label="Vehicle gates" value={value.vehicleGates} onChange={(v) => set("vehicleGates", v)} unit="gates" max={4} />
      {value.vehicleGates > 0 && (
        <Toggle label="Motorize vehicle gate(s)?" value={value.vehicleGateMotorized} onChange={(v) => set("vehicleGateMotorized", v)} />
      )}
    </div>
  );
}
