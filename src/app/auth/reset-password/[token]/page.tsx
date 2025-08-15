"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { resetPassword } from "@/actions/auth/reset-password";
import { Alert } from "@/components/ui/Alert";
import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params);
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validaciones
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    try {
      const result = await resetPassword(token, password);

      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        // Esperar 2 segundos antes de redirigir
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      }
    } catch (err) {
      setError("Error al restablecer la contraseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Restablecer contraseña">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <Alert message={error} type="error" />}
        {success && (
          <Alert
            message="Contraseña actualizada correctamente. Redirigiendo al login..."
            type="success"
          />
        )}

        <div className="space-y-4">
          <Input
            type="password"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading || success}
          />

          <Input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading || success}
          />

          <Button
            type="submit"
            fullWidth
            disabled={loading || success}
          >
            Cambiar contraseña
          </Button>
        </div>
      </form>
    </AuthCard>
  );
}