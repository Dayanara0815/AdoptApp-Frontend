import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function VerificarRegistro() {
  const nav = useNavigate();
  const correo = localStorage.getItem('correo');
  const [codigo, setCodigo] = useState('');
  const [segundos, setSegundos] = useState(60);
  const [error, setError] = useState('');

  useEffect(() => {
    if (segundos <= 0) return;
    const t = setTimeout(() => setSegundos(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [segundos]);

  const verificar = async () => {
    try {
      await axios.post(`http://localhost:8080/api/auth/verificar?correo=${correo}&codigo=${codigo}`);
      nav('/registro-exitoso');
    } catch(e) {
      setError(e.response?.data || 'Código incorrecto');
    }
  };

  const reenviar = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/registrar', { correo });
      setSegundos(60);
      setError('');
    } catch(e) {
      setError('Error al reenviar');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.logo}>🐾 AdoptApp</h2>
        <h3 style={styles.title}>Verifica tu cuenta</h3>
        <p style={styles.info}>Enviamos un código de 6 dígitos a:</p>
        <p style={styles.correo}>{correo}</p>
        {error && <p style={styles.error}>{error}</p>}
        <input style={styles.input} placeholder="● ● ● ● ● ●"
          maxLength={6} onChange={e => setCodigo(e.target.value)} />
        <button style={styles.btn} onClick={verificar}>Verificar código</button>
        {segundos > 0
          ? <p style={styles.timer}>Reenviar código en {segundos}s</p>
          : <p style={styles.reenviar} onClick={reenviar}>Reenviar código</p>
        }
      </div>
    </div>
  );
}

const styles = {
  container: { display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', background:'#F7F7F2' },
  card: { background:'white', padding:'2.5rem', borderRadius:'16px', boxShadow:'0 4px 24px rgba(0,0,0,0.08)', width:'400px', textAlign:'center' },
  logo: { color:'#8DAA91', fontSize:'1.5rem', marginBottom:'0.3rem' },
  title: { color:'#5F7E6D', fontSize:'1.2rem', fontWeight:'600', marginBottom:'1rem' },
  info: { color:'#888', fontSize:'0.9rem' },
  correo: { color:'#5F7E6D', fontWeight:'700', marginBottom:'1.5rem', fontSize:'0.95rem' },
  input: { width:'100%', padding:'12px 16px', marginBottom:'14px', borderRadius:'10px', border:'1.5px solid #e0e0e0', fontSize:'1.5rem', textAlign:'center', letterSpacing:'8px', background:'#FAFAFA' },
  btn: { width:'100%', padding:'13px', background:'#8DAA91', color:'white', border:'none', borderRadius:'10px', cursor:'pointer', fontWeight:'700', fontSize:'1rem', marginBottom:'1rem' },
  timer: { color:'#aaa', fontSize:'0.9rem' },
  reenviar: { color:'#8DAA91', cursor:'pointer', fontSize:'0.9rem', fontWeight:'600' },
  error: { color:'red', fontSize:'0.9rem', marginBottom:'10px', background:'#fff0f0', padding:'8px', borderRadius:'8px' }
};