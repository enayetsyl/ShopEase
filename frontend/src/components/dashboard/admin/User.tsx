"use client";
import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import Heading from "@/components/shared/CustomHeading";
import { DataTable } from "@/components/shared/DataTable";
import { AdminUserTableColumns } from "@/components/shared/tableColumnDef/AdminUserTableColumns";
import { useGetAdminUsersQuery } from "@/redux/api/adminApi";
import React, { useState } from "react";

const User = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data } = useGetAdminUsersQuery({ page, limit });

  console.log("User", data);

  const totalPages = Math.ceil((data?.meta?.total || 0) / limit);

  const handlePreviousPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div>
      <CustomBreadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Dashboard", path: "/dashboard/admin" },
          { label: "Users" },
        ]}
        title="Users Page"
      />
      <div className="p-5">
        <div className="flex justify-center items-center pt-10 pb-10">
          <Heading text="Users" className="text-4xl lg:text-6xl" />
        </div>
        <DataTable
          data={data?.data || []}
          columns={AdminUserTableColumns}
          pageIndex={page}
          totalPages={totalPages}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
        />
      </div>
    </div>
  );
};

export default User;
