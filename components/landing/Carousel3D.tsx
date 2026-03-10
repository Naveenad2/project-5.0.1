"use client";

import { useState, useEffect, useRef } from "react";
import { ColoursLogoHeader } from "@/components/ui/ColoursLogoHeader";
import { 
    motion, 
    useSpring, 
    AnimatePresence,
    PanInfo
} from "framer-motion";
import { 
    ArrowRight, Mail, X, Send, Bot, 
    Sparkles, User, ChevronLeft, ChevronRight,
    Activity, Zap, Layers, Crosshair, ArrowUpRight,
    Cpu, Target
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";

// -- Content Configuration --
const SERVICES = [
  {
    id: 1, title: "EVENTS", subtitle: "MANAGEMENT", desc: "Corporate Experiences", color: "#E11D48", image: "/insta/image1.png", link: "/events"
  },
  {
    id: 2, title: "EXHIBITIONS", subtitle: "STAND BUILD", desc: "Custom Fabrication", color: "#8B5CF6", image: "/insta/image2.png", link: "/exhibitions"
  },
  {
    id: 3, title: "INTERIORS", subtitle: "FIT-OUT", desc: "Commercial Spaces", color: "#3B82F6", image: "/insta/image3.png", link: "/interiors"
  },
  {
    id: 4, title: "MALL KIOSK", subtitle: "RETAIL", desc: "Pop-up Displays", color: "#10B981", image: "/insta/image4.png", link: "/kiosks"
  },
  {
    id: 5, title: "MEDIA", subtitle: "PRODUCTION", desc: "Large Format Branding", color: "#F97316", image: "/insta/image5.png", link: "#"
  },
  {
    id: 6, title: "INTERIORS", subtitle: "FIT-OUT", desc: "Commercial Spaces", color: "#3B82F6", image: "/insta/image3.png", link: "/interiors"
  },
  {
    id: 7, title: "MALL KIOSK", subtitle: "RETAIL", desc: "Pop-up Displays", color: "#10B981", image: "/insta/image4.png", link: "/kiosks"
  },
  {
    id: 8, title: "MEDIA", subtitle: "PRODUCTION", desc: "Large Format Branding", color: "#F97316", image: "/insta/image5.png", link: "#"
  },
  {
    id: 9, title: "INTERIORS", subtitle: "FIT-OUT", desc: "Commercial Spaces", color: "#3B82F6", image: "/insta/image3.png", link: "/interiors"
  },
  {
    id: 10, title: "MALL KIOSK", subtitle: "RETAIL", desc: "Pop-up Displays", color: "#10B981", image: "/insta/image4.png", link: "/kiosks"
  },
  {
    id: 11, title: "MEDIA", subtitle: "PRODUCTION", desc: "Large Format Branding", color: "#F97316", image: "/insta/image5.png", link: "#"
  },
  {
    id: 12, title: "INTERIORS", subtitle: "FIT-OUT", desc: "Commercial Spaces", color: "#3B82F6", image: "/insta/image3.png", link: "/interiors"
  },
  {
    id: 13, title: "MALL KIOSK", subtitle: "RETAIL", desc: "Pop-up Displays", color: "#10B981", image: "/insta/image4.png", link: "/kiosks"
  },
  {
    id: 14, title: "MEDIA", subtitle: "PRODUCTION", desc: "Large Format Branding", color: "#F97316", image: "/insta/image5.png", link: "#"
  },
];

const CLIENTS = [
    "Bahrain EDB", "Gulf Air", "DO & CO", "The Avenues", "Seef Mall", "BIC", "Tamkeen", "Marassi", "Edamah", "Bahrain Marina"
];

// DYNAMIC ANGLE MATH: Guarantees a flawless 360-degree circle with exactly 0 bugs on wrap-around.
const ANGLE_STEP = 360 / SERVICES.length; 

// --- MAIN PAGE COMPONENT ---
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="h-screen w-full bg-[#020202] text-white relative overflow-hidden font-sans selection:bg-emerald-500/30">
      <Navbar onOpenContact={() => setIsModalOpen(true)} />
      <Carousel3D />
      <ContactOmniModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}

