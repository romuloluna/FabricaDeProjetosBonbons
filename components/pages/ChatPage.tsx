import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGeminiStream } from '../../services/geminiService';
import { ChatMessage, ChatContact } from '../../types';
import { MOCK_TEAM_MEMBERS, CURRENT_USER_AVATAR, CURRENT_USER_ID } from '../../constants';
import { SendIcon, BotIcon } from '../Icons';

type Participant = ChatContact | { id: 'ai'; name: string; avatarUrl: string; position: string; enrollmentNumber?: string };

interface Conversation {
    participant: Participant;
    messages: ChatMessage[];
}

const ChatPage: React.FC = () => {
    const [conversations, setConversations] = useState<Record<string, Conversation>>(() => {
        const initialConvos: Record<string, Conversation> = {
            'ai': {
                participant: { id: 'ai', name: 'Assistente IA', avatarUrl: '', position: 'Seu parceiro de RH', enrollmentNumber: '' },
                messages: [{ id: 'init-ai-msg', authorId: 'ai', text: 'Olá! Como posso ajudar você com suas necessidades de RH hoje? Pergunte sobre compliance, boas práticas ou elaboração de documentos.' }],
            }
        };
        MOCK_TEAM_MEMBERS.forEach(user => {
            initialConvos[user.id] = {
                participant: user,
                messages: [],
            };
        });
        return initialConvos;
    });

    const [activeConversationId, setActiveConversationId] = useState<string>('ai');
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversations, activeConversationId]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const userMessage: ChatMessage = { id: Date.now().toString(), authorId: CURRENT_USER_ID, text: input };
        const currentInput = input;
        setInput('');

        setConversations(prev => {
            const newMessages = [...prev[activeConversationId].messages, userMessage];
            return { ...prev, [activeConversationId]: { ...prev[activeConversationId], messages: newMessages } };
        });

        setIsLoading(true);

        if (activeConversationId === 'ai') {
            try {
                const stream = await sendMessageToGeminiStream(currentInput);
                const botMessageId = (Date.now() + 1).toString();
                let botMessage: ChatMessage = { id: botMessageId, authorId: 'ai', text: '' };
                
                // Add the empty bot message first
                setConversations(prev => ({
                    ...prev,
                    [activeConversationId]: {
                        ...prev[activeConversationId],
                        messages: [...prev[activeConversationId].messages, botMessage]
                    }
                }));

                for await (const chunk of stream) {
                    botMessage.text += chunk.text;
                    setConversations(prev => ({
                        ...prev,
                        [activeConversationId]: {
                            ...prev[activeConversationId],
                            messages: prev[activeConversationId].messages.map(m => m.id === botMessageId ? { ...botMessage } : m)
                        }
                    }));
                }
            } catch (error) {
                const errorMessage: ChatMessage = { 
                    id: (Date.now() + 1).toString(),
                    authorId: 'ai', 
                    text: 'Desculpe, encontrei um erro. Por favor, tente novamente mais tarde.' 
                };
                setConversations(prev => ({
                    ...prev,
                    [activeConversationId]: {
                        ...prev[activeConversationId],
                        messages: [...prev[activeConversationId].messages, errorMessage]
                    }
                }));
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        } else {
            // Simulate a reply from the other user
            setTimeout(() => {
                const otherUser = conversations[activeConversationId].participant;
                const replyMessage: ChatMessage = { 
                    id: (Date.now() + 1).toString(),
                    authorId: otherUser.id, 
                    text: `Ei! Obrigado pela sua mensagem. Estou um pouco ocupado agora, mas vou te responder em breve.` 
                };
                 setConversations(prev => ({
                    ...prev,
                    [activeConversationId]: {
                        ...prev[activeConversationId],
                        messages: [...prev[activeConversationId].messages, replyMessage]
                    }
                }));
                setIsLoading(false);
            }, 1500);
        }
    };
    
    const activeConversation = conversations[activeConversationId];
    const contactList = [conversations['ai'], ...MOCK_TEAM_MEMBERS.map(m => conversations[m.id])];

    return (
        <div className="flex flex-col h-[calc(100vh-144px)]">
             <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Chat</h1>
            <div className="flex flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                {/* Chat List */}
                <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Conversas</h2>
                    </div>
                    <ul className="overflow-y-auto flex-1">
                        {contactList.map(({ participant }) => {
                            const lastMessage = conversations[participant.id].messages.slice(-1)[0];
                            return (
                                <li key={participant.id} onClick={() => setActiveConversationId(participant.id)} className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${activeConversationId === participant.id ? 'bg-indigo-50 dark:bg-gray-700/50' : ''}`}>
                                    <div className="relative mr-4">
                                        {participant.id === 'ai' ? (
                                            <div className="h-12 w-12 rounded-full bg-indigo-500 flex items-center justify-center text-white"><BotIcon className="h-7 w-7" /></div>
                                        ) : (
                                            <img className="h-12 w-12 rounded-full object-cover" src={participant.avatarUrl} alt={participant.name} />
                                        )}
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <p className="font-semibold text-gray-800 dark:text-white truncate">{participant.name}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                            {lastMessage ? `${lastMessage.authorId === CURRENT_USER_ID ? 'Você: ' : ''}${lastMessage.text}` : `Comece uma conversa...`}
                                        </p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Chat Window */}
                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
                        {activeConversation.participant.id === 'ai' ? (
                            <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white mr-4"><BotIcon className="h-6 w-6" /></div>
                        ) : (
                            <img className="h-10 w-10 rounded-full object-cover mr-4" src={activeConversation.participant.avatarUrl} alt={activeConversation.participant.name} />
                        )}
                        <div>
                            <p className="font-semibold text-gray-800 dark:text-white">{activeConversation.participant.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{activeConversation.participant.position}</p>
                        </div>
                    </div>
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {activeConversation.messages.map((msg) => {
                            const isCurrentUser = msg.authorId === CURRENT_USER_ID;
                             const participant = msg.authorId === 'ai' 
                                ? conversations.ai.participant 
                                : msg.authorId === CURRENT_USER_ID ? null : MOCK_TEAM_MEMBERS.find(u => u.id === msg.authorId);

                            return (
                                <div key={msg.id} className={`flex items-start gap-4 ${isCurrentUser ? 'justify-end' : ''}`}>
                                    {!isCurrentUser && (
                                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
                                            {msg.authorId === 'ai' ? (
                                                <div className="h-full w-full rounded-full bg-indigo-500 flex items-center justify-center text-white"><BotIcon className="h-6 w-6" /></div>
                                            ) : (
                                                <img className="h-10 w-10 rounded-full object-cover" src={(participant as ChatContact).avatarUrl} alt={(participant as ChatContact).name} />
                                            )}
                                        </div>
                                    )}
                                    <div className={`max-w-lg p-3 rounded-xl shadow ${isCurrentUser ? 'bg-indigo-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
                                        <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                                    </div>
                                    {isCurrentUser && (
                                        <img className="flex-shrink-0 h-10 w-10 rounded-full object-cover" src={CURRENT_USER_AVATAR} alt="Seu avatar" />
                                    )}
                                </div>
                            )
                        })}
                        {isLoading && (
                             <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                                    <BotIcon className="h-6 w-6" />
                                </div>
                                <div className="max-w-lg p-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                                   <div className="flex items-center space-x-1">
                                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
                                   </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                     {/* Input */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center bg-gray-100 dark:bg-gray-900 rounded-lg px-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Digite uma mensagem..."
                                className="flex-1 bg-transparent border-none focus:ring-0 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 py-3"
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleSend}
                                disabled={isLoading || input.trim() === ''}
                                className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors"
                            >
                                <SendIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
