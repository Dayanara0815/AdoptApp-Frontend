import React from 'react';

const PetsManager = () => (
  <div>
    <h2>Gestión de Mascotas</h2>
    <p>Aquí puedes agregar, editar o eliminar mascotas del sistema.</p>
    <button className="btn btn-primary mb-3">+ Agregar Nueva</button>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Especie</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Firulais</td>
          <td>Perro</td>
          <td>Disponible</td>
        </tr>
        <tr>
          <td>Michi</td>
          <td>Gato</td>
          <td>Adoptado</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default PetsManager;
