import React, { useEffect, useState } from 'react';
import './AdminTrain.css'
const AdminTrain = () => {
  const [trains, setTrains] = useState([]);
  const [newTrain, setNewTrain] = useState({
    name: '',
    from_station: '',
    to_station: '',
  });

  // Fetch all trains
  const fetchTrains = async () => {
    try {
      const res = await fetch('/api/trains');
      const data = await res.json();
      setTrains(data);
    } catch (err) {
      console.error('Error fetching trains:', err);
    }
  };

  // Add new train
  const addTrain = async () => {
    if (!newTrain.name || !newTrain.from_station || !newTrain.to_station) {
      alert('Please fill all fields');
      return;
    }

    const res = await fetch('/api/admin/trains', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTrain),
    });

    const data = await res.json();
    alert(data.message);
    setNewTrain({ name: '', from_station: '', to_station: '' });
    fetchTrains();
  };

  // Delete train
  const deleteTrain = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this train?');
    if (!confirmDelete) return;

    const res = await fetch(`/api/admin/trains/${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();
    alert(data.message);
    fetchTrains();
  };

  useEffect(() => {
    fetchTrains();
  }, []);

  return (
    <div className="homepage-container">
      <div className="center-box">
        <h2>🚆 Manage All Trains</h2>

        <h3>Add New Train</h3>
        <input
          placeholder="Train Name"
          value={newTrain.name}
          onChange={(e) => setNewTrain({ ...newTrain, name: e.target.value })}
        />
        <input
          placeholder="From Station"
          value={newTrain.from_station}
          onChange={(e) => setNewTrain({ ...newTrain, from_station: e.target.value })}
        />
        <input
          placeholder="To Station"
          value={newTrain.to_station}
          onChange={(e) => setNewTrain({ ...newTrain, to_station: e.target.value })}
        />
        <button onClick={addTrain}>➕ Add Train</button>
      </div>

      <div className="center-box" style={{ marginTop: '2rem' }}>
        <h3>📋 All Trains</h3>
        <table style={{ width: '100%', marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>From</th>
              <th>To</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {trains.map((train) => (
              <tr key={train.id}>
                <td>{train.id}</td>
                <td>{train.name}</td>
                <td>{train.from_station}</td>
                <td>{train.to_station}</td>
                <td>
                  <button
                    onClick={() => deleteTrain(train.id)}
                    style={{ backgroundColor: 'red', color: 'white' }}
                  >
                     Delete
                  </button>
                </td>
              </tr>
            ))}
            {trains.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>No trains found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTrain;
