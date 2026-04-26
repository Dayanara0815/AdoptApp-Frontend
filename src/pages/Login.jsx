import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ correo: '', contrasena: '' });

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.logo}>🐾 AdoptApp</h2>
        <h3 style={styles.title}>Iniciar Sesión</h3>
        <input style={styles.input} placeholder="Correo electrónico"
          onChange={e => setForm({...form, correo: e.target.value})} />
        <input style={styles.input} type="password" placeholder="Contraseña"
          onChange={e => setForm({...form, contrasena: e.target.value})} />
        <button style={styles.btn}>Ingresar</button>
        <p style={styles.link} onClick={() => nav('/recuperar-contrasena')}>¿Olvidaste tu contraseña?</p>
        <p style={styles.link} onClick={() => nav('/registro')}>¿No tienes cuenta? <b>Regístrate</b></p>
      </div>
    </div>
  );
}

const styles = {
  container: { display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', background:'#F7F7F2' },
  card: { background:'white', padding:'2.5rem', borderRadius:'16px', boxShadow:'0 4px 24px rgba(0,0,0,0.08)', width:'400px' },
  logo: { textAlign:'center', color:'#8DAA91', fontSize:'1.5rem', marginBottom:'0.3rem' },
  title: { textAlign:'center', color:'#5F7E6D', fontSize:'1.2rem', fontWeight:'600', marginBottom:'1.8rem' },
  input: { width:'100%', padding:'12px 16px', marginBottom:'14px', borderRadius:'10px', border:'1.5px solid #e0e0e0', fontSize:'0.95rem', outline:'none', background:'#FAFAFA' },
  btn: { width:'100%', padding:'13px', background:'#8DAA91', color:'white', border:'none', borderRadius:'10px', cursor:'pointer', fontWeight:'700', fontSize:'1rem', marginBottom:'1rem' },
  link: { textAlign:'center', marginTop:'0.6rem', color:'#5F7E6D', cursor:'pointer', fontSize:'0.9rem' }
};