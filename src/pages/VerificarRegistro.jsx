import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthMutations } from '../hooks/useAuthMutations';

export default function VerificarRegistro() {
  const nav = useNavigate();
  const { register, login, isRegistering, isLoggingIn } = useAuthMutations();
  const correo = localStorage.getItem('temp_correo') || 'usuario@correo.com';

  const [codigo, setCodigo] = useState('');
  const [segundos, setSegundos] = useState(60);
  const [error, setError] = useState('');

  const loading = isRegistering || isLoggingIn;

  useEffect(() => {
    if (segundos <= 0) return;
    const t = setTimeout(() => setSegundos((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [segundos]);

  const verificar = async () => {
    const codigoCorrecto = localStorage.getItem('temp_code');

    if (codigo === codigoCorrecto) {
      setError('');

      const rawTempUser = localStorage.getItem('temp_user');
      console.log('Verificación exitosa. Buscando temp_user:', rawTempUser);

      if (rawTempUser) {
        try {
          const tempUser = JSON.parse(rawTempUser);

          // 1. Guardar oficialmente en el Backend de Negocio (PostgreSQL)
          await register(tempUser);

          // 2. Iniciar sesión automáticamente para obtener el token JWT de seguridad y guardarlo en contexto/localstorage
          await login({
            correo: tempUser.correo || tempUser.email,
            contrasena: tempUser.contrasena || tempUser.password,
          });

          // Limpiar datos temporales
          localStorage.removeItem('temp_user');
          localStorage.removeItem('temp_correo');
          localStorage.removeItem('temp_code');

          nav('/registro-exitoso');
        } catch (err) {
          console.error('Error durante la persistencia en el servidor:', err);
          const errMsg = err?.message || 'Error al guardar la cuenta en la base de datos principal. Inténtalo de nuevo.';
          setError(errMsg);
        }
      } else {
        setError('No se encontraron los datos temporales del registro. Por favor, regístrate de nuevo.');
      }
    } else {
      setError('Código incorrecto. Revisa el que salió en la ventana emergente.');
    }
  };

  const reenviar = () => {
    // Generar nuevo código aleatorio
    const nuevoCodigo = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem('temp_code', nuevoCodigo);

    alert(`Tu nuevo código de verificación es: ${nuevoCodigo}`);

    setSegundos(60);
    setError('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.logo}>🐾 AdoptApp</h2>
        <h3 style={styles.title}>Verifica tu cuenta</h3>
        <p style={styles.info}>Enviamos un código de 6 dígitos a:</p>
        <p style={styles.correo}>{correo}</p>

        {error && <p style={styles.error}>{error}</p>}

        <input
          style={styles.input}
          placeholder="0 0 0 0 0 0"
          maxLength={6}
          disabled={loading}
          onChange={(e) => setCodigo(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && verificar()}
        />

        <button style={styles.btn} onClick={verificar} disabled={loading}>
          {loading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
              style={{ marginRight: '8px' }}
            ></span>
          ) : null}
          {loading ? 'Verificando...' : 'Verificar código'}
        </button>

        {segundos > 0 ? (
          <p style={styles.timer}>Reenviar código en {segundos}s</p>
        ) : (
          <p style={styles.reenviar} onClick={reenviar}>
            Reenviar código
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #F3F6F4 0%, #E7ECE8 100%)',
    fontFamily: "'Inter', 'Roboto', sans-serif",
  },
  card: {
    background: 'white',
    padding: '2.5rem',
    borderRadius: '24px',
    boxShadow: '0 8px 32px rgba(95, 126, 109, 0.08)',
    width: '400px',
    textAlign: 'center',
  },
  logo: {
    color: '#8DAA91',
    fontSize: '1.5rem',
    marginBottom: '0.3rem',
    fontWeight: '700',
  },
  title: {
    color: '#5F7E6D',
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '1rem',
  },
  info: { color: '#888', fontSize: '0.9rem', marginBottom: '5px' },
  correo: {
    color: '#5F7E6D',
    fontWeight: '700',
    marginBottom: '1.5rem',
    fontSize: '0.95rem',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    marginBottom: '20px',
    borderRadius: '12px',
    border: '1.5px solid #e0e0e0',
    fontSize: '1.8rem',
    textAlign: 'center',
    letterSpacing: '8px',
    background: '#FAFAFA',
    outline: 'none',
    color: '#5F7E6D',
  },
  btn: {
    width: '100%',
    padding: '14px',
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
  timer: { color: '#aaa', fontSize: '0.9rem' },
  reenviar: {
    color: '#8DAA91',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
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
