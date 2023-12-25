import { jwtDecode } from "jwt-decode";
import { useRecoilState } from "recoil";
import { User } from "../stores/User/CheckUser";
import { useEffect } from "react";
import { getUser, updateImage, updateUser } from "../axios/users";
export const useUser = () => {
  const [user, setUser] = useRecoilState(User);

  useEffect(() => {
    checkUser();
  }, []);
  const checkUser = async () => {
    try {
      const access_token = JSON.parse(localStorage.getItem("access_token"));
      if (access_token) {
        const decodedToken = jwtDecode(access_token);
        if (decodedToken) {
          const { sub } = decodedToken;
          const response = await getUser(sub);
          if (response.data) {
            setUser(response.data);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { user, checkUser };
};

export const useUpload = () => {
  const [user, setUser] = useRecoilState(User);

  const uploadAvatar = async (id, data) => {
    try {
      const response = await updateImage(id, data);
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { uploadAvatar };
};

export const useUpdateUser = () => {
  const [user, setUser] = useRecoilState(User);

  const updateInforUser = async (data) => {
    try {
      const response = await updateUser(user.id, data);
      if (response.status === 200) {
        setUser(response.data);
      } else {
        console.error("Update user failed:", response);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return { user, updateInforUser };
};
