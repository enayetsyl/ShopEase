"use client";

import { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet"; // Adjust based on your setup
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { sidebarItems } from "@/constants";
import { NavItem } from "@/types";
import { Menu } from "lucide-react";
import CustomButton from "../shared/CustomButton";

const Sidebar = ({
  setActiveComponent,
}: {
  setActiveComponent: (component: React.ReactNode) => void;
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const role = user?.role as "ADMIN" | "VENDOR" | "CUSTOMER";
  console.log(user);

  const navItems: NavItem[] = sidebarItems[role];
  console.log("sidebarItems:", sidebarItems);

  return (
    <>
      {/* Sidebar for Large Screens */}
      <div className="hidden lg:block fixed top-0 left-0 h-full w-[300px] shadow-lg bg-gradient-to-t from-primary to-accent dark:from-yellow-500 dark:to-yellow-600">
        <div className="p-4">
          <h2 className="text-xl font-bold pb-5">Welcome {user?.name}</h2>
          {navItems.map((navItem: NavItem, index: number) => {
            console.log("navItem.component:", navItem.component);
            return (
              <CustomButton
                key={index}
                className={`w-full text-left py-3 px-4 mb-2 rounded-md ${
                  activeItem === navItem.label
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground hover:bg-primary-foreground hover:text-white"
                }`}
                onClick={() => {
                  setActiveItem(navItem.label); // Set active item
                  setActiveComponent(<navItem.component />);
                }}
              >
                {navItem.label}
              </CustomButton>
            );
          })}
        </div>
      </div>

      {/* Trigger for Mobile Screens */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsSheetOpen(true)}
        aria-label="Toggle sidebar"
        className="lg:hidden fixed top-4 left-4 z-50 bg-accent  "
      >
        {" "}
        <Menu className="text-primary font-bold text-2xl" />
      </Button>

      {/* Sheet for Mobile Screens */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button className="hidden">Open Menu</Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[80%] max-w-[300px] bg-gradient-to-r from-primary to-accent dark:from-yellow-500 dark:to-yellow-600"
        >
          <SheetHeader>
            <SheetTitle>Welcome {user?.name}</SheetTitle>
            <SheetDescription>
              {navItems.map((navItem: NavItem, index: number) => (
                <CustomButton
                  key={index}
                  className={`w-full text-left py-3 px-4 mb-2 rounded-md ${
                    activeItem === navItem.label
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground hover:bg-primary-foreground hover:text-white"
                  }`}
                  onClick={() => {
                    setActiveItem(navItem.label); // Set active item
                    setActiveComponent(<navItem.component />);
                  }}
                >
                  {navItem.label}
                </CustomButton>
              ))}
            </SheetDescription>
          </SheetHeader>

          <SheetClose asChild>
            <Button className="mt-4 text-white border-white">Close</Button>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;
