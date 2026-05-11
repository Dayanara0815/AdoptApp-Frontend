import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthMutations } from '../hooks/useAuthMutations';

export default function Login() {
  const nav = useNavigate();
  const { login, isLoggingIn } = useAuthMutations();
  const [form, setForm] = useState({ correo: '', contrasena: '' });
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState('USER'); // 'USER' o 'HOSTEL'

  // Estados de hover para interactividad premium
  const [hoverBtn, setHoverBtn] = useState(false);
  const [hoverLink1, setHoverLink1] = useState(false);
  const [hoverLink2, setHoverLink2] = useState(false);

  const handleIngresar = async () => {
    if (!form.correo || !form.contrasena) {
      setError('Por favor, ingresa tu correo y contraseña.');
      return;
    }

    setError('');

    try {
      // 1. Llamar a la mutación de React Query para iniciar sesión
      const loginData = await login({ correo: form.correo, contrasena: form.contrasena });

      // 2. Redirigir según el rol real de su cuenta
      const userRoleLower = loginData.user?.role?.toLowerCase();
      if (userRoleLower === 'admin') {
        nav('/admin');
      } else {
        nav('/dashboard/catalogo');
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      const msg = err?.message || 'Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.';
      setError(msg);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.card}>
          <h3 style={styles.title}>Iniciar Sesión</h3>

          {/* Selector interactivo de perfil */}
          <div style={styles.tabContainer}>
            <button
              type="button"
              style={{
                ...styles.tabButton,
                ...(selectedRole === 'USER' ? styles.tabButtonActive : {}),
              }}
              onClick={() => setSelectedRole('USER')}
            >
              🐾 Adoptante
            </button>
            <button
              type="button"
              style={{
                ...styles.tabButton,
                ...(selectedRole === 'HOSTEL' ? styles.tabButtonActive : {}),
              }}
              onClick={() => setSelectedRole('HOSTEL')}
            >
              🏠 Albergue
            </button>
          </div>

          <p style={styles.subtitle}>
            {selectedRole === 'USER'
              ? 'Encuentra a tu nuevo compañero de vida'
              : 'Administra tus publicaciones y rescates'}
          </p>

          {error && <p style={styles.error}>{error}</p>}

          <input
            style={styles.input}
            type="email"
            placeholder="Correo electrónico"
            value={form.correo}
            onChange={(e) => setForm({ ...form, correo: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && handleIngresar()}
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Contraseña"
            value={form.contrasena}
            onChange={(e) => setForm({ ...form, contrasena: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && handleIngresar()}
          />

          <button
            style={{
              ...styles.btn,
              ...(hoverBtn ? styles.btnHover : {}),
              ...(isLoggingIn ? styles.btnDisabled : {}),
            }}
            onClick={handleIngresar}
            disabled={isLoggingIn}
            onMouseEnter={() => !isLoggingIn && setHoverBtn(true)}
            onMouseLeave={() => setHoverBtn(false)}
          >
            {isLoggingIn ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
                style={{ marginRight: '8px' }}
              ></span>
            ) : null}
            {isLoggingIn ? 'Iniciando sesión...' : 'Ingresar'}
          </button>

          <p
            style={{ ...styles.link, color: hoverLink1 ? '#3A5044' : '#5F7E6D' }}
            onClick={() => nav('/recuperar-contrasena')}
            onMouseEnter={() => setHoverLink1(true)}
            onMouseLeave={() => setHoverLink1(false)}
          >
            ¿Olvidaste tu contraseña?
          </p>

          <p
            style={{ ...styles.link, color: hoverLink2 ? '#3A5044' : '#5F7E6D' }}
            onClick={() => nav('/registro', { state: { role: selectedRole } })}
            onMouseEnter={() => setHoverLink2(true)}
            onMouseLeave={() => setHoverLink2(false)}
          >
            ¿No tienes cuenta?{' '}
            <b>Regístrate como {selectedRole === 'USER' ? 'Adoptante' : 'Albergue'}</b>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    paddingTop: '90px',
    paddingBottom: '60px',
    background: 'linear-gradient(135deg, #F3F6F4 0%, #E7ECE8 100%)',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    fontFamily: "'Inter', 'Roboto', sans-serif",
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'transparent',
    width: '100%',
  },
  card: {
    background: 'white',
    padding: '2.5rem',
    borderRadius: '24px',
    boxShadow: '0 8px 32px rgba(95, 126, 109, 0.08)',
    width: '400px',
  },
  title: {
    textAlign: 'center',
    color: '#5F7E6D',
    fontSize: '1.4rem',
    fontWeight: '600',
    marginBottom: '1rem',
  },
  subtitle: {
    textAlign: 'center',
    color: '#7A8F82',
    fontSize: '0.9rem',
    marginBottom: '1.5rem',
  },
  tabContainer: {
    display: 'flex',
    background: '#EAEFEA',
    borderRadius: '12px',
    padding: '4px',
    marginBottom: '1rem',
  },
  tabButton: {
    flex: 1,
    padding: '10px',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#7A8F82',
    border: 'none',
    background: 'transparent',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  tabButtonActive: {
    background: '#8DAA91',
    color: 'white',
    boxShadow: '0 2px 6px rgba(141, 170, 145, 0.2)',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    marginBottom: '14px',
    borderRadius: '12px',
    border: '1.5px solid #e0e0e0',
    fontSize: '0.95rem',
    outline: 'none',
    background: '#FAFAFA',
  },
  btn: {
    width: '100%',
    padding: '13px',
    background: '#8DAA91',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '1rem',
    marginBottom: '1rem',
    transition: 'all 0.2s ease',
  },
  btnHover: {
    background: '#799A7D',
  },
  btnDisabled: {
    background: '#BDCBD0',
    cursor: 'not-allowed',
  },
  link: {
    textAlign: 'center',
    marginTop: '0.6rem',
    color: '#5F7E6D',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  error: {
    color: '#C0392B',
    textAlign: 'center',
    marginBottom: '15px',
    fontSize: '0.85rem',
    background: '#FDEDEC',
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid #FADBD8',
  },
};
