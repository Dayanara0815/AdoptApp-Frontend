import React from 'react';

const DashboardHome = () => (
  <div>
  <div className="container-fluid">
    <h2 className="mb-2">Resumen del Dashboard</h2>
    <p className="text-muted mb-4">Bienvenido al panel de control de AdoptApp.</p>
    
    <div className="row g-4">
      <div className="col-md-6 col-lg-4">
        <div 
          className="card border-0 p-4 text-center" 
          style={{ 
            backgroundColor: 'var(--color-primary-500)', 
            color: 'white',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <h3 className="display-4 fw-bold mb-1" style={{ color: 'white' }}>12</h3>
          <p className="mb-0 opacity-75">Mascotas Adoptadas</p>
        </div>
      </div>
      
      <div className="col-md-6 col-lg-4">
        <div 
          className="card border-0 p-4 text-center" 
          style={{ 
            backgroundColor: 'var(--color-primary-700)', 
            color: 'white',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <h3 className="display-4 fw-bold mb-1" style={{ color: 'white' }}>5</h3>
          <p className="mb-0 opacity-75">Solicitudes Pendientes</p>
        </div>
      </div>
    </div>
  </div>
  </div>
);

export default DashboardHome;
