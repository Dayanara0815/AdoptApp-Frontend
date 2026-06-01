import api from '../api/axiosConfig';

export const adoptionService = {
  getAdoptionsPage: async (search = '', page = 0, size = 10) => {
    return await api.get('/adoptions', { params: { search, page, size } });
  },

  registerAdoption: async (petId, adopterId) => {
    return await api.post('/adoptions', { petId, adopterId });
  },
};
