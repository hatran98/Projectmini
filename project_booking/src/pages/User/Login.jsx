import React from "react";
import LoginUser from "../../components/screens/LoginUser";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

function Login() {
  const access_token = localStorage.getItem("access_token") || null;
  if (access_token) {
    const decodedToken = jwtDecode(access_token);
    if (decodedToken.user.role == "admin") {
      return <Navigate to="/dashboard" />;
    } else if (decodedToken.user.role == "user" || "doctor") {
      return <Navigate to="/" />;
    }
  } else {
    return <LoginUser />;
  }
}

export default Login;
