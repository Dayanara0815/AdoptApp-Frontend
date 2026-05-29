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
    // Definimos las rutas que no requieren autenticación (públicas)
    const publicPaths = ['/users/login', '/users/register'];
    const isPublicPath = publicPaths.some(path => config.url && config.url.endsWith(path));

    if (!isPublicPath) {
      const token = localStorage.getItem('token');
      if (token && token !== 'null' && token !== 'undefined') {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Interceptor para manejar respuestas globales
api.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (data && typeof data === 'object' && 'code' in data) {
      // Si el código no es éxito ("000" o "200"), lo rechazamos como error de negocio
      if (data.code !== '000' && data.code !== '0000' && data.code !== '200') {
        return Promise.reject({
          code: data.code,
          message: data.message || 'Error en la operación del servidor',
        });
      }
    }
    return response.data; // Retornamos directamente el ApiResponse<T>
  },
  (error) => {
    // Si el backend devuelve un error estructurado en el cuerpo, lo propagamos
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
