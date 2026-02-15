import React from 'react';

function Leaderboard({ teams }) {
  const sortedTeams = [...teams].sort((a, b) => {
    if (b.totalMarks !== a.totalMarks) return b.totalMarks - a.totalMarks;
    return a.teamName.localeCompare(b.teamName);
  });

  return (
    <div className="card">
      <h3 style={{ marginBottom: '20px' }}>🏆 Leaderboard</h3>
      <div className="table-responsive">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Team Name</th>
              <th>Room</th>
              <th>Phase 1</th>
              <th>Phase 2</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {sortedTeams.map((team, index) => (
              <tr key={team._id} className={index < 3 ? 'top-3' : ''}>
                <td>
                  {index === 0 && '🥇'}
                  {index === 1 && '🥈'}
                  {index === 2 && '🥉'}
                  {index > 2 && index + 1}
                </td>
                <td><strong>{team.teamName}</strong></td>
                <td>{team.room}</td>
                <td>
                  {team.phase1Marks}
                  {team.phase1Remarks && (
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                      {team.phase1Remarks}
                    </div>
                  )}
                </td>
                <td>
                  {team.phase2Marks}
                  {team.phase2Remarks && (
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                      {team.phase2Remarks}
                    </div>
                  )}
                </td>
                <td><strong style={{ fontSize: '18px', color: '#667eea' }}>{team.totalMarks}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
