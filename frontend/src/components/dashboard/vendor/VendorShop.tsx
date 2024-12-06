import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import React from "react";

const VendorShop = () => {
  return (
    <div className="">
      <CustomBreadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Dashboard", path: "/dashboard/vendor" },
          { label: "Shop" },
        ]}
        title="Shop Page"
      />
      <div></div>
    </div>
  );
};

export default VendorShop;
