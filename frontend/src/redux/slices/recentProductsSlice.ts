import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RecentProductsState = {
  productIds: string[];
};

// Utility function to load from local storage
const loadFromLocalStorage = (): string[] => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("recentProducts");
    return data ? JSON.parse(data) : [];
  }
  return [];
};

// Utility function to save to local storage
const saveToLocalStorage = (productIds: string[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("recentProducts", JSON.stringify(productIds));
  }
};

const initialState: RecentProductsState = {
  productIds: loadFromLocalStorage(), // Load initial state from local storage
};

const recentProductsSlice = createSlice({
  name: "recentProducts",
  initialState,
  reducers: {
    addProductId: (state, action: PayloadAction<string>) => {
      const productId = action.payload;

      // Log the incoming productId and current state
      console.log("Adding Product ID:", productId);
      console.log("Current State:", state.productIds);

      // Remove the productId if it already exists
      state.productIds = state.productIds.filter((id) => id !== productId);

      // Log the state after removal
      console.log(
        "State after removing existing Product ID:",
        state.productIds,
      );

      // Add the productId to the beginning of the array
      state.productIds.unshift(productId);

      // Keep only the latest 10 items
      if (state.productIds.length > 10) {
        state.productIds.pop();
      }

      // Save the updated state to local storage
      saveToLocalStorage(state.productIds);

      // Log the state after adding and saving
      console.log("State after saving to local storage:", state.productIds);
    },
    loadRecentProducts: (state) => {
      // Load products from local storage into state
      state.productIds = loadFromLocalStorage();
      console.log("State loaded from local storage:", state.productIds);
    },
  },
});

export const { addProductId, loadRecentProducts } = recentProductsSlice.actions;

export default recentProductsSlice.reducer;
