import { atom } from "recoil";

export const User = atom({
  key: "User",
  default: {
    id: null,
    email: null,
  },
});
