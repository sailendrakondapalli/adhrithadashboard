import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Charts({ teams }) {
  const sortedTeams = [...teams]
    .sort((a, b) => b.totalMarks - a.totalMarks)
    .slice(0, 10);

  const phase1Data = sortedTeams.map(t => ({
    teamName: t.teamName,
    marks: t.phase1Marks
  })).sort((a, b) => b.marks - a.marks);

  const phase2Data = sortedTeams.map(t => ({
    teamName: t.teamName,
    marks: t.phase2Marks
  })).sort((a, b) => b.marks - a.marks);

  const totalData = sortedTeams.map(t => ({
    teamName: t.teamName,
    marks: t.totalMarks
  }));

  const renderChart = (data, title, color) => (
    <div className="card" style={{ marginTop: '20px' }}>
      <h3 style={{ marginBottom: '20px' }}>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="teamName" angle={-45} textAnchor="end" height={100} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="marks" fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <>
      {renderChart(phase1Data, '📊 Phase 1 Results', '#667eea')}
      {renderChart(phase2Data, '📊 Phase 2 Results', '#764ba2')}
      {renderChart(totalData, '📊 Total Marks', '#f093fb')}
    </>
  );
}

export default Charts;
