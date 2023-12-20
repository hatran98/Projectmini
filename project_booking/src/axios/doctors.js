import { instance } from "./config";

export const getDoctorss = () => {
  return instance.get("/doctors");
};

export const getDoctorbyId = (id) => {
  return instance.get(`/doctors/${id}`);
};

export const getDoctorbyName = (name) => {
  return instance.get(`/doctors?name_like=${name}`);
};
export const getFilterDoctorByDepartment = (department) => {
  return instance.get(`/doctors?department_id.name_like=${department}`);
};
export const getFilterDoctorByBranch = (branch) => {
  return instance.get(`/doctors?branch.name_like=${branch}`);
};
export const getFilterDoctorByNameAndDepartment = (name, department) => {
  return instance.get(
    `/doctors?name_like=${name}&department_id.name_like=${department}`
  );
};
export const getFilterDoctorByNameAndBranch = (name, branch) => {
  return instance.get(`/doctors?name_like=${name}&branch.name_like=${branch}`);
};
export const getFilterDoctorByDepartmentAndBranch = (department, branch) => {
  return instance.get(
    `/doctors?department_id.name_like=${department}&branch.name_like=${branch}`
  );
};
export const getFilterDoctorByNameAndDepartmentAndBranch = (
  name,
  department,
  branch
) => {
  return instance.get(
    `/doctors?name_like=${name}&department_id.name_like=${department}&branch.name_like=${branch}`
  );
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
