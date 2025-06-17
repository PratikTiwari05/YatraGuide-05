import React, { useEffect, useState } from 'react';
import './ProfileCard.css';
import axios from 'axios';
import avatarImg from '../../assets/Avatar.jpg'; // adjust path based on location

const ProfileCard = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setName(res.data.username);
        setEmail(res.data.email);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
     await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/users/profile`, { name, email }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMessage('✅ Profile updated successfully');
      setEditing(false);
    } catch (err) {
      console.error(err);
      setMessage('❌ Error updating profile');
    }
  };

  return (
    <div className="profile-card">
      <div className="avatar-container">
        <img src={avatarImg}  className="avatar" />

      </div>

      <h2>👤 Profile Details</h2>

      <div className="input-group">
        <label>Name</label>
        <input
          type="text"
          value={name}
          disabled={!editing}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          disabled={!editing}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="profile-actions">
        {!editing ? (
          <button onClick={() => setEditing(true)}>✏️ Edit</button>
        ) : (
          <button onClick={handleSave}>💾 Save</button>
        )}
      </div>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ProfileCard;
