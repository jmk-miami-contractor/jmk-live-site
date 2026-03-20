"use client";

import { useState } from "react";
import type { LightingAnswersQuick, LightingAnswersDetailed, LightingRoom } from "@/lib/quoteTypes";
import { RadioGroup, Toggle, NumberInput, Stepper } from "./FormPrimitives";

export const lightingDefaultQuick: LightingAnswersQuick = {
  homeSqFt: 2000, scope: "whole-home", fixtureLevel: "upgraded",
  includesRecessed: true, includesOutdoor: false, panelUpgrade: false,
};
export const lightingDefaultDetailed: LightingAnswersDetailed = {
  rooms: [{ name: "Living Room", fixtureCount: 6, fixtureType: "recessed" }],
  outdoorFixtureCount: 0, panelUpgrade: false, fixtureLevel: "upgraded",
};

export function LightingQuickFields({ value, onChange }: { value: LightingAnswersQuick; onChange: (v: LightingAnswersQuick) => void }) {
  const set = <K extends keyof LightingAnswersQuick>(k: K, v: LightingAnswersQuick[K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-6">
      <NumberInput label="Home square footage" value={value.homeSqFt} onChange={(v) => set("homeSqFt", v)} unit="sqft" />
      <RadioGroup label="Lighting scope" value={value.scope} onChange={(v) => set("scope", v as LightingAnswersQuick["scope"])}
        options={[{ value: "single-room", label: "Single Room" }, { value: "partial", label: "Partial Home" }, { value: "whole-home", label: "Whole Home" }]} />
      <RadioGroup label="Fixture level" value={value.fixtureLevel} onChange={(v) => set("fixtureLevel", v as LightingAnswersQuick["fixtureLevel"])}
        options={[{ value: "standard", label: "Standard" }, { value: "upgraded", label: "Upgraded" }, { value: "designer", label: "Designer" }]} />
      <Toggle label="Add recessed lighting?" value={value.includesRecessed} onChange={(v) => set("includesRecessed", v)} />
      <Toggle label="Outdoor lighting package?" value={value.includesOutdoor} onChange={(v) => set("includesOutdoor", v)} />
      <Toggle label="Electrical panel upgrade needed?" value={value.panelUpgrade} onChange={(v) => set("panelUpgrade", v)} />
    </div>
  );
}

export function LightingDetailedFields({ value, onChange }: { value: LightingAnswersDetailed; onChange: (v: LightingAnswersDetailed) => void }) {
  const [newRoomName, setNewRoomName] = useState("");
  const setRooms = (rooms: LightingRoom[]) => onChange({ ...value, rooms });
  const addRoom = () => {
    if (!newRoomName.trim()) return;
    setRooms([...value.rooms, { name: newRoomName.trim(), fixtureCount: 4, fixtureType: "recessed" }]);
    setNewRoomName("");
  };
  const removeRoom = (i: number) => setRooms(value.rooms.filter((_, idx) => idx !== i));
  const updateRoom = (i: number, field: keyof LightingRoom, val: string | number) =>
    setRooms(value.rooms.map((r, idx) => idx === i ? { ...r, [field]: val } : r));

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-brand-primary mb-2">Rooms</p>
        <div className="space-y-3">
          {value.rooms.map((room, i) => (
            <div key={i} className="bg-brand-neutral/30 rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2">
                <input value={room.name} onChange={(e) => updateRoom(i, "name", e.target.value)}
                  className="flex-1 px-2 py-1.5 border border-brand-light/60 rounded-lg text-sm text-brand-primary focus:outline-none focus:border-brand-accent" />
                <button type="button" onClick={() => removeRoom(i)} className="text-red-400 hover:text-red-600 text-sm">✕</button>
              </div>
              <div className="flex items-center gap-3">
                <Stepper label="Fixtures" value={room.fixtureCount} onChange={(v) => updateRoom(i, "fixtureCount", v)} max={30} />
                <div>
                  <p className="text-xs text-brand-primary/50 mb-1">Type</p>
                  <select value={room.fixtureType} onChange={(e) => updateRoom(i, "fixtureType", e.target.value)}
                    className="px-2 py-1.5 border border-brand-light/60 rounded-lg text-sm text-brand-primary focus:outline-none focus:border-brand-accent">
                    <option value="recessed">Recessed</option>
                    <option value="standard">Standard</option>
                    <option value="pendant">Pendant</option>
                    <option value="chandelier">Chandelier</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-3">
          <input value={newRoomName} onChange={(e) => setNewRoomName(e.target.value)} placeholder="Room name"
            onKeyDown={(e) => e.key === "Enter" && addRoom()}
            className="flex-1 px-3 py-2 border border-brand-light/60 rounded-lg text-sm text-brand-primary focus:outline-none focus:border-brand-accent" />
          <button type="button" onClick={addRoom}
            className="px-4 py-2 bg-brand-accent text-white text-sm rounded-lg hover:bg-brand-primary transition-colors">+ Add Room</button>
        </div>
      </div>
      <RadioGroup label="Fixture level" value={value.fixtureLevel} onChange={(v) => onChange({ ...value, fixtureLevel: v as LightingAnswersDetailed["fixtureLevel"] })}
        options={[{ value: "standard", label: "Standard" }, { value: "upgraded", label: "Upgraded" }, { value: "designer", label: "Designer" }]} />
      <Stepper label="Outdoor fixtures" value={value.outdoorFixtureCount} onChange={(v) => onChange({ ...value, outdoorFixtureCount: v })} max={30} />
      <Toggle label="Electrical panel upgrade?" value={value.panelUpgrade} onChange={(v) => onChange({ ...value, panelUpgrade: v })} />
    </div>
  );
}
