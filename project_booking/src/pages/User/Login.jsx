import React from "react";
import LoginUser from "../../components/screens/LoginUser";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

function Login() {
  const access_token = localStorage.getItem("access_token") || null;
  if (access_token) {
    const decodedToken = jwtDecode(access_token);
    if (decodedToken.user.role == "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else if (decodedToken.user.role == "user") {
      return <Navigate to="/" />;
    } else if (decodedToken.user.role == "doctor") {
      return <Navigate to="/admin/booking" />;
    }
  } else {
    return <LoginUser />;
  }
}

export default Login;
