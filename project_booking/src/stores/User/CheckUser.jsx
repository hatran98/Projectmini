import { atom } from "recoil";

export const User = atom({
  key: "User",
  default: {},
});

export const Users = atom({
  key: "Users",
  default: [],
});
