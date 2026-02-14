import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api'
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (credentials) => API.post('/auth/login', credentials);
export const getTeams = () => API.get('/teams');
export const getTeamsByPhase = (phase) => API.get(`/teams/phase/${phase}`);
export const createTeam = (data) => API.post('/teams', data);
export const updateTeam = (id, data) => API.put(`/teams/${id}`, data);

export default API;
