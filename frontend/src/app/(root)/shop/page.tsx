"use client";
import Heading from "@/components/shared/CustomHeading";
import { ShopCard } from "@/components/shop/ShopCard";
import { useGetAllShopQuery } from "@/redux/api/shopApi";
import React from "react";

const Shop = () => {
  const { data } = useGetAllShopQuery({ page: 1, limit: 10 });
  console.log('data', data)

  return (
    <>
      <div className="pt-20">
        <Heading
          text="All Shops"
          className="text-4xl lg:text-6xl text-center pb-20"
        />
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data && data?.data.map((shop) => <ShopCard key={shop.shopId} shop={shop} />)}
      </div>
    </>
  );
};

export default Shop;
