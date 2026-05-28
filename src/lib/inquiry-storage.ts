import type { InquiryPayload, InquiryDetails } from "./inquiry";

const INQUIRY_RECORD_KEY = "vitala_inquiry_records";

export function saveInquiryRecord(payload: InquiryPayload) {
  try {
    const raw = window.localStorage.getItem(INQUIRY_RECORD_KEY);
    const existing = raw ? (JSON.parse(raw) as InquiryPayload[]) : [];
    window.localStorage.setItem(INQUIRY_RECORD_KEY, JSON.stringify([payload, ...existing]));
  } catch {
    // fail silently for browser storage
  }
}

export function buildInquiryEmailBody(payload: InquiryPayload) {
  const items = payload.items
    .map((item) => `${item.brandName} — ${item.productName}: ${item.quantity} units`)
    .join("\n");

  return `New bulk inquiry received:\n\nCompany name: ${payload.details.companyName}\nContact person: ${payload.details.contactPerson}\nBusiness email: ${payload.details.businessEmail}\nCountry: ${payload.details.country}\nPhone number: ${payload.details.phoneNumber}\nDistributor type: ${payload.details.distributorType}\nEstimated monthly volume: ${payload.details.estimatedMonthlyVolume}\nPreferred payment method: ${payload.details.paymentPreference}\n\nProducts requested:\n${items}\n\nAdditional notes:\n${payload.details.notes ?? "None"}\n\nTotal units: ${payload.totalUnits}\nSubmitted at: ${payload.submittedAt}`;
`;
}

export function createInquiryMailtoLink(payload: InquiryPayload) {
  const subject = encodeURIComponent(`Bulk inquiry from ${payload.details.companyName}`);
  const body = encodeURIComponent(buildInquiryEmailBody(payload));
  return `mailto:partners@vitala.global?subject=${subject}&body=${body}`;
}
