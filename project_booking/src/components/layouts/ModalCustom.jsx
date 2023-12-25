import React, { useState } from "react";
import { Modal, Form, Input } from "antd";

const ModalCustom = ({ handleOk, handleCancel, isModalOpen, user, doctor }) => {
  return (
    <>
      <Modal
        title={<div className="">Đặt lịch hẹn</div>}
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        okButtonProps={{
          htmlType: "submit",
          className: "bg-blue-500",
        }}
      >
        <Form
          className="mt-4"
          name="booking"
          disabled
          initialValues={user}
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Tên người dùng"
            name="name"
            defaultValue={user.name}
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            defaultValue={user.phone}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            defaultValue={user.email}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
        <p className="text-gray-500 text-base text-center underline-offset-4 underline">
          Vui lòng đến đúng giờ hẹn{" "}
        </p>
      </Modal>
    </>
  );
};
export default ModalCustom;
