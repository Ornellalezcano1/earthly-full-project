"use client";

import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  User, 
  Menu, 
  X,
  ChevronRight,
  HelpCircle,
  MessageSquare,
  LifeBuoy,
  FileText,
  ShieldCheck,
  ChevronDown,
  Info,
  CheckCircle2,
  MapPin
} from 'lucide-react';

/* ==========================================================================
   INTERFACES
   ========================================================================== */
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

interface HelpCategory {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  action: string;
  colorClass: string;
  hoverText: string;
  hoverBorder: string;
}

/* ==========================================================================
   SIMULATED COMPONENTS (Sincronizados con Settings/About Us/Profile)
   ========================================================================== */
const Link = ({ href, children, className, ...props }: LinkProps) => (
  <a href={href} className={className} {...props}>
    {children}
  </a>
);

const Image = ({ src, alt, className, fill }: { src: string; alt: string; className?: string; fill?: boolean }) => (
  /* eslint-disable-next-line @next/next/no-img-element */
  <img 
    src={src} 
    alt={alt} 
    className={`${className} ${fill ? 'absolute inset-0 w-full h-full object-cover' : ''}`} 
    loading="lazy"
  />
);

/* ==========================================================================
   COMPONENTE: Header (Sincronizado)
   ========================================================================== */
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'About Us', href: '/about-us' },
    { name: 'Globe', href: 'https://eco-travel-globe-earthly.vercel.app/' },
    { name: 'Settings', href: '/settings' },
    { name: 'Help/FAQ', href: '/help' },
    { name: 'Sign Up', href: '/sign-up' }
  ];

  return (
    <>
      <header className="absolute top-0 left-0 w-full z-50 px-0 md:px-[30px] py-1 md:py-6 flex justify-between items-center h-14 md:h-auto">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer no-underline relative z-50 pl-1 md:pl-0">
          <Globe 
            className="w-7 h-7 md:w-8 md:h-8 text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" 
            strokeWidth={1.5} 
          />
          <span className="text-white font-bold text-lg md:text-xl tracking-wide font-sans">
            EARTHLY
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 bg-white/10 backdrop-blur-md px-8 py-3 rounded-full border border-white/10 shadow-lg">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className="text-white text-sm font-medium transition-all duration-300 hover:scale-110 transform no-underline"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 z-50 pr-1 md:pr-0">
          <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 active:scale-95 border border-white/5">
            <Search size={18} />
          </button>
          
          <Link 
            href="/profile" 
            className="hidden md:flex w-10 h-10 rounded-full bg-white/10 items-center justify-center text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 active:scale-95 border border-white/5 no-underline"
          >
            <User size={18} />
          </Link>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-300 active:scale-95 border border-white/5"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-transform duration-500 md:hidden flex flex-col items-center justify-center ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <nav className="flex flex-col items-center gap-6">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="text-white text-sm font-medium tracking-widest transition-all duration-300 hover:text-white/70 no-underline uppercase">{item.name}</Link>
          ))}
          <Link 
              href="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white text-sm font-medium tracking-widest transition-all duration-300 hover:text-white/70 flex items-center gap-2 mt-4 border-t border-white/10 pt-6 no-underline uppercase"
          >
            <User size={16} />
            <span>Profile</span>
          </Link>
        </nav>
      </div>
    </>
  );
};

/* ==========================================================================
   COMPONENTE: FAQ Item (Accordion)
   ========================================================================== */
const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left group"
      >
        <span className="text-lg md:text-xl font-light text-white/80 group-hover:text-white transition-colors">{question}</span>
        <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transition-transform duration-500 ${isOpen ? 'rotate-180 bg-blue-500/20 text-blue-400' : 'text-white/20'}`}>
          <ChevronDown size={20} />
        </div>
      </button>
      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[300px] pb-8' : 'max-h-0'}`}>
        <p className="text-white/40 text-base leading-relaxed font-light">
          {answer}
        </p>
      </div>
    </div>
  );
};

/* ==========================================================================
   COMPONENTE: HelpModal
   ========================================================================== */
