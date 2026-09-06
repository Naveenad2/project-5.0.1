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
    Globe, Compass, Asterisk, ShoppingBag, MapPin, Sparkles, Coffee,
    Loader2, Plus, Instagram
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
    ctaBtn: "Return to Home",

    // Gallery (matches Our Work page)
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
    title: "الأكشاك",
    subtitle: "قسم الوكالة // متاجر التجزئة المؤقتة",
    fabricationHq: "التنفيذ في التجزئة",
    heroDesc: "السيطرة على مساحات التجزئة المتميزة في جميع أنحاء المملكة. نحن نحول الإقبال الكثيف إلى تفاعل ملموس للعلامة التجارية.",
    philosophy: "فلسفتنا",
    overview: "نقوم بتصميم وتصنيع أكشاك التجزئة والمتاجر المؤقتة عالية الإقبال. موضوعة في وجهات رئيسية مثل الأفنيوز، مراسي جاليريا، ومودا مول، صُمِّمت هياكلنا لتعزيز حضور العلامة التجارية وانتشارها، وزيادة تفاعل المستهلكين والعائد التجاري.",

    coreCompetencies: "الكفاءات الأساسية",
    structEng: "البنية التحتية للتجزئة",
    structEngDesc: "مصممة للبيئات عالية الإقبال والنشر السريع.",

    cap1Title: "متاجر مؤقتة للعلامات", cap1Desc: "مساحات تجزئة مؤقتة غامرة مصممة لإطلاق المنتجات ودفع عمل المستهلك الفوري.",
    cap2Title: "أكشاك دائمة", cap2Desc: "هياكل تجزئة متينة بزاوية 360 درجة مصممة لممرات المجمعات التجارية المزدحمة والاستخدام طويل الأمد.",
    cap3Title: "مناطق تجريبية", cap3Desc: "مناطق تفاعلية تتميز بنقاط اتصال رقمية وألعاب وجماليات جاهزة للتصوير.",
    cap4Title: "منافذ الأطعمة والمشروبات", cap4Desc: "أكشاك أطعمة ومشروبات مدمجة وعملية بالكامل متوافقة مع لوائح السلامة والصحة الصارمة في المجمعات التجارية.",

    methodology: "المنهجية",
    builtPrecision: "السرعة والسرية.",
    methodDesc: "نتعامل مع لوائح المجمعات التجارية المعقدة بسهولة. تضمن عمليتنا تجهيزاً سريعاً طوال الليل دون تعطيل العمليات العامة.",

    step1Vol: "خطوة 01", step1Title: "تحليل حركة المرور والتدفق", step1Desc: "تقييم إرشادات المجمع وأنماط الإقبال والأبعاد المكانية لزيادة الرؤية وسهولة الوصول.",
    step2Vol: "خطوة 02", step2Title: "التصميم والتصنيع", step2Desc: "إنشاء عروض ثلاثية الأبعاد مفصلة وتصنيع مكونات ممتازة ومتينة في منشأتنا في البحرين.",
    step3Vol: "خطوة 03", step3Title: "التركيب الليلي", step3Desc: "تنفيذ تركيبات وتجهيزات فنية سريعة وسرية خارج ساعات عمل المجمع التجاري لضمان عدم الانقطاع.",

    archiveTitle: "أرشيف التجزئة",
    selectDeps: "تطبيقات مختارة // مجمعات الخليج",
    caseStudy: "دراسة حالة للتجزئة",
    archiveIndex: "أرشيف 0",

    ctaTitle: "هل أنت مستعد لشغل المساحة؟",
    ctaBtn: "العودة للرئيسية",

    // Gallery (matches Our Work page)
    viewInsta: "عرض على إنستغرام",
    showing: "عرض",
    of: "من",
    loadMore: "تحميل المزيد",
    loadingMore: "جاري التحميل",
    allLoaded: "لقد وصلت إلى النهاية",
    projects: "مشروع",
};

const THEME_COLOR = "#10B981"; // Neon Emerald
const HERO_IMAGE = "/insta/mallkioski.jpeg";

