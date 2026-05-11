import { Navigate, Outlet } from 'react-router-dom';

/**
 * ProtectedRoute component to handle role-based access.
 * @param {Object} props
 * @param {string} props.allowedRole - The role required to access the route.
 * @param {Object} props.user - The current user object (should contain a role property).
 * @param {string} props.redirectTo - Path to redirect if access is denied.
 */
const ProtectedRoute = ({ allowedRole, user, redirectTo = '/login' }) => {
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  const userRoleLower = user.role?.toLowerCase();
  const allowedRoleLower = allowedRole?.toLowerCase();

  if (allowedRole && userRoleLower !== allowedRoleLower) {
    // Permitir que el rol 'hostel' también acceda a las rutas de 'user' (/dashboard)
    if (allowedRoleLower === 'user' && userRoleLower === 'hostel') {
      // Dejamos pasar
    } else {
      // Redirigir a sus paneles correspondientes
      const fallbackPath = userRoleLower === 'admin' ? '/admin' : '/dashboard';
      return <Navigate to={fallbackPath} replace />;
    }
  }

  return <Outlet />;
};


export default ProtectedRoute;
