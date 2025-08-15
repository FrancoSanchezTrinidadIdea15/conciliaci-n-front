import { useAuthStore } from '@/store/authStore';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

// Hook para sincronizar el store con NextAuth
export const useAuth = () => {
  const { data: session, status } = useSession();
  const {
    user,
    isAuthenticated,
    setUser,
    setAuthenticated,
    setLoading,
  } = useAuthStore();

  // Sincronizar con NextAuth cuando cambie la sesión
  useEffect(() => {
    if (status === 'loading') {
      setLoading(true);
    } else {
      setLoading(false);
      
      if (session?.user) {
        const userData = {
          id: session.user.id || '',
          name: session.user.name || '',
          email: session.user.email || '',
          image: session.user.image || '',
        };
        setUser(userData);
        setAuthenticated(true);
      } else {
        setUser(null);
        setAuthenticated(false);
      }
    }
  }, [session, status, setUser, setAuthenticated, setLoading]);

  return useAuthStore();
};

// Hook para obtener solo el usuario
export const useUser = () => {
  return useAuthStore((state) => state.user);
};

// Hook para verificar si está autenticado
export const useIsAuthenticated = () => {
  return useAuthStore((state) => state.isAuthenticated);
};

// Hook para obtener el estado de carga
export const useAuthLoading = () => {
  return useAuthStore((state) => state.isLoading);
};
