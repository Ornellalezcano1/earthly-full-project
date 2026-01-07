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
  Menu
} from 'lucide-react';

/* ==========================================================================
   INTERFACES
   ========================================================================== */
interface Lodge {
  id: number;
  name: string;
  location: string;
  rating: number;
  category: string;
  image: string;
  description: string;
  price: number;
  extendedDescription: string;
  amenities: string[];
  highlights: string[];
}

interface LodgeDetailsOverlayProps {
  lodge: Lodge | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

/* ==========================================================================
   STATIC DATA
   ========================================================================== */
const ALL_LODGES: Lodge[] = [
  { 
    id: 1, 
    name: 'Alpine Eco-Lodge', 
    location: 'Swiss Alps', 
    rating: 4.9, 
    category: 'Mountains', 
    image: '/Lodge_1.png', 
    description: 'A sustainable sanctuary nestled in the snow-capped peaks.', 
    price: 850,
    extendedDescription: 'Solar-powered luxury with panoramic glass walls offering uninterrupted views of the majestic landscape. Designed to leave zero carbon footprint.',
    amenities: ['Geothermal Heating', 'Private Ski Access', 'Panoramic Sauna'],
    highlights: ['Snow-capped Views', 'Total Silence', 'Stargazing']
  },
  { 
    id: 2, 
    name: 'Coastal Bamboo Villa', 
    location: 'Bali, Indonesia', 
    rating: 4.8, 
    category: 'Beaches', 
    image: '/Lodge_2.png', 
    description: 'Handcrafted bamboo architecture overlooking the Indian Ocean.', 
    price: 620,
    extendedDescription: 'Open-air living in harmony with the sea breeze and tropical surroundings. A masterpiece of sustainable bamboo construction.',
    amenities: ['Open-air Bath', 'Infinity Plunge Pool', 'Organic Garden'],
    highlights: ['Ocean Breeze', 'Sunrise Yoga Deck', 'Tropical Seclusion']
  },
  { 
    id: 3, 
    name: 'Deep Forest Cabin', 
    location: 'Black Forest, Germany', 
    rating: 4.7, 
    category: 'Forest', 
    image: '/Lodge_3.png', 
    description: 'A secluded hideaway surrounded by ancient pines.', 
    price: 450,
    extendedDescription: 'Reconnect with nature in this minimalist wooden retreat featuring a suspended terrace. The perfect escape for writers and thinkers.',
    amenities: ['Wood Burning Stove', 'Rainwater System', 'Forest Library'],
    highlights: ['Pine Scent', 'Bird Watching', 'Absolute Privacy']
  },
  { 
    id: 4, 
    name: 'Desert Stone House', 
    location: 'Joshua Tree, USA', 
    rating: 4.9, 
    category: 'Desert', 
    image: '/Lodge_4.jpg', 
    description: 'Modern architecture blending seamlessly with the arid landscape.', 
    price: 780,
    extendedDescription: 'Constructed from local stone to maintain cool temperatures naturally. Experience the profound silence of the high desert.',
    amenities: ['Natural Cooling', 'Outdoor Fire Pit', 'Telescope'],
    highlights: ['Dark Sky Reserve', 'Cactus Garden', 'Architectural Design']
  },
  { 
    id: 5, 
    name: 'Nordic Glass Igloo', 
    location: 'Lapland, Finland', 
    rating: 5.0, 
    category: 'Mountains', 
    image: '/Lodge_5.jpg', 
    description: 'Sleep under the Aurora Borealis in a heated glass igloo.', 
    price: 1200,
    extendedDescription: 'A once-in-a-lifetime arctic experience combining thermal comfort with the wild beauty of the frozen north.',
    amenities: ['Thermal Glass Roof', 'Heated Floors', 'Aurora Alarm'],
    highlights: ['Northern Lights', 'Arctic Wildlife', 'Snow Shoeing']
  },
  { 
    id: 6, 
    name: 'Rainforest Treehouse', 
    location: 'Costa Rica', 
    rating: 4.8, 
    category: 'Forest', 
    image: '/Lodge_6.jpg', 
    description: 'Elevated living in the canopy. Wake up to the sounds of toucans.', 
    price: 550,
    extendedDescription: 'Suspended 15 meters above the ground, this wooden refuge offers a unique perspective of the rainforest biodiversity.',
    amenities: ['Solar Power', 'Natural Ventilation', 'Outdoor Shower'],
    highlights: ['Canopy Views', 'Wildlife Watching', 'River Access']
  },
  { 
    id: 7, 
    name: 'Cliffside Santorini Villa', 
    location: 'Santorini, Greece', 
    rating: 4.9, 
    category: 'Beaches', 
    image: '/Lodge_7.jpg', 
    description: 'Traditional Cycladic architecture with a private infinity pool.', 
    price: 1500,
    extendedDescription: 'Carved into the volcanic rock of the cliff, this villa offers unparalleled privacy with endless views of the Aegean Sea.',
    amenities: ['Infinity Pool', 'Champagne Bar', 'Private Butler'],
    highlights: ['Volcano Views', 'Cycladic Style', 'Romantic Sunset']
  },
  { 
    id: 8, 
    name: 'Serengeti Safari Camp', 
    location: 'Serengeti, Tanzania', 
    rating: 4.9, 
    category: 'Desert', 
    image: '/Lodge_8.jpg', 
    description: 'Luxury glamping in the heart of the wild savannah.', 
    price: 920,
    extendedDescription: 'Experience the Great Migration from a front-row seat. Tents that combine colonial elegance with the raw power of the African plains.',
    amenities: ['Guided Safari Drives', 'Bush Dining', 'Eco-Ensuite'],
    highlights: ['Big Five Spotting', 'Savannah Sunsets', 'Wilderness Immersion']
  }
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
   DETAILS OVERLAY (Altura aumentada en Web para legibilidad)
   ========================================================================== */
const LodgeDetailsOverlay: React.FC<LodgeDetailsOverlayProps> = ({ 
  lodge, 
  onClose, 
  isFavorite, 
  onToggleFavorite 
}) => {
  if (!lodge) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-8 animate-in fade-in duration-300">
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
          onClick={() => onToggleFavorite(lodge.id)}
          className="absolute top-4 left-4 md:top-6 md:left-6 z-30 w-10 h-10 md:w-11 md:h-11 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center transition-all hover:bg-white/10 active:scale-90"
        >
          <Heart 
            size={20} 
            className={`md:size-5 transition-all duration-300 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-white/70'}`} 
          />
        </button>

        <div className="relative w-full h-[220px] xs:h-[260px] md:h-[350px] overflow-hidden shrink-0">
          <Image src={lodge.image} alt={lodge.name} fill className="object-cover transition-transform duration-[3000ms] hover:scale-105" sizes="(max-width: 1280px) 100vw, 1280px" priority unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b10] via-transparent to-transparent opacity-90" />
          
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
              <span className="px-3 md:px-4 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                {lodge.category}
              </span>
              <span className="px-3 md:px-4 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.12em] text-white flex items-center gap-1 md:gap-1.5 transition-colors hover:bg-white/20">
                <MapPin size={10} className="md:size-3" />
                {lodge.location}
              </span>
            </div>
            <h2 className="text-2xl xs:text-3xl md:text-6xl font-medium tracking-tighter text-white leading-none">
              {lodge.name}
            </h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar bg-[#0a0b10] overscroll-contain">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="lg:col-span-7 space-y-8 md:space-y-10">
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-xs md:text-[11px] font-medium text-white/30 uppercase tracking-[0.2em] flex items-center gap-4">
                  <div className="w-8 md:w-10 h-[1px] bg-white/10" />
                  The Property
                </h3>
                <p className="text-white/90 text-lg md:text-2xl font-light leading-snug md:leading-normal tracking-tight">
                  {lodge.description}
                </p>
                <p className="text-white/40 text-sm md:text-lg font-light leading-relaxed tracking-tight max-w-2xl">
                  {lodge.extendedDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                <div className="space-y-5">
                  <h4 className="text-xs md:text-[11px] font-medium text-white/30 uppercase tracking-[0.2em]">Amenities</h4>
                  <div className="space-y-3">
                    {lodge.amenities.map((item, idx) => (
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
                    {lodge.highlights.map((item, idx) => (
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
                <div className="flex items-center justify-between border-b border-white/5 pb-5 group transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform duration-500">
                      <Star size={18} fill="currentColor" />
                    </div>
                    <span className="text-[11px] md:text-[13px] font-medium text-white/50 uppercase tracking-[0.15em]">Rating</span>
                  </div>
                  <span className="text-base md:text-xl font-medium tracking-tight text-white">{lodge.rating}</span>
                </div>

                <div className="flex items-center justify-between border-b border-white/5 pb-5 group transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-blue-400/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-500">
                      <CloudSun size={18} />
                    </div>
                    <span className="text-[11px] md:text-[13px] font-medium text-white/50 uppercase tracking-[0.15em]">Climate</span>
                  </div>
                  <span className="text-base md:text-xl font-medium tracking-tight text-white">22°C</span>
                </div>

                <div className="flex items-center justify-between group transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-emerald-400/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-500">
                      <CreditCard size={18} />
                    </div>
                    <span className="text-[11px] md:text-[13px] font-medium text-white/50 uppercase tracking-[0.15em]">Nightly</span>
                  </div>
                  <span className="text-base md:text-xl font-medium text-white tracking-tight">${lodge.price}</span>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-white text-black py-4 rounded-[18px] md:rounded-[20px] font-bold text-[11px] md:text-xs tracking-[0.12em] uppercase transition-all hover:bg-white/90 active:scale-[0.98] flex items-center justify-center gap-3 shadow-2xl shadow-white/5 group">
                  Book Stay
                  <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-500" />
                </button>
                <p className="text-center text-[9px] md:text-[10px] text-white/20 uppercase tracking-[0.25em] cursor-default">Instant Confirmation • Private Service</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   MAIN PAGE
   ========================================================================== */
export default function App() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedLodge, setSelectedLodge] = useState<Lodge | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(2000);
  const [minRating, setMinRating] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const filteredLodges = useMemo(() => {
    return ALL_LODGES.filter(lodge => {
      const matchCategory = selectedCategory === 'All' || lodge.category === selectedCategory;
      const matchPrice = lodge.price <= maxPrice;
      const matchRating = lodge.rating >= minRating;
      return matchCategory && matchPrice && matchRating;
    });
  }, [selectedCategory, maxPrice, minRating]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setMaxPrice(2000);
    setMinRating(0);
  };

  return (
    <main className="relative w-full h-svh bg-[#050609] font-sans text-white overflow-x-hidden overflow-y-auto selection:bg-indigo-500/30 scrollbar-hide">
      
      {/* Environmental Background */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none">
        <div className="absolute top-[80px] left-[-200px] w-[900px] h-[900px] bg-blue-900/10 blur-[160px] rounded-full mix-blend-screen" />
        <div className="absolute top-0 right-[-200px] w-[700px] h-[700px] bg-teal-900/10 blur-[140px] rounded-full" />
      </div>

      {/* Advanced Filters Overlay */}
      <div className={`fixed inset-0 z-[100] transition-all duration-500 ${isFilterOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-[#0a0b10] border-l border-white/10 shadow-2xl transition-transform duration-500 flex flex-col ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-[30px] flex justify-between items-center border-b border-white/5">
            <h2 className="text-2xl font-medium tracking-tight">Advanced Filters</h2>
            <button onClick={() => setIsFilterOpen(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-[30px] space-y-10">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-white/60 uppercase tracking-widest">Max Price</label>
                <span className="text-xl font-medium font-mono">${maxPrice}</span>
              </div>
              <input type="range" min="300" max="3000" step="100" value={maxPrice} onChange={(e) => setMaxPrice(parseInt(e.target.value))} className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-white" />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium text-white/60 uppercase tracking-widest block">Minimum Rating</label>
              <div className="flex gap-2">
                {[0, 3, 4, 4.5, 5].map((rate) => (
                  <button key={rate} onClick={() => setMinRating(rate)} className={`flex-1 py-3 rounded-xl border transition-all duration-300 text-sm font-medium ${minRating === rate ? 'bg-white text-black border-white' : 'bg-white/5 text-white/60 border-white/5 hover:border-white/20'}`}>
                    {rate === 0 ? 'Any' : `${rate}+`}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium text-white/60 uppercase tracking-widest block">Lodge Type</label>
              <div className="grid grid-cols-2 gap-3">
                {CATEGORIES.map((cat) => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)} className={`py-3 px-4 rounded-xl border text-left transition-all duration-300 text-sm ${selectedCategory === cat ? 'bg-white/10 text-white border-white/40' : 'bg-white/5 text-white/40 border-white/5 hover:border-white/10'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-[30px] border-t border-white/5 bg-[#050609]/50 backdrop-blur-md grid grid-cols-2 gap-4">
            <button onClick={resetFilters} className="py-4 rounded-2xl border border-white/10 text-sm font-medium hover:bg-white/5 transition-all">Reset All</button>
            <button onClick={() => setIsFilterOpen(false)} className="py-4 rounded-2xl bg-white text-black text-sm font-bold hover:bg-blue-50 transition-all">Apply</button>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col w-full min-h-full pb-[60px]">
        <Header />

        <div className="px-1 md:px-[30px] pt-24 md:pt-32 pb-8 md:pb-12">
          <h1 className="text-[8.5vw] sm:text-6xl md:text-6xl font-medium tracking-tight mb-4 md:mb-6 pl-1 md:pl-0">Unique Lodges</h1>
          <p className="text-white/60 text-[4.4vw] sm:text-2xl md:text-lg max-w-2xl font-light leading-relaxed pl-1 md:pl-0">
            Discover a collection of exclusive stays that blend sustainable luxury with breathtaking natural environments.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="px-1 md:px-[30px] flex flex-col lg:flex-row gap-6 mb-10 md:mb-16 items-start lg:items-center justify-between">
          <div className="flex flex-row md:flex-wrap justify-start gap-3 w-full overflow-x-auto md:overflow-visible scrollbar-hide py-2 pl-1 md:pl-0">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-6 py-2.5 rounded-full border border-white/10 text-sm transition-all duration-300 shrink-0 whitespace-nowrap ${selectedCategory === cat ? 'bg-white text-black font-medium shadow-lg shadow-white/5' : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 pl-1 md:pl-0">
             <button onClick={() => setIsFilterOpen(true)} className={`flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all text-sm font-medium whitespace-nowrap ${isFilterOpen || selectedCategory !== 'All' ? 'bg-white text-black border-white shadow-lg shadow-white/5' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'}`}>
                <SlidersHorizontal size={18} />
                Advanced Filters
             </button>
          </div>
        </div>

        {/* Grid Section */}
        <div className="px-1 md:px-[30px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
          {filteredLodges.map((lodge) => (
            <div key={lodge.id} onClick={() => setSelectedLodge(lodge)} className="group relative flex flex-col bg-white/5 rounded-[35px] border border-white/10 overflow-hidden transition-all duration-500 hover:bg-white/[0.08] md:hover:-translate-y-2 shadow-2xl shadow-black/40 cursor-pointer mx-1 md:mx-0">
              <div className="relative w-full h-72 overflow-hidden">
                <Image src={lodge.image} alt={lodge.name} fill className="object-cover transition-transform duration-700 md:group-hover:scale-110" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050609]/80 via-transparent to-transparent opacity-60" />
                <button onClick={(e) => { e.stopPropagation(); toggleFavorite(lodge.id); }} className="absolute top-5 right-5 w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:bg-white/20 active:scale-90 z-20 group/heart">
                  <Heart size={18} className={`transition-colors duration-300 ${favorites.includes(lodge.id) ? 'text-red-500 fill-red-500' : 'text-white/70 group-hover/heart:text-white'}`} />
                </button>
                <div className="absolute bottom-5 left-6 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium tracking-wider">{lodge.rating}</span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3">
                  <div className="max-w-[70%]">
                    <h3 className="text-2xl font-medium tracking-tight mb-1 truncate">{lodge.name}</h3>
                    <div className="flex items-center gap-1.5 text-white/40 text-[13px]">
                      <MapPin className="w-3 h-3" />
                      <span>{lodge.location}</span>
                    </div>
                  </div>
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 shadow-xl transition-transform group-hover:scale-110">
                    <span className="text-white font-semibold text-[11px] md:text-xs">${lodge.price}</span>
                  </div>
                </div>
                <p className="text-white/50 text-[13px] font-light leading-relaxed mb-6 line-clamp-2">{lodge.description}</p>
                <button onClick={() => setSelectedLodge(lodge)} className="mt-auto flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors group/btn">
                  View Details
                  <ArrowRight className="w-4 h-4 transition-transform md:group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredLodges.length === 0 && (
          <div className="px-1 md:px-[30px] flex flex-col items-center justify-center py-20 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10"><Search className="w-8 h-8 text-white/20" /></div>
            <div><h3 className="text-xl font-medium">No lodges found</h3><p className="text-white/40 font-light">Try adjusting your filters.</p></div>
          </div>
        )}
      </div>

      {selectedLodge && (
        <LodgeDetailsOverlay lodge={selectedLodge} onClose={() => setSelectedLodge(null)} isFavorite={favorites.includes(selectedLodge.id)} onToggleFavorite={toggleFavorite} />
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </main>
  );
}