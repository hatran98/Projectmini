import React from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
function CardDoctor(props) {
  const navigate = useNavigate();
  const { image, name, department, clinic, keys, category, ...rest } = props;

  return (
    <div
      className="max-w-[16rem] p-2 my-3 shadow-xl rounded-xl sm:max-h-[17rem] h-full"
      key={keys}
    >
      <div className={`w-full mx-auto rounded ${rest.text}`}>
        <img src={image} className="w-24 h-24 mx-auto object-fit-cover"></img>
      </div>
      <div className="text-center mt-2">
        {" "}
        <h3
          className="font-bold cursor-pointer"
          onClick={() => {
            navigate(`/${category}/${keys}`);
          }}
        >
          <span
            style={{
              display: "inline-block",
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </span>
        </h3>
        <p>{department}</p>
        <p>{clinic}</p>
      </div>
    </div>
  );
}

export default CardDoctor;
