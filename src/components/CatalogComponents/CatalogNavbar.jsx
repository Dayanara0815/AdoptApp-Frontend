import React from 'react';

const CatalogNavbar = () => {
  return (
    <nav className="navbar navbar-expand-md fixed-top glass-nav">
      <div className="container-xl d-flex justify-content-between align-items-center">
        
        {/* Brand */}
        <a className="navbar-brand fs-4 fw-bold tracking-tighter text-primary font-headline" href="#">
          AdoptApp
        </a>

        {/* Toggler for mobile */}
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links and Buttons */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-md-0 gap-4 font-headline fw-medium" style={{ fontSize: '14px', letterSpacing: '0.025em' }}>
            <li className="nav-item">
              <a className="nav-link text-primary fw-bold border-bottom border-primary border-2 pb-1 active" href="#">Find Pets</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-secondary" href="#">Shelters</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-secondary" href="#">Success Stories</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-secondary" href="#">About Us</a>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3 mt-3 mt-md-0">
            <button className="btn btn-link text-secondary fw-medium text-decoration-none rounded-pill px-4" style={{ fontSize: '14px' }}>
              Sign In
            </button>
            <button className="btn bg-primary text-on-primary rounded-pill px-4 fw-medium shadow-sm" style={{ fontSize: '14px' }}>
              Register
            </button>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default CatalogNavbar;
