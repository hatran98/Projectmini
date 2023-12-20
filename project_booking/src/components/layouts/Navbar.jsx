import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { toast } from "react-toastify";
import { useResetRecoilState } from "recoil";
import { User } from "../../stores/User/CheckUser";
import { useUser } from "../../hooks/user";
function Navbar() {
  const { user } = useUser();
  const resetUser = useResetRecoilState(User);
  return (
    <div className="p-3 shadow sticky">
      <div className="flex justify-between flex-col sm:flex-row">
        <Link to="/">
          <img
            src="https://hhg-common.hellobacsi.com/common/logo/hellobacsi.png"
            className="w-32"
          ></img>
        </Link>

        {!user.email ? (
          <div className="gap-2 flex sm:flex-row justify-between">
            <Link to="/login">
              <Button className="border-none">Đặt lịch với bác sĩ</Button>
            </Link>
            <Link to="/login">
              <Button className="bg-blue-500 text-white">Đăng nhập</Button>
            </Link>
          </div>
        ) : (
          <div className="sm:gap-3 flex flex-col sm:flex-row">
            <Link to="/login">
              <Button className="border-none">Đặt lịch với bác sĩ</Button>
            </Link>
            <p className="sm:mt-[0.1rem]">{user.email}</p>
            <Link to="/">
              <Button
                className="bg-blue-500 text-white"
                onClick={() => {
                  resetUser();
                  localStorage.removeItem("access_token");
                  toast.success("Đăng xuất thành công");
                }}
              >
                Đăng xuất
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
