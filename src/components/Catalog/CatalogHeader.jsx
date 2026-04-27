import { useNavigate } from 'react-router-dom';

const CatalogHeader = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  return (
    <header className="mb-4">
      <div className="container-xl px-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="d-flex flex-column flex-md-row gap-3">
              <div className="position-relative flex-grow-1">
                <span
                  className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y ms-3 text-outline"
                  style={{ fontSize: '1.2rem' }}
                >
                  search
                </span>
                <input
                  type="text"
                  className="form-control bg-surface-container-lowest border-0 rounded-pill py-3 ps-5 shadow-sm focus-ring text-on-surface w-100"
                  style={{ fontSize: '0.95rem' }}
                  placeholder="Buscar por nombre, especie o raza..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                className="btn btn-primary rounded-pill px-4 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
                onClick={() => navigate('/dashboard/my-publications')}
                style={{ whiteSpace: 'nowrap', transition: 'all 0.3s' }}
              >
                <span className="material-symbols-outlined">add_circle</span>
                Publicar mascota
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CatalogHeader;
