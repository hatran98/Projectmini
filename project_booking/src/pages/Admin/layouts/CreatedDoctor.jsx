import React, { useEffect, useState } from "react";
import { useBranch } from "../../../hooks/branch";
import { useDepartment } from "../../../hooks/department";
import { useClinic } from "../../../hooks/clinic";
import { formatCurrency } from "../../../helpers/FormatCurrency";
import { Input, InputNumber, Select, Space, Alert, Button, Form } from "antd";
import DetailDoctor from "./DetailDoctor";
import { useDoctorbyId } from "../../../hooks/doctor";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks/user";

function CreatedDoctor() {
  const { branch } = useBranch();
  const { department } = useDepartment();
  const { clinic } = useClinic();
  const [degrees, setDegrees] = useState([""]);
  const [experiences, setExperiences] = useState([""]);
  const [error, setError] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();
  const [inputPrice, setInputPrice] = useState(0);
  const [imageLocal, setImageLocal] = useState("");
  const [doctorData, setDoctorData] = useState({
    clinic_id: null,
    branch: null,
    department_id: null,
    name: "",
    description: "",
    price: 0,
    image: null,
    degree: [],
    experience: [],
  });
  const { createDoctor } = useDoctorbyId();
  const [errors, setErrors] = useState({
    name: "",
  });
  const getLocalFileUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  // Hàm để tải tệp lên Cloudinary
  const uploadToCloudinary = async (file) => {
    try {
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
      throw error;
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    try {
      const localUrl = await getLocalFileUrl(file);
      setImageLocal(localUrl);
      setDoctorData((prevData) => ({
        ...prevData,
        image: localUrl,
      }));
    } catch (error) {
      console.error("Lỗi khi lấy URL tệp cục bộ:", error);
    }
  };

  const handleBlur = (fieldName) => {
    if (fieldName === "name" && !doctorData.name.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Vui lòng nhập thông tin Họ và tên.",
      }));
    }
  };
  const handleSubmit = async () => {
    try {
      if (imageLocal) {
        const cloudinaryUrl = await uploadToCloudinary(imageLocal);
        const newDoctorData = {
          ...doctorData,
          image: cloudinaryUrl,
        };
        setDoctorData(newDoctorData);
        if (
          doctorData.name &&
          doctorData.price &&
          doctorData.image &&
          doctorData.branch.name &&
          doctorData.department_id.name &&
          doctorData.clinic_id.name
        ) {
          createDoctor(newDoctorData);
          setDoctorData({
            clinic_id: null,
            branch: null,
            department_id: null,
            name: "",
            description: "",
            price: 0,
            image: null,
            degree: [],
            experience: [],
          });
          setImageLocal("");
          setDegrees([""]);
          setExperiences([""]);
          setError("");
          toast("Tạo mới thành công", {
            type: "success",
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          setError("Vui lòng nhập đủ các thông tin");
        }
      } else {
        setError("Vui lòng nhập đủ các thông tin");
      }
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
    }
  };
  const handleChangeSelect = (value, option, name) => {
    switch (name) {
      case "clinic":
        setDoctorData((prevData) => ({
          ...prevData,
          clinic_id: {
            id: option.id,
            name: option.value,
            image: option.image,
          },
        }));
        break;
      case "branch":
        setDoctorData((prevData) => ({
          ...prevData,
          branch: {
            id: option.id,
            name: option.value,
            clinic_id: option.clinic_id,
            address: option.address,
          },
        }));
        break;
      case "department":
        setDoctorData((prevData) => ({
          ...prevData,
          department_id: {
            id: option.id,
            name: option.value,
          },
        }));
        break;
      default:
        break;
    }
  };
  const handleChangeInput = (value, name) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
    setDoctorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleChange = (value, index, type) => {
    const updatedDoctorData = { ...doctorData };
    if (type === "degree") {
      setError("");
      setDegrees((prevDegrees) => {
        const updatedDegrees = [...prevDegrees];
        updatedDegrees[index] = value;
        return updatedDegrees;
      });
      updatedDoctorData.degree[index] = { id: index + 1, content: value };
    } else if (type === "experience") {
      setError("");
      setExperiences((prevExperiences) => {
        const updatedExperiences = [...prevExperiences];
        updatedExperiences[index] = value;
        return updatedExperiences;
      });
      updatedDoctorData.experience[index] = { id: index + 1, content: value };
    }

    setDoctorData(updatedDoctorData);
  };

  const handleAdd = (type) => {
    if (
      (type === "degree" && degrees.some((degree) => degree.trim() === "")) ||
      (type === "experience" && experiences.some((exp) => exp.trim() === ""))
    ) {
      setError("Vui lòng nhập thông tin trước khi muốn thêm mới !");
      return;
    }

    if (type === "degree") {
      setDegrees([...degrees, ""]);
      setError("");
    } else if (type === "experience") {
      setExperiences([...experiences, ""]);
      setError("");
    }
  };

  return (
    <div className="mx-auto w-2/3">
      <Form layout="vertical" className="max-w-md">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-5">Tạo mới bác sĩ</h1>
          <p className="cursor-pointer" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-backward"></i>
          </p>
        </div>
        <Form.Item
          label="Họ và tên:"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập thông tin Họ và tên." },
          ]}
        >
          <Input
            className="w-full"
            name="name"
            value={doctorData.name}
            onChange={(e) => handleChangeInput(e.target.value, "name")}
            onBlur={() => handleBlur("name")}
          />
        </Form.Item>
        {errors.name && (
          <div className="text-red-500">Vui lòng nhập thông tin Họ và tên.</div>
        )}
        <Form.Item
          label="Bệnh viện:"
          name="clinic"
          rules={[{ required: true, message: "Vui lòng chọn Bệnh viện." }]}
        >
          <Select
            defaultValue={"Bệnh viện"}
            style={{ minWidth: 200 }}
            onChange={(value, option) =>
              handleChangeSelect(value, option, "clinic")
            }
            options={clinic.map((c) => ({
              label: c.name,
              value: c.name,
              id: c.id,
              name: "clinic_id",
              image: c.image,
            }))}
          ></Select>
        </Form.Item>

        <Form.Item
          label="Khoa:"
          name="department"
          rules={[{ required: true, message: "Vui lòng chọn Khoa." }]}
        >
          <Select
            defaultValue={"Khoa"}
            style={{ minWidth: 100 }}
            onChange={(value, option) =>
              handleChangeSelect(value, option, "department")
            }
            options={department.map((d) => ({
              label: d.name,
              value: d.name,
              id: d.id,
              name: "department_id",
            }))}
          ></Select>
        </Form.Item>

        <Form.Item
          label="Chi nhánh:"
          name="branch"
          rules={[{ required: true, message: "Vui lòng chọn Chi nhánh." }]}
        >
          <Select
            defaultValue={"Chi nhánh"}
            style={{ minWidth: 100 }}
            onChange={(value, option) =>
              handleChangeSelect(value, option, "branch")
            }
            options={branch.map((b) => ({
              label: b.name,
              value: b.name,
              id: b.id,
              clinic_id: b.clinic_id,
              address: b.address,
              name: "branch",
            }))}
          ></Select>
        </Form.Item>

        <Form.Item
          label="Mô tả:"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập Mô tả." }]}
        >
          <Input.TextArea
            placeholder="Mô tả"
            name="description"
            onChange={(e) => handleChangeInput(e.target.value, "description")}
          />
        </Form.Item>
        <Form.Item>
          <Alert
            message={
              <div>
                <p>Số tiền nhập vào được nhân với 1000 VND</p>
                <p className="text-red-500 text-base">
                  Phí khám : {formatCurrency(doctorData.price)}
                </p>
              </div>
            }
            type="warning"
          ></Alert>
        </Form.Item>
        <Form.Item
          label="Phí khám:"
          name="price"
          rules={[{ required: true, message: "Vui lòng nhập Phí khám." }]}
        >
          <InputNumber
            className="max-w-[12rem] "
            name="price"
            defaultValue={0}
            min={0}
            onChange={(value) => {
              setInputPrice(value * 1000);
              setDoctorData((prevData) => ({
                ...prevData,
                price: value * 1000,
              }));
            }}
          />
        </Form.Item>

        <Form.Item
          label="Ảnh đại diện:"
          name="file"
          valuePropName="fileList"
          rules={[{ required: true, message: "Vui lòng tải lên tệp." }]}
        >
          <Space>
            <div className="">
              <label
                htmlFor="fileInput"
                className="cursor-pointer flex justify-between items-center gap-2 w-full border-2 p-2 rounded-xl hover:border-blue-400 hover:text-blue-400"
              >
                <i className="fa-solid fa-upload"></i>
                <span>Upload</span>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </Space>
        </Form.Item>
        {imageLocal && (
          <img
            src={imageLocal}
            alt="image"
            className="w-32 h-32 object-cover"
          />
        )}
        <Form.Item
          label="Bằng cấp:"
          name="degrees"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập thông tin bằng cấp.",
            },
          ]}
        >
          <Space wrap>
            {degrees.map((degree, index) => (
              <React.Fragment key={index}>
                <Input.TextArea
                  placeholder="Bằng cấp"
                  name={`degree_${index}`}
                  value={degree}
                  onChange={(e) =>
                    handleChange(e.target.value, index, "degree")
                  }
                />
              </React.Fragment>
            ))}
            <Button onClick={() => handleAdd("degree")}>+</Button>
          </Space>
        </Form.Item>

        <Form.Item
          label="Kinh nghiệm:"
          name="experiences"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập thông tin kinh nghiệm.",
            },
          ]}
        >
          <Space wrap>
            {experiences.map((experience, index) => (
              <React.Fragment key={index}>
                <Input.TextArea
                  placeholder="Kinh nghiệm"
                  name={`experience_${index}`}
                  value={experience}
                  onChange={(e) =>
                    handleChange(e.target.value, index, "experience")
                  }
                />
              </React.Fragment>
            ))}
            <Button onClick={() => handleAdd("experience")}>+</Button>
          </Space>
        </Form.Item>

        {error && (
          <Form.Item>
            <Alert
              message={error}
              type="error"
              showIcon
              style={{ marginBottom: "10px" }}
            />
          </Form.Item>
        )}

        <Form.Item>
          <Button
            type="primary"
            className="bg-blue-500"
            htmlType="submit"
            onClick={handleSubmit}
          >
            Tạo mới
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreatedDoctor;
