import React from 'react';

/**
 * Componente de Botón Global Reutilizable.
 * Soporta estados de carga (isPending) para integrarse de forma fluida con TanStack Query y llamadas de red.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido del botón
 * @param {Function} props.onClick - Evento click del botón
 * @param {string} [props.type='button'] - Tipo de botón ('button', 'submit', etc.)
 * @param {string} [props.className='btn-yellow'] - Clase de estilo (ej: 'btn-yellow', 'btn-outline-secondary')
 * @param {boolean} [props.isPending=false] - Indica si hay una operación de carga pendiente para desactivar e incorporar spinner
 * @param {boolean} [props.disabled=false] - Desactiva el botón manualmente
 * @param {Object} [props.style={}] - Estilos en línea adicionales
 */
export default function Button({
  children,
  onClick,
  type = 'button',
  className = 'btn-yellow',
  isPending = false,
  disabled = false,
  style = {},
  ...props
}) {
  return (
    <button
      type={type}
      className={`btn ${className} d-inline-flex align-items-center justify-content-center gap-2`}
      onClick={onClick}
      disabled={isPending || disabled}
      style={{
        transition: 'all 0.2s ease-in-out',
        opacity: isPending || disabled ? 0.75 : 1,
        cursor: isPending || disabled ? 'not-allowed' : 'pointer',
        ...style
      }}
      {...props}
    >
      {isPending && (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
          style={{ width: '0.9rem', height: '0.9rem' }}
        ></span>
      )}
      <span>{children}</span>
    </button>
  );
}
