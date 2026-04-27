import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authStore';
import useLocalStorage from '../hooks/useLocalStorage';

export default function Login() {
  const nav = useNavigate();
  const { login } = useAuth();
  const { data: usuarios } = useLocalStorage('usuarios');
  const [form, setForm] = useState({ correo: '', contrasena: '' });
  const [error, setError] = useState('');

  const handleIngresar = () => {
    // 1. VALIDACIÓN: Buscar si el usuario existe en localStorage
    const usuarioEncontrado = usuarios.find(
      (u) => u.correo === form.correo && u.contrasena === form.contrasena
    );

    if (usuarioEncontrado) {
      // 2. Si existe, lo logueamos en el Contexto
      login(usuarioEncontrado);

      // 3. Redirigimos al catálogo (o donde prefieras)
      nav('/catalogo');
    } else {
      // 4. Si no existe, mostramos error y NO dejamos pasar
      setError(
        'Correo o contraseña incorrectos. Regístrate si no tienes cuenta.'
      );
    }
  };

  return (
    <>
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <div style={styles.card}>
            <h3 style={styles.title}>Iniciar Sesión</h3>

            {/* AGREGAMOS EL MENSAJE DE ERROR AQUÍ */}
            {error && <p style={styles.error}>{error}</p>}

            <input
              style={styles.input}
              placeholder="Correo electrónico"
              onChange={(e) => setForm({ ...form, correo: e.target.value })}
            />

            <input
              style={styles.input}
              type="password"
              placeholder="Contraseña"
              onChange={(e) => setForm({ ...form, contrasena: e.target.value })}
            />

            {/* ERROR CORREGIDO: Ahora llama a handleIngresar */}
            <button style={styles.btn} onClick={handleIngresar}>
              Ingresar
            </button>

            <p style={styles.link} onClick={() => nav('/recuperar-contrasena')}>
              ¿Olvidaste tu contraseña?
            </p>
            <p style={styles.link} onClick={() => nav('/registro')}>
              ¿No tienes cuenta? <b>Regístrate</b>
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
    borderRadius: '24px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    width: '400px',
  },
  title: {
    textAlign: 'center',
    color: '#5F7E6D',
    fontSize: '1.4rem',
    fontWeight: '600',
    marginBottom: '1.8rem',
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
  },
  link: {
    textAlign: 'center',
    marginTop: '0.6rem',
    color: '#5F7E6D',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  // Estilo para el mensaje de error
  error: {
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: '15px',
    fontSize: '0.85rem',
    background: '#ffebee',
    padding: '10px',
    borderRadius: '10px',
  },
};
