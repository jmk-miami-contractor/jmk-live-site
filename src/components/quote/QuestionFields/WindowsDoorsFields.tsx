"use client";

import type { WindowsDoorsAnswersQuick, WindowsDoorsAnswersDetailed, WindowDimension } from "@/lib/quoteTypes";
import { RadioGroup, Toggle, NumberInput, Stepper } from "./FormPrimitives";

export const windowsDoorsDefaultQuick: WindowsDoorsAnswersQuick = {
  windowCount: 8, windowType: "standard", exteriorDoorCount: 2, interiorDoorCount: 6,
  doorStyle: "solid-core", hasSlidingDoors: false,
};
export const windowsDoorsDefaultDetailed: WindowsDoorsAnswersDetailed = {
  windows: [{ width: 36, height: 48 }], windowType: "standard",
  exteriorDoorCount: 2, interiorDoorCount: 6, doorStyle: "solid-core",
  baseboardLinFt: 200, slidingDoorCount: 0,
};

export function WindowsDoorsQuickFields({ value, onChange }: { value: WindowsDoorsAnswersQuick; onChange: (v: WindowsDoorsAnswersQuick) => void }) {
  const set = <K extends keyof WindowsDoorsAnswersQuick>(k: K, v: WindowsDoorsAnswersQuick[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-6">
      <Stepper label="Number of windows to replace" value={value.windowCount} onChange={(v) => set("windowCount", v)} max={40} />
      <RadioGroup label="Window type" value={value.windowType} onChange={(v) => set("windowType", v as WindowsDoorsAnswersQuick["windowType"])}
        options={[{ value: "standard", label: "Standard" }, { value: "impact", label: "Impact-Resistant" }, { value: "triple-pane", label: "Triple-Pane" }]} />
      <Stepper label="Exterior doors" value={value.exteriorDoorCount} onChange={(v) => set("exteriorDoorCount", v)} max={10} />
      <Stepper label="Interior doors" value={value.interiorDoorCount} onChange={(v) => set("interiorDoorCount", v)} max={30} />
      <RadioGroup label="Interior door style" value={value.doorStyle} onChange={(v) => set("doorStyle", v as WindowsDoorsAnswersQuick["doorStyle"])}
        options={[{ value: "hollow-core", label: "Hollow Core" }, { value: "solid-core", label: "Solid Core" }, { value: "custom", label: "Custom" }]} />
      <Toggle label="Any sliding glass or pocket doors?" value={value.hasSlidingDoors} onChange={(v) => set("hasSlidingDoors", v)} />
    </div>
  );
}

export function WindowsDoorsDetailedFields({ value, onChange }: { value: WindowsDoorsAnswersDetailed; onChange: (v: WindowsDoorsAnswersDetailed) => void }) {
  const setWindows = (windows: WindowDimension[]) => onChange({ ...value, windows });
  const addWindow = () => setWindows([...value.windows, { width: 36, height: 48 }]);
  const removeWindow = (i: number) => setWindows(value.windows.filter((_, idx) => idx !== i));
  const updateWindow = (i: number, field: keyof WindowDimension, val: number) =>
    setWindows(value.windows.map((w, idx) => idx === i ? { ...w, [field]: val } : w));

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-brand-primary mb-2">Windows (width × height in inches)</p>
        <div className="space-y-2">
          {value.windows.map((w, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span className="text-brand-primary/50 w-16">Window {i + 1}</span>
              <input type="number" value={w.width || ""} min={12} max={120} placeholder='W"'
                onChange={(e) => updateWindow(i, "width", parseFloat(e.target.value) || 0)}
                className="w-20 px-2 py-1.5 border border-brand-light/60 rounded-lg text-brand-primary focus:outline-none focus:border-brand-accent" />
              <span className="text-brand-primary/40">×</span>
              <input type="number" value={w.height || ""} min={12} max={120} placeholder='H"'
                onChange={(e) => updateWindow(i, "height", parseFloat(e.target.value) || 0)}
                className="w-20 px-2 py-1.5 border border-brand-light/60 rounded-lg text-brand-primary focus:outline-none focus:border-brand-accent" />
              <button type="button" onClick={() => removeWindow(i)} className="text-red-400 hover:text-red-600">✕</button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addWindow}
          className="mt-2 px-4 py-2 bg-brand-accent text-white text-sm rounded-lg hover:bg-brand-primary transition-colors">
          + Add Window
        </button>
      </div>

      <RadioGroup label="Window type" value={value.windowType} onChange={(v) => onChange({ ...value, windowType: v as WindowsDoorsAnswersDetailed["windowType"] })}
        options={[{ value: "standard", label: "Standard" }, { value: "impact", label: "Impact-Resistant" }, { value: "triple-pane", label: "Triple-Pane" }]} />
      <div className="grid grid-cols-2 gap-4">
        <Stepper label="Exterior doors" value={value.exteriorDoorCount} onChange={(v) => onChange({ ...value, exteriorDoorCount: v })} max={10} />
        <Stepper label="Interior doors" value={value.interiorDoorCount} onChange={(v) => onChange({ ...value, interiorDoorCount: v })} max={30} />
      </div>
      <RadioGroup label="Interior door style" value={value.doorStyle} onChange={(v) => onChange({ ...value, doorStyle: v as WindowsDoorsAnswersDetailed["doorStyle"] })}
        options={[{ value: "hollow-core", label: "Hollow Core" }, { value: "solid-core", label: "Solid Core" }, { value: "custom", label: "Custom" }]} />
      <NumberInput label="Linear feet of baseboard" value={value.baseboardLinFt} onChange={(v) => onChange({ ...value, baseboardLinFt: v })} unit="lin ft" />
      <Stepper label="Sliding / pocket doors" value={value.slidingDoorCount} onChange={(v) => onChange({ ...value, slidingDoorCount: v })} max={10} />
    </div>
  );
}
