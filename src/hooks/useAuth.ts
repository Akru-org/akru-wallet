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

const AUTH_LOG_PREFIX = "[Auth]";

function mapFirebaseUser(user: User): { email: string; displayName: string | null } {
  return {
    email: user.email ?? "",
    displayName: user.displayName ?? null,
  };
}

async function logUserForBackend(user: User) {
  try {
    const token = await user.getIdToken();
    console.log(AUTH_LOG_PREFIX, "Firebase user (para backend):", {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      idToken: token ? `${token.slice(0, 20)}...` : null,
    });
    console.log(AUTH_LOG_PREFIX, "idToken completo (copiar si necesitas):", token);
  } catch (e) {
    console.warn(AUTH_LOG_PREFIX, "No se pudo obtener idToken:", e);
  }
}

export function useAuth() {
  const setAuthUser = useAuthStore((s) => s.setAuthUser);

  async function login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(AUTH_LOG_PREFIX, "Login email OK:", userCredential.user.email);
    await logUserForBackend(userCredential.user);
    setAuthUser(mapFirebaseUser(userCredential.user));
  }

  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    console.log(AUTH_LOG_PREFIX, "Login Google OK:", userCredential.user.email);
    await logUserForBackend(userCredential.user);
    setAuthUser(mapFirebaseUser(userCredential.user));
  }

  async function register(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log(AUTH_LOG_PREFIX, "Registro OK:", userCredential.user.email);
    await logUserForBackend(userCredential.user);
    setAuthUser(mapFirebaseUser(userCredential.user));
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
