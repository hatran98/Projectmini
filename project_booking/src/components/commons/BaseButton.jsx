import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BaseButton = (props) => {
  const { image, text, keys } = props;
  const navigate = useNavigate();
  return (
    <Button
      className="h-16 bg-slate-50 border-none flex sm:justify-center items-center gap-4"
      key={keys}
      onClick={() => {
        if (keys != 2) {
          Swal.fire({
            icon: "warning",
            title: "Sắp ra mắt...",
          });
        } else if (keys == 2) {
          navigate("/care/tat-ca/bac-si");
        }
      }}
    >
      <img src={image}></img>
      <span className="text-lg ml-2">{text}</span>
    </Button>
  );
};

export default BaseButton;
