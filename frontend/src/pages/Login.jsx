import React, { useState } from 'react';
import { login } from '../services/api';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isStudent, setIsStudent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isStudent) {
      setTimeout(() => {
        onLogin({ role: 'student' }, null);
        setLoading(false);
      }, 500);
      return;
    }

    try {
      const { data } = await login({ email, password });
      onLogin(data.teacher, data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-spotlight"></div>
      
      <div className="login-card">
        {/* Event Logos */}
        <div className="event-logos">
          <div className="logo-section">
            <div className="logo-placeholder aadhrita-logo">
              <span className="logo-text">AADHRITA</span>
            </div>
          </div>
          <div className="logo-divider"></div>
          <div className="logo-section">
            <div className="logo-placeholder hackerrank-logo">
              <span className="logo-text">HackerRank</span>
            </div>
          </div>
        </div>

        <div className="gold-divider"></div>

        {/* Title */}
        <h1 className="login-title">
          <span className="title-main">Mentor Evaluation</span>
          <span className="title-sub">Arena</span>
        </h1>
        <p className="login-subtitle">HACK24 Judging Control Room</p>

        {/* Segmented Switch */}
        <div className="segmented-switch">
          <button 
            className={`switch-option ${!isStudent ? 'active' : ''}`}
            onClick={() => setIsStudent(false)}
            type="button"
          >
            <span className="switch-icon">👨‍🏫</span>
            Mentor Access
          </button>
          <button 
            className={`switch-option ${isStudent ? 'active' : ''}`}
            onClick={() => setIsStudent(true)}
            type="button"
          >
            <span className="switch-icon">🎓</span>
            Student View
          </button>
        </div>

        {/* Login Form */}
        {!isStudent ? (
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group-premium">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                placeholder="mentor@hack24.com"
              />
            </div>
            <div className="form-group-premium">
              <label>Access Code</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                placeholder="••••••••"
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="btn-premium-login" disabled={loading}>
              {loading ? (
                <span><span className="spinner"></span> Authenticating...</span>
              ) : (
                <span>Enter Evaluation Arena</span>
              )}
            </button>
          </form>
        ) : (
          <div className="student-access">
            <p className="access-description">
              View live hackathon results, team rankings, and evaluation scores
            </p>
            <button onClick={handleSubmit} className="btn-premium-login" disabled={loading}>
              {loading ? (
                <span><span className="spinner"></span> Loading...</span>
              ) : (
                <span>View Leaderboard</span>
              )}
            </button>
          </div>
        )}

        <div className="login-footer">
          <span className="footer-badge">🏆 HACK24</span>
          <span className="footer-text">Powered by Aadhrita × HackerRank</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
