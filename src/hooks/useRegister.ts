import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { FirebaseAuthError } from "@/utils/firebaseAuthErrors";

export function useRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [alias, setAlias] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, loginWithGoogle } = useAuth();

  const passwordsMatch = password === confirm;
  const valid = email.includes("@") && password.length >= 6 && passwordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setError(null);
    setIsSubmitting(true);
    try {
      await register(email, password, alias.trim());
    } catch (e) {
      setError(FirebaseAuthError.getMessage(e));
    } finally {
      setIsSubmitting(false);
    }
  };

  type RegisterField = "email" | "password" | "confirm" | "alias";
  const fieldSetters: Record<RegisterField, (v: string) => void> = {
    email: setEmail,
    password: setPassword,
    confirm: setConfirm,
    alias: setAlias,
  };
  const onFieldChange = (key: RegisterField) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    fieldSetters[key](e.target.value);
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      await loginWithGoogle();
    } catch (e) {
      setError(FirebaseAuthError.getMessage(e));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    email,
    password,
    confirm,
    alias,
    error,
    isSubmitting,
    valid,
    passwordsMatch,
    handleSubmit,
    handleGoogleLogin,
    onFieldChange,
  };
}
