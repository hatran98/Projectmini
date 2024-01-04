import { instance_token } from "./config";

export const createBooking = (booking) => {
  return instance_token.post("/bookings", booking);
};

export const getBooking = () => {
  return instance_token.get("/bookings");
};

export const getBookingById = (id, page, limit) => {
  return instance_token.get(
    `/bookings?user_id=${id}&_page=${page}&_limit=${limit}`
  );
};

export const updateBooking = (id, status) => {
  return instance_token.patch(`/bookings/${id}`, status);
};

export const deleteBooking = (id) => {
  return instance_token.delete(`/bookings/${id}`);
};

export const getBookingByUserId = (id) => {
  return instance_token.get(`/bookings?user_id=${id}`);
};

export const getBookingByDoctorId = (id, page, limit) => {
  return instance_token.get(
    `/bookings?doctor_id=${id}&_page=${page}}&_limit=${limit}`
  );
};
