import React, { useState } from 'react';
import { AuthContext } from './authStore';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (role) => {
    setUser({ name: role === 'admin' ? 'Administrador' : 'Usuario Común', role });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
