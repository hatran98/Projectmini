import { useRecoilState } from "recoil";
import {
  doctorState,
  doctorsState,
  doctorFilter,
} from "../stores/Doctor/ListDoctor";
import { useEffect, useState } from "react";
import { getDoctorss, getDoctorbyId, filterDoctor } from "../axios/doctors";
export const useDoctor = (name, branch, department, order) => {
  const [doctors, setDoctors] = useRecoilState(doctorsState);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getDoctors();
  }, [name, branch, department, order]);

  const getDoctors = async () => {
    setLoading(true);
    try {
      const { data } = await getDoctorss(name, branch, department, order);
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
