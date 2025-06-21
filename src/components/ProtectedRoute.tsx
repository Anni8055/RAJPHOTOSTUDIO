import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/admin/login' 
}) => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !currentUser) {
      navigate(redirectTo);
    }
  }, [currentUser, loading, navigate, redirectTo]);
  
  // Show nothing while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
      </div>
    );
  }
  
  // If authenticated, render children
  return currentUser ? <>{children}</> : null;
};

export default ProtectedRoute; 