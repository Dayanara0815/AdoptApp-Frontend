import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/authStore';
import Drawer from './Drawer';
import aiAvatar from '../../assets/ai-avatar.png';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const isLanding = location.pathname === '/';

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = [
    { label: 'Quiénes Somos', href: '#quienes-somos' },
    { label: 'Misión', href: '#mision' },
    { label: 'Visión', href: '#vision' },
    { label: 'Objetivos', href: '#objetivos' },
  ];

  const handleBrandClick = (event) => {
    event.preventDefault();
    setOpen(false);
    if (isLanding) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleNavClick = (event, href) => {
    event.preventDefault();
    setOpen(false);

    if (isLanding) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(`/${href}`);
      }
    } else {
      navigate(`/${href}`);
    }
  };

  return (
    <header className="landing-header">
      <nav className="landing-navbar navbar navbar-expand-md">
        <div className="container px-4">
          <a
            className="navbar-brand d-flex align-items-center gap-1"
            href="/"
            onClick={handleBrandClick}
            style={{
              color: 'var(--primary)',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
            }}
          >
            <span className="material-symbols-outlined">pets</span>
            AdoptApp
          </a>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Desktop Navigation Link System (hidden on mobile, managed natively by Bootstrap) */}
          <div className="collapse navbar-collapse">
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
            </ul>
            <div className="d-flex gap-2 mt-3 mt-md-0">
              {user ? (
                <div className="nav-user-dropdown-container" ref={dropdownRef}>
                  <button
                    className="nav-avatar-btn"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    aria-expanded={dropdownOpen}
                    aria-label="Menú de usuario"
                  >
                    <img
                      src={user?.avatar || user?.hostel?.logo || aiAvatar}
                      alt="Avatar de usuario"
                      className="nav-avatar-img"
                    />
                    <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '20px' }}>
                      {dropdownOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>

                  {dropdownOpen && (
                    <div className="nav-dropdown-menu">
                      <div className="nav-dropdown-header">
                        <div className="nav-dropdown-name">
                          {user?.hostel?.hostelName || user?.fullName || 'Usuario'}
                        </div>
                        <div className="nav-dropdown-email">
                          {user?.email || user?.correo}
                        </div>
                        <span className="nav-dropdown-role">
                          {user?.role?.toUpperCase() === 'HOSTEL'
                            ? 'Albergue'
                            : user?.role?.toUpperCase() === 'ADMIN'
                            ? 'Administrador'
                            : 'Adoptante'}
                        </span>
                      </div>
                      
                      <button
                        className="nav-dropdown-item"
                        onClick={() => {
                          setDropdownOpen(false);
                          setOpen(false);
                          navigate(
                            user.role === 'admin'
                              ? '/admin/dashboard'
                              : '/dashboard'
                          );
                        }}
                      >
                        <span className="material-symbols-outlined nav-dropdown-item-icon">dashboard</span>
                        Mi Panel
                      </button>

                      {user.role?.toUpperCase() !== 'ADMIN' && (
                        <button
                          className="nav-dropdown-item"
                          onClick={() => {
                            setDropdownOpen(false);
                            setOpen(false);
                            navigate('/dashboard/profile');
                          }}
                        >
                          <span className="material-symbols-outlined nav-dropdown-item-icon">person</span>
                          Mi Perfil
                        </button>
                      )}

                      <hr className="my-1" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }} />

                      <button
                        className="nav-dropdown-item logout"
                        onClick={() => {
                          setDropdownOpen(false);
                          setOpen(false);
                          logout();
                          navigate('/');
                        }}
                      >
                        <span className="material-symbols-outlined nav-dropdown-item-icon">logout</span>
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    className="btn-landing-outline"
                    onClick={() => {
                      setOpen(false);
                      navigate('/login');
                    }}
                  >
                    Ingresar
                  </button>
                  <button
                    className="btn-landing-primary"
                    onClick={() => {
                      setOpen(false);
                      navigate('/registro');
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

      {/* Drawer Component for Mobile Screens */}
      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        navLinks={navLinks}
        handleNavClick={handleNavClick}
        user={user}
        logout={logout}
        navigate={navigate}
      />
    </header>
  );
}
