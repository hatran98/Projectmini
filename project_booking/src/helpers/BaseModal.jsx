import React from "react";
import { Input, Modal } from "antd";
import { formatCurrency } from "./FormatCurrency";
const BaseModal = (props) => {
  const { isModalOpen, setIsModalOpen, doctor, detailBooking } = props;
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title={
          Object.keys(doctor).length !== 0
            ? "Chi tiết bác sĩ"
            : "Chi tiết đặt lịch hẹn"
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ className: "hidden" }}
        okButtonProps={{ className: "bg-blue-500" }}
      >
        {Object.keys(doctor).length !== 0 ? (
          <div className="p-3">
            {" "}
            <img src={doctor.image} className="rounded-xl w-full"></img>
            <p className="text-xl font-semibold underline underline-offset-2">
              {doctor.doctor_name}
            </p>
            <Input
              value={doctor.department_name}
              className="my-2"
              disabled
            ></Input>
            <Input value={doctor.branch_id} className="my-2" disabled></Input>
            <Input value={doctor.clinic_name} className="my-2" disabled></Input>
            <Input
              disabled
              value={
                Object.keys(doctor).length !== 0 &&
                formatCurrency(Number(doctor.price))
              }
              className="my-2"
            ></Input>
          </div>
        ) : (
          <>
            <Input
              value={"Người đặt: " + detailBooking.name}
              className="my-2"
              disabled
            ></Input>
            <Input
              value={"Email: " + detailBooking.email}
              className="my-2"
              disabled
            ></Input>
            <Input
              value={"Số điện thoại: " + detailBooking.phone}
              className="my-2"
              disabled
            ></Input>
            <Input
              value={"Thời gian hẹn: " + detailBooking.timebooking}
              className="my-2"
              disabled
            ></Input>
            <Input
              value={"Ngày hẹn: " + detailBooking.datetime}
              className="my-2"
              disabled
            ></Input>
            <Input
              value={"Bác sĩ khám: " + detailBooking.doctor_name}
              className="my-2"
              disabled
            ></Input>
            <Input
              value={"Khoa: " + detailBooking.department_name}
              className="my-2"
              disabled
            ></Input>
            <Input
              value={"Chi nhánh: " + detailBooking.branch_id}
              className="my-2"
              disabled
            ></Input>
            <Input
              value={detailBooking.clinic_name}
              className="my-2"
              disabled
            ></Input>
            <Input
              disabled
              value={
                Object.keys(detailBooking).length !== 0 &&
                "Chi phí: " + formatCurrency(Number(detailBooking.price))
              }
              className="my-2"
            ></Input>
            <Input
              disabled
              value={"Trạng thái: " + detailBooking.status}
              className="my-2"
            ></Input>
          </>
        )}
      </Modal>
    </>
  );
};
export default BaseModal;
