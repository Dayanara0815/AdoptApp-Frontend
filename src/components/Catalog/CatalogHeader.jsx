import React from 'react';

const CatalogHeader = () => {
    return (
        <header className="mb-5 pt-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-4">
                <div style={{ maxWidth: '42rem' }}>
                    <h1 className="display-4 fw-bolder tracking-tight text-on-surface mb-3" style={{ lineHeight: 1.1 }}>
                        Encuentra a tu nuevo <span className="text-primary fst-italic">compañero</span>.
                    </h1>
                    <p className="fs-5 text-on-surface-variant" style={{ lineHeight: 1.6 }}>
                        Explora nuestro santuario de animales que esperan un hogar definitivo.
                    </p>
                </div>
            </div>
        </header>
    );
};

export default CatalogHeader;