import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/User/Home";
import Login from "../pages/User/Login";
import DetailPage from "../pages/User/DetailDoctor";
import List from "../pages/User/List";
import Profile from "../pages/User/Profile";
import DashBoard from "../pages/Admin/pages/DashBoard";
import UserPanel from "../pages/Admin/pages/UserPanel";
import DoctorPanel from "../pages/Admin/pages/DoctorPanel";
import BookingPanel from "../pages/Admin/pages/BookingPanel";
import CreateDoctor from "../pages/Admin/pages/CreateDoctor";
import AccountDoctor from "../pages/Admin/pages/AccountDoctor";
import History from "../pages/User/History";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import DoctorRoute from "./DoctorRoute";
import UserRoute from "./UserRoute";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <UserRoute>
            <Login />
          </UserRoute>
        }
      />
      <Route path={`/bac-si/:id`} element={<DetailPage />} />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        }
      />

      <Route
        path="/history"
        element={
          <PrivateRoute>
            <History />
          </PrivateRoute>
        }
      />
      <Route path="/care/tat-ca/bac-si" element={<List />} />
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <DashBoard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/user"
        element={
          <AdminRoute>
            <UserPanel />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/doctor"
        element={
          <AdminRoute>
            <DoctorPanel />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/doctor/add"
        element={
          <AdminRoute>
            <CreateDoctor />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/booking"
        element={
          <DoctorRoute>
            <BookingPanel />
          </DoctorRoute>
        }
      />
      <Route
        path="/admin/account"
        element={
          <DoctorRoute>
            <AccountDoctor />
          </DoctorRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
