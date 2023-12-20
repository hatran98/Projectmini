import { instance } from "./config";

export const getBranchs = () => {
  return instance.get("/branch");
};
