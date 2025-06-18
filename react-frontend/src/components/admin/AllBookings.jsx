import React, { useEffect, useState } from 'react';
import './AllBookings.css'
const AllBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/admin/bookings');
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this booking?');
    if (!confirm) return;

    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      alert(data.message);
      fetchBookings(); // Refresh
    } catch (err) {
      console.error('Error deleting:', err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="center-box">
      <h2 style={{ color: 'red' }}>📄 All Bookings</h2>
      <table style={{ width: '100%', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>User ID</th>
            <th>Train ID</th>
            <th>Seat</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.user_id}</td>
              <td>{b.train_id}</td>
              <td>{b.seat}</td>
              <td>{b.status}</td>
              <td>
                <button onClick={() => handleDelete(b.id)} style={{ backgroundColor: 'red', color: 'white' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllBookings;
