"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useParams } from "next/navigation";
import { useGetSingleProductQuery } from "@/redux/api/productApi";
import ProductImages from "@/components/product/ProductImages";
import ProductInfo from "@/components/product/ProductInfo";
import ReviewSection from "@/components/product/ReviewSection";

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading } = useGetSingleProductQuery({
    id: id as string,
  });


  const [quantity, setQuantity] = useState(1);

  if (isLoading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
        />
      ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <ProductImages product={product} />

        {/* Product Info */}
        <ProductInfo
          product={product}
          quantity={quantity}
          setQuantity={setQuantity}
          renderStars={renderStars}
        />
      </div>

      {/* Reviews Section */}
      <ReviewSection product={product} renderStars={renderStars} />
    </div>
  );
}
