"use client";

import { useRef, useState, useEffect, useCallback, createContext } from "react";
import {
    motion,
    useScroll,
    useTransform,
    AnimatePresence
} from "framer-motion";
import {
    ArrowLeft, LayoutGrid, ArrowUpRight,
    Globe, Compass, Asterisk, ShoppingBag, MapPin, Sparkles, Coffee,
    X, ChevronLeft, ChevronRight, Loader2
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ColoursLogoHeader } from "@/components/ui/ColoursLogoHeader";

// --- BILINGUAL DICTIONARY ---
const TEXT_EN = {
    return: "Return",
    mainGrid: "Main Home",
    langToggle: "عربي",
    title: "MALL KIOSKS",
    subtitle: "Agency Division // Retail Pop-Ups",
    fabricationHq: "Retail Deployment",
    heroDesc: "Dominating premium retail spaces across the Kingdom. We transform heavy footfall into measurable brand engagement.",
    philosophy: "Philosophy",
    overview: "We design and fabricate high-traffic retail kiosks and experiential pop-ups. Placed in premier destinations like The Avenues, Marassi Galleria, and Moda Mall, our structures are engineered to maximize brand visibility, consumer engagement, and commercial return.",

    stat1Label: "Retail Activations", stat1Value: "300+",
    stat2Label: "Footfall Engagement", stat2Value: "Maximum",
    stat3Label: "Client Satisfaction", stat3Value: "100%",

    coreCompetencies: "Core Competencies",
    structEng: "Retail Infrastructure",
    structEngDesc: "Engineered for high-traffic environments and rapid deployment.",

    cap1Title: "Brand Pop-Ups", cap1Desc: "Immersive temporary retail spaces designed to launch products and drive immediate consumer action.",
    cap2Title: "Permanent Kiosks", cap2Desc: "Durable, 360-degree retail structures engineered for high-traffic mall corridors and long-term use.",
    cap3Title: "Experiential Zones", cap3Desc: "Interactive activation areas featuring digital touchpoints, gamification, and photo-ready aesthetics.",
    cap4Title: "F&B Outlets", cap4Desc: "Compact, fully-functional food and beverage kiosks fully compliant with strict mall safety and health regulations.",

    methodology: "Methodology",
    builtPrecision: "Stealth & Speed.",
    methodDesc: "We navigate complex mall regulations effortlessly. Our process guarantees rapid overnight deployment without disrupting public operations.",

    step1Vol: "Step 01", step1Title: "Traffic & Flow Analysis", step1Desc: "Evaluating mall guidelines, footfall patterns, and spatial dimensions to maximize visibility and accessibility.",
    step2Vol: "Step 02", step2Title: "Design & Fabrication", step2Desc: "Creating detailed 3D renders and manufacturing premium, durable components in our Bahrain production facility.",
    step3Vol: "Step 03", step3Title: "Overnight Installation", step3Desc: "Executing rapid, stealthy installations and technical rigging outside of mall operating hours for zero disruption.",

    archiveTitle: "Retail Archive",
    selectDeps: "Select Deployments // GCC Malls",
    caseStudy: "Retail Case Study",
    archiveIndex: "Archive 0",

    ctaTitle: "Ready to occupy the floor?",
    ctaBtn: "Return to Home"
};

