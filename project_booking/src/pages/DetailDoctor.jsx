import React from "react";
import DetailScreen from "../components/screens/DetailDoctorScreen";
import { useDoctorById } from "../hooks/doctor";
import { useParams } from "react-router-dom";

function DetailPage() {
  const { id } = useParams();
  const { doctor } = useDoctorById(id);
  return <DetailScreen doctor={doctor} />;
}

export default DetailPage;
