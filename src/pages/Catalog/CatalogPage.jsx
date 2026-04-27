import React, { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { mockPets } from '../../data/mockPets';
import CatalogHeader from '../../components/Catalog/CatalogHeader';
import CatalogSidebar from '../../components/Catalog/CatalogSidebar';
import CatalogGrid from '../../components/Catalog/CatalogGrid';
import './CatalogPage.css';

const CatalogPage = () => {
    const { data: petsData } = useLocalStorage('catalogPets_v6', mockPets);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        species: [],
        sex: [],
        age: '',
        size: 'Todos los Tamaños'
    });

    // Filtramos las mascotas basándonos en la búsqueda y los filtros
    const filteredPets = petsData.filter(pet => {
        // 1. Filtro de Búsqueda (Search Query)
        if (searchQuery) {
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch = pet.name.toLowerCase().includes(searchLower) ||
                                  pet.breed.toLowerCase().includes(searchLower) ||
                                  pet.species.toLowerCase().includes(searchLower);
            if (!matchesSearch) return false;
        }

        // 2. Filtro de Especie
        if (filters.species.length > 0) {
            // Asumimos que 'dogs' -> 'Perro', 'cats' -> 'Gato', etc.
            // Para simplificar, mapeamos species seleccionados.
            // mockPets tiene 'species' como 'dogs', 'cats', etc.
            if (!filters.species.includes(pet.species)) return false;
        }

        // 3. Filtro de Sexo
        if (filters.sex.length > 0) {
            if (!filters.sex.includes(pet.sexo)) return false;
        }

        // 4. Filtro de Edad
        if (filters.age) {
            if (pet.ageCategory !== filters.age) return false;
        }

        // 5. Filtro de Tamaño
        if (filters.size !== 'Todos los Tamaños') {
            if (pet.size !== filters.size) return false;
        }

        return true;
    });

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
                        <CatalogGrid petsData={filteredPets} />
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