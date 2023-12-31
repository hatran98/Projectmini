import React, { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import { useUpload, useUser, useUpdateUser } from "../../hooks/user";
import { toast } from "react-toastify";
import { useResetRecoilState } from "recoil";
import { User } from "../../stores/User/CheckUser";
import { useBooking } from "../../hooks/booking";
import Infor from "../layouts/Infor";
import InforUser from "../layouts/InforUser";
function ProfileScreen() {
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const { bookings, totalCount, deleteBookings } = useBooking(
    user.id,
    currentPage
  );

  const isValidData = () => {
    if (!inforUser.name || !inforUser.address || !inforUser.phone) {
      toast.warning("Vui lòng điền đầy đủ thông tin.", {
        position: "top-right",
        autoClose: 5000,
      });
      return false;
    }
    return true;
  };
  const { uploadAvatar } = useUpload();
  const { updateInforUser } = useUpdateUser();
  const [checkActive, setCheckActive] = useState(true);
  const [inforUser, setInforUser] = useState({});
  const [checkUnderline, setCheckUnderline] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user) {
      setInforUser(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInforUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (isValidData()) {
      const { password, ...rest } = inforUser;
      updateInforUser(rest);
      toast.success("Cập nhật thông tin thành công");
    }
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

  return (
    <div>
      <Navbar />
      <div className=" max-w-6xl mx-auto my-10">
        {" "}
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1">
            <InforUser
              user={user}
              inforUser={inforUser}
              handleUpload={handleUpload}
              checkActive={checkActive}
              checkUnderline={checkUnderline}
              loading={loading}
              handleConfirmUpload={handleConfirmUpload}
            />
          </div>
          <div className="col-span-3 shadow-xl rounded-xl">
            <Infor
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              inforUser={inforUser}
            ></Infor>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfileScreen;
