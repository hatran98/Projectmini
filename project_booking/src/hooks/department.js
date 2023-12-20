import { useRecoilState } from "recoil";
import { departmentState } from "../stores/Department/Listdepartment";
import { getDepartments } from "../axios/department";
import { useEffect } from "react";
export const useDepartment = () => {
  const [department, setDepartment] = useRecoilState(departmentState);
  useEffect(() => {
    getDepartmentss();
  }, []);
  const getDepartmentss = async () => {
    try {
      const response = await getDepartments();
      if (response.data) {
        setDepartment(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { department, getDepartmentss };
};
