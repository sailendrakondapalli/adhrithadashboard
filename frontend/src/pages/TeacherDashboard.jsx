import React, { useState, useEffect } from 'react';
import { getTeams, createTeam, updateTeam } from '../services/api';
import Leaderboard from '../components/Leaderboard';
import TeamForm from '../components/TeamForm';

function TeacherDashboard({ user, onLogout }) {
  const [teams, setTeams] = useState([]);
  const [editingTeam, setEditingTeam] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const { data } = await getTeams();
      setTeams(data.filter(t => t.room === user.room));
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingTeam) {
        await updateTeam(editingTeam._id, formData);
      } else {
        await createTeam(formData);
      }
      fetchTeams();
      setEditingTeam(null);
    } catch (error) {
      console.error('Error saving team:', error);
    }
  };

  return (
    <div>
      <div className="navbar">
        <h2>👨‍🏫 Teacher Dashboard - {user.room}</h2>
        <button onClick={onLogout} className="btn btn-secondary">Logout</button>
      </div>
      
      <div className="container">
        <div className="card">
          <h3 style={{ marginBottom: '20px' }}>
            {editingTeam ? 'Edit Team' : 'Add New Team'}
          </h3>
          <TeamForm 
            onSubmit={handleSubmit} 
            initialData={editingTeam}
            onCancel={() => setEditingTeam(null)}
          />
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '20px' }}>My Room Teams</h3>
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
              {teams.map(team => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
