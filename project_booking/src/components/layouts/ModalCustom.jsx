import React, { useState } from "react";
import { Modal, Form, Input } from "antd";

const ModalCustom = ({ handleOk, handleCancel, isModalOpen, user, doctor }) => {
  return (
    <>
      <Modal
        title={<div className="">Xác nhận thông tin</div>}
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        okButtonProps={{
          htmlType: "submit",
          className: "bg-blue-500",
        }}
      >
        <table className="my-4 text-base">
          <tbody>
            <tr className="font-semibold">
              <td className="p-2">Tên người dùng:</td>
              <td className="p-2">{user.name}</td>
            </tr>

            <tr className="font-semibold">
              <td className="p-2">Số điện thoại:</td>
              <td className="p-2">{user.phone}</td>
            </tr>

            <tr className="font-semibold">
              <td className="p-2">Email:</td>
              <td className="p-2">{user.email}</td>
            </tr>
          </tbody>
        </table>

        <p className="text-gray-500 text-base text- center underline-offset-4 underline p-2">
          Vui lòng đến đúng giờ hẹn{" "}
        </p>
      </Modal>
    </>
  );
};
export default ModalCustom;
