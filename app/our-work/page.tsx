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
    ArrowLeft, 
    MousePointer2, 
    X, 
    Mail, 
    Copy, 
    Check, 
    ArrowUpRight, 
    CornerDownRight,
    Globe,
    Instagram,
    Monitor,
    Image as ImageIcon
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ColoursLogoHeader } from "@/components/ui/ColoursLogoHeader";

// --- BILINGUAL DICTIONARY (Clean, Professional Tone) ---
const TEXT_EN = {
    return: "Return",
    mainHome: "Home",
    est: "Established 2000 in Bahrain",
    active: "Serving the GCC Region",
    title1: "Our",
    title2: "Works.",
    desc: "A curated exhibition of our most prominent projects. We design and build spaces to deliver flawless execution where precision meets breathtaking aesthetics.",
    scroll: "Scroll to Explore",
    filterAll: "All",
    ctaTitle: "Ready to start?",
    ctaBtn: "Start Project",
    secureUplink: "Contact Us",
    dialogue: "Start a Dialogue.",
    contactDesc: "Our team is ready to bring your next experience to life. Copy the email below to get in touch.",
    official: "Official Inquiries",
    copy: "Copy Email",
    copied: "Copied!",
    index: "Project",
    viewConcept: "View Project",
    viewInsta: "View on Instagram",
    hq: "Headquarters",
    galleryBadge: "Our Gallery",
    unlocked: "View Details",
    rights: "All rights reserved.",
    developedBy: "Developed by WhitehillsIntl"
};

const TEXT_AR = {
    return: "عودة",
    mainHome: "الرئيسية",
    est: "تأسست عام 2000 في البحرين",
    active: "نخدم منطقة دول مجلس التعاون",
    title1: "معرض",
    title2: "أعمالنا.",
    desc: "معرض منسق لأبرز مشاريعنا. نقوم بتصميم وبناء المساحات لتقديم تنفيذ لا تشوبه شائبة حيث تلتقي الدقة بالجمال المذهل.",
    scroll: "قم بالتمرير للاستكشاف",
    filterAll: "الكل",
    ctaTitle: "مستعد للبدء؟",
    ctaBtn: "بدأ مشروعك",
    secureUplink: "اتصل بنا",
    dialogue: "ابدأ الحوار.",
    contactDesc: "فريقنا مستعد لتحويل تجربتك القادمة إلى واقع. انسخ البريد الإلكتروني أدناه للتواصل معنا.",
    official: "الاستفسارات الرسمية",
    copy: "نسخ البريد",
    copied: "تم النسخ!",
    index: "مشروع",
    viewConcept: "عرض المشروع",
    viewInsta: "عرض على إنستغرام",
    hq: "المقر الرئيسي",
    galleryBadge: "معرض الصور",
    unlocked: "عرض التفاصيل",
    rights: "جميع الحقوق محفوظة.",
    developedBy: "تم التطوير بواسطة WhitehillsIntl"
};

// --- PORTFOLIO DATA (Strict Categories) ---
const PORTFOLIO = [
    { id: 1, category: "Events", categoryAr: "الفعاليات", title: "Global Tech Summit 2025", titleAr: "قمة التكنولوجيا العالمية 2025", subtitle: "Immersive Stage & Mapping", subAr: "مسرح غامر وتخطيط بصري", img: "/insta/events.jpeg", link: "https://instagram.com" },
    { id: 2, category: "Exhibitions", categoryAr: "المعارض", title: "Automotive Pavilion", titleAr: "جناح السيارات", subtitle: "Bespoke Architecture", subAr: "هندسة معمارية مخصصة", img: "/insta/exhibitions.jpeg", link: "https://instagram.com" },
    { id: 3, category: "Interiors", categoryAr: "التصميم الداخلي", title: "Corporate HQ Lounge", titleAr: "صالة المقر الرئيسي", subtitle: "Premium Fit-Out", subAr: "تجهيزات فاخرة", img: "/insta/interiors.jpeg", link: "https://instagram.com" },
    { id: 4, category: "Mall Kiosk", categoryAr: "أكشاك", title: "Luxury Brand Activation", titleAr: "تنشيط العلامة الفاخرة", subtitle: "High-Traffic Kiosk", subAr: "كشك عالي الإقبال", img: "/insta/mallkioski.jpeg", link: "https://instagram.com" },
    { id: 5, category: "Events", categoryAr: "الفعاليات", title: "Award Gala Night", titleAr: "حفل توزيع الجوائز", subtitle: "End-to-End Execution", subAr: "تنفيذ متكامل", img: "/insta/events.jpeg", link: "https://instagram.com" },
    { id: 6, category: "Exhibitions", categoryAr: "المعارض", title: "Double-Decker Expo", titleAr: "جناح المعرض المزدوج", subtitle: "Structural Engineering", subAr: "هندسة هيكلية", img: "/insta/exhibitions.jpeg", link: "https://instagram.com" },
    { id: 7, category: "Interiors", categoryAr: "التصميم الداخلي", title: "Modern Workspace", titleAr: "مساحة عمل حديثة", subtitle: "Ergonomic Design", subAr: "تصميم مريح", img: "/insta/interiors.jpeg", link: "https://instagram.com" },
    { id: 8, category: "Mall Kiosk", categoryAr: "أكشاك", title: "Pop-up Retail Store", titleAr: "متجر تجزئة مؤقت", subtitle: "Brand Activation", subAr: "تنشيط العلامة التجارية", img: "/insta/mallkioski.jpeg", link: "https://instagram.com" },
];

