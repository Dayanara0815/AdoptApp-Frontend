import React from 'react';

const PetCard = ({
    name,
    age,
    description,
    breed,
    trait,
    image,
    isNewArrival,
    isSpecialNeed,
    contactPhone
}) => {
    const whatsappUrl = contactPhone 
        ? `https://wa.me/${contactPhone}?text=${encodeURIComponent(`Hola, estoy interesado en adoptar a ${name}. ¿Me podrías dar más información?`)}`
        : '#';

    return (
        <div className="card bg-surface-container-lowest border-0 rounded-xl overflow-hidden h-100 d-flex flex-column" style={{ transition: 'all 0.5s', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
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
            <div className="card-body p-4 pt-2 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <h3 className="card-title h4 fw-bold text-on-surface mb-0">{name}</h3>
                    <span className="badge bg-secondary-fixed-dim text-on-surface-variant rounded-pill px-3 py-2 fw-semibold" style={{ fontSize: '0.75rem' }}>
                        {age}
                    </span>
                </div>

                <p className="card-text text-on-surface-variant line-clamp-2 mb-3" style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
                    {description}
                </p>

                <div className="d-flex align-items-center gap-2 flex-wrap mb-4">
                    <span className="badge bg-surface-container-high text-on-surface-variant rounded-pill px-3 py-2 fw-bold" style={{ fontSize: '0.65rem' }}>
                        {breed}
                    </span>
                    <span className="badge bg-surface-container-high text-on-surface-variant rounded-pill px-3 py-2 fw-bold" style={{ fontSize: '0.65rem' }}>
                        {trait}
                    </span>
                </div>

                {/* WhatsApp Button */}
                <a 
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp mt-auto w-100 rounded-pill py-2 fw-bold d-flex align-items-center justify-content-center gap-2"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Contactar
                </a>
            </div>
        </div>
    );
};

export default PetCard;
