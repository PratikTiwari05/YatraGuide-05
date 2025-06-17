// src/pages/Login.jsx

import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import './LoginRegister.css';
import trainBg from '../../assets/trainset.avif';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });


      let data = {};
      try {
        data = await res.json(); // in case backend fails
      } catch (e) {
        console.error("Invalid JSON response");
      }

      if (!res.ok) {
        toast.error(data.message || 'Login failed!');
        return;
      }

      toast.success('Login successful!');
      const payload = JSON.parse(atob(data.token.split('.')[1]));

      localStorage.setItem('token', data.token);
      localStorage.setItem('user_id', payload.id);
      setUser({
        username: payload.username,
        joined: new Date(payload.iat * 1000).toLocaleDateString(),
      });

      navigate('/homepage');
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Server error. Please try again.');
    }
  };

  return (
    <div
      className="homepage-container"
      style={{
        backgroundImage: `url(${trainBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <button
        onClick={() => navigate('/admin')}
        style={{
          position: 'absolute',
          top: '20px',
          right: '30px',
          backgroundColor: '#007bff',
          color: 'white',
          padding: '10px 18px',
          borderRadius: '8px',
          fontWeight: '600',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          zIndex: 1000,
        }}
      >
        Admin Login
      </button>

      <div className="login-form-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>
          New user? <Link to="/register">Register here</Link>
        </p>
      </div>

      <footer className="homepage-footer">
        Crafted with <span style={{ color: 'red' }}>❤️</span> by <strong style={{ color: 'yellow' }}>Pratik Tiwari</strong>
      </footer>
    </div>
  );
}

export default Login;
