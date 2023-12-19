import React from "react";

function Detail({ doctor }) {
  return (
    <div className="mx-auto sm:max-w-6xl">
      {doctor && (
        <div>
          <div className="flex mt-2 justify-center">
            <img src={doctor.image} className="h-24 rounded-full"></img>
            <div className="mx-2 mt-2">
              <p className="font-bold text-xl">{doctor.name}</p>
              <p>
                {doctor.department_id?.name} - {doctor.clinic_id?.name}
              </p>{" "}
            </div>
          </div>
          <div className="my-2">
            <h3 className="text-xl font-bold my-2">Hồ sơ chuyên gia</h3>
            <p className="text-base">{doctor.description}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold my-2">Thông tin xác thực</h3>
            <div className="flex justify-between w-full sm:w-1/2">
              <div>
                <p className="text-base font-bold text-gray-400">BẰNG CẤP</p>
                <ul>
                  {doctor?.degree?.map((de) => (
                    <li className="text-base font-semibold">{de.content}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-base font-bold text-gray-400">KINH NGHIỆM</p>
                <ul>
                  {doctor?.experience?.map((ex) => (
                    <div>
                      <li className="text-base font-semibold">{ex.content}</li>
                      <p className="text-gray-300 text-base">
                        {doctor.clinic_id.name}
                      </p>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
