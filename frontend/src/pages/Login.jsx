import React, { useState } from 'react';
import { login } from '../services/api';

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
    <div className="container" style={{ maxWidth: '400px', marginTop: '100px' }}>
      <div className="card">
        <h1 style={{ marginBottom: '24px', textAlign: 'center', color: '#667eea' }}>
          🏆 Hackathon Dashboard
        </h1>
        
        <div className="tabs" style={{ justifyContent: 'center' }}>
          <button 
            className={`tab ${!isStudent ? 'active' : ''}`}
            onClick={() => setIsStudent(false)}
            type="button"
          >
            Teacher Login
          </button>
          <button 
            className={`tab ${isStudent ? 'active' : ''}`}
            onClick={() => setIsStudent(true)}
            type="button"
          >
            Student View
          </button>
        </div>

        {!isStudent ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? (
                <span>
                  <span className="spinner"></span> Logging in...
                </span>
              ) : (
                'Login as Teacher'
              )}
            </button>
          </form>
        ) : (
          <div>
            <p style={{ textAlign: 'center', marginBottom: '16px', color: '#64748b' }}>
              View hackathon results and leaderboard
            </p>
            <button 
              onClick={handleSubmit} 
              className="btn btn-primary" 
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? (
                <span>
                  <span className="spinner"></span> Loading...
                </span>
              ) : (
                'Enter as Student'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
