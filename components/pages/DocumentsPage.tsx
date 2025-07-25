import React, { useState } from 'react';
import { MOCK_DOCUMENTS } from '../../constants';
import { Document } from '../../types';

interface DocumentsPageProps {
    verifyPassword: (password: string) => boolean;
}

const SecurityModal: React.FC<{ onVerify: () => void; onCancel: () => void; verifyPassword: (password: string) => boolean; }> = ({ onVerify, onCancel, verifyPassword }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleVerify = () => {
        if (verifyPassword(password)) {
            onVerify();
        } else {
            setError('Senha incorreta. Por favor, tente novamente.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-sm">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Verificação de Segurança</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Por favor, digite sua senha para acessar este documento seguro.</p>
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    className="w-full mt-4 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700"
                    placeholder="Digite a senha..."
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <div className="flex justify-end space-x-4 mt-6">
                    <button onClick={onCancel} className="px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500">Cancelar</button>
                    <button onClick={handleVerify} className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Verificar</button>
                </div>
            </div>
        </div>
    );
};

const SignatureModal: React.FC<{ doc: Document; onSign: (docId: number, signerName: string, signerPosition: string) => void; onClose: () => void }> = ({ doc, onSign, onClose }) => {
    const [isAgreed, setIsAgreed] = useState(false);
    const [signerName, setSignerName] = useState('');
    const [signerPosition, setSignerPosition] = useState('');

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-2xl">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{doc.title}</h2>
                <div className="my-4 p-4 h-48 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300">
                    <h3 className="font-bold">Lorem Ipsum Dolor Sit Amet</h3>
                    <p>Consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor.</p>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                     <div>
                        <label htmlFor="signer-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome completo</label>
                        <input 
                            type="text" 
                            id="signer-name" 
                            value={signerName} 
                            onChange={e => setSignerName(e.target.value)} 
                            placeholder="Digite seu nome completo" 
                            className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="signer-position" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cargo</label>
                        <input 
                            type="text" 
                            id="signer-position" 
                            value={signerPosition} 
                            onChange={e => setSignerPosition(e.target.value)} 
                            placeholder="Ex: Gerente de RH" 
                            className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white"
                        />
                    </div>
                </div>
                <div className="mt-4 flex items-center">
                    <input id="agree-checkbox" type="checkbox" checked={isAgreed} onChange={() => setIsAgreed(!isAgreed)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label htmlFor="agree-checkbox" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                        Eu concordo em assinar eletronicamente este documento.
                    </label>
                </div>
                 <div className="flex justify-end space-x-4 mt-6">
                    <button onClick={onClose} className="px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500">Fechar</button>
                    <button onClick={() => onSign(doc.id, signerName, signerPosition)} disabled={!isAgreed || !signerName.trim() || !signerPosition.trim()} className="px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed">Assinar Documento</button>
                </div>
            </div>
        </div>
    );
};

const ViewDocumentModal: React.FC<{ doc: Document; onClose: () => void }> = ({ doc, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-2xl">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{doc.title}</h2>
                <div className="my-4 p-4 h-64 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300">
                    <h3 className="font-bold">Lorem Ipsum Dolor Sit Amet</h3>
                    <p>Consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor.</p>
                </div>
                 <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 rounded-md text-green-800 dark:text-green-200">
                    <p className="font-semibold">Documento assinado</p>
                    <p className="text-sm">Assinado digitalmente em {new Date(doc.signedDate!).toLocaleDateString()} por {doc.signerName} ({doc.signerPosition}).</p>
                 </div>
                 <div className="flex justify-end space-x-4 mt-6">
                    <button onClick={onClose} className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Fechar</button>
                </div>
            </div>
        </div>
    );
};


const DocumentsPage: React.FC<DocumentsPageProps> = ({ verifyPassword }) => {
    const [documents, setDocuments] = useState<Document[]>(MOCK_DOCUMENTS);
    const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
    const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
    const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const [newDocTitle, setNewDocTitle] = useState('');
    const [newDocType, setNewDocType] = useState<'Carta de Oferta' | 'Contrato' | 'NDA'>('Contrato');

    const handleActionClick = (doc: Document) => {
        setSelectedDoc(doc);
        setIsSecurityModalOpen(true);
    };

    const handleSecuritySuccess = () => {
        setIsSecurityModalOpen(false);
        if (selectedDoc) {
            if (selectedDoc.isSigned) {
                setIsViewModalOpen(true);
            } else {
                setIsSignatureModalOpen(true);
            }
        }
    };

    const handleSignDocument = (docId: number, signerName: string, signerPosition: string) => {
        setDocuments(docs => docs.map(d => d.id === docId ? { 
            ...d, 
            isSigned: true,
            signedDate: new Date().toISOString().split('T')[0],
            signerName,
            signerPosition,
        } : d));
        setIsSignatureModalOpen(false);
        setSelectedDoc(null);
    };

    const handleCreateDocument = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newDocTitle.trim()) {
            alert('Por favor, informe um título para o documento.');
            return;
        }
        const newDocument: Document = {
            id: Date.now(),
            title: newDocTitle,
            type: newDocType,
            dateAdded: new Date().toISOString().split('T')[0],
            isSigned: false,
        };
        setDocuments(prevDocs => [newDocument, ...prevDocs]);
        setNewDocTitle('');
        setNewDocType('Contrato');
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Armazenamento & Assinatura de Documentos</h1>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Criar Novo Documento</h2>
                <form onSubmit={handleCreateDocument} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="md:col-span-2">
                        <label htmlFor="doc-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Título do Documento</label>
                        <input type="text" id="doc-title" value={newDocTitle} onChange={e => setNewDocTitle(e.target.value)} placeholder="Ex: Proposta para novo candidato" className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white" />
                    </div>
                    <div>
                        <label htmlFor="doc-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo de Documento</label>
                        <select id="doc-type" value={newDocType} onChange={e => setNewDocType(e.target.value as any)} className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white">
                            <option value="Carta de Oferta">Carta de Oferta</option>
                            <option value="Contrato">Contrato</option>
                            <option value="NDA">NDA</option>
                        </select>
                    </div>
                    <div className="md:col-span-3 text-right">
                        <button type="submit" className="w-full md:w-auto justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                           + Criar Documento
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="py-3 px-4">Título do Documento</th>
                                <th className="py-3 px-4">Tipo</th>
                                <th className="py-3 px-4">Data de Criação</th>
                                <th className="py-3 px-4 text-center">Status</th>
                                <th className="py-3 px-4 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map(doc => (
                                <tr key={doc.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="py-3 px-4 text-gray-800 dark:text-white font-medium">{doc.title}</td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{doc.type}</td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{doc.dateAdded}</td>
                                    <td className="py-3 px-4 text-center">
                                        {doc.isSigned ? (
                                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Assinado</span>
                                        ) : (
                                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Pendente</span>
                                        )}
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <button 
                                            onClick={() => handleActionClick(doc)}
                                            className={`px-4 py-2 text-sm font-medium rounded-md ${doc.isSigned 
                                                ? 'text-indigo-700 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-800' 
                                                : 'text-white bg-indigo-600 hover:bg-indigo-700'}`}
                                        >
                                            {doc.isSigned ? 'Visualizar' : 'Assinar'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isSecurityModalOpen && selectedDoc && <SecurityModal onVerify={handleSecuritySuccess} onCancel={() => setIsSecurityModalOpen(false)} verifyPassword={verifyPassword} />}
            {isSignatureModalOpen && selectedDoc && <SignatureModal doc={selectedDoc} onSign={handleSignDocument} onClose={() => setIsSignatureModalOpen(false)} />}
            {isViewModalOpen && selectedDoc && <ViewDocumentModal doc={selectedDoc} onClose={() => { setIsViewModalOpen(false); setSelectedDoc(null); }}/>}
        </div>
    );
};

export default DocumentsPage;