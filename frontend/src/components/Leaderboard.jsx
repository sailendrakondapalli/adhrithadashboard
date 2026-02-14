import React from 'react';

function Leaderboard({ teams }) {
  const sortedTeams = [...teams].sort((a, b) => {
    if (b.marks !== a.marks) return b.marks - a.marks;
    return a.teamName.localeCompare(b.teamName);
  });

  return (
    <div className="card">
      <h3 style={{ marginBottom: '20px' }}>🏆 Leaderboard</h3>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team Name</th>
            <th>Room</th>
            <th>Phase</th>
            <th>Marks</th>
            <th>Remarks</th>
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
              <td>{team.teamName}</td>
              <td>{team.room}</td>
              <td>{team.phase}</td>
              <td><strong>{team.marks}</strong></td>
              <td>{team.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
