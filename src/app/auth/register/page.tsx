"use client";

import { useForm } from "react-hook-form";
import { AuthCard, Input, Button, Alert} from "@/components";
import Link from "next/link";
import { registerUser } from "@/actions/auth/register";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface RegisterProps {
  name: string;
  email: string;
  rfc: string;
  password: string;
};

export default function PageRegister() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterProps>();

  const onSubmit = async (_values: RegisterProps) => {
    console.log("📝 Form submitted with values:", _values);
    
    // Limpiar mensajes anteriores
    setErrorMessage("");
    setSuccessMessage("");
    
    const { name, email, password, rfc } = _values;
    console.log("🔍 Calling registerUser with:", { name, email, rfc, hasPassword: !!password });
    
    const response = await registerUser(name, email, password, rfc);
    console.log("📨 Response from registerUser:", response);
    
    if (response.ok) {
      console.log("✅ Registration successful:", response.message);
      console.log("👤 User created:", response.user);
      setSuccessMessage("Usuario creado exitosamente");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } else {
      console.error("El usuario no fue creado", response.message);
      setErrorMessage(response.message || "No se pudo crear el usuario");
    }
  };

  return (
    <AuthCard title="Crear cuenta">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Mostrar mensajes de error o éxito */}
        {errorMessage && <Alert message={errorMessage} type="error" />}
        {successMessage && <Alert message={successMessage} type="success" />}
        
        <Input 
        label="Nombre" 
        placeholder="Tu nombre" {...register("name", { required: "El nombre es requerido", minLength: { value: 2, message: "Nombre demasiado corto" } })} error={errors.name?.message as string} />
        <Input label="Correo electrónico" type="email" placeholder="tucorreo@example.com" {...register("email", { required: "El correo es requerido", pattern: { value: /\S+@\S+\.\S+/, message: "Correo inválido" } })} error={errors.email?.message as string} />
        <Input label="RFC" type="text" placeholder="RFC" {...register("rfc", { required: "El RFC es requerido", minLength: { value: 13, message: "RFC inválido" } })} error={errors.rfc?.message as string} />
        <Input label="Contraseña" type="password" placeholder="********" {...register("password", { required: "La contraseña es requerida", minLength: { value: 6, message: "Mínimo 6 caracteres" } })} error={errors.password?.message as string} />
        <Button type="submit" fullWidth disabled={isSubmitting}>Registrarse</Button>
        <div className="text-center text-sm text-gray-600">
          ¿Ya tiene una cuenta? {" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Iniciar sesión
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}
