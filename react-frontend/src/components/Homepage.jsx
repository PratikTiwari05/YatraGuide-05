import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';
import trainBg from '../assets/vande-bhara.jpg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Homepage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [trains, setTrains] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    date: '',
    fromStation: '',
    toStation: '',
    trainId: '',
    classType: 'SL',
  });
  const [timer, setTimer] = useState(0);
  const [bookingId, setBookingId] = useState(null);

  const filteredTrains = trains.filter(
    (train) =>
      train.from_station.toLowerCase() === formData.fromStation.toLowerCase() &&
      train.to_station.toLowerCase() === formData.toStation.toLowerCase()
  );

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({
          username: payload.username,
          joined: new Date(payload.iat * 1000).toLocaleDateString(),
        });
      } catch (err) {
        console.error('Invalid token:', err);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
   fetch(`${import.meta.env.VITE_BACKEND_URL}/api/trains`)
      .then((res) => res.json())
      .then((data) => setTrains(data))
      .catch((err) => console.error('Failed to fetch trains', err));
  }, []);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (timer === 0 && bookingId) {
      alert('Time expired! Booking cancelled.');
      setBookingId(null);
      setFormData({
        name: '',
        age: '',
        date: '',
        fromStation: '',
        toStation: '',
        trainId: '',
        classType: 'SL',
      });
    }
  }, [timer, bookingId]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    const { name, age, date, fromStation, toStation, trainId, classType } = formData;

    if (!name || !age || !date || !fromStation || !toStation || !trainId) {
      alert('Please fill all fields.');
      return;
    }

    const train = trains.find((t) => t.id === parseInt(trainId));
    if (!train) {
      alert('Selected train not found!');
      return;
    }

    const bookingData = {
      trainId: train.id,
      train: train.name,
      passenger: name,
      age,
      journeyDate: date,
      fromStation,
      toStation,
      classType,
      seat: `Auto-${Math.floor(Math.random() * 100)}`,
    };

    try {
     const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(bookingData),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Booking failed');

      setBookingId(result.booking.id);
      localStorage.setItem('bookingId', result.booking.id);
      setTimer(1800);
      toast.info('Booking started. Please pay within 30 minutes.', { autoClose: 3000 });
    } catch (err) {
      alert('Booking error: ' + err.message);
    }
  };

  return (
    <div
      className="homepage-container"
      style={{ backgroundImage: `url(${trainBg})` }}
    >
      <div className="center-box">
        <h2>Book Your Journey</h2>
        <form onSubmit={handleBooking}>
          <input type="text" name="name" placeholder="Enter Passenger Name" value={formData.name} onChange={handleChange} required />
          <input type="number" name="age" placeholder="Enter Age" value={formData.age} onChange={handleChange} required />
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          <input type="text" name="fromStation" placeholder="From Station" value={formData.fromStation} onChange={handleChange} required />
          <input type="text" name="toStation" placeholder="To Station" value={formData.toStation} onChange={handleChange} required />

          <select name="classType" value={formData.classType} onChange={handleChange} required>
            <option value="SL">Sleeper (SL)</option>
            <option value="3AC">3rd AC (3AC)</option>
            <option value="2AC">2nd AC (2AC)</option>
            <option value="1AC">1st AC (1AC)</option>
          </select>

          {formData.trainId && <button type="submit">Book Now</button>}
        </form>

        <p className="timer">{timer > 0 && `⏳ Time Left: ${formatTime(timer)}`}</p>
      </div>

      {formData.fromStation && formData.toStation && (
        filteredTrains.length > 0 ? (
          <div className="train-cards-container">
            {filteredTrains.map((train) => (
              <div key={train.id} className="train-card">
                <h3>{train.name}</h3>
                <p>{train.from_station} ➡ {train.to_station}</p>
                <p>SL: {train.sl_seats} | 3AC: {train.ac3_seats} | 2AC: {train.ac2_seats} | 1AC: {train.ac1_seats}</p>
                <button onClick={() => setFormData((prev) => ({ ...prev, trainId: train.id.toString() }))}>
                  Book This Train
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-train-msg">No trains found for this route!</div>
        )
      )}

      {timer > 0 && (
        <div className="payment-section">
          <button onClick={() => navigate('/dummy-payment')}>💳 Make Payment</button>
        </div>
      )}

      <footer className="homepage-footer">
        Crafted with <span style={{ color: 'red' }}>❤️</span> by <strong style={{color:'yellow'}}>Pratik Tiwari</strong>
      </footer>
    </div>
  );
};

export default Homepage;
