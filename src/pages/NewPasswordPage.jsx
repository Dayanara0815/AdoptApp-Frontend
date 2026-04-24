import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    alert('¡Contraseña cambiada con éxito!');
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">🐾 AdoptApp</div>
        <h2>Nueva Contraseña</h2>
        <p>Ingresa tu nueva contraseña dos veces para confirmar.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmar nueva contraseña"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Guardar contraseña</button>
        </form>
      </div>
    </div>
  );
}