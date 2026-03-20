"use client";

import { useState } from "react";
import { useQuoteForm } from "@/hooks/useQuoteForm";
import { calculateTotalEstimate } from "@/lib/pricing";
import { sendQuoteLead } from "@/lib/emailjs";
import type { QuoteAnswers, ProjectType } from "@/lib/quoteTypes";
import { PROJECT_TYPE_LABELS } from "@/lib/quoteTypes";
import { getDefaultAnswer } from "./steps/Step2_Questions";

import ProgressBar from "./ProgressBar";
import Step1_ProjectType from "./steps/Step1_ProjectType";
import Step1b_InputMode from "./steps/Step1b_InputMode";
import Step2_Questions from "./steps/Step2_Questions";
import Step3b_Finishes from "./steps/Step3b_Finishes";
import Step3b_QuickTier from "./steps/Step3b_QuickTier";
import Step3_ContactInfo from "./steps/Step3_ContactInfo";
import Step4_Estimate from "./steps/Step4_Estimate";
import Step5_Confirmation from "./steps/Step5_Confirmation";

const VALID_TYPES: ProjectType[] = [
  "kitchen", "bathroom", "fullHome", "addition", "flooring",
  "windowsDoors", "lighting", "lowVoltage", "roofing", "hardscape", "fencing",
];

export default function QuoteWizard({ initialType }: { initialType?: string }) {
  const preselected: ProjectType[] = VALID_TYPES.includes(initialType as ProjectType)
    ? [initialType as ProjectType]
    : [];

  const {
    state, setProjectTypes, setInputMode, setTypeAnswer, setTypeFinishes, nextType,
    setContact, setEstimate, goToStep, setSubmitting, setSubmitError, reset,
  } = useQuoteForm(preselected);

  const { step, typeIndex, projectTypes, inputMode, answers, finishes, contact, estimate, isSubmitting, submitError } = state;

  // Contact form validation state — gated by Step3_ContactInfo's onValidChange callback
  const [contactValid, setContactValid] = useState(false);

  // Step 3 sub-phase: "questions" → "selections" for each project type
  const [step3SubPhase, setStep3SubPhase] = useState<"questions" | "selections">("questions");

  // ── Step navigation helpers ────────────────────────────────────────────────
  const currentTypeForStep2 = projectTypes[typeIndex];
  const isLastType = typeIndex >= projectTypes.length - 1;

  function handleStep1Next() {
    if (projectTypes.length === 0) return;
    goToStep(2); // goes to 1b (input mode) - we use step 2 to represent 1b+questions combined
  }

  // We use a local "sub-step" approach: step=2 covers input mode selection (typeIndex=-1 via a flag)
  // We'll track whether we've shown input mode yet with the typeIndex: if typeIndex === -1 → show mode selector
  // Actually let's use a cleaner approach: render based on step + a separate inputModeShown flag

  function handleStep1bNext() {
    goToStep(3); // step 3 = questions
  }

  function handleQuestionsNext() {
    // Initialize answer with defaults if not yet set
    if (!answers[currentTypeForStep2 as keyof typeof answers]) {
      setTypeAnswer(currentTypeForStep2, getDefaultAnswer(currentTypeForStep2, inputMode));
    }
    // Always go to selections sub-phase next
    setStep3SubPhase("selections");
  }

  function handleSelectionsNext() {
    if (isLastType) {
      // All types done → go to contact
      setStep3SubPhase("questions"); // reset for back-navigation
      goToStep(4);
    } else {
      // Move to next project type, back to questions phase
      nextType();
      setStep3SubPhase("questions");
    }
  }

  function handleContactNext() {
    if (!contact.name || !contact.phone || !contact.email || !contact.address) return;
    // Build full answers and calculate
    const fullAnswers: QuoteAnswers = {
      projectTypes,
      inputMode,
      contact,
      finishes,
      ...answers,
    } as QuoteAnswers;
    const result = calculateTotalEstimate(fullAnswers);
    setEstimate(result);
    goToStep(5);
  }

  async function handleSubmit() {
    if (!estimate) return;
    setSubmitting(true);
    setSubmitError(null);

    // Build project details string
    const details = projectTypes
      .map((t) => {
        const ans = answers[t as keyof typeof answers];
        return `${PROJECT_TYPE_LABELS[t]}: ${JSON.stringify(ans, null, 0)}`;
      })
      .join("\n");

    try {
      await sendQuoteLead({
        contactName: contact.name,
        contactPhone: contact.phone,
        contactEmail: contact.email,
        contactAddress: contact.address,
        contactCity: contact.city,
        contactZip: contact.zip,
        projectTypes,
        inputMode,
        estimate,
        projectDetails: details,
      });
      goToStep(6 as never);
    } catch {
      setSubmitError("Unable to send your request at this time.");
    } finally {
      setSubmitting(false);
    }
  }

  // Map internal steps to the ProgressBar (1–5)
  const progressStep = step <= 2 ? 1 : step === 3 ? 2 : step === 4 ? 3 : step === 5 ? 4 : 5;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <div className="bg-brand-primary px-6 py-4 flex items-center justify-between">
        <a href="/" className="text-brand-light/70 hover:text-white text-sm transition-colors">← JMK Home</a>
        <span className="text-white font-semibold text-sm">Instant Quote</span>
        <span className="text-brand-light/40 text-xs">Free · No commitment</span>
      </div>

      {/* Content */}
      <div className="flex-1 flex justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          {/* Don't show progress on confirmation */}
          {(step as number) < 6 && <ProgressBar currentStep={progressStep} />}

          <div className="bg-white rounded-2xl shadow-sm border border-brand-light/30 p-6 md:p-8">

            {/* Step 1 — Project Type */}
            {step === 1 && (
              <>
                <Step1_ProjectType selected={projectTypes} onChange={setProjectTypes} />
                <div className="mt-8 flex justify-end">
                  <button onClick={handleStep1Next} disabled={projectTypes.length === 0}
                    className="bg-brand-accent hover:bg-brand-primary disabled:opacity-40 text-white font-bold px-8 py-3 rounded-xl transition-colors">
                    Next →
                  </button>
                </div>
              </>
            )}

            {/* Step 2 — Input Mode */}
            {step === 2 && (
              <>
                <Step1b_InputMode value={inputMode} onChange={setInputMode} />
                <div className="mt-8 flex justify-between">
                  <button onClick={() => goToStep(1)} className="text-brand-primary/50 hover:text-brand-primary text-sm transition-colors">← Back</button>
                  <button onClick={handleStep1bNext} className="bg-brand-accent hover:bg-brand-primary text-white font-bold px-8 py-3 rounded-xl transition-colors">
                    Start Questions →
                  </button>
                </div>
              </>
            )}

            {/* Step 3 — Type-Specific Questions */}
            {step === 3 && currentTypeForStep2 && step3SubPhase === "questions" && (
              <>
                <Step2_Questions
                  projectType={currentTypeForStep2}
                  typeIndex={typeIndex}
                  totalTypes={projectTypes.length}
                  mode={inputMode}
                  answers={answers}
                  onChange={setTypeAnswer}
                />
                <div className="mt-8 flex justify-between">
                  <button
                    onClick={() => {
                      if (typeIndex === 0) {
                        goToStep(2);
                      }
                      // going back to a previous type is not wired (would need prevType action)
                    }}
                    className="text-brand-primary/50 hover:text-brand-primary text-sm transition-colors">
                    ← Back
                  </button>
                  <button
                    onClick={handleQuestionsNext}
                    className="bg-brand-accent hover:bg-brand-primary text-white font-bold px-8 py-3 rounded-xl transition-colors">
                    {inputMode === "quick" ? "Choose Finish Level →" : "Choose Finishes →"}
                  </button>
                </div>
              </>
            )}

            {/* Step 3 — Finish Quality (Quick mode: single tier selector) */}
            {step === 3 && currentTypeForStep2 && step3SubPhase === "selections" && inputMode === "quick" && (
              <Step3b_QuickTier
                projectType={currentTypeForStep2}
                typeIndex={typeIndex}
                totalTypes={projectTypes.length}
                value={finishes[currentTypeForStep2] ?? {}}
                onChange={(v) => setTypeFinishes(currentTypeForStep2, v)}
                onBack={() => setStep3SubPhase("questions")}
                onComplete={handleSelectionsNext}
              />
            )}

            {/* Step 3 — Finishes & Materials (Detailed mode: category-by-category) */}
            {step === 3 && currentTypeForStep2 && step3SubPhase === "selections" && inputMode === "detailed" && (
              <Step3b_Finishes
                projectType={currentTypeForStep2}
                typeIndex={typeIndex}
                totalTypes={projectTypes.length}
                inputMode={inputMode}
                value={finishes[currentTypeForStep2] ?? {}}
                onChange={(v) => setTypeFinishes(currentTypeForStep2, v)}
                onBack={() => setStep3SubPhase("questions")}
                onComplete={handleSelectionsNext}
              />
            )}

            {/* Step 4 — Contact */}
            {step === 4 && (
              <>
                <Step3_ContactInfo value={contact} onChange={setContact} onValidChange={setContactValid} />
                <div className="mt-8 flex justify-between">
                  <button onClick={() => goToStep(3)} className="text-brand-primary/50 hover:text-brand-primary text-sm transition-colors">← Back</button>
                  <button onClick={handleContactNext}
                    disabled={!contactValid}
                    className="bg-brand-accent hover:bg-brand-primary disabled:opacity-40 text-white font-bold px-8 py-3 rounded-xl transition-colors">
                    See My Estimate →
                  </button>
                </div>
              </>
            )}

            {/* Step 5 — Estimate */}
            {step === 5 && estimate && (
              <Step4_Estimate
                estimate={estimate}
                projectTypes={projectTypes}
                isSubmitting={isSubmitting}
                submitError={submitError}
                onSubmit={handleSubmit}
                onBack={() => goToStep(4)}
              />
            )}

            {/* Step 6 — Confirmation */}
            {(step as number) === 6 && estimate && (
              <Step5_Confirmation
                estimate={estimate}
                contact={contact}
                projectTypes={projectTypes}
                onReset={reset}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
