"use client";

import { useParams } from "next/navigation";
import React from "react";

const ShopDetail = () => {
  const { id } = useParams();

  console.log("shop id", id);

  return <div>ShopDetail</div>;
};

export default ShopDetail;
