import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, ShoppingCart, Star } from "lucide-react";
import { ProductData } from "@/types";

interface ProductCardProps {
  product: ProductData;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { productId: id, name, price, image } = product;
  const [isHovered, setIsHovered] = useState(false);
  // Generate random colors
  const getRandomColors = () => {
    const colors = [];
    for (let i = 0; i < 4; i++) {
      colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    }
    return colors;
  };

  // Generate a random rating (between 1 and 5)
  const getRandomRating = () => Math.floor(Math.random() * 5) + 1;

  // Get main and hover images from the `images` array
  const mainImage = image[0] || "/default-main-image.jpg";
  const hoverImage = image[1] || "/default-hover-image.jpg";

  const randomColors = getRandomColors();
  const randomRating = getRandomRating();

  return (
    <Link href={`/products/${id}`}>
      <div
        className="group relative h-[420px] w-[300px] cursor-pointer overflow-hidden rounded-lg bg-white transition-all duration-300 hover:bg-gray-50 dark:bg-black"
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
            className={`absolute inset-0 flex items-center justify-center gap-4 bg-black/20 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
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
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {name}
          </h3>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            ${price.toFixed(2)}
          </p>

          {/* Colors and Rating - Shown on Hover */}
          <div
            className={`mt-2 flex items-center justify-between transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex gap-1">
              {randomColors.map((color, index) => (
                <div
                  key={index}
                  className="h-4 w-4 rounded-full border border-gray-200"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`h-4 w-4 ${
                    index < randomRating
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-500">{randomRating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
