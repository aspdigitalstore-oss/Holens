// B2B Account Management System

export interface CompanyDetails {
  companyName: string;
  contactPerson: string;
  businessEmail: string;
  phoneNumber: string;
  country: string;
  distributorType: string; // Pharmacy, Hospital, Distributor, Wholesaler, etc.
  estimatedMonthlyVolume: string; // e.g., "100-500 units", "500-1000 units", etc.
}

export interface Account {
  id: string;
  company: CompanyDetails;
  createdAt: string;
  lastLogin?: string;
}

/**
 * Validate company details for B2B account
 */
export const validateCompanyDetails = (
  details: Partial<CompanyDetails>
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!details.companyName?.trim()) {
    errors.push("Company name is required");
  }

  if (!details.contactPerson?.trim()) {
    errors.push("Contact person name is required");
  }

  if (!details.businessEmail?.trim()) {
    errors.push("Business email is required");
  } else if (!details.businessEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.push("Invalid email format");
  }

  if (!details.phoneNumber?.trim()) {
    errors.push("Phone number is required");
  }

  if (!details.country?.trim()) {
    errors.push("Country is required");
  }

  if (!details.distributorType?.trim()) {
    errors.push("Distributor type is required");
  }

  if (!details.estimatedMonthlyVolume?.trim()) {
    errors.push("Estimated monthly volume is required");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Get distributor type options for form
 */
export const DISTRIBUTOR_TYPES = [
  "Pharmacy",
  "Hospital",
  "Clinic",
  "Wholesaler",
  "Distributor",
  "Retailer",
  "Online Platform",
  "Other",
];

/**
 * Get volume range options
 */
export const VOLUME_RANGES = [
  "100-500 units/month",
  "500-1,000 units/month",
  "1,000-5,000 units/month",
  "5,000-10,000 units/month",
  "10,000+ units/month",
];

/**
 * Store account in localStorage (for demo) or sessionStorage
 * In production, this would go to a backend database
 */
export const saveAccountToStorage = (account: Account): void => {
  try {
    localStorage.setItem("b2b_account", JSON.stringify(account));
    localStorage.setItem("b2b_account_timestamp", new Date().toISOString());
  } catch (e) {
    console.warn("Could not save account to localStorage", e);
  }
};

/**
 * Retrieve account from storage
 */
export const getAccountFromStorage = (): Account | null => {
  try {
    const stored = localStorage.getItem("b2b_account");
    return stored ? JSON.parse(stored) : null;
  } catch (e) {
    console.warn("Could not retrieve account from localStorage", e);
    return null;
  }
};

/**
 * Clear account from storage (logout)
 */
export const clearAccountFromStorage = (): void => {
  try {
    localStorage.removeItem("b2b_account");
    localStorage.removeItem("b2b_account_timestamp");
  } catch (e) {
    console.warn("Could not clear account from localStorage", e);
  }
};

/**
 * Check if user is logged in
 */
export const isLoggedIn = (): boolean => {
  return getAccountFromStorage() !== null;
};

/**
 * Create a new account
 */
export const createAccount = (details: CompanyDetails): Account => {
  const validation = validateCompanyDetails(details);
  if (!validation.valid) {
    throw new Error(`Account validation failed: ${validation.errors.join(", ")}`);
  }

  const account: Account = {
    id: `acc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    company: details,
    createdAt: new Date().toISOString(),
  };

  saveAccountToStorage(account);
  return account;
};
