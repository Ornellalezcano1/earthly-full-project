// @ts-nocheck
"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  Globe, 
  Wind, 
  Zap, 
  Droplets, 
  AlertCircle, 
  RefreshCw, 
  X, 
  Award, 
  MapPin,
  Compass,
  Search,
  Activity,
  Heart,
  ShieldCheck,
  User,
  Menu
} from 'lucide-react';

/* ==========================================================================
   INTERFACES & TYPES (HEADER)
   ========================================================================== */
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

interface NavItem {
  name: string;
  href: string;
}

/* ==========================================================================
   INTERFACES (GLOBE APP)
   ========================================================================== */
interface EcoPoint {
  id: number;
  iso: string;
  name: string;
  lat: number;
  lon: number;
  score: number;
  co2: string;         // co2_per_capita
  pm25: string;        // pm25 (Aire)
  renewables: string;   // renewables_elec_pct
  protected: string;   // protected_land_pct
  water: string;       // safe_water_pct
  life: string;        // life_expectancy_yrs
  hdi: string;         // hdi
  trivia: string;
  color: string;
}

/* ==========================================================================
   SIMULATED COMPONENTS (HEADER)
   ========================================================================== */
const Link = ({ href, children, className, ...props }: LinkProps) => (
  <a href={href} className={className} {...props}>
    {children}
  </a>
);

