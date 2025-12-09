import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWorkouts, deleteWorkout } from '../utils/api';

function Dashboard() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await getWorkouts();
      setWorkouts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch workouts');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        await deleteWorkout(id);
        setWorkouts(workouts.filter(w => w.id !== id));
      } catch (err) {
        alert('Failed to delete workout');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <h1>Fitness Tracker</h1>
        <div>
          <span style={{ marginRight: '20px' }}>Welcome, {user.name}!</span>
          <button onClick={handleLogout} style={{ padding: '8px 15px' }}>
            Logout
          </button>
        </div>
      </div>

      {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}

      <button
        onClick={() => navigate('/add-workout')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        + Add New Workout
      </button>

      <h2>Your Workouts</h2>

      {workouts.length === 0 ? (
        <p>No workouts yet. Add your first workout!</p>
      ) : (
        <div>
          {workouts.map((workout) => (
            <div
              key={workout.id}
              style={{
                border: '1px solid #ddd',
                padding: '15px',
                marginBottom: '15px',
                borderRadius: '5px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h3>{new Date(workout.date).toLocaleDateString()}</h3>
                  <p><strong>Body Weight:</strong> {workout.bodyWeight} lb</p>
                  {workout.notes && <p><strong>Notes:</strong> {workout.notes}</p>}
                  
                  <div style={{ marginTop: '10px' }}>
                    <strong>Exercises:</strong>
                    <ul>
                      {workout.exercises.map((ex) => (
                        <li key={ex.id}>
                          {ex.exerciseName}: {ex.weight} lb × {ex.sets} sets × {ex.reps} reps
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <button
                    onClick={() => navigate(`/edit-workout/${workout.id}`)}
                    style={{ padding: '5px 10px', marginRight: '10px' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(workout.id)}
                    style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;