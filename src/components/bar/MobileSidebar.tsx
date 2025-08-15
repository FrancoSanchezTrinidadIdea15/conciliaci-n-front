"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  FaMoneyBillWave, 
  FaChartBar, 
  FaFileAlt,
  FaTimes,
  FaBars
} from "react-icons/fa";
import { IoIosChatboxes } from "react-icons/io";
import { FiSidebar } from "react-icons/fi";

const navigation = [
  {
    name: "Dashboard",  
    href: "/dashboard",
    icon: FaChartBar,
    description: "Panel principal",
  },  
  {
    name: "Chatbot",  
    href: "/dashboard/chat",
    icon: IoIosChatboxes,
    description: "Asistente virtual",
  },  
  {
    name: "Clientes y Proveedores",  
    href: "/dashboard/clientes-proveedores",
    icon: FaFileAlt,
    description: "Gestión de contactos",
  },
  {
    name: "Conciliación Bancaria",
    href: "/dashboard/conciliacion",
    icon: FaMoneyBillWave,
    description: "Conciliación de cuentas",
  }  
];

export const MobileSidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActiveRoute = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Botón hamburguesa flotante para móvil */}
      <button
        onClick={toggle}
        className="fixed top-4 left-4 z-50 p-3 bg-white rounded-full border border-gray-200 shadow-lg md:hidden"
      >
        <FiSidebar className="w-5 h-5 text-gray-700" />
      </button>

      

             {/* Sidebar móvil */}
       {isOpen && (
         <div className="fixed inset-0 z-50 md:hidden">
           {/* Panel del sidebar - pantalla completa */}
           <div className="flex flex-col w-full h-full bg-white">
              {/* Header */}
              <div className="flex justify-between items-center p-8 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <FaMoneyBillWave className="w-10 h-10 text-blue-600" />
                  <div>
                    <h1 className="text-sm font-bold text-gray-900">Sistema de</h1>
                    <h2 className="text-sm font-bold text-blue-600">Conciliación</h2>
                  </div>
                </div>
                
                <button
                  onClick={close}
                  className="p-3 rounded-full transition-colors hover:bg-gray-100"
                >
                  <FaTimes className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              
              {/* Navigation */}
              <div className="overflow-y-auto flex-1 py-8">
                <nav className="p-3 px-6 space-y-4">
                  {navigation.map((item) => {
                    const isActive = isActiveRoute(item.href);
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={close}
                        className={`
                          group flex items-center px-6 py-6 text-lg font-medium rounded-xl transition-all duration-200
                          ${
                            isActive
                              ? "text-blue-900 bg-blue-50 border-l-4 border-blue-600"
                              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                          }
                        `}
                      >
                        <item.icon
                          className={`
                            mr-5 h-8 w-8 flex-shrink-0
                            ${
                              isActive
                                ? "text-blue-600"
                                : "text-gray-500 group-hover:text-gray-700"
                            }
                          `}
                        />
                        <div className="flex-1">
                          <div className="text-lg font-semibold">{item.name}</div>
                          <div className={`text-base ${isActive ? "text-blue-500" : "text-gray-500"}`}>
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </nav>
              </div>
              
                             {/* Footer */}
               <div className="p-6 border-t border-gray-200">
                 <div className="text-center">
                   <div className="text-base font-medium text-gray-900">Conciliación Bancaria</div>
                   <div className="text-sm text-gray-500">Versión 1.0</div>
                 </div>
               </div>
           </div>
         </div>
      )}
    </>
  );
};
