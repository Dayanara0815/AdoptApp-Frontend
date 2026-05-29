import React, { useState, useEffect } from 'react';
import { Modal, Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import {
  FaCamera,
  FaTimes,
  FaPaw,
  FaCalendarAlt,
  FaPalette,
  FaRulerCombined,
  FaHistory,
  FaDog,
  FaCat,
  FaQuestionCircle,
  FaImage,
} from 'react-icons/fa';
import { useAuth } from '../../context/authStore';
import { usePets } from '../../hooks/usePets';
import { useUploadFile } from '../../hooks/useUploadFile';
import { getPetImageUrl } from '../../lib';

const PetFormModal = ({ show, onHide, editingPet }) => {
  const { user } = useAuth();
  const { createPet, updatePet, isCreating, isUpdating } = usePets();
  const { uploadFile, isUploading } = useUploadFile();

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
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

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
        setImagePreview(editingPet.image ? getPetImageUrl(editingPet.image) : null);
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

  const processFile = async (file) => {
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen no debe superar los 5MB.');
        return;
      }
      try {
        const uploadRes = await uploadFile(file);
        const relativePath = `/api/files/${uploadRes.fileName}`;
        setFormData((prev) => ({ ...prev, image: relativePath }));
        setImagePreview(getPetImageUrl(relativePath));
      } catch (err) {
        console.error('Error al subir imagen:', err);
        setImagePreview(null);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
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
          image: formData.image || 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=100&h=100&fit=crop',
          species: mappedSpecies,
          size: mappedSize,
          isAdopted: false,
          status: 'AVAILABLE',
          userId: user?.id,
        };
        await createPet(newPet);
      }
      onHide();
    } catch (err) {
      console.error('Error al procesar mascota:', err);
    }
  };

  const isSaving = isCreating || isUpdating || isUploading;


  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      contentClassName="border-0 shadow-lg"
      style={{ backdropFilter: 'blur(4px)' }}
    >
      {/* Barra de acento con gradiente premium */}
      <div
        style={{
          height: '6px',
          background: 'linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)',
          width: '100%',
        }}
      />
      <Modal.Header closeButton className="border-0 px-4 pt-4 pb-2">
        <div>
          <Modal.Title
            className="fw-bold d-flex align-items-center gap-2"
            style={{ color: 'var(--primary)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span className="material-symbols-outlined fs-2">pets</span>
            {editingPet ? `Editar a ${editingPet.name}` : 'Registrar Nueva Mascota'}
          </Modal.Title>
          <p className="text-muted small mb-0 mt-1">
            Completa los detalles para publicarla en el catálogo de adopción.
          </p>
        </div>
      </Modal.Header>
      <Modal.Body className="px-4 pb-4 pt-2" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold text-dark mb-2 d-flex align-items-center gap-2 small">
                  <FaPaw style={{ color: 'var(--primary)', opacity: 0.85 }} /> Nombre de la mascota
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ej. Emiliano"
                  required
                  style={{
                    borderRadius: '12px',
                    padding: '13px 16px',
                    border: '1.5px solid var(--surface-variant)',
                    backgroundColor: '#fafaf5',
                    fontSize: '0.925rem',
                    transition: 'all 0.2s',
                  }}
                  disabled={isSaving}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold text-dark mb-2 d-flex align-items-center gap-2 small">
                  {formData.species === 'dogs' ? (
                    <FaDog style={{ color: 'var(--primary)', opacity: 0.85 }} />
                  ) : formData.species === 'cats' ? (
                    <FaCat style={{ color: 'var(--primary)', opacity: 0.85 }} />
                  ) : (
                    <FaQuestionCircle style={{ color: 'var(--primary)', opacity: 0.85 }} />
                  )}
                  Especie
                </Form.Label>
                <Form.Select
                  name="species"
                  value={formData.species}
                  onChange={handleChange}
                  style={{
                    borderRadius: '12px',
                    padding: '13px 16px',
                    border: '1.5px solid var(--surface-variant)',
                    backgroundColor: '#fafaf5',
                    fontSize: '0.925rem',
                    cursor: 'pointer',
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

          <Row className="g-3 mt-1">
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fw-semibold text-dark mb-2 d-flex align-items-center gap-2 small">
                  <FaCalendarAlt style={{ color: 'var(--primary)', opacity: 0.85 }} /> Edad
                </Form.Label>
                <Form.Control
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Ej. 2 años"
                  required
                  style={{
                    borderRadius: '12px',
                    padding: '13px 16px',
                    border: '1.5px solid var(--surface-variant)',
                    backgroundColor: '#fafaf5',
                    fontSize: '0.925rem',
                  }}
                  disabled={isSaving}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fw-semibold text-dark mb-2 d-flex align-items-center gap-2 small">
                  <FaPalette style={{ color: 'var(--primary)', opacity: 0.85 }} /> Color
                </Form.Label>
                <Form.Control
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="Ej. Canela"
                  required
                  style={{
                    borderRadius: '12px',
                    padding: '13px 16px',
                    border: '1.5px solid var(--surface-variant)',
                    backgroundColor: '#fafaf5',
                    fontSize: '0.925rem',
                  }}
                  disabled={isSaving}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fw-semibold text-dark mb-2 d-flex align-items-center gap-2 small">
                  <FaRulerCombined style={{ color: 'var(--primary)', opacity: 0.85 }} /> Tamaño
                </Form.Label>
                <Form.Select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  style={{
                    borderRadius: '12px',
                    padding: '13px 16px',
                    border: '1.5px solid var(--surface-variant)',
                    backgroundColor: '#fafaf5',
                    fontSize: '0.925rem',
                    cursor: 'pointer',
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

          <Form.Group className="mt-3 mb-3">
            <Form.Label className="fw-semibold text-dark mb-2 d-flex align-items-center gap-2 small">
              <FaImage style={{ color: 'var(--primary)', opacity: 0.85 }} /> Foto de la mascota
            </Form.Label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{
                border: isDragOver
                  ? '2px dashed var(--primary)'
                  : '2px dashed var(--surface-variant)',
                backgroundColor: isDragOver
                  ? 'rgba(74, 101, 79, 0.08)'
                  : 'rgba(74, 101, 79, 0.02)',
                borderRadius: '16px',
                cursor: isSaving ? 'not-allowed' : 'pointer',
                position: 'relative',
                transition: 'all 0.25s ease',
                padding: '24px 16px',
              }}
              onClick={() => !isSaving && document.getElementById('petImageInput').click()}
              className="d-flex flex-column align-items-center justify-content-center text-center hover-scale shadow-sm"
            >
              {isUploading ? (
                <div className="py-4 d-flex flex-column align-items-center justify-content-center">
                  <Spinner animation="border" variant="primary" className="mb-2" />
                  <p className="mb-0 text-dark fw-medium small">Subiendo imagen al servidor...</p>
                </div>
              ) : imagePreview ? (
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '280px',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                  }}
                >
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: '100%',
                      height: '180px',
                      objectFit: 'cover',
                    }}
                  />
                  {!isSaving && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage();
                      }}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#d9534f',
                        color: 'white',
                        border: '2px solid white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                        cursor: 'pointer',
                        transition: 'transform 0.15s ease',
                      }}
                      title="Eliminar foto"
                    >
                      <FaTimes size={14} />
                    </button>
                  )}
                </div>
              ) : (
                <div className="py-2">
                  <FaCamera size={36} className="mb-2 text-primary opacity-75" />
                  <p className="mb-1 text-dark fw-medium small">
                    Arrastra una foto aquí o haz clic para buscar
                  </p>
                  <span
                    className="text-muted"
                    style={{ fontSize: '0.75rem' }}
                  >
                    Formatos aceptados: JPG, PNG (Máx. 5MB)
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
            <Form.Label className="fw-semibold text-dark mb-2 d-flex align-items-center gap-2 small">
              <FaHistory style={{ color: 'var(--primary)', opacity: 0.85 }} /> Descripción / Historia
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Cuenta un poco sobre su temperamento, de dónde viene, qué le gusta hacer..."
              style={{
                borderRadius: '12px',
                padding: '14px',
                border: '1.5px solid var(--surface-variant)',
                backgroundColor: '#fafaf5',
                fontSize: '0.925rem',
              }}
              disabled={isSaving}
            />
          </Form.Group>

          <div className="d-flex gap-2 justify-content-end border-top pt-3">
            <Button
              variant="link"
              onClick={onHide}
              className="text-decoration-none px-4 text-muted fw-semibold"
              style={{ borderRadius: '50px', fontSize: '0.9rem' }}
              disabled={isSaving}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="rounded-pill px-5 fw-bold shadow-sm d-flex align-items-center gap-2 text-white border-0"
              style={{
                backgroundColor: 'var(--primary)',
                padding: '12px 32px',
                transition: 'all 0.2s',
              }}
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
