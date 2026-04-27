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

  if (allowedRole && user.role !== allowedRole) {
    // Redirect to their respective dashboard if they try to access a route they shouldn't
    const fallbackPath = user.role === 'admin' ? '/admin' : '/dashboard';
    return <Navigate to={fallbackPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
