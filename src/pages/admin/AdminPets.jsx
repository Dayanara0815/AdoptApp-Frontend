import React, { useState, useEffect } from 'react';
import { Table, Badge, Button, Pagination, Form, Row, Col, Spinner, Modal } from 'react-bootstrap';
import { usePets, usePetsPage } from '../../hooks/usePets';
import PetFormModal from '../../components/dashboard/PetFormModal';
import { getPetImageUrl } from '../../lib';
import { FaTrash } from 'react-icons/fa';

const AdminPets = () => {
  const { deletePet } = usePets();

  const [currentPage, setCurrentPage] = useState(0); // 0-indexed for Spring Boot
  const [pageSize] = useState(8); // 8 rows is clean for the layout
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' (default), 'AVAILABLE', or 'ADOPTED'
  const [searchTerm, setSearchTerm] = useState('');

  // Edit modal states
  const [editingPet, setEditingPet] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Confirm delete modal states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);

  // Fetch paginated pets
  const { data, isLoading, isError, refetch } = usePetsPage(
    currentPage,
    pageSize,
    statusFilter,
    {}, // filters (can add size or species later if needed)
    searchTerm
  );

  const petsData = data?.content || [];
  const totalElements = data?.totalElements || 0;
  const totalPages = data?.totalPages || 1;

  useEffect(() => {
    setCurrentPage(0);
  }, [statusFilter]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const handleEdit = (pet) => {
    setEditingPet(pet);
    setShowEditModal(true);
  };

  const handleDeleteClick = (pet) => {
    setPetToDelete(pet);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!petToDelete || !petToDelete.id) return;
    try {
      await deletePet(petToDelete.id);
    } catch (err) {
      console.error("Error al retirar la mascota:", err);
    } finally {
      setShowConfirmModal(false);
      setPetToDelete(null);
    }
  };

  const getSpeciesLabel = (species) => {
    switch (species) {
      case 'DOG':
        return 'Perro';
      case 'CAT':
        return 'Gato';
      case 'RABBIT':
        return 'Conejo';
      case 'OTHER':
      default:
        return 'Otro';
    }
  };

  const getStatusBadge = (status) => {
    const isAdopted = status === 'ADOPTED';
    return (
      <Badge
        bg={isAdopted ? 'success' : 'warning'}
        className={`rounded-pill px-3 py-2 ${
          isAdopted ? 'bg-opacity-10 text-success' : 'bg-opacity-10 text-warning'
        }`}
        style={{
          backgroundColor: isAdopted ? '#d1e7dd' : '#fff3cd',
          color: isAdopted ? '#0f5132' : '#664d03',
          border: `1px solid ${isAdopted ? '#a3cfbb' : '#ffe69c'}`
        }}
      >
        {isAdopted ? 'Adoptado' : 'Disponible'}
      </Badge>
    );
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    let items = [];
    
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
          Mostrando página {currentPage + 1} de {totalPages} ({totalElements} mascotas en total)
        </div>
        <Pagination className="mb-0 custom-pagination">{items}</Pagination>
      </div>
    );
  };

  return (
    <div className="admin-container p-0 p-md-4">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold text-primary mb-0" style={{ fontSize: '1.85rem' }}>Gestión de Mascotas</h2>
          <p className="text-muted mb-0 small">
            Supervisa, edita publicaciones y retira mascotas registradas en la plataforma
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
                placeholder="Buscar por nombre o raza..."
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ paddingLeft: '45px', borderRadius: '50px' }}
                className="border-custom bg-light bg-opacity-50"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => { setSearchTerm(''); setCurrentPage(0); }}
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
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ borderRadius: '50px' }}
                className="border-custom text-muted fw-semibold"
              >
                <option value="ALL">Todos los Estados</option>
                <option value="AVAILABLE">Disponibles</option>
                <option value="ADOPTED">Adoptados</option>
              </Form.Select>
            </div>
          </Col>
          <Col md={2} className="text-end">
            <Button 
              variant="outline-primary" 
              onClick={() => refetch()} 
              disabled={isLoading}
              className="rounded-circle p-2 d-inline-flex align-items-center justify-content-center"
              style={{ width: '40px', height: '40px', borderColor: 'var(--color-primary-700)', color: 'var(--color-primary-700)' }}
              title="Actualizar lista"
            >
              <span 
                className={`material-symbols-outlined ${isLoading ? 'spin-animation' : ''}`}
                style={{ fontSize: '20px' }}
              >
                refresh
              </span>
            </Button>
          </Col>
        </Row>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-custom shadow-sm overflow-hidden border-0 mb-4">
        <Table hover responsive className="mb-0 align-middle">
          <thead className="bg-light bg-opacity-70 text-muted" style={{ borderBottom: '2px solid rgba(0,0,0,0.04)' }}>
            <tr>
              <th className="px-4 py-3 border-0 fw-bold">ID</th>
              <th className="px-4 py-3 border-0 fw-bold">Mascota</th>
              <th className="px-4 py-3 border-0 fw-bold">Especie</th>
              <th className="px-4 py-3 border-0 fw-bold">Raza</th>
              <th className="px-4 py-3 border-0 fw-bold">Estado</th>
              <th className="px-4 py-3 border-0 text-end fw-bold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" className="text-center py-5">
                  <Spinner animation="border" variant="primary" role="status" className="mb-2" style={{ color: 'var(--color-primary-700)' }} />
                  <div className="text-muted fw-semibold small">Cargando catálogo de mascotas...</div>
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan="6" className="text-center py-5 text-danger">
                  <span className="material-symbols-outlined mb-2" style={{ fontSize: '48px' }}>error</span>
                  <div className="fw-semibold small">Error al cargar las mascotas del servidor.</div>
                </td>
              </tr>
            ) : petsData.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-5">
                  <span className="material-symbols-outlined text-muted mb-2" style={{ fontSize: '48px' }}>pets</span>
                  <div className="text-muted fw-semibold small">No se encontraron mascotas en esta categoría.</div>
                </td>
              </tr>
            ) : (
              petsData.map((pet) => (
                <tr key={pet.id} className="transition-row">
                  <td className="px-4 py-3 align-middle text-muted small">#{pet.id}</td>
                  <td className="px-4 py-3 align-middle">
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={getPetImageUrl(pet.image)}
                        alt={pet.name}
                        className="rounded-circle object-fit-cover border border-1"
                        style={{ width: '40px', height: '40px', borderColor: 'var(--color-primary-500)' }}
                      />
                      <span className="fw-bold text-dark">{pet.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-middle text-dark">
                    {getSpeciesLabel(pet.species)}
                  </td>
                  <td className="px-4 py-3 align-middle text-muted small">{pet.breed || 'Sin especificar'}</td>
                  <td className="px-4 py-3 align-middle">
                    {getStatusBadge(pet.status)}
                  </td>
                  <td className="px-4 py-3 align-middle text-end">
                    <div className="d-flex justify-content-end gap-2">
                      <Button
                        variant="light"
                        size="sm"
                        className="rounded-circle d-flex align-items-center justify-content-center border-0 bg-light"
                        style={{ width: '32px', height: '32px' }}
                        onClick={() => handleEdit(pet)}
                        title="Editar mascota"
                      >
                        <span
                          className="material-symbols-outlined text-dark"
                          style={{ fontSize: '18px' }}
                        >
                          edit
                        </span>
                      </Button>
                      <Button
                        variant="light"
                        size="sm"
                        className="rounded-circle d-flex align-items-center justify-content-center border-0 bg-light text-danger"
                        style={{ width: '32px', height: '32px' }}
                        onClick={() => handleDeleteClick(pet)}
                        title="Retirar mascota"
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: '18px' }}
                        >
                          delete
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {!isLoading && renderPagination()}

      {/* Edit Form Modal */}
      <PetFormModal
        show={showEditModal}
        onHide={() => {
          setShowEditModal(false);
          setEditingPet(null);
        }}
        editingPet={editingPet}
      />

      {/* MODAL: CONFIRMACIÓN DE ELIMINACIÓN */}
      <Modal show={showConfirmModal} onHide={() => { setShowConfirmModal(false); setPetToDelete(null); }} centered border="0">
        <Modal.Body className="text-center p-5">
          <div className="display-1 mb-4 text-danger">
            <FaTrash />
          </div>
          <h3 className="fw-bold mb-3">¿Estás seguro?</h3>
          <p className="text-muted mb-4 px-3">
            ¿Estás seguro de eliminar la publicación de {petToDelete?.name} de forma permanente? Esta acción no se puede deshacer.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Button
              variant="light"
              onClick={() => { setShowConfirmModal(false); setPetToDelete(null); }}
              className="rounded-pill px-4 fw-bold"
            >
              No, volver
            </Button>
            <Button
              variant="danger"
              onClick={handleConfirmDelete}
              className="rounded-pill px-4 fw-bold shadow-sm"
            >
              Sí, confirmar
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminPets;
