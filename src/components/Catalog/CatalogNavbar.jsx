import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importamos para redirigir
import { useAuth } from '../../context/authStore'; // Ajusta la ruta según tu carpeta

const CatalogNavbar = ({ searchQuery, setSearchQuery }) => {
  const nav = useNavigate();
  const { logout } = useAuth(); // Obtenemos la función logout del contexto

  const handleLogout = (e) => {
    e.preventDefault(); // Evitamos que el enlace recargue la página
    logout(); // Esto limpia el activeUser de localStorage y el estado global
    nav('/'); // Redirigimos a la página de inicio (Landing Page)
  };

  return (
    <nav className="navbar navbar-expand-md fixed-top glass-nav py-3">
      <div className="container-xl d-flex justify-content-between align-items-center">
        {/* Brand (Left) */}
        <a
          className="navbar-brand fs-4 fw-bold tracking-tighter text-primary font-headline d-flex align-items-center gap-1"
          href="/"
        >
          <span className="material-symbols-outlined">pets</span>
          AdoptApp
        </a>

        {/* Toggler for mobile */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Central Search Bar */}
          <div
            className="mx-auto w-100 my-3 my-md-0 d-flex justify-content-center px-md-4"
            style={{ maxWidth: '600px' }}
          >
            <div className="position-relative w-100">
              <span
                className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y ms-3 text-outline"
                style={{ fontSize: '1.2rem' }}
              >
                search
              </span>
              <input
                type="text"
                className="form-control bg-surface-container-lowest border-0 rounded-pill py-2 ps-5 shadow-sm focus-ring text-on-surface"
                style={{ fontSize: '0.875rem' }}
                placeholder="Buscar por nombre, especie o raza..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Right Section: Buttons & Profile */}
          <div className="d-flex align-items-center gap-3 justify-content-center mt-3 mt-md-0">
            <button
              className="btn bg-primary text-on-primary rounded-pill px-4 py-2 fw-bold shadow-sm d-flex align-items-center gap-2 transition-all hover:-translate-y-0.5"
              style={{ fontSize: '14px' }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '18px' }}
              >
                add_circle
              </span>
              Publicar Mascota
            </button>

            {/* Profile Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-light rounded-circle p-1 d-flex align-items-center justify-content-center border-0 bg-transparent text-secondary"
                type="button"
                id="profileDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: '32px' }}
                >
                  account_circle
                </span>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end border-0 shadow-lg-custom rounded-4 mt-2 bg-surface-container-lowest"
                aria-labelledby="profileDropdown"
              >
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center gap-2 py-2 px-4 fw-medium text-on-surface"
                    to="/dashboard/profile"
                    style={{ fontSize: '14px' }}
                  >
                    <span
                      className="material-symbols-outlined text-outline"
                      style={{ fontSize: '20px' }}
                    >
                      person
                    </span>
                    Mi Perfil
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider opacity-10 my-1" />
                </li>
                <li>
                  {/* MODIFICADO: Agregamos onClick para cerrar sesión */}
                  <button
                    className="dropdown-item d-flex align-items-center gap-2 py-2 px-4 fw-medium text-error"
                    type="button"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      width: '100%',
                      textAlign: 'left',
                    }}
                    onClick={handleLogout}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: '20px' }}
                    >
                      logout
                    </span>
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CatalogNavbar;