// --- COMPONENT: DECONSTRUCTED NAVBAR ---
function Navbar({ onOpenContact }: { onOpenContact: () => void }) {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-8 flex items-start justify-between pointer-events-none">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="pointer-events-auto"
            >
                <Link href="/" className="group relative block">
                    <div className="w-28 md:w-40 relative z-10 transition-transform duration-500 group-hover:scale-105">
                        <ColoursLogoHeader className="w-full h-auto fill-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                    </div>
                </Link>
            </motion.div>

           
        </nav>
    );
}

// --- 1. MEMOIZED BACKGROUND COMPONENT ---
const BackgroundLayer = React.memo(({ activeColor }: { activeColor: string }) => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20"
                 style={{
                     backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                     backgroundSize: '30px 30px',
                     maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)', 
                     WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                 }}
            />
            <motion.div 
               animate={{ x: [0, 50, 0], opacity: [0.2, 0.4, 0.2] }}
               transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
               className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600 blur-[60px] md:blur-[100px] rounded-full mix-blend-screen will-change-transform"
            />
            <motion.div 
               animate={{ x: [0, -50, 0], opacity: [0.15, 0.3, 0.15] }}
               transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
               className="absolute top-[10%] right-[-10%] w-[40vw] h-[40vw] bg-violet-700 blur-[60px] md:blur-[100px] rounded-full mix-blend-screen will-change-transform"
            />
            <motion.div 
              animate={{ backgroundColor: activeColor }}
              transition={{ duration: 1.5 }} 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.15] blur-[80px] md:blur-[120px] mix-blend-color-dodge will-change-[background-color]"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_100%)]" />
        </div>
    );
});
BackgroundLayer.displayName = "BackgroundLayer";

