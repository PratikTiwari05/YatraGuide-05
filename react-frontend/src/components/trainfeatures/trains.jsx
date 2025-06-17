// src/trains/Trains.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Trains.css';

const Trains = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Trains data passed from Homepage.jsx via navigate state
  const trains = location.state?.trains || [];

  if (!trains.length) {
    return (
      <div className="trains-container">
        <h2>No trains found for your search criteria.</h2>
        <button onClick={() => navigate('/')}>Go Back to Search</button>
      </div>
    );
  }

  return (
    <div className="trains-container">
      <h2>Available Trains</h2>
      <ul className="train-list">
        {trains.map((train) => (
          <li key={train.id} className="train-card">
            <h3>{train.name}</h3>
            <p><strong>From:</strong> {train.from}</p>
            <p><strong>To:</strong> {train.to}</p>
            <p><strong>Departure:</strong> {new Date(train.departureTime).toLocaleString()}</p>
            <p><strong>Arrival:</strong> {new Date(train.arrivalTime).toLocaleString()}</p>
            <p><strong>Available Classes:</strong> {train.availableClasses.join(', ')}</p>
            <p><strong>Price:</strong> ₹{train.price}</p>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/')}>Back to Search</button>
    </div>
  );
};

export default Trains;
