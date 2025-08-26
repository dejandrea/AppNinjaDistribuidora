import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    // baseURL: 'http://localhost:5000',
});

export const loginUsuario = async (email, senha) => {
  const response = await api.post('/usuarios/login', { email, senha });
  return response.data;
};

export default api;
