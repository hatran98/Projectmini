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
      className={`${isActive ? "border-blue-600 border-b-4 w-1/2" : "w-1/2"}`}
      key={keys}
      onClick={handleClick}
    >
      {title}
    </button>
  );
}
export default ButtonCustom;
