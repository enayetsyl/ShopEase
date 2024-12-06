"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import { allowedRoles } from "@/constants";
import ProtectedRoute from "@/protectedRoute/ProtectedRoute";
import { RootState } from "@/redux/store";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [activeComponent, setActiveComponent] =
    useState<React.ComponentType | null>(null);
  const { slug } = useParams();

  const ActiveComponent = activeComponent;

  return (
    <ProtectedRoute allowedRoles={allowedRoles}>
      <div className="flex justify-start items-center min-h-screen">
        <Sidebar setActiveComponent={setActiveComponent} />
        <div className="flex-1 p-4">
          {ActiveComponent ? (
            <ActiveComponent />
          ) : (
            <h1 className="text-center text-gray-500">
              Select an option from the menu
            </h1>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