const TEXT_AR = {
    return: "عودة",
    mainGrid: "الرئيسية",
    langToggle: "EN",
    title: "الأكشاك",
    subtitle: "قسم الوكالة // متاجر التجزئة المؤقتة",
    fabricationHq: "التنفيذ في التجزئة",
    heroDesc: "السيطرة على مساحات التجزئة المتميزة في جميع أنحاء المملكة. نحن نحول الإقبال الكثيف إلى تفاعل ملموس للعلامة التجارية.",
    philosophy: "فلسفتنا",
    overview: "نقوم بتصميم وتصنيع أكشاك التجزئة والمتاجر المؤقتة عالية الإقبال. موضوعة في وجهات رئيسية مثل الأفنيوز، مراسي جاليريا، ومودا مول، تم هندسة هياكلنا لزيادة رؤية العلامة التجارية وتفاعل المستهلكين والعائد التجاري.",

    stat1Label: "تنشيط التجزئة", stat1Value: "+300",
    stat2Label: "تفاعل الزوار", stat2Value: "الحد الأقصى",
    stat3Label: "رضا العملاء", stat3Value: "100%",

    coreCompetencies: "الكفاءات الأساسية",
    structEng: "البنية التحتية للتجزئة",
    structEngDesc: "مصممة للبيئات عالية الإقبال والنشر السريع.",

    cap1Title: "متاجر مؤقتة للعلامات", cap1Desc: "مساحات تجزئة مؤقتة غامرة مصممة لإطلاق المنتجات ودفع عمل المستهلك الفوري.",
    cap2Title: "أكشاك دائمة", cap2Desc: "هياكل تجزئة متينة بزاوية 360 درجة مصممة لممرات المجمعات التجارية المزدحمة والاستخدام طويل الأمد.",
    cap3Title: "مناطق تجريبية", cap3Desc: "مناطق تنشيط تفاعلية تتميز بنقاط اتصال رقمية وألعاب وجماليات جاهزة للتصوير.",
    cap4Title: "منافذ الأطعمة والمشروبات", cap4Desc: "أكشاك أطعمة ومشروبات مدمجة وعملية بالكامل متوافقة مع لوائح السلامة والصحة الصارمة في المجمعات التجارية.",

    methodology: "المنهجية",
    builtPrecision: "السرعة والسرية.",
    methodDesc: "نتعامل مع لوائح المجمعات التجارية المعقدة بسهولة. تضمن عمليتنا نشراً سريعاً طوال الليل دون تعطيل العمليات العامة.",

    step1Vol: "خطوة 01", step1Title: "تحليل حركة المرور والتدفق", step1Desc: "تقييم إرشادات المجمع وأنماط الإقبال والأبعاد المكانية لزيادة الرؤية وسهولة الوصول.",
    step2Vol: "خطوة 02", step2Title: "التصميم والتصنيع", step2Desc: "إنشاء عروض ثلاثية الأبعاد مفصلة وتصنيع مكونات ممتازة ومتينة في منشأة الإنتاج الخاصة بنا في البحرين.",
    step3Vol: "خطوة 03", step3Title: "التركيب الليلي", step3Desc: "تنفيذ تركيبات وتجهيزات فنية سريعة وسرية خارج ساعات عمل المجمع التجاري لضمان عدم الانقطاع.",

    archiveTitle: "أرشيف التجزئة",
    selectDeps: "تطبيقات مختارة // مجمعات الخليج",
    caseStudy: "دراسة حالة للتجزئة",
    archiveIndex: "أرشيف 0",

    ctaTitle: "هل أنت مستعد لشغل المساحة؟",
    ctaBtn: "العودة للرئيسية"
};

const THEME_COLOR = "#10B981"; // Neon Emerald
const HERO_IMAGE = "/insta/mallkioski.jpeg";

const CAPABILITIES_ICONS = [ShoppingBag, MapPin, Sparkles, Coffee];

const CAPABILITIES_IMAGES = [
    "/insta/image5.png",
    "/insta/image6.png",
    "/insta/image7.png",
    "/insta/image8.png"
];

/* ------------------------------------------------------------------
   ARCHIVE SOURCES
   Paths are encoded at render time (spaces -> %20).
------------------------------------------------------------------- */

// --- /public/KIOSK ---
// NOTE: the three WhatsApp filenames were truncated in the folder view.
// Verify these against `ls public/KIOSK` and correct the dates if needed.
const KIOSK_IMAGES: string[] = [
    "/KIOSK/BATEEL KIOSK AT CITY CENTER 2025.jpg"
    
];

