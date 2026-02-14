import React, { useState, useEffect } from 'react';

function TeamForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    teamName: '',
    phase: 'Phase 1',
    marks: 0,
    remarks: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        teamName: initialData.teamName,
        phase: initialData.phase,
        marks: initialData.marks,
        remarks: initialData.remarks
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ teamName: '', phase: 'Phase 1', marks: 0, remarks: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Team Name</label>
        <input
          type="text"
          value={formData.teamName}
          onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
          required
          disabled={!!initialData}
        />
      </div>
      
      <div className="form-group">
        <label>Phase</label>
        <select
          value={formData.phase}
          onChange={(e) => setFormData({ ...formData, phase: e.target.value })}
          disabled={!!initialData}
        >
          <option value="Phase 1">Phase 1</option>
          <option value="Phase 2">Phase 2</option>
        </select>
      </div>

      <div className="form-group">
        <label>Marks</label>
        <input
          type="number"
          value={formData.marks}
          onChange={(e) => setFormData({ ...formData, marks: Number(e.target.value) })}
          required
          min="0"
        />
      </div>

      <div className="form-group">
        <label>Remarks</label>
        <textarea
          value={formData.remarks}
          onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
          rows="3"
        />
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Update' : 'Add'} Team
        </button>
        {initialData && (
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TeamForm;
