import React from "react";
import { Modal, Input, Button } from "antd";
import { formatCurrency } from "../../../helpers/FormatCurrency";
function ModalDoctor({
  title,
  isModalOpen,
  handleOk,
  handleCancel,
  doctor,
  isEdit,
  degrees,
  handleDegreeChange,
  removeDegree,
  addDegree,
  handleChange,
}) {
  return (
    <Modal
      centered
      className="h-[80vh] overflow-y-auto"
      title={title}
      width={800}
      onCancel={handleCancel}
      open={isModalOpen}
      okButtonProps={{ className: "hidden" }}
      {...(isEdit && {
        onOk: handleOk,
        okButtonProps: { className: "bg-blue-500" },
      })}
    >
      <div className="w-full">
        <img
          src={doctor.image}
          className="rounded-xl w-2/3 mx-auto h-fit"
        ></img>{" "}
      </div>
      <div className="mt-2 flex flex-col justify-between gap-3">
        <span className="input-addon">Họ và tên:</span>
        <Input
          value={doctor.name}
          disabled={!isEdit}
          onChange={handleChange}
          name="name"
        />
        {<span className="input-addon">Khoa:</span>}
        <Input value={doctor.department_id.name} disabled />
        <span className="input-addon">Chi nhánh:</span>
        <Input value={doctor.branch.name} disabled />
        <span className="input-addon">Phí khám:</span>
        <Input value={formatCurrency(doctor.price)} disabled />
        <div>
          <span>Mô tả:</span>
          <Input.TextArea
            disabled={!isEdit}
            value={doctor.description}
            autoSize={{ minRows: 3, maxRows: 4 }}
            onChange={handleChange}
            name="description"
          />
        </div>
        <div>
          <span>Bằng cấp:</span>
          {degrees?.map((degree) => (
            <div key={degree?.id} className="flex items-center mt-2">
              <Input
                disabled={!isEdit}
                className="border-none"
                value={degree?.content}
                onChange={(e) => handleDegreeChange(degree?.id, e.target.value)}
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
              {isEdit && (
                <Button
                  className="ml-2 text-red-500"
                  type="text"
                  onClick={() => removeDegree(degree?.id)}
                >
                  -
                </Button>
              )}
            </div>
          ))}
          {isEdit && (
            <Button type="text" onClick={addDegree} className="text-blue-400">
              + Thêm bằng cấp
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default ModalDoctor;
