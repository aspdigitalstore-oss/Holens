import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type InquiryItem = {
  id: string;
  brandSlug: string;
  brandName: string;
  productName: string;
  productTagline: string;
  quantity: number;
};

export type InquiryDetails = {
  companyName: string;
  contactPerson: string;
  businessEmail: string;
  country: string;
  phoneNumber: string;
  distributorType: string;
  estimatedMonthlyVolume: string;
  paymentPreference: "Bank Transfer" | "Crypto Currency" | "Card Payment";
  notes?: string;
};

export type InquiryPayload = {
  items: InquiryItem[];
  totalUnits: number;
  details: InquiryDetails;
  submittedAt: string;
};

type InquiryContextValue = {
  items: InquiryItem[];
  totalUnits: number;
  hasMinimum: boolean;
  addItem: (item: Omit<InquiryItem, "id">) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearInquiry: () => void;
};

const InquiryContext = createContext<InquiryContextValue | null>(null);
const STORAGE_KEY = "vitala_bulk_inquiry";

function normalizeQuantity(quantity: number) {
  return Number.isNaN(quantity) ? 1 : Math.max(1, Math.round(quantity));
}

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<InquiryItem[]>(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as InquiryItem[];
      return Array.isArray(parsed)
        ? parsed.map((item) => ({ ...item, quantity: normalizeQuantity(item.quantity) }))
        : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<InquiryItem, "id">) => {
    const normalized = normalizeQuantity(item.quantity);
    setItems((current) => {
      const existingIndex = current.findIndex((entry) => entry.brandSlug === item.brandSlug && entry.productName === item.productName);
      if (existingIndex >= 0) {
        const next = [...current];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + normalized,
        };
        return next;
      }

      return [...current, { ...item, id: `${item.brandSlug}:${item.productName}`, quantity: normalized }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    const normalized = normalizeQuantity(quantity);
    setItems((current) => current.map((item) => (item.id === id ? { ...item, quantity: normalized } : item)));
  };

  const removeItem = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const clearInquiry = () => setItems([]);

  const totalUnits = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const hasMinimum = totalUnits >= 200;

  return (
    <InquiryContext.Provider value={{ items, totalUnits, hasMinimum, addItem, updateQuantity, removeItem, clearInquiry }}>
      {children}
    </InquiryContext.Provider>
  );
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error("useInquiry must be used within an InquiryProvider");
  }
  return context;
}
