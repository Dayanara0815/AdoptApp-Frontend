import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Registro() {
  const nav = useNavigate();
  const location = useLocation();

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

  // Estados de hover para interactividad premium
  const [hoverBtn, setHoverBtn] = useState(false);

  const handleRoleChange = (role) => {
    setForm((prev) => ({ ...prev, role }));
    setError('');
  };

  const handleSubmit = () => {
    const { correo, contrasena, confirmarContrasena, role } = form;

    if (!correo || !contrasena || !confirmarContrasena) {
      setError('Por favor, ingresa los campos obligatorios de acceso (correo y contraseña).');
      return;
    }

    if (contrasena !== confirmarContrasena) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (role === 'USER') {
      if (!form.nombres || !form.apellidos || !form.fechaNacimiento) {
        setError('Por favor, completa tus nombres, apellidos y fecha de nacimiento.');
        return;
      }
    } else if (role === 'HOSTEL') {
      if (!form.hostelName || !form.phone || !form.address) {
        setError('Por favor, completa el nombre, teléfono y dirección física de tu albergue.');
        return;
      }
    }

    // --- LÓGICA DE CÓDIGO ALEATORIO DE VERIFICACIÓN ---
    const codigoAleatorio = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Guardamos el código de forma segura en localStorage
    localStorage.setItem('temp_code', codigoAleatorio);
    localStorage.setItem('temp_correo', correo);

    // Ventana emergente premium simulada
    alert(`🐾 ¡AdoptApp!\nTu código de verificación es: ${codigoAleatorio}`);

    // Guardamos los datos completos del registro de forma temporal
    localStorage.setItem('temp_user', JSON.stringify(form));

    nav('/verificar-registro');
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.card}>
          <h3 style={styles.title}>Registrarse</h3>

          {/* Selector de tipo de perfil */}
          <div style={styles.tabContainer}>
            <button
              type="button"
              style={{
                ...styles.tabButton,
                ...(form.role === 'USER' ? styles.tabButtonActive : {}),
              }}
              onClick={() => handleRoleChange('USER')}
            >
              🐾 Adoptante
            </button>
            <button
              type="button"
              style={{
                ...styles.tabButton,
                ...(form.role === 'HOSTEL' ? styles.tabButtonActive : {}),
              }}
              onClick={() => handleRoleChange('HOSTEL')}
            >
              🏠 Albergue
            </button>
          </div>

          <p style={styles.subtitle}>
            {form.role === 'USER'
              ? 'Únete para adoptar o publicar casos de rescate'
              : 'Registra tu albergue y publica tus mascotas en adopción'}
          </p>

          {error && <p style={styles.error}>{error}</p>}

          {/* --- CAMPOS EXCLUSIVOS: ADOPTANTE --- */}
          {form.role === 'USER' && (
            <>
              <input
                style={styles.input}
                placeholder="Nombres"
                value={form.nombres}
                onChange={(e) => setForm({ ...form, nombres: e.target.value })}
              />
              <input
                style={styles.input}
                placeholder="Apellidos"
                value={form.apellidos}
                onChange={(e) => setForm({ ...form, apellidos: e.target.value })}
              />
              <label style={styles.label}>Fecha de nacimiento</label>
              <input
                style={styles.input}
                type="date"
                value={form.fechaNacimiento}
                onChange={(e) =>
                  setForm({ ...form, fechaNacimiento: e.target.value })
                }
              />
              <input
                style={styles.input}
                placeholder="Teléfono (opcional)"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <input
                style={styles.input}
                placeholder="Dirección (opcional)"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </>
          )}

          {/* --- CAMPOS EXCLUSIVOS: ALBERGUE --- */}
          {form.role === 'HOSTEL' && (
            <>
              <input
                style={styles.input}
                placeholder="Nombre del albergue"
                value={form.hostelName}
                onChange={(e) => setForm({ ...form, hostelName: e.target.value })}
              />
              <input
                style={styles.input}
                placeholder="Teléfono de contacto"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <input
                style={styles.input}
                placeholder="Dirección física"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
              <textarea
                style={{ ...styles.input, height: '80px', resize: 'none' }}
                placeholder="Descripción o historia del albergue..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              <input
                style={styles.input}
                type="number"
                placeholder="Capacidad máxima de mascotas (ej. 40)"
                value={form.capacity}
                onChange={(e) => setForm({ ...form, capacity: e.target.value })}
              />
              <input
                style={styles.input}
                placeholder="Sitio Web (opcional)"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
              />
              <input
                style={styles.input}
                placeholder="Enlace para donaciones (opcional)"
                value={form.donationLink}
                onChange={(e) => setForm({ ...form, donationLink: e.target.value })}
              />
            </>
          )}

          {/* --- CAMPOS COMUNES DE ACCESO --- */}
          <hr style={{ borderColor: '#E0E7E2', margin: '15px 0' }} />
          <input
            style={styles.input}
            type="email"
            placeholder="Correo electrónico de acceso"
            value={form.correo}
            onChange={(e) => setForm({ ...form, correo: e.target.value })}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Contraseña"
            value={form.contrasena}
            onChange={(e) => setForm({ ...form, contrasena: e.target.value })}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Confirmar contraseña"
            value={form.confirmarContrasena}
            onChange={(e) =>
              setForm({ ...form, confirmarContrasena: e.target.value })
            }
          />

          <button
            style={{
              ...styles.btn,
              ...(hoverBtn ? styles.btnHover : {}),
            }}
            onClick={handleSubmit}
            onMouseEnter={() => setHoverBtn(true)}
            onMouseLeave={() => setHoverBtn(false)}
          >
            Registrarse
          </button>

          <p style={styles.link} onClick={() => nav('/login')}>
            ¿Ya tienes cuenta? <b>Inicia sesión</b>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    paddingTop: '90px',
    paddingBottom: '60px',
    background: 'linear-gradient(135deg, #F3F6F4 0%, #E7ECE8 100%)',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    fontFamily: "'Inter', 'Roboto', sans-serif",
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'transparent',
    width: '100%',
  },
  card: {
    background: 'white',
    padding: '2.5rem',
    borderRadius: '24px',
    boxShadow: '0 8px 32px rgba(95, 126, 109, 0.08)',
    width: '420px',
  },
  title: {
    textAlign: 'center',
    color: '#5F7E6D',
    fontSize: '1.4rem',
    fontWeight: '600',
    marginBottom: '1rem',
  },
  subtitle: {
    textAlign: 'center',
    color: '#7A8F82',
    fontSize: '0.9rem',
    marginBottom: '1.5rem',
  },
  tabContainer: {
    display: 'flex',
    background: '#EAEFEA',
    borderRadius: '12px',
    padding: '4px',
    marginBottom: '1rem',
  },
  tabButton: {
    flex: 1,
    padding: '10px',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#7A8F82',
    border: 'none',
    background: 'transparent',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  tabButtonActive: {
    background: '#8DAA91',
    color: 'white',
    boxShadow: '0 2px 6px rgba(141, 170, 145, 0.2)',
  },
  label: {
    fontSize: '0.85rem',
    color: '#5F7E6D',
    marginBottom: '6px',
    display: 'block',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    marginBottom: '14px',
    borderRadius: '12px',
    border: '1.5px solid #e0e0e0',
    fontSize: '0.95rem',
    outline: 'none',
    background: '#FAFAFA',
  },
  btn: {
    width: '100%',
    padding: '13px',
    background: '#8DAA91',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '1rem',
    marginBottom: '1rem',
    transition: 'all 0.2s ease',
  },
  btnHover: {
    background: '#799A7D',
  },
  link: {
    textAlign: 'center',
    marginTop: '0.6rem',
    color: '#5F7E6D',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  error: {
    color: '#C0392B',
    textAlign: 'center',
    marginBottom: '15px',
    fontSize: '0.85rem',
    background: '#FDEDEC',
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid #FADBD8',
  },
};
