import React from 'react';

const Footer = () => {
  return (
    <footer className="w-100 py-5 bg-background" style={{ borderTop: '1px solid rgba(74, 101, 79, 0.1)' }}>
      <div className="container-xl px-4">
        <div className="row g-5">
          {/* Brand Info */}
          <div className="col-12 col-md-4">
            <div className="fs-4 fw-bold text-primary mb-3 font-headline">AdoptApp</div>
            <p className="text-secondary" style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
              Connecting heartbeats and creating families since 2024. Your editorial destination for ethical pet adoption.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-2">
            <h4 className="fw-bold text-primary h6 mb-4">Quick Links</h4>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '0.875rem' }}>
              <li><a className="text-secondary text-decoration-none" href="#">Find Pets</a></li>
              <li><a className="text-secondary text-decoration-none" href="#">Shelters</a></li>
              <li><a className="text-secondary text-decoration-none" href="#">Volunteer</a></li>
              <li><a className="text-secondary text-decoration-none" href="#">Donate</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-12 col-md-2">
            <h4 className="fw-bold text-primary h6 mb-4">Legal</h4>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '0.875rem' }}>
              <li><a className="text-secondary text-decoration-none" href="#">Privacy Policy</a></li>
              <li><a className="text-secondary text-decoration-none" href="#">Terms of Service</a></li>
              <li><a className="text-secondary text-decoration-none" href="#">Contact Support</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-12 col-md-4">
            <h4 className="fw-bold text-primary h6 mb-4">Newsletter</h4>
            <p className="text-secondary mb-3" style={{ fontSize: '0.75rem' }}>
              Join our community for adoption stories and pet care tips.
            </p>
            <div className="d-flex gap-2">
              <input type="email" className="form-control bg-surface-container-high border-0 rounded-3 shadow-none focus-ring" placeholder="Email" style={{ fontSize: '0.875rem' }} />
              <button className="btn bg-primary text-on-primary rounded-3 d-flex align-items-center justify-content-center px-3 border-0">
                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>send</span>
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-5 pt-4" style={{ borderTop: '1px solid rgba(174, 180, 170, 0.2)' }}>
          <p className="text-secondary text-uppercase tracking-widest m-0" style={{ fontSize: '0.75rem' }}>
            © 2024 AdoptApp. The Organic Curator Sanctuary.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
