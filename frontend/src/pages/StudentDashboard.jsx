import React, { useState, useEffect } from 'react';
import { getTeams, getTeamsByPhase } from '../services/api';
import Leaderboard from '../components/Leaderboard';
import Charts from '../components/Charts';

function StudentDashboard({ onLogout }) {
  const [teams, setTeams] = useState([]);
  const [phase, setPhase] = useState('all');

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

  return (
    <div>
      <div className="navbar">
        <h2>🎓 Student Dashboard</h2>
        {onLogout && <button onClick={onLogout} className="btn btn-secondary">Logout</button>}
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
        </div>

        <Leaderboard teams={teams} />
        <Charts teams={teams} phase={phase} />
      </div>
    </div>
  );
}

export default StudentDashboard;
