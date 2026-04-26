import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: "Quiénes Somos", href: "#quienes-somos" },
    { label: "Misión", href: "#mision" },
    { label: "Visión", href: "#vision" },
    { label: "Objetivos", href: "#objetivos" },
  ];

  return (
    <header className="fixed-top">
      <nav className="landing-navbar navbar navbar-expand-md">
        <div className="container px-4">
          <a
            className="navbar-brand d-flex align-items-center gap-1"
            href="#"
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
                  <a className="landing-nav-link" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="d-flex gap-2 mt-3 mt-md-0">
              <button className="btn-landing-outline">Ingresar</button>
              <button className="btn-landing-primary">Registrarse</button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}