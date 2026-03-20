"use client";

import { useState } from "react";
import type { FlooringAnswersQuick, FlooringAnswersDetailed, FlooringRoom } from "@/lib/quoteTypes";
import { RadioGroup, Toggle, NumberInput } from "./FormPrimitives";

export const flooringDefaultQuick: FlooringAnswersQuick = {
  totalSqFt: 1000, material: "lvp", includesRemoval: true, subfloorCondition: "good", stairsRange: "none",
};
export const flooringDefaultDetailed: FlooringAnswersDetailed = {
  rooms: [{ name: "Living Room", sqFt: 300 }], material: "lvp",
  includesRemoval: true, subfloorCondition: "good", stairCount: 0,
};

export function FlooringQuickFields({ value, onChange }: { value: FlooringAnswersQuick; onChange: (v: FlooringAnswersQuick) => void }) {
  const set = <K extends keyof FlooringAnswersQuick>(k: K, v: FlooringAnswersQuick[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-6">
      <NumberInput label="Total square footage to floor" value={value.totalSqFt} onChange={(v) => set("totalSqFt", v)} unit="sqft" />
      <RadioGroup label="Flooring material" value={value.material} onChange={(v) => set("material", v as FlooringAnswersQuick["material"])}
        options={[{ value: "carpet", label: "Carpet" }, { value: "lvp", label: "LVP" }, { value: "engineered", label: "Engineered Hardwood" }, { value: "hardwood", label: "Hardwood" }, { value: "tile", label: "Tile" }]} />
      <Toggle label="Remove existing flooring?" value={value.includesRemoval} onChange={(v) => set("includesRemoval", v)} />
      <RadioGroup label="Subfloor condition" value={value.subfloorCondition} onChange={(v) => set("subfloorCondition", v as FlooringAnswersQuick["subfloorCondition"])}
        options={[{ value: "good", label: "Good — no repair needed" }, { value: "minor", label: "Minor repairs" }, { value: "major", label: "Major repairs" }]} />
      <RadioGroup label="Stairs" value={value.stairsRange} onChange={(v) => set("stairsRange", v as FlooringAnswersQuick["stairsRange"])}
        options={[{ value: "none", label: "None" }, { value: "few", label: "1–10 steps" }, { value: "many", label: "11–20 steps" }]} />
    </div>
  );
}

export function FlooringDetailedFields({ value, onChange }: { value: FlooringAnswersDetailed; onChange: (v: FlooringAnswersDetailed) => void }) {
  const [newRoomName, setNewRoomName] = useState("");

  const setRooms = (rooms: FlooringRoom[]) => onChange({ ...value, rooms });
  const addRoom = () => {
    if (!newRoomName.trim()) return;
    setRooms([...value.rooms, { name: newRoomName.trim(), sqFt: 0 }]);
    setNewRoomName("");
  };
  const removeRoom = (i: number) => setRooms(value.rooms.filter((_, idx) => idx !== i));
  const updateRoom = (i: number, field: keyof FlooringRoom, val: string | number) =>
    setRooms(value.rooms.map((r, idx) => idx === i ? { ...r, [field]: val } : r));

  return (
    <div className="space-y-6">
      {/* Room list */}
      <div>
        <p className="text-sm font-semibold text-brand-primary mb-2">Rooms</p>
        <div className="space-y-3">
          {value.rooms.map((room, i) => (
            <div key={i} className="flex items-center gap-3">
              <input value={room.name} onChange={(e) => updateRoom(i, "name", e.target.value)}
                className="flex-1 px-3 py-2 border border-brand-light/60 rounded-lg text-sm text-brand-primary focus:outline-none focus:border-brand-accent" />
              <input type="number" value={room.sqFt || ""} placeholder="sqft" min={0}
                onChange={(e) => updateRoom(i, "sqFt", parseFloat(e.target.value) || 0)}
                className="w-24 px-3 py-2 border border-brand-light/60 rounded-lg text-sm text-brand-primary focus:outline-none focus:border-brand-accent" />
              <span className="text-sm text-brand-primary/50">sqft</span>
              <button type="button" onClick={() => removeRoom(i)} className="text-red-400 hover:text-red-600 text-sm">✕</button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-3">
          <input value={newRoomName} onChange={(e) => setNewRoomName(e.target.value)}
            placeholder="Room name (e.g. Kitchen)"
            onKeyDown={(e) => e.key === "Enter" && addRoom()}
            className="flex-1 px-3 py-2 border border-brand-light/60 rounded-lg text-sm text-brand-primary focus:outline-none focus:border-brand-accent" />
          <button type="button" onClick={addRoom}
            className="px-4 py-2 bg-brand-accent text-white text-sm rounded-lg hover:bg-brand-primary transition-colors">
            + Add Room
          </button>
        </div>
      </div>

      <RadioGroup label="Flooring material" value={value.material} onChange={(v) => onChange({ ...value, material: v as FlooringAnswersDetailed["material"] })}
        options={[{ value: "carpet", label: "Carpet" }, { value: "lvp", label: "LVP" }, { value: "engineered", label: "Engineered Hardwood" }, { value: "hardwood", label: "Hardwood" }, { value: "tile", label: "Tile" }]} />
      <Toggle label="Remove existing flooring?" value={value.includesRemoval} onChange={(v) => onChange({ ...value, includesRemoval: v })} />
      <RadioGroup label="Subfloor condition" value={value.subfloorCondition} onChange={(v) => onChange({ ...value, subfloorCondition: v as FlooringAnswersDetailed["subfloorCondition"] })}
        options={[{ value: "good", label: "Good — no repair needed" }, { value: "minor", label: "Minor repairs" }, { value: "major", label: "Major repairs" }]} />
      <NumberInput label="Number of stairs to floor" value={value.stairCount} onChange={(v) => onChange({ ...value, stairCount: v })} unit="steps" max={50} />
    </div>
  );
}
