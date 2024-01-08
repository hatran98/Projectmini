import React from "react";
import Swal from "sweetalert2";
import Columns from "../../helpers/ColumnTable";
import BaseModal from "../../helpers/BaseModal";
import { Table, Space } from "antd";
import { toast } from "react-toastify";
function History({
  bookings,
  totalCount,
  deleteBookings,
  useBooking,
  currentPage,
  handlePageChange,
  isModalOpen,
  setIsModalOpen,
  doctor,
  limit,
  detailBooking,
  showModal,
}) {
  return (
    <div>
      <Table
        dataSource={bookings}
        locale={{ emptyText: "Không có lịch sử đặt" }}
        columns={[
          {
            title: "Tên bác sĩ",
            dataIndex: "doctor_name",
            key: "doctor_name",
            width: 600,
            fixed: "left",
            render: (text, record) => (
              <span>
                {record.doctor_name}
                <i
                  className="fa-solid fa-eye text-blue-500 ml-2 cursor-pointer"
                  onClick={() => {
                    showModal(record, "doctor");
                  }}
                ></i>
              </span>
            ),
          },
          ...Columns,
          {
            title: "Hành động",
            dataIndex: "action",
            key: "action",
            fixed: "right",
            width: 200,
            render: (_, record) => (
              <Space size="middle">
                {record.status === "request" && (
                  <i
                    className="fa-solid fa-trash cursor-pointer hover:bg-blue-500 hover:text-white"
                    onClick={() => {
                      if (record.status === "request") {
                        Swal.fire({
                          title: "Bạn chắc muốn xoá không?",
                          text: "Bạn không thể hoàn tác!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Có , tôi đồng ý!",
                          cancelButtonText: "Không",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            if (record.status === "request") {
                              deleteBookings(record.id);
                              toast("Xoá lịch thành công", {
                                type: "success",
                                position: "top-right",
                                autoClose: 5000,
                              });
                              useBooking(user.id, currentPage);
                            }
                          }
                        });
                      } else {
                        Swal.fire({
                          title: "Error!",
                          text: "Lịch đã được xác nhận , không thể huỷ.",
                          icon: "error",
                        });
                      }
                    }}
                  ></i>
                )}
                <i
                  className="fa-solid fa-eye text-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer"
                  onClick={() => {
                    showModal(record, "detail");
                  }}
                ></i>
                <BaseModal
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  doctor={doctor}
                  detailBooking={detailBooking}
                />
              </Space>
            ),
          },
        ]}
        pagination={{
          current: currentPage,
          pageSize: limit,
          total: totalCount,
          onChange: handlePageChange,
        }}
      ></Table>
    </div>
  );
}

export default History;
