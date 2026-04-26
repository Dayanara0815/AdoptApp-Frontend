import React from 'react';

const PetCard = ({
    name,
    age,
    description,
    breed,
    trait,
    image,
    isNewArrival,
    isSpecialNeed
}) => {
    return (
        <div className="card bg-surface-container-lowest border-0 rounded-xl overflow-hidden h-100" style={{ transition: 'all 0.5s', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            {/* Image Container */}
            <div className="position-relative overflow-hidden rounded-xl m-3" style={{ aspectRatio: '4/5' }}>
                <img
                    src={image}
                    alt={`${name}`}
                    className="w-100 h-100 object-fit-cover"
                    style={{ transition: 'transform 0.7s' }}
                />

                {/* Badges */}
                {(isNewArrival || isSpecialNeed) && (
                    <div className="position-absolute top-0 start-0 m-3">
                        <span
                            className={`badge rounded-pill px-3 py-2 text-uppercase tracking-widest ${isSpecialNeed
                                    ? 'bg-primary text-on-primary'
                                    : 'bg-surface-container-lowest text-primary'
                                }`}
                            style={{ fontSize: '0.65rem', backdropFilter: 'blur(4px)', backgroundColor: isSpecialNeed ? '' : 'rgba(255,255,255,0.9)' }}
                        >
                            {isSpecialNeed ? 'Necesidad Especial' : 'Recién Llegado'}
                        </span>
                    </div>
                )}

                {/* Favorite Button */}
                <button className="btn btn-light position-absolute bottom-0 end-0 m-3 rounded-circle d-flex align-items-center justify-content-center text-error shadow-sm border-0" style={{ width: '2.5rem', height: '2.5rem', zIndex: 10 }}>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>favorite</span>
                </button>
            </div>

            {/* Card Body */}
            <div className="card-body p-4 pt-2">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <h3 className="card-title h4 fw-bold text-on-surface mb-0">{name}</h3>
                    <span className="badge bg-secondary-fixed-dim text-on-surface-variant rounded-pill px-3 py-2 fw-semibold" style={{ fontSize: '0.75rem' }}>
                        {age}
                    </span>
                </div>

                <p className="card-text text-on-surface-variant line-clamp-2 mb-4" style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
                    {description}
                </p>

                <div className="d-flex align-items-center gap-2 flex-wrap mt-auto">
                    <span className="badge bg-surface-container-high text-on-surface-variant rounded-pill px-3 py-2 fw-bold" style={{ fontSize: '0.65rem' }}>
                        {breed}
                    </span>
                    <span className="badge bg-surface-container-high text-on-surface-variant rounded-pill px-3 py-2 fw-bold" style={{ fontSize: '0.65rem' }}>
                        {trait}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PetCard;
