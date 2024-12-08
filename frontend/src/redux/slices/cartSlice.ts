import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SingleProductData } from "@/types";

interface CartItem extends SingleProductData {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  couponCode: string | null;
  couponDiscount: number;
  vendorId: string | null;
}

const initialState: CartState = {
  items: [],
  couponCode: null,
  couponDiscount: 0,
  vendorId: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: SingleProductData; quantity: number }>,
    ) => {
      const { product, quantity } = action.payload;

      if (state.vendorId && state.vendorId !== product.shopId) {
        throw new Error("VendorMismatch");
      }

      const existingItem = state.items.find(
        (item) => item.productId === product.productId,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }

      // Set the vendorId if not already set
      if (!state.vendorId) {
        state.vendorId = product.shopId;
      }
    },
    replaceCart: (
      state,
      action: PayloadAction<{ product: SingleProductData; quantity: number }>,
    ) => {
      const { product, quantity } = action.payload;

      // Clear the cart and set the new product and vendor
      state.items = [{ ...product, quantity }];
      state.vendorId = product.shopId;
    },
    clearCart: (state) => {
      state.items = [];
      state.vendorId = null;
      state.couponCode = null;
      state.couponDiscount = 0;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload,
      );
      if (state.items.length === 0) {
        state.vendorId = null;
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>,
    ) => {
      const item = state.items.find(
        (item) => item.productId === action.payload.productId,
      );
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
    },
    applyCoupon: (
      state,
      action: PayloadAction<{ code: string; discount: number }>,
    ) => {
      state.couponCode = action.payload.code;
      state.couponDiscount = action.payload.discount;
    },
    clearCoupon: (state) => {
      state.couponCode = null;
      state.couponDiscount = 0;
    },
  },
});

export const {
  addToCart,
  replaceCart,
  clearCart,
  removeFromCart,
  updateQuantity,
  applyCoupon,
  clearCoupon,
} = cartSlice.actions;
export default cartSlice.reducer;
