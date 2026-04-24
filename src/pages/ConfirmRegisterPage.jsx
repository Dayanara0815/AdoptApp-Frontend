import { useNavigate } from 'react-router-dom';

export default function ConfirmRegisterPage() {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">🐾 AdoptApp</div>
        <div style={{fontSize:'3rem'}}>✅</div>
        <h2>¡Registro Exitoso!</h2>
        <p>Tu cuenta ha sido creada correctamente.</p>
        <button onClick={() => navigate('/login')}>
          Ir a Iniciar Sesión
        </button>
      </div>
    </div>
  );
}