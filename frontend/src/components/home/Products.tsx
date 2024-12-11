import React, { useState, useEffect, useRef } from "react";
import ProductCard from "../shared/ProductCard";
import { useGetProductsQuery } from "@/redux/api/productApi";
import Heading from "../shared/CustomHeading";
import { ProductData } from "@/types";

const Products = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading, isFetching } = useGetProductsQuery(
    { page, limit: 10 },
    { skip: !hasMore },
  );

  const observerRef = useRef(null);

  // Append new products to the existing list
  useEffect(() => {
    if (data && data.length > 0) {
      setProducts((prev) => [...prev, ...data]);
      if (data.length < 10) {
        setHasMore(false); // No more products to load
      }
    }
  }, [data]);

  // Intersection Observer for detecting bottom of the list
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching && hasMore) {
          setPage((prev) => prev + 1); // Load the next page
        }
      },
      { threshold: 1 },
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [isFetching, hasMore]);

  if (isLoading && page === 1) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Heading
        text="Our Products"
        className="text-4xl lg:text-6xl text-center pb-20"
      />
      <div className="flex flex-wrap justify-center gap-6 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
      {isFetching && <p>Loading more products...</p>}
      {!hasMore && (
        <p className="text-center mt-4">No more products to load.</p>
      )}
      <div ref={observerRef} className="h-10"></div> {/* Observer Target */}
    </div>
  );
};

export default Products;
