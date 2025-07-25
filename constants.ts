import { Candidate, Document, CandidateStatus, Meeting, ChatContact } from './types';

export const MOCK_CANDIDATES: Candidate[] = [
    { id: 1, name: 'Ana Paula Souza', avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg', position: 'Engenheira Frontend Sênior', status: CandidateStatus.Interviewing, appliedDate: '2024-07-15', email: 'ana.souza@example.com' },
    { id: 2, name: 'Carlos Eduardo Silva', avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg', position: 'Designer UX/UI', status: CandidateStatus.Offered, appliedDate: '2024-07-12', email: 'carlos.silva@example.com' },
    { id: 3, name: 'Mariana Oliveira', avatarUrl: 'https://randomuser.me/api/portraits/women/65.jpg', position: 'Gerente de Produto', status: CandidateStatus.Applied, appliedDate: '2024-07-20', email: 'mariana.oliveira@example.com' },
    { id: 4, name: 'João Pedro Santos', avatarUrl: 'https://randomuser.me/api/portraits/men/41.jpg', position: 'Desenvolvedor Backend', status: CandidateStatus.Hired, appliedDate: '2024-06-28', email: 'joao.santos@example.com' },
    { id: 5, name: 'Fernanda Lima', avatarUrl: 'https://randomuser.me/api/portraits/women/68.jpg', position: 'Cientista de Dados', status: CandidateStatus.Rejected, appliedDate: '2024-07-05', email: 'fernanda.lima@example.com' },
    { id: 6, name: 'Rafael Almeida', avatarUrl: 'https://randomuser.me/api/portraits/men/53.jpg', position: 'Engenheiro DevOps', status: CandidateStatus.Interviewing, appliedDate: '2024-07-18', email: 'rafael.almeida@example.com' },
];

export const MOCK_DOCUMENTS: Document[] = [
    { id: 1, title: 'Carta de Oferta - Carlos Eduardo Silva', type: 'Carta de Oferta', dateAdded: '2024-07-18', isSigned: false },
    { id: 2, title: 'Contrato de Trabalho - João Pedro Santos', type: 'Contrato', dateAdded: '2024-07-01', isSigned: true, signedDate: '2024-07-02' },
    { id: 3, title: 'NDA - Ana Paula Souza', type: 'NDA', dateAdded: '2024-07-16', isSigned: true, signedDate: '2024-07-17' },
    { id: 4, title: 'Contrato - Designer Freelancer', type: 'Contrato', dateAdded: '2024-07-21', isSigned: false },
];

export const MOCK_MEETINGS: Meeting[] = [
    { 
        id: 'entrevista-ana-paula-souza', 
        title: 'Entrevista com Ana Paula Souza', 
        participants: ['Maria Clara', 'Ana Paula Souza'], 
        dateTime: '2024-08-15T10:00:00Z' 
    },
    { 
        id: 'reuniao-semanal-design', 
        title: 'Reunião Semanal - Time de Design', 
        participants: ['Maria Clara', 'Carlos Eduardo Silva', 'Mariana Oliveira'], 
        dateTime: '2024-08-16T14:30:00Z' 
    },
    { 
        id: 'kickoff-projeto-ats', 
        title: 'Kickoff do Projeto: Novo ATS', 
        participants: ['Maria Clara', 'João Pedro Santos', 'Rafael Almeida'], 
        dateTime: '2024-08-19T11:00:00Z' 
    },
];

export const MOCK_TEAM_MEMBERS: ChatContact[] = [
    { id: '1', name: 'Ana Paula Souza (84620193)', avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg', position: 'Engenheira Frontend Sênior', enrollmentNumber: '84620193' },
    { id: '2', name: 'Carlos Eduardo Silva (59204817)', avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg', position: 'Designer UX/UI', enrollmentNumber: '59204817' },
    { id: '3', name: 'Mariana Oliveira (77451234)', avatarUrl: 'https://randomuser.me/api/portraits/women/65.jpg', position: 'Gerente de Produto', enrollmentNumber: '77451234' },
    { id: '4', name: 'João Pedro Santos (10395728)', avatarUrl: 'https://randomuser.me/api/portraits/men/41.jpg', position: 'Desenvolvedor Backend', enrollmentNumber: '10395728' },
    { id: '5', name: 'Fernanda Lima (88124567)', avatarUrl: 'https://randomuser.me/api/portraits/women/68.jpg', position: 'Cientista de Dados', enrollmentNumber: '88124567' },
    { id: '6', name: 'Rafael Almeida (93847102)', avatarUrl: 'https://randomuser.me/api/portraits/men/53.jpg', position: 'Engenheiro DevOps', enrollmentNumber: '93847102' },
];

export const CURRENT_USER_AVATAR = 'https://randomuser.me/api/portraits/men/15.jpg';
export const CURRENT_USER_ID = 'currentUser';