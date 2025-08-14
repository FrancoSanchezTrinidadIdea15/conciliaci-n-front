import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800">404 - Página no encontrada</h1>
        <p className="text-gray-600">La página que estás buscando no existe.</p>
        <Link href="/" className="text-blue-500 hover:text-blue-700">Volver a la página de inicio</Link>
    </div>
  )
}
