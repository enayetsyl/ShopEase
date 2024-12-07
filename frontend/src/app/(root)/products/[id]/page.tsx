"use client";

import Image from "next/image";
import { useState } from "react";
import { Star, Truck, Package, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { useGetSingleProductQuery } from "@/redux/api/productApi";

const randomColors = ["blue", "pink", "red", "purple", "green"];
const randomTags = [
  "fashion",
  "sale",
  "new arrival",
  "limited edition",
  "exclusive",
];

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading } = useGetSingleProductQuery({
    id: id as string,
  });

  // console.log("id", id, "data", data);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState("");

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

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle review submission here
    setNewReviewText("");
    setNewReviewRating(5);
  };

  const productTags = randomTags.slice(0, 3);

  const averageRating = product.reviews
    ? Math.round(
        product.reviews.reduce((sum, review) => sum + review.rating, 0) /
          product.reviews.length,
      )
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square">
            <Image
              src={product.image[selectedImage]}
              alt={`Product image ${selectedImage + 1}`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="flex gap-4">
            {product.image.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-24 aspect-square border rounded-md overflow-hidden ${
                  selectedImage === index ? "ring-2 ring-primary" : ""
                }`}
              >
                <Image
                  src={image}
                  alt={`Product thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge>{product.category?.name || "Unknown Category"}</Badge>
            <div className="flex items-center gap-4 mt-2">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                {product.inventory > 0 ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
            <div className="flex items-center gap-2 mt-2">
              {renderStars(averageRating)}
              <span className="text-muted-foreground">
                ({product.reviews?.length || 0} Reviews)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-primary">
              ${product.price}
            </span>
            {product.discount > 0 && (
              <span className="text-xl text-muted-foreground line-through">
                ${(product.price * (1 + product.discount / 100)).toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <div className="space-y-4">
            <div>
              <Label>Color</Label>
              <RadioGroup
                defaultValue={randomColors[0]}
                className="flex gap-2 mt-2"
              >
                {randomColors.map((color) => (
                  <RadioGroupItem
                    key={color}
                    value={color}
                    id={color}
                    className={`w-6 h-6 rounded-full bg-${color}-500`}
                  />
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-24 mt-2"
              />
            </div>

            <div className="flex gap-4">
              <Button size="lg" className="flex-1">
                Add to Cart
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center text-center gap-2">
              <Truck className="w-8 h-8 text-muted-foreground" />
              <span className="text-sm">Free Shipping on orders over $100</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Package className="w-8 h-8 text-muted-foreground" />
              <span className="text-sm">
                1 Day Returns if you change your mind
              </span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Shield className="w-8 h-8 text-muted-foreground" />
              <span className="text-sm">
                Guaranteed 100% Organic from natural farms
              </span>
            </div>
          </div>

          <div>
            <span className="text-sm text-muted-foreground">SKU: </span>
            <span className="text-sm">{product.productId}</span>
          </div>

          <div>
            <span className="text-sm text-muted-foreground">Tags: </span>
            <span className="text-sm">{productTags.join(", ")}</span>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Reviews</h2>
        <div className="space-y-8">
          {product.reviews?.map((review) => (
            <div key={review.id} className="border-b pb-8">
              <div className="flex items-center gap-4 mb-2">
                <span className="font-semibold">{review.customer.name}</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex mb-2">{renderStars(review.rating)}</div>
              <p className="text-muted-foreground">{review.comment}</p>
            </div>
          )) || <p>No reviews available.</p>}
        </div>

        {/* Add Review Form */}
        <form onSubmit={handleSubmitReview} className="mt-8 space-y-4">
          <h3 className="text-xl font-semibold">Add a review</h3>

          <div>
            <Label>Rating</Label>
            <div className="flex gap-1 mt-2">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setNewReviewRating(i + 1)}
                    className="p-1"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        i < newReviewRating
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
            </div>
          </div>

          <div>
            <Label htmlFor="review">Your review</Label>
            <Textarea
              id="review"
              value={newReviewText}
              onChange={(e) => setNewReviewText(e.target.value)}
              className="mt-2"
              rows={4}
            />
          </div>

          <Button type="submit">Submit Review</Button>
        </form>
      </div>
    </div>
  );
}
