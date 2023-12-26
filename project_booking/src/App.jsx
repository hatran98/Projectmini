import { Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Home from "./pages/User/Home";
import Login from "./pages/User/Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import DetailPage from "./pages/User/DetailDoctor";
import List from "./pages/User/List";
import Profile from "./pages/User/Profile";
import DashBoard from "./pages/Admin/pages/DashBoard";
import UserPanel from "./pages/Admin/pages/UserPanel";
import DoctorPanel from "./pages/Admin/pages/DoctorPanel";
import BookingPanel from "./pages/Admin/pages/BookingPanel";
import Sidebar from "./pages/Admin/layouts/Sidebar";

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path={`/bac-si/:id`} element={<DetailPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/care/tat-ca/bac-si" element={<List />} />
        <Route path="/admin/dashboard" element={<DashBoard />} />
        <Route path="/admin/user" element={<UserPanel />} />
        <Route path="/admin/doctor" element={<DoctorPanel />} />
        <Route path="/admin/booking" element={<BookingPanel />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </RecoilRoot>
  );
}

export default App;
