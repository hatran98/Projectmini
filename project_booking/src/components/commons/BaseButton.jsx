import { Button } from "antd";
import React from "react";

const BaseButton = (props) => {
  const { image, text, key } = props;
  return (
    <Button
      className="h-16 bg-slate-50 border-none flex sm:justify-center items-center gap-4"
      key={key}
    >
      <img src={image}></img>
      <span className="text-lg ml-2">{text}</span>
    </Button>
  );
};

export default BaseButton;
