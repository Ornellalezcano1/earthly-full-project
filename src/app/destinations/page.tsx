'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Search, 
  Star, 
  MapPin, 
  ArrowRight,
  Globe, 
  User, 
  X, 
  SlidersHorizontal,
  CloudSun,
  CreditCard,
  ChevronRight,
  Heart,
  Menu,
  RotateCcw
} from 'lucide-react';

/* ==========================================================================
   INTERFACES
   ========================================================================== */
interface Destination {
  id: number;
  name: string;
  location: string;
  rating: number;
  category: string;
  image: string;
  description: string;
  price: number;
}

interface DestinationDetailsOverlayProps {
  destination: Destination | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

/* ==========================================================================
   STATIC DATA
   ========================================================================== */
const ALL_DESTINATIONS: Destination[] = [
  { id: 1, name: 'The Canadian Rockies', location: 'Canada', rating: 4.9, category: 'Mountains', image: '/D_1.png', description: 'Majestic turquoise lakes and snow-capped peaks in the heart of Banff and Jasper.', price: 450 },
  { id: 2, name: 'The Himalayas', location: 'Nepal', rating: 5.0, category: 'Mountains', image: '/D_2.png', description: 'The roof of the world. Experience ancient culture and the tallest summits on Earth.', price: 600 },
  { id: 3, name: 'The Swiss Alps', location: 'Switzerland', rating: 4.9, category: 'Mountains', image: '/D_3.png', description: 'Charming alpine villages and world-class skiing under the shadow of the Matterhorn.', price: 550 },
  { id: 4, name: 'Icelandic Glaciers', location: 'Iceland', rating: 4.8, category: 'Mountains', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200', description: 'A land of fire and ice featuring massive glaciers, black sand beaches, and active volcanoes.', price: 480 },
  { id: 5, name: 'Santorini Blue', location: 'Greece', rating: 4.9, category: 'Beaches', image: '/D_7.jpg', description: 'Sun-drenched white villas overlooking the deep blue waters of the Aegean Sea.', price: 520 },
  { id: 6, name: 'Kyoto Zen Gardens', location: 'Japan', rating: 5.0, category: 'City', image: '/D_6.jpg', description: 'Immerse yourself in history with peaceful temples and traditional tea ceremonies.', price: 400 },
  { id: 7, name: 'Amazon Canopy', location: 'Brazil', rating: 4.7, category: 'Forest', image: '/D_4.jpg', description: 'Explore the richest biodiversity on the planet deep within the rainforest.', price: 380 },
  { id: 8, name: 'Sahara Nights', location: 'Morocco', rating: 4.6, category: 'Desert', image: '/D_5.jpg', description: 'Luxury camping under a blanket of stars in the infinite golden dunes.', price: 320 },
];

const CATEGORIES = ['All', 'Mountains', 'Beaches', 'Desert', 'Forest', 'City'];

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
          
          {/* Botón de Perfil actualizado con Link */}
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
   DETAILS OVERLAY (Ajuste de balance Palabras vs Números)
   ========================================================================== */
const DestinationDetailsOverlay: React.FC<DestinationDetailsOverlayProps> = ({ 
  destination, 
  onClose, 
  isFavorite, 
  onToggleFavorite 
}) => {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-8 animate-in fade-in duration-500">
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-5xl bg-[#0a0b10] border border-white/10 rounded-[35px] md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-500 max-h-[92svh] md:max-h-[95vh]">
        {/* Botones de acción superiores */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-30 w-10 h-10 md:w-11 md:h-11 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 group"
        >
          <X size={20} className="md:size-5 group-hover:rotate-90 transition-transform duration-500" />
        </button>

        <button 
          onClick={() => onToggleFavorite(destination.id)}
          className="absolute top-4 left-4 md:top-6 md:left-6 z-30 w-10 h-10 md:w-11 md:h-11 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center transition-all hover:bg-white/10 active:scale-90"
        >
          <Heart 
            size={20} 
            className={`md:size-5 transition-all duration-300 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-white/70'}`} 
          />
        </button>

        <div className="relative w-full h-[220px] xs:h-[260px] md:h-[350px] overflow-hidden shrink-0">
          <Image src={destination.image} alt={destination.name} fill className="object-cover transition-transform duration-[3000ms] hover:scale-105" sizes="(max-width: 1280px) 100vw, 1280px" priority unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b10] via-transparent to-transparent opacity-90" />
          
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
              <span className="px-3 md:px-4 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                {destination.category}
              </span>
              <span className="px-3 md:px-4 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.12em] text-white flex items-center gap-1 md:gap-1.5 transition-colors hover:bg-white/20">
                <MapPin size={10} className="md:size-3" />
                {destination.location}
              </span>
            </div>
            <h2 className="text-2xl xs:text-3xl md:text-6xl font-medium tracking-tighter text-white leading-none">
              {destination.name}
            </h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar bg-[#0a0b10] overscroll-contain">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="lg:col-span-7 space-y-8 md:space-y-10">
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-xs md:text-[11px] font-medium text-white/30 uppercase tracking-[0.2em] flex items-center gap-4">
                  <div className="w-8 md:w-10 h-[1px] bg-white/10" />
                  The Experience
                </h3>
                <p className="text-white/90 text-lg md:text-2xl font-light leading-snug md:leading-normal tracking-tight">
                  {destination.description}
                </p>
                <p className="text-white/40 text-sm md:text-lg font-light leading-relaxed tracking-tight max-w-2xl">
                  Designed for the conscious traveler who values the subtle balance between human luxury and the raw power of nature.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                <div className="space-y-5">
                  <h4 className="text-xs md:text-[11px] font-medium text-white/30 uppercase tracking-[0.2em]">Amenities</h4>
                  <div className="space-y-3">
                    {["Eco-Transfers", "Organic Breakfast", "Zero-Waste Kit"].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-white/50 group">
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-sm md:text-lg font-light tracking-tight transition-colors group-hover:text-white/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-5">
                  <h4 className="text-xs md:text-[11px] font-medium text-white/30 uppercase tracking-[0.2em]">Highlights</h4>
                  <div className="space-y-3">
                    {["Photography", "Stargazing", "Wellness"].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-white/50 group">
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-sm md:text-lg font-light tracking-tight transition-colors group-hover:text-white/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6 md:space-y-8">
              <div className="bg-white/[0.02] border border-white/10 rounded-[25px] md:rounded-[30px] p-6 md:p-8 space-y-6 shadow-inner">
                {/* Balance restaurado: Etiquetas más grandes, Números más integrados */}
                <div className="flex items-center justify-between border-b border-white/5 pb-5 group transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform duration-500">
                      <Star size={18} fill="currentColor" />
                    </div>
                    <span className="text-[11px] md:text-[13px] font-medium text-white/50 uppercase tracking-[0.15em]">Rating</span>
                  </div>
                  <span className="text-base md:text-xl font-medium tracking-tight text-white">{destination.rating}</span>
                </div>

                <div className="flex items-center justify-between border-b border-white/5 pb-5 group transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-blue-400/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-500">
                      <CloudSun size={18} />
                    </div>
                    <span className="text-[11px] md:text-[13px] font-medium text-white/50 uppercase tracking-[0.15em]">Climate</span>
                  </div>
                  <span className="text-base md:text-xl font-medium tracking-tight text-white">24°C</span>
                </div>

                <div className="flex items-center justify-between group transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-emerald-400/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-500">
                      <CreditCard size={18} />
                    </div>
                    <span className="text-[11px] md:text-[13px] font-medium text-white/50 uppercase tracking-[0.15em]">Price</span>
                  </div>
                  <span className="text-base md:text-xl font-medium text-white tracking-tight">${destination.price}</span>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-white text-black py-4 rounded-[18px] md:rounded-[20px] font-bold text-[11px] md:text-xs tracking-[0.12em] uppercase transition-all hover:bg-white/90 active:scale-[0.98] flex items-center justify-center gap-3 shadow-2xl shadow-white/5 group">
                  Book Journey
                  <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-500" />
                </button>
                <p className="text-center text-[9px] md:text-[10px] text-white/20 uppercase tracking-[0.25em] cursor-default">Curated experience • Private Service</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   DESTINATIONS PAGE
   ========================================================================== */
export default function App() {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const filteredDestinations = useMemo(() => {
    return ALL_DESTINATIONS.filter(dest => {
      const matchCategory = selectedCategory === 'All' || dest.category === selectedCategory;
      const matchPrice = dest.price <= maxPrice;
      const matchRating = dest.rating >= minRating;
      return matchCategory && matchPrice && matchRating;
    });
  }, [selectedCategory, maxPrice, minRating]);

  return (
    <main className="relative w-full h-svh bg-[#050609] font-sans text-white overflow-x-hidden overflow-y-auto selection:bg-indigo-500/30 scrollbar-hide">
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none">
        <div className="absolute top-[80px] left-[-200px] w-[900px] h-[900px] bg-blue-900/10 blur-[160px] rounded-full mix-blend-screen" />
        <div className="absolute top-0 right-[-200px] w-[700px] h-[700px] bg-teal-900/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col w-full min-h-full pb-[60px]">
        <Header />

        <div className="px-1 md:px-[30px] pt-24 md:pt-32 pb-8 md:pb-12">
          <h1 className="text-[8.5vw] sm:text-6xl md:text-6xl font-medium tracking-tight mb-4 md:mb-6 pl-1 md:pl-0">Explore Destinations</h1>
          <p className="text-white/60 text-[4.4vw] sm:text-2xl md:text-lg max-w-2xl font-light leading-relaxed pl-1 md:pl-0">
            Our curated collection of sustainable adventures around the globe.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="px-1 md:px-[30px] flex flex-col lg:flex-row gap-6 mb-10 md:mb-16 items-start lg:items-center justify-between">
          <div className="flex flex-row md:flex-wrap justify-start gap-3 w-full overflow-x-auto md:overflow-visible scrollbar-hide py-2 pl-1 md:pl-0">
            {CATEGORIES.map((cat) => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full border border-white/10 text-sm transition-all duration-300 shrink-0 whitespace-nowrap
                  ${selectedCategory === cat ? 'bg-white text-black font-medium' : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 pl-1 md:pl-0">
             <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm font-medium whitespace-nowrap ${
                  showFilters || selectedCategory !== 'All' || maxPrice < 1000 || minRating > 0 ? 'bg-white text-black border-white shadow-lg shadow-white/5' : ''
                }`}
             >
                <SlidersHorizontal size={18} />
                Advanced Filters
             </button>
          </div>
        </div>

        {/* Panel de Filtros Avanzados */}
        {showFilters && (
          <div className="px-1 md:px-[30px] mb-12 animate-in slide-in-from-top-4 duration-500 pl-1 md:pl-[30px]">
            <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-10 backdrop-blur-md">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-end">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/40">Max Price</label>
                    <span className="text-base font-medium text-white">${maxPrice}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="1000" 
                    step="50"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-white"
                  />
                </div>

                <div className="space-y-6">
                  <label className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/40">Min Rating</label>
                  <div className="flex gap-2">
                    {[0, 3, 4, 4.5, 5].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => setMinRating(rate)}
                        className={`flex-1 py-2.5 rounded-xl border text-[11px] font-medium transition-all
                          ${minRating === rate ? 'bg-white border-white text-black' : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'}`}
                      >
                        {rate === 0 ? 'Any' : `${rate}+`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      setMaxPrice(1000);
                      setMinRating(0);
                      setSelectedCategory('All');
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
                  >
                    <RotateCcw size={16} />
                    Reset
                  </button>
                  <button 
                    onClick={() => setShowFilters(false)}
                    className="flex-1 py-3 rounded-2xl bg-white text-black text-sm font-bold hover:bg-white/90 transition-all"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grid de Cards */}
        <div className="px-1 md:px-[30px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
          {filteredDestinations.map((dest) => (
            <div key={dest.id} onClick={() => setSelectedDestination(dest)} className="group relative flex flex-col bg-white/5 rounded-[35px] border border-white/10 overflow-hidden transition-all duration-500 hover:bg-white/[0.08] md:hover:-translate-y-2 shadow-2xl shadow-black/40 cursor-pointer mx-1 md:mx-0">
              <div className="relative w-full h-72 overflow-hidden">
                <Image src={dest.image} alt={dest.name} fill className="object-cover transition-transform duration-700 md:group-hover:scale-110" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050609]/80 via-transparent to-transparent opacity-60" />
                <button onClick={(e) => { e.stopPropagation(); toggleFavorite(dest.id); }} className="absolute top-5 right-5 w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:bg-white/20 active:scale-90 z-20 group/heart">
                  <Heart size={18} className={`transition-colors duration-300 ${favorites.includes(dest.id) ? 'text-red-500 fill-red-500' : 'text-white/70 group-hover/heart:text-white'}`} />
                </button>
                <div className="absolute bottom-5 left-6 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-medium tracking-wider">{dest.rating}</span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3">
                  <div className="max-w-[70%]">
                    {/* Título de la tarjeta equilibrado */}
                    <h3 className="text-2xl font-medium tracking-tight mb-1 truncate">{dest.name}</h3>
                    <div className="flex items-center gap-1.5 text-white/40 text-[13px]">
                      <MapPin className="w-3 h-3" />
                      <span>{dest.location}</span>
                    </div>
                  </div>
                  {/* Burbuja de precio refinada para mejor equilibrio */}
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 shadow-xl transition-transform group-hover:scale-110">
                    <span className="text-white font-semibold text-[11px] md:text-xs">${dest.price}</span>
                  </div>
                </div>
                <p className="text-white/50 text-[13px] font-light leading-relaxed mb-6 line-clamp-2">{dest.description}</p>
                <button onClick={() => setSelectedDestination(dest)} className="mt-auto flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors group/btn">
                  View Details <ArrowRight className="w-4 h-4 transition-transform md:group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedDestination && (
        <DestinationDetailsOverlay destination={selectedDestination} onClose={() => setSelectedDestination(null)} isFavorite={favorites.includes(selectedDestination.id)} onToggleFavorite={toggleFavorite} />
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
    </main>
  );
}