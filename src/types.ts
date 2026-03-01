import { LucideIcon, User, Building2, Landmark, Search, FileText, LayoutDashboard, Briefcase, Users, PieChart, Bell, LogOut, Menu, X, ChevronRight, Download, Filter, Star, MessageCircle } from 'lucide-react';

export interface CityConfig {
  id: string;
  name: string;
  state: string;
  logo: string;
  primaryColor: string;
  heroImage: string;
}

export const CITIES: Record<string, CityConfig> = {
  'queimada-nova': {
    id: 'queimada-nova',
    name: 'Queimada Nova',
    state: 'PI',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bras%C3%A3o_de_Queimada_Nova_Piau%C3%AD.png/200px-Bras%C3%A3o_de_Queimada_Nova_Piau%C3%AD.png',
    primaryColor: '#00FF00',
    heroImage: 'https://picsum.photos/seed/queimada/1920/1080',
  },
  'lagoa-do-barro': {
    id: 'lagoa-do-barro',
    name: 'Lagoa do Barro do Piauí',
    state: 'PI',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Bras%C3%A3o_de_Lagoa_do_Barro_do_Piau%C3%AD.png/200px-Bras%C3%A3o_de_Lagoa_do_Barro_do_Piau%C3%AD.png',
    primaryColor: '#00FF00',
    heroImage: 'https://picsum.photos/seed/lagoa/1920/1080',
  }
};

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  description: string;
  postedAt: string;
  cbo: string;
}

export interface Candidate {
  id: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  cbo: string;
  education: string;
  experience: string[];
  skills: string[];
  status: 'new' | 'reviewing' | 'interview' | 'hired' | 'rejected';
}

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Auxiliar Administrativo',
    company: 'Mercado Central',
    location: 'Centro, Queimada Nova',
    type: 'Tempo Integral',
    salary: 'R$ 1.412,00',
    description: 'Atendimento ao público, organização de documentos e suporte ao financeiro.',
    postedAt: '2024-03-20',
    cbo: '4110-05',
  },
  {
    id: '2',
    title: 'Vendedor de Loja',
    company: 'Moda & Cia',
    location: 'Centro, Lagoa do Barro',
    type: 'Tempo Integral',
    salary: 'Comissão + Fixo',
    description: 'Vendas diretas, organização de estoque e vitrine.',
    postedAt: '2024-03-21',
    cbo: '5211-10',
  }
];

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: '1',
    name: 'João Silva',
    cpf: '123.456.789-00',
    email: 'joao@email.com',
    phone: '89999999999',
    cbo: '7152-10', // Pedreiro
    education: 'Ensino Médio Completo',
    experience: ['Pedreiro na Construtora X (2 anos)', 'Ajudante de Obras (1 ano)'],
    skills: ['Alvenaria', 'Acabamento', 'Leitura de plantas'],
    status: 'new',
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    cpf: '987.654.321-11',
    email: 'maria@email.com',
    phone: '89888888888',
    cbo: '4110-05', // Auxiliar Administrativo
    education: 'Ensino Superior Incompleto',
    experience: ['Recepcionista na Clínica Y (3 anos)'],
    skills: ['Excel', 'Atendimento', 'Inglês Básico'],
    status: 'reviewing',
  }
];
