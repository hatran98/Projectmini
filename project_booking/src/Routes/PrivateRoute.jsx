import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../hooks/user";
import { Alert } from "antd";
const PrivateRoute = (props) => {
  const { user } = useUser();
  if (user) {
    if (user.role !== "user") {
      return (
        <Alert
          message="Lỗi"
          description="Bạn không có quyền vào trang này"
          type="error"
        ></Alert>
      );
    }
  }
  return <>{props.children}</>;
};

export default PrivateRoute;
