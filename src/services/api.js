// Serviço de API com Axios
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.agrojusto.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptador de requisição
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptador de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Métodos de requisição
export const apiService = {
  // Propriedades
  getPropriedades: () => api.get('/propriedades'),
  getPropriedadeById: (id) => api.get(`/propriedades/${id}`),
  criarPropriedade: (data) => api.post('/propriedades', data),
  atualizarPropriedade: (id, data) => api.put(`/propriedades/${id}`, data),
  deletarPropriedade: (id) => api.delete(`/propriedades/${id}`),

  // Cálculos
  calcularAluguel: (data) => api.post('/calculos/aluguel', data),
  calcularValorTerra: (data) => api.post('/calculos/valor-terra', data),

  // Aluguéis
  getAlugueis: () => api.get('/alugueis'),
  getAluguelById: (id) => api.get(`/alugueis/${id}`),
  criarAluguel: (data) => api.post('/alugueis', data),
  atualizarAluguel: (id, data) => api.put(`/alugueis/${id}`, data),

  // Usuário
  getPerfil: () => api.get('/usuarios/perfil'),
  atualizarPerfil: (data) => api.put('/usuarios/perfil', data),
  atualizarSenha: (data) => api.post('/usuarios/alterar-senha', data),

  // Autenticação
  login: (email, senha) => api.post('/auth/login', { email, senha }),
  logout: () => api.post('/auth/logout'),
  registrar: (data) => api.post('/auth/registrar', data),
};

export default api;
