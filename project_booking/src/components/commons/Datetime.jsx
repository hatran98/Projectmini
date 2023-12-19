import React from "react";
import { DatePicker, Space } from "antd";
const onChange = (date, dateString) => {
  console.log(date, dateString);
};
const today = new Date().toISOString().split("T")[0];

const Datetime = () => (
  <Space direction="vertical">
    <DatePicker onChange={onChange} placeholder={`${today}`} />
  </Space>
);
export default Datetime;
