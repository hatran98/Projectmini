import { instance } from "./config";

export const getClinics = () => {
  return instance.get("/clinics");
};

export const getClinic = (id) => {
  return instance.get(`/clinics/${id}`);
};

export const createClinic = (data) => {
  return instance.post("/clinics", data);
};

export const updateClinic = (id, data) => {
  return instance.put(`/clinics/${id}`, data);
};

export const deleteClinic = (id) => {
  return instance.delete(`/clinics/${id}`);
};
