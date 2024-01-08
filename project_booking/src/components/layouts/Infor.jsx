import React from "react";
import { Button } from "antd";
import Input from "../commons/Input";
function Infor({ inforUser, handleChange, handleSubmit }) {
  return (
    <div className="w-full rounded-xl p-4">
      <p className="border-b-2 shadow">Thông tin tài khoản</p>
      <div className="mt-2">
        <form className="flex flex-col">
          <Input
            label={"Tên người dùng: "}
            placeholder="Nhập tên người dùng"
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
            placeholder="Nhập địa chỉ"
            value={inforUser.address}
            name="address"
            onChange={handleChange}
          />
          <Input
            label={"Số điện thoại: "}
            placeholder="Nhập số điện thoại"
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
  );
}

export default Infor;
