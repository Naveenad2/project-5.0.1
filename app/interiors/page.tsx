"use client";

import { useRef, useState, useEffect, createContext, useContext } from "react";
import { 
    motion, 
    useScroll, 
    useTransform, 
    useSpring, 
    AnimatePresence
} from "framer-motion";
import { 
    ArrowLeft, LayoutGrid, ArrowUpRight, 
    Globe, Compass, Asterisk, Sofa, Store, Briefcase, Coffee
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ColoursLogoHeader } from "@/components/ui/ColoursLogoHeader";

// --- BILINGUAL DICTIONARY ---
const TEXT_EN = {
    return: "Return",
    mainGrid: "Main Home",
    langToggle: "عربي",
    title: "INTERIORS",
    subtitle: "Agency Division // Interior Fit-Out",
    spatialEng: "Spatial Engineering",
    heroDesc: "Executing high-end commercial fit-outs across the GCC. We bridge the gap between architectural ambition and flawless physical execution.",
    philosophy: "Philosophy",
    overview: "We transform empty shells into breathing commercial ecosystems. Our interior fit-out division specializes in high-end retail, corporate offices, and premium F&B venues, delivering turnkey spatial solutions with uncompromising craftsmanship.",
    
    stat1Label: "Premium Fit-Outs", stat1Value: "200+",
    stat2Label: "In-House Production", stat2Value: "68 Staff",
    stat3Label: "Client Satisfaction", stat3Value: "100%",
    
    coreCompetencies: "Core Competencies",
    spatialArch: "Spatial Architecture",
    spatialArchDesc: "From custom joinery to comprehensive MEP integration.",
    
    cap1Title: "Retail Boutiques", cap1Desc: "High-end retail environments designed to maximize footfall and elevate physical brand perception.",
    cap2Title: "F&B Venues", cap2Desc: "Atmospheric restaurants, lounges, and cafes engineered for seamless operational flow and aesthetic impact.",
    cap3Title: "Corporate Workspaces", cap3Desc: "Ergonomic, modern office environments that foster productivity and reflect your corporate identity.",
    cap4Title: "Commercial Spaces", cap4Desc: "Permanent and semi-permanent structures built for high visibility and long-term durability in major malls.",

    methodology: "Methodology",
    builtToLast: "Built to Last.",
    methodDesc: "A fully integrated approach. From spatial planning to final handover, our in-house capabilities guarantee absolute precision and timely delivery.",
    
    step1Vol: "Step 01", step1Title: "Spatial Planning", step1Desc: "Comprehensive floor planning, MEP engineering integration, and 3D conceptual rendering.",
    step2Vol: "Step 02", step2Title: "Material & Fabrication", step2Desc: "Procurement of premium finishes alongside in-house bespoke joinery, carpentry, and metalwork in our Bahrain facility.",
    step3Vol: "Step 03", step3Title: "Turnkey Execution", step3Desc: "Rigorous on-site construction, strict quality control, and final handover ready for immediate commercial operation.",

    archiveTitle: "Curated Spaces",
    selectDeps: "Select Fit-Outs // Commercial",
    caseStudy: "Interior Case Study",
    archiveIndex: "Archive 0",

    ctaTitle: "Ready to engineer your space?",
    ctaBtn: "Return to Home"
};

