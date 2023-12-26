import React from "react";
import Sidebar from "../layouts/Sidebar";
import ContentBookingPanel from "../layouts/ContentBookingPanel";

function BookingPanel() {
  return <Sidebar seletectedKeys="4" content={<ContentBookingPanel />} />;
}

export default BookingPanel;
