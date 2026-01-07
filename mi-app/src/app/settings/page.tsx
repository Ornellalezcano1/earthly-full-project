"use client";

import React, { useState } from 'react';
// Importaciones reales de Next.js para entorno local
// import Link from 'next/link';
// import Image from 'next/image';

import { 
  Globe, 
  Search, 
  User, 
  Menu, 
  X,
  ChevronRight,
  Bell,
  Eye,
  Languages,
  LogOut,
  Trash2,
  Lock,
  Settings,
  Check,
  CreditCard,
  Plus,
  Info,
  FileText,
  BookOpen
} from 'lucide-react';

/* ==========================================================================
   INTERFACES & TYPES
   ========================================================================== */
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

interface ImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
}

interface SettingsState {
  twoFactor: boolean;
  realTimeLocation: boolean;
  contributionVisibility: boolean;
  impactBadges: boolean;
  ecosystemAlerts: boolean;
  newLodges: boolean;
  missions: boolean;
  language: string;
  currency: string;
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

interface SettingCard {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  label: string;
  colorClass: string;
  hoverText: string;
  hoverBorder: string;
}

/* ==========================================================================
   SIMULATED COMPONENTS (Sincronizados con About Us)
   ========================================================================== */
const Link = ({ href, children, className, ...props }: LinkProps) => (
  <a href={href} className={className} {...props}>
    {children}
  </a>
);

const Image = ({ src, alt, fill, className }: ImageProps) => (
  /* eslint-disable-next-line @next/next/no-img-element */
  <img 
    src={src} 
    alt={alt} 
    className={`${className} ${fill ? 'absolute inset-0 w-full h-full' : ''}`} 
    loading="lazy"
  />
);

/* ==========================================================================
   COMPONENTE: Header
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
   COMPONENTE: SettingsModal
   ========================================================================== */
const SettingsModal = ({ isOpen, onClose, title, children }: SettingsModalProps) => {
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
   PAGE: Settings
   ========================================================================== */
export default function App() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  
  const [settings, setSettings] = useState<SettingsState>({
    twoFactor: true,
    realTimeLocation: false,
    contributionVisibility: true,
    impactBadges: true,
    ecosystemAlerts: true,
    newLodges: true,
    missions: false,
    language: 'English (US)',
    currency: 'USD ($)'
  });

  const toggleSetting = (key: keyof SettingsState) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const settingCards: SettingCard[] = [
    { 
      id: 'security',
      title: "Security & Access", 
      desc: "Manage your password and two-factor authentication to protect your expeditions.", 
      icon: <Lock className="text-blue-400" size={24} />,
      label: "Configure Security",
      colorClass: "text-blue-400",
      hoverText: "group-hover:text-blue-300",
      hoverBorder: "hover:border-blue-500/30"
    },
    { 
      id: 'privacy',
      title: "Globe Privacy", 
      desc: "Control what impact and location data you share in real-time with the community.", 
      icon: <Eye className="text-yellow-400" size={24} />,
      label: "Data Visibility",
      colorClass: "text-yellow-400",
      hoverText: "group-hover:text-yellow-300",
      hoverBorder: "hover:border-yellow-500/30"
    },
    { 
      id: 'payments',
      title: "Payment Methods", 
      desc: "Manage your secure billing methods for booking stays and sustainable tours.", 
      icon: <CreditCard className="text-emerald-400" size={24} />,
      label: "Manage Cards",
      colorClass: "text-emerald-400",
      hoverText: "group-hover:text-emerald-300",
      hoverBorder: "hover:border-emerald-500/30"
    },
    { 
      id: 'documents',
      title: "Travel Documents", 
      desc: "Securely store and manage your passports and health certifications for upcoming trips.", 
      icon: <FileText className="text-blue-400" size={24} />,
      label: "Upload Docs",
      colorClass: "text-blue-400",
      hoverText: "group-hover:text-blue-300",
      hoverBorder: "hover:border-blue-500/30"
    }
  ];

  return (
    <main className="relative w-full h-svh bg-[#050609] font-sans text-white overflow-x-hidden overflow-y-auto selection:bg-indigo-500/30 scrollbar-hide">
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none">
        <div className="absolute top-[80px] left-[-200px] w-[900px] h-[900px] bg-blue-900/10 blur-[160px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 right-[-200px] w-[700px] h-[700px] bg-teal-900/10 blur-[140px] rounded-full" />
      </div>

      <Header />

      <div className="relative z-10 flex flex-col w-full min-h-full">
        
        {/* HERO SECTION - Sincronizado con About Us pt/pb */}
        <section className="px-4 md:px-0 pt-28 md:pt-40 pb-12 md:pb-20 max-w-7xl mx-auto w-full text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold uppercase tracking-[0.1em] text-blue-400 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 hover:bg-white/10 transition-colors cursor-default">
            <Settings size={14} />
            Control Center
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-medium tracking-tighter leading-[0.95] mb-8 md:mb-10 animate-in fade-in slide-in-from-top-4 duration-1000">
            Account <br /> <span className="text-white/40 italic font-light hover:text-white transition-colors duration-500 cursor-default">preferences</span>
          </h1>
          <p className="text-white/60 text-base sm:text-2xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto tracking-tight animate-in fade-in duration-1000 delay-300">
            Manage your regenerative journey preferences, billing methods, and global environmental footprint visibility.
          </p>
        </section>

        {/* CORE SETTINGS GRID - Sincronizado py y border style */}
        <section className="px-4 md:px-16 py-12 md:py-20 w-full max-w-7xl mx-auto md:bg-white/[0.01] md:rounded-[80px] md:border md:border-white/5 shadow-2xl">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight cursor-default hover:tracking-wide transition-all duration-700">Profile Management</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {settingCards.map((card, i) => (
              <div 
                key={i} 
                onClick={() => setActiveModal(card.id)}
                className={`bg-white/[0.03] border border-white/10 p-8 md:p-10 rounded-[35px] md:rounded-[45px] hover:bg-white/[0.07] ${card.hoverBorder} hover:-translate-y-1.5 transition-all duration-500 group cursor-pointer shadow-xl shadow-black/20 flex flex-col items-start text-left active:scale-[0.98]`}
              >
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-transform duration-500">
                  {card.icon}
                </div>
                <h3 className={`text-xl md:text-xl font-medium mb-4 ${card.hoverText} transition-colors`}>{card.title}</h3>
                <p className="text-white/40 text-sm md:text-base font-light leading-relaxed mb-8 group-hover:text-white/70 transition-colors">
                  {card.desc}
                </p>
                <div className={`mt-auto flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${card.colorClass} ${card.hoverText} transition-colors`}>
                  {card.label}
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* REGIONAL SETTINGS & ALERTS - Sincronizado py, mt y border style */}
        <section className="px-4 md:px-16 py-12 md:py-20 w-full max-w-7xl mx-auto bg-white/[0.02] md:bg-white/[0.01] rounded-[40px] md:rounded-[80px] border border-white/5 relative overflow-hidden shadow-2xl transition-all duration-700 mt-12 md:mt-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -mr-64 -mt-64 transition-opacity group-hover:opacity-100" />
          
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="w-full md:w-1/2 relative z-10 space-y-6 md:space-y-8 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight">
                Global <br className="hidden md:block" /> Localization
              </h2>
              <p className="text-white/50 text-base md:text-xl font-light leading-relaxed">
                Adjust your communication channels and regional display units for your environmental impact metrics.
              </p>
              
              <div className="space-y-4 pt-4">
                <div 
                  onClick={() => setActiveModal('language')}
                  className="flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-[25px] group/item hover:bg-white/[0.08] transition-all cursor-pointer"
                >
                    <div className="flex items-center gap-4">
                      <Languages className="text-white/30" size={18} />
                      <span className="text-sm font-medium">Interface Language</span>
                    </div>
                    <span className="text-xs text-blue-400 font-bold uppercase tracking-widest flex items-center gap-2">
                      {settings.language}
                      <ChevronRight size={14} />
                    </span>
                </div>
                
                <div 
                  onClick={() => setActiveModal('notifications')}
                  className="flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-[25px] group/item hover:bg-white/[0.08] transition-all cursor-pointer"
                >
                    <div className="flex items-center gap-4">
                      <Bell className="text-white/30" size={18} />
                      <span className="text-sm font-medium">Push Notifications</span>
                    </div>
                    <span className="text-xs text-blue-400 font-bold uppercase tracking-widest flex items-center gap-2">
                      Configure
                      <ChevronRight size={14} />
                    </span>
                </div>

                <div 
                  onClick={() => setActiveModal('currency')}
                  className="flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-[25px] group/item hover:bg-white/[0.08] transition-all cursor-pointer"
                >
                    <div className="flex items-center gap-4">
                      <CreditCard className="text-white/30" size={18} />
                      <span className="text-sm font-medium">Display Currency</span>
                    </div>
                    <span className="text-xs text-blue-400 font-bold uppercase tracking-widest flex items-center gap-2">
                      {settings.currency}
                      <ChevronRight size={14} />
                    </span>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 relative h-[250px] sm:h-[300px] md:h-[450px] rounded-[30px] md:rounded-[40px] overflow-hidden border border-white/10 shadow-inner group-hover:border-white/30 transition-all">
              <Image 
                src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1200" 
                alt="Majestic Landscape" 
                fill
                className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[3000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b10] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            </div>
          </div>
        </section>

        {/* BOTTOM SESSION CONTROL - Sincronizado py y estilo linea */}
        <section className="px-4 md:px-0 py-12 md:py-20 text-center max-w-7xl mx-auto">
          <div className="w-px h-12 md:h-16 bg-gradient-to-b from-blue-500 to-transparent mx-auto mb-8 md:mb-10 opacity-50 group-hover:h-24 transition-all duration-1000" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-8">Session Control</h2>
          <p className="text-white/30 text-base md:text-lg font-light mb-10 md:mb-12 italic hover:text-white/50 transition-colors cursor-default px-4 max-w-4xl mx-auto">
            &quot;System integrity ensures that every footprint you leave on the globe is accurately tracked.&quot;
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 px-1">
            <Link 
              href="/destinations" 
              className="px-8 md:px-10 py-3.5 md:py-4 bg-white !text-black no-underline rounded-[20px] font-bold text-[11px] md:text-xs tracking-[0.12em] uppercase transition-all duration-500 ease-out hover:scale-105 hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] active:scale-95 flex items-center justify-center w-full md:w-auto md:min-w-[220px]"
              style={{ color: '#000000' }}
            >
              <LogOut size={16} className="mr-3" />
              Sign Out Session
            </Link>
            <button className="px-8 md:px-10 py-3.5 md:py-4 bg-white/5 border border-white/10 text-white/40 rounded-[20px] font-bold text-[11px] md:text-xs tracking-[0.12em] uppercase transition-all duration-500 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 active:scale-95 flex items-center justify-center gap-3">
              <Trash2 size={16} />
              Remove Account
            </button>
          </div>
        </section>
      </div>

      {/* OVERLAYS FUNCIONALES */}
      
      {/* 1. Security */}
      <SettingsModal 
        isOpen={activeModal === 'security'} 
        onClose={() => setActiveModal(null)} 
        title="Security & Access"
      >
        <div className="space-y-6">
          <div className="p-5 bg-white/5 border border-white/5 rounded-2xl group cursor-default hover:bg-white/10 transition-all duration-300">
            <label className="text-[10px] uppercase tracking-widest text-white/40 mb-3 block">Account Security Phrase</label>
            <div className="flex justify-between items-center">
              <span className="text-white font-mono tracking-widest">••••••••••••</span>
              <button className="text-[10px] font-bold text-blue-400 uppercase">Change</button>
            </div>
          </div>
          
          <div 
            onClick={() => toggleSetting('twoFactor')}
            className="flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-2xl cursor-pointer hover:bg-white/[0.08] transition-all"
          >
            <div className="space-y-1">
              <span className="text-sm font-medium block">Two-Factor Authentication</span>
              <span className="text-xs text-white/30 block">Add an extra layer of protection.</span>
            </div>
            <div className={`w-11 h-6 rounded-full relative transition-all duration-300 ${settings.twoFactor ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-white/10'}`}>
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${settings.twoFactor ? 'right-1' : 'left-1'}`} />
            </div>
          </div>
        </div>
      </SettingsModal>

      {/* 2. Privacidad */}
      <SettingsModal 
        isOpen={activeModal === 'privacy'} 
        onClose={() => setActiveModal(null)} 
        title="Globe Privacy"
      >
        <div className="space-y-4">
          {[
            { id: 'realTimeLocation', label: 'Real-time Globe Location' },
            { id: 'contributionVisibility', label: 'Contribution Amount visibility' },
            { id: 'impactBadges', label: 'Digital Impact Badges' }
          ].map((item) => (
            <div 
              key={item.id} 
              onClick={() => toggleSetting(item.id as keyof SettingsState)}
              className="flex items-center justify-between p-5 bg-white/5 rounded-2xl cursor-pointer hover:bg-white/[0.08] transition-all"
            >
              <span className="text-sm">{item.label}</span>
              <div className={`w-11 h-6 rounded-full relative transition-all duration-300 ${settings[item.id as keyof SettingsState] ? 'bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]' : 'bg-white/10'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${settings[item.id as keyof SettingsState] ? 'right-1' : 'left-1'}`} />
              </div>
            </div>
          ))}
        </div>
      </SettingsModal>

      {/* 3. Notificaciones */}
      <SettingsModal 
        isOpen={activeModal === 'notifications'} 
        onClose={() => setActiveModal(null)} 
        title="Notification Center"
      >
        <div className="space-y-4">
          {[
            { id: 'ecosystemAlerts', label: 'Ecosystem Regeneration Alerts', desc: 'Critical updates on your supported areas.' },
            { id: 'newLodges', label: 'New Sustainable Lodges', desc: 'Be the first to see new regenerative stays.' },
            { id: 'missions', label: 'Active Missions', desc: 'Daily challenges and contribution milestones.' }
          ].map((item) => (
            <div 
              key={item.id} 
              onClick={() => toggleSetting(item.id as keyof SettingsState)}
              className="flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-2xl cursor-pointer hover:bg-white/[0.08] transition-all"
            >
              <div className="space-y-1">
                <span className="text-sm font-medium block">{item.label}</span>
                <span className="text-xs text-white/30 block">{item.desc}</span>
              </div>
              <div className={`w-11 h-6 rounded-full relative transition-all duration-300 ${settings[item.id as keyof SettingsState] ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-white/10'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${settings[item.id as keyof SettingsState] ? 'right-1' : 'left-1'}`} />
              </div>
            </div>
          ))}
        </div>
      </SettingsModal>

