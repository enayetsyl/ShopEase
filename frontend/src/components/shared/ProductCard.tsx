import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, ShoppingCart, Star } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  mainImage: string;
  hoverImage: string;
  rating: number;
  reviews: number;
  colors: string[];
}

const ProductCard = ({
  id,
  name,
  price,
  mainImage,
  hoverImage,
  rating,
  reviews,
  colors,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/products/${id}`}>
      <div
        className="group relative h-[420px] w-[300px] cursor-pointer overflow-hidden rounded-lg bg-white transition-all duration-300 hover:bg-gray-50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className="relative h-[300px] w-full">
          <Image
            src={isHovered ? hoverImage : mainImage}
            alt={name}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 300px) 100vw, 300px"
          />

          {/* Hover Overlay with Icons */}
          <div
            className={`absolute inset-0 flex items-center justify-center gap-4 bg-black/20 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            <button
              className="rounded-full bg-white p-3 text-gray-800 transition-transform hover:scale-110"
              onClick={(e) => {
                e.preventDefault();
                // Add to cart logic here
              }}
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
            <button
              className="rounded-full bg-white p-3 text-gray-800 transition-transform hover:scale-110"
              onClick={(e) => {
                e.preventDefault();
                // Quick view logic here
              }}
            >
              <Eye className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-xl font-bold text-gray-900">${price.toFixed(2)}</p>

          {/* Colors and Rating - Shown on Hover */}
          <div
            className={`mt-2 flex items-center justify-between transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex gap-1">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="h-4 w-4 rounded-full border border-gray-200"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="flex items-center gap-1 ">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`h-4 w-4 ${
                    index < rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-500">({reviews})</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
