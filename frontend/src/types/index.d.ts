export interface Vendor {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string | null;
  isDeleted: boolean;
  isSuspended: boolean;
  createdAt: string;
  updatedAt: string;
  follows: object[];
  orders: object[];
  products: object[];
  shop?: object | null;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string | null;
  isDeleted: boolean;
  isSuspended: boolean;
  createdAt: string;
  updatedAt: string;
  cart: object[];
  follows: object[];
  orders: object[];
  reviews: object[];
  payments: object[];
}

export interface BackendUser {
  id: string;
  email: string;
  role: "ADMIN" | "VENDOR" | "CUSTOMER";
  name: string;
  vendor?: Vendor | null;
  customer?: Customer | null;
}

export interface AuthState {
  user: User | null;
}

export interface User {
  userId: string;
  email: string;
  role: "ADMIN" | "VENDOR" | "CUSTOMER";
  name: string;
  profilePhoto: string | null;
  vendorId: string;
  customerId: string;
}
