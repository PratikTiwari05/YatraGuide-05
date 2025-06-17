import React, { useState } from 'react';
import axios from 'axios';
import './CoachPosition.css';

const CoachPosition = () => {
  const [trainNo, setTrainNo] = useState('');
  const [coachData, setCoachData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // new loading state

  const handleFetch = async () => {
    setError('');
    setCoachData(null);
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/coach-position/${trainNo}`);
      const sortedCoaches = response.data.Coaches.sort((a, b) => parseInt(a.SerialNo) - parseInt(b.SerialNo));
      setCoachData({ ...response.data, Coaches: sortedCoaches });
    } catch (err) {
      console.error(err);
      setError('❌ Failed to fetch coach position. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="coach-container">
      <h2>🚆 Get Coach Position</h2>
      <input
        type="text"
        value={trainNo}
        onChange={(e) => setTrainNo(e.target.value)}
        placeholder="Enter Train Number"
      />
      <button onClick={handleFetch}>Search</button>

      {error && <p className="error">{error}</p>}
      {loading && <p className="loading">🔄 Loading coach layout...</p>}

      {coachData && coachData.Coaches && (
        <div className="coach-results">
          <h3>Coach Layout:</h3>
          <div className="coach-list">
            {coachData.Coaches.map((coach, index) => (
              <div key={index} className="coach-box">
                {coach.Number} - {coach.Name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoachPosition;
