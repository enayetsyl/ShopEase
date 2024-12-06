import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import React from "react";

const VendorReviews = () => {
  return (
    <div>
      <CustomBreadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Dashboard", path: "/dashboard/vendor" },
          { label: "Review" },
        ]}
        title="Review Page"
      />
    </div>
  );
};

export default VendorReviews;
