/**
 * Estandariza los errores de Firebase Auth a mensajes en español.
 * Evita mostrar códigos crudos como "Firebase: Error (auth/invalid-credential)".
 */
import { FIREBASE_AUTH_MESSAGES, DEFAULT_FIREBASE_AUTH_MESSAGE } from "@/constants/firebaseAuthMessages";

function getFirebaseErrorCode(error: unknown): string | null {
  if (error && typeof error === "object" && "code" in error && typeof (error as { code: string }).code === "string") {
    return (error as { code: string }).code;
  }
  return null;
}

/**
 * Obtiene un mensaje estándar en español para errores de Firebase Auth.
 * No expone códigos ni mensajes crudos de Firebase.
 */
export function getFirebaseAuthMessage(error: unknown): string {
  const code = getFirebaseErrorCode(error);
  if (code && FIREBASE_AUTH_MESSAGES[code]) {
    return FIREBASE_AUTH_MESSAGES[code];
  }
  return DEFAULT_FIREBASE_AUTH_MESSAGE;
}

/**
 * Clase de utilidad para la estandarización de errores de Firebase Auth.
 */
export class FirebaseAuthError {
  /** Mensaje listo para mostrar al usuario (español, sin códigos). */
  static getMessage(error: unknown): string {
    return getFirebaseAuthMessage(error);
  }

  /** Código interno de Firebase (solo para logs/debug, no para UI). */
  static getCode(error: unknown): string | null {
    return getFirebaseErrorCode(error);
  }
}
