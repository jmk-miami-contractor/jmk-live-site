import emailjs from "@emailjs/browser";
import type { ProjectType, PriceRange } from "./quoteTypes";
import { PROJECT_TYPE_LABELS } from "./quoteTypes";
import { formatCurrency as fmt } from "./pricing";

export interface EmailPayload {
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  contactCity: string;
  contactZip: string;
  projectTypes: ProjectType[];
  inputMode: string;
  estimate: PriceRange;
  projectDetails: string;
}

export async function sendQuoteLead(payload: EmailPayload): Promise<void> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  const isConfigured =
    serviceId && templateId && publicKey &&
    !serviceId.includes("xxx") &&
    !templateId.includes("xxx") &&
    !publicKey.includes("xxx");

  if (!isConfigured) {
    console.warn("EmailJS not configured — skipping email send");
    return;
  }

  const templateParams = {
    to_email: process.env.NEXT_PUBLIC_JMK_EMAIL,
    contact_name: payload.contactName,
    contact_phone: payload.contactPhone,
    contact_email: payload.contactEmail,
    contact_address: `${payload.contactAddress}, ${payload.contactCity}, ${payload.contactZip}`,
    project_types: payload.projectTypes.map((t) => PROJECT_TYPE_LABELS[t]).join(", "),
    input_mode: payload.inputMode === "quick" ? "Quick Estimate" : "Detailed Measurements",
    estimate_low: fmt(payload.estimate.low),
    estimate_high: fmt(payload.estimate.high),
    project_details: payload.projectDetails,
    submitted_at: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
  };

  await emailjs.send(serviceId, templateId, templateParams, publicKey);
}
