import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import MyBookings from './components/bookings/MyBookings';
import { toast } from 'react-toastify';
import DummyPayment from './components/bookings/DummyPayment';
import ProfileCard from './components/users/ProfileCard';
import ChangePassword from './components/users/changePassword';
import CoachPosition from './components/trainfeatures/CoachPosition';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLogin from'./components/admin/AdminLogin';
import AllBookings from './components/admin/AllBookings';
import AdminTrain from './components/admin/AdminTrain';
import AboutDeveloper from './components/About/about';
const App = () => {
  const [user, setUser] = useState(null);
  const [timer, setTimer] = useState(0);
  const [bookingId, setBookingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiry = payload.exp * 1000;
        if (Date.now() > expiry) {
          localStorage.removeItem('token');
          setUser(null);
        } else {
          setUser({
            id: payload.id,
            username: payload.username,
            joined: new Date(payload.iat * 1000).toLocaleDateString(),
          });
        }
      } catch (err) {
        console.error("JWT decode error:", err);
        localStorage.removeItem('token');
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [localStorage.getItem('token')]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.info('Logged out successfully');
    navigate('/login');
  };

  const handlePayment = async () => {
    if (!bookingId) return alert('No booking to pay for.');
    try {
      const res = await fetch(`http://localhost:3000/api/bookings/${bookingId}/pay`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Payment failed');
      alert('Payment successful! Ticket booked.');
      setTimer(0);
      setBookingId(null);
    } catch (err) {
      alert('Payment error: ' + err.message);
    }
  };

  if (loading) return null;

  return (
    <>
      <Navbar user={user} timer={timer} onLogout={handleLogout} onPayment={handlePayment} />
      <Routes>
        <Route path="/about" element={<AboutDeveloper />} />
        {/* 🔐 Auth Routes */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={user ? <Navigate to="/homepage" /> : <Register />} />

        {/* 👤 Protected User Routes */}
        <Route path="/homepage" element={user ? (
          <Homepage user={user} setUser={setUser} setTimer={setTimer} setBookingId={setBookingId} />
        ) : <Navigate to="/login" />} />

        <Route path="/mybookings" element={user ? <MyBookings user={user} /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <ProfileCard user={user} /> : <Navigate to="/login" />} />
        <Route path="/changepassword" element={user ? <ChangePassword /> : <Navigate to="/login" />} />

        {/* 🧑‍💼 Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={
          localStorage.getItem('adminToken') ? <AdminDashboard /> : <Navigate to="/admin" />
        } />
        <Route path="/admin/bookings" element={<AllBookings />} />
        <Route path="/admin/trains" element={<AdminTrain />} />

        {/* 🚉 General / Utility Routes */}
        <Route path="/coach-position" element={<CoachPosition />} />
        <Route path="/dummy-payment" element={<DummyPayment />} />

        {/* 🏠 Root Redirect */}
        <Route path="/" element={<Navigate to={user ? '/homepage' : '/login'} />} />

      </Routes>
    </>
  );
};

export default App;
