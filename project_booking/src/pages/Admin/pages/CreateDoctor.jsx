import React from "react";
import Sidebar from "../layouts/Sidebar";
import CreatedDoctor from "../layouts/CreatedDoctor";
function CreateDoctor() {
  return <Sidebar seletectedKeys={"3"} content={<CreatedDoctor />} />;
}

export default CreateDoctor;
