import React, { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import { useUpload, useUser, useUpdateUser } from "../../hooks/user";
import Input from "../commons/Input";
import { toast } from "react-toastify";
import { useResetRecoilState } from "recoil";
import { User } from "../../stores/User/CheckUser";
import { useNavigate } from "react-router-dom";
import { Button, Pagination, Table, Space } from "antd";
import { useBooking } from "../../hooks/booking";
import Swal from "sweetalert2";
import Columns from "../../helpers/ColumnTable";
import BaseModal from "../../helpers/BaseModal";
function ProfileScreen() {
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const { bookings, totalCount, deleteBookings } = useBooking(
    user.id,
    currentPage
  );
  const [doctor, setDoctor] = useState({});
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (doctor) => {
    setDoctor(doctor);
    setIsModalOpen(true);
  };
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
  const resetUser = useResetRecoilState(User);
  const [checkActive, setCheckActive] = useState(true);
  const [inforUser, setInforUser] = useState({});
  const [checkUnderline, setCheckUnderline] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
      <div className="flex max-w-6xl mx-auto justify-between my-3 gap-4">
        <div className="border rounded-xl w-1/3 h-72 p-2 flex flex-col justify-between">
          <div className="relative">
            <img
              src={inforUser.image}
              className="w-32 h-32 rounded-full mx-auto max-w-full max-h-full"
            ></img>
            {loading && (
              <div className="absolute right-10 top-0">Đang tải...</div>
            )}
            {checkActive ? (
              <div className="absolute right-0 top-0">
                <label htmlFor="fileInput" className="cursor-pointer">
                  <i className="fa-solid fa-pen-to-square"></i>
                </label>
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={handleUpload}
                />
              </div>
            ) : (
              <div className="absolute right-0 top-0 border rounded px-2">
                <button onClick={handleConfirmUpload}>
                  Upload <i className="fa-solid fa-upload"></i>
                </button>
              </div>
            )}
          </div>
          <div>{user.name}</div>
          <div
            className={`cursor-pointer ${checkUnderline ? "underline" : ""}`}
            onClick={() => {
              setCheckUnderline(true);
            }}
          >
            Thông tin tài khoản
          </div>
          <div
            className={`cursor-pointer ${!checkUnderline ? "underline" : ""}`}
            onClick={() => {
              setCheckUnderline(false);
            }}
          >
            Lịch sử đặt lịch
          </div>
          <div
            onClick={() => {
              resetUser();
              localStorage.removeItem("access_token");
              navigate("/");
              toast.success("Đăng xuất thành công");
            }}
            className="cursor-pointer"
          >
            Đăng xuất
          </div>
        </div>
        {checkUnderline ? (
          <div className="border w-2/3 rounded-xl p-2">
            <p className="border-b-2 shadow">Thông tin tài khoản</p>
            <div className="mt-2">
              <form className="flex flex-col">
                <Input
                  label={"Họ và tên: "}
                  placeholder="Họ và tên"
                  value={inforUser.name}
                  name="name"
                  onChange={handleChange}
                />
                <Input
                  label={"Email: "}
                  placeholder="Email"
                  value={inforUser.email}
                  name="address"
                  onChange={handleChange}
                  disabled
                />
                <Input
                  label={"Địa chỉ: "}
                  placeholder="Địa chỉ"
                  value={inforUser.address}
                  name="address"
                  onChange={handleChange}
                />
                <Input
                  label={"Số điện thoại: "}
                  placeholder="Số điện thoại"
                  value={inforUser.phone}
                  name="phone"
                  onChange={handleChange}
                />
                <Input
                  label={"Vai trò: "}
                  value={inforUser.role}
                  name="role"
                  onChange={handleChange}
                  disabled
                />
              </form>
              <Button
                className="bg-blue-500 border rounded-xl text-white w-32 block mt-2 ml-auto"
                onClick={handleSubmit}
              >
                Cập nhật
              </Button>{" "}
            </div>
          </div>
        ) : (
          <div>
            <Table
              dataSource={bookings}
              columns={[
                ...Columns,
                {
                  title: "Hành động",
                  dataIndex: "action",
                  key: "action",
                  render: (_, record) => (
                    <Space size="middle">
                      {record.status === "request" && (
                        <i
                          className="fa-solid fa-trash cursor-pointer hover:bg-blue-500 hover:text-white"
                          onClick={() => {
                            Swal.fire({
                              title: "Are you sure?",
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                if (record.status === "request") {
                                  deleteBookings(record.id);
                                  Swal.fire({
                                    title: "Deleted!",
                                    text: "Bạn huỷ lịch thành công",
                                    icon: "success",
                                  });
                                  useBooking(user.id, currentPage);
                                }
                              } else {
                                Swal.fire({
                                  title: "Error!",
                                  text: "Lịch đã được xác nhận , không thể huỷ.",
                                  icon: "error",
                                });
                              }
                            });
                          }}
                        ></i>
                      )}
                      <i
                        className="fa-solid fa-eye text-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer"
                        onClick={() => {
                          showModal(record);
                        }}
                      ></i>
                      <BaseModal
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        doctor={doctor}
                      />
                    </Space>
                  ),
                },
              ]}
              pagination={false}
            ></Table>
            <div className="text-right mt-2">
              <Pagination
                pageSize={4}
                current={currentPage}
                total={Math.ceil(Number(totalCount) / 1)}
                onChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ProfileScreen;
