import React, { useState } from 'react';
import { AuthContext } from './authStore';

export const AuthProvider = ({ children }) => {
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

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
