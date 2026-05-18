import React, { useState, useEffect } from 'react';
import { Modal, Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { FaCamera, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/authStore';
import { usePets } from '../../hooks/usePets';

const PetFormModal = ({ show, onHide, editingPet }) => {
  const { user } = useAuth();
  const { createPet, updatePet, isCreating, isUpdating } = usePets();

  const [formData, setFormData] = useState({
    name: '',
    species: 'dogs',
    age: '',
    color: '',
    size: 'Pequeño',
    description: '',
    image: '',
  });

  const [imagePreview, setImagePreview] = useState(null);

  // Cargar datos en el formulario cuando se abre el modal para edición
  useEffect(() => {
    if (show) {
      if (editingPet) {
        let mappedSpecies = 'dogs';
        if (editingPet.species === 'DOG') mappedSpecies = 'dogs';
        else if (editingPet.species === 'CAT') mappedSpecies = 'cats';
        else if (editingPet.species === 'OTHER') mappedSpecies = 'others';
        else if (editingPet.species) mappedSpecies = editingPet.species.toLowerCase();

        let mappedSize = 'Pequeño';
        if (editingPet.size === 'SMALL') mappedSize = 'Pequeño';
        else if (editingPet.size === 'MEDIUM') mappedSize = 'Mediano';
        else if (editingPet.size === 'LARGE') mappedSize = 'Grande';
        else if (editingPet.size) mappedSize = editingPet.size;

        setFormData({
          name: editingPet.name || '',
          species: mappedSpecies,
          age: editingPet.age || '',
          color: editingPet.color || '',
          size: mappedSize,
          description: editingPet.description || '',
          image: editingPet.image || '',
        });
        setImagePreview(editingPet.image || null);
      } else {
        setFormData({
          name: '',
          species: 'dogs',
          age: '',
          color: '',
          size: 'Pequeño',
          description: '',
          image: '',
        });
        setImagePreview(null);
      }
    }
  }, [show, editingPet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: '' }));
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let mappedSpecies = 'OTHER';
      if (formData.species === 'dogs') mappedSpecies = 'DOG';
      else if (formData.species === 'cats') mappedSpecies = 'CAT';
      else if (formData.species === 'others') mappedSpecies = 'OTHER';

      let mappedSize = 'SMALL';
      if (formData.size === 'Pequeño') mappedSize = 'SMALL';
      else if (formData.size === 'Mediano') mappedSize = 'MEDIUM';
      else if (formData.size === 'Grande') mappedSize = 'LARGE';

      let mappedStatus = 'AVAILABLE';
      if (editingPet) {
        if (editingPet.status === 'Adoptado' || editingPet.status === 'ADOPTED') {
          mappedStatus = 'ADOPTED';
        } else {
          mappedStatus = 'AVAILABLE';
        }
      }

      if (editingPet) {
        await updatePet({
          id: editingPet.id || editingPet._id,
          data: {
            ...formData,
            species: mappedSpecies,
            size: mappedSize,
            status: mappedStatus,
            userId: user?.id,
          },
        });
      } else {
        const newPet = {
          ...formData,
          species: mappedSpecies,
          size: mappedSize,
          isAdopted: false,
          status: 'AVAILABLE',
          userId: user?.id,
          image:
            formData.image ||
            'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=100&h=100&fit=crop',
        };
        await createPet(newPet);
      }
      onHide();
    } catch (err) {
      console.error('Error al procesar mascota:', err);
    }
  };

  const isSaving = isCreating || isUpdating;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="border-0 px-4 pt-4">
        <Modal.Title
          className="fw-bold"
          style={{ color: 'var(--color-primary-700)' }}
        >
          {editingPet
            ? `Editar a ${editingPet.name}`
            : 'Registrar Nueva Mascota'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 pb-4">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold small">
                  Nombre de la mascota
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ej. Max"
                  required
                  style={{
                    borderRadius: 'var(--radius-md)',
                    padding: '12px',
                  }}
                  disabled={isSaving}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold small">Especie</Form.Label>
                <Form.Select
                  name="species"
                  value={formData.species}
                  onChange={handleChange}
                  style={{
                    borderRadius: 'var(--radius-md)',
                    padding: '12px',
                  }}
                  disabled={isSaving}
                >
                  <option value="dogs">Perro</option>
                  <option value="cats">Gato</option>
                  <option value="others">Otro</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold small">Edad</Form.Label>
                <Form.Control
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Ej. 2 años"
                  required
                  style={{
                    borderRadius: 'var(--radius-md)',
                    padding: '12px',
                  }}
                  disabled={isSaving}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold small">Color</Form.Label>
                <Form.Control
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="Ej. Canela"
                  required
                  style={{
                    borderRadius: 'var(--radius-md)',
                    padding: '12px',
                  }}
                  disabled={isSaving}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold small">Tamaño</Form.Label>
                <Form.Select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  style={{
                    borderRadius: 'var(--radius-md)',
                    padding: '12px',
                  }}
                  disabled={isSaving}
                >
                  <option>Pequeño</option>
                  <option>Mediano</option>
                  <option>Grande</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold small">
              Foto de la mascota
            </Form.Label>
            <div
              className="d-flex flex-column align-items-center p-4 border-dashed rounded-3 text-center"
              style={{
                border: '2px dashed var(--color-neutral-300)',
                backgroundColor: 'var(--color-neutral-50)',
                cursor: isSaving ? 'not-allowed' : 'pointer',
                position: 'relative',
                transition: 'all 0.2s ease',
              }}
              onClick={() =>
                !isSaving && document.getElementById('petImageInput').click()
              }
            >
              {imagePreview ? (
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '300px',
                  }}
                >
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-md)',
                    }}
                  />
                  {!isSaving && (
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
                        border: '2px solid white',
                      }}
                    >
                      <FaTimes />
                    </Button>
                  )}
                </div>
              ) : (
                <div className="py-2">
                  <FaCamera size={40} className="text-muted mb-2" />
                  <p className="mb-0 text-muted small">
                    Haz clic para subir una foto
                  </p>
                  <span
                    className="text-secondary"
                    style={{ fontSize: '0.75rem' }}
                  >
                    JPG, PNG (Máx. 5MB)
                  </span>
                </div>
              )}
              <Form.Control
                id="petImageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="d-none"
                disabled={isSaving}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold small">
              Descripción / Historia
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Cuenta un poco sobre su temperamento..."
              style={{ borderRadius: 'var(--radius-md)', padding: '12px' }}
              disabled={isSaving}
            />
          </Form.Group>

          <div className="d-flex gap-2 justify-content-end">
            <Button
              variant="light"
              onClick={onHide}
              className="rounded-pill px-4 text-muted fw-bold"
              disabled={isSaving}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="rounded-pill px-5 fw-bold shadow-sm d-flex align-items-center gap-2"
              disabled={isSaving}
            >
              {isSaving && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              {editingPet ? 'Guardar Cambios' : 'Publicar Mascota'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PetFormModal;
