import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage';
import ChatPage from './components/pages/ChatPage';
import MeetingsPage from './components/pages/MeetingsPage';
import DocumentsPage from './components/pages/DocumentsPage';
import ProfilePage from './components/pages/ProfilePage';

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<{ email: string; password: string; name: string; enrollmentNumber: string; } | null>(null);

    const handleLogin = (credentials: { email: string; password: string; name: string; enrollmentNumber: string; }) => {
        setCurrentUser(credentials);
    };

    const handleLogout = () => {
        setCurrentUser(null);
    };

    if (!currentUser) {
        return <LoginPage onLogin={handleLogin} />;
    }

    return (
        <HashRouter>
            <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Header onLogout={handleLogout} userName={currentUser.name} />
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
                        <div className="container mx-auto px-6 py-8">
                            <Routes>
                                <Route path="/" element={<Navigate to="/dashboard" />} />
                                <Route path="/dashboard" element={<DashboardPage userName={currentUser.name} />} />
                                <Route path="/chat" element={<ChatPage />} />
                                <Route path="/meetings" element={<MeetingsPage />} />
                                <Route path="/meetings/:meetingId" element={<MeetingsPage />} />
                                <Route 
                                    path="/documents" 
                                    element={<DocumentsPage verifyPassword={(password: string) => !!currentUser && password === currentUser.password} />} 
                                />
                                <Route path="/profile" element={<ProfilePage user={currentUser} />} />
                            </Routes>
                        </div>
                    </main>
                </div>
            </div>
        </HashRouter>
    );
};

export default App;

