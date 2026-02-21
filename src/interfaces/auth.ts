export interface AuthUser {
  email: string;
  displayName?: string | null;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  setAuthUser: (user: AuthUser | null) => void;
  initAuthListener: () => () => void;
}
