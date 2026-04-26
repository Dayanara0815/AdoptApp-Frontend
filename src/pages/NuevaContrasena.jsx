import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function NuevaContrasena() {
  const nav = useNavigate();
  const correo = localStorage.getItem('correoRecuperar');
  const codigo = localStorage.getItem('codigoRecuperar');
  const [form, setForm] = useState({ contrasena:'', confirmar:'' });
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);

  const handleGuardar = async () => {
    if (!form.contrasena || !form.confirmar) { setError('Completa todos los campos'); return; }
    if (form.contrasena !== form.confirmar) { setError('Las contraseñas no coinciden'); return; }
    if (form.contrasena.length < 6) { setError('Mínimo 6 caracteres'); return; }
    try {
      await axios.post(`http://localhost:8080/api/auth/nueva-contrasena?correo=${correo}&codigo=${codigo}&nuevaContrasena=${form.contrasena}`);
      setExito(true);
      setTimeout(() => nav('/'), 2000);
    } catch(e) {
      setError(e.response?.data || 'Error al cambiar contraseña');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.logo}>🐾 AdoptApp</h2>
        {exito ? (
          <>
            <div style={styles.icono}>✅</div>
            <h3 style={styles.title}>¡Contraseña actualizada!</h3>
            <p style={styles.info}>Redirigiendo al inicio de sesión...</p>
          </>
        ) : (
          <>
            <h3 style={styles.title}>Nueva contraseña</h3>
            <p style={styles.info}>Escribe tu nueva contraseña dos veces para confirmarla.</p>
            {error && <p style={styles.error}>{error}</p>}
            <input style={styles.input} type="password" placeholder="Nueva contraseña"
              onChange={e => setForm({...form, contrasena: e.target.value})} />
            <input style={styles.input} type="password" placeholder="Confirmar contraseña"
              onChange={e => setForm({...form, confirmar: e.target.value})} />
            <button style={styles.btn} onClick={handleGuardar}>Guardar contraseña</button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', background:'#F7F7F2' },
  card: { background:'white', padding:'2.5rem', borderRadius:'16px', boxShadow:'0 4px 24px rgba(0,0,0,0.08)', width:'400px', textAlign:'center' },
  logo: { color:'#8DAA91', fontSize:'1.5rem', marginBottom:'0.3rem' },
  icono: { fontSize:'4rem', marginBottom:'1rem' },
  title: { color:'#5F7E6D', fontSize:'1.2rem', fontWeight:'600', marginBottom:'0.5rem' },
  info: { color:'#888', marginBottom:'1.5rem', fontSize:'0.9rem', lineHeight:'1.5' },
  input: { width:'100%', padding:'12px 16px', marginBottom:'14px', borderRadius:'10px', border:'1.5px solid #e0e0e0', fontSize:'0.95rem', outline:'none', background:'#FAFAFA' },
  btn: { width:'100%', padding:'13px', background:'#8DAA91', color:'white', border:'none', borderRadius:'10px', cursor:'pointer', fontWeight:'700', fontSize:'1rem' },
  error: { color:'red', fontSize:'0.9rem', marginBottom:'10px', background:'#fff0f0', padding:'8px', borderRadius:'8px' }
};