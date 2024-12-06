"use client";
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
      <div>Welcome to the {slug} dashboard!</div>
    </ProtectedRoute>
  );
};

export default Dashboard;
