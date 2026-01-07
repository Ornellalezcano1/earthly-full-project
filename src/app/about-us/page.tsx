"use client";

import React, { useState } from 'react';
// Importaciones reales de Next.js para resolver advertencias de ESLint y tipos
// En un entorno de producción, usarías:
// import Link from 'next/link';
// import Image from 'next/image';

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

interface Pillar {
  title: string;
  desc: string;
  icon: React.ReactNode;
  hoverText: string;
  hoverBorder: string;
}

interface NavItem {
  name: string;
  href: string;
}

/* ==========================================================================
   SIMULATED COMPONENTS (Para entorno de previsualización)
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const navItems: NavItem[] = [
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

// Importación diferida de iconos para evitar errores de SSR en este entorno
import { 
  Leaf, 
  Globe, 
  Search, 
  User, 
  ArrowUpRight, 
  Fingerprint, 
  Compass, 
  Menu, 
  X 
} from 'lucide-react';

/* ==========================================================================
   PAGE: About Us
   ========================================================================== */
export default function App() {
  const pillars: Pillar[] = [
    { 
      title: "Sustainable Stewardship", 
      desc: "Earthly is not just a catalog; it's a filter. We evaluate every lodge and experience under rigorous ecological standards.", 
      icon: <Fingerprint className="text-blue-400" size={24} />,
      hoverText: "group-hover:text-blue-300",
      hoverBorder: "hover:border-blue-500/30"
    },
    { 
      title: "Interactive Impact", 
      desc: "Through our Eco Travel Globe, we visualize global data to guide you toward areas where your presence fosters conservation.", 
      icon: <Globe className="text-yellow-400" size={24} />,
      hoverText: "group-hover:text-yellow-300",
      hoverBorder: "hover:border-yellow-500/30"
    },
    { 
      title: "Ancestral Wisdom", 
      desc: "We blend modern luxury with ancient environmental management by partnering directly with local cultures.", 
      icon: <Compass className="text-emerald-400" size={24} />,
      hoverText: "group-hover:text-emerald-300",
      hoverBorder: "hover:border-emerald-500/30"
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
        {/* HERO SECTION - Espaciado reducido */}
        <section className="px-4 md:px-0 pt-28 md:pt-40 pb-12 md:pb-20 max-w-7xl mx-auto w-full text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold uppercase tracking-[0.1em] text-blue-400 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 hover:bg-white/10 transition-colors cursor-default">
            <Leaf size={14} />
            The Earthly Manifesto
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-medium tracking-tighter leading-[0.95] mb-8 md:mb-10 animate-in fade-in slide-in-from-top-4 duration-1000">
            A new era of <br /> <span className="text-white/40 italic font-light hover:text-white transition-colors duration-500 cursor-default">regenerative travel</span>
          </h1>
          <p className="text-white/60 text-base sm:text-2xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto tracking-tight animate-in fade-in duration-1000 delay-300">
            Earthly was born from a simple idea: travel should give back more than it takes. We are a digital ecosystem dedicated to the preservation of our planet&apos;s most fragile corners.
          </p>
        </section>

        {/* ECO TRAVEL GLOBE DEEP DIVE - Espaciado reducido */}
        <section className="px-4 md:px-0 py-12 md:py-20 w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-40 items-center">
            <div className="space-y-6 md:space-y-8 text-left">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight">The Eco Travel Globe</h2>
              <p className="text-white/50 text-base md:text-lg font-light leading-relaxed italic">
                Our core innovation isn&apos;t just a map; it&apos;s the living pulse of the planet.
              </p>
              <p className="text-white/40 text-base font-light leading-relaxed">
                The Eco Travel Globe serves as the analytical heart of Earthly. It integrates real-time environmental data with our luxury network, allowing travelers to visualize the ecological health of their destination.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 text-sm font-medium text-blue-400 uppercase tracking-widest group cursor-default">
                  <div className="w-8 h-px bg-blue-400 transition-all group-hover:w-12" />
                  Visualize Health
                </div>
                <div className="flex items-center gap-4 text-sm font-medium text-emerald-400 uppercase tracking-widest group cursor-default">
                  <div className="w-8 h-px bg-emerald-400 transition-all group-hover:w-12" />
                  Map Sustainability
                </div>
              </div>
            </div>
            <div className="relative aspect-square lg:aspect-video rounded-[40px] md:rounded-[60px] overflow-hidden border border-white/10 group shadow-2xl shadow-blue-500/10 cursor-pointer">
              <Image 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200" 
                alt="Technology and Earth" 
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-[4000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-black/60 opacity-60 group-hover:opacity-30 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center animate-pulse group-hover:scale-125 group-hover:bg-white/20 transition-all duration-500">
                    <Globe className="text-white" size={32} />
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* PILLARS GRID - Espaciado reducido */}
        <section className="px-4 md:px-16 py-12 md:py-20 w-full max-w-7xl mx-auto md:bg-white/[0.01] md:rounded-[80px] md:border md:border-white/5 shadow-2xl">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight cursor-default hover:tracking-wide transition-all duration-700">Our Strategic Pillars</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {pillars.map((p, i) => (
              <div 
                key={i} 
                className={`bg-white/[0.03] border border-white/10 p-8 md:p-10 rounded-[35px] md:rounded-[45px] hover:bg-white/[0.07] ${p.hoverBorder} hover:-translate-y-1.5 transition-all duration-500 group cursor-default shadow-xl shadow-black/20`}
              >
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-transform duration-500">
                  {p.icon}
                </div>
                <h3 className={`text-xl md:text-xl font-medium mb-4 ${p.hoverText} transition-colors`}>{p.title}</h3>
                <p className="text-white/40 text-sm md:text-base font-light leading-relaxed group-hover:text-white/70 transition-colors">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PHILOSOPHY SECTION - Espaciado reducido */}
        <section className="px-4 md:px-16 py-12 md:py-20 w-full max-w-7xl mx-auto bg-white/[0.02] md:bg-white/[0.01] rounded-[40px] md:rounded-[80px] border border-white/5 relative overflow-hidden shadow-2xl transition-all duration-700 mt-12 md:mt-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -mr-64 -mt-64 transition-opacity group-hover:opacity-80" />
          
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="w-full md:w-1/2 relative z-10 space-y-6 md:space-y-8 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight">
                Inspiring responsible <br className="hidden md:block" /> exploration
              </h2>
              <p className="text-white/50 text-base md:text-xl font-light leading-relaxed">
                We believe travel should be a force for good. Our philosophy values the planet&apos;s natural beauty while protecting it for future generations through transparency and local empowerment.
              </p>
              <div className="pt-2 md:pt-4">
                <Link href="https://eco-travel-globe-earthly.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-medium border-b border-white/20 pb-1 hover:border-blue-400 hover:text-blue-300 transition-all group no-underline">
                  Explore the Eco Globe
                  <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 relative h-[250px] sm:h-[300px] md:h-[450px] rounded-[30px] md:rounded-[40px] overflow-hidden border border-white/10 shadow-inner group-hover:border-white/30 transition-all">
              <Image 
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200" 
                alt="Earthly Landscape" 
                fill
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[3000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b10] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            </div>
          </div>
        </section>

        {/* VALUES / JOIN THE MOVEMENT - Espaciado reducido */}
        <section className="px-4 md:px-0 py-12 md:py-20 text-center max-w-7xl mx-auto">
          <div className="w-px h-12 md:h-16 bg-gradient-to-b from-blue-500 to-transparent mx-auto mb-8 md:mb-10 opacity-50 group-hover:h-24 transition-all duration-1000" />
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-8">Join the movement</h2>
          <p className="text-white/30 text-base md:text-lg font-light mb-10 md:mb-12 italic hover:text-white/50 transition-colors cursor-default px-4 max-w-4xl mx-auto">
            &quot;We do not inherit the earth from our ancestors, we borrow it from our children.&quot;
          </p>
          <div className="flex justify-center gap-4 px-1">
            <Link 
              href="/destinations" 
              className="px-8 md:px-10 py-3.5 md:py-4 bg-white !text-black no-underline rounded-[20px] font-bold text-[11px] md:text-xs tracking-[0.12em] uppercase transition-all duration-500 ease-out hover:scale-105 hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] active:scale-95 flex items-center justify-center w-full md:w-auto md:min-w-[220px]"
              style={{ color: '#000000' }}
            >
              Start your journey
            </Link>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="px-4 md:px-[30px] py-10 md:py-12 border-t border-white/5 relative z-10 text-center group cursor-default">
        <p className="text-[9px] md:text-[10px] text-white/20 uppercase tracking-[0.3em] md:tracking-[0.4em] group-hover:text-blue-400 transition-all duration-700">
          EARTHLY TRAVEL PLATFORM • THE FUTURE OF SUSTAINABILITY
        </p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        a.no-underline { text-decoration: none !important; }
      `}} />
    </main>
  );
}