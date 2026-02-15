import React, { useState, useEffect } from 'react';
import { getTeams, createTeam, updatePhase1, updatePhase2, deleteTeam } from '../services/api';
import AddTeamForm from '../components/AddTeamForm';
import UpdateMarksModal from '../components/UpdateMarksModal';

function TeacherDashboard({ user, onLogout }) {
  const [teams, setTeams] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalTeam, setModalTeam] = useState(null);
  const [modalPhase, setModalPhase] = useState(null);

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

  const handleAddTeam = async (formData) => {
    try {
      setLoading(true);
      await createTeam(formData);
      setMessage('✅ Team added successfully!');
      fetchTeams();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.message || 'Error adding team'));
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateMarks = async (data) => {
    try {
      setLoading(true);
      if (modalPhase === 1) {
        await updatePhase1(modalTeam._id, data);
      } else {
        await updatePhase2(modalTeam._id, data);
      }
      setMessage(`✅ Phase ${modalPhase} marks updated successfully!`);
      fetchTeams();
      setModalTeam(null);
      setModalPhase(null);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.message || 'Error updating marks'));
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTeam = async (teamId, teamName) => {
    if (!confirm(`Are you sure you want to delete "${teamName}"?`)) return;
    
    try {
      setLoading(true);
      await deleteTeam(teamId);
      setMessage('✅ Team deleted successfully!');
      fetchTeams();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.message || 'Error deleting team'));
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
          <h3 style={{ marginBottom: '20px' }}>Add New Team</h3>
          <p style={{ marginBottom: '16px', color: '#64748b', fontSize: '14px' }}>
            💡 First add the team name. Then update Phase 1 and Phase 2 marks separately.
          </p>
          <AddTeamForm onSubmit={handleAddTeam} loading={loading} />
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
                    <th>Phase 1</th>
                    <th>Phase 2</th>
                    <th>Total</th>
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
                        <td><strong>{team.teamName}</strong></td>
                        <td>
                          {team.phase1Marks}
                          {team.phase1Remarks && <div style={{ fontSize: '12px', color: '#64748b' }}>{team.phase1Remarks}</div>}
                        </td>
                        <td>
                          {team.phase2Marks}
                          {team.phase2Remarks && <div style={{ fontSize: '12px', color: '#64748b' }}>{team.phase2Remarks}</div>}
                        </td>
                        <td><strong>{team.totalMarks}</strong></td>
                        <td>
                          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                            <button 
                              onClick={() => { setModalTeam(team); setModalPhase(1); }}
                              className="btn btn-secondary"
                              style={{ fontSize: '11px', padding: '4px 8px' }}
                            >
                              Phase 1
                            </button>
                            <button 
                              onClick={() => { setModalTeam(team); setModalPhase(2); }}
                              className="btn btn-secondary"
                              style={{ fontSize: '11px', padding: '4px 8px' }}
                            >
                              Phase 2
                            </button>
                            <button 
                              onClick={() => handleDeleteTeam(team._id, team.teamName)}
                              className="btn btn-danger"
                              style={{ fontSize: '11px', padding: '4px 8px' }}
                            >
                              Delete
                            </button>
                          </div>
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

      {modalTeam && (
        <UpdateMarksModal
          team={modalTeam}
          phase={modalPhase}
          onSubmit={handleUpdateMarks}
          onClose={() => { setModalTeam(null); setModalPhase(null); }}
          loading={loading}
        />
      )}
    </div>
  );
}

export default TeacherDashboard;
