import React, { useState, useEffect } from 'react';
import PetCard from './CatalogPetCard';

const CatalogGrid = ({ petsData = [] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const petsPerPage = 6;

    // Reset page to 1 whenever the filtered data changes
    useEffect(() => {
        setCurrentPage(1);
    }, [petsData]);

    // Calculate pagination values
    const totalPages = Math.max(1, Math.ceil(petsData.length / petsPerPage));
    const startIndex = (currentPage - 1) * petsPerPage;
    const currentPets = petsData.slice(startIndex, startIndex + petsPerPage);

    // Ensure currentPage is valid if data changes rapidly
    if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages);
    }

    const handlePrevPage = () => setCurrentPage(p => Math.max(1, p - 1));
    const handleNextPage = () => setCurrentPage(p => Math.min(totalPages, p + 1));
    const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);

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
                    {currentPets.map((pet) => (
                        <div key={pet.id} className="col-12 col-md-6 col-xl-4">
                            <PetCard {...pet} />
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {petsData.length > 0 && totalPages > 1 && (
                <div className="d-flex justify-content-center align-items-center gap-2 mt-5 pt-4">
                    <button 
                        className="btn btn-light rounded-circle d-flex align-items-center justify-content-center border-0 bg-transparent text-secondary hover-bg-surface-container-high" 
                        style={{ width: '2.5rem', height: '2.5rem' }}
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                        <button 
                            key={pageNum}
                            className={`btn rounded-circle fw-medium border-0 shadow-none ${currentPage === pageNum ? 'bg-primary text-on-primary fw-bold' : 'btn-light bg-transparent text-secondary hover-bg-surface-container-high'}`} 
                            style={{ width: '2.5rem', height: '2.5rem' }}
                            onClick={() => handlePageClick(pageNum)}
                        >
                            {pageNum}
                        </button>
                    ))}

                    <button 
                        className="btn btn-light rounded-circle d-flex align-items-center justify-content-center border-0 bg-transparent text-secondary hover-bg-surface-container-high" 
                        style={{ width: '2.5rem', height: '2.5rem' }}
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default CatalogGrid;