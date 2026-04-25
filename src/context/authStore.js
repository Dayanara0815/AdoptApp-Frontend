import { createContext, useContext } from 'react';

// 1. Creamos el contexto
export const AuthContext = createContext();

// 2. Exportamos el hook (esto no es un componente, por eso va en un .js)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
