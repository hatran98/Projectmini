import { atom } from "recoil";
export const doctorsState = atom({
  key: "doctors",
  default: [],
});
export const doctorState = atom({
  key: "doctor",
  default: {},
});
export const clinicList = atom({
  key: "clinicList",
  default: [],
});

export const doctorFilter = atom({
  key: "doctorFilter",
  default: {},
});
