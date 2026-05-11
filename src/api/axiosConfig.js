import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
console.log('backend url:', BACKEND_URL);
const api = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token JWT en cada petición
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


// Interceptor para manejar respuestas globales (opcional)
api.interceptors.response.use(
  (response) => response.data, // Retornamos directamente el ApiResponse<T>
  (error) => {
    // Si el backend devuelve un error estructurado, lo propagamos
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject({
      code: '999',
      message: 'Error de conexión con el servidor',
    });
  }
);

export default api;
