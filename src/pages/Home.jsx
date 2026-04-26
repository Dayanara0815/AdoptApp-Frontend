import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container className="py-5 text-center">
      <h1>¡Bienvenido a AdoptApp!</h1>
      <p className="lead">La plataforma para encontrar a tu nuevo mejor amigo.</p>
      <div className="mt-4">
        <Button as={Link} to="/about" variant="primary" size="lg" className="me-3">
          Saber más
        </Button>
        <Button variant="outline-secondary" size="lg">
          Ver Mascotas
        </Button>
      </div>
    </Container>
  );
};

export default Home;
