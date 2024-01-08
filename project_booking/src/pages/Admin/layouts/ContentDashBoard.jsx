import React, { useEffect } from "react";
import { useUser } from "../../../hooks/user";
import { useNavigate } from "react-router-dom";

function ContentDashBoard() {
  const { user } = useUser();
  const navigate = useNavigate();

  return <div></div>;
}

export default ContentDashBoard;
