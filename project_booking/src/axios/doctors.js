import { instance } from "./config";

export const getDoctorss = (name, branch, department, order, page, limit) => {
  if (!name && !branch && !department && !order) {
    return instance.get(`/doctors?_page=${page}&_limit=${limit}`);
  }

  if (!name) {
    name = "";
  }
  if (!branch) {
    branch = "";
  }
  if (!department) {
    department = "";
  }
  if (!order) {
    order = "";
  }
  return instance.get(
    `/doctors?name_like=${name}&branch.name_like=${branch}&department_id.name_like=${department}&_sort=price&_order=${order}&_page=${page}&_limit=${limit}`
  );
};

export const getDoctorbyId = (id) => {
  return instance.get(`/doctors/${id}`);
};

export const filterDoctor = (id) => {
  return instance.get(`/doctors?department_id.id=${id}`);
};

export const createdDoctor = (data) => {
  return instance.post(`/doctors`, data);
};
export const updateDoctor = (id, data) => {
  return instance.put(`/doctors/${id}`, data);
};

export const deleteDoctor = (id) => {
  return instance.delete(`/doctors/${id}`);
};
