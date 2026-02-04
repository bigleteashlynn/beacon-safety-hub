import { useState, useCallback } from 'react';
import type { User, AuthState } from '@/types';

// Mock auth state - will be replaced with Firebase Auth
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  const login = useCallback(async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // TODO: Implement Firebase Auth
    // Simulating auth for now
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      email,
      displayName: 'Admin User',
      role: 'admin',
      createdAt: new Date(),
      lastLoginAt: new Date(),
    };

    setAuthState({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
    });

    return { success: true };
  }, []);

  const logout = useCallback(async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // TODO: Implement Firebase Auth signOut
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  const checkAuth = useCallback(async () => {
    // TODO: Check Firebase Auth state
    setAuthState(prev => ({ ...prev, isLoading: false }));
  }, []);

  return {
    ...authState,
    login,
    logout,
    checkAuth,
  };
}
