
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

const PrivateRoute = ({ 
  children, 
  requiresSubscription = false 
}: { 
  children: React.ReactNode, 
  requiresSubscription?: boolean 
}) => {
  const { currentUser, loading, subscribed } = useAuth();
  
  // Show loading state while checking authentication
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  // If no user is logged in, redirect to login
  if (!currentUser) {
    toast.error("Please sign in to access this content");
    return <Navigate to="/login" replace />;
  }
  
  // If subscription is required but user doesn't have one
  if (requiresSubscription && !subscribed) {
    toast.error("Subscription required to access premium content");
    return <Navigate to="/subscription" replace />;
  }
  
  return <>{children}</>;
};

export default PrivateRoute;
