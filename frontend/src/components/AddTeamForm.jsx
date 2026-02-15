import React, { useState } from 'react';

function AddTeamForm({ onSubmit, loading }) {
  const [teamName, setTeamName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ teamName });
    setTeamName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Team Name</label>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
          placeholder="Enter team name"
          disabled={loading}
        />
      </div>

      <button 
        type="submit" 
        className="btn btn-primary" 
        disabled={loading}
        style={{ width: '100%' }}
      >
        {loading ? (
          <span>
            <span className="spinner"></span> Adding Team...
          </span>
        ) : (
          'Add Team'
        )}
      </button>
    </form>
  );
}

export default AddTeamForm;
