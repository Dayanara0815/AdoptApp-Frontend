import React from 'react';
import CatalogNavbar from '../../components/CatalogComponents/CatalogNavbar';

const CatalogPage = () => {
    return (
        <div>
            {/* Tu Navbar específico para el catálogo */}
            <CatalogNavbar />

            <div className="container mt-4">
                <h1 className="text-center mb-4">Catálogo de Mascotas</h1>
                {/* Aquí es donde más adelante pondremos los filtros y las tarjetas */}
                <p className="text-muted text-center">Contenido del catálogo en desarrollo...</p>
            </div>
        </div>
    );
};

export default CatalogPage;