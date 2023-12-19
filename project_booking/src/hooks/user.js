import { jwtDecode } from "jwt-decode";
import { useRecoilState, useResetRecoilState } from "recoil";
import { User } from "../stores/User/CheckUser";
import { useEffect } from "react";
export const useUser = () => {
  const [user, setUser] = useRecoilState(User);
  useEffect(() => {
    checkUser();
  }, []);
  const checkUser = () => {
    try {
      const access_token = localStorage.getItem("access_token");
      const decodedToken = jwtDecode(access_token);
      setUser(decodedToken);
    } catch (error) {
      new Error(error);
    }
  };
  return { user, checkUser };
};
