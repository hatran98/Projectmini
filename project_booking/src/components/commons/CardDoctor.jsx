import React from "react";
import { useNavigate } from "react-router-dom";
function CardDoctor(props) {
  const navigate = useNavigate();
  const { image, name, department, clinic, keys, category, ...rest } = props;

  return (
    <div
      className="max-w-[16rem] border p-2 rounded shadow border-slate-50 sm:max-h-[17rem]"
      key={keys}
    >
      <div className={`w-full mx-auto rounded ${rest.text}`}>
        <img src={image} className="w-24 h-24 mx-auto"></img>
      </div>
      <div className="text-center mt-2">
        {" "}
        <h3
          className="font-bold cursor-pointer"
          onClick={() => {
            navigate(`/${category}/${keys}`);
          }}
        >
          {name}
        </h3>
        <p>{department}</p>
        <p>{clinic}</p>
      </div>
    </div>
  );
}

export default CardDoctor;
