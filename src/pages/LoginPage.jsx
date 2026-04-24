import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', email, password);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">🐾 AdoptApp</div>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Ingresar</button>
        </form>
        <p><Link to="/forgot-password">¿Olvidaste tu contraseña?</Link></p>
        <p>¿No tienes cuenta? <Link to="/register"><strong>Regístrate</strong></Link></p>
      </div>
    </div>
  );
}