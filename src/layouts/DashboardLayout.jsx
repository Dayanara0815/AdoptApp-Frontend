import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const DashboardLayout = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--color-neutral-100)' }}>
      {/* Sidebar con estilo del diseño */}
      <aside style={{ 
        width: '280px', 
        background: 'var(--color-primary-700)', 
        color: 'white', 
        padding: '30px 20px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '4px 0 15px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{ 
          fontFamily: 'var(--font-heading)', 
          fontSize: '1.5rem',
          marginBottom: '40px',
          color: 'var(--color-secondary-500)',
          textAlign: 'center'
        }}>AdoptApp</h3>
        
        <Nav className="flex-column flex-grow-1" style={{ gap: '10px' }}>
          <Nav.Link as={Link} to="/dashboard" style={{ 
            color: 'white', 
            padding: '12px 20px',
            borderRadius: 'var(--radius-md)',
            transition: 'background 0.3s'
          }} className="dashboard-link">Inicio</Nav.Link>
          
          <Nav.Link as={Link} to="/dashboard/pets" style={{ 
            color: 'white', 
            padding: '12px 20px',
            borderRadius: 'var(--radius-md)'
          }} className="dashboard-link">Mascotas</Nav.Link>
          
          <Nav.Link as={Link} to="/dashboard/profile" style={{ 
            color: 'white', 
            padding: '12px 20px',
            borderRadius: 'var(--radius-md)'
          }} className="dashboard-link">Mi Perfil</Nav.Link>
        </Nav>
        
        <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        <Link to="/" className="btn btn-outline-light rounded-pill btn-sm">Cerrar Sesión</Link>
      </aside>

      {/* Contenido Principal */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
