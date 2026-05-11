import { createContext, useContext, useCallback } from 'react';
import { useAuth } from './authStore';

export const SessionContext = createContext();

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession debe utilizarse dentro de un SessionProvider');
  }
  return context;
};

export const SessionProvider = ({ children }) => {
  const { user, updateUser } = useAuth();

  const updateSession = useCallback(async (updatedData) => {
    return await updateUser(updatedData);
  }, [updateUser]);

  return (
    <SessionContext.Provider value={{ session: user, updateSession }}>
      {children}
    </SessionContext.Provider>
  );
};
