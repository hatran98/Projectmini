import React from "react";
import Sidebar from "../layouts/Sidebar";
import Account from "../layouts/Account";

export default function AccountDoctor() {
  return <Sidebar seletectedKeys="5" content={<Account />} />;
}