      {/* 4. Pagos */}
      <SettingsModal 
        isOpen={activeModal === 'payments'} 
        onClose={() => setActiveModal(null)} 
        title="Payment Methods"
      >
        <div className="space-y-6">
          <div className="relative h-48 w-full bg-gradient-to-br from-emerald-600 to-teal-800 rounded-[25px] p-6 shadow-2xl flex flex-col justify-between overflow-hidden group transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
            <div className="flex justify-between items-start relative z-10">
              <CreditCard size={32} className="text-white/60" />
              <div className="flex gap-2">
                <div className="w-8 h-5 bg-white/20 rounded" />
                <div className="w-8 h-5 bg-white/40 rounded" />
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Active Card</p>
              <p className="text-white text-lg tracking-[0.25em]">•••• •••• •••• 4242</p>
            </div>
            <div className="flex justify-between items-end relative z-10">
              <p className="text-white/90 text-sm font-medium uppercase italic tracking-wider">Secured Billing</p>
              <p className="text-white/60 text-xs font-mono">12/28</p>
            </div>
          </div>
          
          <button className="w-full flex items-center justify-center gap-3 p-5 bg-white/5 border border-white/5 border-dashed rounded-2xl hover:bg-white/[0.08] transition-all group">
            <Plus size={18} className="text-white/30 group-hover:text-emerald-400 transition-colors" />
            <span className="text-sm font-medium text-white/50 group-hover:text-white">Add New Payment Method</span>
          </button>
        </div>
      </SettingsModal>

