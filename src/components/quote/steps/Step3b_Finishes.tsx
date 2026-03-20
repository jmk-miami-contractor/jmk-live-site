"use client";

import { useState } from "react";
import {
  getFinishCategories,
  isFinishQuestionVisible,
} from "@/lib/finishesConfig";
import type { FinishCategory, FinishOption, FinishQuestion } from "@/lib/finishesConfig";
import { PROJECT_TYPE_LABELS } from "@/lib/quoteTypes";
import type { ProjectType, InputMode } from "@/lib/quoteTypes";

interface Props {
  projectType: ProjectType;
  typeIndex: number;
  totalTypes: number;
  inputMode: InputMode;
  /** Flat finishes answers for this project type: { "${catId}.tier" | "${catId}.${questionId}": value } */
  value: Record<string, string>;
  onChange: (v: Record<string, string>) => void;
  onBack: () => void;
  onComplete: () => void;
}

// ── Price label helper ──────────────────────────────────────────────────────

function fmt(n: number): string {
  if (n >= 1000) return `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`;
  return `$${n}`;
}

function priceLabel(opt: FinishOption): string {
  if (opt.priceLow === 0 && opt.priceHigh === 0) return "Included";
  if (opt.priceLow === opt.priceHigh) return `+${fmt(opt.priceLow)}`;
  return `+${fmt(opt.priceLow)} – ${fmt(opt.priceHigh)}`;
}

// ── Option card ─────────────────────────────────────────────────────────────

interface CardProps {
  opt: FinishOption;
  selected: boolean;
  onSelect: () => void;
  compact?: boolean;
}

