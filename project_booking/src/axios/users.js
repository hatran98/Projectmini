import { instance } from "./config";

export const getUsers = () => {
  return instance.get("/users");
};

export const getUser = (id) => {
  return instance.get(`/users/${id}`);
};

export const createUser = (data) => {
  return instance.post("/users", data);
};

export const updateUser = (id, data) => {
  return instance.put(`/users/${id}`, data);
};

export const deleteUser = (id) => {
  return instance.delete(`/users/${id}`);
};

export const loginUser = (data) => {
  return instance.post("/login", data);
};
