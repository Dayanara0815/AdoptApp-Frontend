import React from 'react';

const CatalogSidebar = () => {
  return (
    <aside className="d-flex flex-column gap-4">
      <div className="bg-surface-container-low p-4 p-lg-5 rounded-xl sticky-top" style={{ top: '7rem', zIndex: 10 }}>
        <h3 className="h5 fw-bold mb-4 d-flex align-items-center gap-2">
          <span className="material-symbols-outlined text-primary">tune</span>
          Filters
        </h3>

        {/* Search Input */}
        <div className="mb-4">
          <label className="form-label text-uppercase fw-bold text-on-surface-variant tracking-widest" style={{ fontSize: '0.75rem' }}>Search</label>
          <div className="position-relative">
            <span className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y ms-3 text-outline" style={{ fontSize: '1.2rem' }}>search</span>
            <input type="text" className="form-control bg-surface-container-lowest border-0 rounded-3 py-2 ps-5 shadow-none focus-ring" style={{ fontSize: '0.875rem' }} placeholder="Breed or name..." />
          </div>
        </div>

        {/* Species Filter */}
        <div className="mb-4">
          <label className="form-label text-uppercase fw-bold text-on-surface-variant tracking-widest mb-3" style={{ fontSize: '0.75rem' }}>Species</label>
          <div className="d-flex flex-column gap-2">
            <div className="form-check d-flex align-items-center gap-2">
              <input className="form-check-input mt-0" type="checkbox" id="species-dogs" />
              <label className="form-check-label text-on-surface fw-medium" style={{ fontSize: '0.875rem' }} htmlFor="species-dogs">
                Dogs
              </label>
            </div>
            <div className="form-check d-flex align-items-center gap-2">
              <input className="form-check-input mt-0 bg-primary border-primary" type="checkbox" id="species-cats" defaultChecked />
              <label className="form-check-label text-primary fw-bold" style={{ fontSize: '0.875rem' }} htmlFor="species-cats">
                Cats
              </label>
            </div>
            <div className="form-check d-flex align-items-center gap-2">
              <input className="form-check-input mt-0" type="checkbox" id="species-birds" />
              <label className="form-check-label text-on-surface fw-medium" style={{ fontSize: '0.875rem' }} htmlFor="species-birds">
                Birds
              </label>
            </div>
          </div>
        </div>

        {/* Age Filter */}
        <div className="mb-4">
          <label className="form-label text-uppercase fw-bold text-on-surface-variant tracking-widest mb-3" style={{ fontSize: '0.75rem' }}>Age Range</label>
          <div className="row g-2">
            <div className="col-6">
              <button className="btn btn-outline-secondary w-100 py-2 border-outline-variant text-on-surface-variant fw-semibold" style={{ fontSize: '0.75rem', borderRadius: '0.5rem' }}>Baby</button>
            </div>
            <div className="col-6">
              <button className="btn bg-secondary text-on-secondary w-100 py-2 border-0 fw-semibold shadow-sm" style={{ fontSize: '0.75rem', borderRadius: '0.5rem' }}>Young</button>
            </div>
            <div className="col-6">
              <button className="btn btn-outline-secondary w-100 py-2 border-outline-variant text-on-surface-variant fw-semibold" style={{ fontSize: '0.75rem', borderRadius: '0.5rem' }}>Adult</button>
            </div>
            <div className="col-6">
              <button className="btn btn-outline-secondary w-100 py-2 border-outline-variant text-on-surface-variant fw-semibold" style={{ fontSize: '0.75rem', borderRadius: '0.5rem' }}>Senior</button>
            </div>
          </div>
        </div>

        {/* Size Filter */}
        <div className="mb-4">
          <label className="form-label text-uppercase fw-bold text-on-surface-variant tracking-widest mb-3" style={{ fontSize: '0.75rem' }}>Size</label>
          <select className="form-select bg-surface-container-lowest border-0 rounded-3 py-2 shadow-none focus-ring text-on-surface fw-medium" style={{ fontSize: '0.875rem' }}>
            <option>All Sizes</option>
            <option>Small (0-15 lbs)</option>
            <option>Medium (16-40 lbs)</option>
            <option>Large (41-100 lbs)</option>
          </select>
        </div>

        <button className="btn bg-primary text-on-primary w-100 py-3 rounded-pill fw-bold shadow-sm mt-2" style={{ fontSize: '0.875rem' }}>
          Apply Results
        </button>
      </div>
    </aside>
  );
};

export default CatalogSidebar;
