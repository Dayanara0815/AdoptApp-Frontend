import { createContext, useContext, useState, useCallback } from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes, FaTimesCircle } from 'react-icons/fa';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast debe utilizarse dentro de un ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Función para cerrar un toast por ID
  const closeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  // Función global para mostrar un Toast
  const showToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 5);
    
    const newToast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);

    // Cerrado automático del Toast
    setTimeout(() => {
      closeToast(id);
    }, duration);
  }, [closeToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Contenedor flotante de Toasts */}
      <div style={styles.toastContainer}>
        {toasts.map((toast) => {
          // Determinar icono, color principal y fondo
          let icon = <FaCheckCircle style={styles.icon} />;
          let accentColor = '#2ECC71';
          let bgColor = '#E8F8F5';
          let textColor = '#117A65';

          if (toast.type === 'error') {
            icon = <FaTimesCircle style={styles.icon} />;
            accentColor = '#E74C3C';
            bgColor = '#FDEDEC';
            textColor = '#78281F';
          } else if (toast.type === 'warning') {
            icon = <FaExclamationTriangle style={styles.icon} />;
            accentColor = '#F1C40F';
            bgColor = '#FEF9E7';
            textColor = '#7D6608';
          } else if (toast.type === 'info') {
            icon = <FaInfoCircle style={styles.icon} />;
            accentColor = '#3498DB';
            bgColor = '#EAF2F8';
            textColor = '#1A5276';
          }

          return (
            <div
              key={toast.id}
              style={{
                ...styles.toastCard,
                backgroundColor: bgColor,
                borderLeft: `5px solid ${accentColor}`,
                color: textColor,
              }}
            >
              <div style={styles.content}>
                <span style={{ ...styles.iconWrapper, color: accentColor }}>
                  {icon}
                </span>
                <p style={styles.message}>{toast.message}</p>
              </div>
              <button
                type="button"
                onClick={() => closeToast(toast.id)}
                style={{ ...styles.closeButton, color: textColor }}
              >
                <FaTimes />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

// Estilos Premium con animaciones en línea
const styles = {
  toastContainer: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '380px',
    width: '100%',
    pointerEvents: 'none',
  },
  toastCard: {
    pointerEvents: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 18px',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)',
    animation: 'slideIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
    boxSizing: 'border-box',
    width: '100%',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1,
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.2rem',
  },
  icon: {
    display: 'block',
  },
  message: {
    margin: 0,
    fontSize: '0.9rem',
    fontWeight: '600',
    lineHeight: '1.4',
    fontFamily: "'Inter', 'Roboto', sans-serif",
  },
  closeButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    marginLeft: '12px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.95rem',
    opacity: 0.7,
    transition: 'opacity 0.2s ease',
  },
};
