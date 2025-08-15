"use client";

import { useForm } from "react-hook-form";
import { AuthCard, Input, Button, Alert} from "@/components";
import Link from "next/link";
import { registerUser } from "@/actions/auth/register";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

interface RegisterProps {
  name: string;
  email: string;
  rfc: string;
  password: string;
};

export default function PageRegister() {
  const router = useRouter();
  const {
    isRegistering,
    error,
    success,
    registerStart,
    registerSuccess,
    registerError,
    clearMessages,
  } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterProps>();

  // Limpiar mensajes al montar el componente
  useEffect(() => {
    clearMessages();
  }, [clearMessages]);

  const onSubmit = async (_values: RegisterProps) => {
    console.log("📝 Form submitted with values:", _values);
    
    const { name, email, password, rfc } = _values;
    console.log("🔍 Calling registerUser with:", { name, email, rfc, hasPassword: !!password });
    
    registerStart();
    
    const response = await registerUser(name, email, password, rfc);
    console.log("📨 Response from registerUser:", response);
    
    if (response.ok) {
      console.log("✅ Registration successful:", response.message);
      console.log("👤 User created:", response.user);
      
      registerSuccess({
        id: response.user?.id || '',
        name: response.user?.name || '',
        email: response.user?.email || '',
        rfc: response.user?.rfc || undefined,
      });
      
      // Iniciar sesión automáticamente después del registro
      try {
        const signInResult = await signIn("credentials", {
          email: email.toLowerCase(),
          password: password,
          redirect: false,
        });

        if (signInResult?.ok) {
          console.log("✅ Auto-login successful");
          router.push("/dashboard");
        } else {
          console.error("❌ Auto-login failed:", signInResult?.error);
          registerError("Usuario creado pero no se pudo iniciar sesión automáticamente. Por favor, inicia sesión manualmente.");
          setTimeout(() => {
            router.push("/auth/login");
          }, 2000);
        }
      } catch (error) {
        console.error("❌ Error during auto-login:", error);
        registerError("Usuario creado pero no se pudo iniciar sesión automáticamente. Por favor, inicia sesión manualmente.");
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      }
    } else {
      console.error("El usuario no fue creado", response.message);
      registerError(response.message || "No se pudo crear el usuario");
    }
  };

  return (
    <AuthCard title="Crear cuenta">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Mostrar mensajes de error o éxito */}
        {error && <Alert message={error} type="error" />}
        {success && <Alert message={success} type="success" />}
        
        <Input 
        label="Nombre" 
        placeholder="Tu nombre" {...register("name", { required: "El nombre es requerido", minLength: { value: 2, message: "Nombre demasiado corto" } })} error={errors.name?.message as string} />
        <Input label="Correo electrónico" type="email" placeholder="tucorreo@example.com" {...register("email", { required: "El correo es requerido", pattern: { value: /\S+@\S+\.\S+/, message: "Correo inválido" } })} error={errors.email?.message as string} />
        <Input label="RFC" type="text" placeholder="RFC" {...register("rfc", { required: "El RFC es requerido", minLength: { value: 13, message: "RFC inválido" } })} error={errors.rfc?.message as string} />
        <Input label="Contraseña" type="password" placeholder="********" {...register("password", { required: "La contraseña es requerida", minLength: { value: 6, message: "Mínimo 6 caracteres" } })} error={errors.password?.message as string} />
        <Button 
          type="submit" 
          fullWidth 
          disabled={isSubmitting || isRegistering}
        >
          {isRegistering ? "Creando cuenta..." : "Registrarse"}
        </Button>
      </form>
      <div className="relative py-2 text-center text-sm text-gray-500">
          <span className="px-2 bg-white relative z-10">o continuar con</span>
          <span className="absolute left-0 top-1/2 h-px w-full bg-gray-200 -translate-y-1/2" />
        </div>
        <div className="text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta? {" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Iniciar sesión
          </Link>
        </div>
    </AuthCard>
  );
}
