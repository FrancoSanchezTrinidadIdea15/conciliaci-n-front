"use client";
import { logout } from "@/actions";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export const NavBar = () => {
    const { user, logout: logoutFromStore } = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        logoutFromStore();
    };

    return (
        <nav className="flex items-center px-4 h-14">
            {/* Espaciador */}
            <div className="flex-1"></div>
            {/* Perfil en la esquina derecha */}
            <div className="flex items-center p-3">
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center"
                    >
                        <div className="flex justify-center items-center w-10 h-10 bg-gray-200 rounded-full">
                            <img 
                                src={user?.image || `https://ui-avatars.com/api/?name=${user?.name || 'U'}&background=random`}
                                alt="Profile"
                                className="object-cover w-10 h-10 rounded-full"
                            />
                        </div>
                    </button>

                    {/* Menú desplegable */}
                    {isProfileOpen && (
                        <div className="absolute right-0 top-10 z-50 py-1 w-56 bg-white rounded-lg border border-gray-200 shadow-lg">
                            {/* Info del usuario */}
                            <div className="px-4 py-2 border-b border-gray-100">
                                <div className="text-sm font-medium text-gray-900">
                                    {user?.name || 'Usuario'}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {user?.email}
                                </div>
                            </div>

                            {/* Opciones */}
                            <div className="py-1">
                                <Link
                                    href="/profile"
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsProfileOpen(false)}
                                >
                                    <FaUser className="mr-2 w-4 h-4 text-gray-500" />
                                    Mi Perfil
                                </Link>

                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsProfileOpen(false);
                                    }}
                                    className="flex items-center px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <FaSignOutAlt className="mr-2 w-4 h-4 text-gray-500" />
                                    Cerrar sesión
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay */}
            {isProfileOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsProfileOpen(false)}
                />
            )}
        </nav>
    );
};