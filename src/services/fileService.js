import { fileApi } from '../api/axiosConfig';

export const fileService = {
  /**
   * Sube un archivo al microservicio de archivos
   * @param {File} file - El archivo a subir (imagen)
   * @returns {Promise<{fileName: string, downloadUrl: string}>}
   */
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return await fileApi.post('/api/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
