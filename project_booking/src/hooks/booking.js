import { bookingState, bookingsState } from "../stores/Booking/Booking";
import { useRecoilState } from "recoil";
import {
  createBooking,
  getBooking,
  getBookingById,
  deleteBooking,
} from "../axios/booking";
import { useEffect, useState } from "react";
export const useBooking = (id, page) => {
  useEffect(() => {
    getBookings();
  }, [id, page]);
  const [bookings, setBookings] = useRecoilState(bookingsState);
  const [totalCount, setTotalCount] = useState();
  const [inforBooking, setInforBooking] = useRecoilState(bookingState);
  const createdBooking = async (booking) => {
    try {
      const response = await createBooking(booking);
      if (response.data) {
        setInforBooking(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBookings = async () => {
    try {
      const response = await getBookingById(id, page);
      setTotalCount(response.headers["x-total-count"]);
      if (response.data) {
        setBookings(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteBookings = async (booking_id) => {
    try {
      const response = await deleteBooking(booking_id);
      if (response.status === 200) {
        getBookings();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    createdBooking,
    inforBooking,
    getBookings,
    bookings,
    totalCount,
    deleteBookings,
  };
};
