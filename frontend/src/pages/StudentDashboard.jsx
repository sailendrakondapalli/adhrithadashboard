import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTeams, getTeamsByPhase } from '../services/api';
import Leaderboard from '../components/Leaderboard';
import Charts from '../components/Charts';

function StudentDashboard({ onLogout, user }) {
  const [teams, setTeams] = useState([]);
  const [phase, setPhase] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeams();
  }, [phase]);

  const fetchTeams = async () => {
    try {
      const { data } = phase === 'all' ? 
        await getTeams() : 
        await getTeamsByPhase(phase);
      setTeams(data);
    } catch (error) {
      console.error('Error fetching teams:', error);
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
          >
            All Teams
          </button>
          <button 
            className={`tab ${phase === 'Phase 1' ? 'active' : ''}`}
            onClick={() => setPhase('Phase 1')}
          >
            Phase 1
          </button>
          <button 
            className={`tab ${phase === 'Phase 2' ? 'active' : ''}`}
            onClick={() => setPhase('Phase 2')}
          >
            Phase 2
          </button>
          <button 
            className={`tab ${phase === 'total' ? 'active' : ''}`}
            onClick={() => setPhase('total')}
          >
            Total Score
          </button>
        </div>

        <Leaderboard teams={teams} phase={phase} />
        <Charts teams={teams} phase={phase} />
      </div>
    </div>
  );
}

export default StudentDashboard;
