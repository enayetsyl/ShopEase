import React from "react";
import ProductCard from "../shared/ProductCard";

const Products = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <ProductCard
        id="bradley-burgess-2"
        name="Bradley Burgess 2"
        price={20.0}
        mainImage="/images/pen.jpg"
        hoverImage="/images/shoe.jpg"
        rating={4}
        reviews={81}
        colors={["#4A90E2", "#E24A4A", "#4AE250", "#E2E24A"]}
      />
      {/* Add more ProductCard components as needed */}
    </div>
  );
};

export default Products;
