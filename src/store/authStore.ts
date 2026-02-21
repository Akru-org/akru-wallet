import { create } from "zustand";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import type { AuthState } from "@/interfaces/auth";

function mapFirebaseUserToAuthUser(user: {
  email: string | null;
  displayName?: string | null;
  alias?: string;
}): { email: string; displayName: string | null; alias?: string } {
  return {
    email: user.email ?? "",
    displayName: user.displayName ?? null,
    alias: user.alias,
  };
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  token: null,

  setLoading: (loading) => set({ isLoading: loading }),
  setAuthUser: (user) => set({ user, isAuthenticated: !!user }),
  setToken: (token) => set({ token }),

  initAuthListener: () => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        set({ user: null, isAuthenticated: false, token: null, isLoading: false });
        return;
      }
      const user = mapFirebaseUserToAuthUser(firebaseUser);
      set({ user, isAuthenticated: true, isLoading: false });
      firebaseUser.getIdToken().then((token) => set({ token }));
    });
    return unsubscribe;
  },
}));
