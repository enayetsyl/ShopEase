import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import React from "react";

const VendorOrders = () => {
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