const CATEGORIES = ["All", "Events", "Exhibitions", "Interiors", "Mall Kiosk"];

// Custom smooth easing curve (FIXED: Added "as const" for TypeScript)
const customEase = [0.22, 1, 0.36, 1] as const;

// Context for App-wide Language State
const LangContext = createContext({ isAr: false, toggleLang: () => {}, t: TEXT_EN });

export default function GalleryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showContact, setShowContact] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isMobile, setIsMobile] = useState(true);
  const [isAr, setIsAr] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const toggleLang = () => setIsAr(!isAr);
  const t = isAr ? TEXT_AR : TEXT_EN;

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

  const filteredPortfolio = PORTFOLIO.filter(item => 
      activeCategory === "All" ? true : item.category === activeCategory
  );

  return (
    <LangContext.Provider value={{ isAr, toggleLang, t }}>
        <div ref={containerRef} className={`bg-[#050508] h-[100dvh] w-full relative overflow-y-auto overflow-x-hidden text-white selection:bg-emerald-500/30 font-sans scroll-smooth custom-scrollbar ${isAr ? 'dir-rtl' : 'dir-ltr'}`} dir={isAr ? "rtl" : "ltr"}>
        
        {/* SIDE DEVELOPER BADGE */}
        <div className={`fixed ${isAr ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 ${isAr ? '-rotate-90' : 'rotate-90'} origin-center text-[10px] text-white/30 tracking-[0.3em] uppercase mix-blend-difference hidden xl:block z-50 pointer-events-none`}>
            {t.developedBy}
        </div>

        {/* 1. CINEMATIC BACKGROUND */}
        <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 z-0 opacity-[0.15]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)', 
                    WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
                }}
            />
            <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-blue-900/20 blur-[120px] rounded-full mix-blend-screen opacity-50 animate-pulse-slow will-change-transform" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-emerald-900/10 blur-[120px] rounded-full mix-blend-screen opacity-50 will-change-transform" />
        </div>

        {/* 2. HUD NAVIGATION */}
        <nav className="fixed top-0 left-0 w-full z-50 px-5 py-6 md:px-10 md:py-8 flex justify-between items-start pointer-events-none">
            
            <Link href="/" className="pointer-events-auto group flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    <ArrowLeft size={18} className={isAr ? "rotate-180" : ""} />
                </div>
                <div className="hidden sm:flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] leading-none mb-1 text-white">{t.return}</span>
                    <span className="text-[8px] font-mono text-white/50 leading-none uppercase">{t.mainHome}</span>
                </div>
            </Link>

            <div className="pointer-events-auto flex items-center gap-4 md:gap-6">
                {/* UPGRADED: More visible language toggle button */}
               <button onClick={toggleLang} className="flex items-center gap-2 text-white/60 hover:text-emerald-400 transition-colors group">
    <Globe size={14} className="md:w-4 md:h-4 group-hover:text-emerald-400 transition-colors" />
    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest mt-[1px]">(EN/AR)</span>
