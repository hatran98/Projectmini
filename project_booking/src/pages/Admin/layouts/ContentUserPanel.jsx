import React, { useState } from "react";
import { Table, Button, Input } from "antd";
import { useBlock, useUsers } from "../../../hooks/user";
import Swal from "sweetalert2";
const ContentUserPanel = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [emailSearch, setEmailSearch] = useState("");
  const { users, getUserss, totalCount } = useUsers(
    emailSearch,
    "",
    page,
    limit
  );
  const { block, deletedUser } = useBlock();

  const handleUpdate = (record) => {
    block(record.id, { blocked: !record.blocked });
  };
  const handleDeleteConfirmation = (userId) => {
    Swal.fire({
      title: "Bạn có muôn xóa tài khoản này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Huỷ",
    }).then((result) => {
      if (result.isConfirmed) {
        deletedUser(userId);
      }
    });
  };
  const columns = [
    {
      title: "Tên người dùng",
      width: 150,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Ảnh đại diện",
      width: 100,
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <img src={text} width={50} height={50} className="rounded-full" />
      ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      width: 200,
      key: "address",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 100,
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 150,
      key: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      width: 100,
      key: "role",
      filters: [
        {
          text: "doctor",
          value: "doctor",
        },
        {
          text: "user",
          value: "user",
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => {
        return record.role.indexOf(value) === 0;
      },
      filterSearch: true,
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Hành động",
      key: "operation",
      fixed: "right",
      width: 200,
      render: (_, record) => {
        return (
          <>
            <Button
              className={
                record.blocked
                  ? `bg-red-800 text-white`
                  : `bg-green-500 text-white `
              }
              onClick={() => {
                handleUpdate(record);
              }}
            >
              {record.blocked ? "Mở khoá" : "Khoá"}
            </Button>
            {record.role === "doctor" && (
              <Button
                className="bg-red-500 text-white"
                onClick={() => {
                  handleDeleteConfirmation(record.id);
                }}
              >
                Xoá
              </Button>
            )}
          </>
        );
      },
    },
  ];
  return (
    <>
      <div className="flex justify-between mb-2">
        <h1 className="text-2xl font-bold">Danh sách người dùng</h1>
        <div className="flex justify-between items-center w-1/3">
          <Input
            placeholder="Tìm kiếm người dùng"
            onChange={(e) => setEmailSearch(e.target.value)}
          ></Input>
          <Button
            className="mx-1 bg-blue-500 text-white"
            onClick={() => getUserss(emailSearch)}
          >
            Tìm kiếm
          </Button>
        </div>
      </div>
      {users.length > 0 && (
        <Table
          columns={columns}
          locale={{
            emptyText: "Không có dữ liệu",
          }}
          dataSource={users.filter((u) => u.role !== "admin")}
          scroll={{
            x: 1300,
          }}
          pagination={{
            current: page,
            pageSize: limit,
            total: totalCount,
            onChange: (page) => setPage(page),
            onShowSizeChange: (page, limit) => setLimit(limit),
          }}
        />
      )}
    </>
  );
};

export default ContentUserPanel;
