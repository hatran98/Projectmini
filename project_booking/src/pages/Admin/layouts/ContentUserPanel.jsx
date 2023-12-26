import React from "react";
import { Table, Button } from "antd";
import { useBlock, useUser, useUsers } from "../../../hooks/user";

const ContentUserPanel = () => {
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
    },

    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => {
        return (
          <Button
            className={
              record.blocked
                ? `bg-red-500 text-white`
                : `bg-green-500 text-white `
            }
            onClick={() => {
              handleUpdate(record);
            }}
          >
            {record.blocked ? "Block" : "Unlock"}
          </Button>
        );
      },
    },
  ];
  const { users } = useUsers("user");
  const { block, user } = useBlock();
  const handleUpdate = (record) => {
    block(record.id, { blocked: !record.blocked });
  };
  return (
    <>
      {users.length > 0 && (
        <Table
          columns={columns}
          dataSource={users}
          scroll={{
            x: 1300,
          }}
          pagination={{
            pageSize: 5,
            defaultCurrent: 1,
            total: users.length,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      )}
    </>
  );
};

export default ContentUserPanel;
