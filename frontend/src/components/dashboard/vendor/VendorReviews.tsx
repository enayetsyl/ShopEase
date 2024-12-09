import React, { useState } from "react";
import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import { useGetReviewsQuery } from "@/redux/api/reviewApi";
import { DataTable } from "@/components/shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";

interface Review {
  id: string;
  comment: string;
  rating: number;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  product: {
    id: string;
    name: string;
  };
  createdAt: string;
}

const reviewTableColumns: ColumnDef<Review>[] = [
  {
    accessorKey: "comment",
    header: "Comment",
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ getValue }) => `${getValue<number>()} ★`, // Add star symbol
  },
  {
    accessorKey: "customer.name",
    header: "Customer Name",
  },
  {
    accessorKey: "product.name",
    header: "Product Name",
  },
];

const VendorReviews = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data, error, isLoading } = useGetReviewsQuery({ page, limit });

  const totalPages = Math.ceil((data?.meta?.total || 0) / limit);

  const handlePreviousPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading reviews!</p>;
  }

  // Transform API data into a format compatible with the DataTable
  const tableData: Review[] =
    data?.data.map((review) => ({
      id: review.id,
      comment: review.comment,
      rating: review.rating,
      customer: {
        id: review.customer.id,
        name: review.customer.name,
        email: review.customer.email,
      },
      product: {
        id: review.product.id,
        name: review.product.name,
      },
      createdAt: review.createdAt,
    })) || [];

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
      <div className="p-5">
        <h2 className="text-2xl font-bold mb-5">Vendor Reviews</h2>
        <DataTable
          data={tableData}
          columns={reviewTableColumns}
          pageIndex={page}
          totalPages={totalPages}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
        />
      </div>
    </div>
  );
};

export default VendorReviews;
