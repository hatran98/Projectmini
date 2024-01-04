import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useUser, useUpload } from "../../hooks/user";
import { toast } from "react-toastify";
import { useBooking } from "../../hooks/booking";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import History from "../layouts/History";
import InforUser from "../layouts/InforUser";

function HistoryScreen() {
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const { bookings, totalCount, deleteBookings } = useBooking(
    user.id,
    currentPage
  );
  const { uploadAvatar } = useUpload();
  const [doctor, setDoctor] = useState({});
  const [detailBooking, setDetailBooking] = useState({});

  const [checkActive, setCheckActive] = useState(true);
  const [inforUser, setInforUser] = useState({});
  const [checkUnderline, setCheckUnderline] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setInforUser(user);
    }
  }, [user]);
  const showModal = (doctor, status) => {
    if (status === "doctor") {
      setDoctor(doctor);
      setDetailBooking({});
    } else {
      setDetailBooking(doctor);
      setDoctor({});
    }
    setIsModalOpen(true);
  };

  const uploadImage = async (file) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "upload_image");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/tranvanha/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const { url } = await res.json();
      return url;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setCheckActive(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const url = await uploadImage(file);
    setInforUser((prev) => ({
      ...prev,
      image: url,
    }));
  };

  const handleConfirmUpload = () => {
    setCheckActive(true);
    const { password, ...rest } = inforUser;
    uploadAvatar(inforUser.id, rest);
    toast.success("Thay ảnh đại diện thành công");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-6xl mx-auto my-10">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1">
            <InforUser
              user={user}
              inforUser={inforUser}
              setInforUser={setInforUser}
              checkActive={checkActive}
              handleUpload={handleUpload}
              handleConfirmUpload={handleConfirmUpload}
              checkUnderline={false}
              setCheckUnderline={setCheckUnderline}
              loading={loading}
            ></InforUser>
          </div>
          <div className="col-span-3 mt-3">
            {" "}
            <History
              useBooking={useBooking}
              bookings={bookings}
              totalCount={totalCount}
              deleteBookings={deleteBookings}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setCheckActive={setCheckActive}
              setCheckUnderline={setCheckUnderline}
              handlePageChange={handlePageChange}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              doctor={doctor}
              detailBooking={detailBooking}
              showModal={showModal}
            ></History>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default HistoryScreen;
