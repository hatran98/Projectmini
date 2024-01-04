import { instance, instance_token } from "./config";
export const getUsers = (email, role, page, limit) => {
  if (email) {
    return instance.get(
      `/users?email_like=${email}&_page=${page}&_limit=${limit}`
    );
  }
  if (role) {
    return instance.get(`/users?role=${role}&_page=${page}&_limit=${limit}`);
  } else {
    return instance.get(`/users?_page=${page}&_limit=${limit}`);
  }
};

export const getUser = (id) => {
  return instance.get(`/users/${id}`);
};

export const createUser = (data) => {
  return instance.post("/users", data);
};
export const updateImage = (id, data) => {
  return instance_token.patch(`600/users/${id}`, data);
};
export const updateUser = (id, data) => {
  return instance_token.patch(`600/users/${id}`, data);
};

export const blockUser = (id, user) => {
  return instance.patch(`/users/${id}`, user);
};

export const deleteUser = (id) => {
  return instance.delete(`/users/${id}`);
};

export const loginUser = (data) => {
  return instance.post("/login", data);
};
