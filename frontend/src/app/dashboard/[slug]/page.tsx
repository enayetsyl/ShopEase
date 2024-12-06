"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import ProtectedRoute from "@/protectedRoute/ProtectedRoute";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const Dashboard = () => {
  const allowedRoles = {
    admin: ["ADMIN"], // Only ADMIN can access `/dashboard/admin`
    vendor: ["VENDOR"], // Only VENDOR can access `/dashboard/vendor`
    customer: ["CUSTOMER"], // Only CUSTOMER can access `/dashboard/customer`
  };

  const { slug } = useParams(); // Access dynamic route parameter

  console.log("Slug:", slug);
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