// --- MAIN CAROUSEL COMPONENT ---
function Carousel3D() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Recalculated optimal sizes to prevent overlap on full 360 circle
  const RADIUS = isMobile ? 480 : 750;       
  const CARD_WIDTH = isMobile ? 220 : 320;

  const rotationSpring = useSpring(0, { stiffness: 50, damping: 20, mass: 1 });

  // Update active index safely based on math-perfect spring rotation
  useEffect(() => {
    const unsubscribe = rotationSpring.on("change", (currentRotation) => {
      const index = Math.round(-currentRotation / ANGLE_STEP);
      const wrapped = ((index % SERVICES.length) + SERVICES.length) % SERVICES.length;
      if (wrapped !== activeIndex) setActiveIndex(wrapped);
    });
    return () => unsubscribe();
  }, [activeIndex, rotationSpring]);

  // Autoplay Logic
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
        const target = Math.round((rotationSpring.get() - ANGLE_STEP) / ANGLE_STEP) * ANGLE_STEP;
        rotationSpring.set(target);
    }, 4000); // Spins every 4 seconds
    return () => clearInterval(interval);
  }, [isAutoPlaying, rotationSpring]);

  // Pause interactions
  const pauseAutoplay = () => {
      setIsAutoPlaying(false);
      if (autoplayTimeoutRef.current) clearTimeout(autoplayTimeoutRef.current);
  };

  const resumeAutoplay = () => {
      if (autoplayTimeoutRef.current) clearTimeout(autoplayTimeoutRef.current);
      autoplayTimeoutRef.current = setTimeout(() => setIsAutoPlaying(true), 3000); 
  };

  // Nav Logic
  const next = () => {
    pauseAutoplay();
    const target = Math.round((rotationSpring.get() - ANGLE_STEP) / ANGLE_STEP) * ANGLE_STEP;
    rotationSpring.set(target);
    resumeAutoplay();
  };

  const prev = () => {
    pauseAutoplay();
    const target = Math.round((rotationSpring.get() + ANGLE_STEP) / ANGLE_STEP) * ANGLE_STEP;
    rotationSpring.set(target);
    resumeAutoplay();
  };

  // Swipe / Pan Gestures mapped strictly to rotateY
  const handlePanStart = () => pauseAutoplay();

  const handlePan = (e: any, info: PanInfo) => {
    const rotateDelta = info.delta.x / (isMobile ? 3 : 5);
    rotationSpring.set(rotationSpring.get() + rotateDelta);
  };

  const handlePanEnd = (e: any, info: PanInfo) => {
    const current = rotationSpring.get();
    const velocity = info.velocity.x / 10;
    const target = Math.round((current + velocity) / ANGLE_STEP) * ANGLE_STEP;
    rotationSpring.set(target);
    resumeAutoplay();
  };

  const activeColor = SERVICES[activeIndex].color;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black overflow-hidden perspective-[1000px] md:perspective-[1400px]">
      
      <BackgroundLayer activeColor={activeColor} />

      {/* SWIPE CATCHER & 3D CAROUSEL STAGE */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center z-10 -mt-16 md:-mt-32 touch-none cursor-grab active:cursor-grabbing"
        style={{ transformStyle: "preserve-3d" }}
        onMouseEnter={pauseAutoplay}
        onMouseLeave={resumeAutoplay}
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
      >
        <motion.div
          className="relative flex items-center justify-center will-change-transform"
          style={{ 
            rotateY: rotationSpring,
            z: -RADIUS + (isMobile ? 150 : 250),
            transformStyle: "preserve-3d"
          }}
        >
          {SERVICES.map((item, i) => (
            <CarouselItem 
              key={item.id} 
              item={item} 
              index={i} 
              isActive={i === activeIndex}
              cardWidth={CARD_WIDTH}
              radius={RADIUS}
              angleStep={ANGLE_STEP}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* LEFT/RIGHT NAVIGATION ARROWS (Centered specifically to the cards) */}
      <div className="absolute inset-0 flex items-center justify-between px-4 md:px-12 z-40 pointer-events-none -mt-16 md:-mt-32">
          <button 
              onClick={prev}
              className="pointer-events-auto group w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95 shadow-[0_0_30px_rgba(0,0,0,0.8)]"
          >
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>

          <button 
              onClick={next}
              className="pointer-events-auto group w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95 shadow-[0_0_30px_rgba(0,0,0,0.8)]"
          >
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>
      </div>

      {/* BOTTOM HUD UI */}
      <div className="absolute bottom-0 w-full z-50 pointer-events-none">
        <div className="absolute bottom-0 inset-x-0 h-40 md:h-48 bg-gradient-to-t from-black via-black/90 to-transparent z-[-1]" />

        <div className="max-w-[1800px] mx-auto px-6 md:px-12 pb-6 md:pb-12 flex flex-col gap-4 md:gap-6">
            
            <div className="flex items-end justify-between w-full">
                
                <div className="hidden md:flex flex-col pointer-events-auto">
                    <div className="flex items-center gap-2 mb-2 pl-1">
                        <Layers size={10} className="text-white/80" />
                        <span className="text-[9px] text-white/80 uppercase tracking-[0.2em]">Project Index</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-mono text-white tracking-tighter drop-shadow-lg">
                            {activeIndex + 1 < 10 ? `0${activeIndex + 1}` : activeIndex + 1}
                        </span>
                        <div className="h-[2px] w-8 bg-white/60" />
                        <span className="text-sm font-mono text-white/60">
                            {SERVICES.length < 10 ? `0${SERVICES.length}` : SERVICES.length}
                        </span>
                    </div>
                </div>

                <div className="pointer-events-auto flex items-center justify-center mx-auto md:mx-0 w-full md:w-auto">
                    <div className="h-12 md:h-14 px-6 md:px-10 border border-white/20 bg-black/50 backdrop-blur-xl rounded-full flex items-center justify-center min-w-[220px] md:min-w-[300px] shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group transition-all hover:border-white/40">
                        <div className="flex flex-col items-center relative z-10">
                            <motion.span 
                                key={activeIndex}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold mb-0.5"
                                style={{ color: activeColor, textShadow: `0 0 10px ${activeColor}` }}
                            >
                                {SERVICES[activeIndex].subtitle}
                            </motion.span>
                            <motion.span 
                                key={activeIndex + "_t"}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-[11px] md:text-base font-black uppercase tracking-[0.2em] text-white transition-transform duration-500"
                            >
                                {SERVICES[activeIndex].title}
                            </motion.span>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex pointer-events-auto flex-col items-end opacity-80">
                    <Activity size={24} strokeWidth={1} className="text-white drop-shadow-lg" />
                </div>
            </div>

            <div className="w-full border-t border-white/10 pt-3 md:pt-4 flex items-center gap-6 overflow-hidden pointer-events-auto relative">
                <div className="hidden md:flex items-center gap-2 pr-6 border-r border-white/10 z-10 bg-black">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 whitespace-nowrap">Trusted Partners</span>
                </div>
                <div className="flex-1 overflow-hidden relative mask-linear-fade">
                     <motion.div 
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                        className="flex items-center gap-8 md:gap-12 whitespace-nowrap will-change-transform"
                     >
                        {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, i) => (
                            <div key={i} className="flex items-center gap-2 md:gap-3 opacity-50 hover:opacity-100 transition-opacity cursor-default group">
                                <Zap size={8} className="text-white/60 group-hover:text-emerald-400 transition-colors" />
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/90 group-hover:text-white transition-colors">{client}</span>
                            </div>
                        ))}
                     </motion.div>
                     <div className="absolute top-0 left-0 w-8 md:w-16 h-full bg-gradient-to-r from-black to-transparent" />
                     <div className="absolute top-0 right-0 w-8 md:w-16 h-full bg-gradient-to-l from-black to-transparent" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

// -- UPGRADED UI: MEMOIZED CARD ITEM --
const CarouselItem = React.memo(({ item, index, isActive, cardWidth, radius, angleStep }: any) => {
    const angle = index * angleStep;

    return (
        <motion.div
            className="absolute top-1/2 left-1/2 will-change-transform"
            style={{
                width: cardWidth,
                height: cardWidth * 1.5, 
                marginLeft: -cardWidth / 2,
                marginTop: -(cardWidth * 1.5) / 2,
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                transformStyle: 'preserve-3d'
            }}
        >
            <div 
                className={`
                    relative w-full h-full bg-black overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                    rounded-lg border pointer-events-none
                    ${isActive 
                        ? 'border-white/30 scale-100 opacity-100 shadow-[0_0_50px_rgba(255,255,255,0.05)] z-20' 
                        : 'border-white/5 scale-[0.85] opacity-40 brightness-50 z-10'}
                `}
                style={{ 
                    transformStyle: 'preserve-3d',
                    // Hardware acceleration push to prevent lag
                    transform: isActive ? 'translateZ(0.1px)' : 'translateZ(0px)' 
                }}
            >
                
                {/* 1. PARALLAX IMAGE BACKDROP */}
                <div className="absolute inset-0 z-0 overflow-hidden bg-black">
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 220px, 320px"
                        priority={isActive}
                        className={`object-cover transition-transform duration-[1500ms] ease-out ${isActive ? 'scale-100' : 'scale-110'}`}
                        draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80 z-10 pointer-events-none" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none z-10" />
                </div>
                
                {/* 2. CREATIVE UI: ANIMATED SCANNING LASER */}
                {isActive && (
                    <motion.div 
                        initial={{ top: "-10%" }}
                        animate={{ top: "110%" }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-[2px] z-20 pointer-events-none"
                        style={{
                            background: `linear-gradient(90deg, transparent 0%, ${item.color} 50%, transparent 100%)`,
                            boxShadow: `0 0 20px ${item.color}`
                        }}
                    />
                )}

                {/* 3. BORDER GLOW & CORNERS */}
                {isActive && (
                    <div className="absolute inset-0 z-20 pointer-events-none rounded-lg transition-opacity duration-500"
                        style={{ boxShadow: `inset 0 0 30px ${item.color}30` }}
                    >
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-[1px] border-l-[1px] border-white/50 rounded-tl-lg" />
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-[1px] border-r-[1px] border-white/50 rounded-tr-lg" />
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-[1px] border-l-[1px] border-white/50 rounded-bl-lg" />
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[1px] border-r-[1px] border-white/50 rounded-br-lg" />
                    </div>
                )}

                {/* 4. RICH HUD OVERLAY */}
                <div 
                    className={`absolute inset-0 z-30 flex flex-col justify-between p-4 md:p-6 transition-all duration-[400ms] ease-out delay-100 ${isActive ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                    style={{ transform: "translateZ(30px)" }}
                >
                    {/* Top Status Bar */}
                    <div className="flex justify-between items-start w-full">
                        <div className="flex flex-col gap-1">
                            <div className="px-1.5 py-0.5 bg-black/40 border border-white/20 rounded-[2px] flex items-center gap-1.5 w-fit">
                                <Activity size={8} className="text-white" />
                                <span className="text-[7px] md:text-[8px] font-mono text-white tracking-widest uppercase">SYS_0{index + 1}</span>
                            </div>
                            <span className="text-[6px] md:text-[7px] font-mono text-white/50 tracking-widest ml-0.5 uppercase">{item.desc}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-black/40 px-1.5 py-0.5 rounded-full border border-white/10">
                            <span className="text-[6px] md:text-[7px] font-mono text-emerald-400 tracking-widest uppercase">ON</span>
                            <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_5px_#10b981]" />
                        </div>
                    </div>

                    {/* Center Reticle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-28 md:h-28 border border-white/5 rounded-full flex items-center justify-center pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 border border-white/10 rounded-full" />
                        <div className="w-1 h-1 bg-white/40 rounded-full" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-white/30" />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-white/30" />
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-white/30" />
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-white/30" />
                        <Crosshair size={28} strokeWidth={0.5} className="absolute text-white/10 animate-spin-slow" />
                    </div>

                    {/* Bottom Info Module */}
                    <div className="w-full flex flex-col items-start bg-gradient-to-t from-black/80 to-transparent pt-10 -mx-4 px-4 -mb-4 pb-4 md:-mx-6 md:px-6 md:-mb-6 md:pb-6">
                        
                        <div className="flex items-center gap-2 mb-1.5 md:mb-2 w-full">
                            <div className="h-[1px] w-4 md:w-6 bg-white/40" />
                            <span className="text-[7px] md:text-[8px] font-bold text-white uppercase tracking-[0.2em]">{item.subtitle}</span>
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                        </div>
                        
                        <h2 className="text-2xl md:text-4xl font-black text-white leading-[0.85] tracking-tighter uppercase mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,1)] mix-blend-plus-lighter">
                            {item.title}
                        </h2>
                        
                        <div className="flex items-end justify-between w-full border-t border-white/10 pt-3 md:pt-4">
                            
                            <div className="flex flex-col gap-1">
                                <span className="text-[6px] md:text-[7px] text-white/50 font-mono uppercase tracking-widest">Load</span>
                                <div className="flex items-end gap-[1px] md:gap-[2px] h-2.5 md:h-3">
                                    {[40, 70, 30, 90, 50, 80].map((h, i) => (
                                        <div key={i} className="w-[2px] md:w-1 bg-emerald-500/80 rounded-t-[1px]" style={{ height: `${h}%` }} />
                                    ))}
                                </div>
                            </div>
                            
                            {/* LINK COMPONENT ADDED HERE */}
                            <Link href={item.link || "#"} className="group flex items-center gap-1.5 md:gap-2 bg-white text-black px-2.5 py-1.5 md:px-3 md:py-2 rounded-[2px] hover:bg-emerald-400 transition-all duration-300 pointer-events-auto">
                                <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest">Know More</span>
                                <div className="w-3 h-3 md:w-4 md:h-4 bg-black rounded-full flex items-center justify-center overflow-hidden relative">
                                    <ArrowUpRight size={8} className="text-white group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform duration-300 absolute" />
                                    <ArrowUpRight size={8} className="text-white -translate-x-3 translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300 absolute" />
                                </div>
                            </Link>

                        </div>
                    </div>
                </div>

            </div>
        </motion.div>
    );
});
CarouselItem.displayName = "CarouselItem";

// --- OMNI-MODAL SYSTEM ---
function ContactOmniModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [activeTab, setActiveTab] = useState<'email' | 'ai'>('email');

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                    />
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 10 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-4xl h-[600px] bg-[#050505] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col md:flex-row"
                    >
                        <div className="w-full md:w-64 bg-[#0a0a0f] border-b md:border-b-0 md:border-r border-white/10 p-6 flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                            <div className="relative z-10">
                                <h3 className="text-[9px] font-mono text-emerald-500 uppercase tracking-widest mb-8 border-b border-white/10 pb-4">
                                    System_Uplink_v2.0
                                </h3>
                                <div className="space-y-2">
                                    <TabButton isActive={activeTab === 'email'} onClick={() => setActiveTab('email')} icon={Mail} label="Direct Uplink" desc="Traditional Inquiry" />
                                    <TabButton isActive={activeTab === 'ai'} onClick={() => setActiveTab('ai')} icon={Bot} label="Neural Agent" desc="AI Assistant" />
                                </div>
                            </div>
                            <div className="hidden md:block relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                                    <span className="text-[9px] font-bold uppercase text-white/60">Server Online</span>
                                </div>
                                <p className="text-[9px] text-white/30 leading-relaxed font-mono">Latency: 12ms <br/>Encryption: AES-256</p>
                            </div>
                        </div>

                        <div className="flex-1 relative bg-black">
                            <button onClick={onClose} className="absolute top-6 right-6 z-20 p-2 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 transition-colors text-white/60 hover:text-white">
                                <X size={16} />
                            </button>
                            <div className="h-full w-full p-6 md:p-10 overflow-hidden relative">
                                <AnimatePresence mode="wait">
                                    {activeTab === 'email' ? <EmailInterface key="email" /> : <AIInterface key="ai" />}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function TabButton({ isActive, onClick, icon: Icon, label, desc }: any) {
    return (
        <button 
            onClick={onClick}
            className={`w-full relative flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-left group overflow-hidden border ${isActive ? 'bg-white/5 border-white/20' : 'hover:bg-white/5 border-transparent'}`}
        >
            {isActive && <motion.div layoutId="activeTabGlow" className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />}
            <div className={`relative z-10 p-2 rounded-lg transition-colors ${isActive ? 'bg-white text-black' : 'bg-white/5 text-white/60 group-hover:text-white'}`}>
                <Icon size={18} />
            </div>
            <div className="relative z-10">
                <span className={`block text-xs font-bold uppercase tracking-wider ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>{label}</span>
                <span className="text-[9px] text-white/40 font-mono">{desc}</span>
            </div>
        </button>
    );
}

function EmailInterface() {
    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full flex flex-col justify-center max-w-lg mx-auto">
            <div className="mb-8">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                    <Mail size={18} className="text-white" />
                </div>
                <h2 className="text-3xl font-medium tracking-tight text-white mb-2">Initialize Project</h2>
                <p className="text-sm text-white/50">Submit your dossier. Our strategy team will intercept.</p>
            </div>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-[9px] font-mono text-emerald-500 uppercase">Identity</label>
                        <input type="text" placeholder="Name / Organization" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all placeholder:text-white/20" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[9px] font-mono text-emerald-500 uppercase">Coordinates</label>
                        <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all placeholder:text-white/20" />
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-[9px] font-mono text-emerald-500 uppercase">Briefing</label>
                    <textarea rows={4} placeholder="Outline mission parameters..." className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all resize-none placeholder:text-white/20" />
                </div>
                <button className="w-full group bg-white text-black h-12 rounded-lg font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-emerald-400 transition-colors mt-4 shadow-lg hover:shadow-emerald-500/20">
                    <span>Transmit Data</span>
                    <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
            </form>
        </motion.div>
    );
}

function AIInterface() {
    const [messages, setMessages] = useState([{ role: 'ai', text: "Systems online. I am the Colours Interface. How can we engineer your next experience?" }]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleSend = () => {
        if (!input.trim()) return;
        const newMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, newMsg]);
        setInput("");
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, { role: 'ai', text: "Signal received. I've flagged this for our creative directors. Would you like to upload a project brief?" }]);
        }, 1500);
    };

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages, isTyping]);

    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 to-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                        <Sparkles size={14} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white">Neural Interface</h3>
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[9px] text-white/50 uppercase tracking-wider">Listening</span>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar mb-4">
                {messages.map((msg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'ai' ? 'bg-white/10 border border-white/10' : 'bg-white text-black'}`}>
                            {msg.role === 'ai' ? <Bot size={14} /> : <User size={14} />}
                        </div>
                        <div className={`p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed ${msg.role === 'ai' ? 'bg-white/5 text-white/90 rounded-tl-none border border-white/10' : 'bg-white text-black rounded-tr-none shadow-lg'}`}>
                            {msg.text}
                        </div>
                    </motion.div>
                ))}
                {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10"><Bot size={14} /></div>
                        <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tl-none border border-white/10 flex gap-1">
                            <span className="w-1 h-1 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-1 h-1 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-1 h-1 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                    </motion.div>
                )}
            </div>
            <div className="relative">
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} type="text" placeholder="Enter command or query..." className="w-full bg-[#0a0a0f] border border-white/20 rounded-full pl-6 pr-12 py-3.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-white/20 shadow-inner" />
                <button onClick={handleSend} className="absolute right-2 top-2 p-1.5 bg-white text-black rounded-full hover:scale-110 transition-transform">
                    <ArrowRight size={16} />
                </button>
            </div>
        </motion.div>
    );
}