// --- /public/EXHIBITION ---
const EXHIBITION_IMAGES: string[] = [
    "/EXHIBITION/01.jpg",
    "/EXHIBITION/011.jpg",
    "/EXHIBITION/AL JIWAN JEWELLERY 01.JPG",

    "/EXHIBITION/AMG STAND AT MARASSI 2025/AMG STAND AT MARASSI GALLERIA 01.jpeg",
    "/EXHIBITION/AMG STAND AT MARASSI 2025/AMG STAND AT MARASSI GALLERIA 03.jpeg",
    "/EXHIBITION/AMG STAND AT MARASSI 2025/AMG STAND AT MARASSI GALLERIA 07.jpeg",

    "/EXHIBITION/AVENUES RAMADAN STAND 2025.jpg",

    "/EXHIBITION/BACK TO SCHOOL  2025/MARASSI GALLERIA MALL BACK TO SCHOOL 02.jpg",
    "/EXHIBITION/BACK TO SCHOOL  2025/MARASSI GALLERIA MALL BACK TO SCHOOL 04.jpg",
    "/EXHIBITION/BACK TO SCHOOL  2025/MARASSI GALLERIA MALL BACK TO SCHOOL 06.jpg",
    "/EXHIBITION/BACK TO SCHOOL  2025/MARASSI GALLERIA MALL BACK TO SCHOOL 07.jpg",
    "/EXHIBITION/BACK TO SCHOOL  2025/MARASSI GALLERIA MALL BACK TO SCHOOL 08.jpg",
    "/EXHIBITION/BACK TO SCHOOL  2025/MARASSI GALLERIA MALL BACK TO SCHOOL 15.jpg",
    "/EXHIBITION/BACK TO SCHOOL  2025/MARASSI GALLERIA MALL BACK TO SCHOOL 066.jpg",

    "/EXHIBITION/BAHRAIN MARINA 2025/BAHRAIN MARINA 01.jpg",
    "/EXHIBITION/BAHRAIN MARINA 2025/BAHRAIN MARINA 05.jpg",
    "/EXHIBITION/BAHRAIN MARINA 2025/BAHRAIN MARINA 06.jpg",

    "/EXHIBITION/BAHRAIN MARINA AT AVENUES 2025/BAHRAIN MARINA AT AVENUES 2.jpg",
    "/EXHIBITION/BAHRAIN MARINA AT AVENUES 2025/BAHRAIN MARINA AT AVENUES 4.jpg",
    "/EXHIBITION/BAHRAIN MARINA AT AVENUES 2025/BAHRAIN MARINA AT AVENUES 9.jpg",

    "/EXHIBITION/BESTUNE STAND AT CITY CENTER 2025.jpg",

    "/EXHIBITION/BINAA STAND AT CITY CENTER 2025/BINAA STAND AT CITY CENTER 02.jpg",
    "/EXHIBITION/BINAA STAND AT CITY CENTER 2025/BINAA STAND AT CITY CENTER 06.jpg",

    "/EXHIBITION/EDAMAH 2025/EDAMAH 01.jpg",
    "/EXHIBITION/EDAMAH 2025/EDAMAH 02.jpg",
    "/EXHIBITION/EDAMAH 2025/EDAMAH 07.jpg",
    "/EXHIBITION/EDAMAH 2025/EDAMAH 11.jpg",
    "/EXHIBITION/EDAMAH 2025/EDAMAH 13.jpg",
    "/EXHIBITION/EDAMAH 2025/EDAMAH 15.jpg",
    "/EXHIBITION/EDAMAH 2025/EDAMAH 17.jpg",
    "/EXHIBITION/EDAMAH 2025/EDAMAH 18.jpg",
    "/EXHIBITION/EDAMAH 2025/EDAMAH 19.jpg",

    "/EXHIBITION/F1 STAND @ CITY CENTER 2025/F1 STAND AT CITY CENTER 3.jpg",
    "/EXHIBITION/F1 STAND @ CITY CENTER 2025/F1 STAND AT CITY CENTER 6.jpg",
    "/EXHIBITION/F1 STAND @ CITY CENTER 2025/F1 STAND AT CITY CENTER 12.jpg",
    "/EXHIBITION/F1 STAND @ CITY CENTER 2025/F1 STAND AT CITY CENTER 20.jpg",

    "/EXHIBITION/F1 STAND AT GULF AIR OFFICE - 2025.jpg",
    "/EXHIBITION/F1 STAND AT MARASSI - 2025.jpg",

    "/EXHIBITION/LOVE YOUR SKIN AT AVENUES 2025/LOVE YOUR SKIN AT AVENUES 40.jpg",
    "/EXHIBITION/LOVE YOUR SKIN AT AVENUES 2025/LOVE YOUR SKIN AT AVENUES 45.jpg",
    "/EXHIBITION/LOVE YOUR SKIN AT AVENUES 2025/LOVE YOUR SKIN AT AVENUES 64.jpg",
    "/EXHIBITION/LOVE YOUR SKIN AT AVENUES 2025/LOVE YOUR SKIN AT AVENUES 67.jpg",
    "/EXHIBITION/LOVE YOUR SKIN AT AVENUES 2025/LOVE YOUR SKIN AT AVENUES 69.jpg",

    "/EXHIBITION/MARASSI GALLERIA SUPER HERO TRAINING CAMP/MARASSI GALLERIA SUPER HERO TRAINING CAMP 6.jpg",
    "/EXHIBITION/MARASSI GALLERIA SUPER HERO TRAINING CAMP/MARASSI GALLERIA SUPER HERO TRAINING CAMP 16.jpg",
    "/EXHIBITION/MARASSI GALLERIA SUPER HERO TRAINING CAMP/MARASSI GALLERIA SUPER HERO TRAINING CAMP 37.jpg",

    "/EXHIBITION/MASSOUD JEWELLERY ARABIA 2025/MASSOUD JEWELLERY 04.JPG",
    "/EXHIBITION/MASSOUD JEWELLERY ARABIA 2025/MASSOUD JEWELLERY 06.JPG",

    "/EXHIBITION/MODA MALL SHOP AND WIN 12.jpg",

    "/EXHIBITION/The Avenues Winter Fest 2024/The Avenues Winter Fest 01.jpg",
    "/EXHIBITION/The Avenues Winter Fest 2024/The Avenues Winter Fest 03.jpg",
    "/EXHIBITION/The Avenues Winter Fest 2024/The Avenues Winter Fest 07.jpg",
    "/EXHIBITION/The Avenues Winter Fest 2024/The Avenues Winter Fest 08.jpg",
    "/EXHIBITION/The Avenues Winter Fest 2024/The Avenues Winter Fest 24.jpg",

    "/EXHIBITION/TOYOTA LAND CRUISER STAND SITRA 2025/TOYOTA LAND CRUISER STAND SITRA 2.jpg",
    "/EXHIBITION/TOYOTA LAND CRUISER STAND SITRA 2025/TOYOTA LAND CRUISER STAND SITRA 4.jpg",
    "/EXHIBITION/TOYOTA LAND CRUISER STAND SITRA 2025/TOYOTA LAND CRUISER STAND SITRA 5.jpg",

    "/EXHIBITION/TOYOTA RAMADAN16.jpg"
];

