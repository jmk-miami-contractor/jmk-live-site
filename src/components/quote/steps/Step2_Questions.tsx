"use client";

import type { ProjectType, InputMode, QuoteAnswers } from "@/lib/quoteTypes";
import { PROJECT_TYPE_LABELS } from "@/lib/quoteTypes";

import { KitchenQuickFields, KitchenDetailedFields, kitchenDefaultQuick, kitchenDefaultDetailed } from "../QuestionFields/KitchenFields";
import { BathroomQuickFields, BathroomDetailedFields, bathroomDefaultQuick, bathroomDefaultDetailed } from "../QuestionFields/BathroomFields";
import { FullHomeQuickFields, FullHomeDetailedFields, fullHomeDefaultQuick, fullHomeDefaultDetailed } from "../QuestionFields/FullHomeFields";
import { AdditionQuickFields, AdditionDetailedFields, additionDefaultQuick, additionDefaultDetailed } from "../QuestionFields/AdditionFields";
import { FlooringQuickFields, FlooringDetailedFields, flooringDefaultQuick, flooringDefaultDetailed } from "../QuestionFields/FlooringFields";
import { WindowsDoorsQuickFields, WindowsDoorsDetailedFields, windowsDoorsDefaultQuick, windowsDoorsDefaultDetailed } from "../QuestionFields/WindowsDoorsFields";
import { LightingQuickFields, LightingDetailedFields, lightingDefaultQuick, lightingDefaultDetailed } from "../QuestionFields/LightingFields";
import { LowVoltageQuickFields, LowVoltageDetailedFields, lowVoltageDefaultQuick, lowVoltageDefaultDetailed } from "../QuestionFields/LowVoltageFields";
import { RoofingQuickFields, RoofingDetailedFields, roofingDefaultQuick, roofingDefaultDetailed } from "../QuestionFields/RoofingFields";
import { HardscapeQuickFields, HardscapeDetailedFields, hardscapeDefaultQuick, hardscapeDefaultDetailed } from "../QuestionFields/HardscapeFields";
import { FencingQuickFields, FencingDetailedFields, fencingDefaultQuick, fencingDefaultDetailed } from "../QuestionFields/FencingFields";
import { OutdoorKitchenQuickFields, OutdoorKitchenDetailedFields, outdoorKitchenDefaultQuick, outdoorKitchenDefaultDetailed } from "../QuestionFields/OutdoorKitchenFields";
import { PoolQuickFields, PoolDetailedFields, poolDefaultQuick, poolDefaultDetailed } from "../QuestionFields/PoolFields";
import { PatioPergolaQuickFields, PatioPergolaDetailedFields, patioPergolaDefaultQuick, patioPergolaDefaultDetailed } from "../QuestionFields/PatioPergolaFields";
import { ExteriorCladdingQuickFields, ExteriorCladdingDetailedFields, exteriorCladdingDefaultQuick, exteriorCladdingDefaultDetailed } from "../QuestionFields/ExteriorCladdingFields";

// Default values by type+mode
export function getDefaultAnswer(type: ProjectType, mode: InputMode): unknown {
  if (mode === "quick") {
    const map: Record<ProjectType, unknown> = {
      kitchen: kitchenDefaultQuick, bathroom: bathroomDefaultQuick, fullHome: fullHomeDefaultQuick,
      addition: additionDefaultQuick, flooring: flooringDefaultQuick, windowsDoors: windowsDoorsDefaultQuick,
      lighting: lightingDefaultQuick, lowVoltage: lowVoltageDefaultQuick, roofing: roofingDefaultQuick,
      hardscape: hardscapeDefaultQuick, fencing: fencingDefaultQuick,
      outdoorKitchen: outdoorKitchenDefaultQuick, pool: poolDefaultQuick, patioPergola: patioPergolaDefaultQuick,
      exteriorCladding: exteriorCladdingDefaultQuick,
    };
    return map[type];
  } else {
    const map: Record<ProjectType, unknown> = {
      kitchen: kitchenDefaultDetailed, bathroom: bathroomDefaultDetailed, fullHome: fullHomeDefaultDetailed,
      addition: additionDefaultDetailed, flooring: flooringDefaultDetailed, windowsDoors: windowsDoorsDefaultDetailed,
      lighting: lightingDefaultDetailed, lowVoltage: lowVoltageDefaultDetailed, roofing: roofingDefaultDetailed,
      hardscape: hardscapeDefaultDetailed, fencing: fencingDefaultDetailed,
      outdoorKitchen: outdoorKitchenDefaultDetailed, pool: poolDefaultDetailed, patioPergola: patioPergolaDefaultDetailed,
      exteriorCladding: exteriorCladdingDefaultDetailed,
    };
    return map[type];
  }
}

interface Props {
  projectType: ProjectType;
  typeIndex: number;
  totalTypes: number;
  mode: InputMode;
  answers: Partial<Omit<QuoteAnswers, "projectTypes" | "inputMode" | "contact">>;
  onChange: (type: ProjectType, answer: unknown) => void;
}

