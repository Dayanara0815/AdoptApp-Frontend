import React from 'react';
import PetCard from './CatalogPetCard';

const CatalogGrid = ({ petsData = [] }) => {
    return (
        <div>
            {petsData.length === 0 ? (
                <div className="text-center py-5">
                    <span className="material-symbols-outlined mb-3 text-secondary" style={{ fontSize: '48px', fontVariationSettings: "'FILL' 0" }}>search_off</span>
                    <h3 className="h4 fw-bold text-on-surface">No encontramos resultados</h3>
                    <p className="text-on-surface-variant">Intenta ajustar tu búsqueda o limpiar los filtros.</p>
                </div>
            ) : (
                <div className="row g-4">
                    {petsData.map((pet) => (
                        <div key={pet.id} className="col-12 col-md-6 col-xl-4">
                            <PetCard {...pet} />
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            <div className="d-flex justify-content-center align-items-center gap-2 mt-5 pt-4">
                <button className="btn btn-light rounded-circle d-flex align-items-center justify-content-center border-0 bg-transparent text-secondary hover-bg-surface-container-high" style={{ width: '2.5rem', height: '2.5rem' }}>
                    <span className="material-symbols-outlined">chevron_left</span>
                </button>

                <button className="btn bg-primary text-on-primary rounded-circle fw-bold" style={{ width: '2.5rem', height: '2.5rem' }}>1</button>
                <button className="btn btn-light rounded-circle fw-medium border-0 bg-transparent text-secondary hover-bg-surface-container-high" style={{ width: '2.5rem', height: '2.5rem' }}>2</button>
                <button className="btn btn-light rounded-circle fw-medium border-0 bg-transparent text-secondary hover-bg-surface-container-high" style={{ width: '2.5rem', height: '2.5rem' }}>3</button>

                <span className="px-2 text-secondary">...</span>

                <button className="btn btn-light rounded-circle fw-medium border-0 bg-transparent text-secondary hover-bg-surface-container-high" style={{ width: '2.5rem', height: '2.5rem' }}>12</button>

                <button className="btn btn-light rounded-circle d-flex align-items-center justify-content-center border-0 bg-transparent text-secondary hover-bg-surface-container-high" style={{ width: '2.5rem', height: '2.5rem' }}>
                    <span className="material-symbols-outlined">chevron_right</span>
                </button>
            </div>
        </div>
    );
};

export default CatalogGrid;