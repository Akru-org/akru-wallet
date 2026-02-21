import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  type User,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import { useAuthStore } from "@/store/authStore";
import { userService } from "@/services/user.service";

const AUTH_LOG_PREFIX = "[Auth]";

function mapFirebaseUser(user: User): { email: string; displayName: string | null } {
  return {
    email: user.email ?? "",
    displayName: user.displayName ?? null,
  };
}

async function syncUserAfterAuth(uid: string, email: string, alias: string) {
  const res = await userService.syncUser({ uid, email, alias });
  if (res.error || res.status >= 400) {
    console.warn(AUTH_LOG_PREFIX, "Sync backend failed:", res.error ?? res.status);
  }
}

export function useAuth() {
  const setAuthUser = useAuthStore((s) => s.setAuthUser);

  async function login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(AUTH_LOG_PREFIX, "Login OK:", user.email);
    await syncUserAfterAuth(user.uid, user.email ?? email, "");
    setAuthUser(mapFirebaseUser(user));
  }

  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    console.log(AUTH_LOG_PREFIX, "Login Google OK:", user.email);
    await syncUserAfterAuth(user.uid, user.email ?? "", "");
    setAuthUser(mapFirebaseUser(user));
  }

  async function register(email: string, password: string, alias = "") {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(AUTH_LOG_PREFIX, "Registro OK:", user.email);
    await syncUserAfterAuth(user.uid, user.email ?? email, alias);
    setAuthUser(mapFirebaseUser(user));
  }

  async function logout() {
    try {
      await signOut(auth);
      console.log(AUTH_LOG_PREFIX, "Logout OK");
      setAuthUser(null);
    } catch (e) {
      console.error(AUTH_LOG_PREFIX, "Logout error:", e);
      setAuthUser(null);
    }
  }

  async function resetPassword(email: string) {
    await sendPasswordResetEmail(auth, email);
    console.log(AUTH_LOG_PREFIX, "Reset password email enviado a:", email);
  }

  return { login, loginWithGoogle, register, logout, resetPassword };
}
