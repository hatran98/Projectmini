import { instance, instance_token } from "./config";
export const getUsers = () => {
  return instance.get("/users");
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

export const deleteUser = (id) => {
  return instance.delete(`/users/${id}`);
};

export const loginUser = (data) => {
  return instance.post("/login", data);
};
