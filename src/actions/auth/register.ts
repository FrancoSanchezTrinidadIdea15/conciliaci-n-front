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
      message: "Usuario creado",
    };
  } catch (error) {
    console.error("Error creando usuario:", error);

    return {
      ok: false,
      message: "No se pudo crear al usuario",
      error: (error as Error).message
    };
  }
};