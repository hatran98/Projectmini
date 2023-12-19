import { Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import DetailPage from "./pages/DetailDoctor";
import DetailHospital from "./pages/DetailHospital";

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path={`/bac-si/:id`} element={<DetailPage />} />
        <Route path={`/benh-vien/:id`} element={<DetailHospital />} />
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
