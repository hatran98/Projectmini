import { instance } from "./config";

export const getDoctorss = () => {
  return instance.get("/doctors");
};

export const getDoctorbyId = (id) => {
  return instance.get(`/doctors/${id}`);
};

export const addDoctor = (data) => {
  return instance.post("/doctors", data);
};

export const updateDoctor = (id, data) => {
  return instance.put(`/doctors/${id}`, data);
};

export const deleteDoctor = (id) => {
  return instance.delete(`/doctors/${id}`);
};
