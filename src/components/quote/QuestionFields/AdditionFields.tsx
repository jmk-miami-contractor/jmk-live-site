"use client";

import type { AdditionAnswersQuick, AdditionAnswersDetailed } from "@/lib/quoteTypes";
import { RadioGroup, NumberInput, Stepper } from "./FormPrimitives";

export const additionDefaultQuick: AdditionAnswersQuick = {
  additionType: "bedroom", sqftRange: "400", finishLevel: "standard", foundationType: "slab",
};
export const additionDefaultDetailed: AdditionAnswersDetailed = {
  sqFt: 400, ceilingHeight: 9, additionType: "bedroom", finishLevel: "standard",
  foundationType: "slab", windowCount: 2, doorCount: 1,
};

export function AdditionQuickFields({ value, onChange }: { value: AdditionAnswersQuick; onChange: (v: AdditionAnswersQuick) => void }) {
  const set = <K extends keyof AdditionAnswersQuick>(k: K, v: AdditionAnswersQuick[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-6">
      <RadioGroup label="What are you adding?" value={value.additionType} onChange={(v) => set("additionType", v as AdditionAnswersQuick["additionType"])}
        options={[
          { value: "bedroom", label: "Bedroom" }, { value: "bathroom", label: "Bathroom" },
          { value: "garage", label: "Garage" }, { value: "sunroom", label: "Sunroom" },
          { value: "adu", label: "ADU / Guest Suite" }, { value: "second-story", label: "Second Story" },
        ]} />
      <RadioGroup label="Estimated square footage" value={value.sqftRange} onChange={(v) => set("sqftRange", v as AdditionAnswersQuick["sqftRange"])}
        options={[{ value: "200", label: "~200 sqft" }, { value: "400", label: "~400 sqft" }, { value: "600", label: "~600 sqft" }, { value: "800plus", label: "800+ sqft" }]} />
      <RadioGroup label="Finish level" value={value.finishLevel} onChange={(v) => set("finishLevel", v as AdditionAnswersQuick["finishLevel"])}
        options={[{ value: "standard", label: "Standard" }, { value: "upgraded", label: "Upgraded" }, { value: "premium", label: "Premium" }]} />
      <RadioGroup label="Foundation type" value={value.foundationType} onChange={(v) => set("foundationType", v as AdditionAnswersQuick["foundationType"])}
        options={[{ value: "slab", label: "Slab" }, { value: "crawl", label: "Crawl Space" }, { value: "full-basement", label: "Full Basement" }]} />
    </div>
  );
}

export function AdditionDetailedFields({ value, onChange }: { value: AdditionAnswersDetailed; onChange: (v: AdditionAnswersDetailed) => void }) {
  const set = <K extends keyof AdditionAnswersDetailed>(k: K, v: AdditionAnswersDetailed[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-6">
      <RadioGroup label="What are you adding?" value={value.additionType} onChange={(v) => set("additionType", v as AdditionAnswersDetailed["additionType"])}
        options={[
          { value: "bedroom", label: "Bedroom" }, { value: "bathroom", label: "Bathroom" },
          { value: "garage", label: "Garage" }, { value: "sunroom", label: "Sunroom" },
          { value: "adu", label: "ADU / Guest Suite" }, { value: "second-story", label: "Second Story" },
        ]} />
      <NumberInput label="Exact square footage" value={value.sqFt} onChange={(v) => set("sqFt", v)} unit="sqft" />
      <NumberInput label="Ceiling height" value={value.ceilingHeight} onChange={(v) => set("ceilingHeight", v)} unit="ft" min={7} max={20} />
      <RadioGroup label="Finish level" value={value.finishLevel} onChange={(v) => set("finishLevel", v as AdditionAnswersDetailed["finishLevel"])}
        options={[{ value: "standard", label: "Standard" }, { value: "upgraded", label: "Upgraded" }, { value: "premium", label: "Premium" }]} />
      <RadioGroup label="Foundation type" value={value.foundationType} onChange={(v) => set("foundationType", v as AdditionAnswersDetailed["foundationType"])}
        options={[{ value: "slab", label: "Slab" }, { value: "crawl", label: "Crawl Space" }, { value: "full-basement", label: "Full Basement" }]} />
      <div className="grid grid-cols-2 gap-4">
        <Stepper label="Windows" value={value.windowCount} onChange={(v) => set("windowCount", v)} max={20} />
        <Stepper label="Doors" value={value.doorCount} onChange={(v) => set("doorCount", v)} max={10} />
      </div>
    </div>
  );
}
