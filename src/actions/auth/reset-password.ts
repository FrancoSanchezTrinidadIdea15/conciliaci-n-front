"use server";

import { Resend } from 'resend';
import ResetPasswordEmail from '@/components/email/ResetPasswordEmail';
import prisma from '@/lib/prisma';
import { randomBytes } from 'crypto';
import bcryptjs from 'bcryptjs';
import { render } from '@react-email/render';

// Inicializar Resend con la API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetPasswordEmail(email: string) {
  try {
    console.log('Iniciando proceso de reset password para:', email);

    const user = await prisma.users.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      console.log('Usuario no encontrado');
      return {
        error: "No se encontró ningún usuario con ese correo electrónico",
      };
    }

    // Generar token
    const resetToken = randomBytes(32).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hora

    // Actualizar usuario con el token
    await prisma.users.update({
      where: { id: user.id },
      data: {
        resetToken: resetToken,
        resetTokenExpires: resetTokenExpires,
      },
    });

    const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password/${resetToken}`;
    console.log('Reset link generado:', resetLink);

    // Renderizar el email
    const emailHtml = render(
      ResetPasswordEmail({
        userName: user.name || 'Usuario',
        resetLink,
      })
    );

    try {
      console.log('Intentando enviar email con Resend');
      const { data, error } = await resend.emails.send({
        from: 'Soporte <onboarding@resend.dev>',
        to: email.toLowerCase(),
        subject: 'Restablecer contraseña',
        html: await emailHtml,
      });

      if (error) {
        console.error('Error de Resend:', error);
        return {
          error: "Error al enviar el correo electrónico: " + error.message,
        };
      }

      console.log('Email enviado exitosamente:', data);
      return { success: true };
    } catch (sendError: any) {
      console.error('Error al enviar email:', sendError);
      return {
        error: "Error al enviar el correo: " + (sendError.message || 'Error desconocido'),
      };
    }
  } catch (error: any) {
    console.error('Error en sendResetPasswordEmail:', error);
    return {
      error: "Error al procesar la solicitud: " + (error.message || 'Error desconocido'),
    };
  }
}

export async function resetPassword(token: string, newPassword: string) {
  try {
    console.log('Iniciando resetPassword con token:', token);
    
    const user = await prisma.users.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: {
          gt: new Date(),
        },
      },
    });

    console.log('Usuario encontrado:', user ? 'Sí' : 'No');
    
    if (!user) {
      console.log('Token inválido o expirado');
      return {
        error: "Token inválido o expirado",
      };
    }

    console.log('Hasheando nueva contraseña...');
    const hashedPassword = bcryptjs.hashSync(newPassword, 10);

    console.log('Actualizando usuario con ID:', user.id);
    const updatedUser = await prisma.users.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    });

    console.log('Usuario actualizado:', updatedUser ? 'Sí' : 'No');
    
    if (!updatedUser) {
      console.log('Error: No se pudo actualizar el usuario');
      return {
        error: "No se pudo actualizar la contraseña",
      };
    }

    console.log('Contraseña actualizada exitosamente');
    return { success: true };
  } catch (error) {
    console.error('Error en resetPassword:', error);
    return {
      error: "Error al restablecer la contraseña: " + (error instanceof Error ? error.message : 'Error desconocido'),
    };
  }
}