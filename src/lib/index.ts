/**
 * Formatea una fecha ISO (ej: "2026-05-11T03:39:49") a un formato detallado: "11 de mayo de 2026, 3:39 AM"
 */
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return 'No disponible';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'No disponible';
    
    return new Intl.DateTimeFormat('es-PE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  } catch (e) {
    return 'No disponible';
  }
}

/**
 * Formatea una fecha a un formato de pertenencia de cuenta como "mayo de 2026"
 */
export function formatMonthYear(dateString: string | null | undefined): string {
  if (!dateString) return 'No disponible';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'No disponible';
    
    return new Intl.DateTimeFormat('es-PE', {
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch (e) {
    return 'No disponible';
  }
}

/**
 * Resuelve la URL absoluta de la imagen de una mascota.
 * Si es una URL absoluta o base64, la retorna tal cual.
 * Si es una ruta del microservicio de archivos (/api/files/nombre o api/files/nombre),
 * la concatena con la URL del microservicio de archivos.
 */
export function getPetImageUrl(image: string | null | undefined): string {
  if (!image) {
    return 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=600&fit=crop';
  }
  if (image.startsWith('data:') || image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }
  if (image.startsWith('/api/files/') || image.startsWith('api/files/')) {
    const fileServiceUrl = (import.meta as any).env.VITE_FILE_SERVICE_URL || 'http://localhost:7071';
    const normalizedPath = image.startsWith('/') ? image : `/${image}`;
    return `${fileServiceUrl}${normalizedPath}`;
  }
  return image;
}

