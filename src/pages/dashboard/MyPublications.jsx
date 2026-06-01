import React, { useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Card,
  Alert,
  Form,
  Row,
  Col,
  Spinner,
} from 'react-bootstrap';
import {
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaPaw,
  FaSearch,
  FaUserCheck,
} from 'react-icons/fa';

import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../context/authStore';
import { usePets, useUserPets } from '../../hooks/usePets';
import PetFormModal from '../../components/dashboard/PetFormModal';
import { getPetImageUrl } from '../../lib';
import { useToast } from '../../context/ToastContext';
import { authService } from '../../services/authService';
import { adoptionService } from '../../services/adoptionService';

const MyPublications = () => {
  const { user } = useAuth();

  // --- CONSULTAS Y MUTACIONES API REAL ---
  const { data: pets = [], isLoading, isError, error } = useUserPets(user?.id);

  const {
    updatePet,
    deletePet,
  } = usePets();

  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const [showFormModal, setShowFormModal] = useState(false);
  const [editingPet, setEditingPet] = useState(null);

  // States for search and registering the adopter
  const [adopterEmail, setAdopterEmail] = useState('');
  const [foundAdopter, setFoundAdopter] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [isExternal, setIsExternal] = useState(false);

  // Estado para modales de confirmación (Adoptado / Eliminar)
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    type: '',
    pet: null,
  });

  // --- MANEJADORES DE FORMULARIO ---
  const handleOpenForm = (pet = null) => {
    setEditingPet(pet);
    setShowFormModal(true);
  };

  const handleCloseForm = () => {
    setShowFormModal(false);
    setEditingPet(null);
  };

  // --- MANEJADORES DE ACCIONES RÁPIDAS ---
  const openConfirm = (type, pet) => {
    setConfirmModal({ show: true, type, pet });
    setAdopterEmail('');
    setFoundAdopter(null);
    setSearchError('');
    setIsExternal(false);
  };

  const closeConfirm = () => {
    setConfirmModal({ show: false, type: '', pet: null });
  };

  const handleSearchAdopter = async () => {
    const trimmedEmail = adopterEmail.trim().toLowerCase();
    if (!trimmedEmail) {
      setSearchError('Por favor ingresa un correo electrónico.');
      return;
    }
    setSearchLoading(true);
    setSearchError('');
    setFoundAdopter(null);
    try {
      const response = await authService.getUserByEmail(trimmedEmail);
      const userData = response?.data || response;
      if (userData && userData.id) {
        setFoundAdopter(userData);
      } else {
        setSearchError('Usuario no encontrado con ese correo.');
      }
    } catch (err) {
      console.error('Error al buscar adoptante:', err);
      setSearchError(err?.message || 'Usuario no encontrado en el sistema.');
    } finally {
      setSearchLoading(false);
    }
  };

  const executeConfirmAction = async () => {
    const { type, pet } = confirmModal;
    const petId = pet?.id || pet?._id;
    try {
      if (type === 'adopt') {
        const adopterId = isExternal ? null : (foundAdopter ? foundAdopter.id : null);
        
        // Register the adoption using the new adoptionService API
        await adoptionService.registerAdoption(petId, adopterId);
        showToast(`🎉 ¡Felicitaciones! Se registró la adopción de ${pet?.name} con éxito.`, 'success');
        
        // Invalidate pets queries in the React Query cache so the publications list refreshes
        queryClient.invalidateQueries({ queryKey: ['pets'] });
      } else if (type === 'delete') {
        await deletePet(petId);
      }
    } catch (err) {
      console.error(`Error al ejecutar acción ${type}:`, err);
      showToast(err?.message || `Error al ejecutar acción ${type}`, 'error');
    }
    closeConfirm();
  };

  return (
    <div className="container-fluid py-2">
      {/* HEADER */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
        <div>
          <h2
            className="fw-bold mb-1"
            style={{ color: 'var(--color-primary-700)' }}
          >
            Mis Publicaciones
          </h2>
          <p className="text-muted mb-0">
            Administra y actualiza el estado de tus mascotas publicadas.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => handleOpenForm()}
          className="shadow-sm d-flex align-items-center gap-2 text-nowrap"
          style={{ padding: '12px 24px', fontWeight: '600' }}
        >
          <FaPaw /> Registrar Nueva Mascota
        </Button>
      </div>

      {/* TABLA */}
      <Card
        className="border-0 shadow-sm"
        style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}
      >
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0">
            <thead style={{ backgroundColor: 'var(--color-neutral-100)' }}>
              <tr className="text-secondary small text-uppercase">
                <th className="border-0 p-4">Miniatura</th>
                <th className="border-0 p-4">Nombre</th>
                <th className="border-0 p-4">Especie</th>
                <th className="border-0 p-4">Estado Actual</th>
                <th className="border-0 p-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="text-center p-5">
                    <div className="d-flex flex-column align-items-center gap-3">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Cargando...</span>
                      </div>
                      <span className="text-muted small">
                        Cargando tus publicaciones...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan="5" className="text-center p-5">
                    <Alert variant="danger" className="mb-0">
                      Error al cargar las publicaciones:{' '}
                      {error?.message || 'Error del servidor'}
                    </Alert>
                  </td>
                </tr>
              ) : pets.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-5 text-muted">
                    <div className="py-4">
                      <span
                        className="material-symbols-outlined display-4 mb-2"
                        style={{ color: 'var(--color-neutral-400)' }}
                      >
                        pets
                      </span>
                      <p className="mb-0">
                        No tienes ninguna mascota publicada todavía.
                      </p>
                      <span className="small text-secondary">
                        ¡Haz clic en el botón de arriba para registrar tu
                        primera mascota!
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                pets.map((pet) => {
                  const petId = pet.id || pet._id;
                  const isAdopted = pet.isAdopted || pet.status === 'ADOPTED' || pet.status === 'Adoptado';
                  return (
                    <tr key={petId} className="align-middle">
                      <td className="p-4">
                        <img
                          src={getPetImageUrl(pet.image)}
                          alt={pet.name}
                          style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover',
                            borderRadius: 'var(--radius-md)',
                          }}
                          className="shadow-sm"
                        />
                      </td>
                      <td className="p-4 fw-bold text-dark">{pet.name}</td>
                      <td className="p-4 text-muted">
                        {pet.species === 'dogs' || pet.species === 'DOG'
                          ? 'Perro'
                          : pet.species === 'cats' || pet.species === 'CAT'
                            ? 'Gato'
                            : pet.species === 'others' || pet.species === 'OTHER'
                              ? 'Otro'
                              : pet.species}
                      </td>
                      <td className="p-4">
                        <span
                          className={`badge rounded-pill ${isAdopted ? 'bg-info' : 'bg-success'}`}
                          style={{
                            fontWeight: '600',
                            padding: '8px 16px',
                            fontSize: '0.85rem',
                          }}
                        >
                          {isAdopted ? 'Adoptado' : 'Buscando hogar'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="d-flex justify-content-center gap-2">
                          <Button
                            variant="light"
                            size="sm"
                            className="text-primary rounded-pill px-3"
                            onClick={() => handleOpenForm(pet)}
                            title="Editar información"
                          >
                            <FaEdit className="me-1" /> Editar
                          </Button>

                          {!isAdopted && (
                            <Button
                              variant="light"
                              size="sm"
                              className="text-success rounded-pill px-3"
                              onClick={() => openConfirm('adopt', pet)}
                              title="Marcar como adoptado"
                            >
                              <FaCheckCircle className="me-1" /> Adoptado
                            </Button>
                          )}

                          <Button
                            variant="light"
                            size="sm"
                            className="text-danger rounded-pill px-3"
                            onClick={() => openConfirm('delete', pet)}
                            title="Eliminar publicación"
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* MODAL: REGISTRO / EDICIÓN */}
      <PetFormModal
        show={showFormModal}
        onHide={handleCloseForm}
        editingPet={editingPet}
      />

      {/* MODAL: CONFIRMACIÓN (ADOPTADO / ELIMINAR) */}
      <Modal show={confirmModal.show} onHide={closeConfirm} centered border="0" size={confirmModal.type === 'adopt' ? 'lg' : undefined}>
        <Modal.Body className={confirmModal.type === 'adopt' ? "p-5" : "text-center p-5"}>
          {confirmModal.type === 'adopt' ? (
            <div>
              <div className="text-center mb-4">
                <div className="display-1 text-success mb-2">
                  <FaCheckCircle />
                </div>
                <h3 className="fw-bold" style={{ color: 'var(--color-primary-700)' }}>¡Registrar Adopción!</h3>
                <p className="text-muted">
                  Completa los datos para registrar la adopción de <strong>{confirmModal.pet?.name}</strong>.
                </p>
              </div>

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold text-muted small mb-2">TIPO DE ADOPTANTE</Form.Label>
                <div className="d-flex gap-4">
                  <Form.Check
                    type="radio"
                    id="radio-registered"
                    label="Adoptante registrado en AdoptApp"
                    name="adopterType"
                    checked={!isExternal}
                    onChange={() => {
                      setIsExternal(false);
                      setSearchError('');
                    }}
                    className="fw-semibold text-dark"
                  />
                  <Form.Check
                    type="radio"
                    id="radio-external"
                    label="Adoptante externo (sin cuenta)"
                    name="adopterType"
                    checked={isExternal}
                    onChange={() => {
                      setIsExternal(true);
                      setFoundAdopter(null);
                      setAdopterEmail('');
                      setSearchError('');
                    }}
                    className="fw-semibold text-dark"
                  />
                </div>
              </Form.Group>

              {!isExternal ? (
                <div className="bg-light rounded-custom p-4 mb-4" style={{ backgroundColor: '#fcfcf8', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '15px' }}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold text-muted small">Buscar por correo electrónico:</Form.Label>
                    <Row className="g-2">
                      <Col>
                        <Form.Control
                          type="email"
                          placeholder="correo@ejemplo.com"
                          value={adopterEmail}
                          onChange={(e) => setAdopterEmail(e.target.value)}
                          className="border-custom bg-white"
                          style={{ borderRadius: '50px' }}
                        />
                      </Col>
                      <Col xs="auto">
                        <Button
                          variant="primary"
                          onClick={handleSearchAdopter}
                          disabled={searchLoading || !adopterEmail.trim()}
                          className="rounded-pill px-4 d-flex align-items-center gap-2"
                        >
                          {searchLoading ? (
                            <Spinner animation="border" size="sm" />
                          ) : (
                            <FaSearch />
                          )}
                          Buscar
                        </Button>
                      </Col>
                    </Row>
                  </Form.Group>

                  {searchError && (
                    <Alert variant="danger" className="py-2 px-3 small border-0 mb-0 mt-2" style={{ borderRadius: '10px' }}>
                      <span className="material-symbols-outlined align-middle me-2 fs-6">error</span>
                      {searchError}
                    </Alert>
                  )}

                  {foundAdopter && (
                    <Alert variant="success" className="d-flex align-items-center gap-3 mb-0 mt-3 border-0" style={{ borderRadius: '12px', backgroundColor: 'rgba(46, 204, 113, 0.1)' }}>
                      <FaUserCheck className="text-success fs-3" />
                      <div>
                        <div className="fw-bold text-dark">{foundAdopter.fullName}</div>
                        <div className="small text-muted">{foundAdopter.email} {foundAdopter.dni ? `• DNI: ${foundAdopter.dni}` : ''}</div>
                      </div>
                    </Alert>
                  )}
                </div>
              ) : (
                <Alert variant="warning" className="d-flex align-items-center gap-3 mb-4 border-0" style={{ borderRadius: '12px', backgroundColor: 'rgba(241, 196, 15, 0.1)', color: '#a07800' }}>
                  <span className="material-symbols-outlined fs-2">info</span>
                  <div className="small">
                    Se creará un registro de adopción externo. La mascota se marcará como **Adoptada**, pero no estará vinculada a ningún usuario registrado del sistema.
                  </div>
                </Alert>
              )}

              <div className="d-flex gap-3 justify-content-end mt-4">
                <Button
                  variant="light"
                  onClick={closeConfirm}
                  className="rounded-pill px-4 fw-bold"
                >
                  Cancelar
                </Button>
                <Button
                  variant="success"
                  onClick={executeConfirmAction}
                  disabled={!isExternal && !foundAdopter}
                  className="rounded-pill px-4 fw-bold shadow-sm"
                >
                  Confirmar Adopción
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="display-1 mb-4 text-danger">
                <FaTrash />
              </div>
              <h3 className="fw-bold mb-3">¿Estás seguro?</h3>
              <p className="text-muted mb-4 px-3">
                ¿Estás seguro de eliminar la publicación de {confirmModal.pet?.name} de forma permanente? Esta acción no se puede deshacer.
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <Button
                  variant="light"
                  onClick={closeConfirm}
                  className="rounded-pill px-4 fw-bold"
                >
                  No, volver
                </Button>
                <Button
                  variant="danger"
                  onClick={executeConfirmAction}
                  className="rounded-pill px-4 fw-bold shadow-sm"
                >
                  Sí, confirmar
                </Button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MyPublications;
