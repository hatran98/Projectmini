import React from "react";
import { Input } from "antd";
function BaseInput(props) {
  const { type, value, placeholder, label, ...rest } = props;
  return (
    <label className="flex flex-col mb-2">
      {label}
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        className="rounded-xl border w-full "
        {...rest}
      ></Input>
    </label>
  );
}

export default BaseInput;
