import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/authStore';
import {
  MdPerson,
  MdBadge,
  MdCalendarToday,
  MdMail,
  MdLocationOn,
  MdVerifiedUser,
  MdPhotoCamera,
  MdCheckCircle,
} from 'react-icons/md';
import './Profile.css';

import DEFAULT_AVATAR from '../../assets/default-avatar.png';

// ── Vista de Perfil ──────────────────────────────────────
const ProfileView = ({ profile, onEdit }) => {
  const formatDate = (iso) => {
    if (!iso) return 'No especificada';
    const parts = iso.split('-');
    if (parts.length !== 3) return iso;
    const [year, month, day] = parts;
    const months = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ];
    return `${parseInt(day, 10)} de ${months[parseInt(month, 10) - 1]} de ${year}`;
  };

  return (
    <div className="container-fluid p-0">
      <div className="profile-card d-flex flex-column flex-md-row align-items-center gap-4 mb-4">
        <div className="avatar-container">
          <img
            src={profile.avatar || DEFAULT_AVATAR}
            alt="Avatar"
            className="avatar-img"
          />
          <div className="verified-badge">
            <MdVerifiedUser size={20} />
          </div>
        </div>

        <div className="text-center text-md-start">
          <h1 className="fw-bold mb-1">
            {profile.names} {profile.surnames}
          </h1>
          <p className="text-muted mb-4">
            <MdLocationOn size={20} className="me-1" />
            Lima, Perú
          </p>
          <button className="btn btn-yellow" onClick={onEdit}>
            Editar perfil
          </button>
        </div>
      </div>

      <div className="row g-4">
        {[
          { label: 'Nombres', value: profile.names, Icon: MdPerson },
          { label: 'Apellidos', value: profile.surnames, Icon: MdBadge },
          {
            label: 'Fecha de nacimiento',
            value: formatDate(profile.birthday),
            Icon: MdCalendarToday,
          },
          { label: 'Correo electrónico', value: profile.email, Icon: MdMail },
        ].map(({ label, value, Icon }, idx) => (
          <div key={idx} className="col-12 col-md-6">
            <div className="info-card">
              <div className="text-muted small fw-bold text-uppercase mb-1">
                <Icon className="me-2" /> {label}
              </div>
              <div className="fs-5 fw-medium">{value || '---'}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Vista de Edición ─────────────────────────────────────
const EditView = ({ profile, onSave, onCancel }) => {
  const [form, setForm] = useState({ ...profile });
  const fileInputRef = useRef(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm({ ...form, avatar: reader.result });
    reader.readAsDataURL(file);
  };

  return (
    <div className="container-fluid p-0">
      <div className="profile-card d-flex flex-column flex-md-row align-items-center gap-4 mb-4">
        <div className="avatar-container">
          <img
            src={form.avatar || DEFAULT_AVATAR}
            alt="Avatar"
            className="avatar-img"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="d-none"
            onChange={handleAvatarChange}
          />
          <button
            className="camera-btn"
            onClick={() => fileInputRef.current.click()}
          >
            <MdPhotoCamera size={22} />
          </button>
        </div>
        <div className="text-center text-md-start">
          <h1 className="fw-bold mb-3">Editando Perfil</h1>
          <div className="d-flex gap-2">
            <button className="btn btn-yellow" onClick={() => onSave(form)}>
              Guardar
            </button>
            <button className="btn btn-cancel" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {[
          { id: 'names', label: 'Nombres', type: 'text', Icon: MdPerson },
          { id: 'surnames', label: 'Apellidos', type: 'text', Icon: MdBadge },
          {
            id: 'birthday',
            label: 'Fecha de nacimiento',
            type: 'date',
            Icon: MdCalendarToday,
          },
        ].map(({ id, label, type, Icon }) => (
          <div key={id} className="col-12 col-md-6">
            <div className="form-container">
              <label className="text-muted small fw-bold mb-2">
                <Icon className="me-2" /> {label}
              </label>
              <input
                type={type}
                className="form-control"
                value={form[id] || ''}
                onChange={(e) => setForm({ ...form, [id]: e.target.value })}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Componente Principal ─────────────────────────────────
const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const profileData = {
    names: user?.nombres || '',
    surnames: user?.apellidos || '',
    birthday: user?.fechaNacimiento || '',
    email: user?.correo || '',
    avatar: user?.avatar || null,
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleSave = (data) => {
    updateUser({
      nombres: data.names,
      apellidos: data.surnames,
      fechaNacimiento: data.birthday,
      avatar: data.avatar,
    });
    setIsEditing(false);
    setShowToast(true);
  };

  return (
    <div className="profile-page-container">
      {showToast && (
        <div className="save-toast">
          <MdCheckCircle className="me-2" /> ¡Cambios guardados con éxito!
        </div>
      )}
      <main style={{ maxWidth: '900px', margin: '0 auto' }}>
        {isEditing ? (
          <EditView
            profile={profileData}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <ProfileView
            profile={profileData}
            onEdit={() => setIsEditing(true)}
          />
        )}
      </main>
    </div>
  );
};

export default Profile;
