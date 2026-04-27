import { useState, useEffect, useRef } from 'react';
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
import Navbar from '../../components/landing/Navbar';
import Footer from '../../components/landing/Footer';

/* =========================================================
   Profile.jsx — Vista de Perfil + Vista de Edición
   Usa react-icons/md (paquete local, sin CDN)
   ========================================================= */


// ── Vista de Perfil ──────────────────────────────────────
const ProfileView = ({ profile, onEdit }) => {
  const formatDate = (iso) => {
    if (!iso) return '';
    const [year, month, day] = iso.split('-');
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
    ];
    return `${parseInt(day, 10)} de ${months[parseInt(month, 10) - 1]} de ${year}`;
  };

  const infoCards = [
    { label: 'Nombres', value: profile.names, Icon: MdPerson },
    { label: 'Apellidos', value: profile.surnames, Icon: MdBadge },
    { label: 'Fecha de nacimiento', value: formatDate(profile.birthday), Icon: MdCalendarToday },
    { label: 'Correo electrónico', value: profile.email, Icon: MdMail },
  ];

  return (
    <>
      {/* Cabecera */}
      <Navbar />
      <header className="profile-card d-flex flex-column flex-md-row align-items-center gap-4 mb-4">
        <div className="avatar-container">
          <img
            src={profile.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBafTqsLF9gISd5L5HGf9pQ-TKr3ZDc22PTX4iIReqc2NbOgi2Qrr0IKkpqfcUEIE-8RsmEVC8qJslIod_RV_3euJekryQCiqA8-xNHD6pGDvZGnVHxvtf8uN1xxDgt85abTDy-3HNuHNBxHFG31tX3Vl353IK2kmTyuXS4z23zB66h_71kIN7Yb9sU4GF7OZkwP7TVA80iSxMFdFqLgA56m1tbsl7hatA3kee7iZVU6FzI122Zshor5CRdzf0uBgp1gLFlO4Cih5wC'}
            alt="Avatar"
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
      <Footer />
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
    avatar: null,
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

      {/* Toast de confirmación */}
      {showToast && (
        <div className="save-toast" role="alert" aria-live="polite">
          <MdCheckCircle size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          ¡Cambios guardados!
        </div>
      )}

      <main
        className="container-fluid px-4 py-5"
        style={{ marginTop: '80px', maxWidth: '960px', margin: '80px auto 0' }}
      >
        {isEditing
          ? <EditView profile={profile} onSave={handleSave} onCancel={() => setIsEditing(false)} />
          : <ProfileView profile={profile} onEdit={() => setIsEditing(true)} />
        }
      </main>

    </div>
  );
};

export default Profile;