      {/* 5. Documentos */}
      <SettingsModal 
        isOpen={activeModal === 'documents'} 
        onClose={() => setActiveModal(null)} 
        title="Travel Documentation"
      >
        <div className="space-y-4">
          <div className="p-5 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between group cursor-default hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <BookOpen size={20} />
              </div>
              <div className="space-y-0.5">
                <span className="text-sm font-medium block">Passport (Main)</span>
                <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-widest flex items-center gap-1">
                  <Check size={10} /> Verified
                </span>
              </div>
            </div>
            <button className="text-[10px] font-bold text-white/30 hover:text-white uppercase transition-colors">View</button>
          </div>
          
          <button className="w-full flex items-center justify-center gap-3 p-5 bg-white/5 border border-white/5 border-dashed rounded-2xl hover:bg-white/[0.08] transition-all group">
            <Plus size={18} className="text-white/30 group-hover:text-blue-400 transition-colors" />
            <span className="text-sm font-medium text-white/50 group-hover:text-white">Add Passport or Visa</span>
          </button>

          <div className="flex items-start gap-4 p-5 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
            <Info size={18} className="text-blue-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-blue-300 leading-relaxed italic opacity-70">
              Documents are encrypted locally and only used for airport or lodge check-ins when you explicitly authorize it.
            </p>
          </div>
        </div>
      </SettingsModal>