const HelpModal = ({ isOpen, onClose, title, children }: HelpModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[#0a0b10] border border-white/10 rounded-[35px] md:rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 ease-out">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <h3 className="text-xl font-medium tracking-tight text-white">{title}</h3>
          <button 
            onClick={onClose} 
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-all duration-300 hover:rotate-90 active:scale-90"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar text-white/70">
          {children}
        </div>
        <div className="p-8 bg-white/[0.02] border-t border-white/5">
          <button 
            onClick={onClose} 
            className="w-full bg-white text-black py-4 rounded-[20px] font-bold text-xs uppercase tracking-widest transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-95"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   PAGE: Help & Support
   ========================================================================== */
export default function App() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const helpCategories: HelpCategory[] = [
    { 
      id: 'booking',
      title: "Booking & Stays", 
      desc: "Learn about our regenerative lodge network, cancellation policies, and secure global payments.", 
      icon: <FileText className="text-blue-400" size={24} />,
      action: "Booking Guide",
      colorClass: "text-blue-400",
      hoverText: "group-hover:text-blue-300",
      hoverBorder: "hover:border-blue-500/30"
    },
    { 
      id: 'eco',
      title: "Eco Standards", 
      desc: "Understand the rigorous environmental and local impact criteria we apply to every experience.", 
      icon: <ShieldCheck className="text-emerald-400" size={24} />,
      action: "Our Eco Filter",
      colorClass: "text-emerald-400",
      hoverText: "group-hover:text-emerald-300",
      hoverBorder: "hover:border-emerald-500/30"
    },
    { 
      id: 'impact',
      title: "Globe Impact", 
      desc: "Discover how your travels contribute to ecosystem regeneration and how to track it in real-time.", 
      icon: <LifeBuoy className="text-yellow-400" size={24} />,
      action: "Impact Tracking",
      colorClass: "text-yellow-400",
      hoverText: "group-hover:text-yellow-300",
      hoverBorder: "hover:border-yellow-500/30"
    }
  ];

  const faqs = [
    {
      question: "How do I verify a lodge's sustainability?",
      answer: "Every lodge on Earthly undergoes a 12-point ecological audit. You can view the full sustainability report by clicking on the 'Eco-Certificate' icon on each lodge's profile page."
    },
    {
      question: "What is the regenerative impact contribution?",
      answer: "A portion of every booking is automatically directed to local conservation projects. You can choose specifically which ecosystem you'd like to support during the checkout process."
    },
    {
      question: "Can I cancel my expedition?",
      answer: "Yes, Earthly offers flexible cancellation up to 14 days before your trip. If you cancel, your carbon offset contribution remains active."
    },
    {
      question: "How does the Eco Travel Globe track my footprint?",
      answer: "The Globe integrates data from your transport and lodge energy usage to visualize your net-positive impact. Data is encrypted and only shared if authorized in Settings."
    }
  ];

  return (
    <main className="relative w-full h-svh bg-[#050609] font-sans text-white overflow-x-hidden overflow-y-auto selection:bg-indigo-500/30 scrollbar-hide">
      
      {/* Background Decor (Sincronizado) */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none">
        <div className="absolute top-[80px] left-[-200px] w-[900px] h-[900px] bg-blue-900/10 blur-[160px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 right-[-200px] w-[700px] h-[700px] bg-teal-900/10 blur-[140px] rounded-full" />
      </div>

      <Header />

      <div className="relative z-10 flex flex-col w-full min-h-full pb-[60px]">
        
        {/* HERO SECTION */}
        <section className="px-4 md:px-0 pt-28 md:pt-40 pb-12 md:pb-20 max-w-7xl mx-auto w-full text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold uppercase tracking-[0.1em] text-blue-400 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 hover:bg-white/10 transition-colors cursor-default">
            <HelpCircle size={14} />
            Help Center
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-medium tracking-tighter leading-[0.95] mb-8 md:mb-10 animate-in fade-in slide-in-from-top-4 duration-1000">
            How can we <br /> <span className="text-white/40 italic font-light hover:text-white transition-colors duration-500 cursor-default">guide you today</span>
          </h1>
          <p className="text-white/60 text-base sm:text-2xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto tracking-tight animate-in fade-in duration-1000 delay-300">
            Find answers about our regenerative travel platform or connect with our global concierge team for personalized assistance.
          </p>
        </section>

        {/* CORE SUPPORT GRID */}
        <section className="px-4 md:px-16 py-12 md:py-20 w-full max-w-7xl mx-auto md:bg-white/[0.01] md:rounded-[80px] md:border md:border-white/5 shadow-2xl">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight cursor-default hover:tracking-wide transition-all duration-700">Support Resources</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {helpCategories.map((cat, i) => (
              <div 
                key={i} 
                onClick={() => setActiveModal(cat.id)}
                className={`bg-white/[0.03] border border-white/10 p-8 md:p-10 rounded-[35px] md:rounded-[45px] hover:bg-white/[0.07] ${cat.hoverBorder} hover:-translate-y-1.5 transition-all duration-500 group cursor-pointer shadow-xl shadow-black/20 flex flex-col items-start text-left active:scale-[0.98]`}
              >
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-transform duration-500">
                  {cat.icon}
                </div>
                <h3 className={`text-xl md:text-xl font-medium mb-4 ${cat.hoverText} transition-colors`}>{cat.title}</h3>
                <p className="text-white/40 text-sm md:text-base font-light leading-relaxed mb-8 group-hover:text-white/70 transition-colors">{cat.desc}</p>
                <div className={`mt-auto flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${cat.colorClass} ${cat.hoverText} transition-colors`}>
                  {cat.action}
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="px-4 md:px-[30px] py-20 w-full max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">Frequently Asked</h2>
            <p className="text-white/30 text-lg font-light italic">Deep dive into Earthly mechanical frameworks</p>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>

        {/* CONCIERGE SECTION */}
        <section className="px-4 md:px-16 py-12 md:py-20 w-full max-w-7xl mx-auto bg-white/[0.02] md:bg-white/[0.01] rounded-[40px] md:rounded-[80px] border border-white/5 relative overflow-hidden shadow-2xl transition-all duration-700 mt-12 md:mt-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -mr-64 -mt-64 transition-opacity group-hover:opacity-100 pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="w-full md:w-1/2 relative z-10 space-y-6 md:space-y-8 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight">
                Concierge <br className="hidden md:block" /> & Direct Support
              </h2>
              <p className="text-white/50 text-base md:text-xl font-light leading-relaxed">
                Need personalized assistance planning your regenerative journey? Our team is available 24/7 to ensure your impact is positive.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={() => setActiveModal('chat')}
                  className="px-8 md:px-10 py-3.5 md:py-4 bg-white text-black rounded-[20px] font-bold text-[11px] md:text-xs tracking-[0.12em] uppercase transition-all duration-500 ease-out hover:scale-105 hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] active:scale-95 flex items-center justify-center gap-3"
                  style={{ color: '#000000' }}
                >
                  <MessageSquare size={16} />
                  Live Chat
                </button>
                <button 
                  onClick={() => setActiveModal('mail')}
                  className="px-8 md:px-10 py-3.5 md:py-4 bg-white/5 border border-white/10 text-white/70 rounded-[20px] font-bold text-[11px] md:text-xs tracking-[0.12em] uppercase transition-all duration-300 hover:bg-white/10 hover:text-white active:scale-95 flex items-center justify-center gap-3"
                >
                  Email Support
                </button>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 relative h-[250px] sm:h-[300px] md:h-[450px] rounded-[30px] md:rounded-[40px] overflow-hidden border border-white/10 shadow-inner group-hover:border-white/30 transition-all">
              <Image 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200" 
                alt="Concierge Service" 
                className="opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[3000ms]"
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b10] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            </div>
          </div>
        </section>

        {/* READY ACTION */}
        <section className="px-4 md:px-0 py-12 md:py-20 text-center max-w-7xl mx-auto">
          <div className="w-px h-12 md:h-16 bg-gradient-to-b from-blue-500 to-transparent mx-auto mb-8 md:mb-10 opacity-50 group-hover:h-24 transition-all duration-1000" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-8">Ready to explore</h2>
          <p className="text-white/30 text-base md:text-lg font-light mb-10 md:mb-12 italic hover:text-white/50 transition-colors cursor-default px-4 max-w-4xl mx-auto">
            &quot;The journey of a thousand miles begins with a single step towards conservation.&quot;
          </p>
          <div className="flex justify-center">
            <Link 
              href="/destinations" 
              className="px-8 md:px-10 py-3.5 md:py-4 bg-white !text-black no-underline rounded-[20px] font-bold text-[11px] md:text-xs tracking-[0.12em] uppercase transition-all duration-500 ease-out hover:scale-105 hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] active:scale-95 flex items-center justify-center w-full md:w-auto md:min-w-[220px]"
              style={{ color: '#000000' }}
            >
              Start Adventure
            </Link>
          </div>
        </section>
      </div>

      {/* OVERLAYS FUNCIONALES */}
      <HelpModal isOpen={activeModal === 'booking'} onClose={() => setActiveModal(null)} title="Booking Guide">
        <div className="space-y-6">
          <div className="flex items-start gap-4 p-5 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
            <Info size={20} className="text-blue-400 shrink-0 mt-0.5" />
            <p className="text-sm leading-relaxed">All expeditions include carbon-offset fees and direct ecosystem restoration contributions.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-widest text-blue-300">Payment Security</h4>
            <p className="text-sm leading-relaxed text-white/50">Transactions are encrypted via global ecological finance standards. Support for USD, EUR, and regional currencies.</p>
          </div>
        </div>
      </HelpModal>

      <HelpModal isOpen={activeModal === 'eco'} onClose={() => setActiveModal(null)} title="Our Eco Filter">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {[
              { label: 'Energy Neutrality', desc: '100% renewable energy reliance.' },
              { label: 'Zero Waste', desc: 'Circular waste management systems.' },
              { label: 'Local Wealth', desc: 'Direct employment and cultural support.' }
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-white/[0.03] border border-white/5 rounded-xl flex items-center gap-4">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                <div>
                  <span className="block text-sm font-medium text-white">{item.label}</span>
                  <span className="text-xs text-white/40">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </HelpModal>

      <HelpModal isOpen={activeModal === 'impact'} onClose={() => setActiveModal(null)} title="Impact Tracking">
        <div className="space-y-6">
          <div className="relative h-48 w-full rounded-[25px] border border-white/5 bg-white/[0.02] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-50" />
            <div className="relative z-10 flex flex-col items-center gap-3">
              <MapPin className="text-yellow-400 animate-bounce" size={48} />
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-yellow-500/50">Tracking Active</span>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-widest text-yellow-300">Real-time Metrics</h4>
            <p className="text-sm leading-relaxed text-white/50">Track restored areas, carbon sequestered, and species protected per journey.</p>
          </div>
        </div>
      </HelpModal>

      <HelpModal isOpen={activeModal === 'chat'} onClose={() => setActiveModal(null)} title="Earthly Concierge">
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center p-8 bg-blue-500/5 border border-blue-500/10 rounded-3xl gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                <User size={32} />
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-4 border-[#0a0b10] animate-pulse" />
            </div>
            <div className="text-center">
              <p className="text-white font-medium">Connecting with agent</p>
              <p className="text-xs text-white/40 mt-1">Status: Online</p>
            </div>
          </div>
        </div>
      </HelpModal>

      <footer className="px-4 md:px-[30px] py-10 md:py-12 border-t border-white/5 relative z-10 text-center group cursor-default">
        <p className="text-[9px] md:text-[10px] text-white/20 uppercase tracking-[0.3em] md:tracking-[0.4em] group-hover:text-blue-400 transition-all duration-700">
          EARTHLY TRAVEL PLATFORM • THE FUTURE OF SUSTAINABILITY
        </p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        a.no-underline { text-decoration: none !important; }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
      `}} />
    </main>
  );
}