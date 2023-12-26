import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import { formatCurrency } from "./FormatCurrency";
const BaseModal = (props) => {
  const { isModalOpen, setIsModalOpen, doctor } = props;
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Chi tiết bác sĩ"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ className: "hidden" }}
        okButtonProps={{ className: "bg-blue-500" }}
      >
        <div className="p-3">
          <img src={doctor.image} className="rounded-xl w-full"></img>
          <p className="text-xl font-semibold underline underline-offset-2">
            {doctor.doctor_name}
          </p>
          <Input value={doctor.department_name} className="my-2"></Input>
          <Input value={doctor.branch_id} className="my-2"></Input>
          <Input value={doctor.clinic_name} className="my-2"></Input>
          <Input
            value={"Thời gian hẹn: " + doctor.timebooking}
            className="my-2"
          ></Input>
          <Input
            value={"Ngày hẹn: " + doctor.datetime}
            className="my-2"
          ></Input>
        </div>
      </Modal>
    </>
  );
};
export default BaseModal;
