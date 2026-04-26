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
                            Conectando corazones y creando familias desde 2024. Tu destino editorial para la adopción ética de mascotas.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-12 col-md-2">
                        <h4 className="fw-bold text-primary h6 mb-4">Enlaces Rápidos</h4>
                        <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '0.875rem' }}>
                            <li><a className="text-secondary text-decoration-none" href="#">Buscar Mascotas</a></li>
                            <li><a className="text-secondary text-decoration-none" href="#">Refugios</a></li>
                            <li><a className="text-secondary text-decoration-none" href="#">Voluntariado</a></li>
                            <li><a className="text-secondary text-decoration-none" href="#">Donar</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="col-12 col-md-2">
                        <h4 className="fw-bold text-primary h6 mb-4">Legal</h4>
                        <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '0.875rem' }}>
                            <li><a className="text-secondary text-decoration-none" href="#">Política de Privacidad</a></li>
                            <li><a className="text-secondary text-decoration-none" href="#">Términos de Servicio</a></li>
                            <li><a className="text-secondary text-decoration-none" href="#">Soporte Técnico</a></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="col-12 col-md-4">
                        <h4 className="fw-bold text-primary h6 mb-4">Síguenos</h4>
                        <p className="text-secondary mb-3" style={{ fontSize: '0.875rem' }}>
                            Únete a nuestra comunidad en redes para conocer historias de adopción y más.
                        </p>
                        <div className="d-flex gap-3 mt-4">
                            <a href="#" className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center p-0" style={{ width: '40px', height: '40px' }} aria-label="Facebook">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" /></svg>
                            </a>
                            <a href="#" className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center p-0" style={{ width: '40px', height: '40px' }} aria-label="Instagram">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                            </a>
                            <a href="#" className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center p-0" style={{ width: '40px', height: '40px' }} aria-label="TikTok">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19.59 6.69a4.83 4.83 0 01-3.97-1.56 4.83 4.83 0 01-1.4-3.37h-3.93v15.7c0 1.64-1.34 2.97-2.97 2.97s-2.97-1.33-2.97-2.97 1.34-2.97 2.97-2.97c.15 0 .29.01.43.03V10.61c-.14-.01-.29-.01-.43-.01-3.8 0-6.9 3.1-6.9 6.9s3.1 6.9 6.9 6.9 6.9-3.1 6.9-6.9V11.14a8.74 8.74 0 005.37 1.83V9.03a4.8 4.8 0 01-4-2.34z" /></svg>
                            </a>
                            <a href="#" className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center p-0" style={{ width: '40px', height: '40px' }} aria-label="X (Twitter)">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center mt-5 pt-4" style={{ borderTop: '1px solid rgba(174, 180, 170, 0.2)' }}>
                    <p className="text-secondary text-uppercase tracking-widest m-0" style={{ fontSize: '0.75rem' }}>
                        © 2024 AdoptApp. Encuentra a tu mejor amigo.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;