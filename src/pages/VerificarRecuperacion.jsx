import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerificarRecuperacion() {
  const nav = useNavigate();
  const correo = localStorage.getItem("correoRecuperar");
  const [codigo, setCodigo] = useState("");
  const [segundos, setSegundos] = useState(60);
  const [error, setError] = useState("");

  useEffect(() => {
    if (segundos <= 0) return;
    const t = setTimeout(() => setSegundos(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [segundos]);

  const verificar = () => {
    if (codigo.length !== 6) { setError("Codigo de 6 digitos"); return; }
    localStorage.setItem("codigoRecuperar", codigo);
    nav("/nueva-contrasena");
  };

  const reenviar = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/recuperar?correo=" + correo);
      setSegundos(60);
      setError("");
    } catch(e) {
      setError("Error al reenviar");
    }
  };

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",background:"#F7F7F2"}}>
      <div style={{background:"white",padding:"2.5rem",borderRadius:"16px",boxShadow:"0 4px 24px rgba(0,0,0,0.08)",width:"400px",textAlign:"center"}}>
        <h2 style={{color:"#8DAA91",fontSize:"1.5rem",marginBottom:"0.3rem"}}>AdoptApp</h2>
        <h3 style={{color:"#5F7E6D",fontSize:"1.2rem",fontWeight:"600",marginBottom:"0.5rem"}}>Verifica tu codigo</h3>
        <p style={{color:"#888",fontSize:"0.9rem"}}>{correo}</p>
        {error && <p style={{color:"red",fontSize:"0.9rem",marginBottom:"10px"}}>{error}</p>}
        <input style={{width:"100%",padding:"12px",marginBottom:"14px",borderRadius:"10px",border:"1.5px solid #e0e0e0",fontSize:"1.5rem",textAlign:"center",letterSpacing:"8px"}} maxLength={6} onChange={e => setCodigo(e.target.value)} />
        <button style={{width:"100%",padding:"13px",background:"#8DAA91",color:"white",border:"none",borderRadius:"10px",cursor:"pointer",fontWeight:"700",fontSize:"1rem",marginBottom:"1rem"}} onClick={verificar}>Continuar</button>
        {segundos > 0
          ? <p style={{color:"#aaa",fontSize:"0.9rem"}}>Reenviar en {segundos}s</p>
          : <p style={{color:"#8DAA91",cursor:"pointer",fontSize:"0.9rem",fontWeight:"600"}} onClick={reenviar}>Reenviar codigo</p>
        }
        <p style={{color:"#888",cursor:"pointer",marginTop:"0.5rem",fontSize:"0.9rem"}} onClick={() => nav("/")}>Volver al inicio</p>
      </div>
    </div>
  );
}