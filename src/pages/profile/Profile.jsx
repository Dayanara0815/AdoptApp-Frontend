import { useState, useRef } from 'react';
import { useSession } from '../../context/SessionContext';
import { useToast } from '../../context/ToastContext';
import AvatarInitials from '../../components/AvatarInitials';
import { useAuthMutations } from '../../hooks/useAuthMutations';
import { useUploadFile } from '../../hooks/useUploadFile';
import { formatDate, formatMonthYear } from '../../lib';
import { getPetImageUrl } from '../../lib';
import Button from '../../components/Button';
import {
  MdPerson,
  MdMail,
  MdLocationOn,
  MdVerifiedUser,
  MdPhotoCamera,
  MdPhone,
  MdStore,
  MdDescription,
  MdPeople,
  MdLanguage,
  MdAttachMoney,
} from 'react-icons/md';
import './Profile.css';

import DEFAULT_AVATAR from '../../assets/default-avatar.png';

// ── Vista de Perfil ──────────────────────────────────────
const ProfileView = ({ profile, onEdit }) => {
  const isHostel = profile.role?.toUpperCase() === 'HOSTEL';

  return (
    <div className="container-fluid p-0">
      <div className="profile-card d-flex flex-column flex-md-row align-items-center gap-4 mb-4">
        <div className="avatar-container">
          {profile.avatar 
            ? <img src={getPetImageUrl(profile.avatar)} alt="Avatar" className="avatar-img" />
            : <AvatarInitials name={profile.hostelName || profile.fullName} size={100} fontSize="2rem" />
          }
          <div className="verified-badge">
            <MdVerifiedUser size={20} />
          </div>
        </div>

        <div className="text-center text-md-start">
          <h1 className="fw-bold mb-1">
            {isHostel ? profile.hostelName : profile.fullName}
          </h1>
          <p className="text-muted mb-3" style={{ fontSize: '1rem' }}>
            <MdLocationOn size={18} className="me-1 text-success" />
            {profile.address || 'Ubicación no especificada'}
          </p>
          <p className="text-muted mb-4 small">
            Perfil:{' '}
            <b>{isHostel ? '🏠 Albergue Rescatista' : '🐾 Adoptante'}</b>
            {profile.createdAt && (
              <>
                <span className="mx-2 text-muted">•</span>
                Miembro desde:{' '}
                <b className="text-capitalize">
                  {formatMonthYear(profile.createdAt)}
                </b>
              </>
            )}
            {profile.updatedAt && (
              <span
                className="d-block mt-2 text-muted"
                style={{ fontSize: '0.8rem', opacity: 0.85 }}
              >
                Última actualización:{' '}
                <b className="text-success">{formatDate(profile.updatedAt)}</b>
              </span>
            )}
          </p>
          <button className="btn btn-yellow" onClick={onEdit}>
            Editar perfil
          </button>
        </div>
      </div>

      {/* Información detallada */}
      <h3 className="mb-3 fs-5 text-success fw-bold text-uppercase">
        Información de la Cuenta
      </h3>
      <div className="row g-4">
        {isHostel ? (
          // Vista detallada para Albergues
          <>
            <div className="col-12 col-md-6">
              <div className="info-card">
                <div className="text-muted small fw-bold text-uppercase mb-1">
                  <MdStore className="me-2 text-success" /> Nombre del Albergue
                </div>
                <div className="fs-5 fw-medium">{profile.hostelName}</div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="info-card">
                <div className="text-muted small fw-bold text-uppercase mb-1">
                  <MdPerson className="me-2 text-success" /> Representante /
                  Contacto
                </div>
                <div className="fs-5 fw-medium">{profile.fullName}</div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="info-card">
                <div className="text-muted small fw-bold text-uppercase mb-1">
                  <MdPhone className="me-2 text-success" /> Teléfono
                </div>
                <div className="fs-5 fw-medium">{profile.phone || '---'}</div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="info-card">
                <div className="text-muted small fw-bold text-uppercase mb-1">
                  <MdMail className="me-2 text-success" /> Correo Electrónico
                </div>
                <div className="fs-5 fw-medium">{profile.email}</div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="info-card">
                <div className="text-muted small fw-bold text-uppercase mb-1">
                  <MdPeople className="me-2 text-success" /> Capacidad de
                  Mascotas
                </div>
                <div className="fs-5 fw-medium">
                  {profile.capacity || 'No especificada'}
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="info-card">
                <div className="text-muted small fw-bold text-uppercase mb-1">
                  <MdLanguage className="me-2 text-success" /> Sitio Web
                </div>
                <div className="fs-5 fw-medium">
                  {profile.website ? (
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-success text-decoration-none"
                    >
                      {profile.website}
                    </a>
                  ) : (
                    '---'
                  )}
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="info-card">
                <div className="text-muted small fw-bold text-uppercase mb-1">
                  <MdAttachMoney className="me-2 text-success" /> Enlace de
                  Donaciones
                </div>
                <div className="fs-5 fw-medium">
                  {profile.donationLink ? (
                    <a
                      href={profile.donationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-success text-decoration-none"
                    >
                      Donar aquí
                    </a>
                  ) : (
                    '---'
                  )}
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="info-card">
                <div className="text-muted small fw-bold text-uppercase mb-1">
                  <MdDescription className="me-2 text-success" /> Nuestra
                  Historia / Descripción
                </div>
                <div
                  className="fs-6 lh-base text-secondary"
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {profile.description ||
                    'Este albergue aún no ha añadido una descripción.'}
                </div>
              </div>
            </div>
          </>
        ) : (
          // Vista detallada para Adoptantes normales
          <>
            <div className="col-12 col-md-6">
              <div className="info-card">
                <div className="text-muted small fw-bold text-uppercase mb-1">
                  <MdPerson className="me-2 text-success" /> Nombre Completo
                </div>
                <div className="fs-5 fw-medium">{profile.fullName}</div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="info-card">
                <div className="text-muted small fw-bold text-uppercase mb-1">
                  <MdPhone className="me-2 text-success" /> Teléfono de Contacto
                </div>
                <div className="fs-5 fw-medium">{profile.phone || '---'}</div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="info-card">
                <div className="text-muted small fw-bold text-uppercase mb-1">
                  <MdMail className="me-2 text-success" /> Correo electrónico
                </div>
                <div className="fs-5 fw-medium">{profile.email}</div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="info-card">
                <div className="text-muted small fw-bold text-uppercase mb-1">
                  <MdLocationOn className="me-2 text-success" /> Dirección
                </div>
                <div className="fs-5 fw-medium">{profile.address || '---'}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ── Vista de Edición ─────────────────────────────────────
const EditView = ({ profile, onSave, onCancel, isPending = false }) => {
  const [form, setForm] = useState({ ...profile });
  const fileInputRef = useRef(null);
  const isHostel = profile.role?.toUpperCase() === 'HOSTEL';
  const { uploadFile, isUploading } = useUploadFile();
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Preview inmediato antes de subir
    const localPreview = URL.createObjectURL(file);
    setAvatarPreview(localPreview);
    
    try {
      const uploadRes = await uploadFile(file);
      const relativePath = `/api/files/${uploadRes.fileName}`;
      setForm({ ...form, avatar: relativePath });
    } catch (err) {
      console.error('Error al subir imagen:', err);
      setAvatarPreview(null);
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="profile-card d-flex flex-column flex-md-row align-items-center gap-4 mb-4">
        <div className="avatar-container">
          {avatarPreview || form.avatar
            ? <img src={avatarPreview || getPetImageUrl(form.avatar)} alt="Avatar" className="avatar-img" />
            : <AvatarInitials name={profile.hostelName || profile.fullName} size={100} fontSize="2rem" />
          }
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="d-none"
            onChange={handleAvatarChange}
            disabled={isPending}
          />
          <button
            className="camera-btn"
            onClick={() => fileInputRef.current.click()}
            disabled={isPending || isUploading}
            style={{
              opacity: isPending ? 0.6 : 1,
              cursor: isPending ? 'not-allowed' : 'pointer',
            }}
          >
            <MdPhotoCamera size={22} />
          </button>
        </div>
        <div className="text-center text-md-start">
          <h1 className="fw-bold mb-3">Editando Perfil</h1>
          <div className="d-flex gap-2">
            <Button
              className="btn-yellow"
              onClick={() => onSave(form)}
              isPending={isPending}
            >
              Guardar
            </Button>
            <button
              className="btn btn-cancel"
              onClick={onCancel}
              disabled={isPending}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {isHostel ? (
          // Campos de Formulario para Albergues
          <>
            <div className="col-12 col-md-6">
              <div className="form-container">
                <label className="text-muted small fw-bold mb-2">
                  <MdStore className="me-2 text-success" /> Nombre del Albergue
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={form.hostelName || ''}
                  onChange={(e) =>
                    setForm({ ...form, hostelName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-container">
                <label className="text-muted small fw-bold mb-2">
                  <MdPerson className="me-2 text-success" /> Nombre del
                  Representante
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={form.fullName || ''}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]/g, '');
                    setForm({ ...form, fullName: val });
                  }}
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-container">
                <label className="text-muted small fw-bold mb-2">
                  <MdPhone className="me-2 text-success" /> Teléfono
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={form.phone || ''}
                  maxLength={9}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setForm({ ...form, phone: val });
                  }}
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-container">
                <label className="text-muted small fw-bold mb-2">
                  <MdLocationOn className="me-2 text-success" /> Dirección
                  Física
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={form.address || ''}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-container">
                <label className="text-muted small fw-bold mb-2">
                  <MdPeople className="me-2 text-success" /> Capacidad Máxima de
                  Mascotas
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={form.capacity || ''}
                  onChange={(e) =>
                    setForm({ ...form, capacity: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-container">
                <label className="text-muted small fw-bold mb-2">
                  <MdLanguage className="me-2 text-success" /> Sitio Web (URL)
                </label>
                <input
                  type="url"
                  className="form-control"
                  value={form.website || ''}
                  onChange={(e) =>
                    setForm({ ...form, website: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-container">
                <label className="text-muted small fw-bold mb-2">
                  <MdAttachMoney className="me-2 text-success" /> Enlace de
                  Donaciones (Paypal/Otros)
                </label>
                <input
                  type="url"
                  className="form-control"
                  value={form.donationLink || ''}
                  onChange={(e) =>
                    setForm({ ...form, donationLink: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form-container">
                <label className="text-muted small fw-bold mb-2">
                  <MdDescription className="me-2 text-success" /> Nuestra
                  Historia / Descripción
                </label>
                <textarea
                  className="form-control"
                  rows={4}
                  value={form.description || ''}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Cuéntanos un poco sobre el albergue, su visión o historia..."
                />
              </div>
            </div>
          </>
        ) : (
          // Campos de Formulario para Adoptantes normales
          <>
            <div className="col-12 col-md-6">
              <div className="form-container">
                <label className="text-muted small fw-bold mb-2">
                  <MdPerson className="me-2 text-success" /> Nombre Completo
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={form.fullName || ''}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]/g, '');
                    setForm({ ...form, fullName: val });
                  }}
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-container">
                <label className="text-muted small fw-bold mb-2">
                  <MdPhone className="me-2 text-success" /> Teléfono
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={form.phone || ''}
                  maxLength={9}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setForm({ ...form, phone: val });
                  }}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form-container">
                <label className="text-muted small fw-bold mb-2">
                  <MdLocationOn className="me-2 text-success" /> Dirección de
                  Domicilio
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={form.address || ''}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ── Componente Principal ─────────────────────────────────
const Profile = () => {
  const { session, updateSession } = useSession();
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  // Mapeamos los datos de la sesión adaptados
  const profileData = {
    role: session?.role || 'USER',
    fullName: session?.fullName || '',
    email: session?.email || session?.correo || '',
    phone: session?.phone || '',
    address: session?.address || '',
    avatar: session?.avatar || session?.hostel?.logo || null,
    createdAt: session?.createdAt || null,
    updatedAt: session?.updatedAt || null,

    // Específico de Albergues
    hostelName: session?.hostel?.hostelName || '',
    description: session?.hostel?.description || '',
    capacity: session?.hostel?.capacity || '',
    website: session?.hostel?.website || '',
    donationLink: session?.hostel?.donationLink || '',
  };
  const { updateProfile, isUpdatingProfile } = useAuthMutations();

  const handleSave = (newData) => {
    const isHostel = session?.role?.toUpperCase() === 'HOSTEL';
    const nameRegex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]+$/;

    // Validar Nombre Completo (o Nombre del Representante)
    if (!newData.fullName || !newData.fullName.trim()) {
      const msg = isHostel
        ? 'Por favor, ingresa el nombre del representante legal.'
        : 'Por favor, ingresa tu nombre completo.';
      showToast(msg, 'warning');
      return;
    }
    if (!nameRegex.test(newData.fullName)) {
      const msg = isHostel
        ? 'El nombre del representante solo puede contener letras y espacios.'
        : 'El nombre completo solo puede contener letras, espacios y la letra ñ.';
      showToast(msg, 'warning');
      return;
    }

    // Validar Teléfono
    if (isHostel) {
      if (!newData.phone) {
        showToast('Por favor, ingresa el teléfono del albergue.', 'warning');
        return;
      }
      if (!/^\d{9}$/.test(newData.phone)) {
        showToast('El teléfono de contacto debe tener exactamente 9 dígitos numéricos (ej. 987654321).', 'warning');
        return;
      }
    } else {
      // Para USER el teléfono es opcional, pero si está presente, debe tener 9 dígitos
      if (newData.phone && !/^\d{9}$/.test(newData.phone)) {
        showToast('El teléfono debe tener exactamente 9 dígitos numéricos (ej. 987654321).', 'warning');
        return;
      }
    }

    // Payload básico del usuario
    const updatedPayload = {
      fullName: newData.fullName,
      phone: newData.phone,
      address: newData.address,
      avatar: newData.avatar,
    };

    // Si es un albergue, estructuramos y actualizamos el objeto anidado del hostel
    if (isHostel) {
      updatedPayload.hostel = {
        ...session?.hostel,
        hostelName: newData.hostelName,
        description: newData.description,
        capacity: newData.capacity,
        website: newData.website,
        donationLink: newData.donationLink,
        logo: newData.avatar, // sincronizar logo
      };
    }

    updateProfile(updatedPayload, {
      onSuccess: () => {
        setIsEditing(false);
        showToast('¡Perfil actualizado con éxito! 🐾', 'success');
      },
      onError: (err) => {
        console.error('Error al actualizar el perfil en el servidor:', err);
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          'Error al guardar los cambios en el servidor.';
        showToast(msg, 'error');
      },
    });
  };

  return (
    <div className="profile-page-container">
      <main style={{ maxWidth: '900px', margin: '0 auto' }}>
        {isEditing ? (
          <EditView
            profile={profileData}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
            isPending={isUpdatingProfile}
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
