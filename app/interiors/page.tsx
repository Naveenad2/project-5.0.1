"use client";

import { useRef, useState, useEffect, createContext, useContext } from "react";
import {
    motion,
    useScroll,
    useTransform,
    AnimatePresence
} from "framer-motion";
import {
    ArrowLeft, LayoutGrid,
    Globe, Compass, Asterisk, Sofa, Store, Briefcase, Coffee,
    Loader2, Plus, Instagram
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { ColoursLogoHeader } from "@/components/ui/ColoursLogoHeader";

// --- BILINGUAL DICTIONARY (Content sourced verbatim from brand document) ---
const TEXT_EN = {
    return: "Return",
    mainGrid: "Main Home",
    langToggle: "عربي",
    title: "INTERIORS",
    subtitle: "Designing Spaces That Shape Experiences.",
    spatialEng: "Spatial Intelligence. Crafted with Precision.",
    heroDesc: "At Colours, interiors are more than finished environments — they are strategic assets designed to influence how people work, interact, engage, and experience a brand.",
    philosophy: "Our Philosophy",
    overview: "We deliver premium commercial fit-out and interior solutions across the GCC and international markets, transforming architectural vision into meticulously executed realities. Every space we create balances aesthetics, functionality, and purpose, ensuring that form and performance exist in perfect harmony.",

    philTitle: "Where Architecture Meets Experience.",
    philText: "The most successful spaces are not simply occupied — they are experienced. We believe exceptional interiors have the power to influence behavior, elevate perception, and create meaningful connections between people and the environments they inhabit. Whether a flagship retail destination, a hospitality venue, or a corporate headquarters, every project begins with a deep understanding of purpose and ends with flawless execution.",
    philNote: "Our approach combines planning, engineering precision, and exceptional craftsmanship to transform empty spaces into environments that inspire, perform, and endure.",

    coreCompetencies: "Interior Design & Fit-Out Solutions",
    spatialArch: "Crafted for Impact.",
    spatialArchDesc: "With a fully integrated delivery model, we manage every stage of the fit-out journey — from concept development and technical coordination to manufacturing, installation, and final handover.",

    cap1Title: "Retail Environments", cap1Desc: "Immersive retail destinations designed to enhance customer engagement, strengthen brand identity, and maximize commercial performance through thoughtful spatial experiences.",
    cap2Title: "Hospitality & F&B Spaces", cap2Desc: "Restaurants, cafés, lounges, and hospitality venues engineered to balance operational efficiency with atmosphere, creating environments that leave lasting impressions on every guest.",
    cap3Title: "Corporate Workplaces", cap3Desc: "Modern workspaces designed to inspire productivity, encourage collaboration, and reflect organizational culture through intelligent planning and refined execution.",
    cap4Title: "Commercial & Public Spaces", cap4Desc: "High-visibility environments developed for long-term performance, combining durability, functionality, and contemporary design across a wide range of commercial applications.",

    methodology: "The Art of Delivery",
    builtToLast: "Engineered, Not Decorated.",
    methodDesc: "Exceptional interiors are not decorated. They are engineered. Every project follows a disciplined methodology that integrates creative thinking, technical expertise, and construction excellence to ensure seamless delivery from concept to completion.",

    step1Vol: "01", step1Title: "Spatial Planning & Technical Integration", step1Desc: "Our process begins with strategic space planning, workflow analysis, engineering coordination, and advanced 3D visualization. Every detail is considered to optimize functionality, aesthetics, and long-term performance.",
    step2Vol: "02", step2Title: "Craftsmanship & Manufacturing", step2Desc: "Through our in-house production capabilities, we fabricate bespoke joinery, specialist metalwork, architectural features, and custom finishes that bring design concepts to life with exceptional precision.",
    step3Vol: "03", step3Title: "Turnkey Execution & Handover", step3Desc: "From site preparation and construction management to quality assurance and final commissioning, our teams oversee every aspect of delivery to ensure a seamless transition from vision to operational reality.",

    archiveTitle: "A Portfolio of Transformations.",
    selectDeps: "Curated Spaces",
    archiveDesc: "Each project represents a unique convergence of design, engineering, craftsmanship, and strategic thinking — creating environments that perform as beautifully as they appear.",
    caseStudy: "Interior Case Study",
    archiveIndex: "Archive 0",

    ctaTitle: "Ready to Transform Your Environment?",
    ctaDesc: "Whether you are creating a flagship retail destination, a premium hospitality venue, or a next-generation workplace, our team is ready to bring your vision to life with precision, creativity, and uncompromising quality. Let’s create a space that inspires long after the doors open.",
    ctaBtn: "Return to Home",

    // Gallery (matches Our Work page)
    filterLabel: "Interiors",
    viewInsta: "View on Instagram",
    showing: "Showing",
    of: "of",
    loadMore: "Load More",
    loadingMore: "Loading",
    allLoaded: "You've reached the end",
    projects: "Projects",
};

const TEXT_AR = {
    return: "عودة",
    mainGrid: "الرئيسية",
    langToggle: "EN",
    title: "التصميم الداخلي",
    subtitle: "تصميم مساحات تشكّل التجارب.",
    spatialEng: "ذكاء مكاني. مصاغ بدقة.",
    heroDesc: "في كلرز، التصميم الداخلي أكثر من مجرد بيئات منتهية — إنها أصول استراتيجية مصممة للتأثير على كيفية عمل الناس وتفاعلهم وانخراطهم وتجربتهم للعلامة التجارية.",
    philosophy: "فلسفتنا",
    overview: "نقدم حلول تجهيز وتصميم داخلي تجاري راقية في جميع أنحاء دول الخليج والأسواق الدولية، محوّلين الرؤية المعمارية إلى حقائق منفذة بدقة متناهية. كل مساحة نبتكرها توازن بين الجماليات والوظيفة والغاية، لتضمن وجود الشكل والأداء في تناغم تام.",

    philTitle: "حيث تلتقي العمارة بالتجربة.",
    philText: "أنجح المساحات لا تُشغَل فحسب — بل تُختبَر. نؤمن بأن التصميم الداخلي الاستثنائي يملك القدرة على التأثير في السلوك، والارتقاء بالإدراك، وخلق روابط هادفة بين الناس والبيئات التي يعيشون فيها. سواء كانت وجهة تجزئة رئيسية، أو مكان ضيافة، أو مقرًا رئيسيًا لشركة، يبدأ كل مشروع بفهم عميق للغاية وينتهي بتنفيذ خالٍ من العيوب.",
    philNote: "يجمع نهجنا بين التخطيط والدقة الهندسية والحرفية الاستثنائية لتحويل المساحات الفارغة إلى بيئات تُلهم وتؤدي وتدوم.",

    coreCompetencies: "حلول التصميم الداخلي والتجهيز",
    spatialArch: "مصاغ لإحداث الأثر.",
    spatialArchDesc: "بنموذج تسليم متكامل بالكامل، ندير كل مرحلة من رحلة التجهيز — من تطوير المفهوم والتنسيق التقني إلى التصنيع والتركيب والتسليم النهائي.",

    cap1Title: "بيئات التجزئة", cap1Desc: "وجهات تجزئة غامرة مصممة لتعزيز تفاعل العملاء، وتقوية هوية العلامة التجارية، وتعظيم الأداء التجاري من خلال تجارب مكانية مدروسة.",
    cap2Title: "أماكن الضيافة والأطعمة والمشروبات", cap2Desc: "مطاعم ومقاهٍ وصالات وأماكن ضيافة مصممة للموازنة بين الكفاءة التشغيلية والأجواء، لخلق بيئات تترك انطباعات دائمة لدى كل ضيف.",
    cap3Title: "أماكن عمل الشركات", cap3Desc: "مساحات عمل حديثة مصممة لإلهام الإنتاجية، وتشجيع التعاون، وعكس ثقافة المؤسسة من خلال تخطيط ذكي وتنفيذ راقٍ.",
    cap4Title: "المساحات التجارية والعامة", cap4Desc: "بيئات عالية الظهور مطوّرة للأداء طويل الأمد، تجمع بين المتانة والوظيفة والتصميم المعاصر عبر مجموعة واسعة من التطبيقات التجارية.",

    methodology: "فن التسليم",
    builtToLast: "مُهندَسة، لا مُزخرَفة.",
    methodDesc: "التصميمات الداخلية الاستثنائية لا تُزخرَف. بل تُهندَس. يتبع كل مشروع منهجية منضبطة تدمج التفكير الإبداعي والخبرة التقنية والتميز الإنشائي لضمان تسليم سلس من الفكرة إلى الاكتمال.",

    step1Vol: "01", step1Title: "التخطيط المكاني والتكامل التقني", step1Desc: "تبدأ عمليتنا بالتخطيط الاستراتيجي للمساحة، وتحليل سير العمل، والتنسيق الهندسي، والتصور ثلاثي الأبعاد المتقدم. تُراعى كل التفاصيل لتحسين الوظيفة والجماليات والأداء طويل الأمد.",
    step2Vol: "02", step2Title: "الحرفية والتصنيع", step2Desc: "من خلال قدرات الإنتاج الداخلي لدينا، نصنّع أعمال النجارة المخصصة، والأعمال المعدنية المتخصصة، والعناصر المعمارية، والتشطيبات المخصصة التي تجسّد مفاهيم التصميم بدقة استثنائية.",
    step3Vol: "03", step3Title: "تنفيذ تسليم المفتاح والتسليم", step3Desc: "من تجهيز الموقع وإدارة البناء إلى ضمان الجودة والتشغيل النهائي، تشرف فرقنا على كل جانب من جوانب التسليم لضمان انتقال سلس من الرؤية إلى الواقع التشغيلي.",

    archiveTitle: "محفظة من التحولات.",
    selectDeps: "مساحات منسقة",
    archiveDesc: "يمثل كل مشروع التقاءً فريدًا للتصميم والهندسة والحرفية والتفكير الاستراتيجي — لخلق بيئات تؤدي بنفس جمال مظهرها.",
    caseStudy: "دراسة حالة داخلية",
    archiveIndex: "أرشيف",

    ctaTitle: "مستعد لتحويل بيئتك؟",
    ctaDesc: "سواء كنت تنشئ وجهة تجزئة رئيسية، أو مكان ضيافة راقٍ، أو مكان عمل من الجيل القادم، فإن فريقنا مستعد لتحويل رؤيتك إلى واقع بدقة وإبداع وجودة لا تقبل المساومة. لنصنع مساحة تُلهم طويلًا بعد أن تُفتح الأبواب.",
    ctaBtn: "العودة للرئيسية",

    // Gallery (matches Our Work page)
    filterLabel: "التصميم الداخلي",
    viewInsta: "عرض على إنستغرام",
    showing: "عرض",
    of: "من",
    loadMore: "تحميل المزيد",
    loadingMore: "جاري التحميل",
    allLoaded: "لقد وصلت إلى النهاية",
    projects: "مشروع",
};

const THEME_COLOR = "#3B82F6"; // Electric Blue
const HERO_IMAGE = "/insta/interiors.jpeg";

const CAPABILITIES_IMAGES = [
    "/insta/in1.jpeg",
    "/insta/in2.jpeg",
    "/insta/in3.jpeg",
];

// Encode spaces and special characters, keep the "/" separators intact
const enc = (p: string) => p.split("/").map(encodeURIComponent).join("/");

// --- SEO: Structured data (JSON-LD) ---
const STRUCTURED_DATA = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Interior Design & Fit-Out Solutions",
    provider: {
        "@type": "Organization",
        name: "Colours Bahrain",
        url: "https://coloursbahrain.com",
        areaServed: ["Bahrain", "GCC", "Worldwide"]
    },
    description:
        "Colours delivers premium commercial fit-out and interior solutions across the GCC and international markets, transforming architectural vision into meticulously executed realities.",
    hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Interior Design & Fit-Out Solutions",
        itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Retail Environments" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hospitality & F&B Spaces" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Corporate Workplaces" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial & Public Spaces" } }
        ]
    }
};

