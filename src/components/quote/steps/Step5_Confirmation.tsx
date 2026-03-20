"use client";

import Link from "next/link";
import type { PriceRange, ContactInfo, ProjectType } from "@/lib/quoteTypes";
import { PROJECT_TYPE_LABELS } from "@/lib/quoteTypes";
import { formatCurrency } from "@/lib/pricing";

interface Props {
  estimate: PriceRange;
  contact: ContactInfo;
  projectTypes: ProjectType[];
  onReset: () => void;
}

export default function Step5_Confirmation({ estimate, contact, projectTypes, onReset }: Props) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-full bg-brand-accent/20 flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-brand-primary mb-2">Request Received!</h2>
      <p className="text-brand-primary/60 text-sm max-w-sm mx-auto mb-6">
        A member of the JMK team will contact <strong>{contact.name}</strong> at {contact.phone} within 1 business day to discuss your project.
      </p>

      {/* Summary */}
      <div className="bg-brand-neutral/30 border border-brand-light/40 rounded-xl p-5 text-left mb-6">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {projectTypes.map((t) => (
            <span key={t} className="px-2.5 py-0.5 bg-brand-accent/20 text-brand-accent text-xs font-semibold rounded-full">
              {PROJECT_TYPE_LABELS[t]}
            </span>
          ))}
        </div>
        <p className="text-sm text-brand-primary/60">Estimate range</p>
        <p className="text-2xl font-bold text-brand-primary">
          {formatCurrency(estimate.low)} – {formatCurrency(estimate.high)}
        </p>
      </div>

      <button type="button" onClick={onReset}
        className="w-full bg-brand-primary hover:bg-brand-accent text-white font-semibold py-3.5 rounded-xl transition-colors mb-3">
        Start a New Quote
      </button>

      <Link href="/" className="block text-sm text-brand-primary/50 hover:text-brand-primary transition-colors">
        ← Back to JMK Home
      </Link>
    </div>
  );
}
