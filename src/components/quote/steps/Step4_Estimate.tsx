"use client";

import type { PriceRange, ProjectType } from "@/lib/quoteTypes";
import { PROJECT_TYPE_LABELS } from "@/lib/quoteTypes";
import { formatCurrency } from "@/lib/pricing";

interface Props {
  estimate: PriceRange;
  projectTypes: ProjectType[];
  isSubmitting: boolean;
  submitError: string | null;
  onSubmit: () => void;
  onBack: () => void;
}

export default function Step4_Estimate({ estimate, projectTypes, isSubmitting, submitError, onSubmit, onBack }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-brand-primary mb-1">Your Estimated Investment</h2>
      <p className="text-brand-primary/50 text-sm mb-6">Based on your project details and current South Florida market rates.</p>

      {/* Project type pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {projectTypes.map((t) => (
          <span key={t} className="px-3 py-1 bg-brand-light/40 text-brand-primary text-xs font-semibold rounded-full">
            {PROJECT_TYPE_LABELS[t]}
          </span>
        ))}
        {projectTypes.length >= 2 && (
          <span className="px-3 py-1 bg-brand-accent/20 text-brand-accent text-xs font-semibold rounded-full">
            5% multi-project discount applied
          </span>
        )}
      </div>

      {/* Price range */}
      <div className="bg-brand-primary rounded-2xl p-8 text-center mb-6">
        <p className="text-brand-light/70 text-sm mb-2">Estimated Range</p>
        <p className="text-4xl md:text-5xl font-bold text-white">
          {formatCurrency(estimate.low)} – {formatCurrency(estimate.high)}
        </p>
        <p className="text-brand-light/50 text-xs mt-3">
          {projectTypes.length >= 2 ? "Combined project total" : PROJECT_TYPE_LABELS[projectTypes[0]]}
        </p>
      </div>

      {/* Disclaimer */}
      <div className="bg-brand-neutral/30 border border-brand-light/40 rounded-xl p-4 mb-6">
        <p className="text-xs text-brand-primary/60 leading-relaxed">
          <strong className="text-brand-primary">Estimate Disclaimer:</strong> This estimate is for planning purposes only and does not constitute a contract or binding quote. Actual costs vary based on site conditions, final material selections, local permit requirements, and labor market conditions. Contact JMK for a detailed on-site assessment.
        </p>
      </div>

      {/* Submit */}
      {submitError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {submitError} — Please try again or call us directly.
        </div>
      )}

      <button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting}
        className="w-full bg-brand-accent hover:bg-brand-primary disabled:opacity-60 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending your request…
          </>
        ) : (
          "Submit My Quote Request"
        )}
      </button>

      <button type="button" onClick={onBack}
        className="w-full mt-3 py-3 text-sm text-brand-primary/50 hover:text-brand-primary transition-colors">
        ← Adjust my answers
      </button>
    </div>
  );
}
