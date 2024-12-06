import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import { useGetProductsQuery } from "@/redux/api/productApi";
import React from "react";

const VendorProducts = () => {
  const {data} = useGetProductsQuery()
  console.log('data', data)
  return <div>
    <CustomBreadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Dashboard", path: "/dashboard/vendor" },
          { label: "Product" },
        ]}
        title="Product Page"
      />
  </div>;
};

export default VendorProducts;
