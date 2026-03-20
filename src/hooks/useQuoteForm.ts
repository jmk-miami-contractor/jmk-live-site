"use client";

import { useReducer } from "react";
import type { ProjectType, InputMode, QuoteAnswers, ContactInfo, PriceRange } from "@/lib/quoteTypes";

export type WizardStep = 1 | 2 | 3 | 4 | 5;

export interface FormState {
  step: WizardStep;
  typeIndex: number; // which project type we're on in step 2
  projectTypes: ProjectType[];
  inputMode: InputMode;
  answers: Partial<Omit<QuoteAnswers, "projectTypes" | "inputMode" | "contact" | "finishes">>;
  /** Finishes answers per project type: { "${catId}.tier" | "${catId}.${questionId}": value } */
  finishes: Partial<Record<ProjectType, Record<string, string>>>;
  contact: ContactInfo;
  estimate: PriceRange | null;
  isSubmitting: boolean;
  submitError: string | null;
}

type Action =
  | { type: "SET_PROJECT_TYPES"; payload: ProjectType[] }
  | { type: "SET_INPUT_MODE"; payload: InputMode }
  | { type: "SET_TYPE_ANSWER"; projectType: ProjectType; answer: unknown }
  | { type: "SET_TYPE_FINISHES"; projectType: ProjectType; finishes: Record<string, string> }
  | { type: "NEXT_TYPE" }
  | { type: "SET_CONTACT"; payload: ContactInfo }
  | { type: "SET_ESTIMATE"; payload: PriceRange }
  | { type: "GO_TO_STEP"; payload: WizardStep }
  | { type: "SET_SUBMITTING"; payload: boolean }
  | { type: "SET_SUBMIT_ERROR"; payload: string | null }
  | { type: "RESET" };

const initialContact: ContactInfo = { name: "", phone: "", email: "", address: "", city: "", zip: "" };

function buildInitialState(initialProjectTypes: ProjectType[] = []): FormState {
  return {
    step: 1,
    typeIndex: 0,
    projectTypes: initialProjectTypes,
    inputMode: "quick",
    answers: {},
    finishes: {},
    contact: initialContact,
    estimate: null,
    isSubmitting: false,
    submitError: null,
  };
}

function reducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "SET_PROJECT_TYPES":
      return { ...state, projectTypes: action.payload };

    case "SET_INPUT_MODE":
      return { ...state, inputMode: action.payload };

    case "SET_TYPE_ANSWER":
      return {
        ...state,
        answers: { ...state.answers, [action.projectType]: action.answer },
      };

    case "SET_TYPE_FINISHES":
      return {
        ...state,
        finishes: { ...state.finishes, [action.projectType]: action.finishes },
      };

    case "NEXT_TYPE":
      return { ...state, typeIndex: state.typeIndex + 1 };

    case "SET_CONTACT":
      return { ...state, contact: action.payload };

    case "SET_ESTIMATE":
      return { ...state, estimate: action.payload };

    case "GO_TO_STEP":
      return { ...state, step: action.payload, typeIndex: 0 };

    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.payload };

    case "SET_SUBMIT_ERROR":
      return { ...state, submitError: action.payload };

    case "RESET":
      return buildInitialState();

    default:
      return state;
  }
}

export function useQuoteForm(initialProjectTypes: ProjectType[] = []) {
  const [state, dispatch] = useReducer(reducer, initialProjectTypes, buildInitialState);

  const setProjectTypes = (types: ProjectType[]) =>
    dispatch({ type: "SET_PROJECT_TYPES", payload: types });

  const setInputMode = (mode: InputMode) =>
    dispatch({ type: "SET_INPUT_MODE", payload: mode });

  const setTypeAnswer = (projectType: ProjectType, answer: unknown) =>
    dispatch({ type: "SET_TYPE_ANSWER", projectType, answer });

  const setTypeFinishes = (projectType: ProjectType, fin: Record<string, string>) =>
    dispatch({ type: "SET_TYPE_FINISHES", projectType, finishes: fin });

  const nextType = () => dispatch({ type: "NEXT_TYPE" });

  const setContact = (contact: ContactInfo) =>
    dispatch({ type: "SET_CONTACT", payload: contact });

  const setEstimate = (estimate: PriceRange) =>
    dispatch({ type: "SET_ESTIMATE", payload: estimate });

  const goToStep = (step: WizardStep) =>
    dispatch({ type: "GO_TO_STEP", payload: step });

  const setSubmitting = (v: boolean) =>
    dispatch({ type: "SET_SUBMITTING", payload: v });

  const setSubmitError = (err: string | null) =>
    dispatch({ type: "SET_SUBMIT_ERROR", payload: err });

  const reset = () => dispatch({ type: "RESET" });

  return {
    state,
    setProjectTypes,
    setInputMode,
    setTypeAnswer,
    setTypeFinishes,
    nextType,
    setContact,
    setEstimate,
    goToStep,
    setSubmitting,
    setSubmitError,
    reset,
  };
}