export default function Step2_Questions({ projectType, typeIndex, totalTypes, mode, answers, onChange }: Props) {
  const answer = answers[projectType] ?? getDefaultAnswer(projectType, mode);
  const set = (v: unknown) => onChange(projectType, v);

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <h2 className="text-2xl font-bold text-brand-primary">{PROJECT_TYPE_LABELS[projectType]}</h2>
        {totalTypes > 1 && (
          <span className="text-sm text-brand-primary/40 font-medium">({typeIndex + 1} of {totalTypes})</span>
        )}
      </div>
      <p className="text-brand-primary/50 text-sm mb-6">
        {mode === "quick" ? "Answer a few quick questions and we'll estimate the rest." : "Enter your measurements for a more precise range."}
      </p>

      {/* Render the correct fields component */}
      {projectType === "kitchen" && mode === "quick" && <KitchenQuickFields value={answer as Parameters<typeof KitchenQuickFields>[0]["value"]} onChange={set} />}
      {projectType === "kitchen" && mode === "detailed" && <KitchenDetailedFields value={answer as Parameters<typeof KitchenDetailedFields>[0]["value"]} onChange={set} />}
      {projectType === "bathroom" && mode === "quick" && <BathroomQuickFields value={answer as Parameters<typeof BathroomQuickFields>[0]["value"]} onChange={set} />}
      {projectType === "bathroom" && mode === "detailed" && <BathroomDetailedFields value={answer as Parameters<typeof BathroomDetailedFields>[0]["value"]} onChange={set} />}
      {projectType === "fullHome" && mode === "quick" && <FullHomeQuickFields value={answer as Parameters<typeof FullHomeQuickFields>[0]["value"]} onChange={set} />}
      {projectType === "fullHome" && mode === "detailed" && <FullHomeDetailedFields value={answer as Parameters<typeof FullHomeDetailedFields>[0]["value"]} onChange={set} />}
      {projectType === "addition" && mode === "quick" && <AdditionQuickFields value={answer as Parameters<typeof AdditionQuickFields>[0]["value"]} onChange={set} />}
      {projectType === "addition" && mode === "detailed" && <AdditionDetailedFields value={answer as Parameters<typeof AdditionDetailedFields>[0]["value"]} onChange={set} />}
      {projectType === "flooring" && mode === "quick" && <FlooringQuickFields value={answer as Parameters<typeof FlooringQuickFields>[0]["value"]} onChange={set} />}
      {projectType === "flooring" && mode === "detailed" && <FlooringDetailedFields value={answer as Parameters<typeof FlooringDetailedFields>[0]["value"]} onChange={set} />}
      {projectType === "windowsDoors" && mode === "quick" && <WindowsDoorsQuickFields value={answer as Parameters<typeof WindowsDoorsQuickFields>[0]["value"]} onChange={set} />}
      {projectType === "windowsDoors" && mode === "detailed" && <WindowsDoorsDetailedFields value={answer as Parameters<typeof WindowsDoorsDetailedFields>[0]["value"]} onChange={set} />}
      {projectType === "lighting" && mode === "quick" && <LightingQuickFields value={answer as Parameters<typeof LightingQuickFields>[0]["value"]} onChange={set} />}
      {projectType === "lighting" && mode === "detailed" && <LightingDetailedFields value={answer as Parameters<typeof LightingDetailedFields>[0]["value"]} onChange={set} />}
      {projectType === "lowVoltage" && mode === "quick" && <LowVoltageQuickFields value={answer as Parameters<typeof LowVoltageQuickFields>[0]["value"]} onChange={set} />}
      {projectType === "lowVoltage" && mode === "detailed" && <LowVoltageDetailedFields value={answer as Parameters<typeof LowVoltageDetailedFields>[0]["value"]} onChange={set} />}
      {projectType === "roofing" && mode === "quick" && <RoofingQuickFields value={answer as Parameters<typeof RoofingQuickFields>[0]["value"]} onChange={set} />}
      {projectType === "roofing" && mode === "detailed" && <RoofingDetailedFields value={answer as Parameters<typeof RoofingDetailedFields>[0]["value"]} onChange={set} />}
      {projectType === "hardscape" && mode === "quick" && <HardscapeQuickFields value={answer as Parameters<typeof HardscapeQuickFields>[0]["value"]} onChange={set} />}
      {projectType === "hardscape" && mode === "detailed" && <HardscapeDetailedFields value={answer as Parameters<typeof HardscapeDetailedFields>[0]["value"]} onChange={set} />}
      {projectType === "fencing" && mode === "quick" && <FencingQuickFields value={answer as Parameters<typeof FencingQuickFields>[0]["value"]} onChange={set} />}
      {projectType === "fencing" && mode === "detailed" && <FencingDetailedFields value={answer as Parameters<typeof FencingDetailedFields>[0]["value"]} onChange={set} />}
      {projectType === "outdoorKitchen" && mode === "quick" && <OutdoorKitchenQuickFields value={answer as Parameters<typeof OutdoorKitchenQuickFields>[0]["value"]} onChange={set} />}
      {projectType === "outdoorKitchen" && mode === "detailed" && <OutdoorKitchenDetailedFields value={answer as Parameters<typeof OutdoorKitchenDetailedFields>[0]["value"]} onChange={set} />}
      {projectType === "pool" && mode === "quick" && <PoolQuickFields value={answer as Parameters<typeof PoolQuickFields>[0]["value"]} onChange={set} />}
      {projectType === "pool" && mode === "detailed" && <PoolDetailedFields value={answer as Parameters<typeof PoolDetailedFields>[0]["value"]} onChange={set} />}
      {projectType === "patioPergola" && mode === "quick" && <PatioPergolaQuickFields value={answer as Parameters<typeof PatioPergolaQuickFields>[0]["value"]} onChange={set} />}
      {projectType === "patioPergola" && mode === "detailed" && <PatioPergolaDetailedFields value={answer as Parameters<typeof PatioPergolaDetailedFields>[0]["value"]} onChange={set} />}
      {projectType === "exteriorCladding" && mode === "quick" && <ExteriorCladdingQuickFields value={answer as Parameters<typeof ExteriorCladdingQuickFields>[0]["value"]} onChange={set} />}
      {projectType === "exteriorCladding" && mode === "detailed" && <ExteriorCladdingDetailedFields value={answer as Parameters<typeof ExteriorCladdingDetailedFields>[0]["value"]} onChange={set} />}
    </div>
  );
}
