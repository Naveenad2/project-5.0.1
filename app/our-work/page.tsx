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

// --- INSTAGRAM ---
const INSTAGRAM_URL = "https://www.instagram.com/colours.bahrain/";

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
    viewConcept: "View on Instagram",
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
    viewConcept: "عرض على إنستغرام",
    viewInsta: "عرض على إنستغرام",
    hq: "المقر الرئيسي",
    galleryBadge: "معرض الصور",
    unlocked: "عرض التفاصيل",
    rights: "جميع الحقوق محفوظة.",
    developedBy: "تم التطوير بواسطة WhitehillsIntl"
};

// --- PORTFOLIO DATA ---
// Mapped 1:1 to your real Finder folders. Drop your existing
// EVENTS / EXHIBITION / KIOSK folders straight into /public
// (paths below match those folder & file names exactly).
type CategoryKey = "Events" | "Exhibition" | "Kiosk";

const CATEGORY_META: Record<CategoryKey, { ar: string; accent: string; ring: string }> = {
    Events:     { ar: "الفعاليات", accent: "from-emerald-400 to-emerald-600", ring: "group-hover:shadow-emerald-500/30" },
    Exhibition: { ar: "المعارض",   accent: "from-blue-400 to-blue-600",       ring: "group-hover:shadow-blue-500/30" },
    Kiosk:      { ar: "الأكشاك",   accent: "from-rose-400 to-rose-600",       ring: "group-hover:shadow-rose-500/30" },
};

interface Project {
    id: number;
    category: CategoryKey;
    title: string;
    titleAr: string;
    subtitle: string;
    subAr: string;
    img: string;
}

