import React from "react";

function InforCard(props) {
  const { id, src, title, content } = props;
  return (
    <div
      className="text-center bg-[#e3f2ff] rounded p-5 sm:mx-2 my-2 w-full"
      key={id}
    >
      <img src={src} className="mx-auto mb-2 w-44 h-32"></img>
      <h3 className="font-bold text-lg mt-2 w-full">{title}</h3>
      <p className="text-[15px]">{content}</p>
    </div>
  );
}

export default InforCard;
