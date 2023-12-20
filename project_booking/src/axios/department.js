import { instance } from "./config";

export const getDepartments = () => {
  return instance.get("/departments");
};
