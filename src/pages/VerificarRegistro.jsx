import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authStore';
import useLocalStorage from '../hooks/useLocalStorage';

export default function VerificarRegistro() {
  const nav = useNavigate();
  const { login } = useAuth();
  const { createItem } = useLocalStorage('usuarios');
  const correo = localStorage.getItem('temp_correo') || 'usuario@correo.com';

  const [codigo, setCodigo] = useState('');
  const [segundos, setSegundos] = useState(60);
  const [error, setError] = useState('');

  useEffect(() => {
    if (segundos <= 0) return;
    const t = setTimeout(() => setSegundos((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [segundos]);

  const verificar = () => {
    // Leemos el código que se generó en la página anterior
    const codigoCorrecto = localStorage.getItem('temp_code');

    if (codigo === codigoCorrecto) {
      // 1. Recuperamos los datos del usuario que se está registrando
      const rawTempUser = localStorage.getItem('temp_user');
      console.log('Verificación exitosa. Buscando temp_user:', rawTempUser);
      if (rawTempUser) {
        const tempUser = JSON.parse(rawTempUser);
        console.log('Guardando usuario oficial:', tempUser);
        // Guardamos oficialmente en la lista de usuarios
        createItem(tempUser);
        // Iniciamos sesión automáticamente
        login(tempUser);
        localStorage.removeItem('temp_user');
      } else {
        console.warn('No se encontró temp_user en localStorage');
      }

      // 2. Limpiamos los datos temporales del código
      localStorage.removeItem('temp_correo');
      localStorage.removeItem('temp_code');
      nav('/registro-exitoso');
    } else {
      setError(
        'Código incorrecto. Revisa el que salió en la ventana emergente.'
      );
    }
  };

  const reenviar = () => {
    // Generamos un nuevo código y lo mostramos de nuevo
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
          onChange={(e) => setCodigo(e.target.value)}
        />

        <button style={styles.btn} onClick={verificar}>
          Verificar código
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
    background: '#F7F7F2',
  },
  card: {
    background: 'white',
    padding: '2.5rem',
    borderRadius: '24px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
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
    border: '1px solid #e0e0e0',
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
  },
  timer: { color: '#aaa', fontSize: '0.9rem' },
  reenviar: {
    color: '#8DAA91',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  error: {
    color: '#d32f2f',
    fontSize: '0.85rem',
    marginBottom: '15px',
    background: '#ffebee',
    padding: '10px',
    borderRadius: '10px',
  },
};
