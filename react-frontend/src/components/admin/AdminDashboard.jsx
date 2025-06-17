import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [trains, setTrains] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [trainForm, setTrainForm] = useState({ name: '', from_station: '', to_station: '' });

  const navigate = useNavigate();

  const fetchBookings = async () => {
    const res = await fetch('/api/admin/bookings');
    const data = await res.json();
    setBookings(data);
  };

  const fetchTrains = async () => {
    const res = await fetch('/api/trains');
    const data = await res.json();
    setTrains(data);
  };

 
  const handleAddTrain = async () => {
    const res = await fetch('/api/admin/trains', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trainForm),
    });
    const data = await res.json();
    alert(data.message);
    fetchTrains();
  };

  useEffect(() => {
    fetchTrains();
    fetchBookings();
  }, []);

  return (
    <div className="admin-dashboard-container">
      <h2 className="admin-title">🛠 Admin Dashboard</h2>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h4>Total Trains</h4>
          <p className="stat-number">{trains.length}</p>
        </div>
        <div className="stat-card">
          <h4>Total Bookings</h4>
          <p className="stat-number">{bookings.length}</p>
        </div>
        <div className="stat-card">
          <h4>Active Bookings</h4>
          <p className="stat-number green">
            {bookings.filter(b => b.status === 'booked').length}
          </p>
        </div>
      </div>

      <div className="admin-sections">
        <div className="admin-box">
          <h3>Add New Train</h3>
          <input placeholder="Train Name" onChange={e => setTrainForm({ ...trainForm, name: e.target.value })} />
          <input placeholder="From Station" onChange={e => setTrainForm({ ...trainForm, from_station: e.target.value })} />
          <input placeholder="To Station" onChange={e => setTrainForm({ ...trainForm, to_station: e.target.value })} />
          <button onClick={handleAddTrain}>Add Train</button>
        </div>

        <div className="admin-box">
          <h3 className="recent-title">📄 Recent Bookings</h3>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Train ID</th>
                <th>Seat</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.slice(0, 5).map((b, i) => (
                <tr key={i}>
                  <td>{b.user_id}</td>
                  <td>{b.train_id}</td>
                  <td>{b.seat}</td>
                  <td className={b.status === 'booked' ? 'green' : 'red'}>{b.status.charAt(0).toUpperCase() + b.status.slice(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="view-buttons">
        <button onClick={() => navigate('/admin/bookings')} className="view-btn blue">📄 View All Bookings</button>
        <button onClick={() => navigate('/admin/trains')} className="view-btn green">🚆 View All Trains</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
