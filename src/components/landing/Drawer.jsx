import React, { useEffect } from 'react';

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
            <>
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
                Mi Panel
              </button>
              <button
                className="btn-landing-primary"
                onClick={() => {
                  onClose();
                  logout();
                  navigate('/');
                }}
              >
                Salir
              </button>
            </>
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
