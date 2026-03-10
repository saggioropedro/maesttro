/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

const ClientArea = lazy(() => import('./pages/ClientArea'));

import { 
  MessageCircle, 
  TrendingUp, 
  Search, 
  Music, 
  Eye, 
  CheckCircle2, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Target,
  Zap,
  ShieldCheck,
  Activity,
  FileText,
  Play,
  Quote,
  Star,
  Menu,
  X,
  Globe,
  Code,
  Database,
  Rocket,
  Sun,
  Moon,
  ShoppingBag,
  Users
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, animate, useMotionValue, useMotionValueEvent } from 'motion/react';

const WHATSAPP_NUMBER = "5511999389334";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Gostaria de falar com o Maesttro sobre a performance do meu e-commerce.`;

// Logo Component
const Logo = ({ className = "w-8 h-8 md:w-10 md:h-10", white = false }: { className?: string, white?: boolean }) => {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <img 
        src={white ? "/img/logo/logo_maesttro_branco_semfundo.png" : "/img/logo/logo_maesttro_roxo_semfundo.png"} 
        alt="Maesttro Logo" 
        className="w-full h-full object-contain"
        referrerPolicy="no-referrer"
        fetchPriority="high"
        decoding="async"
      />
    </div>
  );
};

// Components
const Button = ({ children, className = "", primary = false, onClick }: { children: React.ReactNode, className?: string, primary?: boolean, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={`px-5 py-3 md:px-6 md:py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95 touch-manipulation ${
      primary 
      ? "bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-600/20" 
      : "bg-white dark:bg-zinc-800 text-brand-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500"
    } ${className}`}
  >
    {children}
  </button>
);

const SectionTitle = ({ children, subtitle, light = false }: { children: React.ReactNode, subtitle?: React.ReactNode, light?: boolean }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="mb-10 md:mb-12 text-center px-4"
  >
    {subtitle && <span className="text-brand-600 dark:text-brand-400 font-mono text-[10px] md:text-xs uppercase tracking-widest mb-2 block">{subtitle}</span>}
    <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight ${light ? 'text-white' : 'text-brand-900 dark:text-white'}`}>{children}</h2>
  </motion.div>
);

const FAQItem = ({ question, answer }: { question: string, answer: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800 py-4">
      <button 
        className="w-full flex justify-between items-center text-left py-2 focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="text-zinc-400 dark:text-zinc-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="text-zinc-600 dark:text-zinc-400 py-2 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StatCounter = ({ value, suffix, label, icon: Icon, delay = 0 }: { value: number, suffix: string, label: string, icon: any, delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        delay: delay,
        onUpdate: (latest) => setDisplayValue(Math.round(latest))
      });
      return () => controls.stop();
    }
  }, [isInView, value, delay]);

  return (
    <motion.div 
      ref={ref} 
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 15,
        bounce: 0.5,
        duration: 0.8,
        delay: delay
      }}
      className="flex flex-col items-center p-8 rounded-[2.5rem] bg-gradient-to-br from-white/15 via-brand-500/5 to-brand-600/10 border border-white/20 backdrop-blur-md hover:from-white/20 hover:to-brand-500/20 transition-all duration-500 group font-montserrat will-change-transform"
    >
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-brand-400/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
        <Icon className="w-8 h-8 md:w-10 md:h-10 text-brand-300" />
      </div>
      <div className="text-4xl md:text-6xl font-black mb-3 tracking-tighter text-white tabular-nums min-h-[1.2em] flex items-center justify-center">
        +{displayValue}{suffix}
      </div>
      <div className="text-[11px] md:text-xs text-brand-200 uppercase tracking-[0.25em] text-center font-bold">
        {label}
      </div>
    </motion.div>
  );
};

