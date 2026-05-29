import api from '../api/axiosConfig';

export const petService = {
  getAllPets: async () => {
    return await api.get('/pets');
  },

  getPetsPage: async (params) => {
    return await api.get('/pets/page', { params });
  },

  getPetById: async (id) => {
    return await api.get(`/pets/${id}`);
  },

  createPet: async (petData) => {
    return await api.post('/pets', petData);
  },

  updatePet: async (id, petData) => {
    return await api.put(`/pets/${id}`, petData);
  },

  deletePet: async (id) => {
    return await api.delete(`/pets/${id}`);
  },

  getPetsByUserId: async (userId) => {
    return await api.get(`/pets/user/${userId}`);
  },
};
