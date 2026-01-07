"use client";

import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  User, 
  Menu, 
  X,
  Award,
  Wind,
  Zap,
  Map,
  Edit3,
  LogOut,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

/* ==========================================================================
   INTERFACES & TYPES
   ========================================================================== */
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

/* ==========================================================================
   SIMULATED COMPONENTS (Sincronizados con el ecosistema Earthly)
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
          <span className="text-white font-bold text-lg md:text-xl tracking-tight font-sans">
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
            <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="text-white text-sm font-medium tracking-wide transition-all duration-300 hover:text-white/70 no-underline uppercase">{item.name}</Link>
          ))}
          <Link 
              href="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white text-sm font-medium tracking-wide transition-all duration-300 hover:text-white/70 flex items-center gap-2 mt-4 border-t border-white/10 pt-6 no-underline uppercase"
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
   PAGE: Profile
   ========================================================================== */
export default function App() {
  const stats = [
    { title: "Eco-Points", value: "2,450", icon: <Zap className="text-yellow-400" size={18} /> },
    { title: "CO2 Offset", value: "1.2 Tons", icon: <Wind className="text-blue-400" size={18} /> },
    { title: "Trees Planted", value: "14", icon: <Globe className="text-emerald-400" size={18} /> }
  ];

  const badges = [
    { title: "Pioneer", desc: "First 1,000 members", icon: <Award className="text-blue-400" size={24} />, hover: "group-hover:text-blue-400" },
    { title: "Guardian", desc: "5+ sustainable stays", icon: <ShieldCheck className="text-emerald-400" size={24} />, hover: "group-hover:text-emerald-400" },
    { title: "Explorer", desc: "3 continents visited", icon: <Map className="text-purple-400" size={24} />, hover: "group-hover:text-purple-400" }
  ];

  return (
    <main className="relative w-full h-svh bg-[#050609] font-sans text-white overflow-x-hidden overflow-y-auto selection:bg-indigo-500/30 scrollbar-hide">
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none">
        <div className="absolute top-[80px] left-[-200px] w-[900px] h-[900px] bg-blue-900/10 blur-[160px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 right-[-200px] w-[700px] h-[700px] bg-teal-900/10 blur-[140px] rounded-full" />
      </div>

      <Header />

      <div className="relative z-10 flex flex-col w-full min-h-full pb-[60px]">
        
        {/* HERO SECTION - Perfil de Usuario */}
        <section className="px-6 md:px-0 pt-28 md:pt-40 pb-12 md:pb-20 max-w-7xl mx-auto w-full text-center">
          <div className="flex flex-col items-center gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="relative">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-[45px] overflow-hidden border border-white/10 p-1.5 bg-white/5 relative group">
                <Image 
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400" 
                  alt="Alex Rivers Profile" 
                  fill
                  className="rounded-[38px] transition-transform duration-700 group-hover:scale-110 object-cover"
                />
                <button className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Edit3 size={24} className="text-white" />
                </button>
              </div>
              <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-[#0a0b10] border border-white/10 rounded-2xl flex items-center justify-center text-blue-400 shadow-2xl">
                <Award size={20} />
              </div>
            </div>

            <div>
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-medium tracking-tight leading-[0.95] mb-6">
                Alex Rivers
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-3">
                 <span className="px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-bold uppercase tracking-wider text-blue-400">
                    Elite Guardian
                 </span>
                 <span className="text-white/30 text-xs md:text-sm font-light italic">Member since 2024</span>
              </div>
            </div>

            {/* Stats Row - Sincronizado con jerarquía de texto */}
            <div className="grid grid-cols-3 gap-2 md:gap-12 w-full max-w-3xl pt-10 border-t border-white/5">
              {stats.map((stat, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-white/40 mb-1">
                    {stat.icon}
                    <span className="text-[9px] md:text-[10px] uppercase tracking-wider font-bold hidden sm:block">{stat.title}</span>
                  </div>
                  <div className="text-lg md:text-3xl font-medium tracking-tight">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS GRID - Estilo Pillars de About Us */}
        <section className="px-4 md:px-16 py-12 md:py-24 w-full max-w-7xl mx-auto md:bg-white/[0.01] md:rounded-[80px] md:border md:border-white/5 shadow-2xl">
          <div className="text-center mb-12 md:mb-16">
            <h3 className="text-3xl md:text-4xl font-medium tracking-tight cursor-default hover:tracking-wide transition-all duration-700">Digital Achievements</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {badges.map((badge, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/10 p-8 md:p-10 rounded-[35px] md:rounded-[45px] hover:bg-white/[0.07] hover:border-white/20 hover:-translate-y-1.5 transition-all duration-500 group cursor-default shadow-xl shadow-black/20 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-transform duration-500">
                  {badge.icon}
                </div>
                <h3 className={`text-xl font-medium mb-3 transition-colors ${badge.hover}`}>{badge.title}</h3>
                <p className="text-white/40 text-sm font-light leading-relaxed group-hover:text-white/70 transition-colors">{badge.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ACTIVE JOURNEY - Estilo Philosophy / Deep Dive */}
        <section className="px-4 md:px-16 py-12 md:py-20 w-full max-w-7xl mx-auto mt-12 md:mt-20">
          <div className="bg-[#0a0b10] border border-white/10 rounded-[40px] md:rounded-[80px] p-8 md:p-20 flex flex-col md:flex-row items-center gap-12 md:gap-20 overflow-hidden relative group shadow-2xl transition-all duration-700">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -mr-64 -mt-64 transition-opacity group-hover:opacity-100 pointer-events-none" />
            
            <div className="w-full md:w-1/2 relative z-10 space-y-6 md:space-y-8 text-center md:text-left">
              <div className="inline-flex items-center gap-3 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Next Expedition
              </div>
              <h2 className="text-4xl md:text-6xl font-medium tracking-tight leading-tight">
                Patagonia <br className="hidden md:block" /> Glacial Trek<span className="text-emerald-500">.</span>
              </h2>
              <p className="text-white/50 text-base md:text-xl font-light leading-relaxed">
                Prepare for a 5-day regenerative immersion in the Los Glaciares National Park. Your footprint helps restore 45 hectares of native forest.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="px-8 py-4 bg-white text-black rounded-[22px] font-bold text-xs tracking-wide uppercase transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] active:scale-95 flex items-center justify-center gap-3">
                  Manage Journey
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 relative h-[300px] md:h-[450px] rounded-[30px] md:rounded-[45px] overflow-hidden border border-white/10 shadow-inner group-hover:border-white/30 transition-all">
              <Image 
                src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&q=80&w=1200" 
                alt="Active Trip" 
                fill
                className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[4000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b10] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            </div>
          </div>
        </section>

        {/* LOGOUT AREA */}
        <section className="px-6 py-12 md:py-24 text-center max-w-4xl mx-auto">
          <div className="w-px h-12 md:h-16 bg-gradient-to-b from-blue-500 to-transparent mx-auto mb-10 md:mb-12 opacity-30" />
          <button className="inline-flex items-center gap-3 px-10 py-4 bg-white/5 border border-white/10 text-white/40 rounded-[22px] font-bold text-xs tracking-wide uppercase transition-all hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 active:scale-95">
            <LogOut size={16} />
            Sign Out Session
          </button>
          <p className="text-[10px] text-white/10 uppercase tracking-[0.4em] mt-8">Earthly Profile System &bull; Secured Access</p>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="px-6 py-12 border-t border-white/5 relative z-10 text-center">
        <p className="text-[10px] text-white/20 uppercase tracking-widest font-medium">
          EARTHLY TRAVEL PLATFORM &bull; GUARDIAN OF THE WILD
        </p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        a.no-underline { text-decoration: none !important; }
        body { background-color: #050609; margin: 0; }
      `}} />
    </main>
  );
}