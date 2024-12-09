"use client";

import Heading from "@/components/shared/CustomHeading";
import ProductCard from "@/components/shared/ProductCard";
import { useGetShopDetailsQuery } from "@/redux/api/shopApi";
import { ProductData, ProductInShopDetailPage } from "@/types";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

const ShopDetail: React.FC = () => {
  const params = useParams();
  const id = params?.id as string | undefined; // Ensure id is either string or undefined

  // Use the query hook only if `id` is defined
  const { data, error, isLoading } = useGetShopDetailsQuery({ id: id || "" });

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

  const productsQuantity = productsData?.length;
  const followers = data?.vendor?.follows?.length || 0;

  // const { id: shopId, logo, name, description, products, vendor } = data || {};

  console.log(data?.data?.name, data?.description, data?.logo);

  console.log("data", data?.data);
  console.log("products", productsData, productsQuantity, followers);

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
