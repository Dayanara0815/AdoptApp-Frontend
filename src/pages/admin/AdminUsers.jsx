import React, { useState, useEffect } from 'react';
import { Table, Badge, Button, Dropdown, Pagination, Modal, Form, Spinner, Row, Col } from 'react-bootstrap';
import { authService } from '../../services/authService';
import { useToast } from '../../context/ToastContext';
import AvatarInitials from '../../components/AvatarInitials';
import { getPetImageUrl, formatDate } from '../../lib';

const AdminUsers = () => {
  const { showToast } = useToast();

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0); // 0-indexed for Spring Boot
  const [pageSize] = useState(8); // 8 rows is clean for the layout
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // Filters
  const [roleFilter, setRoleFilter] = useState('ALL'); // 'ALL', 'ADMIN', 'USER', 'HOSTEL'
  const [searchTerm, setSearchTerm] = useState('');

  // Modals
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      let response;
      if (roleFilter === 'ALL') {
        response = await authService.getUsersPage(currentPage, pageSize);
      } else {
        response = await authService.getUsersByRole(roleFilter, currentPage, pageSize);
      }
      
      const apiData = response?.data || response;
      
      if (apiData) {
        setUsuarios(apiData.content || []);
        setTotalPages(apiData.totalPages || 1);
        setTotalElements(apiData.totalElements || 0);
      } else {
        setUsuarios([]);
        setTotalPages(1);
        setTotalElements(0);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      showToast(err?.message || 'Error al obtener los usuarios del servidor.', 'error');
      setUsuarios([]);
      setTotalPages(1);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [roleFilter]);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, pageSize, roleFilter]);

  const handleToggleActive = async (user) => {
    if (!user || !user.id) return;
    
    const actionWord = user.isActive ? 'desactivar' : 'activar';
    const isConfirmed = window.confirm(
      `¿Estás seguro de que deseas ${actionWord} la cuenta de ${user.fullName || user.email}?`
    );
    
    if (!isConfirmed) return;

    setActionLoading(true);
    try {
      if (user.isActive) {
        await authService.deactivateUser(user.id);
        showToast(`🔒 Cuenta de ${user.fullName || user.email} desactivada exitosamente.`, 'warning');
      } else {
        await authService.activateUser(user.id);
        showToast(`💚 Cuenta de ${user.fullName || user.email} activada exitosamente.`, 'success');
      }
      await fetchUsers();
    } catch (err) {
      console.error(`Error al ${actionWord} usuario:`, err);
      showToast(err?.message || `Error al intentar ${actionWord} la cuenta del usuario.`, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };

  // Local filtering matching search terms (on name, email, DNI, phone) for the loaded list
  const filteredUsuarios = usuarios.filter((user) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    return (
      (user.fullName || '').toLowerCase().includes(term) ||
      (user.email || '').toLowerCase().includes(term) ||
      (user.dni || '').toLowerCase().includes(term) ||
      (user.phone || '').toLowerCase().includes(term)
    );
  });

  const getRoleBadge = (role) => {
    switch (role) {
      case 'ADMIN':
        return (
          <Badge bg="dark" className="rounded-pill px-3 py-2 text-white d-inline-flex align-items-center gap-1">
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>shield</span>
            Administrador
          </Badge>
        );
      case 'HOSTEL':
        return (
          <Badge bg="primary" className="rounded-pill px-3 py-2 text-white d-inline-flex align-items-center gap-1" style={{ backgroundColor: 'var(--color-primary-700)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>business</span>
            Albergue
          </Badge>
        );
      case 'USER':
      default:
        return (
          <Badge bg="secondary" className="rounded-pill px-3 py-2 text-dark border d-inline-flex align-items-center gap-1" style={{ backgroundColor: 'var(--color-secondary-500)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>person</span>
            Adoptante
          </Badge>
        );
    }
  };

  const getStatusBadge = (isActive) => {
    return (
      <Badge
        bg={isActive ? 'success' : 'danger'}
        className={`rounded-pill px-3 py-2 d-inline-flex align-items-center gap-2 ${
          isActive ? 'bg-opacity-10 text-success' : 'bg-opacity-10 text-danger'
        }`}
        style={{
          backgroundColor: isActive ? 'rgba(46, 204, 113, 0.15)' : 'rgba(231, 76, 60, 0.15)',
          color: isActive ? '#27ae60' : '#c0392b',
          border: `1px solid ${isActive ? '#2ecc71' : '#e74c3c'}`
        }}
      >
        <span 
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: isActive ? '#2ecc71' : '#e74c3c',
            display: 'inline-block',
            boxShadow: isActive ? '0 0 8px #2ecc71' : 'none'
          }}
        />
        {isActive ? 'Activo' : 'Inactivo'}
      </Badge>
    );
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    let items = [];
    
    // First / Prev
    items.push(
      <Pagination.First
        key="first"
        disabled={currentPage === 0}
        onClick={() => setCurrentPage(0)}
      />
    );
    items.push(
      <Pagination.Prev
        key="prev"
        disabled={currentPage === 0}
        onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
      />
    );

    // Dynamic numeric pages
    for (let number = 0; number < totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => setCurrentPage(number)}
        >
          {number + 1}
        </Pagination.Item>
      );
    }

    // Next / Last
    items.push(
      <Pagination.Next
        key="next"
        disabled={currentPage === totalPages - 1}
        onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
      />
    );
    items.push(
      <Pagination.Last
        key="last"
        disabled={currentPage === totalPages - 1}
        onClick={() => setCurrentPage(totalPages - 1)}
      />
    );

    return (
      <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-3">
        <div className="text-muted small">
          Mostrando página {currentPage + 1} de {totalPages} ({totalElements} usuarios en total)
        </div>
        <Pagination className="mb-0 custom-pagination">{items}</Pagination>
      </div>
    );
  };

  return (
    <div className="admin-container p-0 p-md-4">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold text-primary mb-0" style={{ fontSize: '1.85rem' }}>Gestión de Usuarios</h2>
          <p className="text-muted mb-0 small">
            Supervisa, activa/desactiva cuentas y revisa los datos de los usuarios registrados
          </p>
        </div>
        <Badge bg="primary" className="px-3 py-2 rounded-pill text-nowrap" style={{ backgroundColor: 'var(--color-primary-700)', fontSize: '0.9rem' }}>
          Total: {totalElements}
        </Badge>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-custom shadow-sm p-3 mb-4 border-0">
        <Row className="g-3 align-items-center">
          <Col md={6}>
            <Form.Group className="position-relative mb-0">
              <span 
                className="material-symbols-outlined position-absolute text-muted" 
                style={{ left: '15px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
              >
                search
              </span>
              <Form.Control
                type="text"
                placeholder="Buscar por nombre, correo, DNI..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '45px', borderRadius: '50px' }}
                className="border-custom bg-light bg-opacity-50"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="position-absolute btn-close btn-sm"
                  style={{ right: '15px', top: '50%', transform: 'translateY(-50%)', backgroundSize: '0.65em' }}
                />
              )}
            </Form.Group>
          </Col>
          <Col md={4}>
            <div className="d-flex align-items-center gap-2">
              <span className="material-symbols-outlined text-muted" style={{ fontSize: '20px' }}>filter_alt</span>
              <Form.Select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                style={{ borderRadius: '50px' }}
                className="border-custom text-muted fw-semibold"
              >
                <option value="ALL">Todos los Roles</option>
                <option value="ADMIN">Administradores</option>
                <option value="USER">Adoptantes (Usuarios)</option>
                <option value="HOSTEL">Albergues</option>
              </Form.Select>
            </div>
          </Col>
          <Col md={2} className="text-end">
            <Button 
              variant="outline-primary" 
              onClick={fetchUsers} 
              disabled={loading}
              className="rounded-circle p-2 d-inline-flex align-items-center justify-content-center"
              style={{ width: '40px', height: '40px', borderColor: 'var(--color-primary-700)', color: 'var(--color-primary-700)' }}
              title="Actualizar lista"
            >
              <span 
                className={`material-symbols-outlined ${loading ? 'spin-animation' : ''}`}
                style={{ fontSize: '20px' }}
              >
                refresh
              </span>
            </Button>
          </Col>
        </Row>
      </div>

      {/* Users Table Container */}
      <div className="bg-white rounded-custom shadow-sm overflow-hidden border-0 mb-4">
        <Table hover responsive className="mb-0 align-middle">
          <thead className="bg-light bg-opacity-70 text-muted" style={{ borderBottom: '2px solid rgba(0,0,0,0.04)' }}>
            <tr>
              <th className="px-4 py-3 border-0 fw-bold">Usuario</th>
              <th className="px-4 py-3 border-0 fw-bold">Contacto</th>
              <th className="px-4 py-3 border-0 fw-bold">Rol</th>
              <th className="px-4 py-3 border-0 fw-bold">Estado</th>
              <th className="px-4 py-3 border-0 fw-bold">Fecha Registro</th>
              <th className="px-4 py-3 border-0 text-end fw-bold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-5">
                  <Spinner animation="border" variant="primary" role="status" className="mb-2" style={{ color: 'var(--color-primary-700)' }} />
                  <div className="text-muted fw-semibold small">Cargando usuarios del sistema...</div>
                </td>
              </tr>
            ) : filteredUsuarios.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-5">
                  <span className="material-symbols-outlined text-muted mb-2" style={{ fontSize: '48px' }}>group_off</span>
                  <div className="text-muted fw-semibold small">No se encontraron usuarios en esta vista.</div>
                  {searchTerm || roleFilter !== 'ALL' ? (
                    <Button 
                      variant="link" 
                      size="sm" 
                      onClick={() => { setSearchTerm(''); setRoleFilter('ALL'); }}
                      className="text-primary mt-2 p-0 text-decoration-none fw-bold"
                      style={{ color: 'var(--color-primary-700)' }}
                    >
                      Restablecer filtros
                    </Button>
                  ) : null}
                </td>
              </tr>
            ) : (
              filteredUsuarios.map((user) => (
                <tr key={user.id} className="transition-row">
                  <td className="px-4 py-3 align-middle">
                    <div className="d-flex align-items-center gap-3">
                      {user.avatar ? (
                        <img
                          src={getPetImageUrl(user.avatar)}
                          alt={user.fullName}
                          className="rounded-circle object-fit-cover border border-1"
                          style={{ width: '40px', height: '40px', borderColor: 'var(--color-primary-500)' }}
                        />
                      ) : (
                        <AvatarInitials name={user.fullName || user.email} size={40} fontSize="0.95rem" />
                      )}
                      <div>
                        <div className="fw-bold text-dark text-truncate" style={{ maxWidth: '200px' }}>
                          {user.fullName || 'Sin Nombre'}
                        </div>
                        <div className="text-muted small" style={{ fontSize: '0.75rem' }}>
                          ID: {user.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <div className="fw-semibold text-dark text-truncate" style={{ maxWidth: '220px' }}>{user.email}</div>
                    {user.phone && <div className="text-muted small" style={{ fontSize: '0.8rem' }}>{user.phone}</div>}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    {getStatusBadge(user.isActive)}
                  </td>
                  <td className="px-4 py-3 align-middle text-muted small">
                    {formatDate(user.createdAt)?.split(',')[0] || 'No disponible'}
                  </td>
                  <td className="px-4 py-3 align-middle text-end">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="light"
                        size="sm"
                        className="rounded-circle no-caret d-flex align-items-center justify-content-center border-0 bg-transparent"
                        style={{ width: '32px', height: '32px' }}
                      >
                        <span
                          className="material-symbols-outlined text-muted"
                          style={{ fontSize: '18px' }}
                        >
                          more_vert
                        </span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu align="end">
                        <Dropdown.Item onClick={() => handleViewDetails(user)}>
                          <span className="material-symbols-outlined align-middle me-2" style={{ fontSize: '18px' }}>info</span>
                          Ver Detalle
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                          className={user.isActive ? "text-danger" : "text-success"}
                          onClick={() => handleToggleActive(user)}
                          disabled={actionLoading}
                        >
                          <span className="material-symbols-outlined align-middle me-2" style={{ fontSize: '18px' }}>
                            {user.isActive ? 'block' : 'check_circle'}
                          </span>
                          {user.isActive ? 'Desactivar Cuenta' : 'Activar Cuenta'}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {!loading && renderPagination()}

      {/* Detail Modal */}
      <Modal 
        show={showDetailModal} 
        onHide={() => setShowDetailModal(false)}
        size="lg"
        centered
        className="user-detail-modal"
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold" style={{ color: 'var(--color-primary-700)' }}>Detalle Completo del Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-2">
          {selectedUser && (
            <div className="p-1">
              {/* User Identity Header Card */}
              <div className="d-flex flex-column flex-sm-row align-items-center gap-4 mb-4 pb-4 border-bottom">
                {selectedUser.avatar ? (
                  <img
                    src={getPetImageUrl(selectedUser.avatar)}
                    alt="Avatar"
                    className="rounded-circle object-fit-cover shadow-sm border border-2"
                    style={{ width: '90px', height: '90px', borderColor: 'var(--color-primary-700)' }}
                  />
                ) : (
                  <AvatarInitials name={selectedUser.fullName || selectedUser.email} size={90} fontSize="2.2rem" />
                )}
                
                <div className="text-center text-sm-start">
                  <h3 className="fw-bold mb-1 text-dark" style={{ fontSize: '1.5rem' }}>{selectedUser.fullName || 'Sin Nombre'}</h3>
                  <p className="text-muted mb-2 small">ID del Sistema: <code className="bg-light py-1 px-2">{selectedUser.id}</code></p>
                  <div className="d-flex flex-wrap justify-content-center justify-content-sm-start gap-2">
                    {getRoleBadge(selectedUser.role)}
                    {getStatusBadge(selectedUser.isActive)}
                  </div>
                </div>
              </div>

              <Row className="g-4">
                {/* Column 1: Info Personal */}
                <Col md={selectedUser.role === 'HOSTEL' ? 6 : 12}>
                  <h5 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: 'var(--color-primary-700)', fontSize: '1.05rem' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>info</span>
                    Información Personal
                  </h5>
                  <div className="bg-light rounded-custom p-3 border-0 shadow-sm" style={{ backgroundColor: '#fcfcf8' }}>
                    <table className="table table-borderless table-sm mb-0 align-middle">
                      <tbody>
                        <tr>
                          <td className="text-muted fw-semibold py-2" style={{ width: '35%', fontSize: '0.85rem' }}>Correo:</td>
                          <td className="text-dark py-2 text-truncate" style={{ fontSize: '0.85rem' }}>{selectedUser.email}</td>
                        </tr>
                        <tr>
                          <td className="text-muted fw-semibold py-2" style={{ fontSize: '0.85rem' }}>DNI:</td>
                          <td className="text-dark py-2" style={{ fontSize: '0.85rem' }}>{selectedUser.dni || 'No proporcionado'}</td>
                        </tr>
                        <tr>
                          <td className="text-muted fw-semibold py-2" style={{ fontSize: '0.85rem' }}>Teléfono:</td>
                          <td className="text-dark py-2" style={{ fontSize: '0.85rem' }}>{selectedUser.phone || 'No proporcionado'}</td>
                        </tr>
                        <tr>
                          <td className="text-muted fw-semibold py-2" style={{ fontSize: '0.85rem' }}>Dirección:</td>
                          <td className="text-dark py-2 text-truncate" style={{ fontSize: '0.85rem' }}>{selectedUser.address || 'No proporcionada'}</td>
                        </tr>
                        <tr>
                          <td className="text-muted fw-semibold py-2" style={{ fontSize: '0.85rem' }}>F. Registro:</td>
                          <td className="text-dark py-2" style={{ fontSize: '0.85rem' }}>{formatDate(selectedUser.createdAt)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Col>

                {/* Column 2: Info Albergue (Only if HOSTEL) */}
                {selectedUser.role === 'HOSTEL' && (
                  <Col md={6}>
                    <h5 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: 'var(--color-primary-700)', fontSize: '1.05rem' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>business</span>
                      Detalles del Albergue
                    </h5>
                    <div className="bg-light rounded-custom p-3 border-0 shadow-sm" style={{ backgroundColor: '#fcfcf8' }}>
                      <table className="table table-borderless table-sm mb-0 align-middle">
                        <tbody>
                          <tr>
                            <td className="text-muted fw-semibold py-2" style={{ width: '40%', fontSize: '0.85rem' }}>Nombre:</td>
                            <td className="text-dark py-2" style={{ fontSize: '0.85rem' }}>{selectedUser.hostel?.hostelName || 'No especificado'}</td>
                          </tr>

                          {selectedUser.hostel?.donationLink && (
                            <tr>
                              <td className="text-muted fw-semibold py-2" style={{ fontSize: '0.85rem' }}>Donaciones:</td>
                              <td className="py-2" style={{ fontSize: '0.85rem' }}>
                                <a href={selectedUser.hostel.donationLink} target="_blank" rel="noopener noreferrer" className="text-decoration-none fw-semibold" style={{ color: 'var(--color-primary-700)' }}>
                                  Enlace Donación
                                </a>
                              </td>
                            </tr>
                          )}
                          {selectedUser.hostel?.website && (
                            <tr>
                              <td className="text-muted fw-semibold py-2" style={{ fontSize: '0.85rem' }}>Sitio Web:</td>
                              <td className="py-2" style={{ fontSize: '0.85rem' }}>
                                <a href={selectedUser.hostel.website} target="_blank" rel="noopener noreferrer" className="text-decoration-none fw-semibold" style={{ color: 'var(--color-primary-700)' }}>
                                  Visitar Web
                                </a>
                              </td>
                            </tr>
                          )}
                          {(selectedUser.hostel?.facebookUrl || selectedUser.hostel?.instagramUrl) && (
                            <tr>
                              <td className="text-muted fw-semibold py-2" style={{ fontSize: '0.85rem' }}>Redes Sociales:</td>
                              <td className="py-2" style={{ fontSize: '0.85rem' }}>
                                <div className="d-flex gap-2">
                                  {selectedUser.hostel.facebookUrl && (
                                    <a 
                                      href={selectedUser.hostel.facebookUrl} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="btn btn-sm btn-outline-primary p-1 rounded-circle d-flex align-items-center justify-content-center border-0 bg-light" 
                                      style={{ width: '28px', height: '28px', color: 'var(--color-primary-700)' }}
                                      title="Facebook"
                                    >
                                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>public</span>
                                    </a>
                                  )}
                                  {selectedUser.hostel.instagramUrl && (
                                    <a 
                                      href={selectedUser.hostel.instagramUrl} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="btn btn-sm btn-outline-primary p-1 rounded-circle d-flex align-items-center justify-content-center border-0 bg-light" 
                                      style={{ width: '28px', height: '28px', color: 'var(--color-primary-700)' }}
                                      title="Instagram"
                                    >
                                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>photo_camera</span>
                                    </a>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}
                          <tr>
                            <td className="text-muted fw-semibold py-2" style={{ fontSize: '0.85rem', verticalAlign: 'top' }}>Descripción:</td>
                            <td className="text-dark py-2 small" style={{ whiteSpace: 'pre-line', fontSize: '0.8rem', lineHeight: '1.3' }}>
                              {selectedUser.hostel?.description || 'Sin descripción redactada.'}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Col>
                )}
              </Row>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
            Cerrar
          </Button>
          {selectedUser && (
            <Button 
              variant={selectedUser.isActive ? "danger" : "success"}
              onClick={() => {
                setShowDetailModal(false);
                handleToggleActive(selectedUser);
              }}
              disabled={actionLoading}
            >
              {selectedUser.isActive ? 'Desactivar Cuenta' : 'Activar Cuenta'}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminUsers;
