import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { useAuth } from '../context/authStore';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const userLinks = [
    { to: '/dashboard/catalogo', label: 'Catálogo' },
    { to: '/dashboard/my-publications', label: 'Mis Publicaciones' },
    { to: '/dashboard/profile', label: 'Mi Perfil' },
  ];

  const adminLinks = [
    { to: '/admin/pets', label: 'Mascotas' },
    { to: '/admin/adoptions', label: 'Adopciones' },
    { to: '/admin/users', label: 'Gestionar Usuarios' },
  ];

  const links = user?.role === 'admin' ? adminLinks : userLinks;

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
          <span className="fw-bold" style={{ color: 'var(--color-secondary-500)', fontSize: '1.25rem' }}>AdoptApp</span>
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
              padding: '4px',
              borderRadius: '50%'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>close</span>
          </button>
        </div>

        {/* Desktop Branding Title */}
        <h3
          className="d-none d-md-block"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.5rem',
            marginBottom: '40px',
            color: 'var(--color-secondary-500)',
            textAlign: 'center',
          }}
        >
          AdoptApp
        </h3>

        <Nav className="flex-column flex-grow-1" style={{ gap: '10px' }}>
          {links.map((link) => (
            <Link key={link.to} to={link.to} className="dashboard-link">
              {link.label}
            </Link>
          ))}
        </Nav>

        <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        <div className="mt-auto">
          <p className="small mb-3 text-white" style={{ opacity: 0.8 }}>
            Logueado como: <strong>{user?.name}</strong>
          </p>
          <button
            onClick={logout}
            className="btn btn-outline-light rounded-pill btn-sm w-100"
          >
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

