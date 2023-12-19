import React from "react";
import Worktime from "./Worktime";
import CardDoctor from "../commons/CardDoctor";
import Booking from "./Booking";

function DetailHospital() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="border-b-8">
        <div>
          <p className="bg-blue-200">BreadCrumd</p>
        </div>
        <div className="max-w-6xl mx-auto">
          <img src="https://cdn-healthcare.hellohealthgroup.com/2023/07/1690000081_64bb5ad193a336.49797810.jpg"></img>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-start">
            <img
              src="https://cdn-healthcare.hellohealthgroup.com/hospitals/vn/phong-kham-da-khoa-quoc-te-golden-healthcare20220211.png"
              className="w-32 h-32 border rounded-full mr-3"
            ></img>
            <div className="flex flex-col justify-center items-left">
              <h3 className="font-bold text-2xl">
                Phòng khám Đa khoa Quốc tế Golden Healthcare
              </h3>
              <p className="text-sm text-gray-300">
                37 Hoàng Hoa Thám, P. 13, Q. Tân Bình, TP. HCM
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-2/3">
          <div className="flex flex-wrap">
            <button>Thông tin chung</button>
            <button>Dịch vụ</button>
            <button>Bác sĩ</button>
            <button>Đánh giá</button>
          </div>
          <Worktime />
          <div>
            <h3 className="font-semibold">Thông tin bệnh viện</h3>
            {Array.from({ length: 4 }).map(() => (
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
                nemo veritatis qui similique officiis? Saepe labore fuga
                similique explicabo reiciendis qusas quis a earum neque eveniet,
                nobis, ex dignissimos in!
              </p>
            ))}
          </div>
          <div>
            <h3>Chuyên khoa</h3>
            <ul className="flex justify-between flex-wrap w-1/3">
              {Array.from({ length: 10 }).map((e, i) => (
                <li className="w-1/2">Chuyên khoa {i + 1}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Cơ sở vật chất</h3>
            <ul className="flex justify-between flex-wrap w-1/3">
              {Array.from({ length: 10 }).map((e, i) => (
                <li className="w-1/2">Máy nội soi {i + 1}</li>
              ))}
            </ul>
          </div>
          <div>
            <CardDoctor />
          </div>
        </div>
        <div className="w-1/3 bg-slate-50 p-4">
          <Booking />
        </div>
      </div>
    </div>
  );
}

export default DetailHospital;
