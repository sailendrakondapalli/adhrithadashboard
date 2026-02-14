import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTeams, getTeamsByPhase } from '../services/api';
import Leaderboard from '../components/Leaderboard';
import Charts from '../components/Charts';

function StudentDashboard({ onLogout, user }) {
  const [teams, setTeams] = useState([]);
  const [phase, setPhase] = useState('all');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeams();
  }, [phase]);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const { data } = phase === 'all' ? 
        await getTeams() : 
        await getTeamsByPhase(phase);
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
        <div className="tabs">
          <button 
            className={`tab ${phase === 'all' ? 'active' : ''}`}
            onClick={() => setPhase('all')}
            disabled={loading}
          >
            All Teams
          </button>
          <button 
            className={`tab ${phase === 'Phase 1' ? 'active' : ''}`}
            onClick={() => setPhase('Phase 1')}
            disabled={loading}
          >
            Phase 1
          </button>
          <button 
            className={`tab ${phase === 'Phase 2' ? 'active' : ''}`}
            onClick={() => setPhase('Phase 2')}
            disabled={loading}
          >
            Phase 2
          </button>
          <button 
            className={`tab ${phase === 'total' ? 'active' : ''}`}
            onClick={() => setPhase('total')}
            disabled={loading}
          >
            Total Score
          </button>
        </div>

        {loading ? (
          <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div className="spinner-large"></div>
            <p style={{ marginTop: '20px', color: '#64748b' }}>Loading leaderboard...</p>
          </div>
        ) : (
          <>
            <Leaderboard teams={teams} phase={phase} />
            <Charts teams={teams} phase={phase} />
          </>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
