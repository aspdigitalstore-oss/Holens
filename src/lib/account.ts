import type { InquiryDetails } from "@/lib/inquiry";

export type CompanyDetails = Omit<InquiryDetails, "notes">;

export type Account = {
  id: string;
  company: CompanyDetails;
  createdAt: string;
  sessionToken: string;
};

export const BUSINESS_TYPES = [
  "Beauty retailer",
  "Pharmacy",
  "Wholesaler",
  "Distributor",
  "Salon or spa",
  "Ecommerce retailer",
  "Private label buyer",
  "Other",
];

const ACCOUNT_KEY = "vitala_b2b_account";

export function validateCompanyDetails(details: Partial<CompanyDetails>) {
  const errors: string[] = [];

  if (!details.companyName?.trim()) errors.push("Company name is required.");
  if (!details.contactPerson?.trim()) errors.push("Contact person is required.");
  if (!details.email?.trim()) {
    errors.push("Email is required.");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) {
    errors.push("Enter a valid business email address.");
  }
  if (!details.phoneNumber?.trim()) errors.push("Phone number is required.");
  if (!details.country?.trim()) errors.push("Country is required.");
  if (!details.businessType?.trim()) errors.push("Business type is required.");

  return { valid: errors.length === 0, errors };
}

export function getAccountFromStorage(): Account | null {
  try {
    const raw = window.localStorage.getItem(ACCOUNT_KEY);
    return raw ? (JSON.parse(raw) as Account) : null;
  } catch {
    return null;
  }
}

export function saveAccountToStorage(account: Account) {
  window.localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
}

export function clearAccountFromStorage() {
  window.localStorage.removeItem(ACCOUNT_KEY);
}

async function parseResponse(response: Response) {
  const data = (await response.json()) as { error?: string; account?: Account };
  if (!response.ok) throw new Error(data.error || "Unable to complete account request.");
  if (!data.account) throw new Error("Account response was incomplete.");
  saveAccountToStorage(data.account);
  return data.account;
}

export async function createAccount(details: CompanyDetails, password: string) {
  const validation = validateCompanyDetails(details);
  if (!validation.valid) throw new Error(validation.errors.join(" "));
  if (password.length < 8) throw new Error("Password must be at least 8 characters.");

  const response = await fetch("/api/accounts/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ details, password }),
  });

  return parseResponse(response);
}

export async function loginAccount(email: string, password: string) {
  const response = await fetch("/api/accounts/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return parseResponse(response);
}
