import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

const AppNavbar = () => {
  return (
    <Navbar expand="lg" style={{ backgroundColor: 'var(--color-primary-700)', padding: '15px 0' }}>
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: 'var(--color-secondary-500)', fontWeight: '700', fontSize: '1.5rem' }}>AdoptApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end style={({ isActive }) => ({ color: 'white', opacity: isActive ? 1 : 0.8, fontWeight: isActive ? '700' : '500' })}>Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/login" style={({ isActive }) => ({ color: 'white', opacity: isActive ? 1 : 0.8, fontWeight: isActive ? '700' : '500' })}>Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
