import React from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: 'var(--color-neutral-100)' }}>
      <Card style={{ 
        width: '450px', 
        padding: '30px', 
        border: 'none',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
      }}>
        <Card.Body>
          <h2 className="text-center mb-4" style={{ color: 'var(--color-primary-700)', fontWeight: '700' }}>Bienvenido de nuevo</h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: '500' }}>Email</Form.Label>
              <Form.Control type="email" placeholder="tu@email.com" style={{ borderRadius: 'var(--radius-md)', padding: '12px' }} />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label style={{ fontWeight: '500' }}>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="********" style={{ borderRadius: 'var(--radius-md)', padding: '12px' }} />
            </Form.Group>
            <Button as={Link} to="/dashboard" variant="primary" className="w-100 mb-3 shadow-none">
              Entrar
            </Button>
            <div className="text-center">
              <Link to="/" style={{ color: 'var(--color-primary-700)', textDecoration: 'none', fontWeight: '500' }}>← Volver al inicio</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;
