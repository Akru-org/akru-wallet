import { create } from "zustand";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import type { AuthState } from "@/interfaces/auth";

function mapFirebaseUserToAuthUser(user: { email: string | null; displayName?: string | null }): { email: string; displayName: string | null } {
  return {
    email: user.email ?? "",
    displayName: user.displayName ?? null,
  };
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setLoading: (loading) => set({ isLoading: loading }),
  setAuthUser: (user) => set({ user, isAuthenticated: !!user }),

  initAuthListener: () => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      const user = firebaseUser ? mapFirebaseUserToAuthUser(firebaseUser) : null;
      set({ user, isAuthenticated: !!user, isLoading: false });
    });
    return unsubscribe;
  },
}));
