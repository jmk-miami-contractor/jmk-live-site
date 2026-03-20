"use client";

import type { InputMode } from "@/lib/quoteTypes";

interface Props {
  value: InputMode;
  onChange: (mode: InputMode) => void;
}

export default function Step1b_InputMode({ value, onChange }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-brand-primary mb-1">How would you like to provide details?</h2>
      <p className="text-brand-primary/50 text-sm mb-8">Both options produce a useful estimate — Detailed just gives a tighter range.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button type="button" onClick={() => onChange("quick")}
          className={`flex flex-col items-start text-left p-6 rounded-2xl border-2 transition-all
            ${value === "quick" ? "border-brand-accent bg-brand-primary text-white" : "border-brand-light/40 bg-white text-brand-primary hover:border-brand-accent"}`}>
          <div className="text-3xl mb-3">⚡</div>
          <div className="font-bold text-lg mb-1">Quick Estimate</div>
          <div className={`text-sm leading-relaxed ${value === "quick" ? "text-white/70" : "text-brand-primary/50"}`}>
            Answer a few simple questions. We estimate quantities for you.
          </div>
          <div className={`mt-3 text-xs font-semibold ${value === "quick" ? "text-brand-light" : "text-brand-accent"}`}>~2 minutes</div>
        </button>

        <button type="button" onClick={() => onChange("detailed")}
          className={`flex flex-col items-start text-left p-6 rounded-2xl border-2 transition-all
            ${value === "detailed" ? "border-brand-accent bg-brand-primary text-white" : "border-brand-light/40 bg-white text-brand-primary hover:border-brand-accent"}`}>
          <div className="text-3xl mb-3">📐</div>
          <div className="font-bold text-lg mb-1">Detailed Measurements</div>
          <div className={`text-sm leading-relaxed ${value === "detailed" ? "text-white/70" : "text-brand-primary/50"}`}>
            Enter exact dimensions, counts, and specs for a more precise estimate range.
          </div>
          <div className={`mt-3 text-xs font-semibold ${value === "detailed" ? "text-brand-light" : "text-brand-accent"}`}>~5 minutes</div>
        </button>
      </div>
    </div>
  );
}
