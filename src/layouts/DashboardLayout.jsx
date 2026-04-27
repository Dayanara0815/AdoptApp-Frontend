import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { useAuth } from '../context/authStore';

const DashboardLayout = () => {
  const { user, logout } = useAuth();

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

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        backgroundColor: 'var(--color-neutral-100)',
      }}
    >
      {/* Sidebar con estilo del diseño */}
      <aside
        style={{
          width: '280px',
          background: 'var(--color-primary-700)',
          color: 'white',
          padding: '30px 20px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '4px 0 15px rgba(0,0,0,0.05)',
        }}
      >
        <h3
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
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
