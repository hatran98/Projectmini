import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const access_token = localStorage.getItem("access_token") || "";
  const decodedToken = jwtDecode(access_token);

  return decodedToken ? <Navigate to="/" /> : <Outlet />;
}

export default PrivateRoute;
