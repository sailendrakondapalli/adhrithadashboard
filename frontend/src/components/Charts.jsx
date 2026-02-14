import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Charts({ teams, phase }) {
  const phase1Teams = teams
    .filter(t => t.phase === 'Phase 1')
    .sort((a, b) => b.marks - a.marks)
    .slice(0, 10);

  const phase2Teams = teams
    .filter(t => t.phase === 'Phase 2')
    .sort((a, b) => b.marks - a.marks)
    .slice(0, 10);

  const renderChart = (data, title) => (
    <div className="card" style={{ marginTop: '20px' }}>
      <h3 style={{ marginBottom: '20px' }}>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="teamName" angle={-45} textAnchor="end" height={100} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="marks" fill="#667eea" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  if (phase === 'Phase 1') {
    return renderChart(phase1Teams, '📊 Phase 1 Results');
  }

  if (phase === 'Phase 2') {
    return renderChart(phase2Teams, '📊 Phase 2 Results');
  }

  return (
    <>
      {phase1Teams.length > 0 && renderChart(phase1Teams, '📊 Phase 1 Results')}
      {phase2Teams.length > 0 && renderChart(phase2Teams, '📊 Phase 2 Results')}
    </>
  );
}

export default Charts;
