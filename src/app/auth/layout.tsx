import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Conciliación - Autenticación",
    description: "Autenticación en la plataforma de conciliación",
};

export default function LayoutAuth({ children }: { children: React.ReactNode }) {
    return children;
}
