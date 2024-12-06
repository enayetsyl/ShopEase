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

const Sidebar = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user)

  return (
    <>
      {/* Sidebar for Large Screens */}
      <div className="hidden lg:block fixed top-0 left-0 h-full w-[300px] shadow-lg bg-gradient-to-t from-primary to-accent dark:from-yellow-500 dark:to-yellow-600">
        <div className="p-4">
          <h2 className="text-xl font-bold">Welcome {user?.name}</h2>
          <p className="mt-2">Fixed content for large screens.</p>
        </div>
      </div>

      {/* Trigger for Mobile Screens */}
      <Button
        onClick={() => setIsSheetOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-blue-500 text-white"
      >
        Open Menu
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
            <SheetDescription>Responsive menu content here.</SheetDescription>
          </SheetHeader>
          <div className="mt-4">
            <p>Your sheet content goes here.</p>
          </div>
          <SheetClose asChild>
            <Button className="mt-4 text-white border-white">Close</Button>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;
