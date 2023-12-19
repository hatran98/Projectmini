import React, { useState } from "react";
import Datetime from "../commons/Datetime";
import Button from "../commons/Button";
import { day, worktime, time } from "../../helpers/WorkTime";
function Booking({ name }) {
  const [activeButton, setActiveButton] = useState(1);
  const [activeButton2, setActiveButton2] = useState(1);

  return (
    <div>
      <h3 className="font-semibold text-xl">Đặt lịch ngay</h3>
      <p className="text-sm">
        Lựa chọn bác sĩ phù hợp, dịch vụ y tế cần khám và tiến hành đặt lịch
        ngay.
      </p>
      <div className="flex justify-between border-b-[1px]">
        <Button
          keys={1}
          title={"Bác sĩ"}
          setActiveButton={setActiveButton}
          isActive={activeButton === 1}
        />
        <Button
          keys={2}
          title={"Gói dịch vụ"}
          setActiveButton={setActiveButton}
          isActive={activeButton === 2}
        />
      </div>
      <div>
        <p>Bệnh viện</p>
        <select>
          <option>Phòng khám thành công</option>
        </select>
        <p>Chuyên khoa</p>
        <select>
          <option>Nha khoa</option>
        </select>
        <p>Bác sĩ</p>
        <select>
          <option>Bs thu hiền</option>
        </select>
        <div className="border-b-4 border-blue-600 text-blue-600 font-semibold">
          <h3>Tư vấn trực tiếp</h3>
        </div>
        <div className="text-sm">Vui lòng lựa chọn lịch khám bên dưới</div>
        <div>
          <p>Thời gian</p>
          <Datetime />
          <div className="flex justify-between border-b-[1px]">
            <Button
              keys={1}
              title={"Sáng"}
              setActiveButton={setActiveButton2}
              isActive={activeButton2 === 1}
            />
            <Button
              keys={2}
              title={"Chiều"}
              setActiveButton={setActiveButton2}
              isActive={activeButton2 === 2}
            />
          </div>
          {time.map((t) => (
            <button
              className="border-2 p-2 rounded bg-white text-sm w-1/3"
              key={t.id}
            >
              {t.start} - {t.end}{" "}
            </button>
          ))}
        </div>
        <button className="bg-gray-300">Đặt lịch hẹn</button>
      </div>
    </div>
  );
}

export default Booking;
