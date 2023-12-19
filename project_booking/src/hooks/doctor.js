import { useRecoilState } from "recoil";
import { doctorState, doctorsState } from "../stores/Doctor/ListDoctor";
import { useEffect, useState } from "react";
import { getDoctorss, getDoctorbyId } from "../axios/doctors";
export const useDoctor = () => {
  const [doctors, setDoctors] = useRecoilState(doctorsState);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getDoctors();
  }, []);

  const getDoctors = async () => {
    setLoading(true);
    try {
      const { data } = await getDoctorss();
      setDoctors(data);
      setLoading(false);
    } catch (e) {
      // TODO handle erorr
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
  }, []);
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
