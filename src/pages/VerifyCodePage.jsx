import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VerifyCodePage() {
  const [code, setCode] = useState('');
  const [seconds, setSeconds] = useState(60);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/new-password');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">🐾 AdoptApp</div>
        <h2>Verificar Código</h2>
        <p>Ingresa el código de 6 dígitos enviado a tu correo.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Código de 6 dígitos"
            maxLength={6}
            value={code}
            onChange={e => setCode(e.target.value)}
            required
          />
          <button type="submit">Verificar</button>
        </form>
        <p>
          {seconds > 0
            ? `Reenviar código en ${seconds}s`
            : <button onClick={() => setSeconds(60)}>Reenviar código</button>
          }
        </p>
      </div>
    </div>
  );
}