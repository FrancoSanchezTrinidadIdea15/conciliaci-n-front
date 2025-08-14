import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      rfc: string | null;
      createdAt: Date;
      updatedAt: Date;
    } & DefaultSession["user"];
  }
  
  interface User {
    id: string;
    email: string;
    name: string;
    rfc: string | null;
    createdAt: Date;
    updatedAt: Date;
  }
}