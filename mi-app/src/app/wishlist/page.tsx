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
  Heart,
  ChevronRight,
  CreditCard,
  Trash2,
  Menu
} from 'lucide-react';

/* ==========================================================================
   INTERFACES
   ========================================================================== */
interface WishlistItem {
  id: number;
  name: string;
  location: string;
  rating: number;
  category: 'Destinations' | 'Experiences' | 'Lodges';
  image: string;
  description: string;
  price: number;
}

interface ItemDetailsOverlayProps {
  item: WishlistItem | null;
  onClose: () => void;
  onRemove: (id: number) => void;
}

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
   DETAILS OVERLAY
   ========================================================================== */
const ItemDetailsOverlay: React.FC<ItemDetailsOverlayProps> = ({ item, onClose, onRemove }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-8 animate-in fade-in duration-500">
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-5xl bg-[#0a0b10] border border-white/10 rounded-[35px] md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-500 max-h-[92svh] md:max-h-[95vh]">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-30 w-10 h-10 md:w-11 md:h-11 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 group"
        >
          <X size={20} className="md:size-5 group-hover:rotate-90 transition-transform duration-500" />
        </button>

        <div className="relative w-full h-[220px] xs:h-[260px] md:h-[350px] overflow-hidden shrink-0">
          <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-[3000ms] hover:scale-105" sizes="(max-width: 1280px) 100vw, 1280px" priority unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b10] via-transparent to-transparent opacity-90" />
          
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
              <span className="px-3 md:px-4 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                {item.category}
              </span>
              <span className="px-3 md:px-4 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.12em] text-white flex items-center gap-1 md:gap-1.5 transition-colors hover:bg-white/20">
                <MapPin size={10} className="md:size-3" />
                {item.location}
              </span>
            </div>
            <h2 className="text-2xl xs:text-3xl md:text-6xl font-medium tracking-tighter text-white leading-none">
              {item.name}
            </h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar bg-[#0a0b10] overscroll-contain">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="lg:col-span-7 space-y-8 md:space-y-10">
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-xs md:text-[11px] font-medium text-white/30 uppercase tracking-[0.2em] flex items-center gap-4">
                  <div className="w-8 md:w-10 h-[1px] bg-white/10" />
                  Saved Selection
                </h3>
                <p className="text-white/90 text-lg md:text-2xl font-light leading-snug md:leading-normal tracking-tight">
                  {item.description}
                </p>
                <p className="text-white/40 text-sm md:text-lg font-light leading-relaxed tracking-tight max-w-2xl">
                  This selection is waiting for your next adventure. Our curated sustainable plan ensures you experience the best of {item.location} while protecting its natural beauty.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                <div className="space-y-5">
                  <h4 className="text-xs md:text-[11px] font-medium text-white/30 uppercase tracking-[0.2em]">Availability</h4>
                  <p className="text-sm md:text-lg font-light italic text-white/50">Seasonal bookings open for this year. Limited spots available.</p>
                </div>
                <div className="space-y-5">
                  <h4 className="text-xs md:text-[11px] font-medium text-white/30 uppercase tracking-[0.2em]">Status</h4>
                  <div className="flex items-center gap-2 text-blue-400">
                    <Heart size={18} fill="currentColor" />
                    <span className="text-sm md:text-lg font-medium">Saved in Wishlist</span>
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
                  <span className="text-base md:text-xl font-medium tracking-tight text-white">{item.rating}</span>
                </div>

                <div className="flex items-center justify-between group transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-emerald-400/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-500">
                      <CreditCard size={18} />
                    </div>
                    <span className="text-[11px] md:text-[13px] font-medium text-white/50 uppercase tracking-[0.15em]">Price</span>
                  </div>
                  <span className="text-base md:text-xl font-medium text-white tracking-tight">${item.price}</span>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-white text-black py-4 rounded-[18px] md:rounded-[20px] font-bold text-[11px] md:text-xs tracking-[0.12em] uppercase transition-all hover:bg-white/90 active:scale-[0.98] flex items-center justify-center gap-3 shadow-2xl shadow-white/5 group">
                  Confirm Booking
                  <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-500" />
                </button>
                <button 
                  onClick={() => { onRemove(item.id); onClose(); }}
                  className="w-full bg-transparent text-white/40 py-2 rounded-[18px] font-medium text-[9px] md:text-[10px] tracking-[0.1em] uppercase transition-all hover:text-red-400 flex items-center justify-center gap-2"
                >
                  <Trash2 size={12} />
                  Remove from favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   WISHLIST PAGE COMPONENT
   ========================================================================== */
export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<WishlistItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  
  const [maxPrice, setMaxPrice] = useState(2000);
  const [sortBy, setSortBy] = useState('Recommended');

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    { id: 1, name: 'The Canadian Rockies', location: 'Canada', rating: 4.9, category: 'Destinations', image: '/D_1.png', description: 'Majestic turquoise lakes and snow-capped peaks in the heart of Banff.', price: 450 },
    { id: 4, name: 'Santorini Blue', location: 'Greece', rating: 4.9, category: 'Destinations', image: '/D_7.jpg', description: 'Sun-drenched white villas overlooking the deep blue waters of the Aegean.', price: 520 },
    { id: 7, name: 'Kyoto Zen Gardens', location: 'Japan', rating: 5.0, category: 'Destinations', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200', description: 'Ancient temples and peaceful gardens in the heart of Japanese tradition.', price: 380 },
    { id: 10, name: 'Icelandic Glaciers', location: 'Iceland', rating: 4.8, category: 'Destinations', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200', description: 'Explore a landscape of fire and ice with stunning glacial caves.', price: 600 },
    { id: 2, name: 'Alpine Eco-Lodge', location: 'Swiss Alps', rating: 4.9, category: 'Lodges', image: '/Lodge_1.png', description: 'A sustainable sanctuary nestled in the snow-capped peaks.', price: 850 },
    { id: 5, name: 'Rainforest Treehouse', location: 'Costa Rica', rating: 4.8, category: 'Lodges', image: '/Lodge_6.jpg', description: 'Elevated living in the canopy, wake up to the sounds of the jungle.', price: 550 },
    { id: 8, name: 'Arctic Glass Igloo', location: 'Finland', rating: 4.9, category: 'Lodges', image: '/Lodge_5.jpg', description: 'Sleep under the Northern Lights in a climate-controlled glass dome.', price: 920 },
    { id: 11, name: 'Safari Sky Tent', location: 'Namibia', rating: 4.7, category: 'Lodges', image: '/Lodge_8.jpg', description: 'Luxury glamping in the oldest desert on Earth with incredible star views.', price: 410 },
    { id: 3, name: 'Peak Ascent Expedition', location: 'Swiss Alps', rating: 5.0, category: 'Experiences', image: '/Experience_1.png', description: 'Conquer the vertical world with certified mountain guides.', price: 200 },
    { id: 6, name: 'Mindful Stillness Retreat', location: 'Norway', rating: 4.8, category: 'Experiences', image: '/Experience_2.png', description: 'Find your center in total solitude among the fjords.', price: 350 },
    { id: 9, name: 'Ancient Craft Workshop', location: 'Japan', rating: 5.0, category: 'Experiences', image: '/Experience_3.jpg', description: 'A deep immersion into traditional craftsmanship guided by maestros hereditarios.', price: 400 },
    { id: 12, name: 'Wildlife Genesis Project', location: 'Amazon', rating: 4.9, category: 'Experiences', image: '/Experience_8.jpg', description: 'Contribute to vital biological tracking and habitat restoration.', price: 740 },
  ]);

  const filterCategories = ['All', 'Destinations', 'Experiences', 'Lodges'];

  const handleRemoveItem = (id: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const filteredItems = useMemo(() => {
    const result = wishlistItems.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = item.price <= maxPrice;
      return matchesCategory && matchesSearch && matchesPrice;
    });

    if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, searchQuery, wishlistItems, maxPrice, sortBy]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setMaxPrice(2000);
    setSortBy('Recommended');
    setIsAdvancedFilterOpen(false);
  };

  return (
    <main className="relative w-full h-svh bg-[#050609] font-sans text-white overflow-x-hidden overflow-y-auto selection:bg-indigo-500/30 scrollbar-hide">
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none">
        <div className="absolute top-[80px] left-[-200px] w-[900px] h-[900px] bg-red-900/5 blur-[160px] rounded-full mix-blend-screen" />
        <div className="absolute top-0 right-[-200px] w-[700px] h-[700px] bg-purple-900/5 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col w-full min-h-full pb-[60px]">
        
        <Header />

        <div className="px-1 md:px-[30px] pt-24 md:pt-32 pb-8 md:pb-12">
          <h1 className="text-[8.5vw] sm:text-6xl md:text-7xl font-medium tracking-tight mb-4 md:mb-6 pl-1 md:pl-0">
            My Wishlist
          </h1>
          <p className="text-white/60 text-[4.4vw] sm:text-2xl md:text-lg max-w-2xl font-light leading-relaxed pl-1 md:pl-0">
            Your private selection of sustainable luxury and unforgettable experiences around the globe.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="px-1 md:px-[30px] flex flex-col lg:flex-row gap-6 mb-10 md:mb-16 items-start lg:items-center justify-between">
          <div className="flex flex-row md:flex-wrap justify-start gap-3 w-full overflow-x-auto md:overflow-visible scrollbar-hide py-2 pl-1 md:pl-0">
            {filterCategories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-8 py-3 rounded-full border border-white/10 text-sm transition-all duration-300 shrink-0 whitespace-nowrap
                  ${selectedCategory === cat ? 'bg-white text-black font-semibold shadow-xl shadow-white/5' : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 pl-1 md:pl-0">
             <button 
                onClick={() => setIsAdvancedFilterOpen(!isAdvancedFilterOpen)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all text-sm font-medium whitespace-nowrap
                 ${isAdvancedFilterOpen || selectedCategory !== 'All' || maxPrice < 2000 ? 'bg-white text-black border-white shadow-lg shadow-white/5' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'}`}
             >
                <SlidersHorizontal size={18} />
                Advanced Filters
             </button>
          </div>
        </div>

        {isAdvancedFilterOpen && (
          <div className="px-1 md:px-[30px] mb-12 animate-in slide-in-from-top-4 duration-500 pl-1 md:pl-[30px]">
             <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-10 backdrop-blur-md">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-end">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/40">Max Price</label>
                    <span className="text-base font-medium text-white">${maxPrice}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="2000" 
                    step="50"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-white" 
                  />
                </div>
                <div className="space-y-6">
                  <label className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/40 mb-3 block">Sort by</label>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="Recommended">Recommended</option>
                    <option value="Price: Low to High">Price: Low to High</option>
                    <option value="Rating">Top Rating</option>
                  </select>
                </div>
                <div className="flex gap-3">
                   <button 
                    onClick={resetAllFilters}
                    className="flex-1 py-3 rounded-2xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
                   >
                     Reset
                   </button>
                   <button 
                    onClick={() => setIsAdvancedFilterOpen(false)}
                    className="flex-1 py-3 rounded-2xl bg-white text-black text-sm font-bold hover:bg-white/90 transition-all"
                  >
                    Apply
                  </button>
                </div>
               </div>
             </div>
          </div>
        )}

        <div className="px-1 md:px-[30px]">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="group relative flex flex-col bg-white/5 rounded-[35px] border border-white/10 overflow-hidden transition-all duration-500 hover:bg-white/[0.08] md:hover:-translate-y-2 shadow-2xl cursor-pointer mx-1 md:mx-0"
                >
                  <div className="relative w-full h-72 overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-700 md:group-hover:scale-110" unoptimized />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050609]/90 via-transparent to-transparent opacity-80" />
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveItem(item.id);
                      }}
                      className="absolute top-5 right-5 w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/60 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 transition-all duration-300 z-20 group/remove"
                      title="Remove from favorites"
                    >
                      <Trash2 size={18} className="group-remove:scale-110 transition-transform" />
                    </button>

                    <div className="absolute top-5 left-5 w-10 h-10 rounded-2xl bg-red-500/20 backdrop-blur-md border border-red-500/30 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                    </div>
                    
                    <div className="absolute bottom-5 left-6 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-medium">{item.rating}</span>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div className="max-w-[70%]">
                        <h3 className="text-2xl font-medium tracking-tight mb-1 truncate">{item.name}</h3>
                        <div className="flex items-center gap-1.5 text-white/40 text-[13px]">
                          <MapPin className="w-3 h-3" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                      <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 shadow-xl transition-transform group-hover:scale-110">
                        <span className="text-white font-semibold text-[11px] md:text-xs">${item.price}</span>
                      </div>
                    </div>
                    <p className="text-white/50 text-[13px] font-light leading-relaxed mb-8 line-clamp-2">{item.description}</p>
                    <button 
                      className="mt-auto flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors group/btn"
                    >
                      Explore details
                      <ArrowRight className="w-4 h-4 transition-transform md:group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Heart className="w-10 h-10 text-white/20" />
              </div>
              <div>
                <h3 className="text-2xl font-medium">No results found</h3>
                <p className="text-white/40 font-light mt-2 pl-1 md:pl-0">Try adjusting your filters to see more options.</p>
                <button 
                  onClick={resetAllFilters}
                  className="mt-6 text-white underline underline-offset-4 hover:text-blue-400 pl-1 md:pl-0"
                >
                  Clear filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedItem && (
        <ItemDetailsOverlay 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
          onRemove={handleRemoveItem}
        />
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </main>
  );
}