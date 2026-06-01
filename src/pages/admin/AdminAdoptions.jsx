import React, { useState, useEffect } from 'react';
import { Table, Badge, Button, Pagination, Form, Row, Col, Spinner, Modal } from 'react-bootstrap';
import { adoptionService } from '../../services/adoptionService';
import { getPetImageUrl, formatDate } from '../../lib';
import { useToast } from '../../context/ToastContext';

const AdminAdoptions = () => {
  const { showToast } = useToast();

  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0); // 0-indexed for Spring Boot
  const [pageSize] = useState(8); // 8 rows per page
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // Filter/Search states
  const [searchTerm, setSearchTerm] = useState('');

  // Certificate Modal state
  const [selectedAdoption, setSelectedAdoption] = useState(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const fetchAdoptions = async () => {
    setLoading(true);
    try {
      const response = await adoptionService.getAdoptionsPage(searchTerm, currentPage, pageSize);
      const apiData = response?.data || response;
      if (apiData) {
        setAdoptions(apiData.content || []);
        setTotalPages(apiData.totalPages || 1);
        setTotalElements(apiData.totalElements || 0);
      } else {
        setAdoptions([]);
        setTotalPages(1);
        setTotalElements(0);
      }
    } catch (err) {
      console.error('Error al cargar las adopciones:', err);
      showToast(err?.message || 'Error al obtener la lista de adopciones desde el servidor.', 'error');
      setAdoptions([]);
      setTotalPages(1);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdoptions();
  }, [currentPage, pageSize, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const handleOpenCertificate = (adoption) => {
    setSelectedAdoption(adoption);
    setShowCertificateModal(true);
  };

  const handlePrintCertificate = () => {
    const printContent = document.getElementById('adoption-certificate-printable').innerHTML;
    const originalContent = document.body.innerHTML;
    
    // Simple custom print window/styling for a clean experience
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Certificado de Adopcion</title>
          <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&family=Playfair+Display:ital,wght@0,600;0,800;1,400&display=swap" rel="stylesheet">
          <style>
            body {
              font-family: 'Plus Jakarta Sans', sans-serif;
              padding: 40px;
              background-color: #ffffff;
            }
            .certificate-container {
              border: 15px double #5f7e6d;
              padding: 40px;
              background-color: #fafaf5;
              text-align: center;
              border-radius: 12px;
              box-shadow: 0 4px 20px rgba(0,0,0,0.05);
            }
            .cert-title {
              font-family: 'Playfair Display', serif;
              color: #5f7e6d;
              font-size: 2.5rem;
              font-weight: 800;
              letter-spacing: 2px;
              margin-top: 10px;
              margin-bottom: 5px;
            }
            .cert-subtitle {
              font-family: 'Playfair Display', serif;
              font-style: italic;
              color: #6b6375;
              font-size: 1.25rem;
              margin-bottom: 40px;
            }
            .cert-body {
              font-size: 1.1rem;
              line-height: 1.8;
              color: #2d3436;
              margin-bottom: 40px;
            }
            .cert-body strong {
              color: #5f7e6d;
              font-size: 1.3rem;
            }
            .cert-meta-table {
              width: 80%;
              margin: 0 auto 50px auto;
              border-collapse: collapse;
            }
            .cert-meta-table td {
              padding: 10px;
              border-bottom: 1px solid rgba(95, 126, 109, 0.15);
              font-size: 0.95rem;
            }
            .cert-meta-label {
              font-weight: 700;
              color: #6b6375;
              text-align: left;
              width: 35%;
            }
            .cert-meta-val {
              color: #2d3436;
              text-align: left;
            }
            .cert-footer {
              display: flex;
              justify-content: space-around;
              margin-top: 60px;
              position: relative;
            }
            .signature-line {
              border-top: 2px solid #5f7e6d;
              width: 220px;
              padding-top: 8px;
              font-size: 0.85rem;
              font-weight: 700;
              color: #6b6375;
            }
            .seal {
              width: 100px;
              height: 100px;
              border: 3px dashed #5f7e6d;
              border-radius: 50%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              color: #5f7e6d;
              font-weight: 800;
              font-size: 0.75rem;
              transform: rotate(-15deg);
              background-color: white;
            }
            @media print {
              body { padding: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          ${printContent}
          <script>
            window.onload = function() {
              window.print();
              window.close();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
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
          Mostrando página {currentPage + 1} de {totalPages} ({totalElements} registros en total)
        </div>
        <Pagination className="mb-0 custom-pagination">{items}</Pagination>
      </div>
    );
  };

  return (
    <div className="admin-container p-0 p-md-4">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold text-primary mb-0" style={{ fontSize: '1.85rem' }}>Registro de Adopciones</h2>
          <p className="text-muted mb-0 small">
            Monitorea el historial de mascotas adoptadas y revisa los certificados generados
          </p>
        </div>
        <Badge bg="success" className="px-3 py-2 rounded-pill text-nowrap" style={{ backgroundColor: 'var(--color-primary-700)', fontSize: '0.9rem' }}>
          Total: {totalElements}
        </Badge>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-custom shadow-sm p-3 mb-4 border-0">
        <Row className="g-3 align-items-center">
          <Col md={10}>
            <Form.Group className="position-relative mb-0">
              <span 
                className="material-symbols-outlined position-absolute text-muted" 
                style={{ left: '15px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
              >
                search
              </span>
              <Form.Control
                type="text"
                placeholder="Buscar por nombre de mascota o adoptante..."
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
          <Col md={2} className="text-end">
            <Button 
              variant="outline-primary" 
              onClick={fetchAdoptions} 
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

      {/* Table Container */}
      <div className="bg-white rounded-custom shadow-sm overflow-hidden border-0 mb-4">
        <Table hover responsive className="mb-0 align-middle">
          <thead className="bg-light bg-opacity-70 text-muted" style={{ borderBottom: '2px solid rgba(0,0,0,0.04)' }}>
            <tr>
              <th className="px-4 py-3 border-0 fw-bold">ID</th>
              <th className="px-4 py-3 border-0 fw-bold">Mascota</th>
              <th className="px-4 py-3 border-0 fw-bold">Especie</th>
              <th className="px-4 py-3 border-0 fw-bold">Publicado Por</th>
              <th className="px-4 py-3 border-0 fw-bold">Adoptado Por</th>
              <th className="px-4 py-3 border-0 fw-bold">Fecha Adopción</th>
              <th className="px-4 py-3 border-0 fw-bold">Estado</th>
              <th className="px-4 py-3 border-0 text-end fw-bold">Certificado</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center py-5">
                  <Spinner animation="border" variant="primary" role="status" className="mb-2" style={{ color: 'var(--color-primary-700)' }} />
                  <div className="text-muted fw-semibold small">Cargando registro de adopciones...</div>
                </td>
              </tr>
            ) : adoptions.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-5">
                  <span className="material-symbols-outlined text-muted mb-2" style={{ fontSize: '48px' }}>volunteer_activism</span>
                  <div className="text-muted fw-semibold small">No se registraron adopciones todavía.</div>
                </td>
              </tr>
            ) : (
              adoptions.map((adoption) => (
                <tr key={adoption.id} className="transition-row">
                  <td className="px-4 py-3 align-middle text-muted small">#{adoption.id}</td>
                  <td className="px-4 py-3 align-middle">
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={getPetImageUrl(adoption.pet?.image)}
                        alt={adoption.pet?.name}
                        className="rounded-circle object-fit-cover border border-1"
                        style={{ width: '40px', height: '40px', borderColor: 'var(--color-primary-500)' }}
                      />
                      <span className="fw-bold text-dark">{adoption.pet?.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-middle text-dark">
                    {getSpeciesLabel(adoption.pet?.species)}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <div className="fw-semibold text-dark text-truncate" style={{ maxWidth: '160px' }}>
                      {adoption.pet?.publisherName || 'Sin tutor'}
                    </div>
                    <div className="text-muted small" style={{ fontSize: '0.75rem' }}>
                      {adoption.pet?.publisherRole === 'ADMIN' ? 'Administrador' : adoption.pet?.publisherRole === 'HOSTEL' ? 'Albergue' : 'Adoptante'}
                    </div>
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <div className="fw-semibold text-dark text-truncate" style={{ maxWidth: '160px' }}>
                      {adoption.adopter ? adoption.adopter.fullName : 'Adoptante Externo'}
                    </div>
                    {adoption.adopter?.phone && <div className="text-muted small" style={{ fontSize: '0.8rem' }}>{adoption.adopter.phone}</div>}
                  </td>
                  <td className="px-4 py-3 align-middle text-muted small">
                    {formatDate(adoption.adoptionDate)?.split(',')[0]}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <Badge
                      bg="success"
                      className="rounded-pill px-3 py-2 bg-opacity-10 text-success"
                      style={{
                        backgroundColor: 'rgba(46, 204, 113, 0.15)',
                        color: '#27ae60',
                        border: '1px solid #2ecc71'
                      }}
                    >
                      {adoption.status || 'Finalizado'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 align-middle text-end">
                    <Button
                      variant="outline-success"
                      size="sm"
                      className="rounded-pill px-3 d-inline-flex align-items-center gap-2 border-custom"
                      style={{ borderColor: '#2ecc71', color: '#27ae60' }}
                      onClick={() => handleOpenCertificate(adoption)}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: '18px' }}
                      >
                        description
                      </span>
                      Ver Acta
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      {!loading && renderPagination()}

      {/* Certificate Modal */}
      <Modal 
        show={showCertificateModal} 
        onHide={() => setShowCertificateModal(false)}
        size="lg"
        centered
        className="adoption-certificate-modal"
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold" style={{ color: 'var(--color-primary-700)' }}>Visualización del Acta</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {selectedAdoption && (
            <div>
              {/* Printable Wrapper */}
              <div id="adoption-certificate-printable">
                <div 
                  className="certificate-container"
                  style={{
                    border: '12px double var(--color-primary-700)',
                    padding: '30px',
                    backgroundColor: '#fafaf5',
                    textAlign: 'center',
                    borderRadius: '8px'
                  }}
                >
                  <span className="material-symbols-outlined text-primary fs-1 mb-2" style={{ color: 'var(--color-primary-700)' }}>volunteer_activism</span>
                  <h1 
                    className="cert-title"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: 'var(--color-primary-700)',
                      fontSize: '2.2rem',
                      fontWeight: 800,
                      margin: '10px 0 5px 0'
                    }}
                  >
                    CERTIFICADO DE ADOPCIÓN
                  </h1>
                  <p 
                    className="cert-subtitle"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: 'italic',
                      color: 'var(--color-text-muted)',
                      fontSize: '1.15rem',
                      marginBottom: '30px'
                    }}
                  >
                    AdoptApp • Compromiso de Amor y Cuidado
                  </p>

                  <div 
                    className="cert-body"
                    style={{
                      fontSize: '1rem',
                      lineHeight: '1.7',
                      color: 'var(--color-text-900)',
                      marginBottom: '30px',
                      padding: '0 10px'
                    }}
                  >
                    AdoptApp hace constar con inmensa alegría y gratitud que la mascota
                    <br />
                    <strong style={{ fontSize: '1.25rem', color: 'var(--color-primary-700)', display: 'block', margin: '10px 0' }}>
                      🐾 {selectedAdoption.pet?.name || 'N/A'}
                    </strong>
                    ha sido adoptada formal y responsablemente por el/la adoptante
                    <br />
                    <strong style={{ fontSize: '1.2rem', color: 'var(--color-primary-700)', display: 'block', margin: '10px 0' }}>
                      👤 {selectedAdoption.adopter ? selectedAdoption.adopter.fullName : 'Adoptante Externo'}
                    </strong>
                    comprometiéndose a garantizar su bienestar integral, brindándole un hogar seguro y lleno de amor por el resto de sus días.
                  </div>

                  <table 
                    className="cert-meta-table"
                    style={{
                      width: '80%',
                      margin: '0 auto 30px auto',
                      borderCollapse: 'collapse'
                    }}
                  >
                    <tbody>
                      <tr>
                        <td className="cert-meta-label" style={{ fontWeight: '700', color: 'var(--color-text-muted)', padding: '8px', borderBottom: '1px solid rgba(95, 126, 109, 0.15)', textAlign: 'left', fontSize: '0.85rem' }}>Especie / Raza:</td>
                        <td className="cert-meta-val" style={{ padding: '8px', borderBottom: '1px solid rgba(95, 126, 109, 0.15)', textAlign: 'left', fontSize: '0.85rem' }}>
                          {getSpeciesLabel(selectedAdoption.pet?.species)} {selectedAdoption.pet?.breed ? ` / ${selectedAdoption.pet.breed}` : ''}
                        </td>
                      </tr>
                      <tr>
                        <td className="cert-meta-label" style={{ fontWeight: '700', color: 'var(--color-text-muted)', padding: '8px', borderBottom: '1px solid rgba(95, 126, 109, 0.15)', textAlign: 'left', fontSize: '0.85rem' }}>Publicado por:</td>
                        <td className="cert-meta-val" style={{ padding: '8px', borderBottom: '1px solid rgba(95, 126, 109, 0.15)', textAlign: 'left', fontSize: '0.85rem' }}>
                          {selectedAdoption.pet?.publisherName || 'Sin tutor registrado'}
                        </td>
                      </tr>
                      <tr>
                        <td className="cert-meta-label" style={{ fontWeight: '700', color: 'var(--color-text-muted)', padding: '8px', borderBottom: '1px solid rgba(95, 126, 109, 0.15)', textAlign: 'left', fontSize: '0.85rem' }}>Fecha de Emisión:</td>
                        <td className="cert-meta-val" style={{ padding: '8px', borderBottom: '1px solid rgba(95, 126, 109, 0.15)', textAlign: 'left', fontSize: '0.85rem' }}>
                          {formatDate(selectedAdoption.adoptionDate)}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div 
                    className="cert-footer"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      marginTop: '45px',
                      flexWrap: 'wrap',
                      gap: '20px'
                    }}
                  >
                    <div 
                      className="signature-line"
                      style={{
                        borderTop: '2px solid var(--color-primary-700)',
                        width: '180px',
                        paddingTop: '6px',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        color: 'var(--color-text-muted)'
                      }}
                    >
                      Firma de Entidad / Albergue
                    </div>
                    <div 
                      className="seal"
                      style={{
                        width: '80px',
                        height: '80px',
                        border: '2px dashed var(--color-primary-700)',
                        borderRadius: '50%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-primary-700)',
                        fontWeight: '800',
                        fontSize: '0.65rem',
                        transform: 'rotate(-10deg)',
                        backgroundColor: 'white'
                      }}
                    >
                      AdoptApp
                      <span style={{ fontSize: '0.55rem', fontWeight: 'normal', color: 'var(--color-text-muted)' }}>Sello Oficial</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="secondary" onClick={() => setShowCertificateModal(false)}>
            Cerrar
          </Button>
          <Button variant="success" onClick={handlePrintCertificate}>
            <span className="material-symbols-outlined align-middle me-2" style={{ fontSize: '18px' }}>print</span>
            Imprimir Certificado
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminAdoptions;
