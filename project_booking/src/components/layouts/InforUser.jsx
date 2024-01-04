import React from "react";
import { useNavigate } from "react-router-dom";

function InforUser({
  user,
  inforUser,
  loading,
  checkActive,
  handleUpload,
  handleConfirmUpload,
  checkUnderline,
}) {
  const navigate = useNavigate();
  return (
    <div className="w-full shadow-xl rounded-xl h-[27rem]">
      <div className="rounded-xl w-full h-72 p-2 flex flex-col justify-between">
        <div className="relative">
          <img
            src={inforUser.image}
            className="w-32 h-32 rounded-full mx-auto max-w-full max-h-full"
          ></img>
          {loading && <div className="absolute right-0 top-0">Đang tải...</div>}
          {checkActive ? (
            <div className={`absolute right-0 top-0 ${loading && "hidden"}`}>
              <label htmlFor="fileInput" className="cursor-pointer">
                <i className="fa-solid fa-pen-to-square"></i>
              </label>
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleUpload}
              />
            </div>
          ) : (
            <div className="absolute right-0 top-0 border rounded px-2">
              <button onClick={handleConfirmUpload}>
                <i className="fa-solid fa-upload"></i>
              </button>
            </div>
          )}
        </div>
        <div className="text-center text-2xl">{user.name}</div>
        <div
          className={`cursor-pointer ${checkUnderline ? "underline" : ""}`}
          onClick={() => {
            navigate("/profile");
          }}
        >
          Thông tin tài khoản
        </div>
        <div
          className={`cursor-pointer ${!checkUnderline ? "underline" : ""}`}
          onClick={() => {
            navigate("/history");
          }}
        >
          Lịch sử đặt lịch
        </div>
      </div>
    </div>
  );
}

export default InforUser;
