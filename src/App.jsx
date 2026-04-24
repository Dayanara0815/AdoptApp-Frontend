import { Routes, Route } from 'react-router-dom'

// Layouts
import DashboardLayout from './layouts/DashboardLayout'

// Páginas Públicas
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'

// Páginas del Dashboard
import DashboardHome from './pages/dashboard/DashboardHome'
import PetsManager from './pages/dashboard/PetsManager'
import UserProfile from './pages/dashboard/UserProfile'

import './App.css'

function App() {
  return (
    <div className="app-container">
      <Routes>
        {/* SECCIÓN PÚBLICA */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* SECCIÓN PRIVADA (CON SIDEBAR) */}
        {/* Todas estas rutas compartirán el DashboardLayout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* La ruta base /dashboard cargará DashboardHome */}
          <Route index element={<DashboardHome />} />
          
          {/* Sub-rutas internas */}
          <Route path="pets" element={<PetsManager />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>

        {/* RUTA 404 */}
        <Route path="*" element={
          <div className="text-center py-5">
            <h1>404 - Página no encontrada</h1>
          </div>
        } />
      </Routes>
    </div>
  )
}

export default App