// Animation Variants
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } }
};

// Custom smooth easing curve (matches Our Work gallery)
const customEase = [0.22, 1, 0.36, 1] as const;

const PAGE_SIZE = 10; // how many tiles are visible per "page"

/* ------------------------------------------------------------------
   GALLERY DATA — copied 1:1 from the "Our Work" page's Interiors
   category (INTERIOR_ITEMS + buildProjects), so titles / Arabic
   titles / Instagram links / image paths all match exactly.
   Image path pattern: /int/inn{n}.png  (folder "int", prefix "inn")
------------------------------------------------------------------- */

interface SourceItem {
    url: string;
    title?: string;
    titleAr?: string;
}

interface Project {
    id: number;
    title: string;
    titleAr: string;
    subtitle: string;
    subAr: string;
    img: string;
    href: string;
    code: string;
}

const INTERIOR_ITEMS: SourceItem[] = [
    { url: "https://www.instagram.com/p/DBJM70jsDah/?img_index=1", title: "GA-NSH (RP Group)", titleAr: "جي إيه-إن إس إتش (مجموعة RP)" },
    { url: "https://www.instagram.com/p/C9PAGPHMqay/?img_index=1", title: "Bestune Showroom", titleAr: "صالة عرض بيستون" },
    { url: "https://www.instagram.com/p/CyeBJDUMyzd/?img_index=1", title: "Toyota Gazoo Racing Merchandise", titleAr: "منتجات تويوتا غازو ريسينغ" },
    { url: "https://www.instagram.com/p/CyYoSkEsIVy/?img_index=1", title: "Al Haddad International Motors — Bestune", titleAr: "الحداد إنترناشونال موتورز — بيستون" },
    { url: "https://www.instagram.com/p/CiC5rPSMb4z/?img_index=1", title: "Blisslab by Nasser, Mall of Dilmunia", titleAr: "بليس لاب by ناصر في مول دلمونيا" },
    { url: "https://www.instagram.com/p/Cga9E5vjOZa/?img_index=1", title: "Blisslab by Nasser Pharmacy", titleAr: "بليس لاب — صيدلية ناصر" },
    { url: "https://www.instagram.com/p/CPPwpU7rFvZ/?img_index=1", title: "McDonald's Outlet, Askar", titleAr: "فرع ماكدونالدز في عسكر" },
    { url: "https://www.instagram.com/p/CKBXAoUsY4C/?img_index=1", title: "AVIS", titleAr: "أفيس" },
    { url: "https://www.instagram.com/p/CF_fjBpMv4I/?img_index=1", title: "YBA Kanoo Museum", titleAr: "متحف واي بي إيه كانو" },
    { url: "https://www.instagram.com/p/B2N3TMGFPxO/", title: "Meisei Fine Dining Restaurant", titleAr: "مطعم مايسي للمأكولات الفاخرة" },
    { url: "https://www.instagram.com/p/B13p4sehlua/", title: "LIV Lounge, Bahrain", titleAr: "صالة ليف في البحرين" },
    { url: "https://www.instagram.com/p/C99G_GSCl1J/?img_index=1", title: "Budweiser, Corona, Stella Artois & Peroni", titleAr: "بدفايزر، كورونا، ستيلا أرتوا وبيروني" },
];

