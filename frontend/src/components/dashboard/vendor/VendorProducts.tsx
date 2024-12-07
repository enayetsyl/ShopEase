import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import { DataTable } from "@/components/shared/DataTable";
import { useGetVendorProductsQuery } from "@/redux/api/productApi";
import React, { useState } from "react";
import { vendorProductTableColumns } from "@/components/shared/tableColumnDef/VendorProductTableColumns";
import { VendorProductActions, VendorProductData } from "@/types";
import AddShop from "@/components/forms/AddShop";
import { Dialog } from "@/components/ui/dialog";
import EditProduct from "./Product/EditProduct";

const VendorProducts = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDuplicateOpen, setIsDuplicateOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<VendorProductActions | null>(null);
  const { data } = useGetVendorProductsQuery({ page: 1, limit: 10 });

  const handleEdit = (product: VendorProductData) => {
    const productWithActions: VendorProductActions = {
      ...product,
      handleEdit: () => handleEdit(product),
      handleDuplicate: () => handleDuplicate(product),
    };
    setSelectedProduct(productWithActions);
    setIsEditOpen(true);
    // console.log("edit product", product);
  };

  const handleDuplicate = (product: VendorProductData) => {
    const duplicatedProduct = {
      ...product,
      productId: `dup-${product.productId}`, // Use the correct key
    };
    console.log("Duplicated Product:", duplicatedProduct);
    alert(`Product "${product.name}" duplicated!`);
  };

  // Ensure tableData is always an array
  const tableData: VendorProductActions[] =
    data?.map((product) => ({
      ...product,
      handleEdit: () => handleEdit(product),
      handleDuplicate: () => handleDuplicate(product),
    })) || [];

  console.log("data", tableData);
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
        {data && (
          <DataTable data={tableData} columns={vendorProductTableColumns} />
        )}
      </div>
      {isEditOpen && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <EditProduct product={selectedProduct} onClose={() => setIsEditOpen(false)} />
        </Dialog>
      )}
      {/* {isDuplicateOpen && (
        <Dialog open={isDuplicateOpen} onOpenChange={setIsDuplicateOpen}>
          <AddShop onClose={() => setIsDuplicateOpen(false)} />
        </Dialog>
      )} */}
    </div>
  );
};

export default VendorProducts;
