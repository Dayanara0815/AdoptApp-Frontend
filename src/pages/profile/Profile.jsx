import { useState, useEffect } from 'react';
import {
  MdPerson,
  MdBadge,
  MdCalendarToday,
  MdMail,
  MdLocationOn,
  MdVerifiedUser,
  MdSettings,
  MdPhotoCamera,
  MdCheckCircle,
  MdHome,
  MdPets,
  MdFavorite,
} from 'react-icons/md';
import './Profile.css';

/* =========================================================
   Profile.jsx — Vista de Perfil + Vista de Edición
   Usa react-icons/md (paquete local, sin CDN)
   ========================================================= */

// ── Navbar ───────────────────────────────────────────────
const Navbar = () => (
  <nav className="navbar navbar-expand-md fixed-top py-3 shadow-sm profile-navbar">
    <div className="container-fluid px-4">

      {/* Logo — izquierda */}
      <a
        className="navbar-brand fw-bold fs-3"
        href="#"
        style={{ color: '#4a654f', letterSpacing: '-1px' }}
      >
        AdoptApp
      </a>

      {/* Toggler móvil */}
      <button
        className="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#profileNavbar"
        aria-controls="profileNavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      {/* Links centrados */}
      <div className="collapse navbar-collapse" id="profileNavbar">
        <ul className="navbar-nav mx-auto gap-4">
          <li className="nav-item"><a className="nav-link-custom" href="#">Sanctuary</a></li>
          <li className="nav-item"><a className="nav-link-custom" href="#">Journal</a></li>
          <li className="nav-item"><a className="nav-link-custom" href="#">Adoption</a></li>
        </ul>
      </div>

      {/* Settings + Avatar — derecha */}
      <div className="d-none d-md-flex align-items-center gap-3 ms-auto">
        <button className="btn p-2 rounded-circle border-0">
          <MdSettings size={24} color="#4a654f" />
        </button>
        <div
          className="rounded-circle overflow-hidden border border-2 border-success-subtle"
          style={{ width: '40px', height: '40px', flexShrink: 0 }}
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKVVaYC1Q-rIuv5hWFLOuBS-jDE-drQJak8AyM7s_jTpwL3NZKflfCC-BPybZwLaYfonNGm-7HdQ5DdkK5JYXsT-Qn23igQlIHx32XH9EEXXhg4h8SjIgQmLSJSs1iIOTbLR0U4sxohpxqGWdO78wIDnPR-eu4F0bCVQJv1fnLIEdZGDdCGFJ5PqUdBkIUv3spYIemf-2XNR29jEJR7NCy4j_u1bbEc3ZMWFsF3t3_dL-67ttCtSWcGMEx5hmILdh8tG-HirJSOuVP"
            alt="User"
            className="w-100 h-100 object-fit-cover"
          />
        </div>
      </div>

    </div>
  </nav>
);

// ── Bottom Nav (móvil) ───────────────────────────────────
const BottomNav = () => (
  <nav className="bottom-nav d-md-none d-flex justify-content-around align-items-center">
    <a href="#" className="bottom-nav-item d-flex flex-column align-items-center gap-1">
      <MdHome size={26} />
      <span>Home</span>
    </a>
    <a href="#" className="bottom-nav-item d-flex flex-column align-items-center gap-1">
      <MdPets size={26} />
      <span>Adopt</span>
    </a>
    <a href="#" className="bottom-nav-item d-flex flex-column align-items-center gap-1">
      <MdFavorite size={26} />
      <span>Match</span>
    </a>
    <a href="#" className="bottom-nav-item active d-flex flex-column align-items-center gap-1">
      <MdPerson size={26} />
      <span>Profile</span>
    </a>
  </nav>
);

