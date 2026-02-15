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
export const createTeam = (data) => API.post('/teams', data);
export const updatePhase1 = (id, data) => API.put(`/teams/${id}/phase1`, data);
export const updatePhase2 = (id, data) => API.put(`/teams/${id}/phase2`, data);
export const deleteTeam = (id) => API.delete(`/teams/${id}`);

export default API;
