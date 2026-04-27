import { useState, useEffect, useCallback } from 'react';

/**
 * Hook para manejar persistencia en localStorage y simular operaciones CRUD.
 * Esta versión lee directamente de localStorage antes de escribir para evitar
 * problemas con estados obsoletos en componentes que se montan/desmontan rápido.
 * 
 * @param {string} key - Clave bajo la cual se guardará la data en localStorage.
 * @param {Array} initialData - Datos iniciales si no hay nada en el storage.
 */
const useLocalStorage = (key, initialData = []) => {
  // 1. Estado interno inicializado desde localStorage
  const [data, setData] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialData;
    } catch (error) {
      console.error(`Error al leer localStorage [${key}]:`, error);
      return initialData;
    }
  });

  // 2. Escuchar cambios de localStorage desde otras instancias/pestañas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key) {
        try {
          const newValue = e.newValue ? JSON.parse(e.newValue) : initialData;
          setData(newValue);
        } catch (error) {
          console.error(`Error al sincronizar localStorage [${key}]:`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialData]);

  /**
   * Función para actualizar tanto el estado como el localStorage.
   */
  const setValue = useCallback((value) => {
    try {
      // Leemos lo más reciente de localStorage antes de decidir qué guardar
      const currentStored = window.localStorage.getItem(key);
      const prevValue = currentStored ? JSON.parse(currentStored) : initialData;
      
      const valueToStore = value instanceof Function ? value(prevValue) : value;
      
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setData(valueToStore);
    } catch (error) {
      console.error(`Error al guardar en localStorage [${key}]:`, error);
    }
  }, [key, initialData]);

  // --- OPERACIONES CRUD (Leen de localStorage para máxima seguridad) ---

  const createItem = useCallback((newItem) => {
    try {
      const itemWithId = { ...newItem, id: newItem.id || Date.now() };
      
      const current = JSON.parse(window.localStorage.getItem(key) || JSON.stringify(initialData));
      const updated = [...current, itemWithId];
      
      window.localStorage.setItem(key, JSON.stringify(updated));
      setData(updated);
    } catch (error) {
      console.error(`Error al crear item en [${key}]:`, error);
    }
  }, [key, initialData]);

  const updateItem = useCallback((id, updatedFields) => {
    try {
      const current = JSON.parse(window.localStorage.getItem(key) || JSON.stringify(initialData));
      const updated = current.map((item) =>
        item.id === id ? { ...item, ...updatedFields } : item
      );
      
      window.localStorage.setItem(key, JSON.stringify(updated));
      setData(updated);
    } catch (error) {
      console.error(`Error al actualizar item en [${key}]:`, error);
    }
  }, [key, initialData]);

  const deleteItem = useCallback((id) => {
    try {
      const current = JSON.parse(window.localStorage.getItem(key) || JSON.stringify(initialData));
      const updated = current.filter((item) => item.id !== id);
      
      window.localStorage.setItem(key, JSON.stringify(updated));
      setData(updated);
    } catch (error) {
      console.error(`Error al eliminar item en [${key}]:`, error);
    }
  }, [key, initialData]);

  const getItemById = useCallback((id) => {
    // Para lectura puntual, usamos el estado actual
    return data.find((item) => item.id === id);
  }, [data]);

  return {
    data,
    setData: setValue,
    createItem,
    updateItem,
    deleteItem,
    getItemById
  };
};

export default useLocalStorage;
