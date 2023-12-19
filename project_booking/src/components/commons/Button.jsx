import React, { useState } from "react";

function Button({ keys, title, setActiveButton, isActive }) {
  const handleClick = () => {
    setActiveButton(keys);
  };

  return (
    <button
      className={`w-1/2 ${isActive ? "border-blue-600 border-b-4" : ""}`}
      key={keys}
      onClick={handleClick}
    >
      {title}
    </button>
  );
}
export default Button;
