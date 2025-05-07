import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export default function ProtectedRoute({ children, requireAuth = true }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (requireAuth && !loading && !isAuthenticated()) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router, requireAuth]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2C3E50]"></div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated()) {
    return null;
  }

  return <>{children}</>;
} 