import React from 'react';
import { LogoutIcon } from './Icons';

interface HeaderProps {
    onLogout: () => void;
    userName: string;
}

const Header: React.FC<HeaderProps> = ({ onLogout, userName }) => {
    return (
        <header className="flex items-center justify-end h-20 px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
                <div className="relative">
                    <button className="flex items-center text-left focus:outline-none">
                        <div className="hidden md:block mr-4 text-right">
                           <p className="font-semibold text-sm text-gray-800 dark:text-white">{userName}</p>
                           <p className="text-xs text-gray-500 dark:text-gray-400">SIGEP</p> {/* Se preferir, pode traduzir para "Sistema de Gestão de Pessoas" */}
                        </div>
                        <img className="h-10 w-10 rounded-full object-cover" src="https://i.pinimg.com/originals/81/8a/4a/818a4a84f4e45638c2445ce365971a0a.jpg" alt="Seu avatar" />
                    </button>
                </div>
                <button 
                    onClick={onLogout} 
                    className="ml-6 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-white focus:outline-none"
                    aria-label="Sair"
                >
                    <LogoutIcon className="h-6 w-6" />
                </button>
            </div>
        </header>
    );
};

export default Header;
