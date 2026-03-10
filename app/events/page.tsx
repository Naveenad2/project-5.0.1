"use client";

import { useRef, useState, useEffect } from "react";
import { 
    motion, 
    useScroll, 
    useTransform, 
} from "framer-motion";
import { 
    ArrowLeft, LayoutGrid, ArrowUpRight, 
    Globe, Compass, Asterisk
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ColoursLogoHeader } from "@/components/ui/ColoursLogoHeader";

// --- PAGE DATA: EVENTS ---
const PAGE_DATA = {
    title: "EVENTS",
    subtitle: "Signature Experiences",
    themeColor: "#E11D48", // Rose Red
    heroImage: "/insta/image1.png", // Main hero image
    overview: "We engineer high-impact corporate and public experiences. From exclusive VIP summits to massive live festivals, our division orchestrates every detail with absolute precision, transforming standard gatherings into breathtaking cinematic memories.",
    stats: [
        { label: "Footfall Curated", value: "150k+" },
        { label: "Execution Standard", value: "Flawless" },
        { label: "Client Satisfaction", value: "100%" } // Changed from Bespoke
    ],
    capabilities: [
        { 
            title: "Corporate Summits", 
            desc: "Professional environments for conferences, networking, and major company announcements.", 
            image: "/insta/image2.png" 
        },
        { 
            title: "Live Concerts", 
            desc: "Massive stage builds, high-fidelity audio, and crowd management for thousands.", 
            image: "/insta/image3.png" 
        },
        { 
            title: "Brand Pop-ups", 
            desc: "Engaging, physical spaces designed to connect your brand directly with consumers.", 
            image: "/insta/image4.png" 
        },
        { 
            title: "VIP Experiences", 
            desc: "Highly exclusive, beautifully designed settings for private galas and royal protocol.", 
            image: "/insta/image5.png" 
        }
    ],
    process: [
        { step: "Vol. 01", title: "Creative Blueprint", desc: "Mapping venue constraints, crowd flow, and establishing the core aesthetic narrative." },
        { step: "Vol. 02", title: "Spatial Rehearsal", desc: "Full AV, lighting, and stage mechanics simulation prior to physical deployment." },
        { step: "Vol. 03", title: "Live Orchestration", desc: "Real-time show calling, directing, and on-the-ground operational management." }
    ],
    images: [
        "/insta/image1.png", "/insta/image2.png", "/insta/image3.png", 
        "/insta/image4.png", "/insta/image5.png", "/insta/image6.png", "/insta/image7.png"
    ]
};

// Animation Variants
// Animation Variants
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } }
};

