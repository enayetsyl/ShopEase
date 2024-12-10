"use client";
import ProductFilters from "@/components/allProducts/ProductFilter";
import Heading from "@/components/shared/CustomHeading";
import ProductCard from "@/components/shared/ProductCard";
import { useGetProductsQuery } from "@/redux/api/productApi";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const AllProductContent = () => {
  const searchParams = useSearchParams();
  const queryParams: Record<string, any> = {};

  // Collect all query params
  searchParams.forEach((value, key) => {
    queryParams[key] = isNaN(Number(value)) ? value : Number(value); // Convert numbers
  });

  const { data, isLoading } = useGetProductsQuery(queryParams);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pb-20">
      <Heading
        text="Our Products"
        className="text-4xl lg:text-6xl text-center pb-20"
      />
      <ProductFilters />
      <div className="pt-20">
        <div className="flex flex-wrap justify-center gap-6 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
          {data?.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

const AllProduct = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center min-h-screen text-primary text-5xl font-semibold">
        Loading products...
      </div>
    }
  >
    <AllProductContent />
  </Suspense>
);

export default AllProduct;
