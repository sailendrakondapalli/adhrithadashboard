import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTeams } from '../services/api';
import Leaderboard from '../components/Leaderboard';
import Charts from '../components/Charts';

function StudentDashboard({ onLogout, user }) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const { data } = await getTeams();
      setTeams(data);
    } catch (error) {
      console.error('Error fetching teams:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  return (
    <div>
      <div className="navbar">
        <h2>🎓 Student Dashboard</h2>
        <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
      </div>
      
      <div className="container">
        {loading ? (
          <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div className="spinner-large"></div>
            <p style={{ marginTop: '20px', color: '#64748b' }}>Loading leaderboard...</p>
          </div>
        ) : (
          <>
            <Leaderboard teams={teams} />
            <Charts teams={teams} />
          </>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
