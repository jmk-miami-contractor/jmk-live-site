const STEPS = ["Project Type", "Details", "Contact", "Your Estimate", "Done"];

export default function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between gap-1 mb-2">
        {STEPS.map((label, i) => {
          const stepNum = i + 1;
          const isComplete = currentStep > stepNum;
          const isActive = currentStep === stepNum;
          return (
            <div key={label} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors
                  ${isComplete ? "bg-brand-accent text-white" : isActive ? "bg-brand-primary text-white" : "bg-brand-neutral text-brand-primary/40"}`}
              >
                {isComplete ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              <span className={`text-xs hidden sm:block ${isActive ? "text-brand-primary font-semibold" : "text-brand-primary/40"}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
      {/* Progress bar line */}
      <div className="relative h-1 bg-brand-neutral rounded-full overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-brand-accent rounded-full transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}
