import React, { useState, useEffect } from 'react';
import { usePetsPage } from '../../hooks/usePets';
import CatalogHeader from '../../components/Catalog/CatalogHeader';
import CatalogSidebar from '../../components/Catalog/CatalogSidebar';
import CatalogGrid from '../../components/Catalog/CatalogGrid';
import './CatalogPage.css';

const CatalogPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        species: [],
        sex: [],
        age: '',
        size: 'Todos los Tamaños'
    });
    const [currentPage, setCurrentPage] = useState(1);
    const petsPerPage = 6;

    // Reset standard page to 1 when filters or search term change
    useEffect(() => {
        setCurrentPage(1);
    }, [filters, searchQuery]);

    // Retrieve paginated and filtered pets from backend
    const { data: pageResponse, isLoading, isError, error } = usePetsPage(
        currentPage - 1, // backend is 0-indexed
        petsPerPage,
        'AVAILABLE',
        filters,
        searchQuery
    );

    const petsData = pageResponse?.content || [];
    const totalPages = pageResponse?.totalPages || 1;

    // Map database properties to the UI card formats
    const mappedPets = petsData.map(pet => ({
        ...pet,
        // Map backend enums to Spanish text for the UI badges
        breed: pet.species === 'DOG' ? 'Perro' : pet.species === 'CAT' ? 'Gato' : pet.species === 'RABBIT' ? 'Conejo' : 'Otro',
        trait: pet.size === 'SMALL' ? 'Tamaño Pequeño' : pet.size === 'MEDIUM' ? 'Tamaño Mediano' : 'Tamaño Grande',
        contactPhone: pet.contactPhone || '',
        isNewArrival: false,
        isSpecialNeed: false
    }));

    return (
        <div className="catalog-theme">
            <div className="bg-background text-on-background min-vh-100 selection-custom">
            {/* Main Content Area */}
            <main className="container-fluid px-0" style={{ paddingTop: '0.5rem', paddingBottom: '5rem' }}>
                <CatalogHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                <div className="row mt-5 g-5">
                    {/* Sidebar */}
                    <div className="col-12 col-lg-3">
                        <CatalogSidebar onFilterApply={setFilters} />
                    </div>

                    {/* Main Grid */}
                    <div className="col-12 col-lg-9">
                        {isLoading ? (
                            <div className="d-flex justify-content-center py-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </div>
                            </div>
                        ) : isError ? (
                            <div className="alert alert-danger" role="alert">
                                Error al cargar el catálogo: {error?.message || 'Error de conexión'}
                            </div>
                        ) : (
                            <CatalogGrid 
                                petsData={mappedPets} 
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        )}
                    </div>
                </div>
            </main>
            {/* FAB for Mobile */}
            <div className="position-fixed bottom-0 end-0 m-4 d-md-none" style={{ zIndex: 1000 }}>
                <button className="btn bg-primary text-on-primary rounded-circle shadow-lg d-flex align-items-center justify-content-center border-0 active-scale" style={{ width: '3.5rem', height: '3.5rem' }}>
                    <span className="material-symbols-outlined">pets</span>
                </button>
            </div>
            </div>
        </div>
    );
};

export default CatalogPage;