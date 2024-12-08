import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import { useGetAllOrdersQuery } from "@/redux/api/orderApi";
import React from "react";

const VendorOrders = () => {
  const { data, error, isLoading } = useGetAllOrdersQuery({
    page: 1,
    limit: 10,
  });

  console.log("data", data);
  return (
    <div>
      <CustomBreadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Dashboard", path: "/dashboard/vendor" },
          { label: "Order" },
        ]}
        title="Order Page"
      />
      
    </div>
  );
};

export default VendorOrders;
