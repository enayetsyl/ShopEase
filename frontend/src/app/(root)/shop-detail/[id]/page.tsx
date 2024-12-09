"use client";

import Heading from "@/components/shared/CustomHeading";
import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  useFollowShopMutation,
  useUnfollowShopMutation,
} from "@/redux/api/followApi";
import { useGetShopDetailsQuery } from "@/redux/api/shopApi";
import { ProductData, ProductInShopDetailPage } from "@/types";
import { UserIcon, UserMinus, UserPlus } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const ShopDetail: React.FC = () => {
  const params = useParams();
  const id = params?.id as string | undefined;
  const { toast } = useToast();
  const { data } = useGetShopDetailsQuery({ id: id || "" });
  const [followShop] = useFollowShopMutation();
  const [unfollowShop] = useUnfollowShopMutation();

  console.log("data", data);

  const handleFollow = async () => {
    try {
      await followShop({ vendorId: data?.data?.vendorId || "" }).unwrap();

      toast({
        title: "Success",
        description: `You are now following ${data?.data?.name}`,
      });
    } catch (error) {
      console.log("error in following", error);
      toast({
        title: "Error",
        description: "Failed to follow the shop. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollowShop({ id: data?.data?.vendorId || "" }).unwrap();

      toast({
        title: "Success",
        description: `You have unfollowed ${data?.data?.name}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to unfollow the shop. Please try again.",
        variant: "destructive",
      });
    }
  };

  const productsData: ProductData[] =
    data?.data?.products?.map((product: ProductInShopDetailPage) => ({
      shopId: product.shopId,
      productId: product.id,
      categoryId: product.categoryId,
      vendorId: product.vendorId,
      name: product.name,
      discount: product.discount,
      description: product.description,
      image: product.image,
      inventory: product.inventory,
      price: product.price,
    })) || [];

  return (
    <div className="mx-auto px-4 py-8">
      <div className="mb-16 border-b pb-16 last:border-b-0">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Image
              src={data?.data?.logo}
              alt={data?.data?.name}
              width={100}
              height={150}
              className="rounded-full object-cover"
            />
            <h1 className="text-3xl font-bold text-red-600 ml-4">
              {data?.data?.name || "Shop Name"}
            </h1>
          </div>
          <p className="text-lg mb-2">
            {data?.data?.description || "No description available."}
          </p>
          <div className="flex items-center justify-center">
            <UserIcon className="w-5 h-5 mr-2" />
            <span>{data?.data?.vendor?.follows?.length || 0} followers</span>
          </div>
        </div>
        <div className=" flex justify-center items-center gap-5 mb-10">
          <Button variant="outline" className="mt-4" onClick={handleUnfollow}>
            <UserMinus className="w-4 h-4 mr-2" />
            Unfollow
          </Button>

          <Button variant="outline" className="mt-4" onClick={handleFollow}>
            <UserPlus className="w-4 h-4 mr-2" />
            Follow
          </Button>
        </div>
        <Heading
          text="Vendor Products"
          className="text-4xl lg:text-6xl text-center lg:text-left pb-20"
        />
        {productsData && productsData.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-6 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
            {productsData?.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No products available for this shop.
          </p>
        )}
      </div>
    </div>
  );
};

export default ShopDetail;
