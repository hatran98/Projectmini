import React from "react";
import { DatePicker, Space } from "antd";

const today = new Date();
const Datetime = ({ onChange }) => {
  const disabledDate = (current) => {
    return current && current < today;
  };

  return (
    <Space direction="vertical">
      <DatePicker
        onChange={onChange}
        placeholder={today.toISOString().split("T")[0]}
        disabledDate={disabledDate}
      />
    </Space>
  );
};
export default Datetime;
