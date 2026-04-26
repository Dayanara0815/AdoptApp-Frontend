
import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Páginas Públicas
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

// Páginas del Dashboard (Usuario)
import DashboardHome from './pages/dashboard/DashboardHome';
import MyPublications from './pages/dashboard/MyPublications';
import PetsManager from './pages/dashboard/PetsManager';
import UserProfile from './pages/dashboard/UserProfile';

// Componentes de Seguridad
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/authStore';

import './App.css';
import Profile from './pages/profile/Profile';

function App() {
  const { user } = useAuth();

  return (
    <div className="app-container">
      <Routes>
        {/* SECCIÓN PÚBLICA */}
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/login" 
          element={user ? <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} replace /> : <LoginPage />} 
        />
        <Route path="/profile" element={<Profile />} />

        {/* SECCIÓN USUARIO ADOPTANTE */}
        <Route element={<ProtectedRoute user={user} allowedRole="user" />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="my-publications" element={<MyPublications />} />
            <Route path="pets" element={<PetsManager />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
        </Route>

        {/* SECCIÓN ADMINISTRADOR */}
        <Route element={<ProtectedRoute user={user} allowedRole="admin" />}>
          <Route path="/admin" element={<DashboardLayout />}>
            <Route path="dashboard" element={<div>Panel de Administración - Resumen</div>} />
            <Route path="pets-inventory" element={<div>Gestión de Inventario de Mascotas</div>} />
            <Route path="users" element={<div>Administración de Usuarios</div>} />
          </Route>
        </Route>

        {/* RUTA 404 */}
        <Route
          path="*"
          element={
            <div className="text-center py-5">
              <h1>404 - Página no encontrada</h1>
              <p>Lo sentimos, la página que buscas no existe o no tienes permisos para verla.</p>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
