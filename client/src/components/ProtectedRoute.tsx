import { useAuth } from '../context/AuthContext';
import { navigate } from '../utils/router';

export function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) {
  const { user } = useAuth();
  if (!user) {
    navigate('/login');
    return null;
  }
  if (adminOnly && !['ADMIN', 'SUPER_ADMIN'].includes(user.role)) {
    return <div className="card">Access denied.</div>;
  }
  return <>{children}</>;
}
