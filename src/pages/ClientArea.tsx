import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, Mail, ArrowLeft, Eye, EyeOff, 
  LayoutDashboard, FolderKanban, Calendar, 
  FileText, Settings, LogOut, Plus, 
  Search, Bell, ChevronDown, MoreVertical,
  TrendingUp, Users, Clock, CheckCircle2,
  Filter, Grid, List, MessageSquare,
  BarChart3, Target, Zap, Timer, User
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

const Logo = ({ className = "w-12 h-12" }: { className?: string }) => {
  return (
    <div className={`${className} flex items-center justify-center overflow-hidden`}>
      <img 
        src="/img/logo/logo_maesttro_roxo.png" 
        alt="Maesttro Logo" 
        className="w-full h-full object-contain"
        referrerPolicy="no-referrer"
        fetchPriority="high"
        decoding="async"
      />
    </div>
  );
};

// --- Mock Data ---
const PROJECTS = [
  { 
    id: 1, 
    name: 'Otimização Checkout Vtex', 
    status: 'Em andamento', 
    progress: 65, 
    priority: 'Alta', 
    color: 'bg-brand-500',
    description: 'Revisão completa do fluxo de checkout para redução de abandono de carrinho e melhoria na taxa de conversão mobile.',
    team: ['Pedro S.', 'Ana M.', 'Carlos T.'],
    deadline: '25 Abr 2026',
    client: 'E-commerce Fashion Pro'
  },
  { 
    id: 2, 
    name: 'Migração Shopify Plus', 
    status: 'Planejamento', 
    progress: 20, 
    priority: 'Média', 
    color: 'bg-blue-500',
    description: 'Migração de plataforma legada para Shopify Plus, incluindo integração de ERP e novo layout responsivo.',
    team: ['Pedro S.', 'Marina L.'],
    deadline: '15 Jun 2026',
    client: 'Tech Store Brasil'
  },
  { 
    id: 3, 
    name: 'Estratégia Black Friday', 
    status: 'Concluído', 
    progress: 100, 
    priority: 'Crítica', 
    color: 'bg-emerald-500',
    description: 'Planejamento estratégico de mídia e infraestrutura para o maior evento de vendas do ano.',
    team: ['Pedro S.', 'Equipe Marketing'],
    deadline: '30 Nov 2025',
    client: 'Global Sports'
  },
];

const INITIAL_KANBAN_TASKS: Record<number, { todo: any[], doing: any[], done: any[] }> = {
  1: {
    todo: [
      { id: 't1', title: 'Análise de Funil de Conversão', priority: 'Alta', tag: 'Dados', deadline: '15 Mar', createdAt: '01 Mar', createdBy: 'Pedro Saggioro', description: 'Identificar pontos de abandono no checkout mobile e desktop.' },
      { id: 't2', title: 'Configuração GA4 Advanced', priority: 'Média', tag: 'Tech', deadline: '18 Mar', createdAt: '02 Mar', createdBy: 'Pedro Saggioro', description: 'Implementar eventos customizados de scroll e cliques em CTAs.' },
      { id: 't6', title: 'Revisão de Tags GTM', priority: 'Baixa', tag: 'Dados', deadline: '20 Mar', createdAt: '03 Mar', createdBy: 'Pedro Saggioro', description: 'Limpeza de tags obsoletas e verificação de triggers.' },
    ],
    doing: [
      { id: 't3', title: 'Ajuste de UX Home Page', priority: 'Alta', tag: 'Design', deadline: '12 Mar', createdAt: '01 Mar', createdBy: 'Pedro Saggioro', description: 'Melhorar a visibilidade do botão principal de compra.' },
      { id: 't4', title: 'Otimização de Carregamento', priority: 'Alta', tag: 'Performance', deadline: '10 Mar', createdAt: '02 Mar', createdBy: 'Pedro Saggioro', description: 'Reduzir LCP para menos de 2.5s em conexões 4G.' },
    ],
    done: [
      { id: 't5', title: 'Briefing de Campanha Q1', priority: 'Baixa', tag: 'Marketing', deadline: '05 Mar', createdAt: '01 Mar', createdBy: 'Pedro Saggioro', description: 'Definição de canais e orçamento para o primeiro trimestre.' },
    ]
  },
  2: {
    todo: [
      { id: 't7', title: 'Mapeamento de APIs ERP', priority: 'Alta', tag: 'Tech', deadline: '20 Jun', createdAt: '01 Jun', createdBy: 'Pedro Saggioro', description: 'Documentar endpoints necessários para integração com Shopify.' },
    ],
    doing: [
      { id: 't8', title: 'Mockup Novo Layout', priority: 'Média', tag: 'Design', deadline: '10 Jun', createdAt: '02 Jun', createdBy: 'Pedro Saggioro', description: 'Criar wireframes da nova home e páginas de produto.' },
    ],
    done: []
  },
  3: {
    todo: [],
    doing: [],
    done: [
      { id: 't9', title: 'Planejamento de Mídia Black Friday', priority: 'Crítica', tag: 'Marketing', deadline: '30 Nov', createdAt: '01 Out', createdBy: 'Pedro Saggioro', description: 'Definição de canais e orçamento para o evento.' },
    ]
  }
};

