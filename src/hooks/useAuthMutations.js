import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { useAuth } from '../context/authStore';

export const useAuthMutations = () => {
  const { login: contextLogin } = useAuth();

  // Mutación para iniciar sesión
  const loginMutation = useMutation({
    mutationFn: async ({ correo, contrasena }) => {
      const apiResponse = await authService.login(correo, contrasena);
      return apiResponse.data; // Retornamos directamente el LoginResponse ({ accessToken, user })
    },
    onSuccess: (loginData) => {
      // Almacenamos el token JWT de seguridad
      localStorage.setItem('token', loginData.accessToken);
      // Actualizamos el contexto de sesión de la aplicación
      contextLogin(loginData.user);
    },
  });

  // Mutación para registrar usuario/albergue
  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const apiResponse = await authService.register(userData);
      return apiResponse.data; // Retorna el UserResponse creado
    },
  });

  return {
    // Iniciar Sesión
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    // Registrar Cuenta
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
  };
};
