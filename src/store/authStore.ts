import { create } from 'zustand';
import { User } from '@/types';

interface AuthState {
  user: User;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>(() => ({
  isAuthenticated: true,
  user: {
    id: '1',
    name: 'Carlos Mendoza',
    email: 'carlos@akru.app',
  },
}));
