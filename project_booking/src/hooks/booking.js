import { bookingState, bookingsState } from "../stores/Booking/Booking";
import { useRecoilState } from "recoil";
import {
  createBooking,
  getBookingByDoctorId,
  getBookingById,
  deleteBooking,
  updateBooking,
} from "../axios/booking";
import { useEffect, useState } from "react";
export const useBooking = (id, page, limit) => {
  useEffect(() => {
    getBookings();
  }, [id, page, limit]);
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
      const response = await getBookingById(id, page, limit);
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

  const getBookingByDoctor = async (doctorId) => {
    try {
      const response = await getBookingByDoctorId(doctorId);
      if (response.data) {
        // Thực hiện sắp xếp dữ liệu theo yêu cầu
        const sortedData = response.data.sort((a, b) => {
          // Sắp xếp theo trạng thái 'request' -> 'accept' -> 'reject'
          const statusOrder = { request: 0, accept: 1, reject: 2 };
          const statusComparison =
            statusOrder[a.status] - statusOrder[b.status];
          if (statusComparison !== 0) return statusComparison;

          // Sắp xếp theo `date-time` mới nhất
          const datetimeComparison =
            new Date(b.datetime).getTime() - new Date(a.datetime).getTime();
          if (datetimeComparison !== 0) return datetimeComparison;

          // Sắp xếp theo `timebooking` từ nhỏ đến lớn
          return a.timebooking.localeCompare(b.timebooking);
        });

        // Lưu dữ liệu đã sắp xếp vào state
        setBookings(sortedData);
      }
    } catch (error) {
      console.log("Error fetching bookings:", error);
    }
  };
  const updatedBooking = async (booking_id, status) => {
    try {
      const response = await updateBooking(booking_id, { status: status });
      if (response.status === 200) {
        setBookings(
          bookings.map((booking) =>
            booking.id === booking_id ? { ...booking, status } : booking
          )
        );
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
    getBookingByDoctor,
    updatedBooking,
  };
};
