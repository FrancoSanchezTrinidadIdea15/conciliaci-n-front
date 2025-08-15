
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FaMoneyBillWave, 
  FaChartBar, 
  FaFileAlt,
  FaTimes
} from "react-icons/fa";
import { IoIosChatboxes } from "react-icons/io";

import { useSidebar } from "@/hooks/useSidebar";
import { FiSidebar } from "react-icons/fi";

const navigation = [
  {
    name: "Chatbot",  
    href: "/dashboard/chatbot",
    icon: IoIosChatboxes,
    description: "Chatbot para resolver dudas y problemas",
  },  
  {
    name: "Dashboard",  
    href: "/dashboard",
    icon: FaChartBar,
    description: "Dashboard de conciliación",
  },  
  {
    name: "Clientes y Proveedores",  
    href: "/dashboard/clientes-proveedores",
    icon: FaFileAlt,
    description: "Clientes y Proveedores",
  },
  {
    name: "Conciliacion Bancaria",
    href: "/dashboard/conciliacion",
    icon: FaMoneyBillWave,
    description: "Conciliación Bancaria",
  }  
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
          group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all
          ${
            isActive
              ? "text-blue-900 bg-blue-100 border border-blue-200"
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
    <div className="flex justify-between items-center p-4 border-b border-gray-200">
      <Link
        href="/conciliacion"
        className="flex items-center space-x-3 transition-opacity hover:opacity-80"
      >
        <FaMoneyBillWave className="w-8 h-8 text-blue-600" />
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-900">Sistema de</span>
          <span className="text-sm font-bold text-blue-600">Conciliación</span>
        </div>
      </Link>
      
             <button
         onClick={close}
         className="p-1.5 rounded-lg hover:bg-gray-100"
       >
         <FiSidebar className="w-6 h-6 text-black" />
       </button>
    </div>
  );

  const SidebarFooter = () => (
    <div className="p-4 border-t border-gray-200">
      <div className="text-xs text-center text-gray-500">
        Conciliación Bancaria v1.0
      </div>
    </div>
  );

  return (
    <>
            {/* Botón flotante para abrir sidebar (solo visible cuando está cerrado y en desktop) */}
      {!isOpen && (
                <button
          onClick={toggle}
          className="hidden fixed top-4 left-4 z-50 p-3 bg-white rounded-lg border border-gray-300 shadow-xl hover:shadow-2xl hover:bg-gray-100 md:block"
        >
          <FiSidebar className="w-6 h-6 text-black" />
        </button>
      )}

      {/* Overlay para cerrar sidebar al hacer clic fuera */}
             {isOpen && (
         <div
           className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
           onClick={close}
         />
       )}

                          {/* Sidebar principal */}
         <aside
     className={`sidebar-container h-full bg-white border-r border-gray-200 overflow-hidden hidden md:block ${isOpen ? "sidebar-open" : "sidebar-closed"}`}
   >
        {isOpen && (
          <div className="flex flex-col w-64 h-full">
            <SidebarHeader />
            
            {/* Navigation */}
            <div className="overflow-y-auto flex-1">
              <nav className="p-4 space-y-2">
                {navigation.map((item) => (
                  <NavigationItem key={item.name} item={item} />
                ))}
              </nav>
            </div>
            
            <SidebarFooter />
          </div>
        )}
      </aside>
    </>
  );
};        
