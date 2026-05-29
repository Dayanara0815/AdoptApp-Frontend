import React, { useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Card,
  Alert,
} from 'react-bootstrap';
import {
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaPaw,
} from 'react-icons/fa';

import { useAuth } from '../../context/authStore';
import { usePets, useUserPets } from '../../hooks/usePets';
import PetFormModal from '../../components/dashboard/PetFormModal';
import { getPetImageUrl } from '../../lib';

const MyPublications = () => {
  const { user } = useAuth();

  // --- CONSULTAS Y MUTACIONES API REAL ---
  const { data: pets = [], isLoading, isError, error } = useUserPets(user?.id);

  const {
    updatePet,
    deletePet,
  } = usePets();

  const [showFormModal, setShowFormModal] = useState(false);
  const [editingPet, setEditingPet] = useState(null);

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
  };

  const closeConfirm = () => {
    setConfirmModal({ show: false, type: '', pet: null });
  };

  const executeConfirmAction = async () => {
    const { type, pet } = confirmModal;
    const petId = pet?.id || pet?._id;
    try {
      if (type === 'adopt') {
        let mappedSpecies = 'OTHER';
        if (pet.species === 'dogs' || pet.species === 'DOG') mappedSpecies = 'DOG';
        else if (pet.species === 'cats' || pet.species === 'CAT') mappedSpecies = 'CAT';

        let mappedSize = 'SMALL';
        if (pet.size === 'Pequeño' || pet.size === 'SMALL') mappedSize = 'SMALL';
        else if (pet.size === 'Mediano' || pet.size === 'MEDIUM') mappedSize = 'MEDIUM';
        else if (pet.size === 'Grande' || pet.size === 'LARGE') mappedSize = 'LARGE';

        await updatePet({
          id: petId,
          data: {
            ...pet,
            species: mappedSpecies,
            size: mappedSize,
            isAdopted: true,
            status: 'ADOPTED',
          },
        });
      } else if (type === 'delete') {
        await deletePet(petId);
      }
    } catch (err) {
      console.error(`Error al ejecutar acción ${type}:`, err);
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
                  const isAdopted = pet.isAdopted || pet.status === 'Adoptado';
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
      <Modal show={confirmModal.show} onHide={closeConfirm} centered border="0">
        <Modal.Body className="text-center p-5">
          <div
            className={`display-1 mb-4 ${confirmModal.type === 'adopt' ? 'text-success' : 'text-danger'}`}
          >
            {confirmModal.type === 'adopt' ? <FaCheckCircle /> : <FaTrash />}
          </div>
          <h3 className="fw-bold mb-3">
            {confirmModal.type === 'adopt'
              ? '¡Grandes noticias!'
              : '¿Estás seguro?'}
          </h3>
          <p className="text-muted mb-4 px-3">
            {confirmModal.type === 'adopt'
              ? `¿Confirmas que ${confirmModal.pet?.name} ya encontró un hogar definitivo?`
              : `¿Estás seguro de eliminar la publicación de ${confirmModal.pet?.name} de forma permanente? Esta acción no se puede deshacer.`}
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
              variant={confirmModal.type === 'adopt' ? 'success' : 'danger'}
              onClick={executeConfirmAction}
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

export default MyPublications;