function LandingPage({ theme, toggleTheme }: { theme: 'light' | 'dark', toggleTheme: () => void }) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselConstraints, setCarouselConstraints] = useState({ left: 0, right: 0 });
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const x = useMotionValue(0);

  const scrollToTestimonial = (index: number) => {
    if (carouselRef.current) {
      const card = carouselRef.current.querySelector('.flex-shrink-0');
      if (!card) return;
      
      const cardWidth = card.clientWidth;
      const gap = window.innerWidth >= 768 ? 32 : 24;
      const step = cardWidth + gap;
      const containerWidth = carouselRef.current.offsetWidth;
      const offset = (containerWidth - cardWidth) / 2;
      
      const targetX = offset - (index * step);
      
      animate(x, targetX, {
        type: "spring",
        stiffness: 300,
        damping: 30,
      });
      setActiveTestimonialIndex(index);
    }
  };

  const heroRef = useRef<HTMLElement>(null);
  const autoridadeRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const { scrollY } = useScroll();
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (isMobileMenuOpen) return;

    const direction = latest > lastScrollY.current ? "down" : "up";
    
    if (latest < 50) {
      setShowHeader(true);
    } else if (direction === "down" && latest > 150 && showHeader) {
      setShowHeader(false);
    } else if (direction === "up" && !showHeader) {
      setShowHeader(true);
    }
    
    lastScrollY.current = latest;
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  const { scrollYProgress: autoridadeScroll } = useScroll({
    target: autoridadeRef,
    offset: ["start end", "end start"]
  });
  const autoridadeY = useTransform(autoridadeScroll, [0, 1], ["-5%", "5%"]);

  const handleWhatsAppClick = () => {
    window.open(WHATSAPP_LINK, '_blank');
  };

  useEffect(() => {
    const updateConstraints = () => {
      if (carouselRef.current) {
        const card = carouselRef.current.querySelector('.flex-shrink-0');
        if (card) {
          const cardWidth = card.clientWidth;
          const gap = window.innerWidth >= 768 ? 32 : 24;
          const step = cardWidth + gap;
          const containerWidth = carouselRef.current.offsetWidth;
          const offset = (containerWidth - cardWidth) / 2;
          
          // We have 3 testimonials, so indices 0, 1, 2
          const leftBound = offset - (2 * step);
          const rightBound = offset;
          
          setCarouselConstraints({ left: leftBound, right: rightBound });
          
          // Set initial position centered on first card
          if (x.get() === 0) {
            x.set(offset);
          }
        }
      }
    };

    updateConstraints();
    // Add a small delay to ensure layout is complete
    const timer = setTimeout(updateConstraints, 500);
    
    window.addEventListener('resize', updateConstraints);
    return () => {
      window.removeEventListener('resize', updateConstraints);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const sections = ["harmonia", "servicos", "metodo", "depoimentos", "autoridade"];
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-brand-50 dark:bg-zinc-950 font-sans text-brand-900 dark:text-zinc-100 selection:bg-brand-100 dark:selection:bg-brand-900 selection:text-brand-900 dark:selection:text-white transition-colors duration-700 ease-in-out">
      {/* 1. HEADER */}
      <motion.header 
        initial={{ y: 0 }}
        animate={{ y: showHeader ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-brand-100/50 dark:border-zinc-800/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 relative group">
            <Logo white={theme === 'dark'} />
            <span className="font-outfit font-bold text-lg md:text-xl tracking-tight uppercase dark:text-white">
              Maes<span className="text-brand-600">tt</span>ro
            </span>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            {[
              { label: "Serviços", href: "#servicos", id: "servicos" },
              { label: "O Método", href: "#metodo", id: "metodo" },
              { label: <>A Maesttro</>, href: "#autoridade", id: "autoridade" },
            ].map((item) => (
              <a 
                key={item.id}
                href={item.href} 
                className={`relative group transition-all duration-300 py-2 px-3 rounded-lg ${
                  activeSection === item.id 
                  ? "text-brand-900 dark:text-white font-bold bg-zinc-100 dark:bg-zinc-800" 
                  : "hover:text-brand-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Theme Toggle (Desktop Only) */}
            <button
              onClick={toggleTheme}
              className="hidden md:flex p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-all duration-700 ease-in-out cursor-pointer"
              aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            <Button 
              className="hidden md:flex text-sm py-2 px-4 border-brand-200 dark:border-zinc-700 text-brand-900 dark:text-zinc-100 hover:bg-brand-50 dark:hover:bg-zinc-800" 
              onClick={() => navigate('/area-cliente')}
            >
              Área do Cliente
            </Button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-3 -mr-2 text-brand-900 dark:text-white relative z-[100] cursor-pointer touch-manipulation"
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-0 top-0 bg-white dark:bg-zinc-950 z-[60] overflow-y-auto flex flex-col"
          >
            <div className="flex items-center justify-between px-4 h-16 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Logo white={theme === 'dark'} />
                <span className="font-outfit font-bold text-lg tracking-tight uppercase dark:text-white">
                  Maes<span className="text-brand-600">tt</span>ro
                </span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-zinc-500 dark:text-zinc-400 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col items-center justify-center p-8 gap-8">
              {[
                { label: "Serviços", href: "#servicos", icon: Rocket, id: "servicos" },
                { label: "O Método", href: "#metodo", icon: Target, id: "metodo" },
                { label: "A Maesttro", href: "#autoridade", icon: Star, id: "autoridade" },
              ].map((item, i) => (
                <motion.a
                  key={item.id}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: i * 0.1
                  }}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex flex-col items-center gap-3 group"
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
                    activeSection === item.id 
                    ? "bg-brand-600 text-white shadow-xl shadow-brand-600/30 scale-110" 
                    : "bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400"
                  }`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <span className={`text-2xl tracking-tight ${activeSection === item.id ? "font-black text-brand-600 dark:text-brand-400" : "font-bold text-zinc-800 dark:text-zinc-200"}`}>
                    {item.label}
                  </span>
                </motion.a>
              ))}
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.4 }}
                className="w-full max-w-xs mt-8 space-y-4"
              >
                <Button primary className="w-full py-5 text-lg shadow-xl shadow-brand-600/20" onClick={handleWhatsAppClick}>
                  <MessageCircle className="w-6 h-6" />
                  Falar com o Maestro
                </Button>
                
                <Button 
                  className="w-full py-5 text-lg border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-900" 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/area-cliente');
                  }}
                >
                  Área do Cliente
                </Button>

                <div className="flex items-center justify-center gap-4 pt-4">
                  <span className="text-sm font-medium text-zinc-500">Modo {theme === 'light' ? 'Claro' : 'Escuro'}</span>
                  <button
                    onClick={toggleTheme}
                    className="relative w-12 h-6 bg-zinc-200 dark:bg-zinc-700 rounded-full transition-colors cursor-pointer"
                  >
                    <motion.div 
                      animate={{ x: theme === 'light' ? 4 : 28 }}
                      className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-sm"
                    />
                  </button>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Infinite Scrolling Marquee - Non-fixed, below header */}
      <div className={`transition-all duration-500 ${isMobileMenuOpen ? 'blur-md pointer-events-none' : ''}`}>
        <div className="mt-20 bg-brand-900 text-brand-50 py-1 overflow-hidden whitespace-nowrap border-t border-brand-700 relative z-40">
        <div className="animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="inline-flex items-center text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] font-space">
              <span>A regência que falta na sua operação digital</span>
              <span className="mx-12 text-brand-400 opacity-60">•</span>
            </span>
          ))}
        </div>
      </div>

      <main className="pt-0">
        {/* 1. HERO SECTION */}
        <section ref={heroRef} className="relative py-16 md:py-32 overflow-hidden min-h-[85vh] flex items-center">
          {/* Parallax Background Image */}
          <motion.div 
            style={{ y, opacity }}
            className="absolute inset-0 -z-10"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-brand-50/70 dark:from-zinc-950/70 via-white/90 dark:via-zinc-950/90 to-white dark:to-zinc-950 z-10" />
            <img 
              src="https://picsum.photos/seed/orchestra/1280/720?blur=10" 
              alt="Background" 
              className="w-full h-full object-cover opacity-15 md:opacity-20 grayscale dark:opacity-10"
              referrerPolicy="no-referrer"
              fetchPriority="high"
              decoding="async"
            />
          </motion.div>
          
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(139,92,246,0.05)_0%,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(45%_45%_at_50%_50%,rgba(139,92,246,0.1)_0%,rgba(0,0,0,0)_100%)]" />
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.2
                  }
                }
              }}
            >
              <motion.span 
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
                className="inline-block px-4 py-1.5 mb-6 text-[10px] md:text-xs font-semibold tracking-widest text-brand-700 dark:text-brand-400 uppercase bg-brand-50 dark:bg-brand-900/30 rounded-full border border-brand-100 dark:border-brand-800"
              >
                Estratégia e Tecnologia em perfeita harmonia
              </motion.span>
              
              <motion.h1 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-[2.6rem] sm:text-6xl lg:text-7xl font-extrabold text-brand-900 dark:text-white tracking-tight mb-6 md:mb-10 leading-[1.1] px-4 sm:px-0"
              >
                Sua operação de e-commerce <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-700 dark:from-brand-300 dark:to-brand-500">
                  em perfeita harmonia.
                </span>
              </motion.h1>
              
              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed px-4 sm:px-0"
              >
                Unimos inteligência de negócios e tecnologia de elite para criar operações de e-commerce escaláveis, seguras e de alta performance.
              </motion.p>
              
              <motion.div 
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1 }
                }}
                transition={{ duration: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
              >
                <Button primary className="w-full sm:w-auto text-base md:text-lg py-4 px-8 group overflow-hidden relative" onClick={handleWhatsAppClick}>
                  <motion.div
                    className="flex items-center gap-2 relative z-10"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    Falar com o Maesttro via WhatsApp
                  </motion.div>
                </Button>
                <div className="flex items-center gap-2 text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
                  <ShieldCheck className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  Foco em Lucro e Eficiência (ROI)
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 3. SEÇÃO 'AFINE SUA ORQUESTRA' */}
        <section id="harmonia" className="py-20 md:py-24 bg-brand-900 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <SectionTitle subtitle={<>Resultados <b>Maesttro</b></>} light>Afine sua Orquestra</SectionTitle>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            >
              {[
                {
                  title: "Conversão Elevada (CRO)",
                  desc: "Transformamos visitantes em vendas reais através de uma jornada de compra fluida e persuasiva.",
                  icon: TrendingUp
                },
                {
                  title: "Eficiência Operacional",
                  desc: "Otimização de processos e tecnologia para reduzir custos e maximizar a margem de lucro.",
                  icon: Zap
                },
                {
                  title: "Fidelização e Retenção",
                  desc: "Estratégias que reduzem o abandono e transformam visitantes em clientes recorrentes.",
                  icon: Target
                },
                {
                  title: "Clareza de Dados",
                  desc: "Dashboards inteligentes que traduzem números em decisões estratégicas para o seu lucro.",
                  icon: Activity
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-500/50 transition-all"
                >
                  <item.icon className="w-8 h-8 md:w-10 md:h-10 text-brand-500 mb-4 md:mb-6" />
                  <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">{item.title}</h3>
                  <p className="text-zinc-300 leading-relaxed text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 3. SEÇÃO 'VISÃO 360º' */}
        <section className="py-20 md:py-24 bg-white dark:bg-zinc-900 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row items-center gap-10 md:gap-16"
            >
              <div className="w-full md:w-1/2 order-2 md:order-1 text-center md:text-left">
                <span className="text-brand-600 dark:text-brand-400 font-mono text-[10px] md:text-xs uppercase tracking-widest mb-4 block">Intervenção Estratégica</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight leading-tight dark:text-white">Visão 360º: Nós conhecemos cada engrenagem.</h2>
                <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                  O diagnóstico da <b>Maesttro</b> não é superficial. Da escolha da plataforma à otimização do checkout, nossa análise é baseada na vivência técnica de quem sabe como cada instrumento deve ser tocado.
                </p>
                <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                  Analisamos profundamente todas as camadas do seu e-commerce: Plataforma, Conversão, Dados e Processos. Se você não tem quem execute, o Maestro aponta o caminho exato e valida cada etapa da execução para garantir a eficiência operacional.
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <div className="p-3 bg-brand-50 dark:bg-brand-900/20 rounded-xl">
                    <ShieldCheck className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                  </div>
                  <span className="font-medium text-brand-900 dark:text-white text-sm md:text-base">Análise Técnica e Estratégica Completa</span>
                </div>
              </div>
              <div className="w-full md:w-1/2 order-1 md:order-2">
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center p-4 md:p-6 text-center hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors group">
                    <BarChart3 className="w-6 h-6 md:w-8 md:h-8 text-zinc-400 dark:text-zinc-500 group-hover:text-brand-600 dark:group-hover:text-brand-400 mb-2 md:mb-3" />
                    <span className="text-[10px] md:text-sm font-bold text-brand-900 dark:text-zinc-100 uppercase tracking-tight">Dados</span>
                  </div>
                  <div className="aspect-square bg-brand-900 dark:bg-brand-800 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center p-4 md:p-6 text-center hover:bg-brand-600 dark:hover:bg-brand-700 transition-colors group">
                    <Zap className="w-6 h-6 md:w-8 md:h-8 text-brand-500 group-hover:text-white mb-2 md:mb-3" />
                    <span className="text-[10px] md:text-sm font-bold text-white uppercase tracking-tight">Conversão</span>
                  </div>
                  <div className="aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center p-4 md:p-6 text-center hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors group">
                    <Target className="w-6 h-6 md:w-8 md:h-8 text-zinc-400 dark:text-zinc-500 group-hover:text-brand-600 dark:group-hover:text-brand-400 mb-2 md:mb-3" />
                    <span className="text-[10px] md:text-sm font-bold text-brand-900 dark:text-zinc-100 uppercase tracking-tight">Processos</span>
                  </div>
                  <div className="aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center p-4 md:p-6 text-center hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors group">
                    <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-zinc-400 dark:text-zinc-500 group-hover:text-brand-600 dark:group-hover:text-brand-400 mb-2 md:mb-3" />
                    <span className="text-[10px] md:text-sm font-bold text-brand-900 dark:text-zinc-100 uppercase tracking-tight">Plataforma</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* NOVO: SERVIÇOS TÉCNICOS */}
        <section id="servicos" className="py-20 md:py-24 bg-zinc-50 dark:bg-zinc-900/50 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4">
            <SectionTitle subtitle="Nossas Entregas">Soluções de Tecnologia e Estratégia</SectionTitle>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-12">
              {[
                {
                  title: "Lojas Virtuais",
                  desc: "Desenvolvimento de e-commerces e sites de alta performance focados em conversão.",
                  icon: Globe
                },
                {
                  title: "Sistemas Web",
                  desc: "Soluções sob medida e sistemas complexos para automatizar e escalar sua operação.",
                  icon: Code
                },
                {
                  title: "Analytics Pro",
                  desc: "Web Analytics e Inteligência de Dados para decisões baseadas em fatos, não em palpites.",
                  icon: BarChart3
                },
                {
                  title: "Evolução de Projetos",
                  desc: "Suporte técnico, evolução contínua e aceleração focada em crescimento sustentável.",
                  icon: Rocket
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-6 md:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-brand-500/50 transition-all"
                >
                  <item.icon className="w-8 h-8 md:w-10 md:h-10 text-brand-600 dark:text-brand-400 mb-4 md:mb-6" />
                  <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-brand-900 dark:text-white">{item.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. O MÉTODO MAESTTRO (Os 3 Atos) */}
        <section id="metodo" className="py-20 md:py-24 bg-brand-50/50 dark:bg-zinc-950 transition-colors duration-700 ease-in-out">
          <div className="max-w-7xl mx-auto px-4">
            <SectionTitle subtitle="Metodologia Exclusiva">O Método MAESTTRO: Os 3 Atos</SectionTitle>
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  id: "I",
                  icon: Search,
                  title: "Ato 1: Imersão e Diagnóstico",
                  desc: "Auditoria profunda de dados e identificação de gargalos técnicos. Assim como um maestro estuda a partitura, analisamos cada detalhe da sua operação para encontrar as notas fora do tom.",
                  items: ["Auditoria de Dados", "Gargalos Técnicos", "Mapeamento de UX"]
                },
                {
                  id: "II",
                  icon: FileText,
                  title: "Ato 2: Tecnologia e Planejamento",
                  desc: "Desenvolvimento de sistemas, lojas e roadmap estratégico. Criamos o guia definitivo do que deve ser executado, focando nas alavancas que trazem ROI imediato.",
                  items: ["Desenvolvimento Web", "Roadmap Estratégico", "Sistemas sob Medida"]
                },
                {
                  id: "III",
                  icon: Play,
                  title: "Ato 3: Regência e Aceleração",
                  desc: "Suporte contínuo, evolução técnica e monitoramento de KPIs. Garantimos que cada parte da sua tecnologia e estratégia execute com precisão absoluta.",
                  items: ["Suporte e Evolução", "Monitoramento de KPIs", "Aceleração de Escala"]
                }
              ].map((ato, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="relative p-6 md:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:border-brand-200 dark:hover:border-brand-500/30 transition-all group"
                >
                  <div className="absolute -top-4 md:-top-6 left-6 md:left-8 w-10 h-10 md:w-12 md:h-12 bg-brand-600 text-white rounded-xl md:rounded-2xl flex items-center justify-center font-bold text-lg md:text-xl shadow-lg group-hover:scale-110 transition-transform">
                    {ato.id}
                  </div>
                  <ato.icon className="w-10 h-10 md:w-12 md:h-12 text-brand-600 dark:text-brand-400 mb-4 md:mb-6 mt-4 group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors" />
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-brand-900 dark:text-white">{ato.title}</h3>
                  <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">{ato.desc}</p>
                  <ul className="space-y-3">
                    {ato.items.map((li, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-xs md:text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" /> {li}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* NOVA SEÇÃO: RESULTADOS */}
        <section className="py-24 md:py-32 bg-brand-900 text-white overflow-hidden relative">
          {/* Background decoration - Enhanced for Purple Theme */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brand-500/20 blur-[150px] animate-pulse" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-brand-400/10 blur-[150px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-20 md:mb-24">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6"
              >
                <div className="w-2 h-2 rounded-full bg-brand-400 animate-ping" />
                <span className="text-brand-200 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">
                  Nossa Performance
                </span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]"
              >
                Especialistas em negócios <br className="hidden md:block" /> de <span className="text-brand-400">performance</span>
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <StatCounter value={100} suffix="k" label="pedidos realizados" icon={ShoppingBag} delay={0.1} />
              <StatCounter value={300} suffix="k" label="leads captados" icon={Users} delay={0.2} />
              <StatCounter value={10} suffix="MM" label="acessos gerados" icon={Globe} delay={0.3} />
              <StatCounter value={40} suffix="" label="projetos entregues" icon={Rocket} delay={0.4} />
            </div>
          </div>
        </section>

        {/* 5. POR QUE A MAESTTRO? */}
        <section id="autoridade" ref={autoridadeRef} className="py-20 md:py-32 bg-zinc-50 dark:bg-zinc-900/50 transition-colors duration-700 ease-in-out overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
              <motion.div 
                style={{ y: autoridadeY }}
                className="w-full md:w-1/2"
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-brand-600/10 dark:bg-brand-600/5 rounded-3xl blur-2xl" />
                  <img 
                    src="/img/foto_funil_commerce/funil_ecommerce_maesttro.png" 
                    alt="Funil de E-commerce Maesttro - Estratégia e Performance" 
                    className="relative rounded-3xl shadow-2xl transition-all duration-700 object-cover aspect-[4/5] dark:opacity-90 w-full grayscale md:hover:grayscale-0"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute bottom-4 md:bottom-8 -right-4 md:-right-8 bg-white dark:bg-zinc-800 p-4 md:p-6 rounded-xl md:rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-700 hidden sm:block">
                    <Music className="w-6 h-6 md:w-8 md:h-8 text-brand-600 dark:text-brand-400 mb-2" />
                    <p className="text-xs md:text-sm font-bold text-brand-900 dark:text-white">Tecnologia e Estratégia</p>
                    <p className="text-[10px] md:text-xs text-zinc-500 dark:text-zinc-400">Performance em Harmonia</p>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2 text-center md:text-left"
              >
                <span className="text-brand-600 dark:text-brand-400 font-mono text-[10px] md:text-xs uppercase tracking-widest mb-4 block">Diferenciais</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight leading-tight dark:text-white">Por que a MAESTTRO?</h2>
                <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed font-semibold">
                  Tecnologia e Estratégia em perfeita harmonia.
                </p>
                <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                  Somos uma consultoria de marketing, com mais de 12 anos de experiência em criar, desenvolver e acelerar negócios.
                </p>
                <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                  Cada projeto nasce com método, propósito e direção clara: <b>fazer sua empresa crescer.</b>
                </p>
                <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                  A <b>Maesttro</b> une a inteligência de negócios com a construção técnica de elite. Não apenas dizemos o que fazer; nós construímos as ferramentas e sistemas necessários para a escala.
                </p>
                <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed italic">
                  "Enquanto auditamos sua estratégia, nossa tecnologia constrói e otimiza sua infraestrutura. Tecnologia e dados no protagonismo da sua escala."
                </p>
                <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-brand-900 dark:text-white">Desde 2018</div>
                    <div className="text-[10px] md:text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">E-commerce Real</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-brand-900 dark:text-white">Tecnologia</div>
                    <div className="text-[10px] md:text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Sistemas e Dados</div>
                  </div>
                </div>
                <Button primary className="mx-auto md:mx-0" onClick={handleWhatsAppClick}>
                  Falar com os Especialistas
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 6. DEPOIMENTOS (Testimonials) */}
        <section id="depoimentos" className="py-20 md:py-24 bg-white dark:bg-zinc-900 overflow-hidden transition-colors duration-700 ease-in-out">
          <div className="max-w-7xl mx-auto px-4">
            <SectionTitle subtitle="Vozes da Experiência">Sinfonia de Resultados</SectionTitle>
            
            <div className="relative group/carousel">
              {/* Navigation Arrows */}
              <div className="hidden md:block">
                <button 
                  onClick={() => scrollToTestimonial(Math.max(activeTestimonialIndex - 1, 0))}
                  className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 p-3 rounded-full bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 shadow-xl text-brand-900 dark:text-white opacity-0 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-0 transition-all duration-300 hover:bg-brand-50 dark:hover:bg-zinc-700 disabled:opacity-0 cursor-pointer`}
                  disabled={activeTestimonialIndex === 0}
                  aria-label="Depoimento anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => scrollToTestimonial(Math.min(activeTestimonialIndex + 1, 2))}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 p-3 rounded-full bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 shadow-xl text-brand-900 dark:text-white opacity-0 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-0 transition-all duration-300 hover:bg-brand-50 dark:hover:bg-zinc-700 disabled:opacity-0 cursor-pointer`}
                  disabled={activeTestimonialIndex === 2}
                  aria-label="Próximo depoimento"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className="overflow-hidden py-4 -my-4" ref={carouselRef}>
                <motion.div 
                  className="flex gap-6 md:gap-8 cursor-grab active:cursor-grabbing touch-pan-y will-change-transform"
                  style={{ x }}
                  drag="x"
                  dragConstraints={carouselConstraints}
                  dragDirectionLock
                  dragElastic={0.2}
                  dragMomentum={true}
                  whileTap={{ cursor: "grabbing" }}
                  dragTransition={{
                    bounceStiffness: 600,
                    bounceDamping: 25,
                    power: 0.2,
                    timeConstant: 200,
                    modifyTarget: (target) => {
                      if (carouselRef.current) {
                        const card = carouselRef.current.querySelector('.flex-shrink-0');
                        if (!card) return target;
                        const cardWidth = card.clientWidth;
                        const gap = window.innerWidth >= 768 ? 32 : 24;
                        const step = cardWidth + gap;
                        const containerWidth = carouselRef.current.offsetWidth;
                        const offset = (containerWidth - cardWidth) / 2;
                        
                        const index = Math.round((offset - target) / step);
                        return offset - (index * step);
                      }
                      return target;
                    }
                  }}
                  onDragEnd={(_, info) => {
                    if (carouselRef.current) {
                      const card = carouselRef.current.querySelector('.flex-shrink-0');
                      if (!card) return;
                      const cardWidth = card.clientWidth;
                      const gap = window.innerWidth >= 768 ? 32 : 24;
                      const step = cardWidth + gap;
                      const containerWidth = carouselRef.current.offsetWidth;
                      const offset = (containerWidth - cardWidth) / 2;
                      
                      const projectedX = x.get() + info.velocity.x * 0.2;
                      const index = Math.min(Math.max(Math.round((offset - projectedX) / step), 0), 2);
                      setActiveTestimonialIndex(index);
                    }
                  }}
                  onAnimationComplete={() => {
                    if (carouselRef.current) {
                      const card = carouselRef.current.querySelector('.flex-shrink-0');
                      if (!card) return;
                      const cardWidth = card.clientWidth;
                      const gap = window.innerWidth >= 768 ? 32 : 24;
                      const step = cardWidth + gap;
                      const containerWidth = carouselRef.current.offsetWidth;
                      const offset = (containerWidth - cardWidth) / 2;
                      
                      const index = Math.min(Math.max(Math.round((offset - x.get()) / step), 0), 2);
                      setActiveTestimonialIndex(index);
                    }
                  }}
                >
                  {[
                    {
                      quote: "A Maesttro transformou nossa operação. O diagnóstico inicial revelou gargalos que ignorávamos há anos. Hoje nossa conversão é outra.",
                      author: "Ricardo Silva",
                      role: "CEO da TechStore"
                    },
                    {
                      quote: "A regência do Maestro trouxe a harmonia que nossa equipe precisava. O ROI subiu 40% em apenas 3 meses de acompanhamento estratégico.",
                      author: "Amanda Costa",
                      role: "Gerente de E-commerce na FashionHub"
                    },
                    {
                      quote: "Finalmente temos clareza nos dados. A partitura estratégica é o nosso guia diário para o crescimento sustentável da nossa loja.",
                      author: "Bruno Oliveira",
                      role: "Fundador da BioVibe"
                    }
                  ].map((testimonial, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="w-[85vw] sm:w-[400px] flex-shrink-0 p-6 md:p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 relative group hover:bg-white dark:hover:bg-zinc-700 hover:shadow-xl transition-all duration-300"
                    >
                      <Quote className="absolute top-4 md:top-6 right-6 md:right-8 w-6 h-6 md:w-8 md:h-8 text-brand-100 dark:text-zinc-700 group-hover:text-brand-200 dark:group-hover:text-zinc-600 transition-colors" />
                      <div className="mb-4 md:mb-6">
                        <div>
                          <h4 className="font-bold text-sm md:text-base text-brand-900 dark:text-white">{testimonial.author}</h4>
                          <p className="text-[10px] md:text-xs text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-300 italic leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                      <div className="mt-6 flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 md:w-4 md:h-4 text-brand-500 fill-brand-500" />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              
              <div className="flex justify-center gap-2 mt-8">
                {[0, 1, 2].map((i) => (
                  <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeTestimonialIndex ? 'w-6 bg-brand-600' : 'bg-zinc-200 dark:bg-zinc-800'}`} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. FAQ */}
        <section className="py-20 md:py-24 bg-white dark:bg-zinc-950 transition-colors duration-700 ease-in-out">
          <div className="max-w-3xl mx-auto px-4">
            <SectionTitle subtitle="Dúvidas Frequentes">Esclarecimentos Estratégicos</SectionTitle>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-2"
            >
              <FAQItem 
                question="Para qual tamanho de empresa a Maesttro é indicada?" 
                answer={<>Focamos em e-commerces e operações digitais de pequeno e médio porte que já possuem tráfego, mas sentem que a operação está "desafinada" ou estagnada tecnologicamente.</>}
              />
              <FAQItem 
                question="Já tenho uma plataforma (Nuvemshop, Shopify, Tray, etc). Preciso trocar para contratar a Maesttro?" 
                answer={<>Não. Nossa especialidade é extrair a máxima performance do seu ecossistema atual. Se a sua tecnologia atual for um limitador para a sua escala, nós faremos a recomendação e a migração técnica, mas nosso foco inicial é otimizar o que você já tem.</>}
              />
              <FAQItem 
                question="A Maesttro coloca a mão no código ou apenas diz o que fazer?" 
                answer={<>Temos os dois braços. Na nossa consultoria estratégica, entregamos o roadmap para o seu time. Já no nosso braço de Engenharia, nós mesmos desenvolvemos soluções, sistemas e otimizações técnicas para garantir que a execução seja impecável.</>}
              />
              <FAQItem 
                question="Vocês fazem integração de sistemas sob medida?" 
                answer={<>Sim. Nosso braço de tecnologia é focado em criar soluções que conectam sua operação, desde integrações de ERP até sistemas personalizados para melhorar a experiência do seu cliente.</>}
              />
              <FAQItem 
                question="A Maesttro substitui minha agência atual?" 
                answer={<>Não necessariamente. Atuamos como a inteligência que rege a operação. Podemos trabalhar em conjunto com sua agência atual para garantir que o tráfego que eles trazem chegue em um site que realmente converte.</>}
              />
              <FAQItem 
                question="Como vocês garantem que os dados do meu e-commerce estão corretos?" 
                answer={<>Através da nossa Arquitetura de Dados. Implementamos camadas avançadas de Web Analytics e rastreamento para garantir que você tome decisões baseadas em fatos, eliminando o "achismo" da sua gestão.</>}
              />
              <FAQItem 
                question="Você entende da minha plataforma?" 
                answer={<>Sabemos extrair o melhor de cada plataforma, identificando limitações e oportunidades técnicas.</>}
              />
              <FAQItem 
                question="Como funciona o modelo de orçamento?" 
                answer={<>Trabalhamos com um modelo de orçamento fechado por projeto/diagnóstico ou fee mensal para acompanhamento contínuo (regência). Isso garante previsibilidade e foco total na entrega de valor.</>}
              />
              <FAQItem 
                question="Qual o principal KPI que vocês acompanham?" 
                answer={<>Embora olhemos princialmente para ROI e ROAS, nosso KPI mestre é o Lucro Líquido da operação. A harmonia só existe quando a música gera resultado financeiro real.</>}
              />
            </motion.div>
          </div>
        </section>

        {/* FOOTER / CTA FINAL */}
        <section className="py-20 md:py-24 bg-brand-900 dark:bg-zinc-900 text-white relative overflow-hidden transition-colors duration-700 ease-in-out">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 to-brand-700" />
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-7xl mx-auto px-4 text-center relative z-10"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 tracking-tight leading-tight">A regência estratégica que o seu <br className="hidden md:block" /> e-commerce precisa para escalar.</h2>
            <p className="text-lg md:text-xl text-zinc-400 dark:text-zinc-500 mb-10 md:mb-12 max-w-2xl mx-auto px-4">
              Não deixe sua operação desafinar. Agende seu diagnóstico hoje mesmo.
            </p>
            <Button primary className="mx-auto text-base md:text-lg py-4 px-8 md:px-10" onClick={handleWhatsAppClick}>
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
              Falar com o Maesttro via WhatsApp
            </Button>
            
            <div className="mt-20 md:mt-24 pt-8 border-t border-white/10 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-2">
                <Logo className="w-8 h-8" white={true} />
                <span className="font-outfit font-bold text-lg tracking-tight uppercase">
                  Maes<span className="text-white">tt</span>ro
                </span>
              </div>
              <div className="text-zinc-500 dark:text-zinc-600 text-xs md:text-sm text-center md:text-left">
                © 2025 <b>Maesttro</b> - Tecnologia e Estratégia de E-commerce. <br className="md:hidden" /> Todos os direitos reservados.
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-zinc-400 dark:text-zinc-500 text-sm">
                <button onClick={() => navigate('/area-cliente')} className="hidden md:block hover:text-white dark:hover:text-brand-400 transition-colors">Área do Cliente</button>
                <a href="#" className="hover:text-white dark:hover:text-brand-400 transition-colors">Privacidade</a>
                <a href="#" className="hover:text-white dark:hover:text-brand-400 transition-colors">Termos</a>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      </div>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return (savedTheme as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <Routes>
          <Route path="/" element={<LandingPage theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/area-cliente" element={<ClientArea />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
