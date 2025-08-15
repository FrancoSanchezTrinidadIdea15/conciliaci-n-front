"use client";
import { useForm } from "react-hook-form";
import { AuthCard, Input, Button, Alert } from "@/components";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendResetPasswordEmail } from "@/actions/auth/reset-password";

interface ForgotPasswordProps {
  email: string;
}

export default function PageForgotPassword() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotPasswordProps>();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  const onSubmit = async (values: ForgotPasswordProps) => {
    try {
      setIsLoading(true);
      setMessage(null);
      
      const response = await sendResetPasswordEmail(values.email);
      
      if (response.success) {
        setMessage({
          text: "Se ha enviado un enlace a tu correo para restablecer tu contraseña",
          type: 'success'
        });
        // No redirigimos inmediatamente para que el usuario pueda ver el mensaje
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      } else {
        setMessage({
          text: "No se pudo enviar el enlace a tu correo",
          type: 'error'
        });
      }
    } catch (error) {
      setMessage({
        text: "Error al procesar la solicitud. Por favor, intenta de nuevo más tarde.",
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard title="Recuperar contraseña" subtitle="Te enviaremos un enlace a tu correo">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {message && (
          <Alert 
            message={message.text} 
            type={message.type === 'success' ? 'success' : 'error'} 
          />
        )}
        
        <Input 
          label="Correo electrónico" 
          type="email" 
          placeholder="tucorreo@example.com" 
          {...register("email", { 
            required: "El correo es requerido", 
            pattern: { 
              value: /\S+@\S+\.\S+/, 
              message: "Correo inválido" 
            } 
          })} 
          error={errors.email?.message as string} 
        />
        
        <Button 
          type="submit" 
          fullWidth 
          disabled={isSubmitting || isLoading}
        >
          {isLoading ? "Enviando..." : "Enviar enlace"}
        </Button>
        
        <Button 
          variant="secondary" 
          fullWidth
          onClick={() => router.back()}
          disabled={isLoading}
        >
          Cancelar
        </Button>
      </form>
    </AuthCard>
  );
}
