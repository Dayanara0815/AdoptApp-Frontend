import { useNavigate } from 'react-router-dom';

export default function RegistroExitoso() {
  const nav = useNavigate();
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icono}>✅</div>
        <h2 style={styles.title}>¡Registro exitoso!</h2>
        <p style={styles.msg}>Tu cuenta ha sido creada y verificada correctamente. Ya puedes ingresar a AdoptApp.</p>
        <button style={styles.btn} onClick={() => nav('/')}>Iniciar sesión</button>
      </div>
    </div>
  );
}

const styles = {
  container: { display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', background:'#F7F7F2' },
  card: { background:'white', padding:'2.5rem', borderRadius:'16px', boxShadow:'0 4px 24px rgba(0,0,0,0.08)', width:'400px', textAlign:'center' },
  icono: { fontSize:'4rem', marginBottom:'1rem' },
  title: { color:'#5F7E6D', fontWeight:'700', marginBottom:'0.8rem' },
  msg: { color:'#888', marginBottom:'1.8rem', lineHeight:'1.6', fontSize:'0.95rem' },
  btn: { padding:'13px 40px', background:'#8DAA91', color:'white', border:'none', borderRadius:'10px', cursor:'pointer', fontWeight:'700', fontSize:'1rem' }
};