function buildInteriorProjects(items: SourceItem[]): Project[] {
    return items.map((item, i) => {
        const n = i + 1;
        const num = String(n).padStart(2, "0");
        return {
            id: n,
            title: item.title ?? `Interiors ${num}`,
            titleAr: item.titleAr ?? `التصميم الداخلي ${num}`,
            subtitle: "Interior Fit-Out",
            subAr: "تجهيزات داخلية",
            img: `/int/inn${n}.png`,
            href: item.url,
            code: `IN-${num}`,
        };
    });
}

const INTERIOR_PROJECTS: Project[] = buildInteriorProjects(INTERIOR_ITEMS);

const META = {
    accent: "from-amber-400 to-amber-600",
    ring: "group-hover:shadow-amber-500/30",
};

// Context for App-wide Language State
const LangContext = createContext({ isAr: false, toggleLang: () => {}, t: TEXT_EN });

export default function InteriorsPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(true);
    const [isAr, setIsAr] = useState(() => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("colours_lang") === "ar";
    }
    return false;
});

    // Gallery: pagination (matches Our Work page)
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [loadingMore, setLoadingMore] = useState(false);

    const toggleLang = () => setIsAr((prev) => !prev);
    const t = isAr ? TEXT_AR : TEXT_EN;

    useEffect(() => {
        localStorage.setItem("colours_lang", isAr ? "ar" : "en");
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [isAr]);

    // SEO / accessibility: keep <html> lang & dir in sync with the active language
    useEffect(() => {
        if (typeof document !== "undefined") {
            document.documentElement.lang = isAr ? "ar" : "en";
            document.documentElement.dir = isAr ? "rtl" : "ltr";
        }
    }, [isAr]);

    const visibleProjects = INTERIOR_PROJECTS.slice(0, visibleCount);
    const hasMore = visibleCount < INTERIOR_PROJECTS.length;
    const remaining = INTERIOR_PROJECTS.length - visibleCount;

    const handleLoadMore = () => {
        if (loadingMore) return;
        setLoadingMore(true);
        window.setTimeout(() => {
            setVisibleCount((c) => Math.min(c + PAGE_SIZE, INTERIOR_PROJECTS.length));
            setLoadingMore(false);
        }, 450);
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
        {/* SEO: machine-readable structured data */}
        <Script
            id="colours-interiors-structured-data"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />

        <main ref={containerRef} className={`bg-[#050505] h-screen w-full text-white font-sans selection:bg-blue-500/30 overflow-y-auto overflow-x-hidden relative scroll-smooth custom-scrollbar ${isAr ? 'dir-rtl' : 'dir-ltr'}`} dir={isAr ? "rtl" : "ltr"} lang={isAr ? "ar" : "en"}>

            {/* 0. HIGHLY VISIBLE DOT GRID BACKGROUND */}
            <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
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
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-10 md:py-8 flex justify-between items-start pointer-events-none mix-blend-difference" aria-label={isAr ? "التنقل الرئيسي" : "Primary navigation"}>
                <Link href="/" className="pointer-events-auto group flex items-center gap-4 opacity-70 hover:opacity-100 transition-opacity" aria-label={`${t.return} — ${t.mainGrid}`}>
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 shadow-lg">
                        <ArrowLeft size={16} strokeWidth={1.5} className={isAr ? "rotate-180" : ""} aria-hidden="true" />
                    </div>
                    <div className="hidden sm:flex flex-col">
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] leading-none mb-1">{t.return}</span>
                        <span className="text-[8px] font-mono text-white/50 leading-none uppercase">{t.mainGrid}</span>
                    </div>
                </Link>

                <div className="pointer-events-auto flex items-center gap-4 md:gap-6">
                    {/* Arabic Toggle */}
                   <button onClick={toggleLang} className="flex items-center gap-2 text-white/60 hover:text-emerald-400 transition-colors group" aria-label={isAr ? "التبديل إلى الإنجليزية" : "Switch to Arabic"} aria-pressed={isAr}>
    <Globe size={14} className="md:w-4 md:h-4 group-hover:text-emerald-400 transition-colors" aria-hidden="true" />
    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest mt-[1px]">(ENGLISH/ARABIC)</span>
</button>

                    <div className="w-24 md:w-32 opacity-100 drop-shadow-2xl">
                        <ColoursLogoHeader className="w-full h-auto fill-white" aria-label="Colours Bahrain" />
                    </div>
                </div>
            </nav>

            {/* 2. CINEMATIC HERO */}
            <section className="relative h-[85svh] md:h-[100svh] w-full overflow-hidden flex items-end pb-12 md:pb-24 px-6 md:px-12 lg:px-24 shrink-0" aria-labelledby="interiors-hero-heading">

                {/* Parallax Image */}
                <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 z-0" aria-hidden="true">
                    <Image
                        src={HERO_IMAGE}
                        alt="Colours Bahrain — premium commercial interior fit-out"
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
                        <div className="flex items-start gap-4 mb-4 md:mb-6 max-w-2xl">
                            <Asterisk size={14} style={{ color: THEME_COLOR }} className="mt-1 shrink-0" aria-hidden="true" />
                            <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-[0.3em] md:tracking-[0.4em] leading-relaxed">
                                {t.subtitle}
                            </span>
                        </div>

                        {/* Massive Editorial Title */}
                        <h1 id="interiors-hero-heading" className="text-[11vw] md:text-[10vw] lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] text-white mix-blend-plus-lighter drop-shadow-2xl">
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
                                    <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: THEME_COLOR }} aria-hidden="true" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white leading-tight">{t.spatialEng}</span>
                                </div>
                                <Globe size={16} className="text-white/50 shrink-0" aria-hidden="true" />
                            </div>

                            <p className="text-[11px] text-white/80 leading-relaxed font-light">
                                {t.heroDesc}
                            </p>

                            <div className="flex items-center justify-between pt-2">
                                <div className={`flex overflow-hidden ${isAr ? '-space-x-reverse space-x-3' : '-space-x-3'}`} aria-hidden="true">
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

           
            {/* 4. IMAGE-BASED CAPABILITIES */}
             <section className="relative z-20 py-24 md:py-32 px-6 md:px-12 lg:px-24 shrink-0" aria-labelledby="competencies-heading">
                            <div className="max-w-[1800px] mx-auto">
                                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-12 mb-12 md:mb-16 gap-6">
                                    <div>
                                        <span id="competencies-heading" className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block" style={{ color: THEME_COLOR }}>{t.coreCompetencies}</span>
                                        <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-white drop-shadow-md">{t.spatialArch}</h2>
                                    </div>
                                    <p className={`text-xs font-light text-white/50 tracking-wide max-w-sm leading-relaxed ${isAr ? 'md:text-left' : 'md:text-right'}`}>
                                        {t.spatialArchDesc}
                                    </p>
                                </motion.div>
            
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                    {[
                                        { title: t.cap1Title, desc: t.cap1Desc, image: CAPABILITIES_IMAGES[0] },
                                        { title: t.cap2Title, desc: t.cap2Desc, image: CAPABILITIES_IMAGES[1] },
                                        { title: t.cap3Title, desc: t.cap3Desc, image: CAPABILITIES_IMAGES[2] }
                                    ].map((cap, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                            className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] min-h-[400px] flex flex-col justify-end"
                                        >
                                            {/* Background Image */}
                                            <div className="absolute inset-0 z-0">
                                                <Image
                                                    src={enc(cap.image)}
                                                    alt={`${cap.title} — Colours Bahrain exhibitions`}
                                                    fill
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    loading="lazy"
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-90"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                                            </div>
            
                                            {/* Content Overlay */}
                                            <div className="relative z-10 p-6 md:p-8">
                                                <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider text-white mb-3 drop-shadow-md leading-tight">{cap.title}</h3>
                                                <p className="text-xs text-white/70 font-light leading-relaxed">{cap.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </section>

                         {/* 3. OVERVIEW & PHILOSOPHY */}
            <section className="relative z-20 py-24 md:py-32 px-6 md:px-12 lg:px-24 shrink-0 border-t border-white/10 bg-black/40 backdrop-blur-sm" aria-labelledby="philosophy-heading">
                <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 lg:gap-24 items-start">

                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                        className="lg:col-span-7 flex flex-col"
                    >
                        <span id="philosophy-heading" className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8" style={{ color: THEME_COLOR }}>{t.philosophy}</span>
                        <p className="text-2xl md:text-4xl font-light text-white/90 leading-snug md:leading-snug">
                            {t.overview}
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                        className="lg:col-span-5 flex flex-col gap-6 border-t border-white/10 pt-10 lg:border-t-0 lg:pt-0"
                    >
                         <span
        className="hidden lg:block invisible text-[10px] font-bold uppercase tracking-[0.3em] mb-2"
        aria-hidden="true"
    >
        {t.philosophy}
    </span>
                        <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-white">{t.philTitle}</h2>
                        <p className="text-sm md:text-base text-white/70 leading-relaxed font-light">
                            {t.philText}
                        </p>
                        <p className="text-sm md:text-base text-white/60 leading-relaxed font-light border-t border-white/10 pt-6">
                            {t.philNote}
                        </p>
                    </motion.div>

                </div>
            </section>


            {/* 5. EXECUTION TIMELINE (Static & Clean) */}
            <section className="relative z-20 py-24 md:py-40 px-6 md:px-12 lg:px-24 shrink-0 border-t border-white/10 bg-black/60 backdrop-blur-sm" ref={timelineRef} aria-labelledby="methodology-heading">
                <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-5 lg:sticky lg:top-32 self-start">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block" style={{ color: THEME_COLOR }}>{t.methodology}</span>
                        <h2 id="methodology-heading" className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-white leading-[0.9] mb-6 drop-shadow-lg">
                            {t.builtToLast}
                        </h2>
                        <p className="text-white/70 font-light text-base md:text-lg leading-relaxed">
                            {t.methodDesc}
                        </p>
                    </motion.div>

                    <div className="lg:col-span-7 relative">
                        {/* Static connecting vertical line */}
                        <div className={`absolute ${isAr ? 'right-[27px] md:right-[39px]' : 'left-[27px] md:left-[39px]'} top-4 bottom-4 w-[1px] bg-white/20`} aria-hidden="true" />

                        <ol className="flex flex-col gap-12 md:gap-20 list-none">
                            {[
                                { step: t.step1Vol, title: t.step1Title, desc: t.step1Desc },
                                { step: t.step2Vol, title: t.step2Title, desc: t.step2Desc },
                                { step: t.step3Vol, title: t.step3Title, desc: t.step3Desc }
                            ].map((proc, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: isAr ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: i * 0.15 }}
                                    className="relative flex items-start gap-6 sm:gap-8 md:gap-12 group"
                                >
                                    {/* Static Node */}
                                    <div className="relative z-10 w-14 h-14 md:w-20 md:h-20 rounded-full border border-white/30 bg-[#050505] flex items-center justify-center shrink-0">
                                        <span className="text-[11px] md:text-sm font-bold font-mono tracking-widest text-white">{proc.step}</span>
                                    </div>

                                    <div className="pt-2 md:pt-4">
                                        <h3 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-white mb-3">{proc.title}</h3>
                                        <p className="text-sm md:text-base text-white/60 leading-relaxed font-light max-w-lg">{proc.desc}</p>
                                    </div>
                                </motion.li>
                            ))}
                        </ol>
                    </div>

                </div>
            </section>

            {/* 6. EDITORIAL GALLERY — same tile design as the "Our Work" page */}
            <section className="py-24 md:py-40 px-4 md:px-12 lg:px-24 shrink-0 border-t border-white/10" aria-labelledby="portfolio-heading">
                <div className="max-w-[1800px] mx-auto">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col items-center text-center mb-16 md:mb-24">
                        <Compass size={24} className="mb-6" style={{ color: THEME_COLOR }} aria-hidden="true" />
                        <span className="text-[10px] font-mono text-white/50 mb-4 tracking-[0.3em] uppercase">{t.selectDeps}</span>
                        <h2 id="portfolio-heading" className="text-4xl md:text-7xl font-medium tracking-tighter text-white drop-shadow-md mb-6">{t.archiveTitle}</h2>
                        <p className="text-sm md:text-lg font-light text-white/60 leading-relaxed max-w-2xl">{t.archiveDesc}</p>
                    </motion.div>

                    {/* Masonry gallery (matches Our Work page) */}
                    <motion.div layout className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-1.5 md:gap-2 max-w-[1800px] mx-auto">
                        <AnimatePresence mode="popLayout">
                            {visibleProjects.map((project, i) => (
                                <InteriorTile key={project.id} project={project} index={i} priority={i < 4} />
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* Load More */}
                    {INTERIOR_PROJECTS.length > PAGE_SIZE && (
                        <div className="flex flex-col items-center gap-6 mt-16">
                            <div className="w-full max-w-xs h-[2px] bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-amber-400 via-blue-400 to-rose-400"
                                    initial={false}
                                    animate={{ width: `${Math.min((Math.min(visibleCount, INTERIOR_PROJECTS.length) / INTERIOR_PROJECTS.length) * 100, 100)}%` }}
                                    transition={{ duration: 0.6, ease: customEase }}
                                />
                            </div>

                            <p className="text-[10px] uppercase tracking-widest text-white/40 font-mono">
                                {t.showing} {Math.min(visibleCount, INTERIOR_PROJECTS.length)} {t.of} {INTERIOR_PROJECTS.length} {t.projects}
                            </p>

                            {hasMore ? (
                                <button
                                    onClick={handleLoadMore}
                                    disabled={loadingMore}
                                    className="group relative inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl text-white hover:border-amber-400/50 hover:bg-white/10 transition-all duration-500 disabled:opacity-60 disabled:cursor-wait shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
                                >
                                    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
                                        {loadingMore ? t.loadingMore : `${t.loadMore} (${Math.min(remaining, PAGE_SIZE)})`}
                                    </span>
                                    {loadingMore ? (
                                        <Loader2 size={16} className="animate-spin text-amber-400" />
                                    ) : (
                                        <Plus size={16} className="text-amber-400 group-hover:rotate-90 transition-transform duration-500" />
                                    )}
                                </button>
                            ) : (
                                <span className="text-[9px] uppercase tracking-widest text-white/25 font-mono">{t.allLoaded}</span>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* 7. MINIMALIST FOOTER CTA */}
            <section className="py-32 md:py-48 text-center shrink-0 relative border-t border-white/10 bg-black/50 backdrop-blur-md px-6" aria-labelledby="cta-heading">
                <h2 id="cta-heading" className="text-3xl md:text-5xl font-medium tracking-tighter text-white mb-6 relative z-10 drop-shadow-md max-w-4xl mx-auto">
                    {t.ctaTitle}
                </h2>
                <p className="text-sm md:text-base font-light text-white/60 leading-relaxed max-w-2xl mx-auto mb-12 relative z-10">
                    {t.ctaDesc}
                </p>

                <Link href="/" className="relative z-10 inline-flex items-center gap-6 px-12 py-6 bg-white text-black rounded-full hover:scale-105 transition-transform duration-500 shadow-[0_0_50px_rgba(255,255,255,0.1)] group">
                    <span className="text-xs font-black uppercase tracking-[0.2em]">{t.ctaBtn}</span>
                    <LayoutGrid size={16} className={`transition-transform duration-500 ${isAr ? 'group-hover:-rotate-90' : 'group-hover:rotate-90'}`} aria-hidden="true" />
                </Link>
            </section>

        </main>
        </LangContext.Provider>
    );
}

// --- INTERIOR TILE (same design/behaviour as GalleryTile on the Our Work page) ---
function InteriorTile({
    project,
    index,
    priority,
}: {
    project: Project;
    index: number;
    priority?: boolean;
}) {
    const { isAr, t } = useContext(LangContext);
    const [loaded, setLoaded] = useState(false);
    const [ratio, setRatio] = useState(4 / 5);
    const title = isAr ? project.titleAr : project.title;
    const subtitle = isAr ? project.subAr : project.subtitle;
    const categoryLabel = isAr ? "التصميم الداخلي" : "Interiors";

    const clampStyle = (lines: number): React.CSSProperties => ({
        display: "-webkit-box",
        WebkitLineClamp: lines,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
    });

    return (
        <motion.a
            layout
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} — ${t.viewInsta}`}
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: customEase, delay: Math.min(index, 8) * 0.035 }}
            style={{ aspectRatio: ratio }}
            className={`group relative block w-full mb-1.5 md:mb-2 break-inside-avoid overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] cursor-pointer shadow-lg transition-shadow duration-500 hover:shadow-2xl ${META.ring}`}
        >
            {!loaded && <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-white/[0.02] animate-pulse" />}

            <Image
                src={project.img}
                alt={title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                quality={75}
                {...(priority ? { priority: true } : { loading: "lazy" as const })}
                onLoad={(e) => {
                    const img = e.currentTarget;
                    if (img.naturalWidth && img.naturalHeight) {
                        setRatio(img.naturalWidth / img.naturalHeight);
                    }
                    setLoaded(true);
                }}
                className={`object-cover object-center transition-opacity duration-500 ease-out ${loaded ? "opacity-100" : "opacity-0"} group-hover:scale-105 will-change-transform`}
                style={{ transition: "opacity 0.5s ease-out, transform 0.7s ease-out" }}
            />

            {/* Base readability scrim — always on, slightly stronger on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/40 opacity-90 group-hover:opacity-95 transition-opacity duration-500" />

            {/* Category accent line */}
            <div className={`absolute top-0 ${isAr ? "right-0" : "left-0"} h-full w-[3px] bg-gradient-to-b ${META.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            {/* --- HEADER ROW (always visible) --- */}
            <div className={`absolute top-0 inset-x-0 flex items-start justify-between gap-2 p-3 md:p-4`}>
                <div className="min-w-0 flex items-center gap-1.5 px-2 py-1 md:px-2.5 md:py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 shrink-0">
                    <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${META.accent} shrink-0`} />
                    <span className="text-[7px] md:text-[8px] font-mono uppercase tracking-widest text-white/80 whitespace-nowrap">
                        {project.code}
                    </span>
                </div>

                <div className="shrink-0 px-2 py-1 md:px-2.5 md:py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    <span
                        className={`text-[7px] md:text-[8px] font-black uppercase tracking-widest whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r ${META.accent}`}
                    >
                        {categoryLabel}
                    </span>
                </div>
            </div>

            {/* --- TITLE / FOOTER (always visible, clamped so nothing overlaps) --- */}
            <div className="absolute inset-x-0 bottom-0 p-3 pt-8 md:p-5 md:pt-12 bg-gradient-to-t from-black/95 via-black/60 to-transparent">
                <div className={`flex items-end justify-between gap-2 md:gap-3`}>
                    <div className="min-w-0 flex-1">
                        <h3
                            className="text-[11px] leading-tight sm:text-sm md:text-base font-bold uppercase text-white tracking-wide break-words"
                            style={clampStyle(2)}
                            title={title}
                        >
                            {title}
                        </h3>
                        <p
                            className="text-[9px] md:text-[10px] text-white/50 mt-1 break-words opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-6 transition-all duration-500 ease-out"
                            style={clampStyle(1)}
                        >
                            {subtitle}
                        </p>
                    </div>

                    <div className="shrink-0 w-7 h-7 md:w-9 md:h-9 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-300 group-hover:rotate-[360deg] shadow-lg">
                        <Instagram size={13} className="md:hidden" />
                        <Instagram size={16} className="hidden md:block" />
                    </div>
                </div>
            </div>
        </motion.a>
    );
}