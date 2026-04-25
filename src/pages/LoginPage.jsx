import React from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authStore';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    login(role);
    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-neutral-100)',
      }}
    >
      <Card
        style={{
          width: '450px',
          padding: '30px',
          border: 'none',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        }}
      >
        <Card.Body>
          <h2
            className="text-center mb-4"
            style={{ color: 'var(--color-primary-700)', fontWeight: '700' }}
          >
            Acceso al Sistema
          </h2>

          <div className="d-grid gap-3">
            <Button
              onClick={() => handleLogin('user')}
              variant="primary"
              className="py-3 shadow-none"
            >
              Entrar como Usuario Adoptante
            </Button>

            <Button
              onClick={() => handleLogin('admin')}
              variant="outline-primary"
              className="py-3 shadow-none"
            >
              Entrar como Administrador
            </Button>
          </div>

          <div className="text-center mt-4">
            <Link
              to="/"
              style={{
                color: 'var(--color-primary-700)',
                textDecoration: 'none',
                fontWeight: '500',
              }}
            >
              ← Volver al inicio
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;
