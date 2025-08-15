import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Tipos para el usuario
interface User {
  id: string;
  name: string;
  email: string;
  rfc?: string;
  image?: string;
}

// Tipos para el estado de autenticación
interface AuthState {
  // Estado del usuario
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Estado de las operaciones
  isLoggingIn: boolean;
  isRegistering: boolean;
  isResettingPassword: boolean;
  isSendingResetEmail: boolean;
  
  // Mensajes
  error: string | null;
  success: string | null;
  
  // Acciones
  setUser: (user: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setLoading: (loading: boolean) => void;
  
  // Acciones de login
  setLoggingIn: (loggingIn: boolean) => void;
  loginStart: () => void;
  loginSuccess: (user: User) => void;
  loginError: (error: string) => void;
  
  // Acciones de registro
  setRegistering: (registering: boolean) => void;
  registerStart: () => void;
  registerSuccess: (user: User) => void;
  registerError: (error: string) => void;
  
  // Acciones de reset password
  setResettingPassword: (resetting: boolean) => void;
  resetPasswordStart: () => void;
  resetPasswordSuccess: () => void;
  resetPasswordError: (error: string) => void;
  
  // Acciones de forgot password
  setSendingResetEmail: (sending: boolean) => void;
  sendResetEmailStart: () => void;
  sendResetEmailSuccess: () => void;
  sendResetEmailError: (error: string) => void;
  
  // Acciones de logout
  logout: () => void;
  
  // Limpiar mensajes
  clearMessages: () => void;
  clearError: () => void;
  clearSuccess: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isLoggingIn: false,
      isRegistering: false,
      isResettingPassword: false,
      isSendingResetEmail: false,
      error: null,
      success: null,

      // Setters básicos
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
      setLoading: (loading) => set({ isLoading: loading }),
      setLoggingIn: (loggingIn) => set({ isLoggingIn: loggingIn }),
      setRegistering: (registering) => set({ isRegistering: registering }),
      setResettingPassword: (resetting) => set({ isResettingPassword: resetting }),
      setSendingResetEmail: (sending) => set({ isSendingResetEmail: sending }),

      // Acciones de login
      loginStart: () => set({ 
        isLoggingIn: true, 
        error: null, 
        success: null 
      }),
      loginSuccess: (user) => set({ 
        user, 
        isAuthenticated: true, 
        isLoggingIn: false, 
        error: null,
        success: 'Sesión iniciada correctamente'
      }),
      loginError: (error) => set({ 
        isLoggingIn: false, 
        error, 
        success: null 
      }),

      // Acciones de registro
      registerStart: () => set({ 
        isRegistering: true, 
        error: null, 
        success: null 
      }),
      registerSuccess: (user) => set({ 
        user, 
        isAuthenticated: true, 
        isRegistering: false, 
        error: null,
        success: 'Usuario creado exitosamente'
      }),
      registerError: (error) => set({ 
        isRegistering: false, 
        error, 
        success: null 
      }),

      // Acciones de reset password
      resetPasswordStart: () => set({ 
        isResettingPassword: true, 
        error: null, 
        success: null 
      }),
      resetPasswordSuccess: () => set({ 
        isResettingPassword: false, 
        error: null,
        success: 'Contraseña actualizada correctamente'
      }),
      resetPasswordError: (error) => set({ 
        isResettingPassword: false, 
        error, 
        success: null 
      }),

      // Acciones de forgot password
      sendResetEmailStart: () => set({ 
        isSendingResetEmail: true, 
        error: null, 
        success: null 
      }),
      sendResetEmailSuccess: () => set({ 
        isSendingResetEmail: false, 
        error: null,
        success: 'Se ha enviado un enlace a tu correo para restablecer tu contraseña'
      }),
      sendResetEmailError: (error) => set({ 
        isSendingResetEmail: false, 
        error, 
        success: null 
      }),

      // Logout
      logout: () => set({ 
        user: null, 
        isAuthenticated: false, 
        error: null, 
        success: null 
      }),

      // Limpiar mensajes
      clearMessages: () => set({ error: null, success: null }),
      clearError: () => set({ error: null }),
      clearSuccess: () => set({ success: null }),
    }),
    {
      name: 'auth-storage', // nombre para localStorage
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }), // solo persistir usuario y estado de autenticación
    }
  )
);
