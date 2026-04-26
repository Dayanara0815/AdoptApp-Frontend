import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Registro() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    nombres:'', apellidos:'', fechaNacimiento:'',
    correo:'', contrasena:'', confirmarContrasena:''
  });
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!form.nombres || !form.apellidos || !form.correo || !form.contrasena) {
      setError('Todos los campos son obligatorios'); return;
    }
    if (form.contrasena !== form.confirmarContrasena) {
      setError('Las contraseñas no coinciden'); return;
    }
    try {
      await axios.post('http://localhost:8080/api/auth/registrar', form);
      localStorage.setItem('correo', form.correo);
      nav('/verificar-registro');
    } catch(e) {
      setError(e.response?.data || 'Error al registrar');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.logo}>🐾 AdoptApp</h2>
        <h3 style={styles.title}>Crear Cuenta</h3>
        {error && <p style={styles.error}>{error}</p>}
        <input style={styles.input} placeholder="Nombres"
          onChange={e => setForm({...form, nombres: e.target.value})} />
        <input style={styles.input} placeholder="Apellidos"
          onChange={e => setForm({...form, apellidos: e.target.value})} />
        <label style={styles.label}>Fecha de nacimiento</label>
        <input style={styles.input} type="date"
          onChange={e => setForm({...form, fechaNacimiento: e.target.value})} />
        <input style={styles.input} placeholder="Correo electrónico"
          onChange={e => setForm({...form, correo: e.target.value})} />
        <input style={styles.input} type="password" placeholder="Contraseña"
          onChange={e => setForm({...form, contrasena: e.target.value})} />
        <input style={styles.input} type="password" placeholder="Confirmar contraseña"
          onChange={e => setForm({...form, confirmarContrasena: e.target.value})} />
        <button style={styles.btn} onClick={handleSubmit}>Registrarse</button>
        <p style={styles.link} onClick={() => nav('/')}>¿Ya tienes cuenta? <b>Inicia sesión</b></p>
      </div>
    </div>
  );
}

const styles = {
  container: { display:'flex', justifyContent:'center', alignItems:'center', minHeight:'100vh', background:'#F7F7F2', padding:'2rem 0' },
  card: { background:'white', padding:'2.5rem', borderRadius:'16px', boxShadow:'0 4px 24px rgba(0,0,0,0.08)', width:'400px' },
  logo: { textAlign:'center', color:'#8DAA91', fontSize:'1.5rem', marginBottom:'0.3rem' },
  title: { textAlign:'center', color:'#5F7E6D', fontSize:'1.2rem', fontWeight:'600', marginBottom:'1.5rem' },
  label: { fontSize:'0.85rem', color:'#8DAA91', marginBottom:'6px', display:'block', fontWeight:'500' },
  input: { width:'100%', padding:'12px 16px', marginBottom:'14px', borderRadius:'10px', border:'1.5px solid #e0e0e0', fontSize:'0.95rem', outline:'none', background:'#FAFAFA' },
  btn: { width:'100%', padding:'13px', background:'#8DAA91', color:'white', border:'none', borderRadius:'10px', cursor:'pointer', fontWeight:'700', fontSize:'1rem', marginBottom:'1rem' },
  link: { textAlign:'center', marginTop:'0.6rem', color:'#5F7E6D', cursor:'pointer', fontSize:'0.9rem' },
  error: { color:'red', textAlign:'center', marginBottom:'10px', fontSize:'0.9rem', background:'#fff0f0', padding:'8px', borderRadius:'8px' }
};