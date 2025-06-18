import React from 'react';
import './Navbar.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ user, timer = 0, onPayment = () => {}, onLogout = () => {} }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const isAdminRoute = location.pathname.startsWith('/admin') && location.pathname !== '/admin';

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  return (
    <nav className="navbar">
      <div className="logo">🚆 Yatra Guide</div>

      <div className="center-nav">
        <div className="nav-center-buttons">
          <button
            onClick={() => navigate(isAdminRoute ? '/admin-dashboard' : '/')}
            className="home-button"
          >
            🏠 Home
          </button>

          {/* ✅ About Developer Button - Always visible */}
          <button onClick={() => navigate('/about')} className="home-button">
            👨‍💻 About Developer
          </button>

          {location.pathname === '/admin' && (
            <button onClick={() => navigate('/login')} className="home-button">
              👤 User Login
            </button>
          )}

          {!isAdminRoute && user && location.pathname !== '/login' && location.pathname !== '/register' && (
            <>
              <button onClick={() => navigate('/mybookings')} className="home-button">
                📑 My Bookings
              </button>

              <button onClick={() => navigate('/coach-position')} className="home-button">
                🚉 Coach Position
              </button>
            </>
          )}

          {!isAdminRoute && user && location.pathname === '/profile' && (
            <button onClick={() => navigate('/changepassword')} className="home-button">
              🔒 Change Password
            </button>
          )}
        </div>
      </div>

      <div className="nav-actions">
        {isAdminRoute && (
          <button onClick={handleAdminLogout} className="logout-btn red">
            Logout
          </button>
        )}

        {!isAdminRoute && user && (
          <>
            <span
              className="username clickable"
              onClick={() => navigate('/profile')}
              title="Go to Profile"
            >
              👤 {user.username}
            </span>

            {timer > 0 && (
              <span className="timer-nav">
                ⏱ {formatTime(timer)}
                <button className="pay-btn" onClick={() => navigate('/dummy-payment')}>
                  Make Payment
                </button>
              </span>
            )}

            <button onClick={onLogout} className="logout-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
