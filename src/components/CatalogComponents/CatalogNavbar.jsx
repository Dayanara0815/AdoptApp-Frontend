import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container-fluid px-4">

                {/* 1. Logo a la izquierda */}
                <a className="navbar-brand fw-bold text-primary" href="/">
                    AdoptApp 🐾
                </a>

                {/* Botón para móviles (Hamburguesa) */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">

                    {/* 2. Barra de búsqueda central */}
                    <form className="d-flex mx-auto w-50">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Buscar mascotas por nombre, tipo o raza"
                            aria-label="Search"
                        />
                    </form>

                    {/* 3. Botón Publicar e Icono de Perfil a la derecha */}
                    <div className="d-flex align-items-center">
                        <button className="btn btn-primary me-3 text-nowrap" type="button">
                            Publicar Mascota
                        </button>

                        {/* Dropdown de Perfil */}
                        <div className="dropdown">
                            <a
                                className="btn btn-outline-secondary dropdown-toggle rounded-circle"
                                href="#"
                                role="button"
                                id="profileDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ width: '40px', height: '40px', padding: '6px 0' }}
                            >
                                👤
                            </a>

                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                                <li><a className="dropdown-item" href="#">Mi Perfil</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item text-danger" href="#">Cerrar Sesión</a></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;