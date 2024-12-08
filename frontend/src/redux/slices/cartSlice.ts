import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SingleProductData } from "@/types";

interface CartItem extends SingleProductData {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  couponCode: string | null;
  couponDiscount: number;
}

const initialState: CartState = {
  items: [],
  couponCode: null,
  couponDiscount: 0,
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
      const existingItem = state.items.find(
        (item) => item.productId === product.productId,
      );
      // console.log("existing item", state);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload,
      );
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
  removeFromCart,
  updateQuantity,
  applyCoupon,
  clearCoupon,
} = cartSlice.actions;
export default cartSlice.reducer;
