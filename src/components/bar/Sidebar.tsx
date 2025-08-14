
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FaMoneyBillWave, 
  FaChartBar, 
  FaFileAlt,
  FaBars,
  FaTimes
} from "react-icons/fa";
import { useSidebar } from "@/hooks/useSidebar";

const navigation = [
  {
    name: "Conciliación Bancaria",  
    href: "/conciliacion",
    icon: FaMoneyBillWave,
    description: "Estados de cuenta y conciliación automática",
  },  
  {
    name: "Reportes",  
    href: "/conciliacion/reportes",
    icon: FaChartBar,
    description: "Reportes y estadísticas de conciliación",
  },  
  {
    name: "Documentación",  
    href: "/conciliacion/docs",
    icon: FaFileAlt,
    description: "Guía de uso del sistema",
  },  
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { isOpen, toggle, close } = useSidebar();

  const isActiveRoute = (href: string) => {
    if (href === "/conciliacion") {
      return pathname.startsWith("/conciliacion");
    }
    return pathname === href;
  };

  const NavigationItem = ({ item }: { item: typeof navigation[0] }) => {
    const isActive = isActiveRoute(item.href);
    
    return (
      <Link
        href={item.href}
        onClick={close}
        className={`
          group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
          ${
            isActive
              ? "bg-blue-100 text-blue-900 border border-blue-200"
              : "text-gray-800 hover:bg-gray-100"
          }
        `}
      >
        <item.icon
          className={`
            mr-3 h-6 w-6 flex-shrink-0
            ${
              isActive
                ? "text-blue-600"
                : "text-gray-600 group-hover:text-gray-800"
            }
          `}
        />
        <div className="flex-1">
          <div className="font-medium">{item.name}</div>
          <div
            className={`text-xs ${
              isActive ? "text-blue-600" : "text-gray-500"
            }`}
          >
            {item.description}
          </div>
        </div>
      </Link>
    );
  };

  const SidebarHeader = () => (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <Link
        href="/conciliacion"
        className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
      >
        <FaMoneyBillWave className="w-8 h-8 text-blue-600" />
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-900">Sistema de</span>
          <span className="text-sm font-bold text-blue-600">Conciliación</span>
        </div>
      </Link>
      
      <button
        onClick={close}
        className="p-1.5 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
      >
        <FaTimes className="h-5 w-5" />
      </button>
    </div>
  );

  const SidebarFooter = () => (
    <div className="p-4 border-t border-gray-200">
      <div className="text-xs text-gray-500 text-center">
        Conciliación Bancaria v1.0
      </div>
    </div>
  );

  return (
    <>
      {/* Botón flotante para abrir sidebar (solo visible cuando está cerrado) */}
      {!isOpen && (
        <button
          onClick={toggle}
          className="fixed top-4 left-4 z-50 p-3 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-gray-50 md:block hidden"
        >
          <FaBars className="h-5 w-5 text-black" />
        </button>
      )}

      {/* Overlay para cerrar sidebar al hacer clic fuera */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={close}
        />
      )}

      {/* Sidebar principal */}
      <aside
        className={`
          fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:block hidden
        `}
      >
        <div className="h-full flex flex-col">
          <SidebarHeader />
          
          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            <nav className="p-4 space-y-2">
              {navigation.map((item) => (
                <NavigationItem key={item.name} item={item} />
              ))}
            </nav>
          </div>
          
          <SidebarFooter />
        </div>
      </aside>

      {/* Sidebar móvil */}
      <div className="md:hidden">
        {/* Botón de menú móvil */}
        <button
          onClick={toggle}
          className="fixed top-4 left-4 z-20 p-3 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 bg-white shadow-lg border border-gray-200 transition-all duration-200"
        >
          <FaBars className="h-5 w-5" />
        </button>

        {/* Sidebar móvil */}
        {isOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              onClick={close}
            />

            {/* Panel del menú */}
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  onClick={close}
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <FaTimes className="h-5 w-5 text-white" />
                </button>
              </div>

              {/* Header móvil */}
              <div className="flex items-center p-4 border-b border-gray-200">
                <FaMoneyBillWave className="w-8 h-8 text-blue-600" />
                <div className="ml-3 flex flex-col">
                  <span className="text-sm font-bold text-gray-900">Sistema de</span>
                  <span className="text-sm font-bold text-blue-600">Conciliación</span>
                </div>
              </div>

              {/* Contenido del menú */}
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  {navigation.map((item) => (
                    <NavigationItem key={item.name} item={item} />
                  ))}
                </nav>
              </div>

              <SidebarFooter />
            </div>
          </div>
        )}
      </div>
    </>
  );
};        
