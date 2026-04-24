import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/verify-code');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">🐾 AdoptApp</div>
        <h2>Recuperar Contraseña</h2>
        <p>Ingresa tu correo y te enviaremos un código de recuperación.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button type="submit">Enviar código</button>
        </form>
      </div>
    </div>
  );
}