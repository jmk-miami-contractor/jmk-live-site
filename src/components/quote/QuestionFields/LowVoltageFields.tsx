"use client";

import type { LowVoltageAnswersQuick, LowVoltageAnswersDetailed, LowVoltageService } from "@/lib/quoteTypes";
import { RadioGroup, NumberInput, Stepper, MultiCheckbox } from "./FormPrimitives";

export const lowVoltageDefaultQuick: LowVoltageAnswersQuick = {
  homeSqFt: 2000, services: ["networking"], networkingScope: "structured",
  avScope: "single-room", securityScope: "cameras", smartHomeLevel: "basic",
};
export const lowVoltageDefaultDetailed: LowVoltageAnswersDetailed = {
  roomCount: 8, services: ["networking"], networkingScope: "structured", cableDropCount: 12,
  avScope: "single-room", securityScope: "cameras", smartHomeLevel: "basic",
};

const serviceOptions = [
  { value: "networking" as LowVoltageService, label: "Networking", desc: "Cat6, Wi-Fi, structured cabling" },
  { value: "av" as LowVoltageService, label: "Audio-Visual", desc: "TVs, speakers, home theater" },
  { value: "security" as LowVoltageService, label: "Security", desc: "Cameras, alarm, access control" },
  { value: "smart-home" as LowVoltageService, label: "Smart Home", desc: "Lighting, shades, climate control" },
];

export function LowVoltageQuickFields({ value, onChange }: { value: LowVoltageAnswersQuick; onChange: (v: LowVoltageAnswersQuick) => void }) {
  const set = <K extends keyof LowVoltageAnswersQuick>(k: K, v: LowVoltageAnswersQuick[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-6">
      <NumberInput label="Home square footage" value={value.homeSqFt} onChange={(v) => set("homeSqFt", v)} unit="sqft" />
      <MultiCheckbox<LowVoltageService> label="Which services?" value={value.services} onChange={(v) => set("services", v)} options={serviceOptions} />
      {value.services.includes("networking") && (
        <RadioGroup label="Networking scope" value={value.networkingScope} onChange={(v) => set("networkingScope", v as LowVoltageAnswersQuick["networkingScope"])}
          options={[{ value: "basic", label: "Basic" }, { value: "structured", label: "Structured Cabling" }, { value: "whole-home-wifi", label: "Whole-Home Wi-Fi" }]} />
      )}
      {value.services.includes("av") && (
        <RadioGroup label="AV scope" value={value.avScope} onChange={(v) => set("avScope", v as LowVoltageAnswersQuick["avScope"])}
          options={[{ value: "single-room", label: "Single Room" }, { value: "multi-room", label: "Multi-Room" }, { value: "whole-home", label: "Whole-Home System" }]} />
      )}
      {value.services.includes("security") && (
        <RadioGroup label="Security scope" value={value.securityScope} onChange={(v) => set("securityScope", v as LowVoltageAnswersQuick["securityScope"])}
          options={[{ value: "basic", label: "Basic Alarm" }, { value: "cameras", label: "Camera System" }, { value: "full-system", label: "Full System" }]} />
      )}
      {value.services.includes("smart-home") && (
        <RadioGroup label="Smart home level" value={value.smartHomeLevel} onChange={(v) => set("smartHomeLevel", v as LowVoltageAnswersQuick["smartHomeLevel"])}
          options={[{ value: "basic", label: "Basic" }, { value: "mid", label: "Mid-Level" }, { value: "full-automation", label: "Full Automation" }]} />
      )}
    </div>
  );
}

export function LowVoltageDetailedFields({ value, onChange }: { value: LowVoltageAnswersDetailed; onChange: (v: LowVoltageAnswersDetailed) => void }) {
  const set = <K extends keyof LowVoltageAnswersDetailed>(k: K, v: LowVoltageAnswersDetailed[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-6">
      <Stepper label="Number of rooms" value={value.roomCount} onChange={(v) => set("roomCount", v)} min={1} max={30} />
      <MultiCheckbox<LowVoltageService> label="Which services?" value={value.services} onChange={(v) => set("services", v)} options={serviceOptions} />
      {value.services.includes("networking") && (
        <>
          <RadioGroup label="Networking scope" value={value.networkingScope} onChange={(v) => set("networkingScope", v as LowVoltageAnswersDetailed["networkingScope"])}
            options={[{ value: "basic", label: "Basic" }, { value: "structured", label: "Structured Cabling" }, { value: "whole-home-wifi", label: "Whole-Home Wi-Fi" }]} />
          <NumberInput label="Structured cabling drops" value={value.cableDropCount} onChange={(v) => set("cableDropCount", v)} unit="drops" max={100} />
        </>
      )}
      {value.services.includes("av") && (
        <RadioGroup label="AV scope" value={value.avScope} onChange={(v) => set("avScope", v as LowVoltageAnswersDetailed["avScope"])}
          options={[{ value: "single-room", label: "Single Room" }, { value: "multi-room", label: "Multi-Room" }, { value: "whole-home", label: "Whole-Home System" }]} />
      )}
      {value.services.includes("security") && (
        <RadioGroup label="Security scope" value={value.securityScope} onChange={(v) => set("securityScope", v as LowVoltageAnswersDetailed["securityScope"])}
          options={[{ value: "basic", label: "Basic Alarm" }, { value: "cameras", label: "Camera System" }, { value: "full-system", label: "Full System" }]} />
      )}
      {value.services.includes("smart-home") && (
        <RadioGroup label="Smart home level" value={value.smartHomeLevel} onChange={(v) => set("smartHomeLevel", v as LowVoltageAnswersDetailed["smartHomeLevel"])}
          options={[{ value: "basic", label: "Basic" }, { value: "mid", label: "Mid-Level" }, { value: "full-automation", label: "Full Automation" }]} />
      )}
    </div>
  );
}
