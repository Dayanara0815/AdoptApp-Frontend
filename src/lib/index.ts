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
