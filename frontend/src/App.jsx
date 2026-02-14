import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          user ? <Navigate to={user.role === 'teacher' ? '/teacher' : '/student'} /> : 
          <Login onLogin={handleLogin} />
        } />
        <Route path="/teacher" element={
          user?.role === 'teacher' ? 
          <TeacherDashboard user={user} onLogout={handleLogout} /> : 
          <Navigate to="/login" />
        } />
        <Route path="/student" element={<StudentDashboard onLogout={handleLogout} />} />
        <Route path="/" element={<Navigate to="/student" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
