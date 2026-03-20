"use client";

// ── RadioGroup ────────────────────────────────────────────────────────────────
interface RadioOption { value: string; label: string; desc?: string; }
export function RadioGroup({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: RadioOption[];
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-brand-primary mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`flex flex-col items-start px-4 py-2.5 rounded-lg border text-sm transition-all
              ${value === opt.value
                ? "bg-brand-primary text-white border-brand-primary"
                : "bg-white text-brand-primary border-brand-light/60 hover:border-brand-accent"}`}
          >
            <span className="font-medium">{opt.label}</span>
            {opt.desc && <span className={`text-xs mt-0.5 ${value === opt.value ? "text-white/70" : "text-brand-primary/50"}`}>{opt.desc}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Toggle ────────────────────────────────────────────────────────────────────
export function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold text-brand-primary">{label}</span>
      <div className="flex gap-2">
        <button type="button" onClick={() => onChange(false)}
          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all
            ${!value ? "bg-brand-primary text-white border-brand-primary" : "bg-white text-brand-primary border-brand-light/60 hover:border-brand-accent"}`}>
          No
        </button>
        <button type="button" onClick={() => onChange(true)}
          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all
            ${value ? "bg-brand-primary text-white border-brand-primary" : "bg-white text-brand-primary border-brand-light/60 hover:border-brand-accent"}`}>
          Yes
        </button>
      </div>
    </div>
  );
}

// ── NumberInput ───────────────────────────────────────────────────────────────
export function NumberInput({ label, value, onChange, unit, min = 0, max = 99999, placeholder }: {
  label: string; value: number; onChange: (v: number) => void;
  unit?: string; min?: number; max?: number; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-brand-primary mb-1">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value || ""}
          min={min}
          max={max}
          placeholder={placeholder ?? "0"}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            if (!isNaN(v)) onChange(Math.max(min, Math.min(max, v)));
          }}
          className="w-36 px-3 py-2 border border-brand-light/60 rounded-lg text-sm text-brand-primary focus:outline-none focus:border-brand-accent"
        />
        {unit && <span className="text-sm text-brand-primary/50">{unit}</span>}
      </div>
    </div>
  );
}

// ── Stepper ───────────────────────────────────────────────────────────────────
export function Stepper({ label, value, onChange, min = 0, max = 30 }: {
  label: string; value: number; onChange: (v: number) => void; min?: number; max?: number;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-brand-primary mb-2">{label}</p>
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))}
          className="w-9 h-9 rounded-lg border border-brand-light/60 text-brand-primary hover:border-brand-accent flex items-center justify-center text-lg font-bold">−</button>
        <span className="w-8 text-center text-brand-primary font-semibold">{value}</span>
        <button type="button" onClick={() => onChange(Math.min(max, value + 1))}
          className="w-9 h-9 rounded-lg border border-brand-light/60 text-brand-primary hover:border-brand-accent flex items-center justify-center text-lg font-bold">+</button>
      </div>
    </div>
  );
}

// ── MultiCheckbox ─────────────────────────────────────────────────────────────
export function MultiCheckbox<T extends string>({ label, value, onChange, options }: {
  label: string; value: T[]; onChange: (v: T[]) => void;
  options: { value: T; label: string; desc?: string }[];
}) {
  const toggle = (v: T) =>
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  return (
    <div>
      <p className="text-sm font-semibold text-brand-primary mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value.includes(opt.value);
          return (
            <button key={opt.value} type="button" onClick={() => toggle(opt.value)}
              className={`flex flex-col items-start px-4 py-2.5 rounded-lg border text-sm transition-all
                ${selected ? "bg-brand-primary text-white border-brand-primary" : "bg-white text-brand-primary border-brand-light/60 hover:border-brand-accent"}`}>
              <span className="font-medium">{opt.label}</span>
              {opt.desc && <span className={`text-xs mt-0.5 ${selected ? "text-white/70" : "text-brand-primary/50"}`}>{opt.desc}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── FormSection ───────────────────────────────────────────────────────────────
export function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-3">{title}</p>
      <div className="space-y-4 pl-3 border-l-2 border-brand-light">{children}</div>
    </div>
  );
}
