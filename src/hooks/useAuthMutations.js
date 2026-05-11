import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { useAuth } from '../context/authStore';

export const useAuthMutations = () => {
  const { login: contextLogin, updateUser } = useAuth();

  // Mutación para iniciar sesión
  const loginMutation = useMutation({
    mutationFn: async ({ correo, contrasena }) => {
      console.log('Iniciando llamada de login para:', correo);
      const apiResponse = await authService.login(correo, contrasena);
      console.log('apiResponse recibido en login:', apiResponse);
      return apiResponse.data; // Retornamos directamente el LoginResponse ({ accessToken, user })
    },
    onSuccess: (loginData) => {
      console.log('onSuccess de login ejecutado con loginData:', loginData);
      if (!loginData) {
        throw new Error('No se recibieron datos del inicio de sesión (loginData es undefined).');
      }
      // Almacenamos el token JWT de seguridad
      localStorage.setItem('token', loginData.accessToken);
      // Actualizamos el contexto de sesión de la aplicación
      contextLogin(loginData.user);
    },
  });

  // Mutación para registrar usuario/albergue
  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      console.log('Iniciando llamada de registro para:', userData.email || userData.correo);
      const apiResponse = await authService.register(userData);
      console.log('apiResponse recibido en registro:', apiResponse);
      return apiResponse.data; // Retorna el UserResponse creado
    },
  });

  // Mutación para actualizar perfil de usuario/albergue
  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData) => {
      console.log('Iniciando llamada de actualización de perfil:', updatedData);
      return await updateUser(updatedData);
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

    // Actualizar Perfil
    updateProfile: updateProfileMutation.mutate,
    isUpdatingProfile: updateProfileMutation.isPending,
    updateProfileError: updateProfileMutation.error,
  };
};
