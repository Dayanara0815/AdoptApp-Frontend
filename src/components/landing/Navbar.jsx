import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authStore";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const isLanding = location.pathname === "/";

  const navLinks = [
    { label: "Quiénes Somos", href: "#quienes-somos" },
    { label: "Misión", href: "#mision" },
    { label: "Visión", href: "#vision" },
    { label: "Objetivos", href: "#objetivos" },
  ];

  const handleBrandClick = (event) => {
    event.preventDefault();
    setOpen(false);
    if (isLanding) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const handleNavClick = (event, href) => {
    event.preventDefault();
    setOpen(false);

    if (isLanding) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(`/${href}`);
      }
    } else {
      navigate(`/${href}`);
    }
  };

  return (
    <header className="fixed-top">
      <nav className="landing-navbar navbar navbar-expand-md">
        <div className="container px-4">
          <a
            className="navbar-brand d-flex align-items-center gap-1"
            href="/"
            onClick={handleBrandClick}
            style={{ color: "var(--primary)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
          >
            <span className="material-symbols-outlined">pets</span>
            AdoptApp
          </a>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className={`navbar-collapse ${open ? "show" : "collapse"}`}>
            <ul className="navbar-nav mx-auto">
              {navLinks.map((link) => (
                <li className="nav-item" key={link.label}>
                  <a
                    className="landing-nav-link"
                    href={link.href}
                    onClick={(event) => handleNavClick(event, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="nav-item">
                <a className="landing-nav-link" href="/catalogo" onClick={(e) => { e.preventDefault(); navigate('/catalogo'); }}>
                  Catálogo
                </a>
              </li>
            </ul>
            <div className="d-flex gap-2 mt-3 mt-md-0">
              {user ? (
                <>
                  <button
                    className="btn-landing-outline"
                    onClick={() => {
                      setOpen(false);
                      navigate(user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
                    }}
                  >
                    Mi Panel
                  </button>
                  <button
                    className="btn-landing-primary"
                    onClick={() => {
                      setOpen(false);
                      logout();
                      navigate("/");
                    }}
                  >
                    Salir
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn-landing-outline"
                    onClick={() => {
                      setOpen(false);
                      navigate("/login");
                    }}
                  >
                    Ingresar
                  </button>
                  <button
                    className="btn-landing-primary"
                    onClick={() => {
                      setOpen(false);
                      navigate("/registro");
                    }}
                  >
                    Registrarse
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}