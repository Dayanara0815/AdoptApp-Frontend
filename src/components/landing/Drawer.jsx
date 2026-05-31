import React, { useEffect } from 'react';
import aiAvatar from '../../assets/ai-avatar.png';
import { getPetImageUrl } from '../../lib';

export default function Drawer({
  isOpen,
  onClose,
  navLinks,
  handleNavClick,
  user,
  logout,
  navigate,
}) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`drawer-backdrop ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div className={`drawer-content ${isOpen ? 'active' : ''}`}>
        {/* Header */}
        <div className="drawer-header">
          <a
            className="navbar-brand d-flex align-items-center gap-1"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              navigate('/');
            }}
            style={{
              color: 'var(--primary)',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: '1.25rem',
              textDecoration: 'none',
            }}
          >
            <span className="material-symbols-outlined">pets</span>
            AdoptApp
          </a>
          <button
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>close</span>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mb-4">
          <ul className="drawer-nav-list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  className="drawer-nav-link"
                  href={link.href}
                  onClick={(event) => {
                    handleNavClick(event, link.href);
                    onClose();
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth Section */}
        <div className="drawer-footer">
          {user ? (
            <div className="d-flex flex-column gap-3 w-100">
              <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-custom border">
                <img
                  src={user?.avatar ? getPetImageUrl(user.avatar) : user?.hostel?.logo ? getPetImageUrl(user.hostel.logo) : aiAvatar}
                  alt="Avatar"
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)' }}
                />
                <div style={{ overflow: 'hidden' }}>
                  <div className="fw-bold text-truncate" style={{ fontSize: '0.95rem', color: 'var(--primary)' }}>
                    {user?.hostel?.hostelName || user?.fullName || 'Usuario'}
                  </div>
                  <div className="text-muted text-truncate" style={{ fontSize: '0.75rem' }}>
                    {user?.email || user?.correo}
                  </div>
                </div>
              </div>
              <button
                className="btn-landing-outline"
                onClick={() => {
                  onClose();
                  navigate(
                    user.role === 'admin'
                      ? '/admin/dashboard'
                      : '/dashboard'
                  );
                }}
              >
                <span className="material-symbols-outlined me-2">dashboard</span>
                Mi Panel
              </button>

              {user.role?.toUpperCase() !== 'ADMIN' && (
                <button
                  className="btn-landing-outline"
                  onClick={() => {
                    onClose();
                    navigate('/dashboard/profile');
                  }}
                >
                  <span className="material-symbols-outlined me-2">person</span>
                  Mi Perfil
                </button>
              )}

              <button
                className="btn-landing-primary w-100"
                onClick={() => {
                  onClose();
                  logout();
                  navigate('/');
                }}
                style={{ backgroundColor: '#d9534f', borderColor: '#d9534f' }}
              >
                <span className="material-symbols-outlined me-2">logout</span>
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <>
              <button
                className="btn-landing-outline"
                onClick={() => {
                  onClose();
                  navigate('/login');
                }}
              >
                Ingresar
              </button>
              <button
                className="btn-landing-primary"
                onClick={() => {
                  onClose();
                  navigate('/registro');
                }}
              >
                Registrarse
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
