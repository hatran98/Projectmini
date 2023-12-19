import React from "react";
import BaseButton from "../commons/BaseButton";
import { buttons } from "../../helpers/BaseButton";
function Select() {
  return (
    <div className="container max-w-6xl mx-auto flex flex-wrap flex-col justify-between border-b-2 py-3 border-dashed sm:flex-row">
      {buttons.map((but) => (
        <BaseButton image={but.image} text={but.title} key={but.id} />
      ))}
    </div>
  );
}

export default Select;
