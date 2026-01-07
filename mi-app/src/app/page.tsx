"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Map,
  Compass,
  Home as HomeIcon,
  Heart,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Globe,
  Search,
  User,
  Menu,
  X
} from 'lucide-react';

/* ==========================================================================
   COMPONENTE: Header
   ========================================================================== */
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Actualizado: La ruta ahora apunta a /globe-eco para coincidir con tu carpeta
  const navItems = [
    { name: 'About Us', href: '/about-us' },
    { name: 'Globe', href: '/globe-eco' }, 
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

      {/* OVERLAY MENÚ MOBILE */}
      <div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-transform duration-500 md:hidden flex flex-col items-center justify-center ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <nav className="flex flex-col items-center gap-6">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white text-sm font-medium tracking-widest transition-all duration-300 hover:text-white/70 no-underline uppercase"
            >
              {item.name}
            </Link>
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
   VISTA: HomeView
   ========================================================================== */
const HomeView = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const destinationsData = [
    { id: 1, image: '/Popular_1.jpg', text: 'Tranquil lakes and majestic peaks await.', price: '$400' },
    { id: 2, image: '/Popular_2.jpg', text: 'Hike ancient trails and crystal-clear rivers.', price: '$400' },
    { id: 3, image: '/Popular_3.jpg', text: 'Explore alpine meadows and iconic summits.', price: '$400' },
    { id: 4, image: '/Popular_4.jpg', text: 'Relax on hidden beaches and turquoise waters.', price: '$400' },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const firstCard = current.querySelector('div');
      
      if (firstCard) {
        const cardWidth = (firstCard as HTMLElement).offsetWidth;
        const gap = parseInt(window.getComputedStyle(current).columnGap) || 0;
        const stepSize = cardWidth + gap;
        
        const currentIndex = Math.round(current.scrollLeft / stepSize);
        const maxIndex = destinationsData.length - 1;
        
        let targetIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
        targetIndex = Math.max(0, Math.min(targetIndex, maxIndex));
        
        current.scrollTo({
          left: targetIndex * stepSize,
          behavior: 'smooth'
        });
      }
    }
  };

  const categories = [
    { name: 'Destinations', icon: <Map className="w-6 h-6 text-white" />, href: '/destinations' },
    { name: 'Experiences', icon: <Compass className="w-6 h-6 text-white" />, href: '/experiences' },
    { name: 'Lodges', icon: <HomeIcon className="w-6 h-6 text-white" />, href: '/lodges' },
    { name: 'Wishlist', icon: <Heart className="w-6 h-6 text-white" />, href: '/wishlist' },
  ];

  return (
    <div className="flex-1 relative flex flex-col w-full h-full overflow-hidden px-1 md:px-[30px] pb-2 md:pb-0">
      
      {/* HERO SECTION */}
      <section className="flex-1 flex flex-col items-center justify-center text-center pt-14 md:pt-16 mt-0 md:mt-12 w-full">
        <h1 className="text-white text-[8.5vw] sm:text-6xl md:text-7xl font-medium tracking-tight leading-tight drop-shadow-2xl animate-in slide-in-from-top duration-700 whitespace-nowrap w-full text-center">
          Discover Destinations
        </h1>
        <h2 className="mt-2 text-white/80 text-[4.4vw] sm:text-2xl md:text-2xl font-light whitespace-nowrap w-full text-center">
          Sustainable adventures start here
        </h2>

        <div className="mt-10 flex flex-row justify-start md:justify-center gap-8 md:gap-14 items-center w-full pl-1 md:pl-0 md:mt-14 overflow-x-auto md:overflow-visible scrollbar-hide py-4 md:py-6">
          {categories.map((cat, index) => (
            <Link 
              key={index} 
              href={cat.href} 
              className="flex flex-col items-center gap-2 cursor-pointer group no-underline shrink-0 md:w-[120px]"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20 shadow-lg shadow-black/20">
                {cat.icon}
              </div>
              <span className="text-white text-[11px] md:text-[13px] font-light tracking-widest text-center uppercase whitespace-nowrap">
                {cat.name}
              </span>
            </Link>
          ))}
          <div className="shrink-0 w-4 md:hidden" />
        </div>
      </section>

      {/* CARDS SECTION */}
      <section className="w-full z-20 pb-4 md:pb-0 mt-auto mb-4 md:mb-0">
        <div className="flex justify-between items-end mb-4 w-full px-1 md:px-0">
          <h2 className="text-white text-lg md:text-2xl font-medium tracking-tight opacity-90">Popular Now</h2>
          <div className="flex gap-4">
            <button 
              onClick={() => scroll('left')}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition backdrop-blur-sm active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition backdrop-blur-sm active:scale-95"
            >
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex xl:justify-between justify-start gap-4 md:gap-6 overflow-x-auto snap-x scrollbar-hide w-full items-center pb-6 md:pb-6"
        >
          {destinationsData.map((dest) => (
            <div 
              key={dest.id} 
              className="relative shrink-0 w-64 h-52 md:w-[23%] md:h-72 rounded-[30px] md:rounded-[35px] bg-black/10 overflow-hidden snap-center group cursor-pointer shadow-xl shadow-black/30 isolate transform-gpu"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <Image 
                src={dest.image} 
                alt="Destination" 
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 z-0" 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-10" />
              
              <div className="absolute top-4 right-4 w-8 h-8 md:w-10 md:h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition z-20 transform-gpu">
                <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </div>

              <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 flex justify-between items-end gap-3 z-20 transform-gpu">
                <p className="text-white text-sm md:text-base font-light leading-snug line-clamp-2 max-w-[160px] md:max-w-[220px] drop-shadow-md">
                  {dest.text}
                </p>
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 shadow-lg">
                  <span className="text-white font-semibold text-xs md:text-sm">{dest.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

/* ==========================================================================
   APP
   ========================================================================== */
export default function App() {
  return (
    <main className="relative w-full h-svh bg-[#050609] font-sans text-white overflow-hidden selection:bg-indigo-500/30">
      <div className="relative w-full h-full max-w-[1920px] mx-auto flex flex-col">
        
        {/* Fondo con imágenes */}
        <div className="fixed inset-0 z-0 pointer-events-none select-none">
          <div className="absolute inset-0">
              <div className="hidden md:block absolute inset-0">
                <Image
                   src="/Back_Globe.png"
                   alt="Earth Globe Background"
                   fill
                   className="object-cover"
                />
              </div>
              <div className="block md:hidden absolute inset-0">
                <Image
                   src="/Back_Globe_Mobile.png"
                   alt="Earth Globe Background Mobile"
                   fill
                   className="object-cover"
                />
              </div>
            <div className="absolute inset-0 bg-black/30" />
          </div>
        </div>

        {/* Estructura Principal */}
        <div className="relative z-10 flex flex-col h-full w-full">
          <Header />
          <HomeView />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        body { overscroll-behavior-y: none; }
      `}} />
    </main>
  );
}