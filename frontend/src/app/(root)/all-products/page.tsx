"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

const AllProduct = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  console.log(categoryId);
  return <div>page</div>;
};

export default AllProduct;
