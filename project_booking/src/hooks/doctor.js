import { useRecoilState } from "recoil";
import {
  doctorState,
  doctorsState,
  doctorFilter,
} from "../stores/Doctor/ListDoctor";
import { useEffect, useState } from "react";
import {
  getDoctorss,
  getDoctorbyId,
  filterDoctor,
  createdDoctor,
  updateDoctor,
  deleteDoctor,
} from "../axios/doctors";
export const useDoctor = (name, branch, department, order, page, limit) => {
  const [doctors, setDoctors] = useRecoilState(doctorsState);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    getDoctors();
  }, [name, branch, department, order, page, limit]);

  const getDoctors = async (nameSearch, page, limit) => {
    setLoading(true);
    if (nameSearch) {
      name = nameSearch;
    }
    try {
      const response = await getDoctorss(
        name,
        branch,
        department,
        order,
        page,
        limit
      );
      setTotalCount(response.headers["x-total-count"]);
      setDoctors(response.data);

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
    totalCount,
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
export const useFilterDoctor = (id) => {
  const [doctorFilter, setDoctorFilter] = useRecoilState(doctorFilter);
  useEffect(() => {
    getDoctor();
  }, [id]);
  const getDoctor = async () => {
    setLoading(true);
    try {
      const { data } = await filterDoctor(id);
      setDoctorFilter(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return {
    doctorFilter,
    getDoctor,
    loading,
  };
};
export const useDoctorbyId = () => {
  const [doctor, setDoctor] = useRecoilState(doctorState);
  const [loading, setLoading] = useState(false);
  const createDoctor = async (data) => {
    setLoading(true);
    try {
      const { data: res } = await createdDoctor(data);
      setDoctor(res);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const deletedDoctor = async (id) => {
    setLoading(true);
    try {
      const { data: res } = await deleteDoctor(id);
      setDoctor(res);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return {
    deletedDoctor,
    createDoctor,
    loading,
    doctor,
  };
};

export const useUpdateDoctor = () => {
  const [doctor, setDoctor] = useRecoilState(doctorState);
  const [loading, setLoading] = useState(false);
  const updatedDoctor = async (id, data) => {
    setLoading(true);
    try {
      const { data: res } = await updateDoctor(id, data);
      setDoctor(res);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return {
    updatedDoctor,
    loading,
    doctor,
  };
};

export const useGetDoctorByDeparment = (id) => {
  const [doctors, setDoctor] = useRecoilState(doctorsState);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getDoctor();
  }, [id]);
  const getDoctor = async () => {
    setLoading(true);
    try {
      const response = await filterDoctor(id);
      setDoctor(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return {
    getDoctor,
    loading,
    doctors,
  };
};
