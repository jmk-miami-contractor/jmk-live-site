"use client";

import { useState, useEffect, useCallback } from "react";
import type { ContactInfo } from "@/lib/quoteTypes";

interface Props {
  value: ContactInfo;
  onChange: (v: ContactInfo) => void;
  onValidChange?: (isValid: boolean) => void;
}

// ── Validation helpers ─────────────────────────────────────────────────────────

function validateName(v: string): string {
  return v.trim().length > 0 ? "" : "Full name is required.";
}

function validatePhone(v: string): string {
  const digits = v.replace(/\D/g, "");
  if (digits.length === 0) return "Phone number is required.";
  if (digits.length !== 10) return "Must be a 10-digit US phone number.";
  return "";
}

function validateEmail(v: string): string {
  if (v.trim().length === 0) return "Email address is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return "Enter a valid email address.";
  return "";
}

function validateAddress(v: string): string {
  return v.trim().length > 0 ? "" : "Project address is required.";
}

/** Format a 10-digit string as (XXX) XXX-XXXX */
function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

// ── Field component ────────────────────────────────────────────────────────────

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
}

function Field({ label, value, onChange, onBlur, type = "text", placeholder, required = true, error, touched }: FieldProps) {
  const hasError = touched && !!error;
  return (
    <div>
      <label className="block text-sm font-semibold text-brand-primary mb-1">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full px-3 py-2.5 border rounded-lg text-sm text-brand-primary focus:outline-none transition-colors ${
          hasError
            ? "border-red-400 focus:border-red-500 bg-red-50/30"
            : "border-brand-light/60 focus:border-brand-accent"
        }`}
      />
      {hasError && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
          <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function Step3_ContactInfo({ value, onChange, onValidChange }: Props) {
  const [errors, setErrors] = useState({ name: "", phone: "", email: "", address: "" });
  const [touched, setTouched] = useState({ name: false, phone: false, email: false, address: false });

  const set = <K extends keyof ContactInfo>(k: K, v: ContactInfo[K]) =>
    onChange({ ...value, [k]: v });

  // Re-compute validity whenever value or errors change
  const isValid = useCallback(() => {
    return (
      validateName(value.name)    === "" &&
      validatePhone(value.phone)  === "" &&
      validateEmail(value.email)  === "" &&
      validateAddress(value.address) === ""
    );
  }, [value]);

  useEffect(() => {
    onValidChange?.(isValid());
  }, [isValid, onValidChange]);

  // ── Blur handlers ────────────────────────────────────────────────────────────

  function blurName() {
    setTouched((t) => ({ ...t, name: true }));
    setErrors((e) => ({ ...e, name: validateName(value.name) }));
  }

  function blurPhone() {
    setTouched((t) => ({ ...t, phone: true }));
    // Format the phone on blur if it's a valid 10-digit number
    const digits = value.phone.replace(/\D/g, "");
    if (digits.length === 10) {
      set("phone", formatPhone(digits));
    }
    setErrors((e) => ({ ...e, phone: validatePhone(value.phone) }));
  }

  function blurEmail() {
    setTouched((t) => ({ ...t, email: true }));
    setErrors((e) => ({ ...e, email: validateEmail(value.email) }));
  }

  function blurAddress() {
    setTouched((t) => ({ ...t, address: true }));
    setErrors((e) => ({ ...e, address: validateAddress(value.address) }));
  }

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div>
      <h2 className="text-2xl font-bold text-brand-primary mb-1">Your Contact Information</h2>
      <p className="text-brand-primary/50 text-sm mb-6">We&apos;ll use this to follow up with your detailed estimate.</p>

      <div className="space-y-4">
        <Field
          label="Full Name"
          value={value.name}
          onChange={(v) => set("name", v)}
          onBlur={blurName}
          placeholder="John Smith"
          error={errors.name}
          touched={touched.name}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="Phone Number"
            value={value.phone}
            onChange={(v) => set("phone", v)}
            onBlur={blurPhone}
            type="tel"
            placeholder="(305) 000-0000"
            error={errors.phone}
            touched={touched.phone}
          />
          <Field
            label="Email Address"
            value={value.email}
            onChange={(v) => set("email", v)}
            onBlur={blurEmail}
            type="email"
            placeholder="john@example.com"
            error={errors.email}
            touched={touched.email}
          />
        </div>

        <Field
          label="Project Address"
          value={value.address}
          onChange={(v) => set("address", v)}
          onBlur={blurAddress}
          placeholder="123 Main St"
          error={errors.address}
          touched={touched.address}
        />

        <div className="grid grid-cols-2 gap-4">
          <Field
            label="City"
            value={value.city}
            onChange={(v) => set("city", v)}
            placeholder="Miami"
            required={false}
          />
          <Field
            label="ZIP Code"
            value={value.zip}
            onChange={(v) => set("zip", v)}
            placeholder="33101"
            required={false}
          />
        </div>
      </div>

      <p className="mt-4 text-xs text-brand-primary/40">
        Your information is never sold or shared. We&apos;ll only use it to contact you about your project.
      </p>
    </div>
  );
}
