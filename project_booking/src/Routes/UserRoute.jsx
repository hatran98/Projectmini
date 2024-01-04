import React from "react";
import { Navigate } from "react-router-dom";

const UserRoute = (props) => {
  const access_token = localStorage.getItem("access_token") || "";
  if (access_token) {
    return Navigate({ to: "/" });
  }
  return <div>{props.children}</div>;
};

export default UserRoute;
