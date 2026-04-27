import React from 'react';

const CatalogHeader = ({ searchQuery, setSearchQuery }) => {
    return (
        <header className="mb-4">
            <div className="container-xl px-4">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8">
                        <div className="position-relative">
                            <span
                                className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y ms-3 text-outline"
                                style={{ fontSize: '1.2rem' }}
                            >
                                search
                            </span>
                            <input
                                type="text"
                                className="form-control bg-surface-container-lowest border-0 rounded-pill py-3 ps-5 shadow-sm focus-ring text-on-surface"
                                style={{ fontSize: '0.95rem' }}
                                placeholder="Buscar por nombre, especie o raza..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default CatalogHeader;