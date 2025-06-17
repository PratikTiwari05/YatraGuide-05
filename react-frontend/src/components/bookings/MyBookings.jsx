import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyBookings.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API = import.meta.env.VITE_BACKEND_URL;

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('user_id');
      if (!token || !userId) {
        setError('User not logged in.');
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API}/api/bookings/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(response.data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to fetch bookings. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API}/api/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      toast.success('Booking cancelled successfully!');
    } catch (err) {
      console.error('Error cancelling booking:', err);
      toast.error('Failed to cancel booking');
    }
  };

  if (loading) return <p className="loading">Loading bookings...</p>;
  if (error) return <p className="error">{error}</p>;
  if (bookings.length === 0) return <p className="no-bookings">No bookings found.</p>;

  return (
    <div className="my-bookings">
      <h2>My Bookings</h2>
      {bookings.map((booking) => (
        <div key={booking.id} className="booking-card">
          <p><strong>Train:</strong> {booking.train}</p>
          <p><strong>Passenger:</strong> {booking.passenger}</p>
          <p><strong>Seat:</strong> {booking.seat}</p>
          <p><strong>Payment:</strong> {booking.payment_status}</p>
          <p><strong>Status:</strong> {booking.status}</p>
          <button onClick={() => handleCancel(booking.id)} className="cancel-button">
            Cancel Booking
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
