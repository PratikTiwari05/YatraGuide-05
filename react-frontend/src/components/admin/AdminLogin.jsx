// src/pages/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import trainBg from '../../assets/vande-bhara.jpg';
import { toast } from 'react-toastify';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, secret:secretKey })
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Invalid admin user');
        return;
      }

      localStorage.setItem('adminToken', data.token);
      toast.success('Admin logged in successfully!');
      navigate('/admin-dashboard');
    } catch (err) {
      toast.error('Server error!');
    }
  };

  return (
    <div
      className="homepage-container"
      style={{
        backgroundImage: `url(${trainBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <div className="center-box">
        <h2 >Admin Login</h2>
        <form onSubmit={handleAdminLogin}>
          <input
            type="text"
            placeholder="Admin Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Secret Key"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
