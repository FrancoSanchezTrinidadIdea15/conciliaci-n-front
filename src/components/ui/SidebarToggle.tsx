import { FaBars } from "react-icons/fa";
import { useSidebar } from "@/hooks/useSidebar";

interface SidebarToggleProps {
  className?: string;
  variant?: "default" | "floating";
}

export const SidebarToggle = ({ 
  className = "", 
  variant = "default" 
}: SidebarToggleProps) => {
  const { toggle } = useSidebar();

  const baseClasses = "p-3 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 transition-all duration-200";
  
  const variantClasses = {
    default: "bg-white shadow-lg border border-gray-200",
    floating: "fixed top-4 left-4 z-50 bg-white border border-gray-200 shadow-lg hover:shadow-xl hover:bg-gray-50 md:block hidden"
  };

  return (
    <button
      onClick={toggle}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-label="Toggle sidebar"
    >
      <FaBars className="h-5 w-5" />
    </button>
  );
};
