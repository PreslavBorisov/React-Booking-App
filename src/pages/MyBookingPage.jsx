import { useEffect, useState } from "react";
import api from "../api/axios";

function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const response = await api.get("/booking/me");
        setBookings(response.data);
      } catch (error) {
        console.error("Failed to load bookings", error);
      }
    };

    loadBookings();
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">My Bookings</h1>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="rounded bg-white p-4 shadow">
            <p><strong>Room ID:</strong> {booking.roomId}</p>
            <p><strong>Check-in:</strong> {booking.checkIn}</p>
            <p><strong>Check-out:</strong> {booking.checkOut}</p>
            <p><strong>Status:</strong> {booking.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookingsPage;