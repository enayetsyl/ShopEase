import React from "react";
import ProductCard from "../shared/ProductCard";
import { useGetProductsQuery } from "@/redux/api/productApi";
import Heading from "../shared/CustomHeading";

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
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

export default Products;
