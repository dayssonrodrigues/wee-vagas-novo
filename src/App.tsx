import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  User, Building2, Landmark, Search, FileText, LayoutDashboard, 
  Briefcase, Users, PieChart, Bell, LogOut, Menu, X, 
  ChevronRight, Download, Filter, Star, MessageCircle, ArrowRight,
  CheckCircle2, Target, Lightbulb, TrendingUp, MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart as RePieChart, Pie, Cell
} from 'recharts';
import { CITIES, MOCK_JOBS, MOCK_CANDIDATES, CityConfig } from './types';

// --- Components ---

const Navbar = ({ city }: { city: CityConfig }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-zinc-100 sticky top-0 z-50">
      <div className="container-custom h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={city.logo} alt="Brasão" className="h-12 w-auto" referrerPolicy="no-referrer" />
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tighter leading-none">CONECTA</span>
            <span className="text-[10px] uppercase tracking-widest font-semibold opacity-40">{city.name}</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/vagas" className="text-sm font-semibold hover:text-primary transition-colors">Vagas</Link>
          <Link to="/profissionais" className="text-sm font-semibold hover:text-primary transition-colors">Para Profissionais</Link>
          <Link to="/empresas" className="text-sm font-semibold hover:text-primary transition-colors">Para Empresas</Link>
          <Link to="/gestao" className="text-sm font-semibold hover:text-primary transition-colors">Gestão Pública</Link>
          <Link to="/login" className="btn-secondary !py-2 !px-6 !text-sm">
            Entrar
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-zinc-100 p-4 flex flex-col gap-4"
          >
            <Link to="/vagas" className="font-bold">Vagas</Link>
            <Link to="/profissionais" className="font-bold">Para Profissionais</Link>
            <Link to="/empresas" className="font-bold">Para Empresas</Link>
            <Link to="/gestao" className="font-bold">Gestão Pública</Link>
            <Link to="/login" className="btn-secondary text-center">Entrar</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/gestao' },
    { icon: Users, label: 'Candidatos', path: '/gestao/candidatos' },
    { icon: Briefcase, label: 'Vagas', path: '/gestao/vagas' },
    { icon: PieChart, label: 'Relatórios', path: '/gestao/relatorios' },
    { icon: Bell, label: 'Notificações', path: '/gestao/notificacoes' },
  ];

  return (
    <aside className="w-64 bg-secondary text-white h-screen sticky top-0 hidden lg:flex flex-col p-6">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <TrendingUp className="text-white" size={18} />
        </div>
        <span className="font-bold text-xl tracking-tighter">CONECTA</span>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              location.pathname === item.path 
                ? 'bg-primary text-white brutal-shadow' 
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="pt-6 border-t border-white/10">
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white w-full transition-all">
          <LogOut size={20} />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </aside>
  );
};

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-[32px] brutal-border brutal-shadow"
      >
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tighter text-secondary">
            {isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            {isLogin ? 'Acesse sua conta para continuar' : 'Comece sua jornada no CONECTA'}
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Nome Completo</label>
                <input type="text" required className="w-full p-4 rounded-xl brutal-border focus:border-primary outline-none transition-all" />
              </div>
            )}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">E-mail</label>
              <input type="email" required className="w-full p-4 rounded-xl brutal-border focus:border-primary outline-none transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Senha</label>
              <input type="password" required className="w-full p-4 rounded-xl brutal-border focus:border-primary outline-none transition-all" />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full">
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </button>

          <div className="text-center">
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-semibold text-primary hover:underline"
            >
              {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Entre'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-secondary text-white py-16">
    <div className="container-custom grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-1">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <TrendingUp className="text-black" size={20} />
          </div>
          <span className="font-extrabold text-2xl tracking-tighter">CONECTA</span>
        </div>
        <p className="text-white/60 text-sm leading-relaxed">
          Transformando o mercado de trabalho local através da tecnologia e conexão humana.
        </p>
      </div>
      
      <div>
        <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-primary">Plataforma</h4>
        <ul className="space-y-4 text-sm text-white/70">
          <li><Link to="/vagas">Buscar Vagas</Link></li>
          <li><Link to="/profissionais">Cadastrar Currículo</Link></li>
          <li><Link to="/empresas">Anunciar Vaga</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-primary">Suporte</h4>
        <ul className="space-y-4 text-sm text-white/70">
          <li>Central de Ajuda</li>
          <li>Termos de Uso</li>
          <li>Privacidade</li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-primary">Contato</h4>
        <p className="text-sm text-white/70 mb-4">Prefeitura Municipal de Lagoa do Barro do Piauí</p>
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors cursor-pointer">
            <MessageCircle size={16} />
          </div>
        </div>
      </div>
    </div>
    <div className="container-custom mt-16 pt-8 border-t border-white/10 flex flex-col md:row justify-between items-center gap-4">
      <p className="text-xs text-white/40">© 2024 CONECTA. Todos os direitos reservados.</p>
      <div className="flex gap-6 text-xs text-white/40">
        <span>Desenvolvido por Gestor86</span>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const LandingPage = ({ city }: { city: CityConfig }) => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center pt-20 pb-32">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold mb-6 border border-primary/20">
              Oportunidades em {city.name} - {city.state}
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.9] mb-8 text-secondary">
              Conectando <span className="text-primary">talentos</span> e oportunidades.
            </h1>
            <p className="text-xl text-zinc-500 mb-10 max-w-lg leading-relaxed">
              Banco de currículos para empresas e profissionais da cidade. Cadastre-se, encontre oportunidades e faça parte do desenvolvimento local!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/profissionais" className="btn-secondary">
                Sou Profissional <ArrowRight size={18} />
              </Link>
              <Link to="/empresas" className="btn-outline">
                Sou Empresa
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-[40px] overflow-hidden brutal-border brutal-shadow rotate-3">
              <img src={city.heroImage} alt="Cidade" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl brutal-border brutal-shadow -rotate-3 max-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Ao vivo</span>
              </div>
              <p className="text-sm font-bold text-secondary">15 novas vagas publicadas hoje</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-24 bg-zinc-50">
        <div className="container-custom">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 text-secondary">Soluções para todos</h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">Ferramentas específicas para cada perfil, facilitando a integração do mercado local.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Para Profissionais",
                desc: "Cadastre seu currículo, mantenha suas informações atualizadas e seja encontrado pelas empresas da cidade.",
                icon: User,
                color: "bg-primary/10 text-primary"
              },
              {
                title: "Para Empresas",
                desc: "Acesse currículos, filtre candidatos por área, formação ou CBO e encontre o talento ideal para sua vaga.",
                icon: Building2,
                color: "bg-secondary text-white"
              },
              {
                title: "Gestão Pública",
                desc: "Ferramenta oficial para fomentar o emprego e facilitar a conexão entre empresas e cidadãos.",
                icon: Landmark,
                color: "bg-primary/10 text-primary"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 rounded-3xl bg-white border border-zinc-100 shadow-sm hover:shadow-xl transition-all flex flex-col items-start"
              >
                <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-8`}>
                  <item.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-secondary">{item.title}</h3>
                <p className="text-zinc-500 leading-relaxed mb-8">{item.desc}</p>
                <button className="mt-auto text-primary font-bold flex items-center gap-2 group">
                  Saiba mais <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission/Vision Section */}
      <section className="py-24 bg-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tighter mb-12">Objetivo do Sistema</h2>
            <div className="space-y-12">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
                    <Target size={20} />
                  </div>
                  <h3 className="text-xl font-bold">Missão</h3>
                </div>
                <p className="text-secondary/70 leading-relaxed">
                  O CONECTA tem como missão principal fomentar o desenvolvimento econômico e social através da conexão direta entre profissionais qualificados e empresas locais, facilitando o processo de contratação e promovendo o crescimento sustentável da comunidade.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
                    <Lightbulb size={20} />
                  </div>
                  <h3 className="text-xl font-bold">Visão</h3>
                </div>
                <p className="text-secondary/70 leading-relaxed">
                  Ser a principal ferramenta de integração entre o mercado de trabalho local e os profissionais da região, contribuindo para a redução do desemprego e o fortalecimento da economia municipal.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary/10 p-12 rounded-3xl border border-primary/20">
            <h3 className="text-2xl font-bold mb-8">Nossos Valores</h3>
            <ul className="space-y-6">
              {[
                "Transparência e confiabilidade nas informações",
                "Inclusão e acessibilidade para todos os cidadãos",
                "Desenvolvimento sustentável da comunidade",
                "Inovação tecnológica a serviço da população"
              ].map((val, i) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="text-primary mt-1 shrink-0" size={20} />
                  <span className="font-medium">{val}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container-custom">
          <div className="bg-secondary rounded-[40px] p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-[100px]" />
              <div className="absolute bottom-10 right-10 w-64 h-64 bg-primary rounded-full blur-[100px]" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-8 relative z-10">
              Tudo o que você precisa <br /> em um só lugar
            </h2>
            
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4 relative z-10">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                className="flex-1 bg-white px-6 py-4 rounded-xl font-medium focus:outline-none"
              />
              <button className="bg-primary text-black px-8 py-4 rounded-xl font-bold brutal-shadow-hover transition-all">
                Começar agora
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProfessionalModule = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    escolaridade: '',
    cbo: '',
    experiencia: '',
    habilidades: ''
  });

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('CURRÍCULO PROFISSIONAL', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Nome: ${formData.nome}`, 20, 40);
    doc.text(`CPF: ${formData.cpf}`, 20, 50);
    doc.text(`E-mail: ${formData.email}`, 20, 60);
    doc.text(`Telefone: ${formData.telefone}`, 20, 70);
    doc.text(`Escolaridade: ${formData.escolaridade}`, 20, 80);
    doc.text(`Profissão (CBO): ${formData.cbo}`, 20, 90);
    doc.text('Experiência:', 20, 110);
    doc.text(formData.experiencia, 20, 120, { maxWidth: 170 });
    doc.text('Habilidades:', 20, 150);
    doc.text(formData.habilidades, 20, 160, { maxWidth: 170 });
    doc.save(`curriculo_${formData.nome.replace(/\s/g, '_')}.pdf`);
  };

  return (
    <div className="py-20 min-h-screen bg-zinc-50">
      <div className="container-custom max-w-2xl">
        <div className="bg-white p-10 rounded-[40px] brutal-border brutal-shadow">
          <h2 className="text-3xl font-extrabold tracking-tighter mb-8 text-secondary">Cadastro de Profissional</h2>
          
          <div className="flex gap-2 mb-10">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-2 flex-1 rounded-full ${step >= s ? 'bg-primary' : 'bg-zinc-100'}`} />
            ))}
          </div>

          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h3 className="text-xl font-bold mb-4 text-secondary">Dados Pessoais</h3>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Nome Completo</label>
                <input 
                  type="text" 
                  className="w-full p-4 rounded-xl brutal-border focus:border-primary outline-none transition-all"
                  value={formData.nome}
                  onChange={e => setFormData({...formData, nome: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">CPF</label>
                  <input 
                    type="text" 
                    className="w-full p-4 rounded-xl brutal-border focus:border-primary outline-none transition-all"
                    value={formData.cpf}
                    onChange={e => setFormData({...formData, cpf: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Telefone</label>
                  <input 
                    type="text" 
                    className="w-full p-4 rounded-xl brutal-border focus:border-primary outline-none transition-all"
                    value={formData.telefone}
                    onChange={e => setFormData({...formData, telefone: e.target.value})}
                  />
                </div>
              </div>
              <button onClick={() => setStep(2)} className="btn-secondary w-full">Próximo Passo</button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h3 className="text-xl font-bold mb-4 text-secondary">Formação e Cargo</h3>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Escolaridade</label>
                <select 
                  className="w-full p-4 rounded-xl brutal-border focus:border-primary outline-none transition-all"
                  value={formData.escolaridade}
                  onChange={e => setFormData({...formData, escolaridade: e.target.value})}
                >
                  <option value="">Selecione...</option>
                  <option>Ensino Fundamental</option>
                  <option>Ensino Médio</option>
                  <option>Ensino Superior</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Profissão (CBO)</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Ex: Pedreiro, Vendedor..."
                    className="w-full p-4 pl-12 rounded-xl brutal-border focus:border-primary outline-none transition-all"
                    value={formData.cbo}
                    onChange={e => setFormData({...formData, cbo: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 btn-outline">Voltar</button>
                <button onClick={() => setStep(3)} className="flex-1 btn-secondary">Próximo Passo</button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h3 className="text-xl font-bold mb-4 text-secondary">Experiência</h3>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Resumo de Experiências</label>
                <textarea 
                  rows={4}
                  className="w-full p-4 rounded-xl brutal-border focus:border-primary outline-none transition-all"
                  value={formData.experiencia}
                  onChange={e => setFormData({...formData, experiencia: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Habilidades</label>
                <input 
                  type="text" 
                  placeholder="Ex: Excel, Atendimento, CNH B..."
                  className="w-full p-4 rounded-xl brutal-border focus:border-primary outline-none transition-all"
                  value={formData.habilidades}
                  onChange={e => setFormData({...formData, habilidades: e.target.value})}
                />
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(2)} className="flex-1 btn-outline">Voltar</button>
                <button onClick={generatePDF} className="flex-1 btn-primary">
                  <Download size={18} /> Gerar PDF
                </button>
              </div>
              <button className="btn-secondary w-full mt-4">Finalizar Cadastro</button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const CompanyModule = () => {
  return (
    <div className="py-20 min-h-screen bg-zinc-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tighter text-secondary">Banco de Talentos</h2>
            <p className="text-zinc-500">Encontre o profissional ideal para sua empresa.</p>
          </div>
          <button className="btn-secondary">
            <Briefcase size={18} /> Publicar Nova Vaga
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-3xl brutal-border brutal-shadow">
              <h3 className="font-bold flex items-center gap-2 mb-6 text-secondary">
                <Filter size={18} /> Filtros Avançados
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">CBO / Profissão</label>
                  <input type="text" placeholder="Buscar cargo..." className="w-full p-3 rounded-xl brutal-border text-sm focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Escolaridade</label>
                  <select className="w-full p-3 rounded-xl brutal-border text-sm focus:border-primary outline-none">
                    <option>Qualquer</option>
                    <option>Ensino Médio</option>
                    <option>Ensino Superior</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Bairro</label>
                  <input type="text" placeholder="Ex: Centro..." className="w-full p-3 rounded-xl brutal-border text-sm focus:border-primary outline-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Candidates List */}
          <div className="lg:col-span-3 space-y-6">
            {MOCK_CANDIDATES.map(candidate => (
              <motion.div 
                key={candidate.id}
                whileHover={{ x: 10 }}
                className="bg-white p-8 rounded-[32px] brutal-border brutal-shadow transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div className="flex gap-6 items-start">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-bold text-2xl brutal-border">
                    {candidate.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1 text-secondary">{candidate.name}</h4>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 bg-secondary text-white text-[10px] font-bold uppercase tracking-widest rounded-full">CBO: {candidate.cbo}</span>
                      <span className="px-3 py-1 bg-zinc-100 text-zinc-500 text-[10px] font-bold uppercase tracking-widest rounded-full">{candidate.education}</span>
                    </div>
                    <p className="text-sm text-zinc-400 line-clamp-1">{candidate.experience[0]}</p>
                  </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <button className="flex-1 md:flex-none btn-outline !p-3">
                    <Star size={20} />
                  </button>
                  <button className="flex-1 md:flex-none btn-secondary !py-3 !px-6">
                    Ver Perfil
                  </button>
                  <button className="flex-1 md:flex-none bg-[#25D366] text-white p-3 rounded-xl hover:opacity-90 transition-all brutal-border brutal-shadow">
                    <MessageCircle size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminModule = () => {
  const data = [
    { name: 'Jan', currículos: 400, vagas: 240 },
    { name: 'Fev', currículos: 300, vagas: 139 },
    { name: 'Mar', currículos: 200, vagas: 980 },
    { name: 'Abr', currículos: 278, vagas: 390 },
    { name: 'Mai', currículos: 189, vagas: 480 },
  ];

  const pieData = [
    { name: 'Serviços', value: 400 },
    { name: 'Comércio', value: 300 },
    { name: 'Construção', value: 300 },
    { name: 'Agronegócio', value: 200 },
  ];

  const COLORS = ['#15803d', '#18181b', '#71717a', '#d4d4d8'];

  return (
    <div className="p-8 lg:p-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tighter text-secondary">Painel de Gestão Pública</h2>
          <p className="text-zinc-500">Indicadores de empregabilidade em tempo real.</p>
        </div>
        <div className="flex gap-4">
          <button className="btn-outline !py-2 !px-4 flex items-center gap-2 text-sm">
            <Download size={16} /> Relatório
          </button>
          <button className="btn-primary !py-2 !px-4 flex items-center gap-2 text-sm">
            <Bell size={16} /> Notificar
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        {[
          { label: "Total de Currículos", value: "1.248", icon: Users, color: "text-primary bg-primary/10" },
          { label: "Vagas Abertas", value: "84", icon: Briefcase, color: "text-blue-600 bg-blue-50" },
          { label: "Contratações/Mês", value: "52", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50" },
          { label: "Empresas Ativas", value: "112", icon: Building2, color: "text-purple-600 bg-purple-50" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl brutal-border brutal-shadow">
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon size={20} />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">{stat.label}</h4>
            <p className="text-2xl font-extrabold tracking-tighter text-secondary">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl brutal-border brutal-shadow">
          <h3 className="text-lg font-bold mb-8 text-secondary">Crescimento da Base</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#a1a1aa', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#a1a1aa', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  cursor={{fill: '#f8fafc'}} 
                />
                <Bar dataKey="currículos" fill="#15803d" radius={[4, 4, 0, 0]} />
                <Bar dataKey="vagas" fill="#18181b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl brutal-border brutal-shadow">
          <h3 className="text-lg font-bold mb-8 text-secondary">Vagas por Setor</h3>
          <div className="h-[300px] flex flex-col md:flex-row items-center">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4 mt-8 md:mt-0 md:ml-8">
              {pieData.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i]}} />
                  <span className="font-semibold text-zinc-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

const AppContent = () => {
  const [city, setCity] = useState<CityConfig>(CITIES['lagoa-do-barro']);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/gestao');

  if (isAdminRoute) {
    return (
      <div className="flex min-h-screen bg-zinc-50">
        <Sidebar />
        <main className="flex-1">
          <Routes>
            <Route path="/gestao" element={<AdminModule />} />
            <Route path="/gestao/*" element={<AdminModule />} />
          </Routes>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar city={city} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage city={city} />} />
          <Route path="/profissionais" element={<ProfessionalModule />} />
          <Route path="/empresas" element={<CompanyModule />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/vagas" element={
            <div className="py-20 container-custom">
              <h2 className="text-4xl font-extrabold tracking-tighter mb-12 text-secondary">Vagas Disponíveis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {MOCK_JOBS.map(job => (
                  <div key={job.id} className="bg-white p-8 rounded-[32px] border border-zinc-100 shadow-sm hover:shadow-xl transition-all">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-1 text-secondary">{job.title}</h3>
                        <p className="text-primary font-bold">{job.company}</p>
                      </div>
                      <span className="px-3 py-1 bg-zinc-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-zinc-500">{job.type}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-zinc-400 mb-8">
                      <div className="flex items-center gap-1"><MapPin size={14} /> {job.location}</div>
                      <div className="flex items-center gap-1"><Briefcase size={14} /> CBO: {job.cbo}</div>
                    </div>
                    <button className="btn-secondary w-full">Candidatar-se</button>
                  </div>
                ))}
              </div>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