      {/* 6. Idioma */}
      <SettingsModal 
        isOpen={activeModal === 'language'} 
        onClose={() => setActiveModal(null)} 
        title="Interface Language"
      >
        <div className="space-y-2">
          {['English (US)', 'Spanish (ES)', 'French (FR)', 'Japanese (JP)'].map((lang) => (
            <div 
              key={lang} 
              onClick={() => setSettings(p => ({ ...p, language: lang }))}
              className={`flex items-center justify-between p-5 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.01] ${settings.language === lang ? 'bg-white/10' : 'bg-white/5 hover:bg-white/[0.08]'}`}
            >
              <span className={`text-sm ${settings.language === lang ? 'text-white' : 'text-white/60'}`}>{lang}</span>
              {settings.language === lang && <Check size={18} className="text-blue-400 animate-in zoom-in" />}
            </div>
          ))}
        </div>
      </SettingsModal>

      {/* 7. Moneda */}
      <SettingsModal 
        isOpen={activeModal === 'currency'} 
        onClose={() => setActiveModal(null)} 
        title="Display Currency"
      >
        <div className="grid grid-cols-2 gap-3">
          {['USD ($)', 'EUR (€)', 'JPY (¥)', 'GBP (£)'].map((curr) => (
            <div 
              key={curr} 
              onClick={() => setSettings(p => ({ ...p, currency: curr }))}
              className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between hover:scale-[1.02] ${settings.currency === curr ? 'bg-white/10 border-blue-400/50 shadow-md shadow-blue-500/5' : 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10'}`}>
              <span className={`text-xs font-bold uppercase ${settings.currency === curr ? 'text-white' : 'text-white/40'}`}>{curr}</span>
              {settings.currency === curr && <Check size={16} className="text-blue-400 animate-in zoom-in" />}
            </div>
          ))}
        </div>
      </SettingsModal>

      {/* FOOTER */}
      <footer className="px-4 md:px-[30px] py-10 md:py-12 border-t border-white/5 relative z-10 text-center group cursor-default">
        <p className="text-[9px] md:text-[10px] text-white/20 uppercase tracking-[0.3em] md:tracking-[0.4em] group-hover:text-blue-400 transition-all duration-700">
          EARTHLY TRAVEL PLATFORM • SECURE CONFIGURATION CENTER
        </p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
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
        
        a.no-underline { text-decoration: none !important; }
      `}} />
    </main>
  );
}