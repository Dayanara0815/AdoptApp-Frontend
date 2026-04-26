import React, { useState } from 'react';
import { Table, Button, Modal, Form, Row, Col, Card, Alert } from 'react-bootstrap';
import { FaEdit, FaTrash, FaCheckCircle, FaPaw, FaCamera, FaTimes } from 'react-icons/fa';

import useLocalStorage from '../../hooks/useLocalStorage';

const INITIAL_PETS = [
  { 
    id: 1, 
    name: 'Firulais', 
    species: 'Perro', 
    age: '2 años', 
    color: 'Marrón', 
    size: 'Mediano', 
    status: 'Buscando hogar',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=100&h=100&fit=crop',
    description: 'Un perro muy juguetón y cariñoso.'
  },
  { 
    id: 2, 
    name: 'Luna', 
    species: 'Gato', 
    age: '5 meses', 
    color: 'Blanco', 
    size: 'Pequeño', 
    status: 'Adoptado',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&h=100&fit=crop',
    description: 'Una gatita tranquila que busca tranquilidad.'
  },
];

const MyPublications = () => {
  // --- ESTADOS ---
  const { 
    data: pets, 
    createItem: addPet, 
    updateItem: editPet, 
    deleteItem: removePet 
  } = useLocalStorage('adopt_app_publications', INITIAL_PETS);

  const [showFormModal, setShowFormModal] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    species: 'Perro',
    age: '',
    color: '',
    size: 'Pequeño',
    description: '',
    image: ''
  });

  // Estado para modales de confirmación (Adoptado / Eliminar)
  const [confirmModal, setConfirmModal] = useState({ show: false, type: '', pet: null });
  const [imagePreview, setImagePreview] = useState(null);

  // --- MANEJADORES DE FORMULARIO ---
  const handleOpenForm = (pet = null) => {
    if (pet) {
      setEditingPet(pet);
      setFormData(pet);
      setImagePreview(pet.image);
    } else {
      setEditingPet(null);
      setFormData({ name: '', species: 'Perro', age: '', color: '', size: 'Pequeño', description: '', image: '' });
      setImagePreview(null);
    }
    setShowFormModal(true);
  };

  const handleCloseForm = () => {
    setShowFormModal(false);
    setEditingPet(null);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, image: '' });
    setImagePreview(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPet) {
      editPet(editingPet.id, formData);
    } else {
      const newPet = {
        ...formData,
        status: 'Buscando hogar',
        image: formData.image || 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=100&h=100&fit=crop'
      };
      addPet(newPet);
    }
    handleCloseForm();
  };

  // --- MANEJADORES DE ACCIONES RÁPIDAS ---
  const openConfirm = (type, pet) => {
    setConfirmModal({ show: true, type, pet });
  };

  const closeConfirm = () => {
    setConfirmModal({ show: false, type: '', pet: null });
  };

  const executeConfirmAction = () => {
    const { type, pet } = confirmModal;
    if (type === 'adopt') {
      editPet(pet.id, { status: 'Adoptado' });
    } else if (type === 'delete') {
      removePet(pet.id);
    }
    closeConfirm();
  };

  return (
    <div className="container-fluid py-2">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: 'var(--color-primary-700)' }}>Mis Publicaciones</h2>
          <p className="text-muted">Administra y actualiza el estado de tus mascotas publicadas.</p>
        </div>
        <Button 
          variant="primary" 
          onClick={() => handleOpenForm()}
          className="shadow-sm d-flex align-items-center gap-2"
          style={{ padding: '12px 24px', fontWeight: '600' }}
        >
          <FaPaw /> Registrar Nueva Mascota
        </Button>
      </div>

      {/* TABLA */}
      <Card className="border-0 shadow-sm" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
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
              {pets.map((pet) => (
                <tr key={pet.id} className="align-middle">
                  <td className="p-4">
                    <img 
                      src={pet.image} 
                      alt={pet.name} 
                      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
                      className="shadow-sm"
                    />
                  </td>
                  <td className="p-4 fw-bold text-dark">{pet.name}</td>
                  <td className="p-4 text-muted">{pet.species}</td>
                  <td className="p-4">
                    <span 
                      className={`badge rounded-pill ${pet.status === 'Buscando hogar' ? 'bg-success' : 'bg-info'}`}
                      style={{ fontWeight: '600', padding: '8px 16px', fontSize: '0.85rem' }}
                    >
                      {pet.status}
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
                      
                      {pet.status !== 'Adoptado' && (
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
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* MODAL: REGISTRO / EDICIÓN */}
      <Modal show={showFormModal} onHide={handleCloseForm} size="lg" centered>
        <Modal.Header closeButton className="border-0 px-4 pt-4">
          <Modal.Title className="fw-bold" style={{ color: 'var(--color-primary-700)' }}>
            {editingPet ? `Editar a ${editingPet.name}` : 'Registrar Nueva Mascota'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 pb-4">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold small">Nombre de la mascota</Form.Label>
                  <Form.Control 
                    type="text" name="name" value={formData.name} onChange={handleChange}
                    placeholder="Ej. Max" required 
                    style={{ borderRadius: 'var(--radius-md)', padding: '12px' }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold small">Especie</Form.Label>
                  <Form.Select 
                    name="species" value={formData.species} onChange={handleChange}
                    style={{ borderRadius: 'var(--radius-md)', padding: '12px' }}
                  >
                    <option>Perro</option>
                    <option>Gato</option>
                    <option>Conejo</option>
                    <option>Otro</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold small">Edad</Form.Label>
                  <Form.Control 
                    type="text" name="age" value={formData.age} onChange={handleChange}
                    placeholder="Ej. 2 años" required 
                    style={{ borderRadius: 'var(--radius-md)', padding: '12px' }}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold small">Color</Form.Label>
                  <Form.Control 
                    type="text" name="color" value={formData.color} onChange={handleChange}
                    placeholder="Ej. Canela" required 
                    style={{ borderRadius: 'var(--radius-md)', padding: '12px' }}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold small">Tamaño</Form.Label>
                  <Form.Select 
                    name="size" value={formData.size} onChange={handleChange}
                    style={{ borderRadius: 'var(--radius-md)', padding: '12px' }}
                  >
                    <option>Pequeño</option>
                    <option>Mediano</option>
                    <option>Grande</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold small">Foto de la mascota</Form.Label>
              <div className="d-flex flex-column align-items-center p-4 border-dashed rounded-3 text-center" 
                   style={{ 
                     border: '2px dashed var(--color-neutral-300)', 
                     backgroundColor: 'var(--color-neutral-50)',
                     cursor: 'pointer',
                     position: 'relative',
                     transition: 'all 0.2s ease'
                   }}
                   onClick={() => document.getElementById('petImageInput').click()}
              >
                {imagePreview ? (
                  <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} 
                    />
                    <Button 
                      variant="danger" 
                      size="sm" 
                      className="position-absolute top-0 end-0 m-2 rounded-circle shadow-sm d-flex align-items-center justify-content-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage();
                      }}
                      style={{ 
                        width: '24px', 
                        height: '24px', 
                        padding: '0',
                        fontSize: '0.7rem',
                        border: '2px solid white'
                      }}
                    >
                      <FaTimes />
                    </Button>
                  </div>
                ) : (
                  <div className="py-2">
                    <FaCamera size={40} className="text-muted mb-2" />
                    <p className="mb-0 text-muted small">Haz clic para subir una foto</p>
                    <span className="text-secondary" style={{ fontSize: '0.75rem' }}>JPG, PNG (Máx. 5MB)</span>
                  </div>
                )}
                <Form.Control 
                  id="petImageInput"
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  className="d-none"
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold small">Descripción / Historia</Form.Label>
              <Form.Control 
                as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange}
                placeholder="Cuenta un poco sobre su temperamento..." 
                style={{ borderRadius: 'var(--radius-md)', padding: '12px' }}
              />
            </Form.Group>

            <div className="d-flex gap-2 justify-content-end">
              <Button variant="light" onClick={handleCloseForm} className="rounded-pill px-4 text-muted fw-bold">
                Cancelar
              </Button>
              <Button variant="primary" type="submit" className="rounded-pill px-5 fw-bold shadow-sm">
                {editingPet ? 'Guardar Cambios' : 'Publicar Mascota'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* MODAL: CONFIRMACIÓN (ADOPTADO / ELIMINAR) */}
      <Modal show={confirmModal.show} onHide={closeConfirm} centered border="0">
        <Modal.Body className="text-center p-5">
          <div 
            className={`display-1 mb-4 ${confirmModal.type === 'adopt' ? 'text-success' : 'text-danger'}`}
          >
            {confirmModal.type === 'adopt' ? <FaCheckCircle /> : <FaTrash />}
          </div>
          <h3 className="fw-bold mb-3">
            {confirmModal.type === 'adopt' ? '¡Grandes noticias!' : '¿Estás seguro?'}
          </h3>
          <p className="text-muted mb-4 px-3">
            {confirmModal.type === 'adopt' 
              ? `¿Confirmas que ${confirmModal.pet?.name} ya encontró un hogar definitivo?`
              : `¿Estás seguro de eliminar la publicación de ${confirmModal.pet?.name} de forma permanente? Esta acción no se puede deshacer.`
            }
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Button variant="light" onClick={closeConfirm} className="rounded-pill px-4 fw-bold">
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
