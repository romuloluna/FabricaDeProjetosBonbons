import React from 'react';
import { NavLink } from 'react-router-dom';
import { DashboardIcon, ChatIcon, MeetingsIcon, DocumentsIcon, ProfileIcon, LogoIcon } from './Icons';

const Sidebar: React.FC = () => {
    const commonLinkClass = "flex items-center px-4 py-2.5 text-black hover:bg-indigo-600 hover:text-white rounded-lg transition-colors duration-200";
    const activeLinkClass = "bg-indigo-600 text-white";

    const getLinkClass = ({ isActive }: { isActive: boolean }) => 
        isActive ? `${commonLinkClass} ${activeLinkClass}` : commonLinkClass;

    return (
        <div className="hidden md:flex flex-col w-64" style={{ backgroundColor: '#A9A9A9' }}>
            <div className="flex items-center justify-center h-20 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
                <LogoIcon className="h-10 w-10 mr-2" />
                <h1 className="text-2xl font-bold">SIGEP</h1>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-2">
                <NavLink to="/dashboard" className={getLinkClass}>
                    <DashboardIcon className="h-6 w-6 mr-3" />
                    Dashboard
                </NavLink>
                <NavLink to="/chat" className={getLinkClass}>
                    <ChatIcon className="h-6 w-6 mr-3" />
                    Chat Assistant
                </NavLink>
                <NavLink to="/meetings" className={getLinkClass}>
                    <MeetingsIcon className="h-6 w-6 mr-3" />
                    Sala de Reunião
                </NavLink>
                <NavLink to="/documents" className={getLinkClass}>
                    <DocumentsIcon className="h-6 w-6 mr-3" />
                    Documentos
                </NavLink>
                <NavLink to="/profile" className={getLinkClass}>
                    <ProfileIcon className="h-6 w-6 mr-3" />
                    Meu Perfil
                </NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;