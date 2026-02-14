import React from 'react';

function Leaderboard({ teams, phase }) {
  // Calculate total scores if phase is 'total'
  const processedTeams = phase === 'total' ? calculateTotalScores(teams) : teams;
  
  const sortedTeams = [...processedTeams].sort((a, b) => {
    if (b.marks !== a.marks) return b.marks - a.marks;
    return a.teamName.localeCompare(b.teamName);
  });

  function calculateTotalScores(teams) {
    const teamMap = {};
    
    teams.forEach(team => {
      if (!teamMap[team.teamName]) {
        teamMap[team.teamName] = {
          teamName: team.teamName,
          room: team.room,
          phase: 'Total',
          marks: 0,
          phase1: 0,
          phase2: 0,
          remarks: ''
        };
      }
      
      if (team.phase === 'Phase 1') {
        teamMap[team.teamName].phase1 = team.marks;
      } else if (team.phase === 'Phase 2') {
        teamMap[team.teamName].phase2 = team.marks;
      }
      
      teamMap[team.teamName].marks = teamMap[team.teamName].phase1 + teamMap[team.teamName].phase2;
    });
    
    return Object.values(teamMap);
  }

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
              <th>Phase</th>
              {phase === 'total' && (
                <>
                  <th>Phase 1</th>
                  <th>Phase 2</th>
                </>
              )}
              <th>Marks</th>
              {phase !== 'total' && <th>Remarks</th>}
            </tr>
          </thead>
          <tbody>
            {sortedTeams.map((team, index) => (
              <tr key={team._id || team.teamName} className={index < 3 ? 'top-3' : ''}>
                <td>
                  {index === 0 && '🥇'}
                  {index === 1 && '🥈'}
                  {index === 2 && '🥉'}
                  {index > 2 && index + 1}
                </td>
                <td>{team.teamName}</td>
                <td>{team.room}</td>
                <td>{team.phase}</td>
                {phase === 'total' && (
                  <>
                    <td>{team.phase1}</td>
                    <td>{team.phase2}</td>
                  </>
                )}
                <td><strong>{team.marks}</strong></td>
                {phase !== 'total' && <td>{team.remarks}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
