import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { useAuth } from '../context/authStore';
import aiAvatar from '../assets/ai-avatar.png';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const userLinks = [
    { to: '/dashboard/catalogo', label: 'Catálogo', icon: 'grid_view' },
    { to: '/dashboard/my-publications', label: 'Mis Publicaciones', icon: 'list_alt' },
    { to: '/dashboard/profile', label: 'Mi Perfil', icon: 'person' },
  ];

  const adminLinks = [
    { to: '/admin/pets', label: 'Mascotas', icon: 'pets' },
    { to: '/admin/adoptions', label: 'Adopciones', icon: 'volunteer_activism' },
    { to: '/admin/users', label: 'Gestionar Usuarios', icon: 'people' },
  ];

  const userRoleLower = user?.role?.toLowerCase();
  const links = userRoleLower === 'admin' ? adminLinks : userLinks;


  // Auto-close sidebar on mobile when navigating
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Lock body scroll on mobile when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  return (
    <div className="dashboard-container">
      {/* Mobile Top Header */}
      <header className="dashboard-mobile-header">
        <button
          className="dashboard-toggle-btn"
          onClick={() => setSidebarOpen(true)}
          aria-label="Abrir panel"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>menu</span>
        </button>
        <span className="dashboard-mobile-title">AdoptApp</span>
        <div style={{ width: '40px' }} /> {/* Spacer for centering title */}
      </header>

      {/* Backdrop for closing sidebar on mobile click */}
      <div
        className={`dashboard-backdrop ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar con estilo del diseño */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Mobile Header Inside Sidebar with Close Button */}
        <div className="d-flex d-md-none justify-content-between align-items-center mb-4">
          <span className="fw-bold d-flex align-items-center gap-2" style={{ color: 'var(--color-secondary-500)', fontSize: '1.4rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>pets</span>
            AdoptApp
          </span>
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
              borderRadius: '50%'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '26px' }}>close</span>
          </button>
        </div>

        {/* Desktop Branding Title */}
        <div
          className="d-none d-md-flex align-items-center justify-content-center gap-2"
          style={{
            marginBottom: '40px',
            color: 'var(--color-secondary-500)',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--color-secondary-500)' }}>pets</span>
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.75rem',
              fontWeight: 800,
              margin: 0,
              color: 'var(--color-secondary-500)',
            }}
          >
            AdoptApp
          </h3>
        </div>

        <Nav className="flex-column flex-grow-1" style={{ gap: '4px' }}>
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`dashboard-link ${isActive ? 'active' : ''}`}
              >
                <span className="material-symbols-outlined">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </Nav>

        <div className="mt-auto pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="dashboard-sidebar-profile-card">
            <img
              src={user?.avatar || user?.hostel?.logo || aiAvatar}
              alt="Avatar de usuario"
              className="dashboard-sidebar-avatar"
            />
            <div className="dashboard-sidebar-user-info">
              <div className="dashboard-sidebar-user-name text-truncate" title={user?.fullName || user?.hostel?.hostelName || 'Usuario'}>
                {user?.fullName || user?.hostel?.hostelName || 'Usuario'}
              </div>
              <div className="dashboard-sidebar-user-role">
                {user?.role?.toUpperCase() === 'HOSTEL'
                  ? 'Albergue'
                  : user?.role?.toUpperCase() === 'ADMIN'
                  ? 'Administrador'
                  : 'Adoptante'}
              </div>
            </div>
          </div>
          
          <button
            onClick={logout}
            className="btn btn-outline-light rounded-pill w-100 d-flex align-items-center justify-content-center gap-2"
            style={{
              borderWidth: '1.5px',
              fontWeight: '600',
              padding: '10px 20px',
              fontSize: '0.9rem',
              transition: 'all 0.25s ease'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>logout</span>
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

