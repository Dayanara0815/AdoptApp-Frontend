import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { petService } from '../services/petService';
import { useToast } from '../context/ToastContext';

export const usePets = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  // Query para obtener todas las mascotas
  const petsQuery = useQuery({
    queryKey: ['pets'],
    queryFn: async () => {
      const response = await petService.getAllPets();
      return response.data;
    },
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

  // Mutation para actualizar una mascota
  const updatePetMutation = useMutation({
    mutationFn: ({ id, data }) => petService.updatePet(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] });
      showToast('🐾 Mascota actualizada correctamente.', 'success');
    },
    onError: (error) => {
      showToast(error?.message || 'Error al actualizar la mascota.', 'error');
    },
  });

  // Mutation para eliminar una mascota
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

// Hook específico para mascotas de un usuario
export const useUserPets = (userId) => {
  return useQuery({
    queryKey: ['pets', 'user', userId],
    queryFn: async () => {
      const response = await petService.getPetsByUserId(userId);
      return response.data;
    },
    enabled: !!userId, // Solo se ejecuta si hay un userId
  });
};
