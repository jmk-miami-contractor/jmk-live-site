"use client";

import QuoteWizard from "@/components/quote/QuoteWizard";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function QuotePageInner() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") ?? undefined;
  return <QuoteWizard initialType={type} />;
}

export default function QuotePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-bg" />}>
      <QuotePageInner />
    </Suspense>
  );
}
