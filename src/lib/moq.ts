// MOQ (Minimum Order Quantity) utilities for B2B wholesale

export const MIN_ORDER_QUANTITY = 200; // units
export const MOQ_NOTICE = "Minimum mixed order quantity is 200 units across Haleon healthcare product categories.";

export interface CartItem {
  productId: string;
  brandSlug: string;
  productName: string;
  brandName: string;
  quantity: number;
  usdPrice: number;
  eurPrice: number;
}

export interface Cart {
  items: CartItem[];
  currency: "USD" | "EUR";
}

/**
 * Calculate total units in cart
 */
export const calculateTotalUnits = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Check if cart meets MOQ requirement
 */
export const meetsMinimumOrder = (items: CartItem[]): boolean => {
  return calculateTotalUnits(items) >= MIN_ORDER_QUANTITY;
};

/**
 * Calculate estimated order value in given currency
 */
export const calculateOrderValue = (
  items: CartItem[],
  currency: "USD" | "EUR"
): number => {
  return items.reduce((total, item) => {
    const price = currency === "USD" ? item.usdPrice : item.eurPrice;
    return total + price * item.quantity;
  }, 0);
};

/**
 * Get units remaining to reach MOQ
 */
export const getUnitsNeededForMOQ = (items: CartItem[]): number => {
  const currentTotal = calculateTotalUnits(items);
  return Math.max(0, MIN_ORDER_QUANTITY - currentTotal);
};

/**
 * Check if MOQ is met and provide summary
 */
export const getMOQSummary = (items: CartItem[], currency: "USD" | "EUR") => {
  const totalUnits = calculateTotalUnits(items);
  const isMet = meetsMinimumOrder(items);
  const unitsNeeded = getUnitsNeededForMOQ(items);
  const orderValue = calculateOrderValue(items, currency);

  return {
    totalUnits,
    isMet,
    unitsNeeded,
    orderValue,
    currency,
    minimumRequired: MIN_ORDER_QUANTITY,
  };
};