export default function EventsPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Smooth Scroll Parallax
    const { scrollYProgress } = useScroll({ 
        container: containerRef,
        offset: ["start start", "end end"]
    });

    const yHero = useTransform(scrollYProgress, [0, 0.5], ["0%", isMobile ? "15%" : "30%"]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    return (
        <main ref={containerRef} className="bg-[#050505] h-screen w-full text-white font-sans selection:bg-rose-500/30 overflow-y-auto overflow-x-hidden relative scroll-smooth custom-scrollbar">
            
            {/* 0. HIGHLY VISIBLE DOT GRID BACKGROUND */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
                <div className="absolute inset-0 z-0 opacity-40"
                     style={{
                         backgroundImage: `radial-gradient(rgba(255,255,255,0.15) 1.5px, transparent 1.5px)`,
                         backgroundSize: '24px 24px',
                     }}
                />
                {/* Subtle gradient fades for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]" />
            </div>

            {/* 1. MINIMALIST NAVBAR */}
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-10 md:py-8 flex justify-between items-start pointer-events-none mix-blend-difference">
                <Link href="/" className="pointer-events-auto group flex items-center gap-4 opacity-70 hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                        <ArrowLeft size={16} strokeWidth={1.5} />
                    </div>
                    <div className="hidden sm:flex flex-col">
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] leading-none mb-1">Return</span>
                        <span className="text-[8px] font-mono text-white/50 leading-none uppercase">Main_Grid</span>
                    </div>
                </Link>
                <div className="pointer-events-auto w-24 md:w-32 opacity-100 drop-shadow-2xl">
                    <ColoursLogoHeader className="w-full h-auto fill-white" />
                </div>
            </nav>

            {/* 2. CINEMATIC HERO */}
            <section className="relative h-[85svh] md:h-[100svh] w-full overflow-hidden flex items-end pb-12 md:pb-24 px-6 md:px-12 lg:px-24 shrink-0">
                
                {/* Parallax Image */}
                <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 z-0">
                    <Image 
                        src={PAGE_DATA.heroImage} 
                        alt={PAGE_DATA.title} 
                        fill 
                        sizes="100vw"
                        className="object-cover scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-transparent" />
                </motion.div>

                <div className="relative z-10 w-full max-w-[1800px] mx-auto flex flex-col items-start">
                    <motion.div 
                        initial="hidden" animate="visible" variants={fadeUp}
                        className="flex flex-col items-start w-full relative"
                    >
                        {/* Subtitle */}
                        <div className="flex items-center gap-4 mb-4 md:mb-6">
                            <Asterisk size={14} style={{ color: PAGE_DATA.themeColor }} />
                            <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-[0.4em]">
                                Agency Division // {PAGE_DATA.subtitle}
                            </span>
                        </div>
                        
                        {/* Massive Editorial Title */}
                        <h1 className="text-[14vw] md:text-[10vw] lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] text-white mix-blend-plus-lighter drop-shadow-2xl">
                            {PAGE_DATA.title}
                        </h1>

                        {/* CREATIVE HERO FLOATING CARD (Static & Finished) */}
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="hidden lg:flex absolute right-0 bottom-0 w-80 bg-black/40 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 flex-col gap-6 shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
                        >
                            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: PAGE_DATA.themeColor }} />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Global Reach</span>
                                </div>
                                <Globe size={16} className="text-white/50" />
                            </div>
                            
                            <p className="text-[11px] text-white/80 leading-relaxed font-light">
                                Curating immersive spatial experiences across the GCC. We bridge the gap between creative ambition and flawless physical execution.
                            </p>
                            
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex -space-x-3 overflow-hidden">
                                    <div className="inline-block h-8 w-8 rounded-full border-2 border-[#050505] bg-white/20 backdrop-blur-md" />
                                    <div className="inline-block h-8 w-8 rounded-full border-2 border-[#050505] bg-white/40 backdrop-blur-md" />
                                    <div className="inline-block h-8 w-8 rounded-full border-2 border-[#050505] bg-white/60 backdrop-blur-md flex items-center justify-center">
                                        <span className="text-[8px] font-bold text-black">+</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 3. OVERVIEW & METRICS */}
            <section className="relative z-20 py-24 md:py-32 px-6 md:px-12 lg:px-24 shrink-0 border-t border-white/10 bg-black/40 backdrop-blur-sm">
                <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                    
                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                        className="lg:col-span-7 flex flex-col"
                    >
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8" style={{ color: PAGE_DATA.themeColor }}>Philosophy</span>
                        <p className="text-2xl md:text-4xl font-light text-white/90 leading-snug md:leading-snug">
                            {PAGE_DATA.overview}
                        </p>
                    </motion.div>

                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                        className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-10 border-t border-white/10 pt-10 lg:border-t-0 lg:pt-0"
                    >
                        {PAGE_DATA.stats.map((stat, i) => (
                            <div key={i} className="flex flex-col group">
                                <span className="text-[10px] font-mono text-white/50 uppercase tracking-[0.2em] mb-3 group-hover:text-white transition-colors">{stat.label}</span>
                                <span className="text-4xl md:text-5xl font-medium tracking-tighter text-white">{stat.value}</span>
                                <div className="h-[1px] w-12 bg-white/20 mt-4 group-hover:w-full transition-all duration-500" style={{ backgroundColor: PAGE_DATA.themeColor }} />
                            </div>
                        ))}
                    </motion.div>

                </div>
            </section>

            {/* 4. IMAGE-BASED CAPABILITIES */}
            <section className="relative z-20 py-24 md:py-32 px-6 md:px-12 lg:px-24 shrink-0">
                <div className="max-w-[1800px] mx-auto">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-12 mb-12 md:mb-16 gap-6">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block" style={{ color: PAGE_DATA.themeColor }}>Core Competencies</span>
                            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-white drop-shadow-md">Event Architecture</h2>
                        </div>
                        <p className="text-xs font-mono text-white/50 uppercase tracking-widest max-w-xs md:text-right">
                            Comprehensive solutions for brand activations and corporate summits.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {PAGE_DATA.capabilities.map((cap, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] h-[400px] flex flex-col justify-end"
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 z-0">
                                    <Image 
                                        src={cap.image} 
                                        alt={cap.title} 
                                        fill 
                                        sizes="(max-width: 768px) 100vw, 25vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-90" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                                </div>
                                
                                {/* Content Overlay */}
                                <div className="relative z-10 p-6 md:p-8">
                                    <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-3 drop-shadow-md">{cap.title}</h3>
                                    <p className="text-xs text-white/70 font-light leading-relaxed">{cap.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. EXECUTION TIMELINE (Static & Clean) */}
            <section className="relative z-20 py-24 md:py-40 px-6 md:px-12 lg:px-24 shrink-0 border-t border-white/10 bg-black/60 backdrop-blur-sm" ref={timelineRef}>
                <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-5 sticky top-32 self-start">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block" style={{ color: PAGE_DATA.themeColor }}>Methodology</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-white leading-[0.9] mb-6 drop-shadow-lg">
                            The Art of <br/> Execution.
                        </h2>
                        <p className="text-white/70 font-light text-lg">
                            We do not leave experiences to chance. Our structured methodology ensures perfect delivery from ideation to the final curtain drop.
                        </p>
                    </motion.div>

                    <div className="lg:col-span-7 relative">
                        {/* Static connecting vertical line */}
                        <div className="absolute left-[27px] md:left-[39px] top-4 bottom-4 w-[1px] bg-white/20" />

                        <div className="flex flex-col gap-12 md:gap-20">
                            {PAGE_DATA.process.map((proc, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: i * 0.15 }}
                                    className="relative flex items-start gap-8 md:gap-12 group"
                                >
                                    {/* Static Node */}
                                    <div className="relative z-10 w-14 h-14 md:w-20 md:h-20 rounded-full border border-white/30 bg-[#050505] flex items-center justify-center shrink-0">
                                        <span className="text-[9px] md:text-[10px] font-bold font-mono tracking-widest text-white">{proc.step}</span>
                                    </div>
                                    
                                    <div className="pt-2 md:pt-4">
                                        <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-white mb-3">{proc.title}</h3>
                                        <p className="text-sm md:text-base text-white/60 leading-relaxed font-light max-w-lg">{proc.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* 6. EDITORIAL GALLERY */}
            <section className="py-24 md:py-40 px-4 md:px-12 lg:px-24 shrink-0">
                <div className="max-w-[1800px] mx-auto">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col items-center text-center mb-16 md:mb-24">
                        <Compass size={24} className="mb-6" style={{ color: PAGE_DATA.themeColor }} />
                        <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-white drop-shadow-md">Curated Archive</h2>
                        <span className="text-[10px] font-mono text-white/50 mt-6 tracking-[0.3em] uppercase">Select Deployments // 2024</span>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[250px] md:auto-rows-[350px] gap-3 md:gap-5">
                        {PAGE_DATA.images.map((src, i) => {
                            // Asymmetric layout logic
                            let spanClass = "col-span-1 row-span-1";
                            if (i === 0) spanClass = "md:col-span-2 md:row-span-2";
                            else if (i === 3) spanClass = "md:col-span-2 row-span-1";
                            else if (i === 4) spanClass = "lg:col-span-2 lg:row-span-2 hidden md:block"; 
                            else if (i === 6) spanClass = "md:col-span-3 lg:col-span-2 row-span-1";

                            return (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.8 }}
                                    className={`group relative overflow-hidden rounded-xl border border-white/10 bg-[#050505] ${spanClass}`}
                                >
                                    <Image 
                                        src={src} alt={`Event ${i+1}`} fill sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105 will-change-transform opacity-80 group-hover:opacity-100"
                                    />
                                    
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    
                                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                                        <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out flex items-end justify-between">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[9px] font-bold uppercase tracking-widest text-white">Event Case Study</span>
                                                <span className="text-[10px] font-mono text-white/60 tracking-widest uppercase">Archive_0{i + 1}</span>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 shadow-xl">
                                                <ArrowUpRight size={16} strokeWidth={2} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 7. MINIMALIST FOOTER CTA */}
            <section className="py-32 md:py-48 text-center shrink-0 relative border-t border-white/10 bg-black/50 backdrop-blur-md">
                <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-white mb-12 relative z-10 drop-shadow-md">
                    Ready to elevate your narrative?
                </h2>

                <Link href="/" className="relative z-10 inline-flex items-center gap-6 px-12 py-6 bg-white text-black rounded-full hover:scale-105 transition-transform duration-500 shadow-[0_0_50px_rgba(255,255,255,0.1)] group">
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Return to Core System</span>
                    <LayoutGrid size={16} className="group-hover:rotate-90 transition-transform duration-500" />
                </Link>
            </section>

        </main>
    );
}