const PORTFOLIO: Project[] = [
    // ---------- EVENTS ----------
    { id: 1, category: "Events", title: "Bank ABC Ghabga at Gulf Hotel", titleAr: "بنك ABC غبقة في فندق الخليج", subtitle: "Ramadan Gala Production", subAr: "إنتاج حفل رمضاني", img: "/EVENTS/BANK ABC GHABGA AT GULF HOTEL 2025/BANK ABC GHABGA AT GULF HOTEL 2.jpg" },
    { id: 2, category: "Events", title: "F1 2025 — EDB Paddock Lounge", titleAr: "F1 2025 — صالة EDB في الحظيرة", subtitle: "VIP Paddock Experience", subAr: "تجربة كبار الشخصيات", img: "/EVENTS/F1 2025 - EDB PADDOCK LOUNGE/ECONOMIC DEVELOPMENT BOARD  PADDOCK CLUB 3.jpg" },
    { id: 3, category: "Events", title: "F1 2025 — Gulf Air Paddock Club", titleAr: "F1 2025 — نادي طيران الخليج", subtitle: "Trackside Hospitality Suite", subAr: "جناح ضيافة على الحلبة", img: "/EVENTS/F1 2025 - GULF AIR/GULF AIR PADDOCK CLUB 12.jpg" },
    { id: 4, category: "Events", title: "F1 Pre-Season Testing 2025", titleAr: "اختبارات ما قبل الموسم F1 2025", subtitle: "Branded Trackside Activation", subAr: "تفعيل علامة تجارية على الحلبة", img: "/EVENTS/F1 PRE SEASON TESTING 2025/F1 PRE - SEASON TESTING 20.jpg" },
    { id: 5, category: "Events", title: "Fintech 2025", titleAr: "فينتك 2025", subtitle: "Conference Stage & Booths", subAr: "مسرح ومنصات المؤتمر", img: "/EVENTS/FINTECH 2025/2J5A0953.JPG" },
    { id: 6, category: "Events", title: "Jotun Event at La Fontaine", titleAr: "فعالية جوتن في لا فونتين", subtitle: "Product Launch Evening", subAr: "أمسية إطلاق منتج", img: "/EVENTS/JOTUN EVENT AT LA FONTAINE/JOTUN EVENT AT LA FONTAINE 1.jpg" },
    { id: 7, category: "Events", title: "Riffa Views School Event", titleAr: "فعالية مدرسة ريفا فيوز", subtitle: "National Theatre Production", subAr: "إنتاج في المسرح الوطني", img: "/EVENTS/RIFFA VIEW SCHOOL EVENT AT NATIONAL THEATRE 2025/RIFFA VIEW SCHOOL EVENT AT NATIONAL THEATRE 1.jpg" },

    // ---------- EXHIBITION ----------
    { id: 8, category: "Exhibition", title: "Al Jiwan Jewellery", titleAr: "الجوان للمجوهرات", subtitle: "Boutique Showcase", subAr: "عرض بوتيك فاخر", img: "/EXHIBITION/AL JIWAN JEWELLERY 01.JPG" },
    { id: 9, category: "Exhibition", title: "AMG Stand at Marassi Galleria", titleAr: "جناح AMG في مراسي غاليريا", subtitle: "Automotive Showroom Build", subAr: "بناء صالة عرض سيارات", img: "/EXHIBITION/AMG STAND AT MARASSI 2025/AMG STAND AT MARASSI GALLERIA 01.jpeg" },
    { id: 10, category: "Exhibition", title: "Avenues Ramadan Stand", titleAr: "جناح رمضان في أفينيوز", subtitle: "Seasonal Mall Activation", subAr: "تفعيل موسمي في المول", img: "/EXHIBITION/AVENUES RAMADAN STAND 2025.jpg" },
    { id: 11, category: "Exhibition", title: "Back to School — Marassi Galleria", titleAr: "العودة للمدارس — مراسي غاليريا", subtitle: "Family Mall Campaign", subAr: "حملة عائلية في المول", img: "/EXHIBITION/BACK TO SCHOOL  2025/MARASSI GALLERIA MALL BACK TO SCHOOL 02.jpg" },
    { id: 12, category: "Exhibition", title: "Bahrain Marina", titleAr: "مارينا البحرين", subtitle: "Waterfront Brand Experience", subAr: "تجربة علامة تجارية على الواجهة البحرية", img: "/EXHIBITION/BAHRAIN MARINA 2025/BAHRAIN MARINA 01.jpg" },
    { id: 13, category: "Exhibition", title: "Bahrain Marina at Avenues", titleAr: "مارينا البحرين في أفينيوز", subtitle: "Mall Concourse Installation", subAr: "تركيب في ممر المول", img: "/EXHIBITION/BAHRAIN MARINA AT AVENUES 2025/BAHRAIN MARINA AT AVENUES 2.jpg" },
    { id: 14, category: "Exhibition", title: "Bestune Stand at City Center", titleAr: "جناح بيستون في سيتي سنتر", subtitle: "Automotive Launch Stand", subAr: "جناح إطلاق سيارات", img: "/EXHIBITION/BESTUNE STAND AT CITY CENTER 2025.jpg" },
    { id: 15, category: "Exhibition", title: "Binaa Stand at City Center", titleAr: "جناح بناء في سيتي سنتر", subtitle: "Real Estate Showcase", subAr: "عرض عقاري", img: "/EXHIBITION/BINAA STAND AT CITY CENTER 2025/BINAA STAND AT CITY CENTER 02.jpg" },
    { id: 16, category: "Exhibition", title: "Edamah 2025", titleAr: "إدامة 2025", subtitle: "Corporate Exhibition Stand", subAr: "جناح معرض للشركات", img: "/EXHIBITION/EDAMAH 2025/EDAMAH 01.jpg" },
    { id: 17, category: "Exhibition", title: "F1 Stand at City Center", titleAr: "جناح F1 في سيتي سنتر", subtitle: "Motorsport Retail Activation", subAr: "تفعيل تجزئة لرياضة السيارات", img: "/EXHIBITION/F1 STAND @ CITY CENTER 2025/F1 STAND AT CITY CENTER 3.jpg" },

    // ---------- KIOSK ----------
    { id: 18, category: "Kiosk", title: "Bateel Kiosk at City Center", titleAr: "كشك بتيل في سيتي سنتر", subtitle: "Retail Kiosk Fit-Out", subAr: "تجهيز كشك تجزئة", img: "/KIOSK/BATEEL KIOSK AT CITY CENTER 2025.jpg" },
    { id: 19, category: "Kiosk", title: "Kiosk Activations", titleAr: "تفعيلات الأكشاك", subtitle: "Mall Pop-Up Moments", subAr: "لحظات منبثقة في المول", img: "/KIOSK/WhatsApp Image 2025-07-17 at 1.58.30 PM.jpeg" },
];