const CAPABILITIES_ICONS = [ShoppingBag, MapPin, Sparkles, Coffee];

const CAPABILITIES_IMAGES = [
    "/insta/k1.jpeg",
    "/insta/k2.jpeg",
    "/insta/k3.jpeg",
    "/insta/k4.jpeg"
];

// Custom smooth easing curve (matches Our Work gallery)
const customEase = [0.22, 1, 0.36, 1] as const;

const PAGE_SIZE = 10; // how many tiles are visible per "page"

/* ------------------------------------------------------------------
   GALLERY DATA — copied 1:1 from the "Our Work" page's Kiosk
   category (KIOSK_ITEMS + buildProjects), so titles / Arabic
   titles / Instagram links / image paths all match exactly.
   Image path pattern: /mall/mall{n}.png  (folder "mall", prefix "mall")
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

const KIOSK_ITEMS: SourceItem[] = [
    { url: "https://www.instagram.com/p/DIdSmWpMMIf/?img_index=1", title: "F1 Ticketing & Merchandise Kiosks", titleAr: "أكشاك تذاكر ومنتجات الفورمولا 1" },
    { url: "https://www.instagram.com/p/C3CtwlrMbEH/?img_index=1", title: "Mubkhar Perfume Kiosk", titleAr: "كشك عطور مبخر" },
    { url: "https://www.instagram.com/p/Cyq6ew7LOn8/?img_index=1", title: "Gulf Air Promotional Stand", titleAr: "جناح ترويجي لطيران الخليج" },
    { url: "https://www.instagram.com/p/CyQzv65M0mD/?img_index=1", title: "Abdul Samad Al Qurashi Kiosk", titleAr: "كشك عبدالصمد القرشي" },
    { url: "https://www.instagram.com/p/CpeuTljMA9T/?img_index=1", title: "Crème Bahrain's New Kiosk", titleAr: "كشك كريم البحرين الجديد" },
    { url: "https://www.instagram.com/p/CpM7sMkMq7e/?img_index=1", title: "Swiss Arabian Perfume Kiosk", titleAr: "كشك سويس أرابيان للعطور" },
    { url: "https://www.instagram.com/p/CpHWV7tjmHG/?img_index=1", title: "Al Kashkha Oud Kiosk", titleAr: "كشك الكشخة للعود" },
    { url: "https://www.instagram.com/p/CgvxgTvMnpj/?img_index=1", title: "Daniel Klein Watch Kiosk", titleAr: "كشك ساعات دانيال كلاين" },
    { url: "https://www.instagram.com/p/CgghwVAM3RR/?img_index=1", title: "Cioccolatitaliani's New Kiosk", titleAr: "كشك تشوكولاتيتاليان الجديد" },
    { url: "https://www.instagram.com/p/Cc2icZysXhf/?img_index=1", title: "Al Jazeera Perfumes", titleAr: "عطور الجزيرة" },
    { url: "https://www.instagram.com/p/CR0cKuWLl-8/?img_index=1", title: "Daniel Klein", titleAr: "دانيال كلاين" },
    { url: "https://www.instagram.com/p/B9PVUFmhwV6/?img_index=1", title: "F1 Merchandise Kiosk", titleAr: "كشك منتجات الفورمولا 1" },
    { url: "https://www.instagram.com/p/B88Ypc3hj9x/?img_index=1", title: "Permanent Kiosk Production", titleAr: "إنتاج كشك دائم" },
];

function buildKioskProjects(items: SourceItem[]): Project[] {
    return items.map((item, i) => {
        const n = i + 1;
        const num = String(n).padStart(2, "0");
        return {
            id: n,
            title: item.title ?? `Mall Kiosk ${num}`,
            titleAr: item.titleAr ?? `أكشاك المولات ${num}`,
            subtitle: "Retail Kiosk",
            subAr: "كشك تجزئة",
            img: `/mall/mall${n}.png`,
            href: item.url,
            code: `MK-${num}`,
        };
    });
}

const KIOSK_PROJECTS: Project[] = buildKioskProjects(KIOSK_ITEMS);

const META = {
    accent: "from-rose-400 to-rose-600",
    ring: "group-hover:shadow-rose-500/30",
};

// Context for App-wide Language State
const LangContext = createContext({ isAr: false, toggleLang: () => {}, t: TEXT_EN });

export default function KiosksPage() {
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

    const toggleLang = () => setIsAr(!isAr);
    const t = isAr ? TEXT_AR : TEXT_EN;

    useEffect(() => {
          localStorage.setItem("colours_lang", isAr ? "ar" : "en");
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [isAr]);

    const visibleProjects = KIOSK_PROJECTS.slice(0, visibleCount);
    const hasMore = visibleCount < KIOSK_PROJECTS.length;
    const remaining = KIOSK_PROJECTS.length - visibleCount;

    const handleLoadMore = () => {
        if (loadingMore) return;
        setLoadingMore(true);
        window.setTimeout(() => {
            setVisibleCount((c) => Math.min(c + PAGE_SIZE, KIOSK_PROJECTS.length));
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
                        <div className="flex items-start gap-4 mb-4 md:mb-6 max-w-2xl">
                            <Asterisk size={14} style={{ color: THEME_COLOR }} className="mt-1 shrink-0" />
                            <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-[0.3em] md:tracking-[0.4em] leading-relaxed">
                                {t.subtitle}
                            </span>
                        </div>

                        {/* Massive Editorial Title */}
                        <h1 className="text-[13vw] md:text-[10vw] lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] text-white mix-blend-plus-lighter drop-shadow-2xl">
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
                                    <span className="text-sm md:text-base font-bold uppercase tracking-[0.15em] text-white leading-snug">{t.fabricationHq}</span>
                                </div>
                                <Globe size={16} className="text-white/50 shrink-0" />
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

          

            {/* 4. IMAGE-BASED CAPABILITIES */}
            <section className="relative z-20 py-24 md:py-32 px-6 md:px-12 lg:px-24 shrink-0">
                <div className="max-w-[1800px] mx-auto">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-12 mb-12 md:mb-16 gap-6">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block" style={{ color: THEME_COLOR }}>{t.coreCompetencies}</span>
                            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-white drop-shadow-md">{t.structEng}</h2>
                        </div>
                        <p className={`text-xs font-mono text-white/50 uppercase tracking-widest max-w-xs leading-relaxed ${isAr ? 'md:text-left' : 'md:text-right'}`}>
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
                                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] min-h-[400px] flex flex-col justify-end"
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={cap.image}
                                        alt={cap.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        loading="lazy"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-90"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                                </div>

                                {/* Content Overlay */}
                                <div className={`relative z-10 p-6 md:p-8 flex flex-col ${isAr ? 'items-end text-right' : 'items-start text-left'}`}>
                                    <div className="w-10 h-10 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm flex items-center justify-center mb-4 shrink-0">
                                        <cap.icon size={16} className="text-white" />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider text-white mb-3 drop-shadow-md leading-tight">{cap.title}</h3>
                                    <p className="text-xs text-white/70 font-light leading-relaxed">{cap.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

              {/* 3. OVERVIEW (stats section removed) */}
            <section className="relative z-20 py-24 md:py-32 px-6 md:px-12 lg:px-24 shrink-0 border-t border-white/10 bg-black/40 backdrop-blur-sm">
                <div className="max-w-[1800px] mx-auto">

                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                        className="max-w-4xl flex flex-col"
                    >
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 block" style={{ color: THEME_COLOR }}>{t.philosophy}</span>
                        <p className="text-2xl md:text-4xl font-light text-white/90 leading-snug md:leading-snug">
                            {t.overview}
                        </p>
                    </motion.div>

                </div>
            </section>

            {/* 5. EXECUTION TIMELINE (Static & Clean) */}
            <section className="relative z-20 py-24 md:py-40 px-6 md:px-12 lg:px-24 shrink-0 border-t border-white/10 bg-black/60 backdrop-blur-sm" ref={timelineRef}>
                <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-5 lg:sticky lg:top-32 self-start">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block" style={{ color: THEME_COLOR }}>{t.methodology}</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-white leading-[0.9] mb-6 drop-shadow-lg">
                            {t.builtPrecision}
                        </h2>
                        <p className="text-white/70 font-light text-base md:text-lg leading-relaxed">
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
                                    className="relative flex items-start gap-6 sm:gap-8 md:gap-12 group"
                                >
                                    {/* Static Node */}
                                    <div className="relative z-10 w-14 h-14 md:w-20 md:h-20 rounded-full border border-white/30 bg-[#050505] flex items-center justify-center shrink-0">
                                        <span className="text-[9px] md:text-[10px] font-bold font-mono tracking-widest text-white">{proc.step}</span>
                                    </div>

                                    <div className="pt-2 md:pt-4">
                                        <h3 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-white mb-3">{proc.title}</h3>
                                        <p className="text-sm md:text-base text-white/60 leading-relaxed font-light max-w-lg">{proc.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* 6. EDITORIAL GALLERY — same tile design as the "Our Work" page */}
            <section className="py-24 md:py-40 px-4 md:px-12 lg:px-24 shrink-0 border-t border-white/10">
                <div className="max-w-[1800px] mx-auto">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col items-center text-center mb-16 md:mb-24">
                        <Compass size={24} className="mb-6" style={{ color: THEME_COLOR }} />
                        <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-white drop-shadow-md">{t.archiveTitle}</h2>
                        <span className="text-[10px] font-mono text-white/50 mt-6 tracking-[0.3em] uppercase">{t.selectDeps}</span>
                    </motion.div>

                    {/* Masonry gallery (matches Our Work page) */}
                    <motion.div layout className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-1.5 md:gap-2 max-w-[1800px] mx-auto">
                        <AnimatePresence mode="popLayout">
                            {visibleProjects.map((project, i) => (
                                <KioskTile key={project.id} project={project} index={i} priority={i < 4} />
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* Load More */}
                    {KIOSK_PROJECTS.length > PAGE_SIZE && (
                        <div className="flex flex-col items-center gap-6 mt-16 md:mt-20">
                            <div className="w-full max-w-xs h-[2px] bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-rose-400 via-emerald-400 to-blue-400"
                                    initial={false}
                                    animate={{ width: `${Math.min((Math.min(visibleCount, KIOSK_PROJECTS.length) / KIOSK_PROJECTS.length) * 100, 100)}%` }}
                                    transition={{ duration: 0.6, ease: customEase }}
                                />
                            </div>

                            <p className="text-[10px] uppercase tracking-widest text-white/40 font-mono">
                                {t.showing} {Math.min(visibleCount, KIOSK_PROJECTS.length)} {t.of} {KIOSK_PROJECTS.length} {t.projects}
                            </p>

                            {hasMore ? (
                                <button
                                    onClick={handleLoadMore}
                                    disabled={loadingMore}
                                    className="group relative inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl text-white hover:border-rose-400/50 hover:bg-white/10 transition-all duration-500 disabled:opacity-60 disabled:cursor-wait shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
                                >
                                    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
                                        {loadingMore ? t.loadingMore : `${t.loadMore} (${Math.min(remaining, PAGE_SIZE)})`}
                                    </span>
                                    {loadingMore ? (
                                        <Loader2 size={16} className="animate-spin text-rose-400" />
                                    ) : (
                                        <Plus size={16} className="text-rose-400 group-hover:rotate-90 transition-transform duration-500" />
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
            <section className="py-32 md:py-48 text-center shrink-0 relative border-t border-white/10 bg-black/50 backdrop-blur-md px-6">
                <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-white mb-12 relative z-10 drop-shadow-md max-w-4xl mx-auto">
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

// --- KIOSK TILE (same design/behaviour as GalleryTile on the Our Work page) ---
function KioskTile({
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
    const categoryLabel = isAr ? "أكشاك المولات" : "Mall Kiosk";

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

// Animation Variants
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } }
};