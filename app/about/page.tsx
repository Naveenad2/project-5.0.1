"use client";

import { useRef, useState, useEffect } from "react";
import { 
    motion, 
    useScroll, 
    useTransform, 
    useSpring, 
    AnimatePresence
} from "framer-motion";
import { 
    ArrowLeft, Target, Users, Trophy, Zap, 
    Hexagon, Sparkles, Aperture, MousePointer2, 
    Fingerprint, X, Mail, Copy, Check, Phone,
    Facebook, Instagram, Monitor, Box, ArrowUpRight, 
    MapPin, CornerDownRight, Activity, Command
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ColoursLogoHeader } from "@/components/ui/ColoursLogoHeader";

// --- DATA CONFIGURATION ---
const STATS = [
    { label: "Legacy Established", value: "2000", icon: Zap, color: "text-rose-500", suffix: "" },
    { label: "GCC Projects", value: "500", icon: Target, color: "text-blue-500", suffix: "+" },
    { label: "In-House Experts", value: "50", icon: Users, color: "text-emerald-500", suffix: "+" },
    { label: "Industry Awards", value: "18", icon: Trophy, color: "text-yellow-500", suffix: "" },
];

const CAPABILITIES = [
    { title: "Exhibition Fabrication", icon: Box, desc: "Custom stands & pavilions" },
    { title: "Event Management", icon: Sparkles, desc: "End-to-end execution" },
    { title: "Interior Fit-Out", icon: Aperture, desc: "Commercial spaces" },
    { title: "Brand Activation", icon: Fingerprint, desc: "Digital & physical" }
];

const PROCESS = [
    { step: "01", title: "Blueprint & Strategy", desc: "Mapping the spatial and digital constraints to engineer a flawless activation strategy." },
    { step: "02", title: "Custom Fabrication", desc: "Precision manufacturing in our state-of-the-art Bahrain facility." },
    { step: "03", title: "Live Deployment", desc: "On-site execution, management, and real-time operational oversight." }
];

const GALLERY_IMAGES = [
    "/insta/image1.png", "/insta/image2.png", "/insta/image3.png",
    "/insta/image4.png", "/insta/image5.png", "/insta/image6.png",
    "/insta/image7.png"
];

