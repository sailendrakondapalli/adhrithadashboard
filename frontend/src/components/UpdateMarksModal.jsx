import React, { useState, useEffect } from 'react';

function UpdateMarksModal({ team, phase, onSubmit, onClose, loading }) {
  const [marks, setMarks] = useState(0);
  const [remarks, setRemarks] = useState('');

  useEffect(() => {
    if (team) {
      if (phase === 1) {
        setMarks(team.phase1Marks || 0);
        setRemarks(team.phase1Remarks || '');
      } else {
        setMarks(team.phase2Marks || 0);
        setRemarks(team.phase2Remarks || '');
      }
    }
  }, [team, phase]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ marks, remarks });
  };

  if (!team) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 style={{ marginBottom: '20px' }}>
          Update Phase {phase} - {team.teamName}
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Marks</label>
            <input
              type="number"
              value={marks}
              onChange={(e) => setMarks(Number(e.target.value))}
              required
              min="0"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Remarks</label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows="3"
              placeholder="Optional feedback"
              disabled={loading}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={loading}
              style={{ flex: '1', minWidth: '120px' }}
            >
              {loading ? (
                <span>
                  <span className="spinner"></span> Updating...
                </span>
              ) : (
                'Update Marks'
              )}
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className="btn btn-secondary"
              disabled={loading}
              style={{ flex: '1', minWidth: '120px' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateMarksModal;
