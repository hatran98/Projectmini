import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { useCreatedUser } from "../../hooks/user";
import { toast } from "react-toastify";
const RegisterScreen = () => {
  const [error, setError] = React.useState({});
  const { createdUser } = useCreatedUser();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const user = {
      ...values,
      role: "user",
      blocked: false,
      image:
        "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg",
    };
    if (!values.phone) {
      user.phone = "";
    }
    if (!values.address) {
      user.address = "";
    }
    if (user) {
      const response = await createdUser(user);
      if (response.success) {
        navigate("/login");
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="bg-slate-50 h-screen relative sm:pt-32">
      <div className="container mx-auto sm:pt-20">
        <Link to="/">
          <img
            src="https://id.hellobacsi.com/assets/logos/hellobacsi.svg"
            className="mx-auto "
          ></img>
        </Link>
        <Form
          className="mx-auto sm:mt-10 border rounded shadow w-full"
          name="basic"
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 13,
          }}
          style={{
            maxWidth: 500,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <p className="text-center font-semibold text-xl my-2">Đăng ký </p>
          <Form.Item
            name="email"
            label="E-mail"
            {...(error.email && {
              help: error.email,
              validateStatus: "error",
            })}
            rules={[
              {
                type: "email",
                message: "Không đúng định dạng email!",
              },
              {
                required: true,
                message: "Vui lòng nhập email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên người dùng"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên người dùng!",
              },
              {
                max: 20,
                message: "Vui lòng nhập tên không quá 20 ký tự",
              },
              {
                min: 2,
                message: "Vui lòng nhập tên hơn 2 ký tự",
              },
              {
                pattern: /^[A-Za-z\u00C0-\u017F\s]+$/,
                message: "Vui lòng chỉ nhập chữ và dấu không nhập số",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            {...(error.password && {
              help: error.password,
              validateStatus: "error",
            })}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="Địa chỉ" name="address">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 7, span: 16 }}>
            <p>
              Bạn có tài khoản ?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Đăng nhập
              </span>
            </p>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 7,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" className="bg-blue-500">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="items-end absolute bottom-0 flex w-full justify-between">
        <img src="https://id.hellobacsi.com/assets/graphics/doctor.svg"></img>
        <img src="https://id.hellobacsi.com/assets/graphics/user.svg"></img>
      </div>
    </div>
  );
};

export default RegisterScreen;
