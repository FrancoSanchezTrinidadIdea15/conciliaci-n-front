import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "@/components";

export const metadata: Metadata = {
  title: "Conciliación",
  description: "Conciliación de cuentas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}

