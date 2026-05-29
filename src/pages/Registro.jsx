import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import registerIllustration from '../assets/register-illustration.png';
import { 
  FaUser, FaCalendarAlt, FaPhone, FaMapMarkerAlt, 
  FaHome, FaInfoCircle, FaGlobe, FaHeart, FaEnvelope, 
  FaLock, FaEye, FaEyeSlash, FaArrowLeft 
} from 'react-icons/fa';

export default function Registro() {
  const nav = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const [step, setStep] = useState(1); // Paso 1 o Paso 2

  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    fechaNacimiento: '',
    correo: '',
    contrasena: '',
    confirmarContrasena: '',
    role: location.state?.role || 'USER', // 'USER' o 'HOSTEL'
    phone: '',
    address: '',

    // Campos exclusivos de Albergue (HOSTEL)
    hostelName: '',
    description: '',
    capacity: '',
    website: '',
    donationLink: '',
    logo: '',
  });

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRoleChange = (role) => {
    setForm((prev) => ({ ...prev, role }));
    setError('');
  };

  const handleNextStep = () => {
    setError('');

    if (form.role === 'USER') {
      if (!form.nombres || !form.apellidos || !form.fechaNacimiento) {
        const msg = 'Por favor, completa tus nombres, apellidos y fecha de nacimiento.';
        setError(msg);
        showToast(msg, 'warning');
        return;
      }
    } else if (form.role === 'HOSTEL') {
      if (!form.hostelName || !form.phone || !form.address) {
        const msg = 'Por favor, completa el nombre, teléfono y dirección física de tu albergue.';
        setError(msg);
        showToast(msg, 'warning');
        return;
      }
    }

    setStep(2);
  };

  const handleSubmit = () => {
    const { correo, contrasena, confirmarContrasena } = form;

    if (!correo || !contrasena || !confirmarContrasena) {
      const msg = 'Por favor, ingresa los campos obligatorios de acceso (correo y contraseña).';
      setError(msg);
      showToast(msg, 'warning');
      return;
    }

    if (contrasena !== confirmarContrasena) {
      const msg = 'Las contraseñas no coinciden.';
      setError(msg);
      showToast(msg, 'error');
      return;
    }

    // --- LÓGICA DE CÓDIGO ALEATORIO DE VERIFICACIÓN ---
    const codigoAleatorio = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    localStorage.setItem('temp_code', codigoAleatorio);
    localStorage.setItem('temp_correo', correo);

    showToast(`🐾 Código de verificación generado con éxito para ${correo}`, 'info');
    alert(`🐾 ¡AdoptApp!\nTu código de verificación es: ${codigoAleatorio}`);

    localStorage.setItem('temp_user', JSON.stringify(form));
    nav('/verificar-registro');
  };

  return (
    <>
      <style>{`
        .register-wrapper {
          min-height: calc(100vh - 85px);
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #F3F6F4 0%, #E7ECE8 100%);
          font-family: 'Outfit', 'Inter', 'Roboto', sans-serif;
          padding: 30px 20px;
          box-sizing: border-box;
        }

        .register-card-container {
          display: flex;
          width: 1050px;
          max-width: 100%;
          min-height: 550px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 30px;
          box-shadow: 0 20px 40px rgba(95, 126, 109, 0.08), 
                      0 1px 3px rgba(0, 0, 0, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.5);
          overflow: hidden;
        }

        .register-illustration-side {
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
          max-width: 75%;
          max-height: 230px;
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

        .register-form-side {
          flex: 1.2;
          padding: 45px 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: white;
          box-sizing: border-box;
        }

        .form-header {
          margin-bottom: 20px;
        }

        .brand-logo {
          color: #8DAA91;
          font-size: 1.3rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 8px;
        }

        .form-title {
          font-size: 1.8rem;
          color: #3A5044;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .form-subtitle {
          font-size: 0.9rem;
          color: #7A8F82;
          line-height: 1.4;
        }

        /* Step Indicator */
        .step-indicator-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 10px;
        }

        .step-dot {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #EAEFEA;
          color: #7A8F82;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .step-dot-active {
          background: #5F7E6D;
          color: white;
          box-shadow: 0 4px 10px rgba(95, 126, 109, 0.2);
        }

        .step-line {
          width: 50px;
          height: 2.5px;
          background: #EAEFEA;
          border-radius: 2px;
        }

        .step-label {
          text-align: center;
          font-size: 0.8rem;
          color: #7A8F82;
          font-weight: 600;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Tabs */
        .tab-container-custom {
          display: flex;
          background: #F1F4F2;
          border-radius: 14px;
          padding: 5px;
          margin-bottom: 20px;
        }

        .tab-btn-custom {
          flex: 1;
          padding: 12px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #7A8F82;
          border: none;
          background: transparent;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .tab-btn-custom-active {
          background: #5F7E6D;
          color: white;
          box-shadow: 0 4px 12px rgba(95, 126, 109, 0.15);
        }

        /* Inputs */
        .input-row-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .input-group-custom {
          position: relative;
          margin-bottom: 15px;
        }

        .input-label-custom {
          font-size: 0.8rem;
          color: #5F7E6D;
          margin-bottom: 4px;
          display: block;
          font-weight: 600;
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

        .has-label .input-icon {
          top: 67%;
        }

        .input-custom {
          width: 100%;
          padding: 13px 16px 13px 44px;
          border-radius: 14px;
          border: 1.5px solid #E2EAE5;
          font-size: 0.95rem;
          outline: none;
          background: #FAFAFA;
          color: #3A5044;
          box-sizing: border-box;
          transition: all 0.2s ease;
        }

        .textarea-custom {
          width: 100%;
          padding: 13px 16px 13px 44px;
          border-radius: 14px;
          border: 1.5px solid #E2EAE5;
          font-size: 0.95rem;
          outline: none;
          background: #FAFAFA;
          color: #3A5044;
          box-sizing: border-box;
          height: 80px;
          resize: none;
          transition: all 0.2s ease;
        }

        .input-custom:focus, .textarea-custom:focus {
          border-color: #8DAA91;
          background: white;
          box-shadow: 0 0 0 4px rgba(141, 170, 145, 0.15);
        }

        .input-custom:focus + .input-icon, .textarea-custom:focus + .input-icon {
          color: #5F7E6D;
        }

        input[type="date"].input-custom {
          padding-right: 12px;
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

        /* Buttons custom */
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
          box-shadow: 0 8px 20px rgba(95, 126, 109, 0.2);
        }

        .btn-submit:hover {
          background: #4B6456;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(95, 126, 109, 0.3);
        }

        .btn-submit:active {
          transform: translateY(0);
        }

        .btn-flex-group {
          display: flex;
          gap: 15px;
          margin-top: 10px;
          margin-bottom: 20px;
        }

        .btn-back-step {
          flex: 0.8;
          padding: 14px;
          background: transparent;
          border: 1.5px solid #5F7E6D;
          color: #5F7E6D;
          border-radius: 14px;
          cursor: pointer;
          font-weight: 700;
          font-size: 1rem;
          transition: all 0.2s ease;
        }

        .btn-back-step:hover {
          background: rgba(95, 126, 109, 0.06);
          color: #3A5044;
          border-color: #3A5044;
        }

        .btn-submit-step {
          flex: 1.2;
          padding: 14px;
          background: #5F7E6D;
          color: white;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          font-weight: 700;
          font-size: 1rem;
          transition: all 0.2s ease;
          box-shadow: 0 8px 20px rgba(95, 126, 109, 0.2);
        }

        .btn-submit-step:hover {
          background: #4B6456;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(95, 126, 109, 0.3);
        }

        .btn-submit-step:active {
          transform: translateY(0);
        }

        .link-footer {
          text-align: center;
          color: #5F7E6D;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .link-footer:hover {
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
          .register-card-container {
            flex-direction: column;
            width: 450px;
            min-height: auto;
          }

          .register-illustration-side {
            display: none;
          }

          .register-form-side {
            padding: 40px 30px;
          }

          .input-row-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }
      `}</style>

      <div className="register-wrapper">
        <div className="register-card-container">
          
          {/* Lado Izquierdo: Ilustración y Título */}
          <div className="register-illustration-side">
            <button className="btn-back-home" onClick={() => nav('/')}>
              <FaArrowLeft /> Volver al inicio
            </button>

            <div className="illustration-content">
              <img 
                src={registerIllustration} 
                alt="Adopción y albergue" 
                className="illustration-img" 
              />
              <h4 className="illustration-title">Únete a la comunidad de AdoptApp 🐾</h4>
              <p className="illustration-subtitle">
                Crea tu perfil y ayuda a conectar vidas de cuatro patas con personas llenas de amor para dar.
              </p>
            </div>
            
            <div style={{ fontSize: '0.8rem', color: '#A0B2A6', textAlign: 'center' }}>
              AdoptApp &copy; {new Date().getFullYear()}
            </div>
          </div>

          {/* Lado Derecho: Formulario de Registro Multietapa */}
          <div className="register-form-side">
            <div className="form-header">
              <span className="brand-logo">
                AdoptApp
              </span>
              <h2 className="form-title">Crea tu cuenta</h2>
              <p className="form-subtitle">
                Por favor completa los datos para registrarte.
              </p>
            </div>

            {/* Indicador de Pasos */}
            <div className="step-indicator-container">
              <div className={`step-dot ${step >= 1 ? 'step-dot-active' : ''}`}>1</div>
              <div className="step-line"></div>
              <div className={`step-dot ${step >= 2 ? 'step-dot-active' : ''}`}>2</div>
            </div>
            <div className="step-label">
              {step === 1 ? 'Paso 1: Información de perfil' : 'Paso 2: Credenciales de acceso'}
            </div>

            {error && (
              <div className="error-alert">
                <span>⚠️ {error}</span>
              </div>
            )}

            {/* ==================== PASO 1 ==================== */}
            {step === 1 && (
              <>
                {/* Selector de tipo de perfil */}
                <div className="tab-container-custom">
                  <button
                    type="button"
                    className={`tab-btn-custom ${form.role === 'USER' ? 'tab-btn-custom-active' : ''}`}
                    onClick={() => handleRoleChange('USER')}
                  >
                    🐾 Adoptante
                  </button>
                  <button
                    type="button"
                    className={`tab-btn-custom ${form.role === 'HOSTEL' ? 'tab-btn-custom-active' : ''}`}
                    onClick={() => handleRoleChange('HOSTEL')}
                  >
                    🏠 Albergue
                  </button>
                </div>

                {/* Campos de Adoptante */}
                {form.role === 'USER' && (
                  <>
                    <div className="input-row-grid">
                      <div className="input-group-custom">
                        <input
                          className="input-custom"
                          placeholder="Nombres"
                          value={form.nombres}
                          onChange={(e) => setForm({ ...form, nombres: e.target.value })}
                        />
                        <FaUser className="input-icon" />
                      </div>
                      <div className="input-group-custom">
                        <input
                          className="input-custom"
                          placeholder="Apellidos"
                          value={form.apellidos}
                          onChange={(e) => setForm({ ...form, apellidos: e.target.value })}
                        />
                        <FaUser className="input-icon" />
                      </div>
                    </div>

                    <div className="input-group-custom has-label">
                      <label className="input-label-custom">Fecha de nacimiento</label>
                      <input
                        className="input-custom"
                        type="date"
                        value={form.fechaNacimiento}
                        onChange={(e) => setForm({ ...form, fechaNacimiento: e.target.value })}
                      />
                      <FaCalendarAlt className="input-icon" />
                    </div>

                    <div className="input-row-grid">
                      <div className="input-group-custom">
                        <input
                          className="input-custom"
                          placeholder="Teléfono (opcional)"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                        <FaPhone className="input-icon" />
                      </div>
                      <div className="input-group-custom">
                        <input
                          className="input-custom"
                          placeholder="Dirección (opcional)"
                          value={form.address}
                          onChange={(e) => setForm({ ...form, address: e.target.value })}
                        />
                        <FaMapMarkerAlt className="input-icon" />
                      </div>
                    </div>
                  </>
                )}

                {/* Campos de Albergue */}
                {form.role === 'HOSTEL' && (
                  <>
                    <div className="input-group-custom">
                      <input
                        className="input-custom"
                        placeholder="Nombre del albergue"
                        value={form.hostelName}
                        onChange={(e) => setForm({ ...form, hostelName: e.target.value })}
                      />
                      <FaHome className="input-icon" />
                    </div>

                    <div className="input-row-grid">
                      <div className="input-group-custom">
                        <input
                          className="input-custom"
                          placeholder="Teléfono de contacto"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                        <FaPhone className="input-icon" />
                      </div>
                      <div className="input-group-custom">
                        <input
                          className="input-custom"
                          placeholder="Dirección física"
                          value={form.address}
                          onChange={(e) => setForm({ ...form, address: e.target.value })}
                        />
                        <FaMapMarkerAlt className="input-icon" />
                      </div>
                    </div>

                    <div className="input-group-custom">
                      <textarea
                        className="textarea-custom"
                        placeholder="Descripción o historia del albergue..."
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                      />
                      <FaInfoCircle className="input-icon" style={{ top: '22px', transform: 'none' }} />
                    </div>

                    <div className="input-group-custom">
                      <input
                        className="input-custom"
                        type="number"
                        placeholder="Capacidad máxima de mascotas (ej. 40)"
                        value={form.capacity}
                        onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                      />
                      <FaHome className="input-icon" />
                    </div>

                    <div className="input-row-grid">
                      <div className="input-group-custom">
                        <input
                          className="input-custom"
                          placeholder="Sitio Web (opcional)"
                          value={form.website}
                          onChange={(e) => setForm({ ...form, website: e.target.value })}
                        />
                        <FaGlobe className="input-icon" />
                      </div>
                      <div className="input-group-custom">
                        <input
                          className="input-custom"
                          placeholder="Enlace para donaciones (opcional)"
                          value={form.donationLink}
                          onChange={(e) => setForm({ ...form, donationLink: e.target.value })}
                        />
                        <FaHeart className="input-icon" />
                      </div>
                    </div>
                  </>
                )}

                <button className="btn-submit" onClick={handleNextStep}>
                  Siguiente Paso ➔
                </button>
              </>
            )}

            {/* ==================== PASO 2 ==================== */}
            {step === 2 && (
              <>
                <div className="input-group-custom">
                  <input
                    className="input-custom"
                    type="email"
                    placeholder="Correo electrónico de acceso"
                    value={form.correo}
                    onChange={(e) => setForm({ ...form, correo: e.target.value })}
                  />
                  <FaEnvelope className="input-icon" />
                </div>

                <div className="input-group-custom">
                  <input
                    className="input-custom"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Contraseña"
                    value={form.contrasena}
                    onChange={(e) => setForm({ ...form, contrasena: e.target.value })}
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

                <div className="input-group-custom">
                  <input
                    className="input-custom"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirmar contraseña"
                    value={form.confirmarContrasena}
                    onChange={(e) => setForm({ ...form, confirmarContrasena: e.target.value })}
                  />
                  <FaLock className="input-icon" />
                  <button
                    type="button"
                    className="btn-toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex="-1"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <div className="btn-flex-group">
                  <button type="button" className="btn-back-step" onClick={() => setStep(1)}>
                    ⬅ Anterior
                  </button>
                  <button type="button" className="btn-submit-step" onClick={handleSubmit}>
                    Registrarse 🐾
                  </button>
                </div>
              </>
            )}

            <a className="link-footer" onClick={() => nav('/login')}>
              ¿Ya tienes cuenta? <strong>Inicia sesión</strong>
            </a>
          </div>

        </div>
      </div>
    </>
  );
}
