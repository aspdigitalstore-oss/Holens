import type { InquiryPayload } from "@/lib/inquiry";
import { COMPANY } from "@/lib/company";

const INQUIRY_RECORD_KEY = "vitala_inquiry_records";

export function saveInquiryRecord(payload: InquiryPayload) {
  try {
    const raw = window.localStorage.getItem(INQUIRY_RECORD_KEY);
    const existing = raw ? (JSON.parse(raw) as InquiryPayload[]) : [];
    window.localStorage.setItem(INQUIRY_RECORD_KEY, JSON.stringify([payload, ...existing]));
  } catch {
    // The server remains the source of truth if browser storage is unavailable.
  }
}

export function buildInquiryEmailBody(payload: InquiryPayload) {
  const items = payload.items
    .map((item) => `${item.brandName} - ${item.productName}: ${item.quantity} units`)
    .join("\n");

  return `New wholesale inquiry received:

Company name: ${payload.details.companyName}
Contact person: ${payload.details.contactPerson}
Email: ${payload.details.email}
Phone number: ${payload.details.phoneNumber}
Country: ${payload.details.country}
Business type: ${payload.details.businessType}

Products requested:
${items}

Notes:
${payload.details.notes || "None"}

Total units: ${payload.totalUnits}
Submitted at: ${payload.submittedAt}`;
}

export function createInquiryMailtoLink(payload: InquiryPayload) {
  const subject = encodeURIComponent(`Wholesale inquiry from ${payload.details.companyName}`);
  const body = encodeURIComponent(buildInquiryEmailBody(payload));
  return `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
}
