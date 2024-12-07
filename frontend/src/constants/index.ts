import AdminOrders from "@/components/dashboard/admin/AdminOrders";
import AdminProducts from "@/components/dashboard/admin/AdminProducts";
import Category from "@/components/dashboard/admin/Category";
import Transactions from "@/components/dashboard/admin/Transactions";
import User from "@/components/dashboard/admin/User";
import VendorOrders from "@/components/dashboard/vendor/VendorOrders";
import VendorProducts from "@/components/dashboard/vendor/VendorProducts";
import VendorReviews from "@/components/dashboard/vendor/VendorReviews";
import VendorShop from "@/components/dashboard/vendor/VendorShop";
import Cart from "@/components/dashboard/customer/Cart";
import CustomerOrders from "@/components/dashboard/customer/CustomerOrders";
import RecentProducts from "@/components/dashboard/customer/RecentProducts";
import { SidebarItems } from "@/types";
import { Star, Truck, Package, Shield, Heart } from "lucide-react";

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
  ],
  CUSTOMER: [
    { label: "Orders", component: CustomerOrders },
    { label: "Recent Products", component: RecentProducts },
    { label: "Cart", component: Cart },
  ],
  ADMIN: [
    { label: "Users", component: User },
    { label: "Category", component: Category },
    { label: "Products", component: AdminProducts },
    { label: "Orders", component: AdminOrders },
    { label: "Transactions", component: Transactions },
  ],
};

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