const CONTACT_INFO = {
    phone: "+973 17295917",
    address: "Unit 07, Building 2568, Road 4450, Block 744, A'ali, Bahrain",
    email: "info@coloursbahrain.com",
    instagram: "https://www.instagram.com/colours.bahrain/?hl=en",
    facebook: "https://www.facebook.com/ColoursEventsBahrain?_rdc=1&_rdr"
};

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showContact, setShowContact] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    container: containerRef, 
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const yHero = useTransform(smoothProgress, [0, 0.2], [0, isMobile ? -100 : -250]);
  const opacityHero = useTransform(smoothProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={containerRef} className="bg-[#020204] h-screen w-full relative overflow-y-auto overflow-x-hidden text-white selection:bg-emerald-500/30 font-sans scroll-smooth custom-scrollbar">
      
      {/* 1. OPTIMIZED GALAXY ATMOSPHERE */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 z-0 opacity-10"
               style={{
                   backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                   backgroundSize: '80px 80px',
                   maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)', 
               }}
          />
          {/* Hardware accelerated background orbs */}
          <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-blue-900/30 blur-[100px] rounded-full mix-blend-screen opacity-50 animate-pulse-slow will-change-transform" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-emerald-900/20 blur-[100px] rounded-full mix-blend-screen opacity-50 will-change-transform" />
      </div>

      {/* 2. HUD NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full z-50 px-5 py-5 md:px-8 md:py-8 flex justify-between items-start pointer-events-none mix-blend-difference">
        <Link href="/" className="pointer-events-auto group flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <ArrowLeft size={18} />
            </div>
            <div className="hidden sm:flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] leading-none mb-1 text-white">Return</span>
                <span className="text-[8px] font-mono text-white/50 leading-none">MAIN_GRID</span>
            </div>
        </Link>
        <div className="pointer-events-auto w-24 md:w-32 opacity-100 drop-shadow-2xl">
            <ColoursLogoHeader className="w-full h-auto fill-white" />
        </div>
      </nav>

      {/* 3. HERO SECTION */}
      <section className="relative min-h-[100svh] flex flex-col justify-center px-6 md:px-12 lg:px-24 z-10 pt-24 pb-12">
        <motion.div style={{ y: yHero, opacity: opacityHero }} className="max-w-[1800px] mx-auto w-full">
            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-8 md:mb-12">
                <div className="px-3 py-1.5 md:px-4 md:py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center gap-2 md:gap-3 shadow-lg">
                    <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[8px] md:text-[10px] font-mono text-emerald-300 uppercase tracking-widest">Est. 2000 // Bahrain</span>
                </div>
                <div className="hidden md:block h-[1px] w-16 bg-gradient-to-r from-white/40 to-transparent" />
                <span className="text-[8px] md:text-[10px] font-mono text-white/40 tracking-wider">GCC_OPERATIONS_ACTIVE</span>
            </div>
            
            <div className="relative z-20 max-w-5xl">
                <h1 className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter leading-[0.9] mb-6 md:mb-8 uppercase text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                    Architects of <br /> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-white to-blue-300 animate-gradient-x">Memory.</span>
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-12 md:mt-20 items-start">
                <div className="lg:col-span-5 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500 to-blue-500" />
                    <p className="text-lg md:text-2xl font-light text-white/80 leading-relaxed pl-6 md:pl-8">
                        A dynamic, full-service event management agency based in <span className="text-white font-medium">Bahrain</span>. 
                        From fabrication to execution, we deliver end-to-end brand experiences across the <span className="text-emerald-400">GCC</span>.
                    </p>
                </div>
                
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {CAPABILITIES.map((cap, i) => (
                        <div key={i} className="group relative overflow-hidden p-5 md:p-6 border border-white/10 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-emerald-500/50 group-hover:text-emerald-400 transition-colors">
                                    <cap.icon size={20} className="text-white/60 group-hover:text-emerald-400 transition-colors" />
                                </div>
                                <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-white">{cap.title}</h3>
                            </div>
                            <p className="text-[10px] md:text-xs text-white/40 uppercase tracking-wide ml-14">{cap.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-16 flex items-center gap-4 opacity-50">
                <MousePointer2 size={14} className="animate-bounce" />
                <span className="text-[9px] font-mono uppercase tracking-widest">Scroll to Explore</span>
            </div>
        </motion.div>
      </section>

      {/* 4. STATS SECTION */}
      <section className="relative z-20 border-y border-white/10 bg-black/60 backdrop-blur-xl">
          <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24">
              <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10">
                  {STATS.map((stat, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                        className="py-10 md:py-16 px-6 md:px-8 group cursor-default relative overflow-hidden"
                      >
                          <div className="flex items-center gap-2 mb-3 opacity-60 group-hover:opacity-100 transition-opacity">
                              <stat.icon size={14} className={stat.color} />
                              <span className="text-[8px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-white/80">{stat.label}</span>
                          </div>
                          <div className="flex items-baseline">
                              <span className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-white drop-shadow-md">
                                  {stat.value}
                              </span>
                              <span className="text-2xl md:text-3xl text-emerald-500/80 font-mono ml-1">{stat.suffix}</span>
                          </div>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* 5. PHILOSOPHY / PROCESS SECTION */}
      <section className="relative py-24 md:py-40 px-6 md:px-12 lg:px-24 z-10 bg-[#050508]">
          <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-6">
                      <Command size={14} className="text-blue-500" />
                      <span className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em]">Operational Logic</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-white leading-tight mb-8">
                      Precision in every dimension.
                  </h2>
                  <p className="text-white/50 font-light text-base md:text-lg leading-relaxed">
                      We don't just build stands; we engineer environments. Our methodology combines rigorous strategic planning with in-house industrial capabilities to guarantee flawless execution, regardless of scale.
                  </p>
              </div>

              <div className="lg:col-span-7 flex flex-col gap-6">
                  {PROCESS.map((proc, i) => (
                      <div key={i} className="group relative p-6 md:p-8 bg-black border border-white/10 rounded-2xl hover:border-white/30 transition-colors duration-500">
                          <div className="absolute top-0 left-0 w-1 h-full bg-white/10 group-hover:bg-blue-500 transition-colors duration-500 rounded-l-2xl" />
                          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 ml-4">
                              <span className="text-4xl md:text-5xl font-black text-white/10 group-hover:text-white/20 font-mono transition-colors">{proc.step}</span>
                              <div>
                                  <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest text-white mb-2">{proc.title}</h3>
                                  <p className="text-sm text-white/50 leading-relaxed font-light">{proc.desc}</p>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* 6. EDITORIAL BENTO GALLERY */}
      <GallerySection />

      {/* 7. GLOBAL NETWORK */}
      <section className="relative py-24 md:py-40 px-6 md:px-12 lg:px-24 z-10 border-t border-white/10 bg-gradient-to-b from-black to-[#05050a] overflow-hidden">
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-20">
            
            <div className="flex flex-col justify-between h-full order-2 lg:order-1">
                <div>
                    <span className="text-[9px] font-mono text-emerald-500 mb-4 md:mb-6 block uppercase tracking-[0.2em]">03 // Global_Uplink</span>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-12 md:mb-16">Headquarters</h2>
                    
                    <div className="space-y-8 md:space-y-12">
                        <div className="group">
                            <span className="text-[9px] md:text-[10px] font-mono text-white/40 uppercase tracking-widest mb-3 block">Secure Line</span>
                            <div className="flex items-center gap-4 md:gap-6">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50 transition-all duration-500">
                                    <Phone size={20} className="text-white/80 group-hover:text-emerald-400 transition-colors" />
                                </div>
                                <p className="text-2xl md:text-3xl lg:text-4xl text-white font-light tracking-tight">{CONTACT_INFO.phone}</p>
                            </div>
                        </div>

                        <div className="group">
                            <span className="text-[9px] md:text-[10px] font-mono text-white/40 uppercase tracking-widest mb-3 block">Physical Coordinates</span>
                            <div className="flex items-start gap-4 md:gap-6">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-500/50 transition-all duration-500 shrink-0">
                                    <MapPin size={20} className="text-white/80 group-hover:text-blue-400 transition-colors" />
                                </div>
                                <p className="text-lg md:text-xl lg:text-2xl text-white/80 font-light leading-snug lg:w-3/4 pt-2">
                                    {CONTACT_INFO.address}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 md:gap-4 mt-16 md:mt-20">
                    <SocialButton href={CONTACT_INFO.instagram} icon={Instagram} label="Instagram" />
                    <SocialButton href={CONTACT_INFO.facebook} icon={Facebook} label="Facebook" />
                </div>
            </div>

            {/* Abstract Network Visualizer */}
            <div className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center order-1 lg:order-2 pointer-events-none">
                {/* Responsive rings */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 md:opacity-100">
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            animate={{ rotate: 360, rotateX: [0, 45, 0], rotateY: [0, 45, 0] }}
                            transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                            className="absolute rounded-full border border-white/10"
                            style={{ 
                                width: `${(i * 30) + 20}%`, 
                                height: `${(i * 30) + 20}%`,
                                borderWidth: '1px',
                                borderColor: `rgba(255,255,255,${0.1 - i * 0.02})`
                            }}
                        />
                    ))}
                </div>
                
                <div className="relative z-10 w-48 h-48 md:w-64 md:h-64 bg-black/80 backdrop-blur-xl border border-white/20 rounded-full flex flex-col items-center justify-center shadow-[0_0_80px_rgba(16,185,129,0.15)]">
                    <Hexagon size={48} strokeWidth={0.5} className="text-white/60 mb-4 animate-spin-slow" />
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white">Bahrain HQ</span>
                    <span className="text-[8px] md:text-[9px] font-mono text-emerald-400 mt-1">ONLINE</span>
                </div>
            </div>

         </div>
      </section>

      {/* 8. FOOTER CTA */}
      <section className="relative py-32 md:py-40 border-t border-white/10 bg-black z-20 text-center overflow-hidden px-6">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />
         
         <div className="relative z-10 max-w-4xl mx-auto">
             <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                 Ready to deploy?
             </h2>
             
             <button 
                onClick={() => setShowContact(true)}
                className="group relative inline-flex items-center gap-4 md:gap-6 px-10 py-5 md:px-16 md:py-8 bg-white text-black rounded-full hover:scale-105 transition-transform duration-500 shadow-[0_0_60px_rgba(255,255,255,0.2)] overflow-hidden"
             >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 text-xs md:text-sm font-black uppercase tracking-[0.25em]">Initiate Project</span>
                <CornerDownRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
             </button>
         </div>
      </section>

      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />

    </div>
  );
}

// --- NEW: LAG-FREE ASYMMETRIC BENTO GALLERY ---
function GallerySection() {
    return (
        <section className="relative py-24 md:py-40 px-4 md:px-12 lg:px-24 z-10 bg-[#020202]">
            <div className="flex flex-col items-center text-center mb-16 md:mb-24">
                <span className="text-[9px] md:text-[10px] font-mono text-white/50 border border-white/10 px-3 py-1 rounded-full mb-6 tracking-[0.3em] uppercase">Visual_Archive</span>
                <h2 className="text-4xl md:text-6xl lg:text-8xl font-medium tracking-tighter text-white">
                    The Portfolio
                </h2>
            </div>

            {/* Performance Optimized CSS Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[250px] md:auto-rows-[300px] gap-4 md:gap-6 max-w-[1800px] mx-auto">
                {GALLERY_IMAGES.map((src, i) => {
                    // Create an asymmetric editorial layout
                    let spanClass = "col-span-1 row-span-1";
                    if (i === 0) spanClass = "md:col-span-2 md:row-span-2";
                    else if (i === 3) spanClass = "md:col-span-2 row-span-1";
                    else if (i === 4) spanClass = "lg:col-span-2 lg:row-span-2";
                    else if (i === 6) spanClass = "md:col-span-3 lg:col-span-2 row-span-1";

                    return (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                            className={`group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 ${spanClass}`}
                        >
                            <Image 
                                src={src} 
                                alt={`Project ${i+1}`} 
                                fill 
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110 will-change-transform"
                            />
                            
                            {/* Sleek Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                            
                            {/* Hover UI */}
                            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                                <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out flex items-end justify-between">
                                    <div>
                                        <span className="text-[9px] font-mono text-emerald-400 mb-2 block tracking-widest uppercase">Index // 0{i + 1}</span>
                                        <h3 className="text-lg md:text-xl font-bold uppercase text-white tracking-widest">View Concept</h3>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                                        <ArrowUpRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}

// --- SOCIAL BUTTON ---
function SocialButton({ href, icon: Icon, label }: any) {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 md:gap-4 px-6 py-3 md:px-8 md:py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
        >
            <Icon size={16} className="md:w-[18px] md:h-[18px]" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">{label}</span>
            <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-3 group-hover:ml-0" />
        </a>
    );
}

// --- CONTACT MODAL ---
function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [copied, setCopied] = useState(false);
    const email = CONTACT_INFO.email;

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                    />
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 10 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-xl bg-[#05050a] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.05)]"
                    >
                        <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/10 bg-white/5">
                            <div className="flex items-center gap-3">
                                <Monitor size={16} className="text-emerald-400 animate-pulse" />
                                <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-white/80">Secure Uplink // Active</span>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X size={20} className="text-white/60" />
                            </button>
                        </div>
                        <div className="p-6 md:p-12">
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">Start a Dialogue.</h3>
                            <p className="text-white/50 text-xs md:text-sm mb-8 md:mb-10 font-light leading-relaxed">
                                Our team is ready to engineer your next experience. <br className="hidden md:block"/>
                                Copy the secure uplink below to initialize contact.
                            </p>
                            <div onClick={handleCopy} className="group relative h-20 md:h-24 bg-black border border-white/20 rounded-xl md:rounded-2xl flex items-center justify-between px-5 md:px-8 cursor-pointer hover:border-emerald-500/50 transition-all duration-300 shadow-lg">
                                <div className="flex items-center gap-4 md:gap-5 overflow-hidden">
                                    <div className={`shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors ${copied ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white'}`}>
                                        {copied ? <Check size={18} /> : <Mail size={18} />}
                                    </div>
                                    <div className="flex flex-col gap-1 truncate">
                                        <span className="text-[8px] md:text-[9px] font-mono text-white/40 uppercase tracking-wider">Official Inquiries</span>
                                        <span className="text-sm md:text-xl font-mono text-white truncate">{email}</span>
                                    </div>
                                </div>
                                <div className="hidden sm:flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity pl-4">
                                    <span className="text-[9px] md:text-[10px] font-bold uppercase text-emerald-400 tracking-widest whitespace-nowrap">{copied ? "COPIED" : "COPY LINK"}</span>
                                    <Copy size={16} className="text-emerald-400 shrink-0" />
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1 md:h-1.5 bg-gradient-to-r from-emerald-500 via-blue-500 to-rose-500" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}