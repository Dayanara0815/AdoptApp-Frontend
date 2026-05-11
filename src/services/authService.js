import api from '../api/axiosConfig';

export const authService = {
  login: async (email, password) => {
    return await api.post('/users/login', { email, password });
  },

  register: async (userData) => {
    // Si el frontend envía nombres/apellidos por separado, aquí los unimos para el backend
    const fullName = userData.fullName || `${userData.nombres} ${userData.apellidos}`.trim();
    const payload = {
      fullName,
      email: userData.correo || userData.email,
      password: userData.contrasena || userData.password,
      role: userData.role || 'USER',
      phone: userData.phone || '',
      address: userData.address || ''
    };

    // Si el rol es HOSTEL, estructuramos de manera segura los datos del albergue
    if (userData.role === 'HOSTEL') {
      payload.hostel = {
        hostelName: userData.hostelName || userData.hostel?.hostelName || '',
        description: userData.description || userData.hostel?.description || '',
        capacity: parseInt(userData.capacity || userData.hostel?.capacity || 0, 10),
        logo: userData.logo || userData.hostel?.logo || '',
        donationLink: userData.donationLink || userData.hostel?.donationLink || '',
        website: userData.website || userData.hostel?.website || '',
        facebookUrl: userData.facebookUrl || userData.hostel?.facebookUrl || '',
        instagramUrl: userData.instagramUrl || userData.hostel?.instagramUrl || ''
      };
    }

    return await api.post('/users/register', payload);
  },


  getUserById: async (id) => {
    return await api.get(`/users/${id}`);
  },
};