function OptionCard({ opt, selected, onSelect, compact = false }: CardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left rounded-xl border-2 transition-all duration-150 flex flex-col gap-1 ${
        compact ? "p-2.5" : "p-3"
      } ${
        selected
          ? "border-brand-accent ring-1 ring-brand-accent bg-brand-accent/5"
          : "border-brand-light/40 hover:border-brand-primary/30 bg-white"
      }`}
    >
      {opt.emoji && (
        <span className={`leading-none ${compact ? "text-lg" : "text-2xl"}`}>
          {opt.emoji}
        </span>
      )}
      <span
        className={`font-semibold leading-snug ${compact ? "text-xs" : "text-sm"} ${
          selected ? "text-brand-accent" : "text-brand-primary"
        }`}
      >
        {opt.label}
      </span>
      {opt.description && (
        <span
          className={`text-brand-primary/50 leading-snug ${
            compact ? "text-[11px] line-clamp-2" : "text-xs"
          }`}
        >
          {opt.description}
        </span>
      )}
      <span
        className={`text-xs font-semibold mt-0.5 ${
          opt.priceLow === 0 ? "text-brand-primary/40" : "text-brand-accent"
        }`}
      >
        {priceLabel(opt)}
      </span>
    </button>
  );
}

// ── Grid layout helper ──────────────────────────────────────────────────────

function gridClass(count: number): string {
  if (count <= 2) return "grid-cols-2";
  if (count === 3) return "grid-cols-3";
  if (count === 4) return "grid-cols-2 sm:grid-cols-4";
  return "grid-cols-2 sm:grid-cols-3";
}

// ── Quick mode — flat tier cards ────────────────────────────────────────────

interface QuickModeProps {
  cat: FinishCategory;
  value: Record<string, string>;
  onSelect: (optValue: string) => void;
}

function QuickMode({ cat, value, onSelect }: QuickModeProps) {
  const tierKey = `${cat.id}.tier`;
  const selected = value[tierKey] ?? cat.quickOptions[0]?.value ?? "";

  return (
    <div className={`grid gap-3 ${gridClass(cat.quickOptions.length)}`}>
      {cat.quickOptions.map((opt) => (
        <OptionCard
          key={opt.value}
          opt={opt}
          selected={selected === opt.value}
          onSelect={() => onSelect(opt.value)}
        />
      ))}
    </div>
  );
}

// ── Question row — detailed mode ────────────────────────────────────────────

interface QuestionRowProps {
  question: FinishQuestion;
  catId: string;
  value: Record<string, string>;
  onSelect: (questionId: string, optValue: string) => void;
}

function QuestionRow({ question, catId, value, onSelect }: QuestionRowProps) {
  const key = `${catId}.${question.id}`;
  const selected =
    value[key] ?? question.defaultValue ?? question.options[0]?.value ?? "";
  const compact = question.options.length >= 4;

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-brand-primary">{question.label}</p>
      {question.notes && (
        <p className="text-xs text-amber-600/80 bg-amber-50 border border-amber-200/60 rounded-lg px-3 py-1.5">
          ⚠️ {question.notes}
        </p>
      )}
      <div className={`grid gap-2 ${gridClass(question.options.length)}`}>
        {question.options.map((opt) => (
          <OptionCard
            key={opt.value}
            opt={opt}
            selected={selected === opt.value}
            onSelect={() => onSelect(question.id, opt.value)}
            compact={compact}
          />
        ))}
      </div>
    </div>
  );
}

// ── Detailed mode — progressive question reveal ─────────────────────────────

interface DetailedModeProps {
  cat: FinishCategory;
  value: Record<string, string>;
  onSelect: (questionId: string, newValue: string) => void;
}

function DetailedMode({ cat, value, onSelect }: DetailedModeProps) {
  const visibleQuestions = cat.detailedQuestions.filter((q) =>
    isFinishQuestionVisible(q, value, cat.id)
  );

  return (
    <div className="space-y-5">
      {visibleQuestions.map((q) => (
        <QuestionRow
          key={q.id}
          question={q}
          catId={cat.id}
          value={value}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

// ── Category running total ──────────────────────────────────────────────────

function calcCategoryTotal(
  cat: FinishCategory,
  value: Record<string, string>,
  inputMode: InputMode
): { low: number; high: number } {
  let low = 0,
    high = 0;

  if (inputMode === "quick") {
    const tierKey = `${cat.id}.tier`;
    const selected = value[tierKey] ?? cat.quickOptions[0]?.value;
    const opt = cat.quickOptions.find((o) => o.value === selected);
    if (opt) {
      low += opt.priceLow;
      high += opt.priceHigh;
    }
  } else {
    const visible = cat.detailedQuestions.filter((q) =>
      isFinishQuestionVisible(q, value, cat.id)
    );
    for (const q of visible) {
      const key = `${cat.id}.${q.id}`;
      const selected = value[key] ?? q.defaultValue ?? q.options[0]?.value;
      const opt = q.options.find((o) => o.value === selected);
      if (opt) {
        low += opt.priceLow;
        high += opt.priceHigh;
      }
    }
  }
  return { low, high };
}

// ── Main component ──────────────────────────────────────────────────────────

export default function Step3b_Finishes({
  projectType,
  typeIndex,
  totalTypes,
  inputMode,
  value,
  onChange,
  onBack,
  onComplete,
}: Props) {
  const [categoryIndex, setCategoryIndex] = useState(0);

  const categories = getFinishCategories(projectType, inputMode);
  const cat = categories[categoryIndex];

  // Edge case: no applicable categories for this project type
  if (categories.length === 0) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">✨</span>
          <h2 className="text-2xl font-bold text-brand-primary">
            Finishes &amp; Materials
          </h2>
        </div>
        <p className="text-brand-primary/60 text-sm mb-6">
          {PROJECT_TYPE_LABELS[projectType]}
        </p>
        <p className="text-brand-primary/40 text-sm italic">
          No finish selections for this project type.
        </p>
        <div className="mt-8 flex justify-between">
          <button
            onClick={onBack}
            className="text-brand-primary/50 hover:text-brand-primary text-sm transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={onComplete}
            className="bg-brand-accent hover:bg-brand-primary text-white font-bold px-8 py-3 rounded-xl transition-colors"
          >
            Continue →
          </button>
        </div>
      </div>
    );
  }

  const isFirstCategory = categoryIndex === 0;
  const isLastCategory = categoryIndex === categories.length - 1;
  const nextCat = categories[categoryIndex + 1];

  // ── Event handlers ────────────────────────────────────────────────────────

  function handleQuickSelect(optValue: string) {
    onChange({ ...value, [`${cat.id}.tier`]: optValue });
  }

  function handleDetailedSelect(questionId: string, newValue: string) {
    const newAnswers = { ...value, [`${cat.id}.${questionId}`]: newValue };

    // Iteratively clear phantom child answers that are no longer visible
    let changed = true;
    while (changed) {
      changed = false;
      for (const q of cat.detailedQuestions) {
        if (q.showIf) {
          const k = `${cat.id}.${q.id}`;
          if (k in newAnswers && !isFinishQuestionVisible(q, newAnswers, cat.id)) {
            delete newAnswers[k];
            changed = true;
          }
        }
      }
    }

    onChange(newAnswers);
  }

  function handleNext() {
    if (isLastCategory) {
      onComplete();
    } else {
      setCategoryIndex((i) => i + 1);
    }
  }

  function handleBack() {
    if (isFirstCategory) {
      onBack();
    } else {
      setCategoryIndex((i) => i - 1);
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────

  const { low, high } = calcCategoryTotal(cat, value, inputMode);
  const hasUpgrade = low > 0 || high > 0;
  const typeLabel = PROJECT_TYPE_LABELS[projectType];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="text-xl">{cat.icon}</span>
          <h2 className="text-2xl font-bold text-brand-primary">{cat.label}</h2>
        </div>
        <span className="text-xs text-brand-primary/30 shrink-0 ml-2">
          {categoryIndex + 1} / {categories.length}
        </span>
      </div>

      <p className="text-brand-primary/60 text-sm mb-0.5">
        {typeLabel}
        {totalTypes > 1 && (
          <span className="ml-2 text-brand-primary/40">
            — Project {typeIndex + 1} of {totalTypes}
          </span>
        )}
      </p>
      <p className="text-brand-primary/40 text-xs mb-5">
        {inputMode === "quick"
          ? "Pick a tier — Standard is included at no extra cost."
          : "Defaults are pre-selected. Upgrade any option to see the price impact."}
      </p>

      {/* Category options */}
      {inputMode === "quick" ? (
        <QuickMode cat={cat} value={value} onSelect={handleQuickSelect} />
      ) : (
        <DetailedMode
          cat={cat}
          value={value}
          onSelect={handleDetailedSelect}
        />
      )}

      {/* Running total for this category */}
      {hasUpgrade && (
        <div className="mt-5 p-3 bg-brand-accent/8 border border-brand-accent/20 rounded-xl flex items-center justify-between">
          <span className="text-sm text-brand-primary/70">
            Upgrade add-ons selected:
          </span>
          <span className="text-sm font-bold text-brand-accent">
            +{fmt(low)}{low !== high ? ` – ${fmt(high)}` : ""}
          </span>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={handleBack}
          className="text-brand-primary/50 hover:text-brand-primary text-sm transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="bg-brand-accent hover:bg-brand-primary text-white font-bold px-8 py-3 rounded-xl transition-colors"
        >
          {isLastCategory
            ? "Continue →"
            : `${nextCat.icon} ${nextCat.label} →`}
        </button>
      </div>
    </div>
  );
}
