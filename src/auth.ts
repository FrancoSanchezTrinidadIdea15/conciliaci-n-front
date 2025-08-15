import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcryptjs from "bcryptjs";
import { z } from "zod";

import prisma from "./lib/prisma";


export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      
      // Si es login con Google, verificar/crear usuario en la base de datos
      if (account?.provider === "google") {
        try {
          
          // Buscar si el usuario ya existe
          const existingUser = await prisma.users.findUnique({
            where: { email: user.email?.toLowerCase() },
          });

          if (!existingUser) {
            // Crear nuevo usuario si no existe
            await prisma.users.create({
              data: {
                email: user.email?.toLowerCase() || "",
                name: user.name || "Usuario Google",
                password: "google-auth-" + Math.random().toString(36).substring(7), // Password temporal para usuarios de Google
              },
            });
          } else {
          }
          
          return true;
        } catch (error) {
          console.error("Error en signIn callback:", error);
          return false;
        }
      }
      
      return true;
    },

    async redirect({ url, baseUrl }) {
      
      // Si la URL es relativa, agregar la base URL
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Si la URL es del mismo origen, permitirla
      else if (new URL(url).origin === baseUrl) return url;
      
      return baseUrl;
    },

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnAuthPage = nextUrl.pathname.startsWith('/auth');
      
      
      // Si está en dashboard y no está logueado, redirigir a login
      if (isOnDashboard && !isLoggedIn) {
        return false;
      }
      
      // Si está logueado y está en página de auth, redirigir a dashboard
      if (isLoggedIn && isOnAuthPage) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      
      return true;
    },

    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }

      return token;
    },

    session({ session, token, user }) {
      session.user = token.data as any;
      return session;
    },
  },

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "select_account"
        }
      }
    }),
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // Buscar el correo
        const user = await prisma.users.findUnique({
          where: { email: email.toLowerCase() },
        });
        if (!user) return null;

        // Comparar las contraseñas
        if (!bcryptjs.compareSync(password, user.password)) return null;

        // Regresar el usuario sin el password
        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);