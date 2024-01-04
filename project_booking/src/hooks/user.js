import { jwtDecode } from "jwt-decode";
import { useRecoilState } from "recoil";
import { User, Users } from "../stores/User/CheckUser";
import { useEffect, useState } from "react";
import {
  getUser,
  updateImage,
  updateUser,
  getUsers,
  blockUser,
  createUser,
  deleteUser,
} from "../axios/users";
import { toast } from "react-toastify";
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
export const useBlock = () => {
  const [users, setUsers] = useRecoilState(Users);

  const block = async (id, data) => {
    try {
      const response = await blockUser(id, data);
      if (response.data) {
        const updatedUsers = users.map((user) =>
          user.id === id ? { ...user, blocked: data.blocked } : user
        );
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const deletedUser = async (id) => {
    try {
      const response = await deleteUser(id);
      if (response.data) {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { block, users, deletedUser };
};

export const useUsers = (email, role, page, limit) => {
  const [users, setUsers] = useRecoilState(Users);
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    getUserss();
  }, [role, page, limit]);
  const getUserss = async () => {
    try {
      const response = await getUsers(email, role, page, limit);
      if (response.data) {
        setTotalCount(response.headers["x-total-count"]);
        setUsers(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { users, getUserss, totalCount };
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

export const useCreatedUser = () => {
  const [users, setUsers] = useRecoilState(Users);
  const createdUser = async (data) => {
    try {
      const response = await createUser(data);
      if (response.status === 201) {
        const newUser = response.data.user;
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        toast.success("Tạo tài khoản thành công!", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (err) {
      toast.error("Tạo tài khoản thất bại", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };
  return { createdUser, users };
};