// --- /public/Events ---
const EVENTS_IMAGES: string[] = [
    "/Events/BANK ABC GHABGA AT GULF HOTEL 2025/BANK ABC GHABGA AT GULF HOTEL 2.jpg",
    "/Events/BANK ABC GHABGA AT GULF HOTEL 2025/BANK ABC GHABGA AT GULF HOTEL 16.jpg",
    "/Events/BANK ABC GHABGA AT GULF HOTEL 2025/BANK ABC GHABGA AT GULF HOTEL 19.jpg",
    "/Events/BANK ABC GHABGA AT GULF HOTEL 2025/BANK ABC GHABGA AT GULF HOTEL 25.jpg",
    "/Events/BANK ABC GHABGA AT GULF HOTEL 2025/BANK ABC GHABGA AT GULF HOTEL 27.jpg",

    "/Events/F1 2025 - EDB PADDOCK LOUNGE/ECONOMIC DEVELOPMENT BOARD  PADDOCK CLUB 3.jpg",
    "/Events/F1 2025 - EDB PADDOCK LOUNGE/ECONOMIC DEVELOPMENT BOARD  PADDOCK CLUB 34.jpg",
    "/Events/F1 2025 - EDB PADDOCK LOUNGE/ECONOMIC DEVELOPMENT BOARD  PADDOCK CLUB 49.jpg",

    "/Events/F1 2025 - GULF AIR/GULF AIR PADDOCK CLUB 12.jpg",
    "/Events/F1 2025 - GULF AIR/GULF AIR PADDOCK CLUB 32.jpg",
    "/Events/F1 2025 - GULF AIR/GULF AIR PADDOCK CLUB 35.jpg",
    "/Events/F1 2025 - GULF AIR/GULF AIR PADDOCK CLUB 46.jpg",
    "/Events/F1 2025 - GULF AIR/GULF AIR PADDOCK CLUB 68.jpg",

    "/Events/F1 PRE SEASON TESTING 2025/F1 PRE - SEASON TESTING 20.jpg",
    "/Events/F1 PRE SEASON TESTING 2025/F1 PRE - SEASON TESTING 54.jpg",
    "/Events/F1 PRE SEASON TESTING 2025/F1 PRE - SEASON TESTING 57.jpg",
    "/Events/F1 PRE SEASON TESTING 2025/F1 PRE - SEASON TESTING 60.jpg",
    "/Events/F1 PRE SEASON TESTING 2025/F1 PRE - SEASON TESTING 62.jpg",

    "/Events/FINTECH 2025/_HUS1999.JPG",
    "/Events/FINTECH 2025/_HUS2737.JPG",
    "/Events/FINTECH 2025/2J5A0953.JPG",
    "/Events/FINTECH 2025/2J5A0954.JPG",
    "/Events/FINTECH 2025/2J5A0955.JPG",
    "/Events/FINTECH 2025/2J5A0956.JPG",
    "/Events/FINTECH 2025/3N5A0017.JPG",
    "/Events/FINTECH 2025/3N5A0018.JPG",

    "/Events/JOTUN EVENT AT LA FONTAINE/JOTUN EVENT AT LA FONTAINE 1.jpg",
    "/Events/JOTUN EVENT AT LA FONTAINE/JOTUN EVENT AT LA FONTAINE 2.jpg",
    "/Events/JOTUN EVENT AT LA FONTAINE/JOTUN EVENT AT LA FONTAINE 3.jpg",
    "/Events/JOTUN EVENT AT LA FONTAINE/JOTUN EVENT AT LA FONTAINE 17.jpg",
    "/Events/JOTUN EVENT AT LA FONTAINE/JOTUN EVENT AT LA FONTAINE 32.jpg",
    "/Events/JOTUN EVENT AT LA FONTAINE/JOTUN EVENT AT LA FONTAINE 50.jpg",
    "/Events/JOTUN EVENT AT LA FONTAINE/JOTUN EVENT AT LA FONTAINE 55.jpg",

    "/Events/RIFFA VIEW SCHOOL EVENT AT NATIONAL THEATRE 2025/RIFFA VIEW SCHOOL EVENT AT NATIONAL THEATRE 1.jpg",
    "/Events/RIFFA VIEW SCHOOL EVENT AT NATIONAL THEATRE 2025/RIFFA VIEW SCHOOL EVENT AT NATIONAL THEATRE 4.jpg",
    "/Events/RIFFA VIEW SCHOOL EVENT AT NATIONAL THEATRE 2025/RIFFA VIEW SCHOOL EVENT AT NATIONAL THEATRE 6.jpg",
    "/Events/RIFFA VIEW SCHOOL EVENT AT NATIONAL THEATRE 2025/RIFFA VIEW SCHOOL EVENT AT NATIONAL THEATRE 8.jpg",
    "/Events/RIFFA VIEW SCHOOL EVENT AT NATIONAL THEATRE 2025/RIFFA VIEW SCHOOL EVENT AT NATIONAL THEATRE 9.jpg",

    "/Events/TAMKEEN MASHROO3i EVENT AT EWB/TAMKEEN MASHROO3i EVENT AT EWB 1.jpg",
    "/Events/TAMKEEN MASHROO3i EVENT AT EWB/TAMKEEN MASHROO3i EVENT AT EWB 2.jpg",
    "/Events/TAMKEEN MASHROO3i EVENT AT EWB/TAMKEEN MASHROO3i EVENT AT EWB 42.jpg",
    "/Events/TAMKEEN MASHROO3i EVENT AT EWB/TAMKEEN MASHROO3i EVENT AT EWB 59.jpg",
    "/Events/TAMKEEN MASHROO3i EVENT AT EWB/TAMKEEN MASHROO3i EVENT AT EWB 73.jpg",
    "/Events/TAMKEEN MASHROO3i EVENT AT EWB/TAMKEEN MASHROO3i EVENT AT EWB 75.jpg",
    "/Events/TAMKEEN MASHROO3i EVENT AT EWB/TAMKEEN MASHROO3i EVENT AT EWB 78.jpg"
];

