export const FIREBASE_AUTH_MESSAGES: Record<string, string> = {
  // Credenciales y login
  "auth/invalid-credential": "Email o contraseña incorrectos.",
  "auth/invalid-email": "El email no es válido.",
  "auth/wrong-password": "Contraseña incorrecta.",
  "auth/user-not-found": "No hay ninguna cuenta con este email.",
  "auth/user-disabled": "Esta cuenta ha sido deshabilitada.",
  "auth/invalid-login-credentials": "Email o contraseña incorrectos.",

  // Registro
  "auth/email-already-in-use": "Este email ya está registrado. Inicia sesión o recupera tu contraseña.",
  "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",

  // Límites y seguridad
  "auth/too-many-requests": "Demasiados intentos. Espera un momento e inténtalo de nuevo.",
  "auth/operation-not-allowed": "Este método de inicio de sesión no está habilitado.",
  "auth/requires-recent-login": "Por seguridad, vuelve a iniciar sesión para continuar.",

  // Popup / Google
  "auth/popup-closed-by-user": "Cerraste la ventana. Intenta de nuevo si quieres continuar.",
  "auth/popup-blocked": "El navegador bloqueó la ventana. Permite ventanas emergentes para este sitio.",
  "auth/cancelled-popup-request": "Se abrió otra ventana de inicio de sesión. Cierra la duplicada e intenta de nuevo.",
  "auth/account-exists-with-different-credential": "Ya existe una cuenta con este email usando otro método. Inicia sesión con ese método.",

  // Red y recuperación
  "auth/network-request-failed": "Error de conexión. Revisa tu internet e intenta de nuevo.",
  "auth/expired-action-code": "El enlace ha caducado. Solicita uno nuevo.",
  "auth/invalid-action-code": "El enlace no es válido o ya fue usado.",
  "auth/user-mismatch": "Las credenciales no corresponden al usuario actual.",

  // Verificación
  "auth/invalid-verification-code": "El código de verificación no es válido.",
  "auth/invalid-verification-id": "El código de verificación expiró. Solicita uno nuevo.",

  // Genéricos
  "auth/argument-error": "Datos incorrectos. Revisa el formulario.",
  "auth/internal-error": "Error interno. Intenta de nuevo en unos momentos.",
};

export const DEFAULT_FIREBASE_AUTH_MESSAGE = "Ha ocurrido un error. Intenta de nuevo.";