</button>

                <div className="w-24 sm:w-32 md:w-40 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    <ColoursLogoHeader className="w-full h-auto fill-white" />
                </div>
            </div>

        </nav>

        {/* 3. HERO SECTION */}
        <section className="relative min-h-[60svh] flex flex-col justify-center px-6 md:px-12 lg:px-24 z-10 pt-32 pb-12">
            <motion.div style={{ y: yHero, opacity: opacityHero }} className="max-w-[1800px] mx-auto w-full">
                
                <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-8 md:mb-12">
                    <div className="px-3 py-1.5 md:px-4 md:py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center gap-2 md:gap-3 shadow-lg">
                        <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-[8px] md:text-[10px] font-medium text-emerald-300 uppercase tracking-widest">{t.est}</span>
                    </div>
                    <div className="hidden md:block h-[1px] w-16 bg-gradient-to-r from-white/40 to-transparent" />
                    <span className="text-[8px] md:text-[10px] font-medium text-white/50 tracking-wider uppercase">{t.active}</span>
                </div>
                
                <div className="relative z-20 max-w-5xl">
                    <h1 className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter leading-[0.9] mb-6 md:mb-8 uppercase text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                        {t.title1} <br /> 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-emerald-300 animate-gradient-x">{t.title2}</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 mt-8 md:mt-12 items-start">
                    <div className="lg:col-span-6 relative">
                        <div className={`absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 to-emerald-500 ${isAr ? 'right-0' : 'left-0'}`} />
                        <p className={`text-lg md:text-2xl font-light text-white/80 leading-relaxed ${isAr ? 'pr-6 md:pr-8' : 'pl-6 md:pl-8'}`}>
                            {t.desc}
                        </p>
                    </div>
                </div>

                <div className="mt-16 flex items-center gap-4 opacity-50">
                    <MousePointer2 size={14} className="animate-bounce" />
                    <span className="text-[9px] font-medium uppercase tracking-widest">{t.scroll}</span>
                </div>
            </motion.div>
        </section>

        {/* 4. FILTER BAR */}
        <div className="relative z-40 px-6 md:px-12 lg:px-24 flex justify-start mb-12 pointer-events-auto max-w-[1800px] mx-auto">
            <div className="flex flex-wrap items-center gap-2 md:gap-3 p-2 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                {CATEGORIES.map((cat) => {
                    const label = isAr && cat !== "All" ? PORTFOLIO.find(p => p.category === cat)?.categoryAr || cat : (isAr && cat === "All" ? t.filterAll : cat);
                    return (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`relative px-5 py-2.5 md:px-6 md:py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300 ${activeCategory === cat ? 'text-black' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
                        >
                            {activeCategory === cat && (
                                <motion.div 
                                    layoutId="activeFilterBubble"
                                    className="absolute inset-0 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{label}</span>
                        </button>
                    );
                })}
            </div>
        </div>

        {/* 5. EDITORIAL BENTO GALLERY */}
        <section className="relative px-6 md:px-12 lg:px-24 pb-40 z-20">
            <motion.div layout className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[250px] md:auto-rows-[300px] gap-4 md:gap-6 max-w-[1800px] mx-auto">
                <AnimatePresence>
                    {filteredPortfolio.map((project, i) => {
                        const title = isAr ? project.titleAr : project.title;
                        const subtitle = isAr ? project.subAr : project.subtitle;
                        
                        // Layout logic
                        let spanClass = "col-span-1 row-span-1";
                        if (i === 0) spanClass = "md:col-span-2 md:row-span-2";
                        else if (i === 3) spanClass = "md:col-span-2 row-span-1";
                        else if (i === 4) spanClass = "lg:col-span-2 lg:row-span-2";
                        else if (i === 6) spanClass = "md:col-span-3 lg:col-span-2 row-span-1";

                        return (
                            <motion.div 
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                                transition={{ duration: 0.5, ease: customEase }}
                                key={project.id}
                                onClick={() => setSelectedPost(project)}
                                className={`group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 cursor-pointer shadow-lg ${spanClass}`}
                            >
                                <Image 
                                    src={project.img} 
                                    alt={title} 
                                    fill 
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110 will-change-transform"
                                />
                                
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                                
                                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                                    <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out flex items-end justify-between">
                                        <div>
                                            <span className="text-[9px] font-mono text-emerald-400 mb-2 block tracking-widest uppercase">{t.index} // 0{i + 1}</span>
                                            <h3 className="text-lg md:text-xl font-bold uppercase text-white tracking-widest">{t.viewConcept}</h3>
                                            <p className="text-[10px] text-white/50 mt-1">{title}</p>
                                        </div>
                                        <div className={`w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-300 ${isAr ? 'group-hover:-rotate-45' : 'group-hover:rotate-45'}`}>
                                            <ArrowUpRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </motion.div>
        </section>

        {/* 6. FOOTER CTA */}
        <section className="relative py-32 md:py-40 border-t border-white/10 bg-black z-20 text-center overflow-hidden px-6 flex flex-col">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />
            
            <div className="relative z-10 max-w-4xl mx-auto flex-grow flex flex-col items-center justify-center mb-24">
                <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                    {t.ctaTitle}
                </h2>
                
                <button 
                    onClick={() => setShowContact(true)}
                    className="group relative inline-flex items-center gap-4 md:gap-6 px-10 py-5 md:px-16 md:py-8 bg-white text-black rounded-full hover:scale-105 transition-transform duration-500 shadow-[0_0_60px_rgba(255,255,255,0.2)] overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10 text-xs md:text-sm font-black uppercase tracking-[0.25em]">{t.ctaBtn}</span>
                    <CornerDownRight size={18} className={`relative z-10 transition-transform duration-300 ${isAr ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`} />
                </button>
            </div>

            {/* Bottom Bar Footer */}
            <div className="relative z-10 max-w-[1800px] w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 text-white/40 text-[10px] uppercase tracking-widest">
                <p>&copy; {new Date().getFullYear()} Colours. {t.rights}</p>
                <div className="flex items-center gap-2">
                    <p>{t.developedBy}</p>
                </div>
            </div>
        </section>

        <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
        
        {/* LIGHTBOX MODAL */}
        <AnimatePresence>
            {selectedPost && (
                <LightboxModal post={selectedPost} onClose={() => setSelectedPost(null)} />
            )}
        </AnimatePresence>

        </div>
    </LangContext.Provider>
  );
}

// --- MODAL COMPONENTS ---

function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { isAr, t } = useContext(LangContext);
    const [copied, setCopied] = useState(false);
    const email = "info@coloursbahrain.com";

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
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
                        dir={isAr ? "rtl" : "ltr"}
                    >
                        <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/10 bg-white/5">
                            <div className="flex items-center gap-3">
                                <Monitor size={16} className="text-emerald-400 animate-pulse" />
                                <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-white/80">{t.secureUplink}</span>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X size={20} className="text-white/60" />
                            </button>
                        </div>
                        <div className="p-6 md:p-12">
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">{t.dialogue}</h3>
                            <p className="text-white/50 text-xs md:text-sm mb-8 md:mb-10 font-light leading-relaxed">
                                {t.contactDesc}
                            </p>
                            <div onClick={handleCopy} className="group relative h-20 md:h-24 bg-black border border-white/20 rounded-xl md:rounded-2xl flex items-center justify-between px-5 md:px-8 cursor-pointer hover:border-emerald-500/50 transition-all duration-300 shadow-lg">
                                <div className="flex items-center gap-4 md:gap-5 overflow-hidden">
                                    <div className={`shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors ${copied ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white'}`}>
                                        {copied ? <Check size={18} /> : <Mail size={18} />}
                                    </div>
                                    <div className="flex flex-col gap-1 truncate">
                                        <span className="text-[8px] md:text-[9px] font-mono text-white/40 uppercase tracking-wider">{t.official}</span>
                                        <span className="text-sm md:text-xl font-mono text-white truncate" dir="ltr">{email}</span>
                                    </div>
                                </div>
                                <div className={`hidden sm:flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity ${isAr ? 'pr-4' : 'pl-4'}`}>
                                    <span className="text-[9px] md:text-[10px] font-bold uppercase text-emerald-400 tracking-widest whitespace-nowrap">{copied ? t.copied : t.copy}</span>
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

function LightboxModal({ post, onClose }: { post: any, onClose: () => void }) {
    const { isAr, t } = useContext(LangContext);
    const title = isAr ? post.titleAr : post.title;
    const subtitle = isAr ? post.subAr : post.subtitle;
    const category = isAr ? post.categoryAr : post.category;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10" dir={isAr ? "rtl" : "ltr"}>
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
            />
            
            <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }} 
                animate={{ scale: 1, opacity: 1, y: 0 }} 
                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-5xl max-h-[90vh] bg-[#0a0a0f] border border-white/10 rounded-2xl md:rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-[0_0_80px_rgba(0,0,0,0.8)] z-10"
            >
                <button onClick={onClose} className={`absolute top-4 ${isAr ? 'left-4' : 'right-4'} z-20 p-2 md:p-3 rounded-full bg-black/50 text-white/60 hover:text-white hover:bg-black border border-white/10 transition-all backdrop-blur-md`}>
                    <X size={20} />
                </button>

                <div className="w-full md:w-3/5 h-[40vh] md:h-auto md:min-h-[600px] relative bg-black">
                    <Image src={post.img} alt={title} fill className="object-cover" />
                </div>

                <div className="w-full md:w-2/5 p-6 md:p-10 flex flex-col justify-between overflow-y-auto">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                                <ColoursLogoHeader className="w-6 h-auto fill-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-white">colours_studio</h4>
                                <span className="text-[10px] text-white/50 font-mono">{t.hq}</span>
                            </div>
                        </div>

                        <hr className="border-white/10 mb-6" />

                        <div className="flex items-center gap-2 mb-3">
                            <ImageIcon size={14} className="text-blue-400" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">{category}</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-4">{title}</h2>
                        <p className="text-sm text-white/70 leading-relaxed font-light">{subtitle}</p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10">
                        <Link href={post.link} target="_blank" className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-lg">
                            <Instagram size={18} />
                            {t.viewInsta}
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}