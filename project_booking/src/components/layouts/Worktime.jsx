import React from "react";
import { worktime, day } from "../../helpers/WorkTime";
function Worktime() {
  return (
    <div className="border-b-2 border-dashed py-2">
      <h3 className="font-semibold">Giờ làm việc</h3>
      <ul>
        {day.map((d) => (
          <li className="flex justify-between">
            <p>{d.name}</p>
            <p className="font-semibold">
              <span>
                {worktime[0].start} - {worktime[0].end}
              </span>
              {d.id !== 7 && <span> {","} </span>}
              <span>
                {d.id !== 7 && `${worktime[1].start} - ${worktime[1].end}`}
              </span>
            </p>
          </li>
        ))}
        <li className="max-w-lg">
          <p className="font-semibold"></p>
          <p></p>
        </li>
        <li className="text-green-500 font-semibold">CÓ CẤP CỨU</li>
      </ul>
    </div>
  );
}

export default Worktime;
