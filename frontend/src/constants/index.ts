import Category from "@/components/dashboard/admin/Category";
import Transactions from "@/components/dashboard/admin/Transactions";
import User from "@/components/dashboard/admin/User";
import AdminShops from "@/components/dashboard/admin/AdminShops";
import VendorOrders from "@/components/dashboard/vendor/VendorOrders";
import VendorProducts from "@/components/dashboard/vendor/VendorProducts";
import VendorReviews from "@/components/dashboard/vendor/VendorReviews";
import VendorShop from "@/components/dashboard/vendor/VendorShop";
import VendorFlashSale from "@/components/dashboard/vendor/VendorFlashSale";
import Cart from "@/components/dashboard/customer/Cart";
import CustomerOrders from "@/components/dashboard/customer/CustomerOrders";
import RecentProducts from "@/components/dashboard/customer/RecentProducts";
import { SidebarItems } from "@/types";
import { Truck, Package, Shield } from "lucide-react";
import ChangePassword from "@/components/dashboard/ChangePassword";

export const allowedRoles = {
  admin: ["ADMIN"],
  vendor: ["VENDOR"],
  customer: ["CUSTOMER"],
};

export const sidebarItems: SidebarItems = {
  VENDOR: [
    { label: "Shop", component: VendorShop },
    { label: "Products", component: VendorProducts },
    { label: "Orders", component: VendorOrders },
    { label: "Review", component: VendorReviews },
    { label: "Flash Sale", component: VendorFlashSale },
    { label: "Change Password", component: ChangePassword },
  ],
  CUSTOMER: [
    { label: "Orders", component: CustomerOrders },
    { label: "Recent Products", component: RecentProducts },
    { label: "Cart", component: Cart },

    { label: "Change Password", component: ChangePassword },
  ],
  ADMIN: [
    { label: "Users", component: User },
    { label: "Category", component: Category },
    { label: "Shops", component: AdminShops },
    // { label: "Orders", component: AdminOrders },
    { label: "Transactions", component: Transactions },
    { label: "Change Password", component: ChangePassword },
  ],
};

export const selectButtonCategories = [
  { id: "05d3a670-3197-4137-912d-d57c50581f96", name: "Home Appliances" },
  { id: "34915d79-3115-4e7c-bd5b-96d7eb0a0b6a", name: "Baby Products" },
  { id: "3b02d0b2-63d0-4e2b-b999-5228fa3b1045", name: "Jewellery" },
  { id: "563efe82-f40e-48b4-bacd-745916862a48", name: "Electronics" },
  { id: "5b25f29a-552e-4a20-9698-37a6b76be460", name: "Toys & Games" },
  { id: "6c134d5e-9835-43da-bf17-19e8b23010b8", name: "Garden & Outdoor" },
  { id: "71814689-5f7b-471b-9ebb-d0e9b4bfeca1", name: "Furniture" },
  { id: "7bf4a97e-3eba-4388-bee6-e5055dd3cdd9", name: "Books & Stationery" },
  { id: "8835fd34-bc22-44f6-a13a-d7f1c2eb6507", name: "Footwear" },
  { id: "88e54436-9b11-4d70-982f-584e17cc3db9", name: "Watches" },
  { id: "9822c8d2-22a8-4009-8332-ce82d3123a61", name: "Travel & Luggage" },
  { id: "a6a1d24c-af45-41e6-840a-7645ce8e3bc8", name: "Health & Beauty" },
  { id: "aa9bab83-7895-4d5f-8b08-2cf6d8c4dbc4", name: "Fashion" },
  { id: "afe89159-9a3d-440e-8368-95a36bd69b1c", name: "Automotive" },
  { id: "be5da69d-98cd-43f6-9ce9-9910317bedd6", name: "Mobile Accessories" },
  { id: "ce1ea95f-ad0e-46b7-af5f-6326f7156256", name: "Kitchen & Dining" },
  { id: "d88a07f6-c0d8-4fd8-95e4-01e1c0979eff", name: "Office Supplies" },
  { id: "f40b4165-188e-4b28-af01-f6efc85d1c47", name: "Sports & Fitness" },
  { id: "f56fa167-039a-4a6d-92e8-8e1e0dfe928b", name: "Pet Supplies" },
  { id: "ff745c9f-706f-4446-a183-fc83055609b2", name: "Groceries" },
];

export const cardCategories = [
  { id: 1, title: "Driftwood Table Decor", count: 20, icon: "🪑" },
  { id: 2, title: "Floor Driftwood Sculpture", count: 12, icon: "🎨" },
  { id: 3, title: "Tree", count: 3, icon: "🎄" },
  { id: 4, title: "Wooden Bluetooth Speaker", count: 9, icon: "🔊" },
  { id: 5, title: "Receivers Amplifiers", count: 10, icon: "🕯️" },
  { id: 6, title: "Appetizer Plate Set", count: 5, icon: "🍽️" },
];

export const carouselItems = [
  {
    bgClass: "bg-stone-600",
    h3Text: "Stationary",
    spanText: "30% off",
    h2Text: "on All Pen",
    imageSrc: "/images/pen.jpg",
  },
  {
    bgClass: "bg-blue-600",
    h3Text: "Notebooks",
    spanText: "20% off",
    h2Text: "on Premium Notebooks",
    imageSrc: "/images/sleeper.jpg",
  },
  {
    bgClass: "bg-green-600",
    h3Text: "Art Supplies",
    spanText: "40% off",
    h2Text: "on All Sketchbooks",
    imageSrc: "/images/shoe.jpg",
  },
];

export const features = [
  {
    Icon: Truck,
    text: "Free Shipping on orders over $100",
  },
  {
    Icon: Package,
    text: "1 Day Returns if you change your mind",
  },
  {
    Icon: Shield,
    text: "Guaranteed 100% Organic from natural farms",
  },
];

export const randomColors = ["blue", "pink", "red", "purple", "green"];
export const randomTags = [
  "fashion",
  "sale",
  "new arrival",
  "limited edition",
  "exclusive",
];