const GALLERY_IMAGES: string[] = [
    ...KIOSK_IMAGES,
    ...EXHIBITION_IMAGES,
    ...EVENTS_IMAGES
];

// Encode spaces and special characters, keep the "/" separators intact
const enc = (p: string) => p.split("/").map(encodeURIComponent).join("/");

// How many images render on first paint, and per "load more" batch
const BATCH_SIZE = 12;

// Animation Variants
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } }
};

// Context for App-wide Language State
const LangContext = createContext({ isAr: false, toggleLang: () => {}, t: TEXT_EN });

export default function KiosksPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(true);
    const [isAr, setIsAr] = useState(false);

    // Gallery: progressive rendering + fullscreen viewer
    const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const toggleLang = () => setIsAr(!isAr);
    const t = isAr ? TEXT_AR : TEXT_EN;

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Reveal the next batch of images as the sentinel scrolls into view
    useEffect(() => {
        const node = sentinelRef.current;
        if (!node) return;
        if (visibleCount >= GALLERY_IMAGES.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    setVisibleCount((c) => Math.min(c + BATCH_SIZE, GALLERY_IMAGES.length));
                }
            },
            { root: containerRef.current, rootMargin: "600px 0px" }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [visibleCount]);

    // Lightbox navigation
    const closeLightbox = useCallback(() => setLightboxIndex(null), []);
    const showPrev = useCallback(
        () => setLightboxIndex((i) => (i === null ? i : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)),
        []
    );
    const showNext = useCallback(
        () => setLightboxIndex((i) => (i === null ? i : (i + 1) % GALLERY_IMAGES.length)),
        []
    );

    // Keyboard controls + scroll lock while fullscreen is open
    useEffect(() => {
        if (lightboxIndex === null) return;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeLightbox();
            else if (e.key === "ArrowLeft") (isAr ? showNext : showPrev)();
            else if (e.key === "ArrowRight") (isAr ? showPrev : showNext)();
        };

        window.addEventListener("keydown", onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [lightboxIndex, isAr, closeLightbox, showPrev, showNext]);

    // Swipe support on touch devices
    const touchStartX = useRef<number | null>(null);
    const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > 60) {
            if (delta < 0) (isAr ? showPrev : showNext)();
            else (isAr ? showNext : showPrev)();
        }
        touchStartX.current = null;
    };

    // Smooth Scroll Parallax
    const { scrollYProgress } = useScroll({
        container: containerRef,
        offset: ["start start", "end end"]
    });

    const yHero = useTransform(scrollYProgress, [0, 0.5], ["0%", isMobile ? "15%" : "30%"]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    return (
        <LangContext.Provider value={{ isAr, toggleLang, t }}>
        <main ref={containerRef} className={`bg-[#050505] h-screen w-full text-white font-sans selection:bg-emerald-500/30 overflow-y-auto overflow-x-hidden relative scroll-smooth custom-scrollbar ${isAr ? 'dir-rtl' : 'dir-ltr'}`} dir={isAr ? "rtl" : "ltr"}>

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
                   <button onClick={toggleLang} className="flex items-center gap-2 text-white/60 hover:text-emerald-400 transition-colors group">
    <Globe size={14} className="md:w-4 md:h-4 group-hover:text-emerald-400 transition-colors" />
    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest mt-[1px]">(ENGLISH/ARABIC)</span>
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
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">{t.fabricationHq}</span>
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
                            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-white drop-shadow-md">{t.structEng}</h2>
                        </div>
                        <p className={`text-xs font-mono text-white/50 uppercase tracking-widest max-w-xs md:text-right ${isAr ? 'md:text-left' : 'md:text-right'}`}>
                            {t.structEngDesc}
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
                            {t.builtPrecision}
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

                    {/* Responsive masonry — 1 / 2 / 3 / 4 columns */}
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 md:gap-5 [column-fill:_balance]">
                        {GALLERY_IMAGES.slice(0, visibleCount).map((src, i) => (
                            <motion.button
                                key={src}
                                type="button"
                                onClick={() => setLightboxIndex(i)}
                                initial={{ opacity: 0, scale: 0.97 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="group relative block w-full mb-3 md:mb-5 break-inside-avoid overflow-hidden rounded-xl border border-white/10 bg-[#050505] cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                                aria-label={`${t.caseStudy} ${i + 1}`}
                            >
                                <Image
                                    src={enc(src)}
                                    alt={`Kiosk ${i + 1}`}
                                    width={1600}
                                    height={1067}
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                    loading={i < 4 ? "eager" : "lazy"}
                                    className="w-full h-auto object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04] will-change-transform opacity-85 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className={`absolute bottom-4 ${isAr ? 'left-4' : 'right-4'} w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-xl`}>
                                    <ArrowUpRight size={16} strokeWidth={2} className={isAr ? '-rotate-90' : ''} />
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    {/* Infinite-scroll sentinel */}
                    {visibleCount < GALLERY_IMAGES.length && (
                        <div ref={sentinelRef} className="flex flex-col items-center justify-center gap-4 pt-16">
                            <Loader2 size={18} className="animate-spin text-white/40" />
                            <button
                                type="button"
                                onClick={() => setVisibleCount((c) => Math.min(c + BATCH_SIZE, GALLERY_IMAGES.length))}
                                className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50 hover:text-white transition-colors"
                            >
                                {visibleCount} / {GALLERY_IMAGES.length}
                            </button>
                        </div>
                    )}
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

            {/* 8. FULLSCREEN VIEWER */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        key="lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
                        role="dialog"
                        aria-modal="true"
                        onClick={closeLightbox}
                        onTouchStart={onTouchStart}
                        onTouchEnd={onTouchEnd}
                        dir="ltr"
                    >
                        {/* Close */}
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                            className="absolute top-5 right-5 md:top-8 md:right-8 z-20 w-11 h-11 rounded-full border border-white/20 bg-black/40 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                            aria-label="Close"
                        >
                            <X size={18} strokeWidth={1.5} />
                        </button>

                        {/* Counter */}
                        <span className="absolute top-7 left-5 md:top-10 md:left-8 z-20 text-[10px] font-mono tracking-[0.3em] text-white/50">
                            {String(lightboxIndex + 1).padStart(2, "0")} / {GALLERY_IMAGES.length}
                        </span>

                        {/* Prev */}
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); showPrev(); }}
                            className="absolute left-3 md:left-8 z-20 w-11 h-11 md:w-14 md:h-14 rounded-full border border-white/20 bg-black/40 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={20} strokeWidth={1.5} />
                        </button>

                        {/* Next */}
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); showNext(); }}
                            className="absolute right-3 md:right-8 z-20 w-11 h-11 md:w-14 md:h-14 rounded-full border border-white/20 bg-black/40 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                            aria-label="Next image"
                        >
                            <ChevronRight size={20} strokeWidth={1.5} />
                        </button>

                        {/* Image */}
                        <motion.div
                            key={GALLERY_IMAGES[lightboxIndex]}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-full h-full px-14 py-16 md:px-24 md:py-20"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={enc(GALLERY_IMAGES[lightboxIndex])}
                                alt={`Kiosk ${lightboxIndex + 1}`}
                                fill
                                sizes="100vw"
                                priority
                                className="object-contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </main>
        </LangContext.Provider>
    );
}