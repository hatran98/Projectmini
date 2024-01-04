import React from "react";
import { formatCurrency } from "../../helpers/FormatCurrency";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/user";
import Swal from "sweetalert2";

function CardItem({ doctor }) {
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  const navigate = useNavigate();
  return (
    <div className="border rounded mt-3">
      <div className="flex p-2">
        <img src={doctor.image} className="w-20 h-20 rounded-full"></img>
        <div className="flex flex-col">
          <h3 className="font-semibold text-lg">{doctor.name}</h3>
          <p>{doctor.department_id.name}</p>
          <p>{doctor.branch.name}</p>
          <p className="text-sm">
            Chi phí tư vấn{" "}
            <span className="text-green-600">
              {formatCurrency(Number(doctor.price))}
            </span>
          </p>
        </div>
      </div>
      <div className="bg-gray-100 p-3 mt-2 flex justify-between items-center">
        <div className="flex justify-between items-center">
          <img
            src={doctor.clinic_id.image}
            className="h-16 w-16 rounded-full mr-2"
          ></img>
          <div className="flex flex-col justify-center ">
            <h3 className="font-semibold text-sm">
              {doctor.clinic_id.name} -{" "}
              <span className="text-xs font-normal">
                ({doctor.branch.name})
              </span>
            </h3>
            <p className="text-xs">{doctor.branch.address}</p>
          </div>
        </div>
        <Button
          className="bg-blue-600 text-white rounded-xl ml-2 h-fit p-2"
          onClick={() => {
            if (access_token) {
              navigate(`/bac-si/${doctor.id}`);
            } else {
              Swal.fire({
                title: "Bạn muốn đặt lịch?",
                text: "Hãy đăng nhập để tiếp tục!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Đăng nhập",
                cancelButtonText: "Hủy",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/login");
                }
              });
            }
          }}
        >
          Đặt lịch hẹn
        </Button>
      </div>
    </div>
  );
}

export default CardItem;
