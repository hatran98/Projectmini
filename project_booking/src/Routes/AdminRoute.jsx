import React from "react";
import { useUser } from "../hooks/user";
import { Alert } from "antd";
const AdminRoute = (props) => {
  const { user } = useUser();
  if (user && user.role !== "admin") {
    return (
      <Alert
        message="Lỗi"
        description="Bạn không có quyền vào trang này"
        type="error"
      />
    );
  }
  return <div>{props.children}</div>;
};

export default AdminRoute;
