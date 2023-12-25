import React from "react";
function ButtonCustom({
  keys,
  title,
  setActiveButton,
  isActive,
  setCheckActive,
  checkActive,
}) {
  const handleClick = () => {
    setActiveButton(keys);
    setCheckActive(checkActive);
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
export default ButtonCustom;
