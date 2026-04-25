import React from 'react';

const CatalogHeader = () => {
  return (
    <header className="mb-5 pt-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-4">
        <div style={{ maxWidth: '42rem' }}>
          <h1 className="display-4 fw-bolder tracking-tight text-on-surface mb-3" style={{ lineHeight: 1.1 }}>
            Find your new <span className="text-primary fst-italic">companion</span>.
          </h1>
          <p className="fs-5 text-on-surface-variant" style={{ lineHeight: 1.6 }}>
            Browse through our curated sanctuary of animals waiting for a forever home. Every pet here is vetted for health and temperament.
          </p>
        </div>
        
        <div className="d-flex gap-2 p-1 bg-surface-container-low rounded-pill">
          <button className="btn bg-surface-container-lowest text-primary fw-semibold rounded-pill px-4 shadow-sm border-0">
            Grid
          </button>
          <button className="btn text-on-surface-variant fw-medium rounded-pill px-4 border-0 hover-bg-surface-container-high">
            Map
          </button>
        </div>
      </div>
    </header>
  );
};

export default CatalogHeader;