/* ==========================================================================
   COMPONENTE: Header
   ========================================================================== */
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const navItems: NavItem[] = [
    { name: 'About Us', href: '/about-us' },
    { name: 'Globe', href: '/globe-eco' },
    { name: 'Settings', href: '/settings' },
    { name: 'Help/FAQ', href: '/help' },
    { name: 'Sign Up', href: '/sign-up' }
  ];

  return (
    <>
      <header className="absolute top-0 left-0 w-full z-50 px-0 md:px-[30px] py-1 md:py-6 flex justify-between items-center h-14 md:h-auto pointer-events-none">
        <div className="pointer-events-auto pl-4 md:pl-0">
            <Link href="/" className="flex items-center gap-2 group cursor-pointer no-underline relative z-50">
            <Globe 
                className="w-7 h-7 md:w-8 md:h-8 text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" 
                strokeWidth={1.5} 
            />
            <span className="text-white font-bold text-lg md:text-xl tracking-wide font-sans">
                EARTHLY
            </span>
            </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 bg-white/10 backdrop-blur-md px-8 py-3 rounded-full border border-white/10 shadow-lg pointer-events-auto">
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

        <div className="flex items-center gap-4 z-50 pr-4 md:pr-0 pointer-events-auto">
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
   MAIN APP (GLOBE LOGIC)
   ========================================================================== */
export default function App() {
  const mountRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<any>(null);
  const [ecoPoints, setEcoPoints] = useState<EcoPoint[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<EcoPoint | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filtrado de países para el buscador basado en los datos reales del CSV
  const filteredPoints = useMemo(() => {
    if (!searchQuery) return [];
    return ecoPoints.filter((p: EcoPoint) => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.iso.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  }, [searchQuery, ecoPoints]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Petición al backend que sirve el archivo sustainability_index.csv
      const res = await fetch('http://localhost:5000/api/data');
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Error al conectar con el servidor de datos");
      }
      const data = await res.json();
      setEcoPoints(data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido";
      setError(`Error de sincronización: ${errorMessage}. Verifica que el backend esté leyendo el nuevo CSV.`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const latLonToVector3 = useCallback((lat: number, lon: number, radius: number): THREE.Vector3 => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  }, []);

  const focusOnCountry = (point: EcoPoint) => {
    if (!controlsRef.current) return;
    setSelectedPoint(point);
    setSearchQuery("");
    const pos = latLonToVector3(point.lat, point.lon, 250);
    controlsRef.current.object.position.set(pos.x, pos.y, pos.z);
    controlsRef.current.autoRotate = false;
  };

  useEffect(() => {
    if (!mountRef.current || ecoPoints.length === 0) return;
    
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617);
    
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 300;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    const currentMount = mountRef.current;
    currentMount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    const world = new THREE.Group();
    scene.add(world);

    const loader = new THREE.TextureLoader();
    const earthTexture = loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');
    
    const earthMesh = new THREE.Mesh(
      new THREE.SphereGeometry(100, 64, 64),
      new THREE.MeshPhongMaterial({ 
        map: earthTexture,
        shininess: 5,
        bumpScale: 0.05
      })
    );
    world.add(earthMesh);

    const markers = new THREE.Group();
    world.add(markers);

    ecoPoints.forEach((point: EcoPoint) => {
      const pos = latLonToVector3(point.lat, point.lon, 100.5);
      
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(1.5, 12, 12),
        new THREE.MeshBasicMaterial({ color: point.color })
      );
      dot.position.copy(pos);
      dot.userData = point;
      markers.add(dot);

      // Efecto visual para países con score sobresaliente
      if (point.score > 75) {
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(2.2, 2.6, 16),
          new THREE.MeshBasicMaterial({ color: point.color, transparent: true, opacity: 0.3, side: THREE.DoubleSide })
        );
        ring.position.copy(pos);
        ring.lookAt(new THREE.Vector3(0,0,0));
        markers.add(ring);
      }
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;
    controlsRef.current = controls;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(markers.children);
      const marker = intersects.find((i: THREE.Intersection) => i.object.userData && i.object.userData.iso);
      
      if (marker) {
        setSelectedPoint(marker.object.userData as EcoPoint);
        controls.autoRotate = false;
      }
    };

    window.addEventListener('mousedown', onMouseDown);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!currentMount) return;
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', onMouseDown);
      if (animationId) cancelAnimationFrame(animationId);
      if (currentMount && currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [ecoPoints, latLonToVector3]);

  return (
    <div className="relative w-full h-screen bg-[#020617] overflow-hidden font-sans text-white">
      
      {/* HEADER INTEGRADO */}
      <Header />

      {/* Buscador de Países Funcional del Globo (Reposicionado para no chocar con el Header) */}
      <div className="absolute top-24 md:top-28 left-4 md:left-8 z-30 w-full max-w-[280px] md:max-w-xs">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-emerald-400 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Localizar país..." 
            className="w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-all shadow-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {filteredPoints.length > 0 && (
          <div className="absolute top-full left-0 w-full mt-2 bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2 max-h-60 overflow-y-auto">
            {filteredPoints.map((p) => (
              <button 
                key={p.iso} 
                onClick={() => focusOnCountry(p)}
                className="w-full px-5 py-3 text-left hover:bg-emerald-500/10 flex items-center justify-between border-b border-white/5 last:border-none transition-colors"
              >
                <span className="font-medium text-sm">{p.name}</span>
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{p.iso}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#020617] z-50">
          <RefreshCw className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500/50 italic">Sincronizando Atlas de Sostenibilidad...</p>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#020617] z-50 p-6 text-center">
          <AlertCircle className="w-20 h-20 text-red-500 mb-6" />
          <p className="text-slate-400 max-w-sm mb-8 font-mono text-xs leading-relaxed italic">{error}</p>
          <button onClick={fetchData} className="px-10 py-4 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-emerald-50 transition-all active:scale-95">Reintentar Conexión</button>
        </div>
      )}

      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Footer Status */}
      {!selectedPoint && (
        <div className="absolute bottom-8 left-8 z-10 pointer-events-none flex gap-4">
          <Badge icon={<MapPin size={12} />} text={`${ecoPoints.length} Países en el Índice`} />
          <Badge icon={<Activity size={12} />} text="Fusión CSV Exitosa" />
        </div>
      )}

      {/* Panel Detallado */}
      {selectedPoint && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl bg-[#0a0f1e]/90 backdrop-blur-3xl border border-white/10 p-8 md:p-12 rounded-[3rem] shadow-2xl z-40 animate-in fade-in slide-in-from-bottom-10 duration-500">
          <div className="flex justify-between items-start mb-10">
            <div className="flex gap-8 items-center">
              <div className="w-24 h-24 rounded-[2rem] bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <span className="text-4xl font-black italic text-emerald-400 uppercase">{selectedPoint.iso}</span>
              </div>
              <div>
                <h2 className="text-6xl font-black tracking-tighter italic leading-none mb-3">{selectedPoint.name}</h2>
                <div className="flex gap-3">
                   <span className="px-4 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-500/30">
                    Eco-Score: {selectedPoint.score}%
                  </span>
                  <span className="px-4 py-1.5 bg-white/5 text-white/40 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10">
                    IDH: {selectedPoint.hdi}
                  </span>
                </div>
              </div>
            </div>
            <button onClick={() => setSelectedPoint(null)} className="p-4 hover:bg-white/10 rounded-full transition-all text-white/20 hover:text-white">
              <X size={32} />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mb-10">
            <MetricBox icon={<Wind />} label="CO2 P.C." value={selectedPoint.co2} color="text-blue-400" />
            <MetricBox icon={<Zap />} label="Renovables" value={`${selectedPoint.renewables}%`} color="text-yellow-400" />
            <MetricBox icon={<ShieldCheck />} label="Protección" value={`${selectedPoint.protected}%`} color="text-emerald-400" />
            <MetricBox icon={<Droplets />} label="Agua Segura" value={`${selectedPoint.water}%`} color="text-teal-400" />
            <MetricBox icon={<Heart />} label="E. de Vida" value={`${selectedPoint.life} años`} color="text-rose-400" />
            <MetricBox icon={<Compass />} label="PM2.5 (Aire)" value={selectedPoint.pm25} color="text-slate-400" />
          </div>

          <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 flex gap-8 items-center group overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <Award size={80} />
            </div>
            <div className="shrink-0 w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/10">
              <Award className="text-emerald-500" size={32} />
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/60 mb-1">Métrica Destacada del País</p>
              <p className="text-slate-300 text-lg italic font-light leading-relaxed italic">
                &quot;{selectedPoint.trivia || `Este país presenta un desempeño de sostenibilidad robusto basado en sus métricas de CO2 y acceso a servicios básicos.`}&quot;
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Badge({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-center gap-2 px-5 py-2.5 bg-slate-900/60 backdrop-blur-md rounded-full border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] text-white/60">
      <span className="text-emerald-400">{icon}</span>
      {text}
    </div>
  );
}

function MetricBox({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) {
  return (
    <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 text-center group hover:bg-white/10 transition-all cursor-default flex flex-col items-center justify-center">
      <div className={`mb-3 flex justify-center ${color} group-hover:scale-125 transition-transform duration-500`}>{icon}</div>
      <p className="text-[8px] text-white/30 uppercase font-black tracking-widest mb-2 leading-none">{label}</p>
      <p className="font-mono text-xs font-bold text-white truncate w-full">{value}</p>
    </div>
  );
}