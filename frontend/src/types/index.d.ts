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

export interface NavItem {
  label: string;
  component: React.ComponentType;
}

export type SidebarItems = {
  [role: string]: NavItem[];
};

export interface ShopApiResponse {
  data: {
    id: string;
    name: string;
    logo: string;
    description: string;
    createdAt: string;
    deletedAt: null | boolean;
    isBlackListed: boolean;
    updatedAt: string;
    vendorId: string;
  };
  message: string;
  success: boolean;
}
export interface ProductApiResponse {
  data: {
    categoryId: string;
    discount: number;
    image: string[];
    inventory: number;
    price: number;
    shopId: string;
    id: string;
    name: string;
    description: string;
    createdAt: string;
    deletedAt: null | boolean;
    updatedAt: string;
    vendorId: string;
  }[];
  message: string;
  success: boolean;
}
export interface VendorProductApiResponse {
  data: {
    categoryName: string;
    categoryId: string;
    discount: number;
    image: string[];
    inventory: number;
    price: number;
    shopId: string;
    id: string;
    name: string;
    description: string;
    createdAt: string;
    deletedAt: null | boolean;
    updatedAt: string;
    vendorId: string;
  }[];
  message: string;
  success: boolean;
}

export interface ProductData {
  categoryId: string;
  discount: number;
  image: string[];
  inventory: number;
  price: number;
  shopId: string;
  productId: string;
  name: string;
  description: string;
}
export interface VendorProductData {
  categoryId: string;
  shopId: string;
  productId: string;
  categoryName: string;
  name: string;
  description: string;
  discount: number;
  inventory: number;
  price: number;
  image: string[];
}

export interface VendorProductActions extends VendorProductData {
  handleEdit: (product: VendorProductData) => void;
  handleDuplicate: (product: VendorProductData) => void;
}
export interface ShopData {
  shopId: string;
  name: string;
  description: string;
  logo: string;
}

export interface CreateShopRequest {
  name: string;
  description: string;
  file: File;
}
