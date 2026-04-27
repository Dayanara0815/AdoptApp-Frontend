import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

export default function RecuperarContrasena() {
  const nav = useNavigate();
  const [correo, setCorreo] = useState('');
  const [error, setError] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleEnviar = async () => {
    if (!correo) {
      setError('Ingresa tu correo');
      return;
    }
    try {
      await axios.post(
        `http://localhost:8080/api/auth/recuperar?correo=${correo}`
      );
      localStorage.setItem('correoRecuperar', correo);
      setEnviado(true);
      setTimeout(() => nav('/verificar-recuperacion'), 1500);
    } catch (e) {
      setError(e.response?.data || 'Correo no encontrado');
    }
  };

  return (
    <>
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <div style={styles.card}>
            <h3 style={styles.title}>Recuperar contraseña</h3>
            <p style={styles.info}>
              Ingresa tu correo y te enviaremos un código de verificación.
            </p>
            {error && <p style={styles.error}>{error}</p>}
            {enviado && (
              <p style={styles.ok}>¡Código enviado! Redirigiendo...</p>
            )}
            <input
              style={styles.input}
              placeholder="Correo electrónico"
              onChange={(e) => setCorreo(e.target.value)}
            />
            <button style={styles.btn} onClick={handleEnviar}>
              Enviar código
            </button>
            <p style={styles.link} onClick={() => nav('/login')}>
              Volver al inicio de sesión
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  wrapper: {
    paddingTop: '90px',
    paddingBottom: '60px',
    background: '#F7F7F2',
    boxSizing: 'border-box',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'transparent',
    padding: '2rem 0',
  },
  card: {
    background: 'white',
    padding: '2.5rem',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    width: '400px',
    textAlign: 'center',
  },
  logo: { color: '#8DAA91', fontSize: '1.5rem', marginBottom: '0.3rem' },
  title: {
    color: '#5F7E6D',
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  info: {
    color: '#888',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
    lineHeight: '1.5',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    marginBottom: '14px',
    borderRadius: '10px',
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
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '1rem',
    marginBottom: '1rem',
  },
  link: { color: '#5F7E6D', cursor: 'pointer', fontSize: '0.9rem' },
  error: {
    color: 'red',
    fontSize: '0.9rem',
    marginBottom: '10px',
    background: '#fff0f0',
    padding: '8px',
    borderRadius: '8px',
  },
  ok: {
    color: '#5F7E6D',
    fontSize: '0.9rem',
    marginBottom: '10px',
    background: '#f0fff4',
    padding: '8px',
    borderRadius: '8px',
  },
};