// ── Vista de Perfil ──────────────────────────────────────
const ProfileView = ({ profile, onEdit }) => {
  const formatDate = (iso) => {
    if (!iso) return '';
    const [year, month, day] = iso.split('-');
    const months = [
      'enero','febrero','marzo','abril','mayo','junio',
      'julio','agosto','septiembre','octubre','noviembre','diciembre',
    ];
    return `${parseInt(day, 10)} de ${months[parseInt(month, 10) - 1]} de ${year}`;
  };

  const infoCards = [
    { label: 'Nombres',             value: profile.names,              Icon: MdPerson        },
    { label: 'Apellidos',           value: profile.surnames,           Icon: MdBadge         },
    { label: 'Fecha de nacimiento', value: formatDate(profile.birthday), Icon: MdCalendarToday },
    { label: 'Correo electrónico',  value: profile.email,              Icon: MdMail          },
  ];

  return (
    <>
      {/* Cabecera */}
      <header className="profile-card d-flex flex-column flex-md-row align-items-center gap-4 mb-4">
        <div className="avatar-container">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBafTqsLF9gISd5L5HGf9pQ-TKr3ZDc22PTX4iIReqc2NbOgi2Qrr0IKkpqfcUEIE-8RsmEVC8qJslIod_RV_3euJekryQCiqA8-xNHD6pGDvZGnVHxvtf8uN1xxDgt85abTDy-3HNuHNBxHFG31tX3Vl353IK2kmTyuXS4z23zB66h_71kIN7Yb9sU4GF7OZkwP7TVA80iSxMFdFqLgA56m1tbsl7hatA3kee7iZVU6FzI122Zshor5CRdzf0uBgp1gLFlO4Cih5wC"
            alt="Elena Rossi"
            className="avatar-img"
          />
          <div className="verified-badge">
            <MdVerifiedUser size={20} color="white" />
          </div>
        </div>

        <div className="text-center text-md-start flex-grow-1">
          <h1 className="display-5 fw-bold mb-1">
            {profile.names} {profile.surnames}
          </h1>
          <p className="text-secondary mb-4 d-flex align-items-center gap-1 justify-content-center justify-content-md-start">
            <MdLocationOn size={20} color="#4a654f" />
            Barcelona, España
          </p>
          <button className="btn btn-yellow" onClick={onEdit}>
            Editar perfil
          </button>
        </div>
      </header>

      {/* Tarjetas de información */}
      <div className="row g-4">
        {infoCards.map(({ label, value, Icon }, idx) => (
          <div key={idx} className="col-12 col-md-6">
            <div className="info-card">
              <div className="d-flex align-items-center gap-2 mb-2">
                <Icon size={20} color="#4a654f" style={{ opacity: 0.8 }} />
                <span className="text-label">{label}</span>
              </div>
              <div className="fs-5 fw-medium">{value}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

// ── Vista de Edición ─────────────────────────────────────
const EditView = ({ profile, onSave, onCancel }) => {
  const [form, setForm] = useState({ ...profile });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const fields = [
    { id: 'names',    label: 'Nombres',              type: 'text',  Icon: MdPerson,        disabled: false },
    { id: 'surnames', label: 'Apellidos',             type: 'text',  Icon: MdBadge,         disabled: false },
    { id: 'birthday', label: 'Fecha de nacimiento',  type: 'date',  Icon: MdCalendarToday, disabled: false },
    { id: 'email',    label: 'Correo electrónico',   type: 'email', Icon: MdMail,          disabled: true  },
  ];

  return (
    <>
      {/* Cabecera */}
      <header className="profile-card d-flex flex-column flex-md-row align-items-center gap-4 mb-4 text-center text-md-start">
        <div className="avatar-container">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBafTqsLF9gISd5L5HGf9pQ-TKr3ZDc22PTX4iIReqc2NbOgi2Qrr0IKkpqfcUEIE-8RsmEVC8qJslIod_RV_3euJekryQCiqA8-xNHD6pGDvZGnVHxvtf8uN1xxDgt85abTDy-3HNuHNBxHFG31tX3Vl353IK2kmTyuXS4z23zB66h_71kIN7Yb9sU4GF7OZkwP7TVA80iSxMFdFqLgA56m1tbsl7hatA3kee7iZVU6FzI122Zshor5CRdzf0uBgp1gLFlO4Cih5wC"
            alt="Elena Rossi"
            className="avatar-img"
          />
          <button className="camera-btn" type="button" aria-label="Cambiar foto">
            <MdPhotoCamera size={22} color="white" />
          </button>
        </div>

        <div className="flex-grow-1">
          <h1 className="display-5 fw-bold mb-1">
            {form.names} {form.surnames}
          </h1>
          <p className="text-secondary mb-4 d-flex align-items-center gap-1 justify-content-center justify-content-md-start">
            <MdLocationOn size={20} color="#4a654f" />
            Barcelona, España
          </p>
          <div className="d-flex gap-3 justify-content-center justify-content-md-start flex-wrap">
            <button className="btn btn-yellow" onClick={() => onSave(form)}>
              Guardar cambios
            </button>
            <button className="btn btn-cancel" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </div>
      </header>

      {/* Formulario */}
      <section className="row g-4">
        {fields.map(({ id, label, type, Icon, disabled }) => (
          <div key={id} className="col-12 col-md-6">
            <div className="form-container" style={disabled ? { backgroundColor: '#fdfdfd' } : {}}>
              <label
                htmlFor={id}
                className={`d-flex align-items-center gap-2 mb-2 text-muted small fw-bold text-uppercase${disabled ? ' opacity-50' : ''}`}
              >
                <Icon size={18} />
                {label}
              </label>
              <div className="input-group-custom" style={disabled ? { backgroundColor: '#f1f1f1' } : {}}>
                <input
                  type={type}
                  id={id}
                  className={`form-control form-control-custom w-100${disabled ? ' text-muted fst-italic' : ''}`}
                  value={form[id]}
                  onChange={disabled ? undefined : handleChange}
                  disabled={disabled}
                />
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

// ── Componente Principal ─────────────────────────────────
const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [profile, setProfile] = useState({
    names: 'Elena Maria',
    surnames: 'Rossi Martinez',
    birthday: '1992-05-14',
    email: 'elena.rossi@example.com',
  });

  useEffect(() => {
    if (!showToast) return;
    const timer = setTimeout(() => setShowToast(false), 2600);
    return () => clearTimeout(timer);
  }, [showToast]);

  const handleSave = (updatedProfile) => {
    setProfile(updatedProfile);
    setIsEditing(false);
    setShowToast(true);
  };

  return (
    <div className="profile-page">
      <Navbar />

      {/* Toast de confirmación */}
      {showToast && (
        <div className="save-toast" role="alert" aria-live="polite">
          <MdCheckCircle size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          ¡Cambios guardados!
        </div>
      )}

      <main
        className="container-fluid px-4 py-5"
        style={{ marginTop: '80px', marginBottom: '100px', maxWidth: '960px', margin: '80px auto 100px' }}
      >
        {isEditing
          ? <EditView profile={profile} onSave={handleSave} onCancel={() => setIsEditing(false)} />
          : <ProfileView profile={profile} onEdit={() => setIsEditing(true)} />
        }
      </main>

      <BottomNav />
    </div>
  );
};

export default Profile;