const TEXT_AR = {
    return: "عودة",
    mainGrid: "الرئيسية",
    langToggle: "EN",
    title: "التصميم الداخلي",
    subtitle: "قسم الوكالة // التجهيزات الداخلية",
    spatialEng: "الهندسة المكانية",
    heroDesc: "تنفيذ تجهيزات تجارية راقية في جميع أنحاء دول مجلس التعاون الخليجي. نحن نسد الفجوة بين الطموح المعماري والتنفيذ المادي الخالي من العيوب.",
    philosophy: "فلسفتنا",
    overview: "نحن نحول الهياكل الفارغة إلى أنظمة تجارية نابضة بالحياة. يتخصص قسم التجهيزات الداخلية لدينا في متاجر التجزئة الراقية، ومكاتب الشركات، وأماكن الأطعمة والمشروبات الفاخرة، لتقديم حلول مكانية متكاملة ببراعة لا تقبل المساومة.",
    
    stat1Label: "تجهيزات فاخرة", stat1Value: "+200",
    stat2Label: "الإنتاج الداخلي", stat2Value: "68 موظف",
    stat3Label: "رضا العملاء", stat3Value: "100%",
    
    coreCompetencies: "الكفاءات الأساسية",
    spatialArch: "العمارة المكانية",
    spatialArchDesc: "من أعمال النجارة المخصصة إلى التكامل الشامل للهندسة الكهربائية والميكانيكية والسباكة.",
    
    cap1Title: "متاجر التجزئة", cap1Desc: "بيئات تجزئة راقية مصممة لزيادة الإقبال والارتقاء بالإدراك المادي للعلامة التجارية.",
    cap2Title: "المطاعم والمقاهي", cap2Desc: "مطاعم وصالات ومقاهي ذات أجواء مميزة مصممة لتدفق تشغيلي سلس وتأثير جمالي.",
    cap3Title: "مساحات عمل الشركات", cap3Desc: "بيئات مكتبية حديثة ومريحة تعزز الإنتاجية وتعكس هويتك المؤسسية.",
    cap4Title: "المساحات التجارية", cap4Desc: "هياكل دائمة وشبه دائمة مصممة لرؤية عالية ومتانة طويلة الأجل في المجمعات التجارية الكبرى.",

    methodology: "المنهجية",
    builtToLast: "بنيت لتدوم.",
    methodDesc: "نهج متكامل بالكامل. من التخطيط المكاني إلى التسليم النهائي، تضمن قدراتنا الداخلية الدقة المطلقة والتسليم في الوقت المناسب.",
    
    step1Vol: "خطوة 01", step1Title: "التخطيط المكاني", step1Desc: "تخطيط شامل للأرضيات، وتكامل الهندسة الميكانيكية والكهربائية والسباكة (MEP)، وعرض مفاهيمي ثلاثي الأبعاد.",
    step2Vol: "خطوة 02", step2Title: "المواد والتصنيع", step2Desc: "شراء التشطيبات الفاخرة إلى جانب أعمال النجارة وتصنيع المعادن المخصصة في منشأتنا بالبحرين.",
    step3Vol: "خطوة 03", step3Title: "تنفيذ تسليم المفتاح", step3Desc: "بناء صارم في الموقع، ورقابة صارمة على الجودة، وتسليم نهائي جاهز للتشغيل التجاري الفوري.",

    archiveTitle: "مساحات منسقة",
    selectDeps: "تجهيزات مختارة // تجاري",
    caseStudy: "دراسة حالة داخلية",
    archiveIndex: "أرشيف 0",

    ctaTitle: "هل أنت مستعد لهندسة مساحتك؟",
    ctaBtn: "العودة للرئيسية"
};

const THEME_COLOR = "#3B82F6"; // Electric Blue
const HERO_IMAGE = "/insta/interiors.jpeg";

const CAPABILITIES_ICONS = [Store, Coffee, Briefcase, Sofa];

const CAPABILITIES_IMAGES = [
    "/insta/image6.png", 
    "/insta/image7.png", 
    "/insta/image8.png", 
    "/insta/image9.png"
];

const GALLERY_IMAGES = [
    "/insta/image3.png", "/insta/image4.png", "/insta/image5.png", 
    "/insta/image6.png", "/insta/image7.png", "/insta/image8.png", "/insta/image9.png"
];

// Animation Variants
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } }
};

// Context for App-wide Language State
const LangContext = createContext({ isAr: false, toggleLang: () => {}, t: TEXT_EN });

