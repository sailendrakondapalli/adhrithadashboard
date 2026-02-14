import React, { useState, useEffect } from 'react';
import { getTeams, createTeam, updateTeam } from '../services/api';
import Leaderboard from '../components/Leaderboard';
import TeamForm from '../components/TeamForm';

function TeacherDashboard({ user, onLogout }) {
  const [teams, setTeams] = useState([]);
  const [editingTeam, setEditingTeam] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const { data } = await getTeams();
      setTeams(data.filter(t => t.room === user.room));
    } catch (error) {
      console.error('Error fetching teams:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      if (editingTeam) {
        await updateTeam(editingTeam._id, formData);
        setMessage('✅ Team updated successfully!');
      } else {
        await createTeam(formData);
        setMessage('✅ Team marks added successfully!');
      }
      fetchTeams();
      setEditingTeam(null);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving team:', error);
      setMessage('❌ ' + (error.response?.data?.message || 'Error saving team'));
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="navbar">
        <h2>👨‍🏫 Teacher Dashboard - {user.room}</h2>
        <button onClick={onLogout} className="btn btn-secondary">Logout</button>
      </div>
      
      <div className="container">
        {message && (
          <div className="card" style={{ 
            background: message.includes('✅') ? '#d4edda' : '#f8d7da',
            color: message.includes('✅') ? '#155724' : '#721c24',
            padding: '12px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {message}
          </div>
        )}

        <div className="card">
          <h3 style={{ marginBottom: '20px' }}>
            {editingTeam ? 'Edit Team Marks' : 'Add Team Marks'}
          </h3>
          <p style={{ marginBottom: '16px', color: '#64748b', fontSize: '14px' }}>
            💡 Tip: Enter the same team name for both Phase 1 and Phase 2. The system will automatically update if the team already exists.
          </p>
          <TeamForm 
            onSubmit={handleSubmit} 
            initialData={editingTeam}
            onCancel={() => setEditingTeam(null)}
            loading={loading}
          />
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '20px' }}>My Room Teams</h3>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div className="spinner-large"></div>
              <p style={{ marginTop: '16px', color: '#64748b' }}>Loading teams...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th>Team Name</th>
                    <th>Phase</th>
                    <th>Marks</th>
                    <th>Remarks</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>
                        No teams added yet. Add your first team above!
                      </td>
                    </tr>
                  ) : (
                    teams.map(team => (
                      <tr key={team._id}>
                        <td>{team.teamName}</td>
                        <td>{team.phase}</td>
                        <td>{team.marks}</td>
                        <td>{team.remarks}</td>
                        <td>
                          <button 
                            onClick={() => setEditingTeam(team)}
                            className="btn btn-secondary"
                            style={{ fontSize: '12px', padding: '6px 12px' }}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
