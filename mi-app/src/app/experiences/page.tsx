"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  MapPin, 
  Globe, 
  User, 
  Mountain, 
  Palette, 
  Coffee, 
  Heart,
  ChevronRight,
  CheckCircle2,
  Clock,
  Menu,
  X
} from 'lucide-react';

/* ==========================================================================
   INTERFACES
   ========================================================================== */
interface Experience {
  id: number;
  name: string;
  location: string;
  category: 'Adventure' | 'Culture' | 'Relax' | 'Volunteering';
  image: string;
  description: string;
  duration: string;
  included: string[];
}

interface ExperienceCardProps {
  experience: Experience;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
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
   MAPPING: DYNAMIC DESCRIPTIONS BY CATEGORY
   ========================================================================== */
const categoryDescriptions: Record<string, string> = {
  All: "Discover four distinct paths to connect with the globe. Whether seeking adrenaline or profound peace, our curated journeys are designed to transform your perspective.",
  Adventure: "Push your limits and embrace the unknown. From rugged treks to high-altitude thrills, these journeys are for those who find life on the edge of discovery.",
  Culture: "Immerse yourself in the soul of humanity. Connect with ancient traditions, local masters, and sacred rituals that have shaped civilizations for millennia.",
  Relax: "Reclaim your inner balance. Surrender to the healing power of nature with curated retreats designed to rejuvenate your body and quiet your mind.",
  Volunteering: "Travel with a purpose. Leave a lasting positive impact by contributing to vital conservation efforts and supporting local community growth."
};

/* ==========================================================================
   COMPONENT: EXPERIENCE CARD
   ========================================================================== */
const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, isFavorite, onToggleFavorite }) => {
  const getIcon = () => {
    switch (experience.category) {
      case 'Adventure': return <Mountain size={14} />;
      case 'Culture': return <Palette size={14} />;
      case 'Relax': return <Coffee size={14} />;
      case 'Volunteering': return <Heart size={14} />;
    }
  };

  return (
    <div className="group relative flex flex-col bg-white/[0.03] rounded-[40px] border border-white/10 overflow-hidden transition-all duration-500 hover:bg-white/[0.07] md:hover:-translate-y-2 shadow-2xl shadow-black/40 mx-1 md:mx-0">
      <div className="relative w-full h-72 overflow-hidden">
        <Image src={experience.image} alt={experience.name} fill className="object-cover transition-transform duration-1000 md:group-hover:scale-110" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b10] via-transparent to-transparent opacity-80" />
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(experience.id);
          }}
          className="absolute top-5 right-6 z-20 w-10 h-10 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all hover:bg-white/20 active:scale-90 group/heart"
        >
          <Heart size={18} className={`transition-colors duration-300 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-white/70'}`} />
        </button>

        <div className="absolute top-5 left-6 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
          <span className="text-white/80">{getIcon()}</span>
          <span className="text-[11px] font-bold uppercase tracking-wide text-white">
            {experience.category}
          </span>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
             <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold uppercase tracking-wide text-white/70 flex items-center gap-1.5">
                <MapPin size={12} />
                {experience.location}
              </span>
          </div>
          <h3 className="text-2xl font-medium tracking-tight text-white mb-2 leading-tight truncate">{experience.name}</h3>
          <p className="text-white/50 text-sm font-light leading-relaxed tracking-normal">
            {experience.description}
          </p>
        </div>

        <div className="space-y-4 pt-6 border-t border-white/5">
          <p className="text-xs font-semibold text-white/30 uppercase tracking-wide">Package includes</p>
          <div className="grid grid-cols-1 gap-3">
            {experience.included.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-white/70">
                <CheckCircle2 size={16} className="text-white/20" />
                <span className="text-sm font-light tracking-tight">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
          <div className="flex items-center gap-2 text-white/40">
            <Clock size={14} />
            <span className="text-[11px] uppercase tracking-wide font-medium">{experience.duration}</span>
          </div>
          <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80 hover:text-white transition-all group/btn">
            Explore
            <ChevronRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   EXPERIENCE DATA
   ========================================================================== */
const experienceData: Experience[] = [
  { id: 1, name: 'Peak Ascent Expedition', location: 'Swiss Alps', category: 'Adventure', image: '/Experience_1.png', description: 'Conquer the vertical world. A high-altitude journey through snow-covered ridges and breathtaking technical ascents designed for the bold.', duration: '8 Hours', included: ['Alpine Ascension Kit', 'Certified Mountain Guide', 'Summit Nutrition'] },
  { id: 2, name: 'Mindful Stillness Retreat', location: 'Lofoten, Norway', category: 'Relax', image: '/Experience_2.png', description: 'Find your center in total solitude. A sensory recovery experience designed to synchronize your natural rhythm with the whispers of the arctic.', duration: 'Full Day', included: ['Guided Silent Walk', 'Private Mineral Bath', 'Organic Herbal Lab'] },
  { id: 3, name: 'Ancient Craft Workshop', location: 'Kyoto, Japan', category: 'Culture', image: '/Experience_3.jpg', description: 'Master the delicate arts of a vanished era. A deep immersion into traditional craftsmanship guided by hereditary masters in sacred workshops.', duration: '4 Hours', included: ['Heritage Toolkit', 'Master artisan session', 'Cultural Certification'] },
  { id: 4, name: 'Wildlife Genesis Project', location: 'Amazon Basin', category: 'Volunteering', image: '/Experience_4.jpg', description: 'Stand at the frontlines of nature. Contribute to vital biological tracking and habitat restoration within the worlds most biodiverse canopy.', duration: '5 Days', included: ['Conservation Training', 'Eco-lodging access', 'Field Tracking Gear'] },
  { id: 5, name: 'Arctic Spa Haven', location: 'Iceland', category: 'Relax', image: '/Experience_5.jpg', description: 'Surrender to the warmth of natural hot springs under the northern sky. Total immersion in mineral-rich geothermal waters.', duration: 'Full Day', included: ['VIP Lagoon Access', 'Towel & Skincare Kit', 'Healthy Lunch'] },
  { id: 6, name: 'Temple Mindfulness', location: 'Nepal', category: 'Culture', image: '/Experience_6.jpg', description: 'Spiritual connection guided by local monks in ancient high-altitude shrines. Find inner peace above the clouds.', duration: '3 Hours', included: ['Monk Guidance', 'Private Shrine Access', 'Meditation Mat'] },
  { id: 7, name: 'Ocean Flow Yoga', location: 'Bali', category: 'Relax', image: '/Experience_7.jpg', description: 'Sunrise Vinyasa session on a private beach focused on deep connection between breath and the rhythm of the waves.', duration: '90 Mins', included: ['Expert Instructor', 'Organic Juice Bar', 'Aromatherapy'] },
  { id: 8, name: 'Coral Restoration', location: 'Australia', category: 'Volunteering', image: '/Experience_8.jpg', description: 'Diving to help rebuild the vital ecosystems of the Great Barrier Reef alongside marine biologists.', duration: '5 Days', included: ['Diving Certificate', 'Lab Training', 'Project Reports'] },
];

const categories = ['All', 'Adventure', 'Culture', 'Relax', 'Volunteering'];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const filteredExperience = useMemo(() => {
    return experienceData.filter(exp => selectedCategory === 'All' || exp.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <main className="relative w-full h-svh bg-[#050609] font-sans text-white overflow-x-hidden overflow-y-auto selection:bg-indigo-500/30 scrollbar-hide">
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none">
        <div className="absolute top-[80px] left-[-200px] w-[900px] h-[900px] bg-blue-900/5 blur-[160px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 right-[-200px] w-[700px] h-[700px] bg-teal-900/5 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col w-full min-h-full pb-[60px]">
        <Header />

        {/* Title Section (VW Sizes Application) */}
        <div className="px-1 md:px-[30px] pt-24 md:pt-32 pb-8">
          <h1 className="text-[8.5vw] sm:text-6xl md:text-6xl font-medium tracking-tight mb-4 md:mb-6 pl-1 md:pl-0 animate-in slide-in-from-left duration-700">
            Our Experience
          </h1>
          <p className="text-white/60 text-[4.4vw] sm:text-2xl md:text-lg max-w-2xl font-light leading-relaxed min-h-[80px] pl-1 md:pl-0 transition-all duration-500 animate-in fade-in">
            {categoryDescriptions[selectedCategory]}
          </p>
        </div>

        {/* Filter Bar (Horizontal Scroll Sync) */}
        <div className="px-1 md:px-[30px] mb-10 md:mb-16">
          <div className="flex flex-row md:flex-wrap justify-start gap-3 w-full overflow-x-auto md:overflow-visible scrollbar-hide py-2 pl-1 md:pl-0">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full border border-white/10 text-sm transition-all duration-300 shrink-0 whitespace-nowrap
                  ${selectedCategory === cat ? 'bg-white text-black font-medium shadow-lg shadow-white/5' : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Section (Margin Sync) */}
        <div className="px-1 md:px-[30px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
          {filteredExperience.map((exp) => (
            <ExperienceCard 
              key={exp.id} 
              experience={exp} 
              isFavorite={favorites.includes(exp.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>

        {filteredExperience.length === 0 && (
          <div className="px-1 md:px-[30px] py-20 text-center">
            <p className="text-white/30 text-xl font-light tracking-tight uppercase italic pl-1 md:pl-0">No experience found in this category.</p>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </main>
  );
}