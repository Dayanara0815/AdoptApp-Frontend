import { useState, useEffect } from 'react';

/**
 * Hook para manejar persistencia en localStorage y simular operaciones CRUD.
 * @param {string} key - Clave bajo la cual se guardará la data en localStorage.
 * @param {Array} initialData - Datos iniciales si no hay nada en el storage.
 */
const useLocalStorage = (key, initialData = []) => {
  // Estado interno sincronizado con localStorage
  const [data, setData] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialData;
    } catch (error) {
      console.error(`Error al leer localStorage [${key}]:`, error);
      return initialData;
    }
  });

  // Guardar en localStorage cada vez que la data cambie
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error al guardar en localStorage [${key}]:`, error);
    }
  }, [key, data]);

  // --- OPERACIONES ---

  const createItem = (newItem) => {
    setData((prev) => [...prev, { ...newItem, id: newItem.id || Date.now() }]);
  };

  const updateItem = (id, updatedFields) => {
    setData((prev) => 
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteItem = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const getItemById = (id) => {
    return data.find((item) => item.id === id);
  };

  return {
    data,
    setData,
    createItem,
    updateItem,
    deleteItem,
    getItemById
  };
};

export default useLocalStorage;
