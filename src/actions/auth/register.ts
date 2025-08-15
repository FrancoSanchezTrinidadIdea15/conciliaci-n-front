"use server";
import bcryptjs from "bcryptjs";
import prisma from "@/lib/prisma";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  rfc: string
) => {
  try {
    // Verificar si ya existe un usuario con el mismo email o RFC
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [
          { email: email.toLowerCase() },
          { rfc: rfc }
        ]
      }
    });

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        return {
          ok: false,
          message: "Ya existe un usuario con este correo electrónico"
        };
      }
      if (existingUser.rfc === rfc) {
        return {
          ok: false,
          message: "Ya existe un usuario con este RFC"
        };
      }
    }

    const user = await prisma.users.create({
      data: {
        name: name,
        email: email.toLowerCase(),
        password: bcryptjs.hashSync(password),
        rfc: rfc,
      },
      select: {
        id: true,
        name: true,
        email: true,
        rfc: true,
      },
    });

    console.log("✅ User created successfully:", user);
    
    return {
      ok: true,
      user: user,
      message: "Usuario creado exitosamente",
    };
  } catch (error: any) {
    console.error("Error creando usuario:", error);

    // Manejar errores específicos de Prisma
    if (error.code === 'P2002') {
      const field = error.meta?.target?.[0];
      if (field === 'email') {
        return {
          ok: false,
          message: "Ya existe un usuario con este correo electrónico"
        };
      }
      if (field === 'rfc') {
        return {
          ok: false,
          message: "Ya existe un usuario con este RFC"
        };
      }
      return {
        ok: false,
        message: "Ya existe un usuario con estos datos"
      };
    }

    return {
      ok: false,
      message: "No se pudo crear el usuario. Por favor, intenta de nuevo.",
      error: error.message
    };
  }
};