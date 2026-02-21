import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { FirebaseAuthError } from "@/utils/firebaseAuthErrors";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, loginWithGoogle } = useAuth();

  const valid = email.includes("@") && password.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setError(null);
    setIsSubmitting(true);
    try {
      await login(email, password);
    } catch (e) {
      setError(FirebaseAuthError.getMessage(e));
    } finally {
      setIsSubmitting(false);
    }
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

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setPassword(e.target.value);
  };

  return {
    email,
    password,
    error,
    isSubmitting,
    valid,
    handleSubmit,
    handleGoogleLogin,
    onEmailChange,
    onPasswordChange,
  };
}
