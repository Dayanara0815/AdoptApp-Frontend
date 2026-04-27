import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Páginas Públicas (IMPORTAMOS EL NUEVO LOGIN Y LAS PÁGINAS QUE FALTABAN)
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import LoginPage from './pages/LoginPage';
import CatalogPage from './pages/Catalog/CatalogPage';
import Registro from './pages/Registro';
import VerificarRegistro from './pages/VerificarRegistro';
import RegistroExitoso from './pages/RegistroExitoso';
import RecuperarContrasena from './pages/RecuperarContrasena';
import VerificarRecuperacion from './pages/VerificarRecuperacion';
import NuevaContrasena from './pages/NuevaContrasena';

// Páginas del Dashboard
import DashboardHome from './pages/dashboard/DashboardHome';
import MyPublications from './pages/dashboard/MyPublications';
import PetsManager from './pages/dashboard/PetsManager';
import UserProfile from './pages/dashboard/UserProfile';

// Componentes de Seguridad
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/authStore';

import './App.css';
import Profile from './pages/profile/Profile';
import SiteLayout from './layouts/SiteLayout';

function App() {
  const { user } = useAuth();

  return (
    <div className="app-container">
      <Routes>
        {/* SECCIÓN PÚBLICA */}
        {/* SECCIÓN PÚBLICA */}
        <Route path="/" element={<SiteLayout />}>
          <Route index element={<LandingPage />} />
          <Route
            path="login"
            element={user ? <Navigate to="/catalogo" replace /> : <Login />}
          />
          <Route path="registro" element={<Registro />} />
          <Route path="verificar-registro" element={<VerificarRegistro />} />
          <Route path="registro-exitoso" element={<RegistroExitoso />} />
          <Route
            path="recuperar-contrasena"
            element={<RecuperarContrasena />}
          />
          <Route
            path="verificar-recuperacion"
            element={<VerificarRecuperacion />}
          />
          <Route path="nueva-contrasena" element={<NuevaContrasena />} />
        </Route>

        {/* RUTAS ADICIONALES */}
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/catalogo" element={<CatalogPage />} />

        {/* SECCIÓN USUARIO ADOPTANTE */}
        <Route element={<ProtectedRoute user={user} allowedRole="user" />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="my-publications" element={<MyPublications />} />
            <Route path="pets" element={<PetsManager />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        {/* SECCIÓN ADMINISTRADOR */}
        <Route element={<ProtectedRoute user={user} allowedRole="admin" />}>
          <Route path="/admin" element={<DashboardLayout />}>
            <Route
              path="dashboard"
              element={<div>Panel de Administración - Resumen</div>}
            />
            <Route
              path="pets-inventory"
              element={<div>Gestión de Inventario de Mascotas</div>}
            />
            <Route
              path="users"
              element={<div>Administración de Usuarios</div>}
            />
          </Route>
        </Route>

        {/* RUTA 404 */}
        <Route
          path="*"
          element={
            <div className="text-center py-5">
              <h1>404 - Página no encontrada</h1>
              <p>
                Lo sentimos, la página que buscas no existe o no tienes permisos
                para verla.
              </p>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
