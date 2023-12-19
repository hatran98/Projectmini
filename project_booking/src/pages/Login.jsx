import React from "react";
import LoginUser from "../components/screens/LoginUser";
import { Navigate } from "react-router-dom";

function Login() {
  const access_token = localStorage.getItem("access_token") || null;
  if (!access_token) {
    return <LoginUser />;
  } else {
    return <Navigate to="/" />;
  }
}

export default Login;
