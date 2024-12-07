import React from "react";
import ProductCard from "../shared/ProductCard";
import { useGetProductsQuery } from "@/redux/api/productApi";

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
      {data?.map((product) => (
        <ProductCard key={product.productId} product={product} />
      ))}
    </div>
  );
};

export default Products;