const CATEGORIES: ("All" | CategoryKey)[] = ["All", "Events", "Exhibition", "Kiosk"];

// Bento span pattern — cycles so any number of projects still reads as a
// deliberate, varied editorial grid instead of a flat uniform wall of tiles.
const SPAN_PATTERN = [
    "md:col-span-2 md:row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "md:col-span-2 row-span-1",
    "col-span-1 row-span-1",
    "lg:col-span-2 lg:row-span-2",
    "col-span-1 row-span-1",
    "md:col-span-3 lg:col-span-2 row-span-1",
];

// Custom smooth easing curve (FIXED: Added "as const" for TypeScript)
const customEase = [0.22, 1, 0.36, 1] as const;

// Context for App-wide Language State
const LangContext = createContext({ isAr: false, toggleLang: () => {}, t: TEXT_EN });

export default function GalleryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showContact, setShowContact] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"All" | CategoryKey>("All");
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
    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest mt-[1px]">(ENGLISH/ARABIC)</span>
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
                    const label = cat === "All" ? t.filterAll : (isAr ? CATEGORY_META[cat].ar : cat);
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
                <AnimatePresence mode="popLayout">
                    {filteredPortfolio.map((project, i) => (
                        <GalleryTile
                            key={project.id}
                            project={project}
                            index={i}
                            spanClass={SPAN_PATTERN[i % SPAN_PATTERN.length]}
                        />
                    ))}
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

        </div>
    </LangContext.Provider>
  );
}

// --- GALLERY TILE ---
// Handles its own loaded/hover state so the grid never blocks on a single
// slow image, and clicking a tile sends the visitor straight to Instagram.
function GalleryTile({ project, index, spanClass }: { project: Project; index: number; spanClass: string }) {
    const { isAr, t } = useContext(LangContext);
    const [loaded, setLoaded] = useState(false);
    const title = isAr ? project.titleAr : project.title;
    const subtitle = isAr ? project.subAr : project.subtitle;
    const meta = CATEGORY_META[project.category];
    const categoryLabel = isAr ? meta.ar : project.category;

    return (
        <motion.a
            layout
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} — ${t.viewInsta}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: customEase, delay: Math.min(index, 8) * 0.03 }}
            className={`group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 cursor-pointer shadow-lg transition-shadow duration-500 hover:shadow-2xl ${meta.ring} ${spanClass}`}
        >
            {/* Skeleton shimmer shown until the image finishes loading — keeps
                the grid feeling instant instead of hanging on mobile connections. */}
            {!loaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent animate-pulse" />
            )}

            <Image
                src={project.img}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={70}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                className={`object-cover transition-all duration-[1200ms] ease-out group-hover:scale-110 will-change-transform ${loaded ? 'opacity-100' : 'opacity-0'}`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

            {/* Category accent line — colour-codes each project by discipline,
                echoing the emerald/blue/rose gradient used in the footer CTA. */}
            <div className={`absolute top-0 ${isAr ? 'right-0' : 'left-0'} h-full w-[3px] bg-gradient-to-b ${meta.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out flex items-end justify-between gap-4">
                    <div className="min-w-0">
                        <span className={`text-[9px] font-mono mb-2 block tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r ${meta.accent}`}>{categoryLabel}</span>
                        <h3 className="text-lg md:text-xl font-bold uppercase text-white tracking-widest truncate">{title}</h3>
                        <p className="text-[10px] text-white/50 mt-1 truncate">{subtitle}</p>
                    </div>
                    <div className="shrink-0 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-300 group-hover:rotate-[360deg]">
                        <Instagram size={16} />
                    </div>
                </div>
            </div>

            {/* Always-visible corner badge so the Instagram destination reads
                clearly even before hover, especially useful on touch devices. */}
            <div className="absolute top-4 right-4 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <ArrowUpRight size={14} className="text-white" />
                </div>
            </div>
        </motion.a>
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