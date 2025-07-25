import React, { useState } from 'react';
import { LogoIcon } from '../Icons';

interface LoginPageProps {
    onLogin: (credentials: { email: string; password: string; name: string; enrollmentNumber: string; }) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [isLoginView, setIsLoginView] = useState(true);

    // State for login form
    const [loginEmail, setLoginEmail] = useState('hr.manager@example.com');
    const [loginPassword, setLoginPassword] = useState('password');

    // State for registration form
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [enrollmentNumber, setEnrollmentNumber] = useState('');
    const [error, setError] = useState('');

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would validate credentials against a backend.
        const enrollment = Math.floor(10000000 + Math.random() * 90000000).toString();
        onLogin({ 
            email: loginEmail, 
            password: loginPassword, 
            name: `Jade Luna (${enrollment})`,
            enrollmentNumber: enrollment,
        });
    };
    
    const handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (!fullName.trim()) {
            setError('Full Name is required.');
            return;
        }
        if (!enrollmentNumber.trim() || !/^\d{8}$/.test(enrollmentNumber)) {
            setError('A valid 8-digit enrollment number is required.');
            return;
        }
        setError('');
        // In a real app, you'd register the user here.
        // For this mock-up, we'll just log them in with the new credentials.
        onLogin({ email, password, name: `${fullName} (${enrollmentNumber})`, enrollmentNumber });
    };

    const toggleView = () => {
        setIsLoginView(!isLoginView);
        setError(''); // Clear errors when toggling
        // Reset form fields
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setEnrollmentNumber('');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 m-4 space-y-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
                <div className="flex flex-col items-center">
                    <LogoIcon className="h-16 w-16 mb-2 text-indigo-600"/>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">SIGEP</h1>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        {isLoginView ? 'Bem vindo ao seu portal de integração, aprendizado e crescimento profissonal.' : 'Crie uma conta para começar'}
                    </p>
                </div>

                {isLoginView ? (
                    <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">E-mail</label>
                                <input id="email-address" name="email" type="email" autoComplete="email" required 
                                       className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                       placeholder="E-mail" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Senha</label>
                                <input id="password" name="password" type="password" autoComplete="current-password" required 
                                       className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                       placeholder="Senha" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
                            </div>
                        </div>

                        <div>
                            <button type="submit" 
                                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Entrar
                            </button>
                        </div>
                         <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                            Não tem uma conta?{' '}
                            <button type="button" onClick={toggleView} className="font-medium text-indigo-600 hover:text-indigo-500 dark:hover:text-indigo-400 focus:outline-none">
                                Cadastre-se
                            </button>
                        </p>
                    </form>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleRegisterSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                             <div>
                                <label htmlFor="full-name" className="sr-only">Nome completo</label>
                                <input id="full-name" name="name" type="text" autoComplete="name" required 
                                       value={fullName}
                                       onChange={e => setFullName(e.target.value)}
                                       className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                       placeholder="Nome completo" />
                            </div>
                            <div>
                                <label htmlFor="enrollment-number" className="sr-only">Matrícula</label>
                                <input id="enrollment-number" name="enrollment" type="text"
                                    pattern="\d{8}"
                                    title="A matrícula deve conter 8 dígitos."
                                    maxLength={8}
                                    required
                                    value={enrollmentNumber}
                                    onChange={e => setEnrollmentNumber(e.target.value)}
                                    className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Matrícula (8 dígitos)" />
                            </div>
                            <div>
                                <label htmlFor="email-address-register" className="sr-only">E-mail</label>
                                <input id="email-address-register" name="email" type="email" autoComplete="email" required 
                                       value={email}
                                       onChange={e => setEmail(e.target.value)}
                                       className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                       placeholder="E-mail" />
                            </div>
                            <div>
                                <label htmlFor="new-password" className="sr-only">Senha</label>
                                <input id="new-password" name="password" type="password" autoComplete="new-password" required 
                                       value={password}
                                       onChange={e => setPassword(e.target.value)}
                                       className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                       placeholder="Senha" />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="sr-only">Confirmar senha</label>
                                <input id="confirm-password" name="confirm-password" type="password" autoComplete="new-password" required 
                                       value={confirmPassword}
                                       onChange={e => setConfirmPassword(e.target.value)}
                                       className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                       placeholder="Confirmar senha" />
                            </div>
                        </div>

                        {error && <p className="text-center text-sm text-red-500 dark:text-red-400">{error}</p>}

                        <div>
                            <button type="submit" 
                                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Criar conta
                            </button>
                        </div>
                        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                            Já tem uma conta?{' '}
                            <button type="button" onClick={toggleView} className="font-medium text-indigo-600 hover:text-indigo-500 dark:hover:text-indigo-400 focus:outline-none">
                                Entrar
                            </button>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default LoginPage;