const CHAT_MESSAGES = [
  { id: 1, user: 'Pedro S.', role: 'Maestro', text: 'Olá! Acabei de subir a análise do funil. Os dados de abandono no checkout estão bem claros agora.', time: '09:30' },
  { id: 2, user: 'Cliente', role: 'Proprietário', text: 'Excelente, Pedro. Vou revisar com meu time técnico hoje à tarde.', time: '10:15' },
  { id: 3, user: 'Pedro S.', role: 'Maestro', text: 'Perfeito. Já priorizei os ajustes de UX na coluna de execução.', time: '10:20' },
];

const METRICS = [
  { label: 'ROI Médio', value: '8.4x', change: '+12%', icon: TrendingUp, color: 'text-emerald-500' },
  { label: 'Taxa de Conversão', value: '3.2%', change: '+0.5%', icon: Target, color: 'text-brand-500' },
  { label: 'Ticket Médio', value: 'R$ 452', change: '+R$ 24', icon: BarChart3, color: 'text-blue-500' },
  { label: 'Eficiência Operacional', value: '94%', change: '+5%', icon: Zap, color: 'text-amber-500' },
];

// --- Sub-components ---

const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      active 
        ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20' 
        : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-brand-600 dark:hover:text-brand-400'
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium text-sm">{label}</span>
  </button>
);

// Workaround for Droppable in StrictMode
const StrictModeDroppable = ({ children, ...props }: any) => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  if (!enabled) {
    return null;
  }
  return <Droppable {...props}>{children}</Droppable>;
};

