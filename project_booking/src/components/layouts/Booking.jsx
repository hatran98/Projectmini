import React, { useState, useEffect } from "react";
import Datetime from "../commons/Datetime";
import { timemorning, timeafternoon } from "../../helpers/WorkTime";
import ButtonCustom from "../commons/Button";
import ModalCustom from "./ModalCustom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../../hooks/booking";
import { convertTimeStringToDate } from "../../helpers/FormatTime";
import { Select, Button } from "antd";
function Booking({ doctor, user }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeButton, setActiveButton] = useState(1);
  const [activeButton2, setActiveButton2] = useState(1);
  const [activeButton3, setActiveButton3] = useState(null);
  const [checkActive, setCheckActive] = useState(false);
  const [selectedDatetime, setSelectedDatetime] = useState(null);
  const { bookings, getBookingByDoctor } = useBooking();
  useEffect(() => {
    getBookingByDoctor(doctor.id);
  }, [doctor.id, selectedDatetime]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [booking, setBooking] = useState({});
  const { createdBooking } = useBooking();
  const navigate = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
    const timebookingStart =
      activeButton3 < 9
        ? timemorning.find((t) => t.id === activeButton3)?.start
        : timeafternoon.find((t) => t.id === activeButton3)?.start;
    const timebookingEnd =
      activeButton3 < 9
        ? timemorning.find((t) => t.id === activeButton3)?.end
        : timeafternoon.find((t) => t.id === activeButton3)?.end;
    const timebookingRange = `${timebookingStart} - ${timebookingEnd}`;
    setBooking({
      doctor_id: doctor.id,
      doctor_name: doctor.name,
      image: doctor.image,
      user_id: user.id,
      datetime: selectedDatetime?.$d?.toISOString().split("T")[0],
      timebooking_id: activeButton3,
      timebooking: timebookingRange,
      clinic_name: doctor.clinic_id.name,
      department_name: doctor.department_id.name,
      branch_id: doctor.branch.name,
      price: doctor.price,
      status: "request",
      name: user.name,
      phone: user.phone,
      email: user.email,
    });
  };
  const handleOk = () => {
    setIsModalOpen(false);
    toast("Đặt lịch thành công , bạn có thể xem lại lịch đã đặt tại đây", {
      type: "success",
      position: "top-right",
      autoClose: 5000,
      onClick: () => {
        navigate("/history");
      },
    });
    createdBooking(booking);
    setActiveButton3(null);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDatetimeChange = (selectedDatetime) => {
    setSelectedDatetime(selectedDatetime);
    setActiveButton3(null);
  };

  const isSlotDisabled = (start, timeId) => {
    const bookingIds = bookings
      .filter((booking) => booking.status !== "reject")
      .map((booking) => booking.timebooking_id);

    const bookingTime = bookings
      .filter((booking) => booking.status !== "reject")
      .map((booking) => booking.datetime);

    const checkBooking = bookingTime.includes(
      selectedDatetime?.$d?.toISOString().split("T")[0]
    );

    return (
      (currentTime > convertTimeStringToDate(start) &&
        selectedDatetime &&
        selectedDatetime.$D <= currentTime.getDate()) ||
      (bookingIds.includes(timeId) && checkBooking)
    );
  };

  return (
    <div className="p-3">
      <h3 className="font-semibold text-xl">Đặt lịch ngay</h3>
      <p className="text-sm">
        Lựa chọn bác sĩ phù hợp, dịch vụ y tế cần khám và tiến hành đặt lịch
        ngay.
      </p>

      <div className="mt-2">
        <div className="text-left flex flex-col">
          <p>Chi nhánh</p>
          <Select
            className="border rounded-xl my-2"
            value={doctor.branch?.name}
          >
            <Select.Option value={doctor.branch?.name}>
              {doctor.branch?.name}
            </Select.Option>
          </Select>
        </div>

        <div className="text-left flex flex-col">
          <p>Chuyên khoa</p>
          <Select
            className="border rounded-xl my-2"
            value={doctor.department_id?.name}
          >
            <Select.Option value={doctor.department_id?.name}>
              {doctor.department_id?.name}
            </Select.Option>
          </Select>
        </div>

        <div className="text-left flex flex-col">
          <p>Bác sĩ</p>
          <Select className="border rounded-xl my-2" value={doctor.name}>
            <Select.Option value={doctor.name}>{doctor.name}</Select.Option>
          </Select>
        </div>
        {user && user.role === "user" && (
          <>
            <div className="text-sm my-1">
              Vui lòng lựa chọn lịch khám bên dưới
            </div>
            <div className="my-2">
              <p className="font-semibold mb-2">Thời gian:</p>
              <div className="">
                <Datetime onChange={handleDatetimeChange} />
                {selectedDatetime && (
                  <>
                    <div className="flex justify-between border-b-[1px] mt-3">
                      <ButtonCustom
                        keys={1}
                        title={"Sáng"}
                        setActiveButton={setActiveButton2}
                        isActive={activeButton2 === 1}
                        setCheckActive={setCheckActive}
                        checkActive={false}
                      />
                      <ButtonCustom
                        keys={2}
                        title={"Chiều"}
                        setActiveButton={setActiveButton2}
                        isActive={activeButton2 === 2}
                        setCheckActive={setCheckActive}
                        checkActive={true}
                      />
                    </div>
                    <div className="flex flex-wrap justify-around">
                      {!checkActive
                        ? timemorning.map((t) => {
                            return (
                              <button
                                className={`border-2 p-2 rounded-xl text-sm w-36 mt-2 ${
                                  activeButton3 === t.id
                                    ? "bg-blue-600 border-blue-600 text-white"
                                    : ""
                                } ${
                                  isSlotDisabled(t.start, t.id)
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : ""
                                }`}
                                key={t.id}
                                disabled={isSlotDisabled(t.start, t.id)}
                                onClick={() => setActiveButton3(t.id)}
                              >
                                {t.start} - {t.end}{" "}
                              </button>
                            );
                          })
                        : timeafternoon.map((t) => (
                            <button
                              className={`border-2 p-2 rounded-xl text-sm w-36 mt-2 ${
                                activeButton3 === t.id
                                  ? "bg-blue-600 border-blue-600 text-white"
                                  : ""
                              } ${
                                isSlotDisabled(t.start)
                                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                  : ""
                              }`}
                              key={t.id}
                              disabled={isSlotDisabled(t.start)}
                              onClick={() => setActiveButton3(t.id)}
                            >
                              {t.start} - {t.end}{" "}
                            </button>
                          ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex justify-between mt-3">
              <Button
                className={`w-56 h-12 rounded-xl ${
                  activeButton3
                    ? "hover:bg-blue-500 bg-blue-600 text-white "
                    : "bg-gray-400 text-white"
                }`}
                disabled={!activeButton3}
                onClick={() => showModal()}
              >
                Đặt lịch hẹn
              </Button>
            </div>
          </>
        )}
      </div>
      <ModalCustom
        handleOk={handleOk}
        handleCancel={handleCancel}
        isModalOpen={isModalOpen}
        user={user}
        doctor={doctor}
      />
    </div>
  );
}

export default Booking;
