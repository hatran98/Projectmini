import React from "react";
import { Breadcrumb } from "antd";
import { Link, useParams } from "react-router-dom";
import { useDoctorById } from "../../hooks/doctor";

function BreadCrumb() {
  const { id } = useParams();
  const { doctor } = useDoctorById(id);
  return (
    <Breadcrumb
      items={[
        {
          title: "Tìm kiếm",
        },
        {
          title: (
            <Link to={`/bac-si/${id}`} className="font-bold">
              {doctor?.name}
            </Link>
          ),
        },
      ]}
    />
  );
}
export default BreadCrumb;
