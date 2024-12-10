import { useGetAdminUsersQuery } from "@/redux/api/adminApi";
import React from "react";

const User = () => {
  // Pass undefined as the argument since the query does not require parameters
  const { data } = useGetAdminUsersQuery(undefined);

  console.log("User", data);

  return <div>User</div>;
};

export default User;
