import React from 'react';

const DashboardHome = () => (
  <div>
    <h2>Resumen del Dashboard</h2>
    <p>Bienvenido al panel de control de AdoptApp.</p>
    <div className="row mt-4">
      <div className="col-md-4">
        <div className="card p-3 bg-info text-white text-center">
          <h4>12</h4>
          <p>Mascotas Adoptadas</p>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card p-3 bg-success text-white text-center">
          <h4>5</h4>
          <p>Solicitudes Pendientes</p>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardHome;
