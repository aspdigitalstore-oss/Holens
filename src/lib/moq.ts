// MOQ (Minimum Order Quantity) utilities for B2B wholesale

export const MIN_ORDER_QUANTITY = 2000;
export const MOQ_LABEL = "Minimum Order Quantity (MOQ): 2000 Units";
export const MOQ_NOTICE =
  "MOQ of 2000 units can be achieved by mixing products from different brands and categories.";

export interface CartItem {
  productId: string;
  brandSlug: string;
  productName: string;
  brandName: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
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
 * Get units remaining to reach MOQ
 */
export const getUnitsNeededForMOQ = (items: CartItem[]): number => {
  const currentTotal = calculateTotalUnits(items);
  return Math.max(0, MIN_ORDER_QUANTITY - currentTotal);
};

/**
 * Check if MOQ is met and provide summary
 */
export const getMOQSummary = (items: CartItem[]) => {
  const totalUnits = calculateTotalUnits(items);
  const isMet = meetsMinimumOrder(items);
  const unitsNeeded = getUnitsNeededForMOQ(items);

  return {
    totalUnits,
    isMet,
    unitsNeeded,
    minimumRequired: MIN_ORDER_QUANTITY,
  };
};
