import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import { DataTable } from "@/components/shared/DataTable";
import { useGetVendorProductsQuery } from "@/redux/api/productApi";
import React from "react";
import { vendorProductTableColumns } from "@/components/shared/tableColumnDef/VendorProductTableColumns";

const VendorProducts = () => {
  const { data } = useGetVendorProductsQuery({ page: 1, limit: 10 });
  console.log("data", data);
  return (
    <div>
      <CustomBreadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Dashboard", path: "/dashboard/vendor" },
          { label: "Product" },
        ]}
        title="Product Page"
      />
      <div>
        {data && <DataTable data={data} columns={vendorProductTableColumns} />}
      </div>
    </div>
  );
};

export default VendorProducts;
