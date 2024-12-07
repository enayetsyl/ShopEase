"use client";

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
    <nav className="max-w-7xl fixed shadow-lg mx-auto w-full pt-1 bg-white">
      <Menubar>
        <div className="flex justify-between items-center">
          {/* Fixed Menu Items */}
          <div className="flex items-center gap-4 flex-grow">
            <MenubarMenu>
              <MenubarTrigger>
                <Link href="/" className="flex items-center gap-2">
                  <FaHome />
                  Home
                </Link>
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>
                <Link href="/shop" className="flex items-center gap-2">
                  <FaShopify />
                  Shop
                </Link>
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>
                <Link href="/flash-sale" className="flex items-center gap-2">
                  <FaBolt />
                  Flash Sale
                </Link>
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>
                <Link href="/cart" className="flex items-center gap-2">
                  <FaShoppingCart size={20} />
                </Link>
              </MenubarTrigger>
            </MenubarMenu>
          </div>

          {/* Conditional Menu: Login or Avatar */}
          <div className="flex items-center">
            <MenubarMenu>
              {!user ? (
                <MenubarTrigger>
                  <Link
                    href="/login"
                    className="flex items-center gap-2 text-gray-700 hover:text-black"
                  >
                    <FaSignInAlt />
                    Login
                  </Link>
                </MenubarTrigger>
              ) : (
                <MenubarTrigger>
                  <FaUserCircle
                    size={24}
                    className="text-gray-700 hover:text-black"
                  />
                </MenubarTrigger>
              )}
              {user && (
                <MenubarContent className="bg-white shadow-md">
                  <MenubarItem>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                    >
                      <FaTachometerAlt />
                      Dashboard
                    </Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <FaSignOutAlt />
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
