import { useState } from 'react';
import { AuthContext } from './authStore';
import useLocalStorage from '../hooks/useLocalStorage';

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

  // Función para actualizar los datos del usuario en sesión y en la lista global
  const updateUser = (updatedData) => {
    // 1. Actualizar estado local
    const newUser = { ...user, ...updatedData };
    setUser(newUser);

    // 2. Actualizar sesión persistente
    localStorage.setItem('activeUser', JSON.stringify(newUser));

    // 3. Actualizar en la lista de 'usuarios' (usando el correo como identificador si no hay ID)
    // El hook useLocalStorage ya maneja IDs, pero por si acaso buscamos por correo
    const userInList = usuarios.find((u) => u.correo === user.correo);
    if (userInList && userInList.id) {
      updateItem(userInList.id, updatedData);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
