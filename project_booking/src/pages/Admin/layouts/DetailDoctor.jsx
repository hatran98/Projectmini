import React from "react";
import { formatCurrency } from "../../../helpers/FormatCurrency";
import { Input } from "antd";

function DetailDoctor({ doctorData }) {
  return (
    <div className="flex rounded-xl items-center justify-between gap-3">
      <div className="w-1/3 overflow-hidden">
        <img src={doctorData?.image} className="rounded-xl w-full h-fit"></img>
      </div>
      <div className="w-2/3 flex gap-5">
        <div className="w-1/2 flex flex-col justify-center gap-3">
          {doctorData?.name && (
            <Input value={doctorData?.name} addonBefore="Họ và tên: "></Input>
          )}
          {doctorData?.clinic_id?.name && (
            <Input
              value={doctorData?.clinic_id?.name}
              addonBefore="Phòng khám: "
            ></Input>
          )}
          {doctorData?.department_id?.name && (
            <Input
              value={doctorData?.department_id?.name}
              addonBefore="Khoa: "
            ></Input>
          )}
          {doctorData?.branch?.name && (
            <Input
              value={doctorData?.branch?.name}
              addonBefore="Chi nhánh: "
            ></Input>
          )}
          {doctorData.price !== 0 && (
            <Input
              value={formatCurrency(doctorData?.price)}
              addonBefore="Phí khám: "
            ></Input>
          )}
        </div>
        <div className="flex flex-col justify-between ">
          {doctorData.description && (
            <Input.TextArea
              value={doctorData?.description}
              addonBefore="Mô tả: "
              autoSize={{ minRows: 2, maxRows: 3 }}
            ></Input.TextArea>
          )}
          {doctorData?.degree?.length > 0 && (
            <div className="text-lg font-medium">Bằng cấp: </div>
          )}
          <div>
            {doctorData?.degree?.map((d) => (
              <p>{d.content}</p>
            ))}
          </div>
          {doctorData?.experience?.length > 0 && (
            <div className="text-lg font-medium">Kinh nghệm: </div>
          )}
          <div>
            {doctorData?.experience?.map((e) => (
              <p>{e.content}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailDoctor;
