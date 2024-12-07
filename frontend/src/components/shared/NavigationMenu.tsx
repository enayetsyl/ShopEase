"use client";
import {
  House,
  Store,
  Zap,
  ShoppingCart,
  CircleUserRound,
  LogIn,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { logout } from "@/redux/slices/authSlice";
import { RootState } from "@/redux/store";
import Link from "next/link";
import {
  FaHome,
  FaShopify,
  FaBolt,
  FaShoppingCart,
  FaSignInAlt,
  FaUserCircle,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const NavigationMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="max-w-7xl fixed shadow-lg mx-auto w-full pt-1">
      <Menubar>
        <div className="flex justify-between items-center w-full">
          {/* Fixed Menu Items */}
          <div className="flex items-center flex-grow">
            <MenubarMenu>
              <MenubarTrigger>
                <Link href="/" className="flex items-center gap-1">
                  <House />
                  Home
                </Link>
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>
                <Link href="/shop" className="flex items-center gap-1">
                  <Store />
                  Shop
                </Link>
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>
                <Link href="/flash-sale" className="flex items-center gap-1">
                  <Zap />
                  Flash Sale
                </Link>
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>
                <Link href="/cart" className="flex items-center ">
                  <ShoppingCart size={20} />
                </Link>
              </MenubarTrigger>
            </MenubarMenu>
          </div>

          {/* Conditional Menu: Login or Avatar */}
          <div className="flex items-center justify-end mr-12">
            <MenubarMenu>
              {!user ? (
                <MenubarTrigger>
                  <Link href="/sign-in" className="flex items-center gap-1 ">
                    <LogIn />
                  </Link>
                </MenubarTrigger>
              ) : (
                <MenubarTrigger>
                  <CircleUserRound size={24} className=" hover:text-black" />
                </MenubarTrigger>
              )}
              {user && (
                <MenubarContent className="">
                  <MenubarItem>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <LayoutDashboard />
                      Dashboard
                    </Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <LogOut />
                    Logout
                  </MenubarItem>
                </MenubarContent>
              )}
            </MenubarMenu>
          </div>
        </div>
      </Menubar>
    </nav>
  );
};

export default NavigationMenu;