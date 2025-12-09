import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getWorkout, updateWorkout } from '../utils/api';

function EditWorkout() {
  const { id } = useParams();
  const [date, setDate] = useState('');
  const [bodyWeight, setBodyWeight] = useState('');
  const [notes, setNotes] = useState('');
  const [exercises, setExercises] = useState([
    { exerciseName: '', weight: '', sets: '', reps: '' }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkout();
  }, []);

  const fetchWorkout = async () => {
    try {
      const response = await getWorkout(id);
      const workout = response.data;
      
      // 格式化日期为 YYYY-MM-DD
      const formattedDate = new Date(workout.date).toISOString().split('T')[0];
      
      setDate(formattedDate);
      setBodyWeight(workout.bodyWeight.toString());
      setNotes(workout.notes || '');
      setExercises(workout.exercises.map(ex => ({
        exerciseName: ex.exerciseName,
        weight: ex.weight.toString(),
        sets: ex.sets.toString(),
        reps: ex.reps.toString()
      })));
      setLoading(false);
    } catch (err) {
      setError('Failed to load workout');
      setLoading(false);
    }
  };

  const addExercise = () => {
    setExercises([...exercises, { exerciseName: '', weight: '', sets: '', reps: '' }]);
  };

  const removeExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const updateExercise = (index, field, value) => {
    const newExercises = [...exercises];
    newExercises[index][field] = value;
    setExercises(newExercises);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await updateWorkout(id, {
        date,
        bodyWeight: parseFloat(bodyWeight),
        notes,
        exercises: exercises.map(ex => ({
          exerciseName: ex.exerciseName,
          weight: parseFloat(ex.weight),
          sets: parseInt(ex.sets),
          reps: parseInt(ex.reps)
        }))
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update workout');
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Edit Workout</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Body Weight (lb):</label>
          <input
            type="number"
            step="0.1"
            value={bodyWeight}
            onChange={(e) => setBodyWeight(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Notes (optional):</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px', minHeight: '60px' }}
          />
        </div>

        <h3>Exercises</h3>
        {exercises.map((exercise, index) => (
          <div key={index} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <h4>Exercise {index + 1}</h4>
              {exercises.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExercise(index)}
                  style={{ backgroundColor: '#f44336', color: 'white', padding: '5px 10px' }}
                >
                  Remove
                </button>
              )}
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label>Exercise Name:</label>
              <input
                type="text"
                value={exercise.exerciseName}
                onChange={(e) => updateExercise(index, 'exerciseName', e.target.value)}
                required
                placeholder="e.g., Bench Press"
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              <div>
                <label>Weight (lb):</label>
                <input
                  type="number"
                  step="0.1"
                  value={exercise.weight}
                  onChange={(e) => updateExercise(index, 'weight', e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </div>

              <div>
                <label>Sets:</label>
                <input
                  type="number"
                  value={exercise.sets}
                  onChange={(e) => updateExercise(index, 'sets', e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </div>

              <div>
                <label>Reps:</label>
                <input
                  type="number"
                  value={exercise.reps}
                  onChange={(e) => updateExercise(index, 'reps', e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addExercise}
          style={{ padding: '10px 20px', marginBottom: '20px', marginRight: '10px' }}
        >
          + Add Another Exercise
        </button>

        <div>
          <button
            type="submit"
            style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', marginRight: '10px' }}
          >
            Update Workout
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            style={{ padding: '10px 20px' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditWorkout;