import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { petService } from '../services/petService';
import { useToast } from '../context/ToastContext';

export const usePets = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  // Query para obtener todas las mascotas (excluyendo DELETED)
  const petsQuery = useQuery({
    queryKey: ['pets'],
    queryFn: async () => {
      const response = await petService.getAllPets();
      return response.data;
    },
    select: (data) => (data ?? []).filter((pet) => pet.status !== 'DELETED'),
  });

  // Mutation para crear una mascota
  const createPetMutation = useMutation({
    mutationFn: petService.createPet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] });
      showToast('🐾 Mascota registrada en el catálogo exitosamente.', 'success');
    },
    onError: (error) => {
      showToast(error?.message || 'Error al registrar la mascota.', 'error');
    },
  });

  // Mutation para actualizar una mascota (maneja tanto actualización normal como soft delete)
  const updatePetMutation = useMutation({
    mutationFn: ({ id, data }) => petService.updatePet(id, data),
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: ['pets'] });
      if (variables.data?.status === 'DELETED') {
        showToast('🗑️ Mascota retirada del catálogo.', 'warning');
      } else {
        showToast('🐾 Mascota actualizada correctamente.', 'success');
      }
    },
    onError: (error) => {
      showToast(error?.message || 'Error al actualizar la mascota.', 'error');
    },
  });

  // Mutation para eliminar físicamente una mascota (se mantiene por retrocompatibilidad)
  const deletePetMutation = useMutation({
    mutationFn: petService.deletePet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] });
      showToast('🗑️ Mascota retirada del catálogo.', 'warning');
    },
    onError: (error) => {
      showToast(error?.message || 'Error al retirar la mascota.', 'error');
    },
  });

  return {
    pets: petsQuery.data ?? [],
    isLoading: petsQuery.isLoading,
    isError: petsQuery.isError,
    error: petsQuery.error,
    refreshPets: petsQuery.refetch,

    // Mutations
    createPet: createPetMutation.mutateAsync,
    updatePet: updatePetMutation.mutateAsync,
    deletePet: deletePetMutation.mutateAsync,

    isCreating: createPetMutation.isPending,
    isUpdating: updatePetMutation.isPending,
    isDeleting: deletePetMutation.isPending,
  };
};

// Hook específico para mascotas de un usuario (excluyendo DELETED)
export const useUserPets = (userId) => {
  return useQuery({
    queryKey: ['pets', 'user', userId],
    queryFn: async () => {
      const response = await petService.getPetsByUserId(userId);
      return response.data;
    },
    select: (data) => (data ?? []).filter((pet) => pet.status !== 'DELETED' && pet.status !== 'deleted'),
    enabled: !!userId, // Solo se ejecuta si hay un userId
  });
};

// Hook para obtener mascotas paginadas y filtradas para el catálogo
export const usePetsPage = (page, size, status = 'AVAILABLE', filters = {}, searchQuery = '') => {
  return useQuery({
    queryKey: ['pets', 'page', page, size, status, filters, searchQuery],
    queryFn: async () => {
      const params = {
        page,
        sizeVal: size,
        status,
      };

      if (filters.species && filters.species.length > 0) {
        const mappedSpecies = filters.species.map((s) => {
          if (s === 'dogs') return 'DOG';
          if (s === 'cats') return 'CAT';
          return 'OTHER';
        });
        params.species = mappedSpecies.join(',');
      }

      if (filters.size && filters.size !== 'Todos los Tamaños') {
        let mappedSize = 'SMALL';
        if (filters.size === 'Pequeño') mappedSize = 'SMALL';
        else if (filters.size === 'Mediano') mappedSize = 'MEDIUM';
        else if (filters.size === 'Grande') mappedSize = 'LARGE';
        params.size = mappedSize;
      }

      if (searchQuery) {
        params.search = searchQuery;
      }

      console.log('Fetching page with params:', params);
      try {
        const response = await petService.getPetsPage(params);
        console.log('Raw response from backend:', response);
        if (!response) {
          throw new Error('Response is undefined or null');
        }
        // Fallback in case the response is already response.data or apiResponse.data
        if (response.data !== undefined) {
          return response.data;
        }
        return response;
      } catch (err) {
        console.error('Error fetching pets page:', err);
        throw err;
      }
    },
    placeholderData: keepPreviousData,
  });
};
