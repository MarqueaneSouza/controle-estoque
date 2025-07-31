import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // ajuste se a porta do backend for diferente
});

export default api;
