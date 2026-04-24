import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #6e8efb, #a777e3)', color: 'white' }}>
      <Container className="text-center">
        <h1 style={{ fontSize: '4rem', fontWeight: 'bold' }}>AdoptApp</h1>
        <p className="lead mb-5">Encuentra a tu compañero ideal hoy mismo.</p>
        <div>
          <Button as={Link} to="/login" variant="light" size="lg" className="me-3">Iniciar Sesión</Button>
          <Button variant="outline-light" size="lg">Ver Catálogo</Button>
        </div>
      </Container>
    </div>
  );
};

export default LandingPage;
