import { useState } from 'react';
import { AuthContext } from './authStore';
import useLocalStorage from '../hooks/useLocalStorage';
import { authService } from '../services/authService';

export const AuthProvider = ({ children }) => {
  const { data: usuarios, updateItem } = useLocalStorage('usuarios');

  // Intentar recuperar el usuario de la sesión al cargar
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('activeUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('activeUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('activeUser');
  };

  // Función para actualizar los datos del usuario en sesión y en el backend de forma persistente
  const updateUser = async (updatedData) => {
    if (!user || !user.id) {
      throw new Error('No hay una sesión de usuario activa para actualizar.');
    }

    try {
      // 1. Invocar el backend real mediante axios
      const responseBody = await authService.updateUser(user.id, updatedData);
      
      // Obtener el objeto de usuario retornado por Spring Boot (.data de la respuesta unificada)
      const updatedUserFromDb = responseBody.data || responseBody;

      // 2. Mezclar datos para conservar tokens u otra información de la sesión local
      const newUser = { ...user, ...updatedUserFromDb };
      
      // 3. Persistir en el estado reactivo del contexto y en el almacenamiento de sesión
      setUser(newUser);
      localStorage.setItem('activeUser', JSON.stringify(newUser));

      // 4. (Opcional) Sincronizar también la lista local de pruebas de usuarios
      const userInList = usuarios.find((u) => u.correo === user.correo);
      if (userInList && userInList.id) {
        updateItem(userInList.id, updatedData);
      }

      return newUser;
    } catch (error) {
      console.error('Error al actualizar el perfil en la base de datos:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
