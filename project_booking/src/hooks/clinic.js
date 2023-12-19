import { useRecoilState } from "recoil";
import { clinicList } from "../stores/Doctor/ListDoctor";
import axios from "axios";
import { useEffect } from "react";
import { getClinics } from "../axios/clinics";
export const useClinic = () => {
  const [clinic, setClinic] = useRecoilState(clinicList);
  useEffect(() => {
    getClinic();
  }, []);
  const getClinic = async () => {
    await getClinics()
      .then((res) => {
        setClinic(res.data);
      })
      .catch((err) => console.log(err));
  };
  return { clinic, getClinic };
};
