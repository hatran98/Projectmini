import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { Form, Input, Button } from "antd";
import { User } from "../../stores/User/CheckUser";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../axios/users";
function LoginUser() {
  const [user, setUser] = useRecoilState(User);
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const onFinish = (values) => {
    if (values.email && values.password) {
      loginUser({
        email: values.email,
        password: values.password,
      })
        .then((res) => {
          if (res.status === 200) {
            setUser(res.data.user);
            toast.success("Đăng nhập thành công");
            navigate("/");
            localStorage.setItem(
              "access_token",
              JSON.stringify(res.data.accessToken)
            );
            setError({
              email: "",
              password: "",
            });
          }
        })
        .catch((err) => {
          if (err.response.data === "Cannot find user") {
            setError({
              email: "Email không tồn tại",
              password: "",
            });
          } else if (err.response.data === "Incorrect password") {
            setError({
              email: "",
              password: "Sai mật khẩu",
            });
          }
        });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="bg-slate-50 h-screen relative">
      <div className="container mx-auto pt-20">
        <Link to="/">
          <img
            src="https://id.hellobacsi.com/assets/logos/hellobacsi.svg"
            className="mx-auto "
          ></img>
        </Link>
        <Form
          className="mx-auto mt-10 border rounded shadow"
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
          <p className="text-center font-semibold text-xl my-2">Đăng Nhập</p>
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
            label="Password"
            name="password"
            {...(error.password && {
              help: error.password,
              validateStatus: "error",
            })}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item className="" wrapperCol={{ offset: 3, span: 16 }}>
            <p className="text-sm ml-2">
              Bạn chưa có tài khoản?{" "}
              <span className="text-blue-400 underline cursor-pointer">
                Đăng ký
              </span>
            </p>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" className="bg-blue-500">
              Đăng Nhập
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
}

export default LoginUser;
