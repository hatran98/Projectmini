import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Input } from "antd";
import {
  useDoctor,
  useDoctorbyId,
  useUpdateDoctor,
} from "../../../hooks/doctor";
import { formatCurrency } from "../../../helpers/FormatCurrency";
import { useDepartment } from "../../../hooks/department";
import { useBranch } from "../../../hooks/branch";
import ModalDoctor from "./ModalDoctor";
import { useRecoilState } from "recoil";
import { doctorsState } from "../../../stores/Doctor/ListDoctor";
import Swal from "sweetalert2";
import { useCreatedUser, useUser, useUsers } from "../../../hooks/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ContentDoctorPanel = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { department } = useDepartment();
  const { branch } = useBranch();
  const [nameSearch, setNameSearch] = useState("");
  const { doctors, totalCount, getDoctors } = useDoctor();
  const { createdUser, error } = useCreatedUser();
  const { users } = useUsers("", "doctor", page, limit);
  const { deletedDoctor } = useDoctorbyId();
  const [doctor, setDoctor] = useState({});
  const [degrees, setDegrees] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const { updatedDoctor } = useUpdateDoctor();
  const [doctorList, setDoctorList] = useRecoilState(doctorsState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCreated, setIsModalCreated] = useState(false);
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    doctor_id: null,
    name: "",
    email: "",
    password: "123123",
    image: "",
    address: "",
    phone: "",
    role: "doctor",
    blocked: false,
  });

  const showModalCreated = (doctor) => {
    setAccount((prev) => ({
      ...prev,
      name: doctor.name,
      image: doctor.image,
      doctor_id: doctor.id,
    }));
    setIsModalCreated(true);
  };
  const handleOkModalCreated = async () => {
    if (account.email) {
      await createdUser(account);
      setAccount({
        doctor_id: null,
        name: "",
        email: "",
        password: "123123",
        image: "",
        address: "",
        phone: "",
        role: "doctor",
        blocked: false,
      });
      setIsModalCreated(false);
    }
  };

  const handleCancelModalCreated = () => {
    setIsModalCreated(false);
  };
  const addDegree = () => {
    if (!degrees || degrees.length === 0) {
      setDegrees([{ id: new Date().getTime(), content: "" }]);
    } else {
      setDegrees([...degrees, { id: new Date().getTime(), content: "" }]);
    }
  };

  const handleDegreeChange = (id, content) => {
    const updatedDegrees = degrees.map((degree) =>
      degree.id === id ? { ...degree, content } : degree
    );
    setDegrees(updatedDegrees);
  };

  const removeDegree = (id) => {
    const updatedDegrees = degrees.filter((degree) => degree.id !== id);
    setDegrees(updatedDegrees);
  };
  const onDepartmentFilter = (value, record) => {
    return record.department_id.name === value;
  };
  const onBranchFilter = (value, record) => {
    return record.branch.name === value;
  };

  const showModal = (doctor) => {
    setIsModalOpen(true);
    setDoctor(doctor);
    setDegrees(doctor.degree);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    const newDoctor = { ...doctor, degree: degrees };
    setDoctor(newDoctor);
    updatedDoctor(newDoctor.id, newDoctor);
    toast.success("Sửa thông tin thành công");
    setDoctorList(
      doctorList.map((d) => (d.id === newDoctor.id ? newDoctor : d))
    );
  };

  const handleDelete = (id) => {
    if (id) {
      Swal.fire({
        title: "Bạn chắc muốn xoá không?",
        text: "Bạn không thể hoàn tác!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có , tôi đồng ý!",
        cancelButtonText: "Không",
      }).then((result) => {
        if (result.isConfirmed) {
          deletedDoctor(id);
          Swal.fire({
            title: "Deleted!",
            text: "Bạn huỷ lịch thành công",
            icon: "success",
          });
          setDoctorList(doctorList.filter((d) => d.id !== id));
        }
      });
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeCreated = (field, value) => {
    setAccount((prev) => ({ ...prev, [field]: value }));
  };

  const columns = [
    {
      title: "Họ và tên",
      width: 100,
      dataIndex: "name",
      key: "name",
      fixed: "left",
      filterSearch: true,
      filters:
        doctorList.length > 0 &&
        doctorList.map((d) => ({
          text: d.name,
          value: d.name,
        })),
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "image",
      key: "image",
      width: 100,
      render: (text) => (
        <img src={text} width={50} height={50} className="rounded-full" />
      ),
    },
    {
      title: "Khoa",
      dataIndex: "department_id",
      key: "department_name",
      filters:
        department.length > 0 &&
        department.map((d) => ({
          text: d.name,
          value: d.name,
        })),
      onFilter: onDepartmentFilter,
      filterSearch: true,
      ellipsis: true,
      width: 100,
      render: (text) => <a>{text.name}</a>,
    },
    {
      title: "Chi nhánh",
      dataIndex: "branch",
      key: "branch",
      width: 100,
      ellipsis: true,
      filterSearch: true,
      filters:
        branch.length > 0 &&
        branch.map((b) => ({
          text: b.name,
          value: b.name,
        })),
      onFilter: onBranchFilter,
      render: (text) => <a>{text.name}</a>,
    },
    {
      title: "Phí thăm khám",
      dataIndex: "price",
      key: "price",
      width: 100,
      sorter: (a, b) => a.price - b.price,
      render: (text) => <a>{formatCurrency(text)}</a>,
    },
    {
      title: <div className="text-center">Hành động</div>,
      key: "operation",
      fixed: "right",
      width: 200,
      render: (_, record) => {
        return (
          <div className="flex justify-between">
            <Button
              className="bg-green-400 text-white w-32"
              onClick={() => {
                showModalCreated(record);
              }}
              disabled={
                users.length > 0 && users.some((u) => u.doctor_id === record.id)
              }
            >
              {!(users && users.length > 0) &&
              users &&
              users.some((u) => u.doctor_id === record.id)
                ? "Đã đăng ký"
                : "Đăng ký"}
            </Button>
            <Button
              className="bg-blue-500 text-white"
              onClick={() => {
                setIsEdit(false);
                showModal(record);
                setTitleModal("Chi tiết bác sĩ");
              }}
            >
              Xem
            </Button>

            <Button
              className="bg-orange-400 text-white"
              onClick={() => {
                showModal(record);
                setIsEdit(true);
                setTitleModal("Chỉnh sửa thông tin");
              }}
            >
              Sửa
            </Button>
            <Button
              className="bg-red-500 text-white"
              onClick={() => handleDelete(record.id)}
            >
              Xóa
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex mb-2 justify-between">
        <div className="flex justify-between items-center w-1/5">
          <h3 className="text-2xl font-bold"> Danh sách bác sĩ</h3>
          <Button
            className="bg-blue-500 text-white"
            onClick={() => {
              navigate("/admin/doctor/add");
            }}
          >
            Tạo mới
          </Button>
        </div>

        <div className="flex justify-between w-1/3">
          <Input
            placeholder="Tìm kiếm bác sĩ"
            className="mr-1"
            onChange={(e) => {
              setNameSearch(e.target.value);
            }}
          ></Input>
          <Button
            className="bg-blue-500 text-white"
            onClick={() => getDoctors(nameSearch, page, limit)}
          >
            Tìm kiếm
          </Button>
        </div>
      </div>
      {doctors.length > 0 ? (
        <Table
          columns={columns}
          dataSource={doctors}
          locale={{
            emptyText: "Không có dữ liệu",
          }}
          scroll={{
            x: 1300,
          }}
          pagination={{
            total: totalCount,

            onChange: (page) => {
              setPage(page);
              getDoctors("", page, limit);
            },
          }}
        />
      ) : (
        <p>Đang tải...</p>
      )}
      {Object.keys(doctor).length !== 0 && (
        <ModalDoctor
          title={titleModal}
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          doctor={doctor}
          handleChange={handleChange}
          isEdit={isEdit}
          degrees={degrees}
          handleDegreeChange={handleDegreeChange}
          removeDegree={removeDegree}
          addDegree={addDegree}
        />
      )}
      <div>
        <Modal
          title={`Tạo tài khoản bác sĩ ${account.name}`}
          open={isModalCreated}
          onOk={handleOkModalCreated}
          onCancel={handleCancelModalCreated}
          okButtonProps={{ className: "bg-blue-500" }}
          initialValues={account}
        >
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={account}
          >
            <Form.Item label="Email" name="email">
              <Input
                onChange={(e) => handleChangeCreated("email", e.target.value)}
              />
            </Form.Item>
            {/* <Form.Item label="Password" name="password">
              <Input.Password
                onChange={(e) =>
                  handleChangeCreated("password", e.target.value)
                }
              />
            </Form.Item> */}
            <Form.Item label="Phone" name="phone">
              <Input
                onChange={(e) => handleChangeCreated("phone", e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Address" name="address">
              <Input
                onChange={(e) => handleChangeCreated("address", e.target.value)}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};
export default ContentDoctorPanel;
