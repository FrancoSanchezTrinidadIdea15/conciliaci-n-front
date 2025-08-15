"use client";

import { useForm } from "react-hook-form";
import { AuthCard, Input, Button, Alert } from "@/components";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { login } from "@/actions/auth/login";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

interface LoginProps {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginProps>();

  const onSubmit = async (values: LoginProps) => {
    setErrorMessage("");
    
    const { email, password } = values;
    const response = await login(email, password);
    if (response.ok) {
      router.push("/dashboard");
    } else {
      setErrorMessage(response.message || "No se pudo iniciar sesión");
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <AuthCard title="Iniciar sesión">
      <div className="space-y-4">
        {errorMessage && <Alert message={errorMessage} type="error" />}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Correo electrónico"
            type="email"
            placeholder="tucorreo@example.com"
            {...register("email", {
              required: "El correo es requerido",
              pattern: {
                value: /\S+@\S+\.\S+/, 
                message: "Correo inválido",
              },
            })}
            error={errors.email?.message as string}
          />
          <Input
            label="Contraseña"
            type="password"
            placeholder="********"
            {...register("password", {
              required: "La contraseña es requerida",
              minLength: { value: 6, message: "Mínimo 6 caracteres" },
            })}
            error={errors.password?.message as string}
          />
          <Button type="submit" variant="primary" fullWidth disabled={isSubmitting}>
            Continuar
          </Button>
        </form>

        <div className="relative py-2 text-sm text-center text-gray-500">
          <span className="relative z-10 px-2 bg-white">o continuar con</span>
          <span className="absolute left-0 top-1/2 w-full h-px bg-gray-200 -translate-y-1/2" />
        </div>

        <Button 
          type="button" 
          variant="secondary" 
          fullWidth 
          onClick={handleGoogleLogin}
        >
          <FcGoogle className="mr-2" size={24} />
          Continuar con Google
        </Button>

        <div className="text-sm text-center text-gray-600">
          ¿No tienes una cuenta? {" "}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Registrarse
          </Link>
        </div>
        <div className="text-sm text-center text-gray-600">
          <Link href="/auth/forgot-password" className="text-blue-600 hover:underline">
            ¿Olvidó su contraseña?
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}
