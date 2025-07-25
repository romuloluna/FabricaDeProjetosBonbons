import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { MOCK_CANDIDATES } from '../../constants';
import { Candidate, CandidateStatus } from '../../types';

interface DashboardPageProps {
    userName: string;
}

const getStatusColor = (status: CandidateStatus) => {
    switch (status) {
        case CandidateStatus.Applied: return '#3B82F6'; // blue-500
        case CandidateStatus.Interviewing: return '#F97316'; // orange-500
        case CandidateStatus.Offered: return '#22C55E'; // green-500
        case CandidateStatus.Hired: return '#8B5CF6'; // violet-500
        case CandidateStatus.Rejected: return '#EF4444'; // red-500
        default: return '#6B7280'; // gray-500
    }
};

const CandidateRow: React.FC<{ candidate: Candidate }> = ({ candidate }) => (
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
        <td className="py-3 px-4 flex items-center">
            <img className="h-10 w-10 rounded-full object-cover mr-4" src={candidate.avatarUrl} alt={candidate.name} />
            <div>
                <p className="font-semibold text-gray-800 dark:text-white">{candidate.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{candidate.email}</p>
            </div>
        </td>
        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{candidate.position}</td>
        <td className="py-3 px-4">
            <span className="px-2 py-1 text-xs font-semibold rounded-full"
                  style={{ 
                      backgroundColor: `${getStatusColor(candidate.status)}33`, // semi-transparent
                      color: getStatusColor(candidate.status) 
                  }}>
                {candidate.status}
            </span>
        </td>
        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{candidate.appliedDate}</td>
    </tr>
);


const DashboardPage: React.FC<DashboardPageProps> = ({ userName }) => {
    const pipelineData = Object.values(CandidateStatus).map(status => ({
        name: status,
        value: MOCK_CANDIDATES.filter(c => c.status === status).length,
    })).filter(item => item.value > 0);

    const COLORS = pipelineData.map(d => getStatusColor(d.name as CandidateStatus));

    const totalCandidates = MOCK_CANDIDATES.length;
    const hiredCount = MOCK_CANDIDATES.filter(c => c.status === CandidateStatus.Hired).length;
    const interviewCount = MOCK_CANDIDATES.filter(c => c.status === CandidateStatus.Interviewing).length;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Bem-vindo de volta, {userName}!</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Veja o que está acontecendo no seu departamento hoje.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-gray-500 dark:text-gray-400">Total de Candidatos</h3>
                    <p className="text-4xl font-bold text-gray-800 dark:text-white mt-2">{totalCandidates}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-gray-500 dark:text-gray-400">Em Entrevista</h3>
                    <p className="text-4xl font-bold text-gray-800 dark:text-white mt-2">{interviewCount}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-gray-500 dark:text-gray-400">Contratados Neste Trimestre</h3>
                    <p className="text-4xl font-bold text-gray-800 dark:text-white mt-2">{hiredCount}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Candidatos Recentes</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="py-3 px-4">Candidato</th>
                                    <th className="py-3 px-4">Cargo</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4">Data de Inscrição</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {MOCK_CANDIDATES.slice(0, 4).map(c => <CandidateRow key={c.id} candidate={c} />)}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Pipeline de Contratação</h2>
                    <div className="flex-grow w-full h-64">
                         <ResponsiveContainer>
                            <PieChart>
                                <Pie data={pipelineData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                    {pipelineData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `${value} candidato(s)`} />
                                <Legend/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
