import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthMutations } from '../hooks/useAuthMutations';
import { useToast } from '../context/ToastContext';
import loginIllustration from '../assets/login-illustration.png';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';

export default function Login() {
  const nav = useNavigate();
  const { showToast } = useToast();
  const { login, isLoggingIn } = useAuthMutations();
  const [form, setForm] = useState({ correo: '', contrasena: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleIngresar = async () => {
    if (!form.correo || !form.contrasena) {
      setError('Por favor, ingresa tu correo y contraseña.');
      showToast('Por favor, ingresa tu correo y contraseña.', 'warning');
      return;
    }

    setError('');

    try {
      const loginData = await login({ correo: form.correo, contrasena: form.contrasena });
      showToast(`¡Bienvenido de nuevo, ${loginData.user?.fullName || 'Usuario'}! 🐾`, 'success');

      const userRoleLower = loginData.user?.role?.toLowerCase();
      if (userRoleLower === 'admin') {
        nav('/admin');
      } else {
        nav('/dashboard/catalogo');
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      const msg = err?.message || 'Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.';
      setError(msg);
      showToast(msg, 'error');
    }
  };

  return (
    <>
      {/* Estilos inyectados de forma segura para permitir animaciones, pseudo-clases y responsive design */}
      <style>{`
        .login-wrapper {
          min-height: calc(100vh - 85px);
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #F3F6F4 0%, #E7ECE8 100%);
          font-family: 'Outfit', 'Inter', 'Roboto', sans-serif;
          padding: 20px;
          box-sizing: border-box;
        }

        .login-card-container {
          display: flex;
          width: 1000px;
          max-width: 100%;
          min-height: 600px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 30px;
          box-shadow: 0 20px 40px rgba(95, 126, 109, 0.08), 
                      0 1px 3px rgba(0, 0, 0, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.5);
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .login-illustration-side {
          flex: 1.1;
          background: linear-gradient(145deg, #F5F7F6 0%, #E2EAE5 100%);
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
        }

        .btn-back-home {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #5F7E6D;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.2s ease;
          width: fit-content;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .btn-back-home:hover {
          color: #3A5044;
          transform: translateX(-3px);
        }

        .illustration-content {
          text-align: center;
          margin: auto 0;
        }

        .illustration-img {
          max-width: 80%;
          max-height: 250px;
          object-fit: contain;
          margin-bottom: 25px;
          filter: drop-shadow(0 15px 25px rgba(95, 126, 109, 0.15));
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .illustration-title {
          font-size: 1.7rem;
          color: #3A5044;
          font-weight: 700;
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .illustration-subtitle {
          font-size: 0.95rem;
          color: #6E8779;
          line-height: 1.5;
          max-width: 320px;
          margin: 0 auto;
        }

        .login-form-side {
          flex: 0.9;
          padding: 50px 45px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: white;
        }

        .form-header {
          margin-bottom: 30px;
        }

        .brand-logo {
          color: #8DAA91;
          font-size: 1.3rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 15px;
        }

        .form-title {
          font-size: 1.8rem;
          color: #3A5044;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .form-subtitle {
          font-size: 0.9rem;
          color: #7A8F82;
          line-height: 1.4;
        }

        .input-group-custom {
          position: relative;
          margin-bottom: 18px;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #A0B2A6;
          font-size: 1rem;
          pointer-events: none;
          transition: color 0.2s ease;
        }

        .input-custom {
          width: 100%;
          padding: 14px 16px 14px 44px;
          border-radius: 14px;
          border: 1.5px solid #E2EAE5;
          font-size: 0.95rem;
          outline: none;
          background: #FAFAFA;
          color: #3A5044;
          box-sizing: border-box;
          transition: all 0.2s ease;
        }

        .input-custom:focus {
          border-color: #8DAA91;
          background: white;
          box-shadow: 0 0 0 4px rgba(141, 170, 145, 0.15);
        }

        .input-custom:focus + .input-icon {
          color: #5F7E6D;
        }

        .btn-toggle-password {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #A0B2A6;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          font-size: 1.1rem;
          transition: color 0.2s ease;
        }

        .btn-toggle-password:hover {
          color: #5F7E6D;
        }

        .btn-submit {
          width: 100%;
          padding: 14px;
          background: #5F7E6D;
          color: white;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          font-weight: 700;
          font-size: 1rem;
          margin-top: 10px;
          margin-bottom: 20px;
          transition: all 0.2s ease;
          box-shadow: 0 8px 20px rgba(95, 126, 109, 0.25);
        }

        .btn-submit:hover {
          background: #4B6456;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(95, 126, 109, 0.35);
        }

        .btn-submit:active {
          transform: translateY(0);
        }

        .btn-submit:disabled {
          background: #BDCBD0;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .links-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-align: center;
        }

        .link-item {
          color: #5F7E6D;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.2s ease;
          width: fit-content;
          margin: 0 auto;
        }

        .link-item:hover {
          color: #3A5044;
          text-decoration: underline;
        }

        .error-alert {
          color: #C0392B;
          background: #FDEDEC;
          border: 1px solid #FADBD8;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 0.85rem;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Responsive */
        @media (max-width: 992px) {
          .login-card-container {
            flex-direction: column;
            width: 450px;
            min-height: auto;
          }

          .login-illustration-side {
            display: none; /* Ocultar ilustración en móviles para dar foco al formulario */
          }

          .login-form-side {
            padding: 40px 30px;
          }
        }
      `}</style>

      <div className="login-wrapper">
        <div className="login-card-container">
          
          {/* Lado Izquierdo: Ilustración de Bienvenida */}
          <div className="login-illustration-side">
            <button className="btn-back-home" onClick={() => nav('/')}>
              <FaArrowLeft /> Volver al inicio
            </button>

            <div className="illustration-content">
              <img 
                src={loginIllustration} 
                alt="Adopción de mascotas" 
                className="illustration-img" 
              />
              <h4 className="illustration-title">Dale una segunda oportunidad a un amigo leal 🐾</h4>
              <p className="illustration-subtitle">
                Al ingresar podrás adoptar, dar hogar temporal y gestionar el bienestar de cientos de patitas en busca de amor.
              </p>
            </div>
            
            <div style={{ fontSize: '0.8rem', color: '#A0B2A6', textAlign: 'center' }}>
              AdoptApp &copy; {new Date().getFullYear()}
            </div>
          </div>

          {/* Lado Derecho: Formulario */}
          <div className="login-form-side">
            <div className="form-header">
              <span className="brand-logo">
                AdoptApp
              </span>
              <h2 className="form-title">¡Qué gusto verte!</h2>
              <p className="form-subtitle">
                Ingresa tus credenciales para continuar ayudando a encontrar hogares felices.
              </p>
            </div>

            {error && (
              <div className="error-alert">
                <span>⚠️ {error}</span>
              </div>
            )}

            {/* Email */}
            <div className="input-group-custom">
              <input
                className="input-custom"
                type="email"
                placeholder="Correo electrónico"
                value={form.correo}
                onChange={(e) => setForm({ ...form, correo: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleIngresar()}
              />
              <FaEnvelope className="input-icon" />
            </div>

            {/* Password */}
            <div className="input-group-custom">
              <input
                className="input-custom"
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                value={form.contrasena}
                onChange={(e) => setForm({ ...form, contrasena: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleIngresar()}
              />
              <FaLock className="input-icon" />
              <button
                type="button"
                className="btn-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Botón Ingresar */}
            <button
              className="btn-submit"
              onClick={handleIngresar}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                    style={{ marginRight: '8px' }}
                  ></span>
                  Iniciando sesión...
                </>
              ) : (
                'Ingresar'
              )}
            </button>

            {/* Links */}
            <div className="links-container">
              <a className="link-item" onClick={() => nav('/recuperar-contrasena')}>
                ¿Olvidaste tu contraseña?
              </a>
              <a className="link-item" onClick={() => nav('/registro')}>
                ¿No tienes cuenta? <strong>Regístrate aquí</strong>
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
