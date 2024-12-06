import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Vendor {
  id: string; // Unique identifier for the vendor
  name: string; // Vendor's name
  email: string; // Vendor's email address
  profilePhoto?: string | null; // URL for the vendor's profile photo
  isDeleted: boolean; // Indicates if the vendor is deleted
  isSuspended: boolean; // Indicates if the vendor is suspended
  createdAt: string; // ISO string representation of the creation timestamp
  updatedAt: string; // ISO string representation of the last updated timestamp
  follows: object[]; // List of follow relationships (can be further defined)
  orders: object[]; // List of orders associated with the vendor (can be further defined)
  products: object[]; // List of products the vendor offers (can be further defined)
  shop?: object | null; // Vendor's shop details (can be further defined)
}

interface Customer {
  id: string; // Unique identifier for the customer
  name: string; // Customer's name
  email: string; // Customer's email address
  profilePhoto?: string | null; // URL for the customer's profile photo
  isDeleted: boolean; // Indicates if the customer is deleted
  isSuspended: boolean; // Indicates if the customer is suspended
  createdAt: string; // ISO string representation of the creation timestamp
  updatedAt: string; // ISO string representation of the last updated timestamp
  cart: object[]; // List of items in the customer's cart (can be further defined)
  follows: object[]; // List of follow relationships (can be further defined)
  orders: object[]; // List of orders made by the customer (can be further defined)
  reviews: object[]; // List of reviews written by the customer (can be further defined)
  payments: object[]; // List of payments made by the customer (can be further defined)
}

interface User {
  id: string;
  email: string;
  role: "ADMIN" | "VENDOR" | "CUSTOMER";
  name: string;
  vendor?: Vendor | null;
  customer?: Customer | null;
}

interface AuthState {
  user: User | null;
}

const getInitialUser = (): User | null => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("auth");
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

const initialState: AuthState = {
  user: getInitialUser(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<User>) {
      state.user = action.payload;

      // Save user data to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("auth", JSON.stringify(action.payload));
      }
    },
    logout(state) {
      state.user = null;

      // Remove user data from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth");
      }
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
