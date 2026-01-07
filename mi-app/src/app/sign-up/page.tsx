"use client";

import React from 'react';
import { 
  Globe, 
  Search, 
  User, 
  Menu, 
  X,
  Mail,
  Lock,
  UserPlus,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap
} from 'lucide-react';

/* ==========================================================================
   INTERFACES & TYPES
   ========================================================================== */
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

/* ==========================================================================
   SIMULATED COMPONENTS (Sincronizados con Log In)
   ========================================================================== */
const Link = ({ href, children, className, ...props }: LinkProps) => (
  <a href={href} className={className} {...props}>
    {children}
  </a>
);

/* ==========================================================================
   COMPONENTE: Header (Sincronizado)
   ========================================================================== */
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

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
   PAGE: Sign Up
   ========================================================================== */
export default function App() {
  const benefits = [
    { 
      title: "Eco-Tracking", 
      icon: <ShieldCheck className="text-blue-400" size={18} />, 
      desc: "Visualize your positive footprint.",
      hoverClass: "group-hover:text-blue-400",
      borderClass: "group-hover:border-blue-500/30"
    },
    { 
      title: "Priority Access", 
      icon: <Zap className="text-yellow-400" size={18} />, 
      desc: "Early booking for limited stays.",
      hoverClass: "group-hover:text-yellow-400",
      borderClass: "group-hover:border-yellow-500/30"
    },
    { 
      title: "Verified Stays", 
      icon: <CheckCircle2 className="text-emerald-400" size={18} />, 
      desc: "Certified regenerative lodges.",
      hoverClass: "group-hover:text-emerald-400",
      borderClass: "group-hover:border-emerald-500/30"
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

      <div className="relative z-10 flex flex-col w-full min-h-full pb-[60px]">
        {/* HERO SECTION */}
        <section className="px-6 md:px-0 pt-28 md:pt-40 pb-12 md:pb-20 max-w-7xl mx-auto w-full text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 hover:bg-white/10 transition-colors cursor-default">
            <UserPlus size={14} />
            Join the Movement
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-medium tracking-tight leading-[0.95] mb-8 md:mb-10 animate-in fade-in slide-in-from-top-4 duration-1000">
            Begin your <br /> <span className="text-white/40 italic font-light hover:text-white transition-colors duration-500 cursor-default">regeneration</span>
          </h1>
          <p className="text-white/60 text-base sm:text-2xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto tracking-tight animate-in fade-in duration-1000 delay-300">
            Create your account today and visualize your positive impact on the planet&apos;s most fragile corners.
          </p>
        </section>

        {/* SIGN UP FORM SECTION */}
        <section className="px-4 md:px-16 py-12 md:py-20 w-full max-w-7xl mx-auto md:bg-white/[0.01] md:rounded-[80px] md:border md:border-white/5 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Benefits Side */}
            <div className="lg:col-span-5 space-y-12 order-2 lg:order-1 pt-4">
              <div className="space-y-8">
                <h3 className="text-xs uppercase tracking-wider text-white/30 font-bold">Why join Earthly?</h3>
                <div className="space-y-8">
                  {benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-5 group cursor-default">
                      <div className={`w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-white/10 ${b.borderClass} shrink-0`}>
                        {b.icon}
                      </div>
                      <div className="space-y-1">
                        <span className={`text-lg font-medium text-white ${b.hoverClass} transition-colors block`}>{b.title}</span>
                        <p className="text-sm text-white/40 leading-relaxed font-light">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[35px] md:rounded-[45px] space-y-4 shadow-xl">
                <p className="text-sm font-light leading-relaxed italic text-white/40">
                  &quot;Your account is the first step towards a transparent and local-powered exploration.&quot;
                </p>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                  <div className="w-6 h-[1px] bg-emerald-400/30" />
                  Eco-Certified Platform
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="bg-[#0a0b10] border border-white/10 rounded-[40px] md:rounded-[50px] p-8 md:p-14 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-full -mr-48 -mt-48 transition-opacity pointer-events-none" />
                
                <form className="relative z-10 space-y-10" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex flex-col">
                    <label className="text-xs uppercase tracking-wide text-white/40 ml-4 font-bold mb-4">Full Name</label>
                    <div className="relative">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20"><User size={18} /></div>
                      <input 
                        type="text" 
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-[22px] py-5 pl-16 pr-6 text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.08] transition-all placeholder:text-white/10"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs uppercase tracking-wide text-white/40 ml-4 font-bold mb-4">Email Address</label>
                    <div className="relative">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20"><Mail size={18} /></div>
                      <input 
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-[22px] py-5 pl-16 pr-6 text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.08] transition-all placeholder:text-white/10"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs uppercase tracking-wide text-white/40 ml-4 font-bold mb-4">Security Phrase</label>
                    <div className="relative">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20"><Lock size={18} /></div>
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        className="w-full bg-white/5 border border-white/10 rounded-[22px] py-5 pl-16 pr-6 text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.08] transition-all placeholder:text-white/10"
                      />
                    </div>
                  </div>

                  <div className="pt-6">
                    <button className="w-full bg-white text-black py-5 rounded-[22px] font-bold text-xs tracking-wide uppercase transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] active:scale-95 flex items-center justify-center gap-3 group">
                      Create Earthly Account
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4 py-4">
                    <div className="h-[1px] flex-1 bg-white/5" />
                    <span className="text-[9px] uppercase tracking-widest text-white/20">or connect with</span>
                    <div className="h-[1px] flex-1 bg-white/5" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button type="button" className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-5 rounded-[22px] text-xs font-bold uppercase tracking-wide hover:bg-white/10 transition-all active:scale-95">
                      Google
                    </button>
                    <button type="button" className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-5 rounded-[22px] text-xs font-bold uppercase tracking-wide hover:bg-white/10 transition-all active:scale-95">
                      Apple
                    </button>
                  </div>

                  {/* ENLACE DE NAVEGACIÓN AGRANDADO */}
                  <p className="text-center text-xs md:text-sm text-white/30 pt-8">
                    Already have an account? <Link href="/log-in" className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors no-underline ml-1">Log In</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM MANIFESTO */}
        <section className="px-6 py-12 md:py-24 text-center max-w-7xl mx-auto w-full">
          <div className="w-px h-16 bg-gradient-to-b from-emerald-500 to-transparent mx-auto mb-10 md:mb-12 opacity-50 transition-all duration-1000" />
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-8">Ready to join?</h2>
          <p className="text-white/30 text-base md:text-xl font-light mb-12 italic hover:text-white/50 transition-colors cursor-default max-w-3xl mx-auto px-4">
            &quot;Empowering travelers to become guardians of the wild through transparency and regenerative impact.&quot;
          </p>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="px-6 py-12 border-t border-white/5 relative z-10 text-center">
        <p className="text-[10px] text-white/20 uppercase tracking-widest">
          EARTHLY TRAVEL PLATFORM • PRIVACY & SECURITY PROTECTED
        </p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        a.no-underline { text-decoration: none !important; }
        input::placeholder { color: rgba(255, 255, 255, 0.1); }
        body { background-color: #050609; margin: 0; }
      `}} />
    </main>
  );
}