"use client";
import { useForm } from "react-hook-form";
import { AuthCard, Input, Button } from "@/components";
import { useState } from "react";
import { useRouter } from "next/navigation";
interface ForgotPasswordProps {
  email: string;
};

export default function PageForgotPassword() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotPasswordProps>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async (_values: ForgotPasswordProps) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
  };

  return (
    <AuthCard title="Recuperar contraseña" subtitle="Te enviaremos un enlace a tu correo">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Correo electrónico" type="email" placeholder="tucorreo@example.com" {...register("email", { required: "El correo es requerido", pattern: { value: /\S+@\S+\.\S+/, message: "Correo inválido" } })} error={errors.email?.message as string} />
        <Button type="submit" fullWidth disabled={isSubmitting || isLoading}>Enviar enlace</Button>
        <Button variant="secondary" fullWidth
          onClick={() => router.back()}
        >
          Cancelar
        </Button>
      </form>
    </AuthCard>
  );
}
