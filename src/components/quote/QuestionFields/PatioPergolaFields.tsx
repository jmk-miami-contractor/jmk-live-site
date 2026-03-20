"use client";

import type { PatioPergolaAnswersQuick, PatioPergolaAnswersDetailed } from "@/lib/quoteTypes";
import { RadioGroup, Toggle, NumberInput, Stepper } from "./FormPrimitives";

export const patioPergolaDefaultQuick: PatioPergolaAnswersQuick = {
  sqftRange: "200to400", surfaceMaterial: "pavers", isCovered: false, includesPergola: false, includesLighting: false,
};
export const patioPergolaDefaultDetailed: PatioPergolaAnswersDetailed = {
  patioSqFt: 300, surfaceMaterial: "pavers", pergolaSqFt: 0, pergolaMaterial: "aluminum",
  lightingFixtureCount: 0, includesElectrical: false,
};

export function PatioPergolaQuickFields({ value, onChange }: { value: PatioPergolaAnswersQuick; onChange: (v: PatioPergolaAnswersQuick) => void }) {
  const set = <K extends keyof PatioPergolaAnswersQuick>(k: K, v: PatioPergolaAnswersQuick[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-6">
      <RadioGroup label="Patio size" value={value.sqftRange} onChange={(v) => set("sqftRange", v as PatioPergolaAnswersQuick["sqftRange"])}
        options={[{ value: "under200", label: "Under 200 sqft" }, { value: "200to400", label: "200–400 sqft" }, { value: "400to700", label: "400–700 sqft" }, { value: "over700", label: "700+ sqft" }]} />
      <RadioGroup label="Surface material" value={value.surfaceMaterial} onChange={(v) => set("surfaceMaterial", v as PatioPergolaAnswersQuick["surfaceMaterial"])}
        options={[{ value: "concrete", label: "Concrete" }, { value: "pavers", label: "Pavers" }, { value: "travertine", label: "Travertine" }, { value: "wood-deck", label: "Wood Deck" }]} />
      <Toggle label="Covered / shade structure?" value={value.isCovered} onChange={(v) => set("isCovered", v)} />
      <Toggle label="Include a pergola?" value={value.includesPergola} onChange={(v) => set("includesPergola", v)} />
      <Toggle label="Include outdoor lighting?" value={value.includesLighting} onChange={(v) => set("includesLighting", v)} />
    </div>
  );
}

export function PatioPergolaDetailedFields({ value, onChange }: { value: PatioPergolaAnswersDetailed; onChange: (v: PatioPergolaAnswersDetailed) => void }) {
  const set = <K extends keyof PatioPergolaAnswersDetailed>(k: K, v: PatioPergolaAnswersDetailed[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-6">
      <NumberInput label="Patio square footage" value={value.patioSqFt} onChange={(v) => set("patioSqFt", v)} unit="sqft" />
      <RadioGroup label="Surface material" value={value.surfaceMaterial} onChange={(v) => set("surfaceMaterial", v as PatioPergolaAnswersDetailed["surfaceMaterial"])}
        options={[{ value: "concrete", label: "Concrete" }, { value: "pavers", label: "Pavers" }, { value: "travertine", label: "Travertine" }, { value: "wood-deck", label: "Wood Deck" }]} />
      <NumberInput label="Pergola square footage (0 if none)" value={value.pergolaSqFt} onChange={(v) => set("pergolaSqFt", v)} unit="sqft" />
      {value.pergolaSqFt > 0 && (
        <RadioGroup label="Pergola material" value={value.pergolaMaterial} onChange={(v) => set("pergolaMaterial", v as PatioPergolaAnswersDetailed["pergolaMaterial"])}
          options={[{ value: "wood", label: "Wood" }, { value: "aluminum", label: "Aluminum" }, { value: "steel", label: "Steel" }]} />
      )}
      <Stepper label="Outdoor lighting fixtures" value={value.lightingFixtureCount} onChange={(v) => set("lightingFixtureCount", v)} max={30} />
      <Toggle label="Electrical run needed?" value={value.includesElectrical} onChange={(v) => set("includesElectrical", v)} />
    </div>
  );
}
