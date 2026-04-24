import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      backgroundColor: 'var(--color-neutral-100)',
      backgroundImage: 'radial-gradient(circle at 10% 20%, var(--color-secondary-500) 0%, transparent 40%)'
    }}>
      <Container className="text-center">
        <h1 style={{ 
          fontSize: '5rem', 
          fontWeight: '700',
          color: 'var(--color-primary-700)',
          fontFamily: 'var(--font-heading)',
          letterSpacing: '-2px'
        }}>AdoptApp</h1>
        <p className="lead mb-5" style={{ color: 'var(--color-text-900)', fontSize: '1.4rem' }}>
          Encuentra a tu compañero ideal hoy mismo.
        </p>
        <div>
          <Button as={Link} to="/login" variant="primary" className="me-3" size="lg">
            Iniciar Sesión
          </Button>
          <Button variant="outline-dark" style={{ borderRadius: 'var(--radius-xl)', padding: '12px 28px' }} size="lg">
            Ver Catálogo
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default LandingPage;
