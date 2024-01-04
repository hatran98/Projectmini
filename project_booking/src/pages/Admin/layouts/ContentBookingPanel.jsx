import { Table, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useBooking } from "../../../hooks/booking";
import { useUser } from "../../../hooks/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ContentBookingPanel() {
  const { user } = useUser();
  const navigate = useNavigate();
  const { bookings, getBookingByDoctor, updatedBooking } = useBooking();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  useEffect(() => {
    getBookingByDoctor(user.doctor_id, page, limit);
  }, [user]);

  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "Ngày đặt lịch",
      dataIndex: "datetime",
      key: "datetime",
      width: 200,
    },
    {
      title: "Thời gian đặt lịch",
      dataIndex: "timebooking",
      key: "timebooking",
      width: 200,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 120,
      filters: [
        {
          text: "Yêu cầu",
          value: "request",
        },
        {
          text: "Từ chối",
          value: "reject",
        },
        {
          text: "Chấp nhận",
          value: "accept",
        },
      ],
      onFilter: (value, record) => record.status === value,
      render: (text, record) => {
        return (
          <Select
            value={text}
            onChange={(value) => {
              if (text === "request" && value !== "request") {
                updatedBooking(record.id, value);
                toast("Cập nhật thành công");
              }
            }}
            disabled={text !== "request"}
          >
            <Option value="request">Yêu cầu</Option>
            <Option value="reject">Từ chối</Option>
            <Option value="accept">Chấp nhận</Option>
          </Select>
        );
      },
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={bookings}
        scroll={{ x: 1000 }}
        locale={{
          emptyText: "Không có đơn đặt lịch",
        }}
        pagination={{
          current: page,
          pageSize: limit,
          onChange: (page, pageSize) => {
            setPage(page);
            setLimit(pageSize);
          },
        }}
      ></Table>
    </div>
  );
}

export default ContentBookingPanel;
