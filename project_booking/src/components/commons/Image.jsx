import React from "react";

function Image({ key, src }) {
  return <img src={src} className="rounded w-[24%]" key={key}></img>;
}

export default Image;
