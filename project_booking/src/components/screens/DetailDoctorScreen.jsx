import React from "react";
import Detail from "../layouts/DetailDoctor";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import { Button } from "antd";
import Category from "../layouts/Category";
import { useDoctor } from "../../hooks/doctor";
import BreadCrumb from "../layouts/BreadCrumb";
import Booking from "../layouts/Booking";
import { useUser } from "../../hooks/user";
function DetailScreen({ doctor }) {
  const { doctors } = useDoctor();
  const { user } = useUser();
  const filterDoctors = doctors.filter(
    (d) =>
      d.department_id?.id === doctor.department_id?.id && d.id !== doctor.id
  );
  return (
    <div>
      <Navbar />
      <div className="bg-blue-200 w-full">
        <p className="max-w-6xl mx-auto">
          <BreadCrumb />
        </p>
      </div>
      <div className="flex max-w-6xl mx-auto mt-2 border-2 rounded-t-2xl">
        <div className="flex flex-col border-r-2 w-2/3">
          <Detail doctor={doctor} />
        </div>
        <div className="w-1/3 ">
          <Booking doctor={doctor} user={user} />
        </div>
      </div>
      <Category
        category="bac-si"
        array={filterDoctors}
        slide={4}
        content="Danh sách bác sĩ cùng khoa"
        text="bg-blue-300"
      />
      <Footer />
    </div>
  );
}

export default DetailScreen;
