import React from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Table, Badge, Button, Dropdown } from 'react-bootstrap';

const AdminUsers = () => {
  const {
    data: usuarios,
    updateItem,
    deleteItem,
  } = useLocalStorage('usuarios');

  if (!usuarios || !Array.isArray(usuarios)) {
    return <div className="p-4 text-center">Cargando usuarios...</div>;
  }

  const handleRoleChange = (userId, newRole) => {
    updateItem(userId, { role: newRole });
  };

  return (
    <div className="admin-container p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-primary mb-0">Gestión de Usuarios</h2>
          <p className="text-secondary mb-0">
            Administra los permisos y cuentas de la plataforma
          </p>
        </div>
        <Badge bg="primary" className="px-3 py-2 rounded-pill">
          Total: {usuarios.length}
        </Badge>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border-0">
        <Table hover responsive className="mb-0">
          <thead className="bg-light">
            <tr>
              <th className="px-4 py-3 border-0">Usuario</th>
              <th className="px-4 py-3 border-0">Correo</th>
              <th className="px-4 py-3 border-0">Rol</th>
              <th className="px-4 py-3 border-0">Fecha Registro</th>
              <th className="px-4 py-3 border-0 text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-3 align-middle">
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white"
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor:
                          user.role === 'admin' ? '#4a654f' : '#8daa91',
                      }}
                    >
                      {user.nombres?.charAt(0) ||
                        user.correo?.charAt(0)?.toUpperCase() ||
                        '?'}
                    </div>
                    <div>
                      <div className="fw-bold">
                        {(user.nombres || '') + ' ' + (user.apellidos || '')}
                      </div>
                      <div className="text-muted small">
                        ID: {String(user.id || '').substring(0, 8)}...
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 align-middle">{user.correo}</td>
                <td className="px-4 py-3 align-middle">
                  <Badge
                    bg={user.role === 'admin' ? 'dark' : 'light'}
                    className={`rounded-pill px-3 py-2 ${user.role === 'admin' ? 'text-white' : 'text-dark border'}`}
                  >
                    {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                  </Badge>
                </td>
                <td className="px-4 py-3 align-middle text-label">
                  {user.fechaRegistro || '27/04/2026'}
                </td>
                <td className="px-4 py-3 align-middle text-end">
                  <div className="d-flex justify-content-end gap-2">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="light"
                        size="sm"
                        className="rounded-circle no-caret d-flex align-items-center justify-content-center"
                        style={{ width: '32px', height: '32px' }}
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: '18px' }}
                        >
                          more_vert
                        </span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu align="end">
                        <Dropdown.Header>Cambiar Rol</Dropdown.Header>
                        <Dropdown.Item
                          onClick={() => handleRoleChange(user.id, 'admin')}
                        >
                          Hacer Administrador
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleRoleChange(user.id, 'user')}
                        >
                          Hacer Usuario Normal
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                          className="text-danger"
                          onClick={() => deleteItem(user.id)}
                        >
                          Eliminar Usuario
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AdminUsers;
