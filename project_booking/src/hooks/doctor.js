import { useRecoilState } from "recoil";
import { doctorState, doctorsState } from "../stores/Doctor/ListDoctor";
import { useEffect, useState } from "react";
import {
  getDoctorss,
  getDoctorbyId,
  getDoctorbyName,
  getFilterDoctorByDepartment,
  getFilterDoctorByBranch,
  getFilterDoctorByDepartmentAndBranch,
  getFilterDoctorByNameAndBranch,
  getFilterDoctorByNameAndDepartment,
  getFilterDoctorByNameAndDepartmentAndBranch,
} from "../axios/doctors";
export const useDoctor = (name, branch, department) => {
  const [doctors, setDoctors] = useRecoilState(doctorsState);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (name && branch && department) {
      getDoctorByNameAndDepartmentAndBranch();
      return;
    }
    if (name && branch) {
      getDoctorByNameAndBranch();
      return;
    }
    if (name && department) {
      getDoctorByNameAndDepartment();
      return;
    }
    if (branch && department) {
      getDoctorByBranchAndDepartment();
      return;
    }
    if (branch) {
      getDoctorByBranch();
      return;
    }

    if (department) {
      getDoctorByDepartment();
      return;
    }

    if (name) {
      getDoctorsByName();
      return;
    } else {
      getDoctors();
      return;
    }
  }, [name, branch, department]);

  const getDoctorByDepartment = async () => {
    setLoading(true);
    try {
      const { data } = await getFilterDoctorByDepartment(department);
      setDoctors(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const getDoctorByBranch = async () => {
    setLoading(true);
    try {
      const { data } = await getFilterDoctorByBranch(branch);
      setDoctors(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const getDoctorByBranchAndDepartment = async () => {
    setLoading(true);
    try {
      const { data } = await getFilterDoctorByDepartmentAndBranch(
        department,
        branch
      );
      setDoctors(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const getDoctorByNameAndBranch = async () => {
    setLoading(true);
    try {
      const { data } = await getFilterDoctorByNameAndBranch(name, branch);
      setDoctors(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const getDoctorByNameAndDepartment = async () => {
    setLoading(true);
    try {
      const { data } = await getFilterDoctorByNameAndDepartment(
        name,
        department
      );
      setDoctors(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const getDoctorByNameAndDepartmentAndBranch = async () => {
    setLoading(true);
    try {
      const { data } = await getFilterDoctorByNameAndDepartmentAndBranch(
        name,
        department,
        branch
      );
      setDoctors(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  const getDoctorsByName = async () => {
    setLoading(true);
    try {
      const { data } = await getDoctorbyName(name);
      setDoctors(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  const getDoctors = async () => {
    setLoading(true);
    try {
      const { data } = await getDoctorss();
      setDoctors(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return {
    loading,
    doctors,
    getDoctors,
    getDoctorsByName,
  };
};

export const useDoctorById = (id) => {
  const [doctor, setDoctor] = useRecoilState(doctorState);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getDoctor();
  }, [id]);
  const getDoctor = async () => {
    setLoading(true);
    try {
      const { data } = await getDoctorbyId(id);
      setDoctor(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return {
    loading,
    doctor,
    getDoctor,
  };
};
