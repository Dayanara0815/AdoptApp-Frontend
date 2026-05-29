import { useMutation } from '@tanstack/react-query';
import { fileService } from '../services/fileService';
import { useToast } from '../context/ToastContext';

export const useUploadFile = () => {
  const { showToast } = useToast();

  const uploadMutation = useMutation({
    mutationFn: fileService.uploadFile,
    onError: (error) => {
      showToast(error?.message || 'Error al subir el archivo.', 'error');
    },
  });

  return {
    uploadFile: uploadMutation.mutateAsync,
    isUploading: uploadMutation.isPending,
    error: uploadMutation.error,
  };
};
