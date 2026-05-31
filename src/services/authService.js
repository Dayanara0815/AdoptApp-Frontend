import api from '../api/axiosConfig';

export const authService = {
  login: async (email, password) => {
    return await api.post('/users/login', { email, password });
  },

  register: async (userData) => {
    // Si el frontend envía nombres/apellidos por separado, aquí los unimos para el backend
    const fullName = userData.fullName || 
    (userData.role === 'HOSTEL' 
      ? userData.hostelName 
      : `${userData.nombres} ${userData.apellidos}`.trim());
    const payload = {
      fullName,
      email: userData.correo || userData.email,
      password: userData.contrasena || userData.password,
      dni: userData.dni || '',
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
        instagramUrl: userData.instagramUrl || userData.hostel?.instagramUrl || '',
        address: userData.address || '' 
      };
    }

    return await api.post('/users/register', payload);
  },


  getUserById: async (id) => {
    return await api.get(`/users/${id}`);
  },

  updateUser: async (id, updatedData) => {
    // Si se envían nombres y apellidos por separado en el frontend, los unimos para el backend
    const fullName = updatedData.fullName || (updatedData.nombres && updatedData.apellidos ? `${updatedData.nombres} ${updatedData.apellidos}`.trim() : null);
    
    const payload = {};
    if (fullName) payload.fullName = fullName;
    if (updatedData.phone !== undefined) payload.phone = updatedData.phone;
    if (updatedData.address !== undefined) payload.address = updatedData.address;
    if (updatedData.avatar !== undefined) payload.avatar = updatedData.avatar;

    // Si viene la sección de hostel, la mapeamos estructurada
    if (updatedData.hostel) {
      payload.hostel = {
        hostelName: updatedData.hostel.hostelName,
        description: updatedData.hostel.description,
        capacity: updatedData.hostel.capacity ? parseInt(updatedData.hostel.capacity, 10) : null,
        logo: updatedData.hostel.logo || updatedData.avatar || '',
        donationLink: updatedData.hostel.donationLink,
        website: updatedData.hostel.website,
        facebookUrl: updatedData.hostel.facebookUrl,
        instagramUrl: updatedData.hostel.instagramUrl
      };
    }

    return await api.put(`/users/${id}`, payload);
  },
};
