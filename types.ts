export enum CandidateStatus {
    Applied = 'Inscrito',
    Interviewing = 'Em Entrevista',
    Offered = 'Oferta',
    Hired = 'Contratado',
    Rejected = 'Recusado',
}

export interface Candidate {
    id: number;
    name: string;
    avatarUrl: string;
    position: string;
    status: CandidateStatus;
    appliedDate: string;
    email: string;
}

export interface Document {
    id: number;
    title: string;
    type: 'Carta de Oferta' | 'Contrato' | 'NDA';
    dateAdded: string;
    isSigned: boolean;
    signedDate?: string;
    signerName?: string;
    signerPosition?: string;
}

export interface ChatMessage {
    id: string;
    authorId: string; // 'currentUser', 'ai', ou outro id de usuário
    text: string;
}

export interface ChatContact {
    id: string;
    name: string;
    avatarUrl: string;
    position: string;
    enrollmentNumber: string;
}

export interface Meeting {
    id: string;
    title: string;
    participants: string[];
    dateTime: string;
}