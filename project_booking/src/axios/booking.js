import { instance_token } from "./config";

export const createBooking = (booking) => {
  return instance_token.post("/bookings", booking);
};

export const getBooking = () => {
  return instance_token.get("/bookings");
};

export const getBookingById = (id, page) => {
  return instance_token.get(`/bookings?user_id=${id}&_page=${page}&_limit=4`);
};

export const updateBooking = (id, data) => {
  return instance_token.patch(`/bookings/${id}`, data);
};

export const deleteBooking = (id) => {
  return instance_token.delete(`/bookings/${id}`);
};

export const getBookingByUserId = (id) => {
  return instance_token.get(`/bookings?user_id=${id}`);
};
