import React, { useState } from 'react';

const CatalogSidebar = ({ onFilterApply }) => {
    const [localFilters, setLocalFilters] = useState({
        species: [],
        sex: [],
        age: '',
        size: 'Todos los Tamaños'
    });

    const handleCheckbox = (category, value) => {
        setLocalFilters(prev => {
            const list = prev[category];
            return {
                ...prev,
                [category]: list.includes(value) ? list.filter(i => i !== value) : [...list, value]
            };
        });
    };

    const handleApply = () => {
        if (onFilterApply) onFilterApply(localFilters);
    };

    return (
        <aside className="d-flex flex-column gap-4">
            <div className="bg-surface-container-low p-4 p-lg-5 rounded-xl sticky-top" style={{ top: '7rem', zIndex: 10 }}>
                <h3 className="h5 fw-bold mb-4 d-flex align-items-center gap-2">
                    <span className="material-symbols-outlined text-primary">tune</span>
                    Filtros
                </h3>

                {/* Species Filter */}
                <div className="mb-4">
                    <label className="form-label text-uppercase fw-bold text-on-surface-variant tracking-widest mb-3" style={{ fontSize: '0.75rem' }}>Especie</label>
                    <div className="d-flex flex-column gap-2">
                        <div className="form-check d-flex align-items-center gap-2">
                            <input className={`form-check-input mt-0 ${localFilters.species.includes('dogs') ? 'bg-primary border-primary' : ''}`} type="checkbox" id="species-dogs" checked={localFilters.species.includes('dogs')} onChange={() => handleCheckbox('species', 'dogs')} />
                            <label className={`form-check-label ${localFilters.species.includes('dogs') ? 'text-primary fw-bold' : 'text-on-surface fw-medium'}`} style={{ fontSize: '0.875rem' }} htmlFor="species-dogs">
                                Perros
                            </label>
                        </div>
                        <div className="form-check d-flex align-items-center gap-2">
                            <input className={`form-check-input mt-0 ${localFilters.species.includes('cats') ? 'bg-primary border-primary' : ''}`} type="checkbox" id="species-cats" checked={localFilters.species.includes('cats')} onChange={() => handleCheckbox('species', 'cats')} />
                            <label className={`form-check-label ${localFilters.species.includes('cats') ? 'text-primary fw-bold' : 'text-on-surface fw-medium'}`} style={{ fontSize: '0.875rem' }} htmlFor="species-cats">
                                Gatos
                            </label>
                        </div>
                        <div className="form-check d-flex align-items-center gap-2">
                            <input className={`form-check-input mt-0 ${localFilters.species.includes('others') ? 'bg-primary border-primary' : ''}`} type="checkbox" id="species-birds" checked={localFilters.species.includes('others')} onChange={() => handleCheckbox('species', 'others')} />
                            <label className={`form-check-label ${localFilters.species.includes('others') ? 'text-primary fw-bold' : 'text-on-surface fw-medium'}`} style={{ fontSize: '0.875rem' }} htmlFor="species-birds">
                                Otros
                            </label>
                        </div>
                    </div>
                </div>

                {/* Sex Filter */}
                <div className="mb-4">
                    <label className="form-label text-uppercase fw-bold text-on-surface-variant tracking-widest mb-3" style={{ fontSize: '0.75rem' }}>Sexo</label>
                    <div className="d-flex flex-column gap-2">
                        <div className="form-check d-flex align-items-center gap-2">
                            <input className={`form-check-input mt-0 ${localFilters.sex.includes('Hembra') ? 'bg-primary border-primary' : ''}`} type="checkbox" id="sex-female" checked={localFilters.sex.includes('Hembra')} onChange={() => handleCheckbox('sex', 'Hembra')} />
                            <label className={`form-check-label ${localFilters.sex.includes('Hembra') ? 'text-primary fw-bold' : 'text-on-surface fw-medium'}`} style={{ fontSize: '0.875rem' }} htmlFor="sex-female">
                                Hembra
                            </label>
                        </div>
                        <div className="form-check d-flex align-items-center gap-2">
                            <input className={`form-check-input mt-0 ${localFilters.sex.includes('Macho') ? 'bg-primary border-primary' : ''}`} type="checkbox" id="sex-male" checked={localFilters.sex.includes('Macho')} onChange={() => handleCheckbox('sex', 'Macho')} />
                            <label className={`form-check-label ${localFilters.sex.includes('Macho') ? 'text-primary fw-bold' : 'text-on-surface fw-medium'}`} style={{ fontSize: '0.875rem' }} htmlFor="sex-male">
                                Macho
                            </label>
                        </div>
                    </div>
                </div>

                {/* Age Filter */}
                <div className="mb-4">
                    <label className="form-label text-uppercase fw-bold text-on-surface-variant tracking-widest mb-3" style={{ fontSize: '0.75rem' }}>Rango de Edad</label>
                    <div className="row g-2">
                        {['Cachorro', 'Joven', 'Adulto', 'Mayor'].map(ageOption => (
                            <div className="col-6" key={ageOption}>
                                <button 
                                    className={`btn w-100 py-2 px-1 fw-semibold shadow-sm text-center ${localFilters.age === ageOption ? 'bg-secondary text-on-secondary border-0' : 'btn-outline-secondary border-outline-variant text-on-surface-variant'}`} 
                                    style={{ fontSize: '0.75rem', borderRadius: '0.5rem' }}
                                    onClick={() => setLocalFilters(prev => ({ ...prev, age: prev.age === ageOption ? '' : ageOption }))}
                                >
                                    {ageOption}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Size Filter */}
                <div className="mb-4">
                    <label className="form-label text-uppercase fw-bold text-on-surface-variant tracking-widest mb-3" style={{ fontSize: '0.75rem' }}>Tamaño</label>
                    <select 
                        className="form-select bg-surface-container-lowest border-0 rounded-3 py-2 shadow-none focus-ring text-on-surface fw-medium" 
                        style={{ fontSize: '0.875rem' }}
                        value={localFilters.size}
                        onChange={(e) => setLocalFilters(prev => ({ ...prev, size: e.target.value }))}
                    >
                        <option>Todos los Tamaños</option>
                        <option>Pequeño</option>
                        <option>Mediano</option>
                        <option>Grande</option>
                    </select>
                </div>

                <button 
                    className="btn bg-primary text-on-primary w-100 py-3 rounded-pill fw-bold shadow-sm mt-2" 
                    style={{ fontSize: '0.875rem' }}
                    onClick={handleApply}
                >
                    Aplicar Filtros
                </button>
            </div>
        </aside>
    );
};

export default CatalogSidebar;