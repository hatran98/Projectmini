import React from "react";
import Sidebar from "../layouts/Sidebar";
import ContentDoctorPanel from "../layouts/ContentDoctorPanel";

function DoctorPanel() {
  return <Sidebar seletectedKeys="3" content={<ContentDoctorPanel />} />;
}

export default DoctorPanel;
