export interface AuthUser {
  email: string;
  displayName?: string | null;
  alias?: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  setLoading: (loading: boolean) => void;
  setAuthUser: (user: AuthUser | null) => void;
  setToken: (token: string | null) => void;
  initAuthListener: () => () => void;
}
