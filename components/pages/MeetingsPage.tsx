import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MOCK_MEETINGS } from '../../constants';
import { Meeting } from '../../types';

// --- Meeting Room Component ---
const MeetingRoom: React.FC<{ meetingId: string }> = ({ meetingId }) => {
    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOff, setIsCameraOff] = useState(false);
    const [meeting, setMeeting] = useState<Meeting | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const allMeetings = JSON.parse(sessionStorage.getItem('allMeetings') || JSON.stringify(MOCK_MEETINGS));
        const foundMeeting = allMeetings.find((m: Meeting) => m.id === meetingId);
        if (foundMeeting) {
            setMeeting(foundMeeting);
        } else {
            navigate('/meetings');
        }
    }, [meetingId, navigate]);

    const copyLinkToClipboard = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Meeting link copied to clipboard!');
        }, (err) => {
            console.error('Could not copy link: ', err);
        });
    };
    
    if (!meeting) return <div className="text-center p-8">Carregando Reunião...</div>;

    const otherParticipants = meeting.participants.filter(p => p !== 'Jade Luna');

    const VideoPlaceholder: React.FC<{ name: string; isMuted?: boolean }> = ({ name, isMuted = false }) => (
        <div className="relative aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">{name}</div>
            <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            {isMuted && <div className="absolute bottom-2 right-2 bg-red-500 p-1.5 rounded-full"><svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg></div>}
        </div>
    );

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Sala de Reunião</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{meeting.title}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`relative aspect-video rounded-lg overflow-hidden border-2 ${isCameraOff ? 'bg-gray-900' : 'bg-black'} border-indigo-500`}>
                    {isCameraOff ? (
                         <div className="flex flex-col items-center justify-center h-full">
                            <img className="h-24 w-24 rounded-full object-cover mb-4" src="https://img.freepik.com/vetores-premium/ilustracao-vetorial-de-avatar-de-foto-padrao-do-perfil-do-usuario_664995-352.jpg" alt="Your avatar" />
                            <p className="text-white font-semibold">Você</p>
                            <p className="text-gray-400 text-sm">Câmera Desligada</p>
                        </div>
                    ) : (
                         <img src="https://picsum.photos/seed/meeting-user/1280/720" className="w-full h-full object-cover" alt="Your video feed" />
                    )}
                     <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">João Vitor</div>
                </div>
                {otherParticipants.length > 0 && <VideoPlaceholder name={otherParticipants[0]} isMuted />}
            </div>
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex justify-center items-center space-x-4">
                 <button onClick={() => setIsMuted(!isMuted)} className={`p-3 rounded-full transition-colors ${isMuted ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'}`} aria-label={isMuted ? "Unmute" : "Mute"}>{isMuted ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg> : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>}</button>
                <button onClick={() => setIsCameraOff(!isCameraOff)} className={`p-3 rounded-full transition-colors ${isCameraOff ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'}`} aria-label={isCameraOff ? "Turn camera on" : "Turn camera off"}>{isCameraOff ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg> : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>}</button>
                <button onClick={copyLinkToClipboard} className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white" aria-label="Copy meeting link"><svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.001l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.367a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg></button>
                <button onClick={() => navigate('/meetings')} className="px-6 py-3 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors">Encerrar</button>
            </div>
        </div>
    );
};

// --- Meetings Lobby Component ---
const MeetingsLobby: React.FC = () => {
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [newMeetingTitle, setNewMeetingTitle] = useState('');
    const [newMeetingDate, setNewMeetingDate] = useState('');

    useEffect(() => {
        const storedMeetings = JSON.parse(sessionStorage.getItem('allMeetings') || 'null');
        setMeetings(storedMeetings || MOCK_MEETINGS);
    }, []);

    const updateMeetings = (newMeetings: Meeting[]) => {
        setMeetings(newMeetings);
        sessionStorage.setItem('allMeetings', JSON.stringify(newMeetings));
    }

    const handleScheduleMeeting = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMeetingTitle || !newMeetingDate) return alert("Please fill in all fields.");
        
        const newMeeting: Meeting = {
            id: newMeetingTitle.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
            title: newMeetingTitle,
            dateTime: new Date(newMeetingDate).toISOString(),
            participants: ['Jade Luna', 'New Invitee']
        };
        
        updateMeetings([newMeeting, ...meetings]);
        setNewMeetingTitle('');
        setNewMeetingDate('');
    };

    const MeetingCard: React.FC<{ meeting: Meeting }> = ({ meeting }) => {
        const formattedDate = new Date(meeting.dateTime).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
        return (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between">
                <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{meeting.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{formattedDate}</p>
                    <div className="mt-4">
                        <p className="text-xs text-gray-400 dark:text-gray-500 uppercase font-semibold">Participantes</p>
                        <div className="flex -space-x-2 overflow-hidden mt-2">
                            {meeting.participants.map((p, index) => (
                                <img key={index} className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800 object-cover" src={`https://i.pravatar.cc/40?u=${p.replace(/\s+/g, '')}`} alt={p} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <Link to={`/meetings/${meeting.id}`} className="w-full text-center inline-block px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                        Entrar na Reunião
                    </Link>
                </div>
            </div>
        );
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Reuniões</h1>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Agendar Nova Reunião</h2>
                <form onSubmit={handleScheduleMeeting} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="md:col-span-2">
                        <label htmlFor="meeting-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Título da Reunião</label>
                        <input type="text" id="meeting-title" value={newMeetingTitle} onChange={(e) => setNewMeetingTitle(e.target.value)} placeholder="Ex: Planejamento do Q4" className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white" />
                    </div>
                    <div>
                        <label htmlFor="meeting-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Data e Hora</label>
                        <input type="datetime-local" id="meeting-date" value={newMeetingDate} onChange={(e) => setNewMeetingDate(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white" />
                    </div>
                    <div className="md:col-span-3 text-right">
                        <button type="submit" className="w-full md:w-auto justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Criar Reunião
                        </button>
                    </div>
                </form>
            </div>
            <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Próximas Reuniões</h2>
                {meetings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {meetings.map(meeting => <MeetingCard key={meeting.id} meeting={meeting} />)}
                    </div>
                ) : (
                    <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Sem Próximas Reuniões</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Agende uma reunião para começar.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Main Page Component ---
const MeetingsPage: React.FC = () => {
    const { meetingId } = useParams<{ meetingId?: string }>();
    return meetingId ? <MeetingRoom meetingId={meetingId} /> : <MeetingsLobby />;
};

export default MeetingsPage;