import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';

const About = () => {
  return (
    <Container className="py-5">
      <h1>Sobre Nosotros</h1>
      <p>
        AdoptApp es una iniciativa dedicada a facilitar el proceso de adopción de mascotas,
        conectando refugios con personas que buscan dar un hogar lleno de amor.
      </p>
      
      <div className="mb-4">
        <Button as={Link} to="team" variant="outline-primary" className="me-2">
          Conocer al Equipo
        </Button>
        <Button as={Link} to="/" variant="secondary">
          Volver al Inicio
        </Button>
      </div>

      {/* Aquí es donde se renderizará el componente Team cuando estés en /about/team */}
      <Outlet />
    </Container>
  );
};

export default About;