export default function InteriorsPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null); 
    const [isMobile, setIsMobile] = useState(true);
    const [isAr, setIsAr] = useState(false);

    const toggleLang = () => setIsAr(!isAr);
    const t = isAr ? TEXT_AR : TEXT_EN;

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
        <LangContext.Provider value={{ isAr, toggleLang, t }}>
        <main ref={containerRef} className={`bg-[#050505] h-screen w-full text-white font-sans selection:bg-blue-500/30 overflow-y-auto overflow-x-hidden relative scroll-smooth custom-scrollbar ${isAr ? 'dir-rtl' : 'dir-ltr'}`} dir={isAr ? "rtl" : "ltr"}>
            
            {/* 0. HIGHLY VISIBLE DOT GRID BACKGROUND */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
                <div className="absolute inset-0 z-0 opacity-40"
                     style={{
                         backgroundImage: `radial-gradient(rgba(255,255,255,0.15) 1.5px, transparent 1.5px)`,
                         backgroundSize: '24px 24px',
                     }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]" />
            </div>

            {/* 1. MINIMALIST NAVBAR */}
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-10 md:py-8 flex justify-between items-start pointer-events-none mix-blend-difference">
                <Link href="/" className="pointer-events-auto group flex items-center gap-4 opacity-70 hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 shadow-lg">
                        <ArrowLeft size={16} strokeWidth={1.5} className={isAr ? "rotate-180" : ""} />
                    </div>
                    <div className="hidden sm:flex flex-col">
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] leading-none mb-1">{t.return}</span>
                        <span className="text-[8px] font-mono text-white/50 leading-none uppercase">{t.mainGrid}</span>
                    </div>
                </Link>

                <div className="pointer-events-auto flex items-center gap-4 md:gap-6">
                    {/* Arabic Toggle */}
                    <button 
                        onClick={toggleLang} 
                        className="flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-2.5 border border-white/30 rounded-full text-white transition-all hover:bg-white/10 group"
                    >
                        <Globe size={16} className="group-hover:text-blue-400 transition-colors" />
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest mt-[1px]">{isAr ? "English" : "عربي"}</span>
                    </button>

                    <div className="w-24 md:w-32 opacity-100 drop-shadow-2xl">
                        <ColoursLogoHeader className="w-full h-auto fill-white" />
                    </div>
                </div>
            </nav>

            {/* 2. CINEMATIC HERO */}
            <section className="relative h-[85svh] md:h-[100svh] w-full overflow-hidden flex items-end pb-12 md:pb-24 px-6 md:px-12 lg:px-24 shrink-0">
                
                {/* Parallax Image */}
                <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 z-0">
                    <Image 
                        src={HERO_IMAGE} 
                        alt={t.title} 
                        fill 
                        sizes="100vw"
                        className="object-cover scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
                    <div className={`absolute inset-0 bg-gradient-to-r ${isAr ? 'from-transparent via-transparent to-[#050505]/80' : 'from-[#050505]/80 via-transparent to-transparent'}`} />
                </motion.div>

                <div className="relative z-10 w-full max-w-[1800px] mx-auto flex flex-col items-start">
                    <motion.div 
                        initial="hidden" animate="visible" variants={fadeUp}
                        className="flex flex-col items-start w-full relative"
                    >
                        {/* Subtitle */}
                        <div className="flex items-center gap-4 mb-4 md:mb-6">
                            <Asterisk size={14} style={{ color: THEME_COLOR }} />
                            <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-[0.4em]">
                                {t.subtitle}
                            </span>
                        </div>
                        
                        {/* Massive Editorial Title */}
                        <h1 className="text-[11vw] md:text-[10vw] lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] text-white mix-blend-plus-lighter drop-shadow-2xl">
                            {t.title}
                        </h1>

                        {/* CREATIVE HERO FLOATING CARD */}
                        <motion.div 
                            initial={{ opacity: 0, x: isAr ? -50 : 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className={`hidden lg:flex absolute bottom-0 w-80 bg-black/40 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 flex-col gap-6 shadow-[0_30px_60px_rgba(0,0,0,0.6)] ${isAr ? 'left-0' : 'right-0'}`}
                        >
                            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: THEME_COLOR }} />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">{t.spatialEng}</span>
                                </div>
                                <Globe size={16} className="text-white/50" />
                            </div>
                            
                            <p className="text-[11px] text-white/80 leading-relaxed font-light">
                                {t.heroDesc}
                            </p>
                            
                            <div className="flex items-center justify-between pt-2">
                                <div className={`flex overflow-hidden ${isAr ? '-space-x-reverse space-x-3' : '-space-x-3'}`}>
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
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8" style={{ color: THEME_COLOR }}>{t.philosophy}</span>
                        <p className="text-2xl md:text-4xl font-light text-white/90 leading-snug md:leading-snug">
                            {t.overview}
                        </p>
                    </motion.div>

                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                        className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-10 border-t border-white/10 pt-10 lg:border-t-0 lg:pt-0"
                    >
                        <div className="flex flex-col group">
                            <span className="text-[10px] font-mono text-white/50 uppercase tracking-[0.2em] mb-3 group-hover:text-white transition-colors">{t.stat1Label}</span>
                            <span className="text-4xl md:text-5xl font-medium tracking-tighter text-white">{t.stat1Value}</span>
                            <div className="h-[1px] w-12 bg-white/20 mt-4 group-hover:w-full transition-all duration-500" style={{ backgroundColor: THEME_COLOR }} />
                        </div>
                        <div className="flex flex-col group">
                            <span className="text-[10px] font-mono text-white/50 uppercase tracking-[0.2em] mb-3 group-hover:text-white transition-colors">{t.stat2Label}</span>
                            <span className="text-4xl md:text-5xl font-medium tracking-tighter text-white">{t.stat2Value}</span>
                            <div className="h-[1px] w-12 bg-white/20 mt-4 group-hover:w-full transition-all duration-500" style={{ backgroundColor: THEME_COLOR }} />
                        </div>
                        <div className="flex flex-col group sm:col-span-2">
                            <span className="text-[10px] font-mono text-white/50 uppercase tracking-[0.2em] mb-3 group-hover:text-white transition-colors">{t.stat3Label}</span>
                            <span className="text-4xl md:text-5xl font-medium tracking-tighter text-white">{t.stat3Value}</span>
                            <div className="h-[1px] w-12 bg-white/20 mt-4 group-hover:w-full transition-all duration-500" style={{ backgroundColor: THEME_COLOR }} />
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* 4. IMAGE-BASED CAPABILITIES */}
            <section className="relative z-20 py-24 md:py-32 px-6 md:px-12 lg:px-24 shrink-0">
                <div className="max-w-[1800px] mx-auto">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-12 mb-12 md:mb-16 gap-6">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block" style={{ color: THEME_COLOR }}>{t.coreCompetencies}</span>
                            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-white drop-shadow-md">{t.spatialArch}</h2>
                        </div>
                        <p className={`text-xs font-mono text-white/50 uppercase tracking-widest max-w-xs md:text-right ${isAr ? 'md:text-left' : 'md:text-right'}`}>
                            {t.spatialArchDesc}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {[
                            { title: t.cap1Title, desc: t.cap1Desc, image: CAPABILITIES_IMAGES[0], icon: CAPABILITIES_ICONS[0] },
                            { title: t.cap2Title, desc: t.cap2Desc, image: CAPABILITIES_IMAGES[1], icon: CAPABILITIES_ICONS[1] },
                            { title: t.cap3Title, desc: t.cap3Desc, image: CAPABILITIES_IMAGES[2], icon: CAPABILITIES_ICONS[2] },
                            { title: t.cap4Title, desc: t.cap4Desc, image: CAPABILITIES_IMAGES[3], icon: CAPABILITIES_ICONS[3] }
                        ].map((cap, i) => (
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
                                <div className={`relative z-10 p-6 md:p-8 flex flex-col ${isAr ? 'items-end text-right' : 'items-start text-left'}`}>
                                    <div className="w-10 h-10 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm flex items-center justify-center mb-4">
                                        <cap.icon size={16} className="text-white" />
                                    </div>
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
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block" style={{ color: THEME_COLOR }}>{t.methodology}</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-white leading-[0.9] mb-6 drop-shadow-lg">
                            {t.builtToLast}
                        </h2>
                        <p className="text-white/70 font-light text-lg">
                            {t.methodDesc}
                        </p>
                    </motion.div>

                    <div className="lg:col-span-7 relative">
                        {/* Static connecting vertical line */}
                        <div className={`absolute ${isAr ? 'right-[27px] md:right-[39px]' : 'left-[27px] md:left-[39px]'} top-4 bottom-4 w-[1px] bg-white/20`} />

                        <div className="flex flex-col gap-12 md:gap-20">
                            {[
                                { step: t.step1Vol, title: t.step1Title, desc: t.step1Desc },
                                { step: t.step2Vol, title: t.step2Title, desc: t.step2Desc },
                                { step: t.step3Vol, title: t.step3Title, desc: t.step3Desc }
                            ].map((proc, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: isAr ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: i * 0.15 }}
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
            <section className="py-24 md:py-40 px-4 md:px-12 lg:px-24 shrink-0 border-t border-white/10">
                <div className="max-w-[1800px] mx-auto">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col items-center text-center mb-16 md:mb-24">
                        <Compass size={24} className="mb-6" style={{ color: THEME_COLOR }} />
                        <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-white drop-shadow-md">{t.archiveTitle}</h2>
                        <span className="text-[10px] font-mono text-white/50 mt-6 tracking-[0.3em] uppercase">{t.selectDeps}</span>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[250px] md:auto-rows-[350px] gap-3 md:gap-5">
                        {GALLERY_IMAGES.map((src, i) => {
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
                                        src={src} alt={`Interior ${i+1}`} fill sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105 will-change-transform opacity-80 group-hover:opacity-100"
                                    />
                                    
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    
                                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                                        <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out flex items-end justify-between">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[9px] font-bold uppercase tracking-widest text-white">{t.caseStudy}</span>
                                                <span className="text-[10px] font-mono text-white/60 tracking-widest uppercase">{t.archiveIndex} {i + 1}</span>
                                            </div>
                                            <div className={`w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-300 shadow-xl ${isAr ? 'group-hover:-rotate-45' : 'group-hover:rotate-45'}`}>
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
                    {t.ctaTitle}
                </h2>

                <Link href="/" className="relative z-10 inline-flex items-center gap-6 px-12 py-6 bg-white text-black rounded-full hover:scale-105 transition-transform duration-500 shadow-[0_0_50px_rgba(255,255,255,0.1)] group">
                    <span className="text-xs font-black uppercase tracking-[0.2em]">{t.ctaBtn}</span>
                    <LayoutGrid size={16} className={`transition-transform duration-500 ${isAr ? 'group-hover:-rotate-90' : 'group-hover:rotate-90'}`} />
                </Link>
            </section>

        </main>
        </LangContext.Provider>
    );
}