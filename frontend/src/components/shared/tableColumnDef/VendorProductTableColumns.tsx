"use client";

import { VendorProductData } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const vendorProductTableColumns: ColumnDef<VendorProductData>[] = [
  { accessorKey: "categoryName", header: "Category Name" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "description", header: "Description" },
  { accessorKey: "price", header: "Price" },
  { accessorKey: "inventory", header: "Inventory" },
  { accessorKey: "discount", header: "Discount" },
  // { accessorKey: "image", header: "Image" },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      // Retrieve the product data from the row
      const product: VendorProductData = row.original;

      // Handle duplication logic
      const handleDuplicate = () => {
        const duplicatedProduct = {
          ...product,
          productId: `dup-${product.productId}`,
        };
        console.log("Duplicated Product:", duplicatedProduct);

        // Replace this with the actual API call or state update
        alert(`Product "${product.name}" duplicated!`);
      };

      return (
        <div className="flex space-x-2">
          <button className="text-blue-500 hover:underline">Edit</button>
          <button
            className="text-green-500 hover:underline"
            onClick={handleDuplicate}
          >
            Duplicate
          </button>
        </div>
      );
    },
  },
];
