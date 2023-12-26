import React from "react";
import Sidebar from "../layouts/Sidebar";
import ContentUserPanel from "../layouts/ContentUserPanel";

function UserPanel() {
  return <Sidebar seletectedKeys="2" content={<ContentUserPanel />} />;
}

export default UserPanel;
