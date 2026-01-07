"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { 
  Globe as GlobeIcon, 
  Wind, 
  Zap, 
  Droplets, 
  X, 
  Award, 
  Compass,
  Search, 
  Activity, 
  Trees, 
  TrendingUp, 
  Scale, 
  Building2, 
  Heart, 
  User, 
  Menu, 
  Trophy, 
  ArrowUpRight, 
  Leaf, 
  Navigation, 
  Layers, 
  Star, 
  Info, 
  ChevronUp
} from 'lucide-react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/* ==========================================================================
   TYPES & INTERFACES
   ========================================================================== */
interface EcoPoint {
  id: number;
  iso: string;
  name: string;
  lat: number;
  lon: number;
  score: number;
  co2: string;
  renewables: string;
  hdi: string;
  epi: string;
  pollution: string;
  forest: string;
  life: string;
  water: string;
  gdp: string;
  gini: string;
  governance: string;
  trivia: string;
  color: string;
  dist?: number; 
}

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredPoints: EcoPoint[];
  focusOnCountry: (point: EcoPoint) => void;
}

interface MetricBoxProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
}

/* ==========================================================================
   DATA & CONSTANTS
   ========================================================================== */
const MOCK_ECO_POINTS: EcoPoint[] = [
  // EUROPE
  { id: 1, iso: "NOR", name: "Norway", lat: 60.47, lon: 8.46, score: 88, co2: "4.2", renewables: "98%", hdi: "0.96", epi: "77.7", pollution: "Low", forest: "33%", life: "83.2", water: "100%", gdp: "$82k", gini: "25.2", governance: "High", trivia: "Norway leads the world in electric vehicle adoption.", color: "#facc15" },
  { id: 2, iso: "SWE", name: "Sweden", lat: 60.12, lon: 18.64, score: 86, co2: "3.8", renewables: "60%", hdi: "0.95", epi: "78.2", pollution: "Low", forest: "69%", life: "82.4", water: "100%", gdp: "$54k", gini: "26.8", governance: "High", trivia: "Sweden imports garbage from other countries for energy.", color: "#facc15" },
  { id: 3, iso: "DNK", name: "Denmark", lat: 56.26, lon: 9.50, score: 84, co2: "5.1", renewables: "67%", hdi: "0.94", epi: "82.5", pollution: "Low", forest: "14%", life: "81.2", water: "100%", gdp: "$61k", gini: "27.5", governance: "High", trivia: "Copenhagen aims to be carbon neutral by 2025.", color: "#facc15" },
  { id: 4, iso: "ISL", name: "Iceland", lat: 64.96, lon: -19.02, score: 82, co2: "9.2", renewables: "100%", hdi: "0.95", epi: "72.3", pollution: "Low", forest: "2%", life: "83.1", water: "100%", gdp: "$66k", gini: "24.1", governance: "High", trivia: "Powered almost entirely by geothermal energy.", color: "#facc15" },
  { id: 5, iso: "CHE", name: "Switzerland", lat: 46.81, lon: 8.22, score: 80, co2: "4.1", renewables: "56%", hdi: "0.96", epi: "75.3", pollution: "Low", forest: "31%", life: "83.7", water: "100%", gdp: "$87k", gini: "32.5", governance: "High", trivia: "High innovation in green technologies.", color: "#facc15" },
  { id: 6, iso: "FIN", name: "Finland", lat: 61.92, lon: 25.74, score: 85, co2: "4.5", renewables: "52%", hdi: "0.94", epi: "78.9", pollution: "Low", forest: "73%", life: "82.1", water: "100%", gdp: "$49k", gini: "27.3", governance: "High", trivia: "The happiest country with the cleanest air in Europe.", color: "#facc15" },
  { id: 7, iso: "AUT", name: "Austria", lat: 47.51, lon: 14.55, score: 79, co2: "6.8", renewables: "75%", hdi: "0.92", epi: "73.2", pollution: "Low", forest: "47%", life: "81.5", water: "100%", gdp: "$53k", gini: "29.7", governance: "High", trivia: "Alpine nation with massive hydropower capacity.", color: "#facc15" },
  { id: 8, iso: "GBR", name: "UK", lat: 55.37, lon: -3.43, score: 74, co2: "4.9", renewables: "43%", hdi: "0.93", epi: "77.7", pollution: "Low", forest: "13%", life: "80.9", water: "100%", gdp: "$46k", gini: "33.5", governance: "High", trivia: "Offshore wind energy superpower.", color: "#60a5fa" },
  { id: 9, iso: "DEU", name: "Germany", lat: 51.16, lon: 10.45, score: 77, co2: "7.7", renewables: "46%", hdi: "0.94", epi: "72.4", pollution: "Mod", forest: "32%", life: "81.3", water: "100%", gdp: "$53k", gini: "31.7", governance: "High", trivia: "Heart of the European energy transition.", color: "#facc15" },
  { id: 10, iso: "FRA", name: "France", lat: 46.22, lon: 2.21, score: 76, co2: "4.5", renewables: "25%", hdi: "0.90", epi: "75.3", pollution: "Low", forest: "31%", life: "82.7", water: "100%", gdp: "$43k", gini: "32.4", governance: "High", trivia: "Nuclear power provides a large part of its clean energy.", color: "#facc15" },
  { id: 11, iso: "ESP", name: "Spain", lat: 40.46, lon: -3.74, score: 74, co2: "5.1", renewables: "42%", hdi: "0.90", epi: "73.3", pollution: "Low", forest: "36%", life: "83.3", water: "100%", gdp: "$40k", gini: "34.3", governance: "High", trivia: "Global leader in wind infrastructure.", color: "#60a5fa" },
  { id: 12, iso: "PRT", name: "Portugal", lat: 39.39, lon: -8.22, score: 72, co2: "4.5", renewables: "60%", hdi: "0.86", epi: "68.4", pollution: "Low", forest: "36%", life: "81.1", water: "100%", gdp: "$23k", gini: "33.5", governance: "High", trivia: "Has run entire days solely on renewables.", color: "#60a5fa" },
  { id: 41, iso: "ITA", name: "Italy", lat: 41.87, lon: 12.56, score: 71, co2: "5.4", renewables: "19%", hdi: "0.89", epi: "66.9", pollution: "Mod", forest: "31%", life: "83.5", water: "100%", gdp: "$35k", gini: "35.2", governance: "High", trivia: "High adoption of solar energy in the south.", color: "#60a5fa" },
  { id: 42, iso: "GRC", name: "Greece", lat: 39.07, lon: 21.82, score: 65, co2: "6.2", renewables: "30%", hdi: "0.88", epi: "62.4", pollution: "Mod", forest: "30%", life: "82.2", water: "100%", gdp: "$20k", gini: "32.3", governance: "Med", trivia: "Islands aiming for 100% renewable self-sufficiency.", color: "#60a5fa" },
  { id: 43, iso: "POL", name: "Poland", lat: 51.91, lon: 19.14, score: 58, co2: "7.9", renewables: "15%", hdi: "0.88", epi: "50.6", pollution: "High", forest: "30%", life: "78.7", water: "100%", gdp: "$17k", gini: "28.5", governance: "Med", trivia: "Aggressively transitioning from coal to nuclear and wind.", color: "#60a5fa" },
  { id: 44, iso: "NLD", name: "Netherlands", lat: 52.13, lon: 5.29, score: 75, co2: "8.5", renewables: "18%", hdi: "0.94", epi: "75.3", pollution: "Mod", forest: "11%", life: "82.1", water: "100%", gdp: "$57k", gini: "28.1", governance: "High", trivia: "Innovation leader in water management and dikes.", color: "#60a5fa" },

  // AMERICAS
  { id: 13, iso: "CAN", name: "Canada", lat: 56.13, lon: -106.34, score: 72, co2: "15.4", renewables: "18%", hdi: "0.93", epi: "71.0", pollution: "Low", forest: "38%", life: "82.3", water: "99%", gdp: "$52k", gini: "33.3", governance: "High", trivia: "Holds 20% of the world's surface fresh water.", color: "#60a5fa" },
  { id: 14, iso: "USA", name: "USA", lat: 37.09, lon: -95.71, score: 62, co2: "14.2", renewables: "12%", hdi: "0.92", epi: "51.1", pollution: "Mod", forest: "33%", life: "77.2", water: "99%", gdp: "$69k", gini: "41.4", governance: "Med", trivia: "Largest wind producer in the Americas.", color: "#60a5fa" },
  { id: 15, iso: "CRI", name: "Costa Rica", lat: 9.74, lon: -83.75, score: 78, co2: "1.6", renewables: "99%", hdi: "0.81", epi: "63.2", pollution: "Low", forest: "51%", life: "80.4", water: "98%", gdp: "$13k", gini: "48.7", governance: "High", trivia: "World leader in active reforestation.", color: "#facc15" },
  { id: 16, iso: "CHL", name: "Chile", lat: -35.67, lon: -71.54, score: 68, co2: "4.5", renewables: "44%", hdi: "0.85", epi: "62.3", pollution: "Low", forest: "24%", life: "80.2", water: "99%", gdp: "$16k", gini: "44.9", governance: "High", trivia: "World pioneer in green hydrogen.", color: "#60a5fa" },
  { id: 17, iso: "URY", name: "Uruguay", lat: -32.52, lon: -55.76, score: 82, co2: "2.1", renewables: "97%", hdi: "0.81", epi: "65.2", pollution: "Low", forest: "10%", life: "77.9", water: "99%", gdp: "$18k", gini: "39.5", governance: "High", trivia: "Electrical matrix nearly 100% renewable.", color: "#facc15" },
  { id: 18, iso: "BRA", name: "Brazil", lat: -14.23, lon: -51.92, score: 58, co2: "2.1", renewables: "45%", hdi: "0.75", epi: "51.2", pollution: "Mod", forest: "58%", life: "75.8", water: "91%", gdp: "$14k", gini: "48.9", governance: "Low", trivia: "The Amazon is vital for climate balance.", color: "#60a5fa" },
  { id: 19, iso: "ARG", name: "Argentina", lat: -38.41, lon: -63.61, score: 55, co2: "3.7", renewables: "12%", hdi: "0.84", epi: "46.2", pollution: "Mod", forest: "10%", life: "76.7", water: "98%", gdp: "$23k", gini: "42.3", governance: "Med", trivia: "Elite wind potential in Patagonia.", color: "#60a5fa" },
  { id: 20, iso: "COL", name: "Colombia", lat: 4.57, lon: -74.29, score: 52, co2: "1.7", renewables: "70%", hdi: "0.77", epi: "42.4", pollution: "Mod", forest: "52%", life: "76.7", water: "88%", gdp: "$6k", gini: "54.2", governance: "Med", trivia: "Second most biodiverse country in the world.", color: "#60a5fa" },
  { id: 21, iso: "MEX", name: "Mexico", lat: 23.63, lon: -102.55, score: 44, co2: "3.9", renewables: "15%", hdi: "0.76", epi: "45.1", pollution: "Mod", forest: "34%", life: "74.8", water: "94%", gdp: "$20k", gini: "45.4", governance: "Low", trivia: "Expanding its solar energy infrastructure.", color: "#10b981" },
  { id: 22, iso: "PER", name: "Peru", lat: -9.19, lon: -75.01, score: 48, co2: "1.8", renewables: "50%", hdi: "0.76", epi: "39.8", pollution: "High", forest: "53%", life: "76.7", water: "86%", gdp: "$7k", gini: "41.5", governance: "Low", trivia: "Home to ancient ecological terraces.", color: "#60a5fa" },
  { id: 45, iso: "PAN", name: "Panama", lat: 8.53, lon: -80.78, score: 67, co2: "2.5", renewables: "75%", hdi: "0.81", epi: "50.3", pollution: "Low", forest: "62%", life: "78.5", water: "95%", gdp: "$15k", gini: "49.8", governance: "Med", trivia: "One of the few carbon-negative countries in the world.", color: "#60a5fa" },
  { id: 46, iso: "ECU", name: "Ecuador", lat: -1.83, lon: -78.18, score: 49, co2: "2.3", renewables: "50%", hdi: "0.74", epi: "42.0", pollution: "Mod", forest: "50%", life: "77.0", water: "85%", gdp: "$6k", gini: "47.3", governance: "Low", trivia: "Rights of nature are constitutionally protected.", color: "#60a5fa" },

  // ASIA & OCEANIA
  { id: 23, iso: "JPN", name: "Japan", lat: 36.20, lon: 138.25, score: 78, co2: "8.7", renewables: "20%", hdi: "0.92", epi: "57.2", pollution: "Low", forest: "68%", life: "84.6", water: "100%", gdp: "$39k", gini: "32.9", governance: "High", trivia: "Leader in waste recycling technology.", color: "#facc15" },
  { id: 24, iso: "NZL", name: "New Zealand", lat: -40.90, lon: 174.88, score: 81, co2: "6.5", renewables: "80%", hdi: "0.93", epi: "71.3", pollution: "Low", forest: "38%", life: "82.3", water: "100%", gdp: "$45k", gini: "32.3", governance: "High", trivia: "Aims for net-zero emissions soon.", color: "#facc15" },
  { id: 25, iso: "AUS", name: "Australia", lat: -25.27, lon: 133.77, score: 70, co2: "15.3", renewables: "24%", hdi: "0.94", epi: "60.1", pollution: "Low", forest: "16%", life: "83.4", water: "100%", gdp: "$56k", gini: "32.3", governance: "High", trivia: "Expanding massive solar farms in the outback.", color: "#60a5fa" },
  { id: 26, iso: "SGP", name: "Singapore", lat: 1.35, lon: 103.82, score: 72, co2: "8.1", renewables: "3%", hdi: "0.94", epi: "50.9", pollution: "Low", forest: "3%", life: "83.6", water: "100%", gdp: "$100k", gini: "45.9", governance: "High", trivia: "A 'City in a Garden' with vertical forests.", color: "#60a5fa" },
  { id: 27, iso: "KOR", name: "South Korea", lat: 35.90, lon: 127.76, score: 68, co2: "11.6", renewables: "6%", hdi: "0.92", epi: "46.9", pollution: "Mod", forest: "63%", life: "83.5", water: "100%", gdp: "$35k", gini: "33.1", governance: "High", trivia: "Innovator in hydrogen fuel cells.", color: "#60a5fa" },
  { id: 28, iso: "CHN", name: "China", lat: 35.86, lon: 104.19, score: 38, co2: "7.6", renewables: "14%", hdi: "0.76", epi: "28.4", pollution: "High", forest: "22%", life: "78.1", water: "93%", gdp: "$12k", gini: "38.2", governance: "Med", trivia: "Largest solar panel manufacturer.", color: "#10b981" },
  { id: 29, iso: "IND", name: "India", lat: 20.59, lon: 78.96, score: 32, co2: "1.8", renewables: "10%", hdi: "0.63", epi: "18.9", pollution: "High", forest: "24%", life: "69.8", water: "76%", gdp: "$2k", gini: "35.7", governance: "Med", trivia: "Massive reforestation drives in recent years.", color: "#10b981" },
  { id: 30, iso: "THA", name: "Thailand", lat: 15.87, lon: 100.99, score: 47, co2: "3.7", renewables: "15%", hdi: "0.78", epi: "38.1", pollution: "High", forest: "37%", life: "77.2", water: "98%", gdp: "$7k", gini: "35.0", governance: "Low", trivia: "Focusing on bio-circular-green economy model.", color: "#60a5fa" },
  { id: 31, iso: "VNM", name: "Vietnam", lat: 14.05, lon: 108.27, score: 46, co2: "3.2", renewables: "35%", hdi: "0.70", epi: "20.1", pollution: "High", forest: "47%", life: "75.4", water: "92%", gdp: "$4k", gini: "35.7", governance: "Med", trivia: "Solar energy boom in SE Asia.", color: "#60a5fa" },
  { id: 32, iso: "IDN", name: "Indonesia", lat: -0.78, lon: 113.92, score: 42, co2: "2.2", renewables: "12%", hdi: "0.72", epi: "28.2", pollution: "High", forest: "50%", life: "71.7", water: "72%", gdp: "$4k", gini: "37.9", governance: "Low", trivia: "Vital for mangrove conservation globally.", color: "#10b981" },
  { id: 47, iso: "MYS", name: "Malaysia", lat: 4.21, lon: 101.97, score: 51, co2: "7.1", renewables: "18%", hdi: "0.80", epi: "44.0", pollution: "High", forest: "67%", life: "76.2", water: "94%", gdp: "$11k", gini: "41.1", governance: "Med", trivia: "Committed to maintaining 50% forest cover.", color: "#60a5fa" },
  { id: 48, iso: "PHL", name: "Philippines", lat: 12.87, lon: 121.77, score: 39, co2: "1.2", renewables: "25%", hdi: "0.71", epi: "34.2", pollution: "High", forest: "23%", life: "71.2", water: "91%", gdp: "$3k", gini: "42.3", governance: "Low", trivia: "Highly vulnerable to climate change typhoons.", color: "#10b981" },
  { id: 49, iso: "KAZ", name: "Kazakhstan", lat: 48.01, lon: 66.92, score: 41, co2: "13.5", renewables: "3%", hdi: "0.82", epi: "38.2", pollution: "High", forest: "1%", life: "73.5", water: "94%", gdp: "$10k", gini: "27.8", governance: "Low", trivia: "Massive potential for solar and wind on the steppes.", color: "#10b981" },

  // AFRICA & MIDDLE EAST
  { id: 33, iso: "MAR", name: "Morocco", lat: 31.79, lon: -7.09, score: 59, co2: "1.9", renewables: "35%", hdi: "0.68", epi: "42.5", pollution: "Mod", forest: "12%", life: "76.7", water: "88%", gdp: "$3k", gini: "39.5", governance: "Med", trivia: "World's largest concentrated solar plant.", color: "#60a5fa" },
  { id: 34, iso: "KEN", name: "Kenya", lat: -0.02, lon: 37.90, score: 53, co2: "0.4", renewables: "90%", hdi: "0.58", epi: "30.8", pollution: "Mod", forest: "6%", life: "66.7", water: "59%", gdp: "$2k", gini: "40.8", governance: "Med", trivia: "Leader in geothermal energy.", color: "#60a5fa" },
  { id: 35, iso: "ZAF", name: "South Africa", lat: -30.55, lon: 22.93, score: 42, co2: "7.5", renewables: "7%", hdi: "0.71", epi: "37.2", pollution: "High", forest: "7%", life: "64.1", water: "85%", gdp: "$7k", gini: "63.0", governance: "Low", trivia: "Developing large-scale solar projects.", color: "#10b981" },
  { id: 36, iso: "ETH", name: "Ethiopia", lat: 9.14, lon: 40.48, score: 39, co2: "0.1", renewables: "93%", hdi: "0.48", epi: "24.5", pollution: "High", forest: "15%", life: "66.6", water: "41%", gdp: "$1k", gini: "35.0", governance: "Low", trivia: "Aims to plant 5 billion trees annually.", color: "#10b981" },
  { id: 37, iso: "SAU", name: "Saudi Arabia", lat: 23.88, lon: 45.07, score: 35, co2: "15.3", renewables: "0.1%", hdi: "0.85", epi: "28.1", pollution: "High", forest: "0.5%", life: "75.1", water: "97%", gdp: "$23k", gini: "45.0", governance: "Med", trivia: "Building Neom, a zero-carbon futuristic city.", color: "#10b981" },
  { id: 38, iso: "TUR", name: "Turkey", lat: 38.96, lon: 35.24, score: 54, co2: "4.8", renewables: "20%", hdi: "0.83", epi: "26.3", pollution: "High", forest: "15%", life: "77.7", water: "98%", gdp: "$10k", gini: "41.9", governance: "Med", trivia: "Significant solar potential hub.", color: "#60a5fa" },
  { id: 39, iso: "EGY", name: "Egypt", lat: 26.82, lon: 30.80, score: 40, co2: "2.5", renewables: "5%", hdi: "0.73", epi: "34.1", pollution: "High", forest: "0.1%", life: "70.2", water: "95%", gdp: "$4k", gini: "31.5", governance: "Med", trivia: "Huge wind farms in the Red Sea.", color: "#10b981" },
  { id: 40, iso: "RUS", name: "Russia", lat: 61.52, lon: 105.31, score: 52, co2: "11.1", renewables: "3%", hdi: "0.82", epi: "37.5", pollution: "High", forest: "49%", life: "71.3", water: "96%", gdp: "$12k", gini: "36.0", governance: "Low", trivia: "Immense forest carbon sink.", color: "#60a5fa" },
  { id: 50, iso: "ARE", name: "UAE", lat: 23.42, lon: 53.84, score: 55, co2: "19.3", renewables: "10%", hdi: "0.91", epi: "52.4", pollution: "High", forest: "4%", life: "77.9", water: "99%", gdp: "$44k", gini: "26.0", governance: "Med", trivia: "Hosting COP28 and investing heavily in renewables.", color: "#60a5fa" },
  { id: 51, iso: "DZA", name: "Algeria", lat: 28.03, lon: 1.65, score: 38, co2: "3.5", renewables: "1%", hdi: "0.74", epi: "29.6", pollution: "High", forest: "1%", life: "76.8", water: "94%", gdp: "$4k", gini: "27.6", governance: "Low", trivia: "Vast Saharan solar energy potential.", color: "#10b981" },
  { id: 52, iso: "GHA", name: "Ghana", lat: 7.94, lon: -1.02, score: 45, co2: "0.6", renewables: "40%", hdi: "0.63", epi: "27.7", pollution: "High", forest: "35%", life: "64.1", water: "86%", gdp: "$2k", gini: "43.5", governance: "Med", trivia: "Pioneer in African digital environmental tracking.", color: "#10b981" },
];

