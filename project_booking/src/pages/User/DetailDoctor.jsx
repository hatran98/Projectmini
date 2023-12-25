import React from "react";
import DetailScreen from "../../components/screens/DetailDoctorScreen";
import { useDoctorById } from "../../hooks/doctor";
import { useParams } from "react-router-dom";
import { ScrollToTop } from "../../helpers/Scroll";

function DetailPage() {
  const { id } = useParams();
  const { doctor } = useDoctorById(id);
  ScrollToTop();
  return <DetailScreen doctor={doctor} />;
}

export default DetailPage;
