import React from 'react';

const UserProfile = () => (
  <div>
    <h2>Mi Perfil</h2>
    <p>Configura tus datos personales y de contacto.</p>
    <form className="mt-4" style={{ maxWidth: '500px' }}>
      <div className="mb-3">
        <label className="form-label">Nombre Completo</label>
        <input type="text" className="form-control" defaultValue="Usuario de Prueba" />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" defaultValue="test@adoptapp.com" />
      </div>
      <button className="btn btn-primary">Guardar Cambios</button>
    </form>
  </div>
);

export default UserProfile;
