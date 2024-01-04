import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { toast } from "react-toastify";
import { useResetRecoilState } from "recoil";
import { User } from "../../stores/User/CheckUser";
import { useUser } from "../../hooks/user";

function Navbar() {
  const { user } = useUser();
  const resetUser = useResetRecoilState(User);

  const [isProfileVisible, setIsProfileVisible] = useState(false);

  const handleAvatarClick = () => {
    setIsProfileVisible((prev) => !prev);
  };

  return (
    <div className="sm:p-3 shadow sticky pb-2">
      <div className="flex justify-between sm:flex-row ">
        <Link to="/">
          <img
            src="https://hhg-common.hellobacsi.com/common/logo/hellobacsi.png"
            className="w-32"
          ></img>
        </Link>

        {!user.email ? (
          <div className="gap-2 flex sm:flex-row justify-between flex-col">
            <Link to="/login">
              <Button className="bg-blue-500 text-white">Đăng nhập</Button>
            </Link>
          </div>
        ) : (
          <div className="gap-3 flex sm:justify-between sm:flex-row flex-col">
            <Link to="/care/tat-ca/bac-si">
              <Button className="border-none shadow-none bg-blue-500 text-white">
                Đặt lịch với bác sĩ
              </Button>
            </Link>
            <img
              src={user.image}
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={handleAvatarClick}
            ></img>

            {isProfileVisible && (
              <div className="flex flex-col border p-2 rounded-xl shadow absolute top-16 right-0 bg-white z-10">
                {user.role === "user" && (
                  <Link to="/profile">
                    <Button className="sm:mt-[0.1rem] cursor-pointer border-none shadow-none">
                      Hồ sơ
                    </Button>
                  </Link>
                )}
                {user.role === "admin" && (
                  <Link to="/admin/dashboard">
                    <Button className="sm:mt-[0.1rem] cursor-pointer border-none shadow-none">
                      Bảng điều khiển
                    </Button>
                  </Link>
                )}
                {user.role !== "admin" && user.role !== "user" && (
                  <Link to="/admin/booking">
                    <Button className="sm:mt-[0.1rem] cursor-pointer border-none shadow-none">
                      Lịch sử người đặt
                    </Button>
                  </Link>
                )}
                <Link to="/">
                  <Button
                    className="border-none text-black shadow-none"
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
        )}
      </div>
    </div>
  );
}

export default Navbar;
