import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  const [form, setForm] = useState({
    nombres: '', apellidos: '', fechaNacimiento: '',
    email: '', password: '', confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register:', form);
  };

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">🐾 AdoptApp</div>
        <h2>Crear Cuenta</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nombres"
            value={form.nombres} onChange={e => set('nombres', e.target.value)} required />
          <input type="text" placeholder="Apellidos"
            value={form.apellidos} onChange={e => set('apellidos', e.target.value)} required />
          <input type="date" placeholder="Fecha de nacimiento"
            value={form.fechaNacimiento} onChange={e => set('fechaNacimiento', e.target.value)} required />
          <input type="email" placeholder="Correo electrónico"
            value={form.email} onChange={e => set('email', e.target.value)} required />
          <input type="password" placeholder="Contraseña"
            value={form.password} onChange={e => set('password', e.target.value)} required />
          <input type="password" placeholder="Confirmar contraseña"
            value={form.confirmPassword} onChange={e => set('confirmPassword', e.target.value)} required />
          <button type="submit">Registrarse</button>
        </form>
        <p>¿Ya tienes cuenta? <Link to="/login"><strong>Ingresar</strong></Link></p>
      </div>
    </div>
  );
} 