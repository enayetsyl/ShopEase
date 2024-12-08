"use client";
import Heading from "@/components/shared/CustomHeading";
import ProductCard from "@/components/shared/ProductCard";
import { useGetProductsQuery } from "@/redux/api/productApi";
import { useSearchParams } from "next/navigation";
import React from "react";

const AllProduct = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId") || undefined;
  const { data, isLoading } = useGetProductsQuery({ categoryId });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(categoryId);
  return (
    <div className="pb-20">
      <Heading
        text="Our Products"
        className="text-4xl lg:text-6xl text-center pb-20"
      />
      <div className="flex flex-wrap justify-center gap-6 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
        {data?.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
