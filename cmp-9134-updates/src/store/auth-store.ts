// store/auth-store.ts
import { create } from 'zustand';

interface AuthState {
  token: string | null;
  user: { id: string; email: string; username: string } | null;
  setToken: (token: string) => void;
  setUser: (user: AuthState['user']) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
}));


