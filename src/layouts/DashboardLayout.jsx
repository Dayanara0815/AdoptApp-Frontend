import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const DashboardLayout = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar Simple */}
      <aside style={{ 
        width: '250px', 
        background: '#212529', 
        color: 'white', 
        padding: '20px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h3 className="mb-4">Dashboard</h3>
        <Nav className="flex-column flex-grow-1">
          <Nav.Link as={Link} to="/dashboard" className="text-white">Inicio</Nav.Link>
          <Nav.Link as={Link} to="/dashboard/pets" className="text-white">Mascotas</Nav.Link>
          <Nav.Link as={Link} to="/dashboard/profile" className="text-white">Mi Perfil</Nav.Link>
        </Nav>
        <hr />
        <Link to="/" className="btn btn-danger btn-sm">Cerrar Sesión</Link>
      </aside>

      {/* Contenido Principal */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto', background: '#f8f9fa' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
