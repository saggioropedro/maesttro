/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  MessageCircle, 
  TrendingUp, 
  Search, 
  Music, 
  Eye, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  BarChart3,
  Target,
  Zap,
  ShieldCheck,
  Activity,
  FileText,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const WHATSAPP_NUMBER = "5511999389334";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Gostaria de falar com o Maesttro sobre a performance do meu e-commerce.`;

// Components
const Button = ({ children, className = "", primary = false, onClick }: { children: React.ReactNode, className?: string, primary?: boolean, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
      primary 
      ? "bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-600/20" 
      : "bg-white text-zinc-900 border border-zinc-200 hover:border-zinc-400"
    } ${className}`}
  >
    {children}
  </button>
);

const SectionTitle = ({ children, subtitle, light = false }: { children: React.ReactNode, subtitle?: string, light?: boolean }) => (
  <div className="mb-12 text-center">
    {subtitle && <span className="text-brand-600 font-mono text-xs uppercase tracking-widest mb-2 block">{subtitle}</span>}
    <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${light ? 'text-white' : 'text-zinc-900'}`}>{children}</h2>
  </div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-200 py-4">
      <button 
        className="w-full flex justify-between items-center text-left py-2 focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-zinc-800 group-hover:text-brand-600 transition-colors">{question}</span>
        {isOpen ? <ChevronUp className="text-zinc-400" /> : <ChevronDown className="text-zinc-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="text-zinc-600 py-2 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const handleWhatsAppClick = () => {
    window.open(WHATSAPP_LINK, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-zinc-900 selection:bg-brand-100 selection:text-brand-900">
      {/* 1. HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-zinc-900 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-brand-400 w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight">MAEST<span className="text-brand-600">TRO</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
            <a href="#problema" className="hover:text-zinc-900 transition-colors">A Orquestra</a>
            <a href="#metodo" className="hover:text-zinc-900 transition-colors">O Método</a>
            <a href="#autoridade" className="hover:text-zinc-900 transition-colors">O Maestro</a>
          </nav>
          <Button className="text-sm py-2 px-4" onClick={handleWhatsAppClick}>
            Falar com o Maesttro
          </Button>
        </div>
      </header>

      <main className="pt-20">
        {/* 1. HERO SECTION */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(130,10,209,0.05)_0%,rgba(255,255,255,0)_100%)]" />
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest text-brand-700 uppercase bg-brand-50 rounded-full border border-brand-100">
                Regência Estratégica para E-commerce
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-900 tracking-tight mb-8 leading-[1.1]">
                Sua operação de e-commerce <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-zinc-900">
                  em perfeita harmonia.
                </span>
              </h1>
              <p className="text-xl text-zinc-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                Há mais de 10 anos identificando gargalos e orquestrando o crescimento de lojas virtuais através de dados e inteligência de negócios.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button primary className="w-full sm:w-auto text-lg py-4 px-8" onClick={handleWhatsAppClick}>
                  <MessageCircle className="w-5 h-5" />
                  Falar com o Maesttro via WhatsApp
                </Button>
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <ShieldCheck className="w-4 h-4 text-brand-600" />
                  Foco em Lucro e Eficiência (ROI)
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. SEÇÃO 'A ORQUESTRA ESTÁ DESAFINADA?' */}
        <section id="problema" className="py-24 bg-zinc-900 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <SectionTitle subtitle="Diagnóstico de Performance" light>A orquestra está desafinada?</SectionTitle>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Baixa Conversão (CRO)",
                  desc: "O tráfego chega, mas a performance de vendas não acompanha o investimento.",
                  icon: TrendingUp
                },
                {
                  title: "ROAS Negativo",
                  desc: "Suas campanhas de Ads consomem o lucro sem gerar o retorno esperado sobre o investimento.",
                  icon: Zap
                },
                {
                  title: "Abandono de Carrinho",
                  desc: "Fricções no checkout e falta de confiança fazem o cliente desistir no último compasso.",
                  icon: Target
                },
                {
                  title: "Falta de Clareza",
                  desc: "Dados espalhados e dashboards complexos que não traduzem a realidade do seu lucro.",
                  icon: Activity
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-2xl bg-zinc-800/50 border border-zinc-700 hover:border-brand-500/50 transition-all"
                >
                  <item.icon className="w-10 h-10 text-brand-500 mb-6" />
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-zinc-400 leading-relaxed text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. SEÇÃO 'VISÃO 360º' */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2 order-2 md:order-1">
                <span className="text-brand-600 font-mono text-xs uppercase tracking-widest mb-4 block">Intervenção Estratégica</span>
                <h2 className="text-4xl font-bold mb-6 tracking-tight">Visão 360º: Nós conhecemos cada engrenagem.</h2>
                <p className="text-lg text-zinc-600 mb-6 leading-relaxed">
                  O diagnóstico da Maesttro não é superficial. Da escolha da plataforma à otimização do checkout, minha análise é baseada na vivência técnica de quem sabe como cada instrumento deve ser tocado.
                </p>
                <p className="text-lg text-zinc-600 mb-8 leading-relaxed">
                  Analisamos profundamente todas as camadas do seu e-commerce: Plataforma, Conversão, Dados e Processos. Se você não tem quem execute, o Maestro aponta o caminho exato e valida cada etapa da execução para garantir a eficiência operacional.
                </p>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-brand-50 rounded-xl">
                    <ShieldCheck className="w-6 h-6 text-brand-600" />
                  </div>
                  <span className="font-medium text-zinc-900">Análise Técnica e Estratégica Completa</span>
                </div>
              </div>
              <div className="w-full md:w-1/2 order-1 md:order-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square bg-zinc-100 rounded-3xl flex flex-col items-center justify-center p-6 text-center hover:bg-brand-50 transition-colors group">
                    <BarChart3 className="w-8 h-8 text-zinc-400 group-hover:text-brand-600 mb-3" />
                    <span className="text-sm font-bold text-zinc-900 uppercase tracking-tight">Dados</span>
                  </div>
                  <div className="aspect-square bg-zinc-900 rounded-3xl flex flex-col items-center justify-center p-6 text-center hover:bg-brand-600 transition-colors group">
                    <Zap className="w-8 h-8 text-zinc-500 group-hover:text-white mb-3" />
                    <span className="text-sm font-bold text-white uppercase tracking-tight">Conversão</span>
                  </div>
                  <div className="aspect-square bg-zinc-100 rounded-3xl flex flex-col items-center justify-center p-6 text-center hover:bg-brand-50 transition-colors group">
                    <Target className="w-8 h-8 text-zinc-400 group-hover:text-brand-600 mb-3" />
                    <span className="text-sm font-bold text-zinc-900 uppercase tracking-tight">Processos</span>
                  </div>
                  <div className="aspect-square bg-zinc-100 rounded-3xl flex flex-col items-center justify-center p-6 text-center hover:bg-brand-50 transition-colors group">
                    <ShieldCheck className="w-8 h-8 text-zinc-400 group-hover:text-brand-600 mb-3" />
                    <span className="text-sm font-bold text-zinc-900 uppercase tracking-tight">Plataforma</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. O MÉTODO MAESTTRO (Os 3 Atos) */}
        <section id="metodo" className="py-24">
          <div className="max-w-7xl mx-auto px-4">
            <SectionTitle subtitle="Metodologia Exclusiva">O Método MAESTTRO: Os 3 Atos</SectionTitle>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="relative p-8 rounded-3xl bg-white border border-zinc-100 shadow-sm hover:shadow-xl transition-shadow">
                <div className="absolute -top-6 left-8 w-12 h-12 bg-brand-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg">I</div>
                <Search className="w-12 h-12 text-brand-600 mb-6 mt-4" />
                <h3 className="text-2xl font-bold mb-4">Ato 1: O Scan</h3>
                <p className="text-zinc-600 mb-6">Diagnóstico 360º de UX, dados e performance. Assim como um maestro estuda a partitura, analisamos cada detalhe da sua operação para encontrar as notas fora do tom.</p>
                <ul className="space-y-3">
                  {["Auditoria de Funil", "Análise de CAC e LTV", "Mapeamento de UX"].map((li, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-zinc-700">
                      <CheckCircle2 className="w-4 h-4 text-brand-500" /> {li}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative p-8 rounded-3xl bg-white border border-zinc-100 shadow-sm hover:shadow-xl transition-shadow">
                <div className="absolute -top-6 left-8 w-12 h-12 bg-brand-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg">II</div>
                <FileText className="w-12 h-12 text-brand-600 mb-6 mt-4" />
                <h3 className="text-2xl font-bold mb-4">Ato 2: A Partitura</h3>
                <p className="text-zinc-600 mb-6">Roadmap estratégico e priorização de ações. Criamos o guia definitivo do que deve ser executado, focando nas alavancas que trazem ROI imediato.</p>
                <ul className="space-y-3">
                  {["Plano de Ação Prioritário", "Definição de Metas (KPIs)", "Estratégia de Retenção"].map((li, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-zinc-700">
                      <CheckCircle2 className="w-4 h-4 text-brand-500" /> {li}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative p-8 rounded-3xl bg-white border border-zinc-100 shadow-sm hover:shadow-xl transition-shadow">
                <div className="absolute -top-6 left-8 w-12 h-12 bg-brand-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg">III</div>
                <Play className="w-12 h-12 text-brand-600 mb-6 mt-4" />
                <h3 className="text-2xl font-bold mb-4">Ato 3: A Regência</h3>
                <p className="text-zinc-600 mb-6">Monitoramento da execução dos times técnicos. Não tocamos os instrumentos (código), mas garantimos que cada analista e dev execute sua parte com precisão.</p>
                <ul className="space-y-3">
                  {["Supervisão de Times", "Acompanhamento de Sprint", "Validação de Resultados"].map((li, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-zinc-700">
                      <CheckCircle2 className="w-4 h-4 text-brand-500" /> {li}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 5. POR QUE A MAESTTRO? */}
        <section id="autoridade" className="py-24 bg-zinc-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <div className="absolute -inset-4 bg-brand-600/10 rounded-3xl blur-2xl" />
                  <img 
                    src="https://picsum.photos/seed/maesttro/800/1000" 
                    alt="O Maestro Estratégico" 
                    className="relative rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 object-cover aspect-[4/5]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl border border-zinc-100 hidden lg:block">
                    <Music className="w-8 h-8 text-brand-600 mb-2" />
                    <p className="text-sm font-bold text-zinc-900">Regência Estratégica</p>
                    <p className="text-xs text-zinc-500">Performance em Harmonia</p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <span className="text-brand-600 font-mono text-xs uppercase tracking-widest mb-4 block">Diferenciais</span>
                <h2 className="text-4xl font-bold mb-6 tracking-tight">Por que a MAESTTRO?</h2>
                <p className="text-lg text-zinc-600 mb-6 leading-relaxed">
                  O Maestro é aquele que domina a técnica de cada instrumento, mas escolhe reger para garantir que o resultado final seja uma sinfonia de lucros. Atuamos desde 2018 with uma visão crítica sobre plataformas e foco total em ROI.
                </p>
                <p className="text-lg text-zinc-600 mb-8 leading-relaxed">
                  Nossa entrega é baseada em eficiência operacional. Não aceitamos resultados medianos; buscamos a excelência técnica para que sua loja virtual performe no topo do mercado.
                </p>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <div className="text-3xl font-bold text-zinc-900">Desde 2018</div>
                    <div className="text-sm text-zinc-500 uppercase tracking-wider">Experiência Real</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-zinc-900">Visão 360º</div>
                    <div className="text-sm text-zinc-500 uppercase tracking-wider">Foco em ROI</div>
                  </div>
                </div>
                <Button primary onClick={handleWhatsAppClick}>
                  Falar com o Maestro
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 6. FAQ */}
        <section className="py-24">
          <div className="max-w-3xl mx-auto px-4">
            <SectionTitle subtitle="Dúvidas Frequentes">Esclarecimentos Estratégicos</SectionTitle>
            <div className="space-y-2">
              <FAQItem 
                question="Você entende da minha plataforma?" 
                answer="Sabemos extrair o melhor de cada plataforma, identificando limitações e oportunidades técnicas."
              />
              <FAQItem 
                question="Você executa o serviço?" 
                answer="Minha entrega principal é a inteligência e a supervisão técnica. Eu garanto que quem executa (seu time ou agência) não cometa erros que custam caro, validando cada etapa do roadmap estratégico."
              />
              <FAQItem 
                question="Como funciona o modelo de orçamento?" 
                answer="Trabalhamos com um modelo de orçamento fechado por projeto/diagnóstico ou fee mensal para acompanhamento contínuo (regência). Isso garante previsibilidade e foco total na entrega de valor."
              />
              <FAQItem 
                question="Qual o principal KPI que vocês acompanham?" 
                answer="Embora olhemos princialmente para ROI e ROAS, nosso KPI mestre é o Lucro Líquido da operação. A harmonia só existe quando a música gera resultado financeiro real."
              />
            </div>
          </div>
        </section>

        {/* FOOTER / CTA FINAL */}
        <section className="py-24 bg-zinc-900 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 to-brand-900" />
          <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">A regência estratégica que o seu <br className="hidden md:block" /> e-commerce precisa para escalar.</h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
              Não deixe sua operação desafinar. Agende seu diagnóstico hoje mesmo.
            </p>
            <Button primary className="mx-auto text-lg py-4 px-10" onClick={handleWhatsAppClick}>
              <MessageCircle className="w-6 h-6" />
              Falar com o Maesttro via WhatsApp
            </Button>
            
            <div className="mt-24 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-600 rounded flex items-center justify-center">
                  <BarChart3 className="text-white w-5 h-5" />
                </div>
                <span className="font-bold text-lg tracking-tight">MAESTTRO</span>
              </div>
              <div className="text-zinc-500 text-sm">
                © 2024 Maesttro - Regência Estratégica de E-commerce. Todos os direitos reservados.
              </div>
              <div className="flex gap-6 text-zinc-400 text-sm">
                <a href="#" className="hover:text-white transition-colors">Privacidade</a>
                <a href="#" className="hover:text-white transition-colors">Termos</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
