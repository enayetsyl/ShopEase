"use client";
import { useGetAllShopQuery } from "@/redux/api/shopApi";
import React from "react";

const Shop = () => {
  const { data } = useGetAllShopQuery();

  console.log("shop data", data);
  return <div>Shop</div>;
};

export default Shop;