/* ==========================================================================
   COMPONENT: Header with Search (EXACT CLONE OF ABOUT US + SEARCH LOGIC)
   ========================================================================== */
const Header = ({ searchQuery, setSearchQuery, filteredPoints, focusOnCountry }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { name: 'About Us', href: '/about-us' },
    { name: 'Globe', href: '/globe-eco' }, 
    { name: 'Settings', href: '/settings' },
    { name: 'Help/FAQ', href: '/help' },
    { name: 'Sign Up', href: '/sign-up' }
  ];

  return (
    <>
      {/* EXACT CLASSES FROM ABOUT US HEADER:
        px-0 md:px-[30px] py-1 md:py-6 h-14 md:h-auto
        Added pointer-events-none to container, pointer-events-auto to children
      */}
      <header className="absolute top-0 left-0 w-full z-50 px-0 md:px-[30px] py-1 md:py-6 flex justify-between items-center h-14 md:h-auto pointer-events-none">
        
        {/* LOGO: EXACT CLASSES FROM ABOUT US (pl-1 md:pl-0) */}
        <Link href="/" className="flex items-center gap-2 group cursor-pointer no-underline relative z-50 pl-1 md:pl-0 pointer-events-auto">
          <GlobeIcon className="w-7 h-7 md:w-8 md:h-8 text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" strokeWidth={1.5} />
          <span className="text-white font-bold text-lg md:text-xl tracking-wide font-sans text-white">EARTHLY</span>
        </Link>

        {/* NAV: EXACT CLASSES FROM ABOUT US */}
        <nav className="hidden md:flex items-center gap-8 bg-white/10 backdrop-blur-md px-8 py-3 rounded-full border border-white/10 shadow-lg pointer-events-auto">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="text-white text-sm font-medium transition-all duration-300 hover:scale-110 transform no-underline">
              {item.name}
            </Link>
          ))}
        </nav>

        {/* RIGHT ACTIONS: EXACT CLASSES FROM ABOUT US (pr-1 md:pr-0) */}
        <div className="flex items-center gap-4 z-50 pr-1 md:pr-0 pointer-events-auto">
          
          {/* SEARCH COMPONENT INJECTED HERE */}
          <div className="flex items-center relative">
            <div className={`flex items-center transition-all duration-500 ease-in-out ${isSearchOpen ? 'w-[160px] md:w-[350px] opacity-100 mr-2' : 'w-0 opacity-0'} overflow-hidden`}>
               <input
                type="text"
                placeholder="Search country..."
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 text-sm text-white w-full outline-none placeholder:text-white/30 font-light"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* The Search Trigger Button - Same Styling as About Us but with onClick */}
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 active:scale-95 border border-white/5 shadow-lg">
              <Search size={18} />
            </button>
            
            {/* Search Results Dropdown */}
            {isSearchOpen && filteredPoints.length > 0 && (
              <div className="absolute top-full right-0 mt-3 w-[250px] md:w-[350px] glass-card-static rounded-[22px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 border-white/10 animate-in fade-in slide-in-from-top-2">
                {filteredPoints.map((p) => (
                  <button key={p.id} onClick={() => { focusOnCountry(p); setIsSearchOpen(false); }} className="w-full px-6 py-4 text-left hover:bg-white/[0.08] flex items-center justify-between border-b border-white/5 last:border-none transition-colors duration-150 group">
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm group-hover:text-emerald-400 transition-colors text-white">{p.name}</span>
                      <span className="text-[10px] text-white/30 uppercase tracking-widest">{p.iso}</span>
                    </div>
                    <ArrowUpRight size={14} className="text-white/20 group-hover:text-blue-400 transition-colors" />
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* END SEARCH COMPONENT */}

          <Link href="/profile" className="hidden md:flex w-10 h-10 rounded-full bg-white/10 items-center justify-center text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 active:scale-95 border border-white/5 no-underline">
            <User size={18} />
          </Link>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-300 active:scale-95 border border-white/5">
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU LAYER */}
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
   MAIN COMPONENT: App
   ========================================================================== */
export default function App() {
  const mountRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const routeGroupRef = useRef<THREE.Group | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const cloudsRef = useRef<THREE.Mesh | null>(null);
  
  const [ecoPoints] = useState<EcoPoint[]>(MOCK_ECO_POINTS);
  const [selectedPoint, setSelectedPoint] = useState<EcoPoint | null>(null);
  const [activeRouteOrigin, setActiveRouteOrigin] = useState<EcoPoint | null>(null); 
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [isRouteMode, setIsRouteMode] = useState<boolean>(false);
  // NEW STATE: Control Mobile Bottom Sheet expansion
  const [isSheetExpanded, setIsSheetExpanded] = useState<boolean>(false);

  const latLonToVector3 = useCallback((lat: number, lon: number, radius: number): THREE.Vector3 => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  }, []);

  const getPointColor = useCallback((score: number) => {
    if (score > 75) return "#facc15"; 
    if (score > 45) return "#60a5fa"; 
    return "#10b981"; 
  }, []);

  const getRankPosColor = useCallback((idx: number) => {
    if (idx === 0) return "#facc15"; 
    if (idx === 1) return "#60a5fa"; 
    return "#10b981"; 
  }, []);

  const filteredPoints = useMemo(() => {
    if (!searchQuery) return [];
    const query = searchQuery.toLowerCase();
    return ecoPoints.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.iso.toLowerCase().includes(query)
    ).slice(0, 10);
  }, [searchQuery, ecoPoints]);

  const topSustainability = useMemo(() => {
    return [...ecoPoints]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [ecoPoints]);

  const recommendedRoutes = useMemo(() => {
    const origin = activeRouteOrigin || selectedPoint;
    if (!origin) return topSustainability;
    
    return [...ecoPoints]
      .filter(p => p.iso !== origin.iso)
      .map(p => {
        const d = Math.sqrt(Math.pow(p.lat - origin.lat, 2) + Math.pow(p.lon - origin.lon, 2));
        return { ...p, dist: d };
      })
      .sort((a, b) => {
        const scoreA = a.score * 0.8;
        const scoreB = b.score * 0.8;
        // Handle potentially undefined dist
        const distA = (a.dist || 0) * 1.2;
        const distB = (b.dist || 0) * 1.2;
        
        return (distA - scoreA) - (distB - scoreB);
      })
      .slice(0, 5);
  }, [activeRouteOrigin, selectedPoint, topSustainability, ecoPoints]);

  const displaySidebarList = useMemo(() => {
    return isRouteMode ? recommendedRoutes : topSustainability;
  }, [isRouteMode, recommendedRoutes, topSustainability]);

  const createCircleTexture = useCallback(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64; canvas.height = 64;
    const context = canvas.getContext('2d');
    if (!context) return null;
    const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }, []);

  const drawEcoRoutes = useCallback((startPoint: EcoPoint, targets: EcoPoint[]) => {
    if (!routeGroupRef.current) return;
    const routesGroup = routeGroupRef.current;
    
    while(routesGroup.children.length > 0){ 
      const child = routesGroup.children[0];
      if (child instanceof THREE.Mesh || child instanceof THREE.Line) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach(m => m.dispose());
        } else {
          child.material.dispose();
        }
      }
      routesGroup.remove(child); 
    }
    
    const radius = 85;
    const startVec = latLonToVector3(startPoint.lat, startPoint.lon, radius + 1.2);
    
    targets.forEach((target, idx) => {
      const endVec = latLonToVector3(target.lat, target.lon, radius + 1.2);
      const distance = startVec.distanceTo(endVec);
      const midPointDir = new THREE.Vector3().addVectors(startVec, endVec).normalize();
      const archHeightFactor = Math.min(75, distance * 0.55); 
      const archHeight = radius + 12 + archHeightFactor;
      const zenith = midPointDir.clone().multiplyScalar(archHeight);

      const controlRadialOffset = Math.min(55, distance * 0.45);
      const cp1 = startVec.clone().normalize().multiplyScalar(radius + 15 + controlRadialOffset).lerp(zenith, 0.5);
      const cp2 = endVec.clone().normalize().multiplyScalar(radius + 15 + controlRadialOffset).lerp(zenith, 0.5);
      
      const curve = new THREE.CubicBezierCurve3(startVec, cp1, cp2, endVec);
      const points = curve.getPoints(75); 
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      
      const routeHex = getRankPosColor(idx);
      const material = new THREE.LineBasicMaterial({ 
        color: new THREE.Color(routeHex), 
        transparent: true, 
        opacity: 0.9,
        linewidth: 3 
      });
      
      const line = new THREE.Line(geometry, material);
      routesGroup.add(line);
      
      const endDot = new THREE.Mesh(
        new THREE.SphereGeometry(1.8, 16, 16), 
        new THREE.MeshBasicMaterial({ color: material.color })
      );
      endDot.position.copy(endVec);
      routesGroup.add(endDot);
    });
  }, [latLonToVector3, getRankPosColor]);

  const focusOnCountry = useCallback((point: EcoPoint) => {
    if (!controlsRef.current) return;
    setIsRouteMode(false);
    setActiveRouteOrigin(null);
    setSelectedPoint(point);
    setSearchQuery("");
    const currentDistance = controlsRef.current.object.position.length();
    const pos = latLonToVector3(point.lat, point.lon, currentDistance);
    controlsRef.current.object.position.set(pos.x, pos.y, pos.z);
  }, [latLonToVector3]);

  const handleActivateRoute = () => {
    if (selectedPoint) {
      setIsRouteMode(true);
      setActiveRouteOrigin(selectedPoint); 
      setSelectedPoint(null); 
    }
  };

  useEffect(() => {
    if (isRouteMode && activeRouteOrigin) {
      drawEcoRoutes(activeRouteOrigin, recommendedRoutes);
    } else if (!isRouteMode && routeGroupRef.current) {
      while(routeGroupRef.current.children.length > 0){ routeGroupRef.current.remove(routeGroupRef.current.children[0]); }
    }
  }, [isRouteMode, activeRouteOrigin, recommendedRoutes, drawEcoRoutes]);

  useEffect(() => {
    if (!mountRef.current || ecoPoints.length === 0) return;
    const currentMount = mountRef.current;
    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
    // Adjust initial distance based on screen size/aspect to prevent cutting
    const initialZ = width < 768 ? 420 : 320; 
    camera.position.set(0, 0, initialZ);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    currentMount.innerHTML = ''; 
    currentMount.appendChild(renderer.domElement);
    const circleTexture = createCircleTexture();
    
    const starsCount = 20000;
    const starsGeometry = new THREE.BufferGeometry();
    const starsPositions = new Float32Array(starsCount * 3);
    const starsColors = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount; i++) {
      const radius = 1300 + Math.random() * 4500;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starsPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starsPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starsPositions[i * 3 + 2] = radius * Math.cos(phi);
      const rand = Math.random();
      if (rand > 0.98) { starsColors[i * 3] = 1.0; starsColors[i * 3 + 1] = 0.95; starsColors[i * 3 + 2] = 0.5; } 
      else { const b = 0.95 + Math.random() * 0.05; starsColors[i * 3] = b; starsColors[i * 3 + 1] = b; starsColors[i * 3 + 2] = b; }
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(starsColors, 3));
    
    const starField = new THREE.Points(starsGeometry, new THREE.PointsMaterial({ size: 8.0, vertexColors: true, transparent: true, opacity: 1.0, map: circleTexture, depthWrite: false, sizeAttenuation: true }));
    scene.add(starField);
    starsRef.current = starField;

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    const world = new THREE.Group();
    scene.add(world);
    const routeGroup = new THREE.Group();
    world.add(routeGroup);
    routeGroupRef.current = routeGroup;

    const loader = new THREE.TextureLoader();
    const earthTexture = loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');
    const cloudTexture = loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png');

    const globeRadius = 85; 
    const earthMesh = new THREE.Mesh(new THREE.SphereGeometry(globeRadius, 64, 64), new THREE.MeshPhongMaterial({ map: earthTexture, shininess: 25, specular: new THREE.Color(0x333333) }));
    world.add(earthMesh);

    const cloudMesh = new THREE.Mesh(new THREE.SphereGeometry(globeRadius + 0.8, 64, 64), new THREE.MeshPhongMaterial({ map: cloudTexture, transparent: true, opacity: 0.4, depthWrite: false }));
    world.add(cloudMesh);
    cloudsRef.current = cloudMesh;

    const markers = new THREE.Group();
    world.add(markers);

    ecoPoints.forEach((point) => {
      const pos = latLonToVector3(point.lat, point.lon, globeRadius + 1);
      const dotColor = getPointColor(point.score);
      const dot = new THREE.Mesh(new THREE.CircleGeometry(1.0, 32), new THREE.MeshBasicMaterial({ color: dotColor, side: THREE.DoubleSide }));
      dot.position.copy(pos);
      dot.lookAt(new THREE.Vector3(0,0,0));
      dot.userData = point;
      markers.add(dot);
      const ring = new THREE.Mesh(new THREE.RingGeometry(1.3, 1.7, 32), new THREE.MeshBasicMaterial({ color: dotColor, transparent: true, opacity: 0.4, side: THREE.DoubleSide }));
      ring.position.copy(pos);
      ring.lookAt(new THREE.Vector3(0,0,0));
      markers.add(ring);
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; 
    controls.autoRotate = true; 
    controls.autoRotateSpeed = 0.3;
    controls.minDistance = 140; 
    controls.maxDistance = 600;
    // DISABLE PANNING ON MOBILE
    controls.enablePan = window.innerWidth >= 768;
    controlsRef.current = controls;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (clientX: number, clientY: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(markers.children);
      
      const marker = intersects.find((i) => i.object.userData?.iso);
      
      if (marker) focusOnCountry(marker.object.userData as EcoPoint);
    };

    const onMouseDown = (event: MouseEvent) => onPointerDown(event.clientX, event.clientY);
    const onTouchStart = (event: TouchEvent) => {
        if(event.touches.length > 0) {
            onPointerDown(event.touches[0].clientX, event.touches[0].clientY);
        }
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('touchstart', onTouchStart);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      if (starsRef.current) starsRef.current.rotation.y += 0.00005;
      if (cloudsRef.current) cloudsRef.current.rotation.y += 0.00015;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      if (controlsRef.current) {
        controlsRef.current.enablePan = window.innerWidth >= 768;
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      renderer.domElement.removeEventListener('touchstart', onTouchStart);
      cancelAnimationFrame(animationId);
      if (currentMount.contains(renderer.domElement)) currentMount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [ecoPoints, latLonToVector3, createCircleTexture, focusOnCountry, getPointColor]);

  const getRankIcon = (idx: number) => {
    if (idx === 0) return <Trophy size={16} />;
    if (idx === 1) return <Star size={16} />;
    return <Award size={16} />;
  };

  return (
    <div className="relative w-full h-screen bg-[#050609] overflow-hidden font-sans text-white selection:bg-emerald-500/30">
      <style dangerouslySetInnerHTML={{ __html: `
        html, body, #__next { margin: 0; padding: 0; background-color: #050609; overflow: hidden; }
        .glass-base { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); }
        .glass-card-static { background: rgba(10, 11, 15, 0.85); border: 1px solid rgba(255, 255, 255, 0.08); }
        .rank-item { transition: background-color 0.15s ease; }
        .rank-item:hover { background: rgba(255, 255, 255, 0.08); }
        .btn-hover { transition: transform 0.2s ease, background-color 0.2s ease; }
        .btn-hover:hover { transform: translateY(-1px); background-color: rgba(255, 255, 255, 0.12); }
        .no-underline { text-decoration: none !important; }
        @keyframes shine-pulse {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); transform: scale(1); }
          50% { box-shadow: 0 0 20px 10px rgba(16, 185, 129, 0); transform: scale(1.1); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); transform: scale(1); }
        }
        .animate-shine-pulse { animation: shine-pulse 2s infinite ease-in-out; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}} />

      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} filteredPoints={filteredPoints} focusOnCountry={focusOnCountry} />

      <div className="absolute top-20 md:top-24 lg:top-32 left-0 w-full px-4 md:px-8 lg:px-12 z-30 pointer-events-none flex flex-col md:flex-row justify-between items-start gap-6 text-white">
        {/* LEFT SECTION */}
        <div className="flex flex-col gap-4 md:gap-8 w-full md:w-[400px]">
          <div className="space-y-3 md:space-y-4">
              {/* Updated Header Layout for Mobile Alignment */}
              <div className="flex w-full justify-between items-center md:w-auto md:justify-start md:gap-3 pointer-events-auto">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-400 cursor-default animate-in fade-in slide-in-from-bottom-4 duration-700 hover:bg-white/10 transition-all duration-500 hover:-translate-y-0.5">
                 <Leaf size={14} /> The Earthly Analytics
               </div>
               <button 
                 onClick={() => setShowInfoModal(true)} 
                 className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 btn-hover pointer-events-auto animate-shine-pulse shadow-emerald-500/20"
               >
                 <Info size={18} />
               </button>
              </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tighter leading-[1.05] pointer-events-auto text-white">
              Eco Travel <br /> <span className="text-white/40 italic font-light hover:text-emerald-400 transition-colors duration-500 cursor-default lowercase">interactive globe</span>
            </h1>
          </div>

          {/* Centered Toggle on Mobile */}
          <div className="flex items-center gap-4 pointer-events-auto bg-white/[0.03] border border-white/10 p-1.5 rounded-full w-fit mx-auto md:mx-0 mt-2 md:mt-0">
            <button onClick={() => setIsRouteMode(false)} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-200 ${!isRouteMode ? 'bg-emerald-500 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}>Analysis</button>
            <button onClick={() => setIsRouteMode(true)} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-200 ${isRouteMode ? 'bg-emerald-500 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}>Eco-Routes</button>
          </div>

          {/* DESKTOP ONLY: Sustainability Tiers Card */}
          <div className="hidden md:flex pointer-events-auto glass-card-static p-6 md:p-8 rounded-[40px] shadow-2xl flex-col border-white/10 mt-2 h-auto md:h-[370px] justify-between">
              <div className="flex items-center gap-4 mb-2 shrink-0">
                <div className="w-11 h-11 rounded-2xl bg-white/[0.03] flex items-center justify-center border border-white/10 shadow-inner">
                  <Layers className="text-emerald-400" size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-white/90">Sustainability</h3>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1 font-medium">Performance Tiers</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 flex-1 justify-center py-1">
                <div className="rank-item flex items-center gap-5 p-4 rounded-[25px] bg-white/[0.01] border border-white/5 cursor-default group/tier">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center transition-all duration-300 group-hover/tier:bg-yellow-500/20 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#facc15] shadow-[0_0_12px_#facc15]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-yellow-400 group-hover/tier:text-white transition-colors">High Tier</p>
                      <span className="text-[11px] font-black text-yellow-400/50">76% - 100%</span>
                    </div>
                  </div>
                </div>

                <div className="rank-item flex items-center gap-5 p-4 rounded-[25px] bg-white/[0.01] border border-white/5 cursor-default group/tier">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center transition-all duration-300 group-hover/tier:bg-blue-500/20 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#60a5fa] shadow-[0_0_12px_#60a5fa]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-blue-400 group-hover/tier:text-white transition-colors">Mid Tier</p>
                      <span className="text-[11px] font-black text-blue-400/50">46% - 75%</span>
                    </div>
                  </div>
                </div>

                <div className="rank-item flex items-center gap-5 p-4 rounded-[25px] bg-white/[0.01] border border-white/5 cursor-default group/tier">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center transition-all duration-300 group-hover/tier:bg-emerald-500/20 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-[0_0_12px_#10b981]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 group-hover/tier:text-white transition-colors">Low Tier</p>
                      <span className="text-[11px] font-black text-emerald-400/50">0% - 45%</span>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>

        {/* DESKTOP ONLY: Right Sidebar (Top 5) */}
        <div className="hidden lg:flex flex-col gap-4 w-[380px] pointer-events-auto">
          <div className="glass-card-static p-8 md:p-10 rounded-[45px] relative overflow-hidden h-fit flex flex-col shadow-2xl border-white/10">
            <div className="flex items-center gap-4 mb-8 shrink-0">
              <div className={`w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center border border-white/10 shadow-inner`}>
                {isRouteMode ? <Compass className="text-blue-400" size={26} /> : <Trophy className="text-yellow-400" size={26} />}
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-white/90">{isRouteMode ? 'Nearby Eco Routes' : 'Global Leaders'}</h3>
                <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1 font-medium text-white">
                  {isRouteMode ? `Top 5 near ${activeRouteOrigin?.name || selectedPoint?.name}` : 'Top 5 Sustainability'}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {displaySidebarList.map((p, idx) => {
                const posColor = getRankPosColor(idx);
                const rankIcon = getRankIcon(idx);
                
                return (
                  <button key={p.id} onClick={() => focusOnCountry(p)} className="rank-item flex items-center gap-5 p-4.5 rounded-[25px] bg-white/[0.02] border border-white/5 group/item">
                    <div 
                      className="w-11 h-11 rounded-xl border flex items-center justify-center transition-colors"
                      style={{ 
                        backgroundColor: `${posColor}1A`, 
                        borderColor: `${posColor}33` 
                      }}
                    >
                      <span className="text-base font-black" style={{ color: posColor }}>0{idx + 1}</span>
                    </div>
                    
                    <div className="flex-1 text-left">
                      <p className="text-sm font-bold tracking-tight text-white/80 group-hover/item:text-white transition-colors duration-150 uppercase text-white">{p.name}</p>
                      <div className="h-1.5 bg-white/5 rounded-full mt-3 overflow-hidden w-full">
                        <div 
                          className="h-full transition-all duration-500" 
                          style={{ width: `${p.score}%`, backgroundColor: posColor }} 
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-1.5 min-w-[50px]">
                      <div style={{ color: posColor }}>{rankIcon}</div>
                      <span className="text-xs font-bold tracking-tighter" style={{ color: posColor }}>{p.score}%</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* GLOBE CONTAINER 
        - Mobile: top-[35vh], h-[60vh] -> Pushes globe down, makes it visually smaller.
        - Desktop: md:top-0 md:h-full -> Full screen.
      */}
      <div ref={mountRef} className="absolute left-0 w-full transition-all duration-500 ease-in-out top-[20vh] h-[80vh] md:top-0 md:h-full cursor-grab active:cursor-grabbing" />

      {/* MOBILE ONLY: Bottom Overview Sheet (Collapsible) - Shows when no country is selected */}
      {!selectedPoint && (
        <div 
            className={`md:hidden fixed inset-x-0 bottom-0 z-[90] glass-card-static rounded-t-[30px] shadow-[0_-10px_40px_rgba(0,0,0,0.6)] border-b-0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                isSheetExpanded ? 'h-[60vh]' : 'h-[85px]'
            }`}
        >
           {/* Handle / Toggle Area */}
           <button 
                onClick={() => setIsSheetExpanded(!isSheetExpanded)}
                className="w-full flex flex-col items-center justify-center pt-6 pb-4 active:opacity-70 transition-opacity"
           >
             <div className="w-12 h-1.5 rounded-full bg-white/20 mb-5" />
             <div className="flex items-center gap-2 text-emerald-400">
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                    {isSheetExpanded ? 'Close Analytics' : 'Explore Data'}
                </span>
                <ChevronUp 
                    size={16} 
                    className={`transition-transform duration-500 ${isSheetExpanded ? 'rotate-180' : 'rotate-0'}`}
                />
             </div>
           </button>

           {/* Content Wrapper with Fade Transition */}
           <div className={`px-6 pb-10 overflow-y-auto h-full transition-opacity duration-300 delay-100 ${isSheetExpanded ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
             
             {/* Tiers Section (Mobile) */}
             <div className="mb-8 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white/80 mb-4 flex items-center gap-2">
                  <Layers size={14} className="text-emerald-400"/> Performance Tiers
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-yellow-500/10 border border-yellow-500/20 p-2 rounded-xl text-center">
                    <div className="w-2 h-2 rounded-full bg-[#facc15] mx-auto mb-1 shadow-[0_0_8px_#facc15]" />
                    <span className="text-xs font-bold text-yellow-400 block">High</span>
                    <span className="text-[10px] text-yellow-400/60">76-100%</span>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 p-2 rounded-xl text-center">
                    <div className="w-2 h-2 rounded-full bg-[#60a5fa] mx-auto mb-1 shadow-[0_0_8px_#60a5fa]" />
                    <span className="text-xs font-bold text-blue-400 block">Mid</span>
                    <span className="text-[10px] text-blue-400/60">46-75%</span>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-xl text-center">
                    <div className="w-2 h-2 rounded-full bg-[#10b981] mx-auto mb-1 shadow-[0_0_8px_#10b981]" />
                    <span className="text-xs font-bold text-emerald-400 block">Low</span>
                    <span className="text-[10px] text-emerald-400/60">0-45%</span>
                  </div>
                </div>
             </div>

             {/* Top List Section (Mobile) */}
             <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white/80 mb-4 flex items-center gap-2">
                  {isRouteMode ? <Compass size={14} className="text-blue-400"/> : <Trophy size={14} className="text-yellow-400"/>}
                  {isRouteMode ? 'Nearby Routes' : 'Global Leaders'}
                </h3>
                <div className="flex flex-col gap-3 pb-12">
                  {displaySidebarList.map((p, idx) => {
                      const posColor = getRankPosColor(idx);
                      return (
                        <button key={p.id} onClick={() => focusOnCountry(p)} className="flex items-center gap-3 p-3 rounded-[20px] bg-white/[0.03] border border-white/5 active:bg-white/[0.08] transition-colors">
                          <div className="w-8 h-8 rounded-lg border flex items-center justify-center font-black text-xs" style={{ backgroundColor: `${posColor}1A`, borderColor: `${posColor}33`, color: posColor }}>
                            0{idx + 1}
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-xs font-bold text-white uppercase">{p.name}</p>
                             <div className="h-1 bg-white/5 rounded-full mt-1.5 overflow-hidden w-full">
                              <div className="h-full" style={{ width: `${p.score}%`, backgroundColor: posColor }} />
                            </div>
                          </div>
                           <span className="text-xs font-black" style={{ color: posColor }}>{p.score}%</span>
                        </button>
                      );
                  })}
                </div>
             </div>
           </div>
        </div>
      )}

      {/* Country Details Modal (Shows when a country IS selected) */}
      {selectedPoint && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6 bg-black/60 transition-opacity duration-300">
          <div className="w-full md:w-[95%] max-w-4xl !bg-[#050609] md:!bg-[rgba(10,11,15,0.85)] glass-card-static p-5 md:p-12 rounded-t-[30px] md:rounded-[50px] shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-y-auto max-h-[85dvh] md:max-h-[90vh] animate-in slide-in-from-bottom-full duration-300">
            <div className="flex justify-between items-start mb-6 md:mb-10">
              <div className="flex gap-4 md:gap-8 items-center">
                <div className={`w-14 h-14 md:w-20 md:h-20 rounded-[20px] md:rounded-[28px] flex items-center justify-center border shrink-0`} style={{ backgroundColor: `${getPointColor(selectedPoint.score)}1A`, borderColor: `${getPointColor(selectedPoint.score)}33` }}>
                  <span className="text-xl md:text-3xl font-bold text-white/90 uppercase tracking-tighter text-white">{selectedPoint.iso}</span>
                </div>
                <div>
                  <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-none mb-2 md:mb-4 uppercase text-white">{selectedPoint.name}</h2>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                      <div className="px-3 py-1.5 md:px-5 md:py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] border text-white" style={{ color: getPointColor(selectedPoint.score), borderColor: `${getPointColor(selectedPoint.score)}4D`, backgroundColor: `${getPointColor(selectedPoint.score)}1A` }}>Score: {selectedPoint.score}%</div>
                      <div className="px-3 py-1.5 md:px-5 md:py-2 bg-white/5 border border-white/10 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">Global Rank #{ecoPoints.findIndex(p => p.iso === selectedPoint.iso) + 1}</div>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedPoint(null)} className="p-3 bg-white/5 rounded-full text-white/30 hover:text-red-400 hover:bg-red-500/10 border border-white/10 btn-hover shrink-0"><X size={20} /></button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-6 md:mb-10">
              <MetricBox icon={Wind} label="CO2 Emissions" value={selectedPoint.co2} color="text-blue-400" />
              <MetricBox icon={Zap} label="Renewables" value={selectedPoint.renewables} color="text-yellow-400" />
              <MetricBox icon={Trees} label="Forest Cover" value={selectedPoint.forest} color="text-emerald-400" />
              <MetricBox icon={Compass} label="Air Quality" value={selectedPoint.pollution} color="text-rose-400" />
              <MetricBox icon={Heart} label="Life Expectancy" value={selectedPoint.life} color="text-pink-400" />
              <MetricBox icon={TrendingUp} label="GDP (PPP)" value={selectedPoint.gdp} color="text-cyan-400" />
              <MetricBox icon={Scale} label="Gini Index" value={selectedPoint.gini} color="text-orange-400" />
              <MetricBox icon={Building2} label="Governance" value={selectedPoint.governance} color="text-indigo-400" />
              <MetricBox icon={Droplets} label="Water Access" value={selectedPoint.water} color="text-blue-500" />
              <MetricBox icon={Activity} label="EPI Index" value={selectedPoint.epi} color="text-teal-400" />
            </div>

            <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-stretch lg:items-center pt-6 md:pt-10 border-t border-white/10">
              <div className="flex-1 flex gap-4 md:gap-6 items-center">
                <div className="shrink-0 w-12 h-12 md:w-16 md:h-16 bg-white/[0.03] rounded-2xl flex items-center justify-center border border-white/10"><Award className="text-emerald-400" size={30} /></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400/60 mb-2">Sustainable Insight</p>
                  <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed tracking-wide max-w-xl text-white">&quot;{selectedPoint.trivia}&quot;</p>
                </div>
              </div>
              <button onClick={handleActivateRoute} className={`px-6 py-4 md:px-8 md:py-4.5 border rounded-[24px] font-black text-[10px] tracking-[0.15em] uppercase btn-hover flex items-center gap-3 justify-center ${isRouteMode ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg' : 'bg-white/5 border-white/10 text-white/50 hover:text-white'}`}>
                <Navigation size={18} /> Activate Routes
              </button>
            </div>
          </div>
        </div>
      )}

      {showInfoModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 bg-black/70 transition-opacity duration-300 backdrop-blur-sm">
          <div className="glass-card-static max-w-xl w-full rounded-[40px] shadow-2xl relative border-white/10 overflow-hidden flex flex-col max-h-[85dvh] md:max-h-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] -mr-32 -mt-32" />
            
            <button onClick={() => setShowInfoModal(false)} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-10"><X size={24} /></button>
            
            <div className="p-6 md:p-10 overflow-y-auto max-h-[75vh] scrollbar-hide">
              <div className="w-16 h-16 rounded-[24px] bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mb-8 relative">
                 <GlobeIcon className="text-emerald-400" size={32} />
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold tracking-tighter mb-8 uppercase tracking-widest text-white">The Eco Travel Globe</h3>
              
              <div className="space-y-8 text-white/70 font-normal leading-relaxed text-sm md:text-base">
                <section>
                  <p className="mb-4 text-white/90 font-medium">Eco Travel Globe is a real-time environmental intelligence platform designed for regenerative exploration. It integrates data from every corner of the planet to prioritize destinations where tourism fosters conservation.</p>
                </section>

                <section className="space-y-6">
                  <h4 className="text-emerald-400 font-black text-xs uppercase tracking-[0.2em] border-b border-white/10 pb-2">Understanding the Country Metrics</h4>
                  
                  <div className="grid gap-6">
                    <div>
                      <span className="text-white font-bold block mb-1">CO2 Emissions</span>
                      <p className="text-xs text-white/50 leading-relaxed">Measures annual metric tons per capita. Lower emissions indicate cleaner energy infrastructures and efficient transport systems.</p>
                    </div>
                    <div>
                      <span className="text-white font-bold block mb-1">Renewables</span>
                      <p className="text-xs text-white/50 leading-relaxed">Percentage of total energy consumption derived from clean sources like wind, solar, and hydro power.</p>
                    </div>
                    <div>
                      <span className="text-white font-bold block mb-1">Forest Cover</span>
                      <p className="text-xs text-white/50 leading-relaxed">The percentage of land area covered by forests, critical for biodiversity and carbon sequestration.</p>
                    </div>
                    <div>
                      <span className="text-white font-bold block mb-1">Air Quality</span>
                      <p className="text-xs text-white/50 leading-relaxed">Pollution levels based on particle concentration (PM2.5), indicating the safety and purity of the environment.</p>
                    </div>
                    <div>
                      <span className="text-white font-bold block mb-1">Environmental Performance Index (EPI)</span>
                      <p className="text-xs text-white/50 leading-relaxed">A summary score that ranks how well countries protect ecosystems and human health through policy.</p>
                    </div>
                    <div>
                      <span className="text-white font-bold block mb-1">Gini Index & Governance</span>
                      <p className="text-xs text-white/50 leading-relaxed">Socio-economic indicators measuring income equality and the quality of public services/policies.</p>
                    </div>
                  </div>
                </section>

                <section className="bg-white/5 p-6 rounded-[30px] border border-white/10">
                  <h4 className="text-blue-400 font-bold text-xs uppercase tracking-widest mb-3 flex items-center gap-2"><Navigation size={14}/> Regional Eco-Routes</h4>
                  <p className="text-xs text-white/50 leading-relaxed">Our regional logic suggests the top 5 most sustainable destinations near your selection. It calculates paths that balance geographical proximity with environmental performance, encouraging lower-impact regional travel.</p>
                </section>

                <section className="pt-4">
                  <h4 className="text-yellow-400 font-bold text-xs uppercase tracking-widest mb-4">Sustainability Formula</h4>
                  <div className="bg-black/40 p-5 rounded-2xl font-mono text-[10px] md:text-xs text-yellow-400/80 border border-yellow-400/10">
                    Eco Score = (CO2 reduction x 0.3) + (Renewables x 0.3) + (Forest Cover x 0.2) + (Air Quality x 0.2)
                  </div>
                </section>
              </div>
            </div>

            <div className="p-6 md:p-10 pt-0">
              <button 
                onClick={() => setShowInfoModal(false)} 
                className="w-full py-3.5 md:py-5 bg-emerald-500 text-white font-black uppercase text-xs tracking-[0.2em] rounded-[20px] hover:bg-emerald-400 hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(16,185,129,0.4)] transition-all duration-300 active:scale-95 text-white"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MetricBox({ icon: Icon, label, value, color }: MetricBoxProps) {
  return (
    <div className="bg-white/[0.03] p-3 md:p-6 rounded-[20px] md:rounded-[28px] border border-white/5 text-center transform translateZ(0)">
      <div className={`mb-2 md:mb-3.5 flex justify-center ${color}`}><Icon size={24} className="w-5 h-5 md:w-6 md:h-6" /></div>
      <p className="text-[8px] md:text-[9px] text-white/30 uppercase font-black tracking-[0.15em] mb-1 md:mb-2 leading-none text-white">{label}</p>
      <div className="text-sm md:text-base md:text-lg font-bold text-white/90 truncate w-full tracking-tight text-white">{value}</div>
    </div>
  );
}