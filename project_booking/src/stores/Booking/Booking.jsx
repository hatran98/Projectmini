import { atom } from "recoil";

export const bookingState = atom({
  key: "booking",
  default: {},
});

export const bookingsState = atom({
  key: "bookings",
  default: [],
});
