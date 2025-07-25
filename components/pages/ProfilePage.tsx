import React from 'react';

interface ProfilePageProps {
    user: {
        name: string;
        email: string;
        enrollmentNumber: string;
    }
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Meu Perfil</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                        <img 
                            className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-indigo-500"
                            src="https://i.pinimg.com/originals/81/8a/4a/818a4a84f4e45638c2445ce365971a0a.jpg" 
                            alt={user.name}
                        />
                        <h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">{user.name}</h2>
                        <p className="text-gray-500 dark:text-gray-400">Gestora de RH</p>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Matrícula: {user.enrollmentNumber}</p>
                        <span className="inline-block mt-4 px-3 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">Ativo</span>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white border-b pb-4 border-gray-200 dark:border-gray-700">Informações do Perfil</h3>
                        <form className="mt-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome Completo</label>
                                    <input type="text" id="fullName" defaultValue={user.name} className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">E-mail</label>
                                    <input type="email" id="email" defaultValue={user.email} className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white" />
                                </div>
                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cargo</label>
                                    <input type="text" id="role" defaultValue="Gestora de RH" disabled className="mt-1 block w-full px-3 py-2 bg-gray-200 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm text-gray-500 dark:text-gray-400 cursor-not-allowed" />
                                </div>
                                <div>
                                    <label htmlFor="enrollmentNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Matrícula</label>
                                    <input type="text" id="enrollmentNumber" value={user.enrollmentNumber} disabled className="mt-1 block w-full px-3 py-2 bg-gray-200 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm text-gray-500 dark:text-gray-400 cursor-not-allowed" />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefone</label>
                                    <input type="tel" id="phone" defaultValue="(55) 91234-5678" className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white" />
                                </div>
                            </div>
                            <div className="pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                                <button type="submit" className="px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Atualizar Perfil
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;