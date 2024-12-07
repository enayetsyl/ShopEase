import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import { DataTable } from "@/components/shared/DataTable";
import {
  useDuplicateProductMutation,
  useGetVendorProductsQuery,
} from "@/redux/api/productApi";
import React, { useState } from "react";
import { vendorProductTableColumns } from "@/components/shared/tableColumnDef/VendorProductTableColumns";
import { VendorProductActions, VendorProductData } from "@/types";
import { Dialog } from "@/components/ui/dialog";
import EditProduct from "./Product/EditProduct";
import { useToast } from "@/hooks/use-toast";
import DuplicationAlert from "./Product/DuplicationAlert";

const VendorProducts = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<VendorProductActions | null>(null);
  const { data } = useGetVendorProductsQuery({ page: 1, limit: 10 });
  const [duplicateProduct, { isLoading }] = useDuplicateProductMutation();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { toast } = useToast();

  const handleEdit = (product: VendorProductData) => {
    const productWithActions: VendorProductActions = {
      ...product,
      handleEdit: () => handleEdit(product),
      handleDuplicate: () => handleDuplicate(),
    };
    setSelectedProduct(productWithActions);
    setIsEditOpen(true);
  };

  const handleDuplicate = async () => {
    if (selectedProduct) {
      try {
        const response = await duplicateProduct({
          productId: selectedProduct.productId,
        });

        if (response && response.data && response.data.success) {
          toast({
            description: `${response.data.message}`,
          });
        } else {
          toast({
            description: `An Error Occurred`,
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error duplicating product:", error);
      }
    }
    setIsAlertOpen(false);
  };

  const tableData: VendorProductActions[] =
    data?.map((product) => ({
      ...product,
      handleEdit: () => handleEdit(product),
      handleDuplicate: () => {
        const productWithActions: VendorProductActions = {
          ...product,
          handleEdit: () => handleEdit(product),
          handleDuplicate: () => handleDuplicate(),
        };
        setSelectedProduct(productWithActions);
        setIsAlertOpen(true);
      },
    })) || [];

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
      {isEditOpen && selectedProduct && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <EditProduct
            product={selectedProduct}
            onClose={() => setIsEditOpen(false)}
          />
        </Dialog>
      )}
      {isAlertOpen && (
        <DuplicationAlert
          isAlertOpen={isAlertOpen}
          setIsAlertOpen={setIsAlertOpen}
          handleDuplicate={handleDuplicate}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default VendorProducts;
