import React from "react";
import Sidebar from "../layouts/Sidebar";
import ContentDashBoard from "../layouts/ContentDashBoard";

function DashBoard() {
  return <Sidebar seletectedKeys="1" content={<ContentDashBoard />} />;
}

export default DashBoard;