const KanbanCard = ({ task, onClick }: any) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    onClick={onClick}
    className="bg-white dark:bg-zinc-800 p-4 rounded-xl border border-zinc-100 dark:border-zinc-700 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing mb-3 group/card"
  >
    <div className="flex justify-between items-start mb-3">
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
        task.priority === 'Alta' || task.priority === 'Crítica' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
        task.priority === 'Média' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
        'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
      }`}>
        {task.priority}
      </span>
      <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 opacity-0 group-hover/card:opacity-100 transition-opacity">
        <MoreVertical className="w-4 h-4" />
      </button>
    </div>
    <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 mb-3 leading-tight">{task.title}</h4>
    {task.description && (
      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-3 leading-relaxed">
        {task.description}
      </p>
    )}
    <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-50 dark:border-zinc-700/50">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">{task.tag}</span>
        <div className="flex items-center gap-1 text-[9px] text-zinc-400">
          <User className="w-2.5 h-2.5" />
          {task.createdBy}
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 text-right">
        <div className="flex items-center gap-1 text-[10px] text-zinc-400">
          <Clock className="w-3 h-3" />
          <span className="font-bold">Prazo:</span> {task.deadline}
        </div>
        <div className="text-[8px] text-zinc-500">Criado em: {task.createdAt}</div>
      </div>
    </div>
  </motion.div>
);

const TaskModal = ({ isOpen, onClose, onSave, onDelete, task }: any) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Média',
    tag: 'Geral',
    deadline: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
    createdAt: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
    createdBy: 'Pedro Saggioro'
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'Média',
        tag: task.tag || 'Geral',
        deadline: task.deadline || '',
        createdAt: task.createdAt || '',
        createdBy: task.createdBy || 'Pedro Saggioro'
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'Média',
        tag: 'Geral',
        deadline: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
        createdAt: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
        createdBy: 'Pedro Saggioro'
      });
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800"
      >
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
          <h3 className="text-xl font-bold dark:text-white">
            {task ? 'Editar Atividade' : 'Nova Atividade'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
            <LogOut className="w-5 h-5 text-zinc-400 rotate-180" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-700/50 mb-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-zinc-400" />
              <div>
                <p className="text-[8px] text-zinc-500 uppercase font-bold tracking-wider">Criado por</p>
                <p className="text-xs font-bold dark:text-white">{formData.createdBy}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[8px] text-zinc-500 uppercase font-bold tracking-wider">Data de Criação</p>
              <p className="text-xs font-bold dark:text-white">{formData.createdAt}</p>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Título</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Nome da tarefa..."
              className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Descrição</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detalhes da atividade..."
              className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:text-white resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Prioridade</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:text-white"
              >
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
                <option value="Crítica">Crítica</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Tag</label>
              <input
                type="text"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                placeholder="Ex: Tech, Dados..."
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Prazo de Entrega</label>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                placeholder="Ex: 25 Mar"
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 flex justify-between items-center">
          {task ? (
            <button
              onClick={() => onDelete(task.id)}
              className="text-red-500 text-sm font-bold hover:underline"
            >
              Excluir Tarefa
            </button>
          ) : <div />}
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-bold text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            >
              Cancelar
            </button>
            <button
              onClick={() => onSave(formData)}
              className="px-8 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-bold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-600/20"
            >
              Salvar
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const KanbanSkeleton = () => (
  <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl border border-zinc-100 dark:border-zinc-700 shadow-sm mb-3 animate-pulse">
    <div className="flex justify-between items-start mb-3">
      <div className="w-16 h-4 bg-zinc-100 dark:bg-zinc-700 rounded-full" />
      <div className="w-4 h-4 bg-zinc-100 dark:bg-zinc-700 rounded" />
    </div>
    <div className="w-3/4 h-4 bg-zinc-100 dark:bg-zinc-700 rounded mb-3" />
    <div className="w-full h-3 bg-zinc-50 dark:bg-zinc-700/50 rounded mb-1" />
    <div className="w-2/3 h-3 bg-zinc-50 dark:bg-zinc-700/50 rounded mb-3" />
    <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-50 dark:border-zinc-700/50">
      <div className="flex flex-col gap-1">
        <div className="w-10 h-2 bg-zinc-100 dark:bg-zinc-700 rounded" />
        <div className="w-16 h-2 bg-zinc-100 dark:bg-zinc-700 rounded" />
      </div>
      <div className="flex flex-col items-end gap-1">
        <div className="w-14 h-3 bg-zinc-100 dark:bg-zinc-700 rounded" />
        <div className="w-10 h-2 bg-zinc-100 dark:bg-zinc-700 rounded" />
      </div>
    </div>
  </div>
);

const DashboardOverview = ({ onSelectProject }: { onSelectProject: (project: any) => void }) => {
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [priorityFilter, setPriorityFilter] = useState('Todos');

  const filteredProjects = PROJECTS.filter(p => {
    const statusMatch = statusFilter === 'Todos' || p.status === statusFilter;
    const priorityMatch = priorityFilter === 'Todos' || p.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  return (
    <div className="space-y-8">
      {/* Filters & Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h3 className="font-bold text-2xl dark:text-white tracking-tight">Projetos Ativos</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Visão geral da orquestração do seu e-commerce.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 bg-white dark:bg-zinc-900 p-2 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-2 px-3 border-r border-zinc-100 dark:border-zinc-800">
            <Filter className="w-4 h-4 text-zinc-400" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs font-bold bg-transparent focus:outline-none dark:text-white cursor-pointer"
            >
              <option value="Todos">Todos os Status</option>
              <option value="Planejamento">Planejamento</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Concluído">Concluído</option>
            </select>
          </div>

          <div className="flex items-center gap-2 px-3">
            <Target className="w-4 h-4 text-zinc-400" />
            <select 
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="text-xs font-bold bg-transparent focus:outline-none dark:text-white cursor-pointer"
            >
              <option value="Todos">Todas as Prioridades</option>
              <option value="Alta">Alta</option>
              <option value="Média">Média</option>
              <option value="Baixa">Baixa</option>
              <option value="Crítica">Crítica</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((p) => (
            <motion.div 
              key={p.id} 
              layoutId={`project-${p.id}`}
              onClick={() => onSelectProject(p)}
              whileHover={{ y: -4, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
              className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 p-6 shadow-sm cursor-pointer transition-all group relative overflow-hidden"
            >
              {/* Decorative background element */}
              <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full opacity-[0.03] dark:opacity-[0.05] transition-transform group-hover:scale-150 duration-700 ${p.color}`} />

              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className={`w-14 h-14 rounded-2xl ${p.color} flex items-center justify-center text-white shadow-lg shadow-current/20`}>
                  <FolderKanban className="w-7 h-7" />
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-2 ${
                    p.priority === 'Alta' || p.priority === 'Crítica' ? 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                    p.priority === 'Média' ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                    'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                  }`}>
                    {p.priority}
                  </span>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{p.status}</span>
                </div>
              </div>

              <div className="mb-6 relative z-10">
                <h4 className="font-bold text-xl text-zinc-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{p.name}</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="space-y-4 relative z-10">
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-2 uppercase tracking-wider text-zinc-400">
                    <span>Progresso da Etapa</span>
                    <span className="text-zinc-900 dark:text-white">{p.progress}%</span>
                  </div>
                  <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${p.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full rounded-full ${p.color}`} 
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-50 dark:border-zinc-800">
                  <div className="flex -space-x-3">
                    {p.team.map((member, i) => (
                      <div 
                        key={i} 
                        className="w-10 h-10 rounded-full border-4 border-white dark:border-zinc-900 bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative group/avatar"
                        title={member}
                      >
                        <img 
                          src={`https://picsum.photos/seed/${member}/100/100`} 
                          alt={member}
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-4 border-white dark:border-zinc-900 bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-[10px] font-bold text-brand-600 dark:text-brand-400">
                      +2
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{p.deadline}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full p-20 text-center bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800">
            <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-zinc-300 dark:text-zinc-600" />
            </div>
            <h4 className="font-bold text-xl dark:text-white mb-2">Nenhum projeto encontrado</h4>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">Tente ajustar os filtros de status ou prioridade para encontrar o que procura.</p>
            <button 
              onClick={() => { setStatusFilter('Todos'); setPriorityFilter('Todos'); }}
              className="mt-6 px-6 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
            >
              Limpar todos os filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const KanbanBoard = ({ projectId }: { projectId: number }) => {
  const [tasks, setTasks] = useState(INITIAL_KANBAN_TASKS[projectId] || { todo: [], doing: [], done: [] });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTasks(INITIAL_KANBAN_TASKS[projectId] || { todo: [], doing: [], done: [] });
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [projectId]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceCol = source.droppableId as 'todo' | 'doing' | 'done';
    const destCol = destination.droppableId as 'todo' | 'doing' | 'done';

    const sourceItems = Array.from(tasks[sourceCol]);
    const [removed] = sourceItems.splice(source.index, 1);

    if (sourceCol === destCol) {
      sourceItems.splice(destination.index, 0, removed);
      setTasks({
        ...tasks,
        [sourceCol]: sourceItems
      });
    } else {
      const destItems = Array.from(tasks[destCol]);
      destItems.splice(destination.index, 0, removed);
      setTasks({
        ...tasks,
        [sourceCol]: sourceItems,
        [destCol]: destItems
      });
    }
  };

  const moveTask = (taskId: string, from: 'todo' | 'doing' | 'done', to: 'todo' | 'doing' | 'done') => {
    const taskIndex = tasks[from].findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

    const task = tasks[from][taskIndex];
    const newFrom = tasks[from].filter(t => t.id !== taskId);
    const newTo = [...tasks[to], task];

    setTasks({
      ...tasks,
      [from]: newFrom,
      [to]: newTo
    });
  };

  const handleSaveTask = (formData: any) => {
    if (editingTask) {
      // Update existing task
      const newTasks = { ...tasks };
      (['todo', 'doing', 'done'] as const).forEach((col) => {
        newTasks[col] = newTasks[col].map((t) => 
          t.id === editingTask.id ? { ...t, ...formData } : t
        );
      });
      setTasks(newTasks);
    } else {
      // Create new task
      const newTask = {
        id: `t-${Date.now()}`,
        ...formData
      };
      setTasks({
        ...tasks,
        todo: [newTask, ...tasks.todo]
      });
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    const newTasks = { ...tasks };
    (['todo', 'doing', 'done'] as const).forEach((col) => {
      newTasks[col] = newTasks[col].filter((t) => t.id !== taskId);
    });
    setTasks(newTasks);
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const openEditModal = (task: any) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const columns: { id: 'todo' | 'doing' | 'done'; title: string; color: string }[] = [
    { id: 'todo', title: 'A fazer', color: 'bg-zinc-400' },
    { id: 'doing', title: 'Em execução', color: 'bg-brand-500' },
    { id: 'done', title: 'Concluído', color: 'bg-emerald-500' }
  ];

  const filterTasks = (taskList: any[]) => {
    if (!searchQuery) return taskList;
    return taskList.filter(t => 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.priority.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-xl font-bold dark:text-white">Quadro de Atividades</h3>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none sm:min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar atividades..."
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
          <button 
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-xl text-sm font-bold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-600/20"
          >
            <Plus className="w-4 h-4" /> Nova Tarefa
          </button>
        </div>
      </div>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto pb-4">
          {columns.map((column) => (
            <div key={column.id} className="min-w-[300px] flex flex-col">
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${column.color}`} />
                  <h4 className="font-bold text-sm uppercase tracking-widest text-zinc-500">{column.title}</h4>
                  <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {filterTasks(tasks[column.id]).length}
                  </span>
                </div>
              </div>
              
              <StrictModeDroppable droppableId={column.id}>
                {(provided: any, snapshot: any) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`flex-1 p-2 rounded-2xl border border-dashed transition-colors ${
                      snapshot.isDraggingOver 
                        ? 'bg-brand-50/50 dark:bg-brand-900/10 border-brand-200 dark:border-brand-800' 
                        : 'bg-zinc-50/50 dark:bg-zinc-900/30 border-zinc-200 dark:border-zinc-800'
                    }`}
                  >
                    {isLoading ? (
                      <div className="space-y-3">
                        <KanbanSkeleton />
                        <KanbanSkeleton />
                        <KanbanSkeleton />
                      </div>
                    ) : (
                      filterTasks(tasks[column.id]).map((t, index) => (
                        /* @ts-ignore */
                        <Draggable key={t.id} draggableId={t.id} index={index}>
                          {(provided: any, snapshot: any) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`relative group ${snapshot.isDragging ? 'z-50' : ''}`}
                              style={{
                                ...provided.draggableProps.style,
                              }}
                            >
                              <KanbanCard task={t} onClick={() => openEditModal(t)} />
                              {column.id === 'todo' && (
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    moveTask(t.id, 'todo', 'doing');
                                  }}
                                  className="absolute top-2 right-10 p-1 bg-brand-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-bold z-10"
                                >
                                  INICIAR
                                </button>
                              )}
                              {column.id === 'doing' && (
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    moveTask(t.id, 'doing', 'done');
                                  }}
                                  className="absolute top-2 right-10 p-1 bg-emerald-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-bold z-10"
                                >
                                  CONCLUIR
                                </button>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                    {column.id === 'todo' && (
                      <button 
                        onClick={openCreateModal}
                        className="w-full py-3 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-400 hover:text-brand-600 hover:border-brand-600 transition-all text-sm font-medium flex items-center justify-center gap-2 mt-2"
                      >
                        <Plus className="w-4 h-4" /> Adicionar
                      </button>
                    )}
                  </div>
                )}
              </StrictModeDroppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      <TaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
        task={editingTask}
      />
    </div>
  );
};

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 5)); // Starting at March 2026
  const [selectedDate, setSelectedDate] = useState<number | null>(5);
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptySlots = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));

  const isToday = (day: number) => {
    const today = new Date(2026, 2, 5);
    return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
  };

  // Helper to get events for a specific day
  const getEventsForDay = (day: number) => {
    const events = [];
    
    // Project Deadlines
    PROJECTS.forEach(p => {
      const [d, mStr, y] = p.deadline.split(' ');
      const mIndex = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'].indexOf(mStr);
      if (parseInt(d) === day && mIndex === month && parseInt(y) === year) {
        events.push({ type: 'deadline', title: `Prazo: ${p.name}`, color: p.color, project: p.name });
      }
    });

    // Hardcoded important dates for demo
    if (month === 2 && year === 2026) {
      if (day === 12) events.push({ type: 'meeting', title: 'Reunião ROI', color: 'bg-brand-600' });
      if (day === 18) events.push({ type: 'launch', title: 'Lançamento Vtex', color: 'bg-blue-600' });
      if (day === 5) events.push({ type: 'checkup', title: 'Check-up Semanal', color: 'bg-emerald-600' });
    }

    return events;
  };

  const selectedDayEvents = selectedDate ? getEventsForDay(selectedDate) : [];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
      <div className="xl:col-span-3 space-y-6">
        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="p-8 flex justify-between items-center border-b border-zinc-50 dark:border-zinc-800">
            <div>
              <h3 className="text-2xl font-bold dark:text-white tracking-tight">{monthNames[month]}</h3>
              <p className="text-sm text-zinc-500 font-medium">{year}</p>
            </div>
            <div className="flex gap-3 bg-zinc-50 dark:bg-zinc-800 p-1.5 rounded-2xl">
              <button 
                onClick={prevMonth}
                className="p-2.5 hover:bg-white dark:hover:bg-zinc-700 rounded-xl transition-all text-zinc-600 dark:text-zinc-400 shadow-sm hover:shadow-md"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setCurrentDate(new Date(2026, 2, 5))}
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand-600 hover:bg-white dark:hover:bg-zinc-700 rounded-xl transition-all"
              >
                Hoje
              </button>
              <button 
                onClick={nextMonth}
                className="p-2.5 hover:bg-white dark:hover:bg-zinc-700 rounded-xl transition-all text-zinc-600 dark:text-zinc-400 shadow-sm hover:shadow-md"
              >
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-px bg-zinc-100 dark:bg-zinc-800">
            {weekDays.map(d => (
              <div key={d} className="bg-zinc-50 dark:bg-zinc-900 p-4 text-center text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                {d}
              </div>
            ))}
            {emptySlots.map(i => (
              <div key={`empty-${i}`} className="bg-white dark:bg-zinc-900 p-4 h-28 md:h-36 opacity-30" />
            ))}
            {days.map(d => {
              const events = getEventsForDay(d);
              const isSel = selectedDate === d;
              return (
                <div 
                  key={d} 
                  onClick={() => setSelectedDate(d)}
                  className={`bg-white dark:bg-zinc-900 p-3 h-28 md:h-36 relative transition-all cursor-pointer group border-2 ${
                    isSel ? 'border-brand-500 z-10' : 'border-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className={`text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full transition-colors ${
                      isToday(d) 
                        ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30' 
                        : isSel ? 'text-brand-600' : 'text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white'
                    }`}>
                      {d}
                    </span>
                    {events.length > 0 && (
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                    )}
                  </div>
                  
                  <div className="mt-2 space-y-1 overflow-hidden">
                    {events.slice(0, 2).map((ev, idx) => (
                      <div 
                        key={idx} 
                        className={`px-2 py-1 rounded-lg text-[9px] font-bold truncate border-l-2 ${ev.color.replace('bg-', 'border-')} ${ev.color.replace('bg-', 'bg-')}/10 ${ev.color.replace('bg-', 'text-')}`}
                      >
                        {ev.title}
                      </div>
                    ))}
                    {events.length > 2 && (
                      <div className="text-[8px] font-bold text-zinc-400 pl-1">
                        + {events.length - 2} mais
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 p-6 shadow-sm">
          <h4 className="font-bold text-lg dark:text-white mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-600" />
            {selectedDate ? `Eventos em ${selectedDate} de ${monthNames[month]}` : 'Selecione um dia'}
          </h4>
          
          <div className="space-y-4">
            {selectedDayEvents.length > 0 ? (
              selectedDayEvents.map((ev, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700 flex items-start gap-4 group"
                >
                  <div className={`w-10 h-10 rounded-xl ${ev.color} flex items-center justify-center text-white shadow-lg shadow-current/10 shrink-0`}>
                    {ev.type === 'deadline' ? <Clock className="w-5 h-5" /> : <Target className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900 dark:text-white leading-tight">{ev.title}</p>
                    <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-widest font-medium">
                      {ev.type === 'deadline' ? 'Prazo Final' : 'Evento Agendado'}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-12 text-center">
                <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Timer className="w-6 h-6 text-zinc-300" />
                </div>
                <p className="text-xs text-zinc-500 font-medium">Nenhum evento para este dia.</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-brand-900 rounded-3xl p-6 text-white overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-600 rounded-full -mr-16 -mt-16 opacity-20 blur-2xl group-hover:scale-150 transition-transform duration-700" />
          <h4 className="font-bold mb-2 relative z-10">Próximo Marco</h4>
          <p className="text-xs text-brand-200 mb-4 relative z-10">Otimização Checkout Vtex</p>
          <div className="flex items-center gap-2 relative z-10">
            <Clock className="w-4 h-4 text-brand-400" />
            <span className="text-sm font-bold">Em 18 dias</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectChat = () => {
  const [messages, setMessages] = useState(CHAT_MESSAGES);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const msg = {
      id: Date.now(),
      user: 'Cliente',
      role: 'Proprietário',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, msg]);
    setNewMessage('');
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm flex flex-col h-[600px]">
      <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
        <h3 className="font-bold dark:text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-brand-600" /> Chat do Projeto
        </h3>
        <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Online
        </span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(m => (
          <div key={m.id} className={`flex flex-col ${m.user === 'Cliente' ? 'items-end' : 'items-start'}`}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{m.user} • {m.role}</span>
            </div>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              m.user === 'Cliente' 
                ? 'bg-brand-600 text-white rounded-tr-none' 
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-tl-none'
            }`}>
              {m.text}
            </div>
            <span className="text-[10px] text-zinc-400 mt-1">{m.time}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="p-4 border-t border-zinc-100 dark:border-zinc-800 flex gap-2">
        <input 
          type="text" 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Digite sua mensagem..." 
          className="flex-1 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <button type="submit" className="p-2 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-colors">
          <Zap className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

const ProjectDetails = ({ project }: { project: any }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div className="lg:col-span-2 space-y-8">
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mb-2 inline-block ${
              project.priority === 'Alta' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
              project.priority === 'Crítica' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' :
              'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
            }`}>
              Prioridade {project.priority}
            </span>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">{project.name}</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">{project.client}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Prazo Final</p>
            <p className="text-sm font-bold text-zinc-900 dark:text-white">{project.deadline}</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-2 uppercase tracking-wider">Objetivo do Projeto</h4>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{project.description}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-3 uppercase tracking-wider">Equipe Alocada</h4>
            <div className="flex gap-3">
              {project.team.map((member: string, i: number) => (
                <div key={i} className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800 pl-1.5 pr-3 py-1.5 rounded-full border border-zinc-100 dark:border-zinc-700 group cursor-help" title={member}>
                  <div className="w-8 h-8 rounded-full bg-brand-600 overflow-hidden border-2 border-white dark:border-zinc-700">
                    <img 
                      src={`https://picsum.photos/seed/${member}/100/100`} 
                      alt={member}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">{member}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <KanbanBoard projectId={project.id} />
    </div>
    
    <div className="space-y-8">
      <ProjectChat />
      
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <h3 className="font-bold dark:text-white mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-brand-600" /> Documentos Úteis
        </h3>
        <div className="space-y-3">
          {['Escopo_Projeto.pdf', 'Analise_ROI_Q1.xlsx', 'Guia_UX_Checkout.pdf'].map((doc, i) => (
            <button key={i} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors border border-transparent hover:border-zinc-100 dark:hover:border-zinc-700">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-zinc-400" />
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{doc}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-zinc-400 -rotate-90" />
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const TimelineView = () => (
  <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm p-6">
    <h3 className="text-xl font-bold dark:text-white mb-8">Cronograma Estratégico</h3>
    <div className="space-y-12 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-100 dark:before:bg-zinc-800">
      {[
        { date: '10 Mar', title: 'Kickoff & Diagnóstico', desc: 'Alinhamento inicial e coleta de dados técnicos.', status: 'upcoming' },
        { date: '15 Mar', title: 'Análise de Funil', desc: 'Identificação de gargalos no checkout Vtex.', status: 'upcoming' },
        { date: '22 Mar', title: 'Implementação UX', desc: 'Ajustes na interface baseados no comportamento do usuário.', status: 'upcoming' },
        { date: '05 Abr', title: 'Validação de ROI', desc: 'Primeira rodada de análise de resultados pós-intervenção.', status: 'upcoming' },
      ].map((item, i) => (
        <div key={i} className="relative pl-12">
          <div className={`absolute left-0 top-1.5 w-8 h-8 rounded-full border-4 border-white dark:border-zinc-900 flex items-center justify-center z-10 ${
            item.status === 'done' ? 'bg-emerald-500' : 
            item.status === 'current' ? 'bg-brand-600 animate-pulse' : 
            'bg-zinc-200 dark:bg-zinc-700'
          }`}>
            {item.status === 'done' && <CheckCircle2 className="w-4 h-4 text-white" />}
          </div>
          <div>
            <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">{item.date}</span>
            <h4 className="font-bold text-zinc-900 dark:text-white mt-1">{item.title}</h4>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- Main Dashboard Component ---

const Dashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedProject, setSelectedProject] = useState(PROJECTS[0]);

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-700 overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-white dark:bg-zinc-900 border-r border-zinc-100 dark:border-zinc-800 flex flex-col z-30 relative"
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <div className="flex items-center gap-2">
              <Logo className="w-8 h-8" />
              <span className="font-outfit font-bold text-lg tracking-tight uppercase dark:text-white">
                Maes<span className="text-brand-600">tt</span>ro
              </span>
            </div>
          )}
          {!isSidebarOpen && <Logo className="w-8 h-8 mx-auto" />}
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <SidebarItem 
            icon={LayoutDashboard} 
            label={isSidebarOpen ? "Visão Geral" : ""} 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')} 
          />
          <SidebarItem 
            icon={FolderKanban} 
            label={isSidebarOpen ? "Projetos" : ""} 
            active={activeTab === 'projects'} 
            onClick={() => setActiveTab('projects')} 
          />
          <SidebarItem 
            icon={Calendar} 
            label={isSidebarOpen ? "Calendário" : ""} 
            active={activeTab === 'calendar'} 
            onClick={() => setActiveTab('calendar')} 
          />
          <SidebarItem 
            icon={Timer} 
            label={isSidebarOpen ? "Timeline" : ""} 
            active={activeTab === 'timeline'} 
            onClick={() => setActiveTab('timeline')} 
          />
          <SidebarItem 
            icon={FileText} 
            label={isSidebarOpen ? "Documentos" : ""} 
            active={activeTab === 'docs'} 
            onClick={() => setActiveTab('docs')} 
          />
        </nav>

        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
          <SidebarItem 
            icon={Settings} 
            label={isSidebarOpen ? "Configurações" : ""} 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
          />
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span className="font-medium text-sm">Sair</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 md:h-20 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between px-4 md:px-8 z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors text-zinc-500"
            >
              <Grid className="w-5 h-5" />
            </button>
            
            {/* Project Switcher */}
            <div className="relative group hidden lg:block">
              <button className="flex items-center gap-3 px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl hover:border-brand-500 transition-all">
                <div className={`w-2 h-2 rounded-full ${selectedProject.color}`} />
                <span className="text-sm font-bold text-zinc-900 dark:text-white">{selectedProject.name}</span>
                <ChevronDown className="w-4 h-4 text-zinc-400 group-hover:rotate-180 transition-transform" />
              </button>
              
              <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-2">
                {PROJECTS.map(p => (
                  <button 
                    key={p.id}
                    onClick={() => {
                      setSelectedProject(p);
                      setActiveTab('projects');
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-left"
                  >
                    <div className={`w-2 h-2 rounded-full ${p.color}`} />
                    <div>
                      <p className="text-xs font-bold text-zinc-900 dark:text-white leading-none">{p.name}</p>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">{p.status}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors text-zinc-500 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900" />
            </button>
            <div className="h-8 w-px bg-zinc-100 dark:bg-zinc-800 mx-2" />
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-zinc-900 dark:text-white leading-none">Pedro Saggioro</p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider">Maestro</p>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-sm">
                PS
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <DashboardOverview onSelectProject={(p) => {
                  setSelectedProject(p);
                  setActiveTab('projects');
                }} />
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full"
              >
                <ProjectDetails project={selectedProject} />
              </motion.div>
            )}

            {activeTab === 'calendar' && (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <CalendarView />
              </motion.div>
            )}

            {activeTab === 'timeline' && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <TimelineView />
              </motion.div>
            )}

            {(activeTab === 'docs' || activeTab === 'settings') && (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-12"
              >
                <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-6">
                  <Clock className="w-10 h-10 text-zinc-400" />
                </div>
                <h3 className="text-xl font-bold dark:text-white mb-2">Em Construção</h3>
                <p className="text-zinc-500 dark:text-zinc-400 max-w-md">Esta funcionalidade está sendo afinada pelo Maestro para garantir a melhor experiência estratégica.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

const ClientArea = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulating login with specific master account check
    setTimeout(() => {
      setIsLoading(false);
      
      // Master login check
      if (email.toLowerCase() === 'saggioropedro@gmail.com') {
        setIsLoggedIn(true);
      } else {
        setError('Acesso negado. Este e-mail não possui permissão de Maestro.');
      }
    }, 1200);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 font-outfit relative transition-colors duration-700 ease-in-out">
      <Link 
        to="/" 
        className="absolute top-4 left-4 sm:top-8 sm:left-8 flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium group text-sm sm:text-base z-10"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Voltar para o site
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md py-12 sm:py-0"
      >
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center mb-4 sm:mb-6">
            <Logo className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-900 dark:text-white tracking-tight">Área do Cliente</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm sm:text-base">Acesse a regência estratégica do seu negócio.</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl shadow-brand-900/5 border border-brand-100 dark:border-zinc-800 transition-colors duration-700 ease-in-out">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2" htmlFor="email">
                E-mail Corporativo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                  placeholder="exemplo@empresa.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2" htmlFor="password">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-12 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <a href="#" className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors">
                  Esqueceu a senha?
                </a>
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 text-xs font-medium text-center"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-brand-600 text-white rounded-2xl font-bold shadow-lg shadow-brand-600/20 hover:bg-brand-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Entrar na Área do Cliente"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Ainda não é cliente Maesttro? <br />
              <a href="/#contato" className="text-brand-600 dark:text-brand-400 font-bold hover:text-brand-700 dark:hover:text-brand-300 transition-colors">
                Agende um diagnóstico gratuito
              </a>
            </p>
          </div>
        </div>

        <p className="text-center text-zinc-400 dark:text-zinc-500 text-xs mt-8">
          © 2024 Maesttro - Regência Estratégica. <br />
          Acesso restrito a parceiros autorizados.
        </p>
      </motion.div>
    </div>
  );
};

export default ClientArea;
