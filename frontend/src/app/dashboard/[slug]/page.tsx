"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import { allowedRoles } from "@/constants";
import ProtectedRoute from "@/protectedRoute/ProtectedRoute";
import { RootState } from "@/redux/store";
import { useParams } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);
 
  const { slug } = useParams(); // Access dynamic route parameter

  return (
    <ProtectedRoute allowedRoles={allowedRoles}>
      <div className="flex justify-start items-center min-h-screen">
        <Sidebar />
        <h1 className="flex-1">Welcome to the {slug} dashboard!</h1>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
