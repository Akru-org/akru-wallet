import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { FirebaseAuthError } from "@/utils/firebaseAuthErrors";

export function useRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
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
      await register(email, password);
    } catch (e) {
      setError(FirebaseAuthError.getMessage(e));
    } finally {
      setIsSubmitting(false);
    }
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setPassword(e.target.value);
  };

  const onConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirm(e.target.value);
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
    error,
    isSubmitting,
    valid,
    passwordsMatch,
    handleSubmit,
    handleGoogleLogin,
    onEmailChange,
    onPasswordChange,
    onConfirmChange,
  };
}
