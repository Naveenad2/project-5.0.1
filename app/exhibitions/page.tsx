"use client";

import { useRef, useState, useEffect, useContext, createContext } from "react";
import {
    motion,
    useScroll,
    useTransform,
    AnimatePresence
} from "framer-motion";
import {
    ArrowLeft, LayoutGrid,
    Globe, Compass, Asterisk, Instagram, Loader2, Plus
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
    title: "EXHIBITIONS",
    subtitle: "Designing Presence. Building Influence.",
    fabricationHq: "Global Standards. Engineered in Bahrain & KSA.",
    heroDesc: "At Colours, exhibitions are more than structures — they are strategic environments designed to communicate, engage, and inspire. From our production headquarters in Bahrain and KSA, we transform ambitious concepts into immersive physical experiences.",
    philosophy: "Our Philosophy",
    overview: "From our production headquarters in Bahrain and KSA, we transform ambitious concepts into immersive physical experiences, delivering world-class exhibition stands, country pavilions, and branded environments across the GCC and international markets. Every structure we create is built with purpose, precision, and a deep understanding of how people interact with brands in physical space.",

    philTitle: "Architecture for Human Engagement.",
    philText: "In a world saturated with messages, meaningful presence has become a competitive advantage. We design exhibition environments that do more than attract attention — they create dialogue, shape perception, and strengthen brand identity. By combining creative vision, technical expertise, and industrial-grade production capabilities, we transform exhibition spaces into powerful platforms for storytelling and business growth.",
    philNote: "For more than two decades, Colours has partnered with leading organizations, institutions, and global brands to create environments that command attention and deliver measurable impact.",

    coreCompetencies: "Exhibition Design & Fabrication",
    structEng: "Where Vision Meets Craftsmanship.",
    structEngDesc: "Our integrated approach combines design intelligence, engineering precision, and in-house manufacturing to deliver exhibition environments that perform as beautifully as they appear.",

    cap1Title: "Bespoke Exhibition Stands", cap1Desc: "Custom-designed and expertly fabricated exhibition spaces tailored to reflect your brand identity, engage audiences, and maximize exhibition performance.",
    cap2Title: "Pavilions & International Showcases", cap2Desc: "Large-scale country pavilions, government showcases, and international exhibition environments designed to represent nations, industries, and institutions with distinction.",
    cap3Title: "Immersive Digital Integration", cap3Desc: "Advanced LED systems, audiovisual technologies, interactive experiences, and digital storytelling seamlessly embedded into the physical architecture.",

    methodology: "Methodology",
    builtPrecision: "Built with Precision.",
    methodDesc: "Exceptional exhibition environments are not assembled — they are engineered. Every project follows a structured process that integrates creative design, technical planning, manufacturing excellence, and flawless deployment.",

    step1Vol: "01", step1Title: "Experience Design & Strategy", step1Desc: "We begin by understanding your objectives, audience, brand identity, and exhibition environment. Through 3D visualization and strategic planning, we develop spaces that balance aesthetics, functionality, and engagement.",
    step2Vol: "02", step2Title: "Advanced Manufacturing & Fabrication", step2Desc: "Produced entirely through our in-house capabilities, each component is crafted with meticulous attention to detail. From custom carpentry and metal fabrication to CNC production and specialist finishing, every element is manufactured to the highest standards.",
    step3Vol: "03", step3Title: "Installation, Activation & Delivery", step3Desc: "Our experienced teams manage logistics, assembly, technical integration, and on-site execution with precision, ensuring a seamless transition from concept to completed environment.",

    archiveTitle: "A Portfolio of Presence.",
    selectDeps: "Selected Projects",
    archiveDesc: "Each project represents a unique fusion of strategy, creativity, engineering, and craftsmanship — designed to transform exhibition space into meaningful brand experiences.",
    caseStudy: "Fabrication Case Study",
    archiveIndex: "Archive 0",

    ctaTitle: "Ready to Build Something Remarkable?",
    ctaDesc: "Whether you are exhibiting locally, launching internationally, or representing a nation on the world stage, our team is ready to transform your vision into a compelling physical reality. Let’s create a presence that commands attention and leaves a lasting impression.",
    ctaBtn: "Return to Home",

    // gallery / pagination
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
    title: "المعارض",
    subtitle: "تصميم الحضور. بناء التأثير.",
    fabricationHq: "معايير عالمية. مُهندَسة في البحرين والسعودية.",
    heroDesc: "في كلرز، المعارض أكثر من مجرد هياكل — إنها بيئات استراتيجية مصممة للتواصل والإشراك والإلهام. من مقرات الإنتاج لدينا في البحرين والسعودية، نحوّل المفاهيم الطموحة إلى تجارب مادية غامرة.",
    philosophy: "فلسفتنا",
    overview: "من مقرات الإنتاج لدينا في البحرين والسعودية، نحوّل المفاهيم الطموحة إلى تجارب مادية غامرة، ونقدم أجنحة معارض عالمية المستوى، وأجنحة وطنية، وبيئات تحمل العلامات التجارية في جميع أنحاء دول الخليج والأسواق الدولية. كل هيكل نبتكره مبني بهدف ودقة وفهم عميق لكيفية تفاعل الناس مع العلامات التجارية في المساحات المادية.",

    philTitle: "هندسة للتفاعل الإنساني.",
    philText: "في عالم مشبع بالرسائل، أصبح الحضور الهادف ميزة تنافسية. نصمم بيئات معارض تفعل أكثر من جذب الانتباه — فهي تخلق الحوار، وتشكّل الإدراك، وتعزز هوية العلامة التجارية. بالجمع بين الرؤية الإبداعية والخبرة التقنية وقدرات الإنتاج الصناعي، نحوّل مساحات المعارض إلى منصات قوية لسرد القصص ونمو الأعمال.",
    philNote: "لأكثر من عقدين، تعاونت كلرز مع المؤسسات الرائدة والهيئات والعلامات التجارية العالمية لخلق بيئات تأسر الانتباه وتحقق أثرًا قابلًا للقياس.",

    coreCompetencies: "تصميم وتصنيع المعارض",
    structEng: "حيث تلتقي الرؤية بالحرفية.",
    structEngDesc: "يجمع نهجنا المتكامل بين الذكاء التصميمي والدقة الهندسية والتصنيع الداخلي لتقديم بيئات معارض تؤدي بنفس جمال مظهرها.",

    cap1Title: "أجنحة معارض مخصصة", cap1Desc: "مساحات معارض مصممة خصيصًا ومصنّعة بخبرة لتعكس هوية علامتك التجارية، وتشرك الجماهير، وتعظّم أداء المعرض.",
    cap2Title: "الأجنحة والعروض الدولية", cap2Desc: "أجنحة وطنية واسعة النطاق، وعروض حكومية، وبيئات معارض دولية مصممة لتمثيل الدول والصناعات والمؤسسات بتميز.",
    cap3Title: "التكامل الرقمي الغامر", cap3Desc: "أنظمة LED متقدمة، وتقنيات صوتية ومرئية، وتجارب تفاعلية، وسرد رقمي مدمج بسلاسة في التصميم المادي.",

    methodology: "المنهجية",
    builtPrecision: "مبنية بدقة.",
    methodDesc: "بيئات المعارض الاستثنائية لا تُجمَّع — بل تُهندَس. يتبع كل مشروع عملية منظمة تدمج التصميم الإبداعي والتخطيط التقني والتميز في التصنيع والنشر الخالي من العيوب.",

    step1Vol: "01", step1Title: "تصميم التجربة والاستراتيجية", step1Desc: "نبدأ بفهم أهدافك وجمهورك وهوية علامتك التجارية وبيئة المعرض. من خلال التصور ثلاثي الأبعاد والتخطيط الاستراتيجي، نطور مساحات توازن بين الجماليات والوظيفة والتفاعل.",
    step2Vol: "02", step2Title: "التصنيع والإنتاج المتقدم", step2Desc: "يُنتَج كل مكوّن بالكامل من خلال قدراتنا الداخلية، ويُصاغ باهتمام دقيق بالتفاصيل. من النجارة المخصصة وتصنيع المعادن إلى إنتاج CNC والتشطيب المتخصص، يُصنَّع كل عنصر وفق أعلى المعايير.",
    step3Vol: "03", step3Title: "التركيب والتفعيل والتسليم", step3Desc: "تدير فرقنا ذات الخبرة الخدمات اللوجستية والتجميع والتكامل التقني والتنفيذ في الموقع بدقة، لضمان انتقال سلس من الفكرة إلى البيئة المكتملة.",

    archiveTitle: "محفظة من الحضور.",
    selectDeps: "مشاريع مختارة",
    archiveDesc: "يمثل كل مشروع مزيجًا فريدًا من الاستراتيجية والإبداع والهندسة والحرفية — مصممًا لتحويل مساحة المعرض إلى تجارب علامة تجارية هادفة.",
    caseStudy: "دراسة حالة تصنيع",
    archiveIndex: "أرشيف",

    ctaTitle: "مستعد لبناء شيء رائع؟",
    ctaDesc: "سواء كنت تعرض محليًا، أو تطلق دوليًا، أو تمثل دولة على المسرح العالمي، فإن فريقنا مستعد لتحويل رؤيتك إلى واقع مادي مقنع. لنصنع حضورًا يأسر الانتباه ويترك انطباعًا دائمًا.",
    ctaBtn: "العودة للرئيسية",

    // gallery / pagination
    viewInsta: "عرض على إنستغرام",
    showing: "عرض",
    of: "من",
    loadMore: "تحميل المزيد",
    loadingMore: "جاري التحميل",
    allLoaded: "لقد وصلت إلى النهاية",
    projects: "مشروع",
};

const THEME_COLOR = "#8B5CF6"; // Electric Violet
const HERO_IMAGE = "/insta/exhibitions.jpeg";

// Capability card backgrounds
const CAPABILITIES_IMAGES = [
    "/insta/ex1.jpeg",
    "/insta/ex2.jpeg",
    "/insta/ex3.jpeg",
];

/* ------------------------------------------------------------------
   EXHIBITION PORTFOLIO — same data source & image paths as the
   "Our Work" page (folder /ex, files exx1.png, exx2.png ... in
   source order), so the gallery here always mirrors that catalogue 1:1.
------------------------------------------------------------------- */
interface SourceItem {
    url: string;
    title?: string;
    titleAr?: string;
}

const EXHIBITION_ITEMS: SourceItem[] = [
    { url: "https://www.instagram.com/p/DSAT1Xtj2Ph/", title: "EDAMAH Stand @ Cityscape Bahrain 2025", titleAr: "جناح إدامة في سيتي سكيب البحرين 2025" },
    { url: "https://www.instagram.com/p/DV7_vc1lBol/", title: "TAMKEEN Bahrain Pavilion @ Gulfood 2026 Dubai", titleAr: "جناح البحرين لتمكين في جلفود 2026، دبي" },
    { url: "https://www.instagram.com/p/DSrqeYFk1KG/", title: "SAVILLS Stand @ Cityscape Global 2025", titleAr: "جناح سافيلز في سيتي سكيب جلوبال 2025" },
    { url: "https://www.instagram.com/p/DSheZrdDqh6/", title: "The American Express Lounge, Jewellery Arabia 2025", titleAr: "صالة أمريكان إكسبريس في جوليري أرابيا 2025" },
    { url: "https://www.instagram.com/p/DR6RoSUkx6b/", title: "Bahrain Marina Stand @ Cityscape Bahrain 2025", titleAr: "جناح بحرين مارينا في سيتي سكيب البحرين 2025" },
    { url: "https://www.instagram.com/p/DCioMxRsuhW/?img_index=1", title: "Las Vegas (Harry Reid) International Airport", titleAr: "مطار لاس فيغاس الدولي (هاري ريد)" },
    { url: "https://www.instagram.com/p/C4sjdNwsiuN/?img_index=1", title: "The Family Office Exhibition Stand", titleAr: "جناح معرض ذا فاميلي أوفيس" },
    { url: "https://www.instagram.com/p/C2URwFzMXgO/?img_index=1", title: "Naseej Stand at Cityscape Bahrain 2023", titleAr: "جناح نسيج في سيتي سكيب البحرين 2023" },
    { url: "https://www.instagram.com/p/C2FE44vsizq/?img_index=1", title: "Amwaj Beachfront", titleAr: "أمواج — الواجهة البحرية" },
    { url: "https://www.instagram.com/p/CqCvjsdsCrn/?img_index=1", title: "Mercedes-AMG", titleAr: "مرسيدس-AMG" },
    { url: "https://www.instagram.com/p/CpsRAV4sGAb/?img_index=1", title: "TAQA Stand at MEOS GEO 2023", titleAr: "جناح طاقة في MEOS GEO 2023" },
    { url: "https://www.instagram.com/p/CpGSAh4LGhi/?img_index=1", title: "The Bahrain Airport Company", titleAr: "شركة مطار البحرين" },
    { url: "https://www.instagram.com/p/Cm1D35xsn4_/?img_index=1", title: "Hala Bahrain Stand", titleAr: "جناح هلا البحرين" },
    { url: "https://www.instagram.com/p/CmodFPbsw3c/?img_index=1", title: "ALBA Stand, Bahrain International Airshow 2022", titleAr: "جناح ألبا في معرض البحرين الدولي للطيران 2022" },
    { url: "https://www.instagram.com/p/CmcG3KqLioG/?img_index=1", title: "The Ministry of Interior Stand", titleAr: "جناح وزارة الداخلية" },
    { url: "https://www.instagram.com/p/Cceu_UdMLZW/?img_index=1", title: "Dilmunia Stand", titleAr: "جناح دلمونيا" },
    { url: "https://www.instagram.com/p/CcaDN6aMFtr/?img_index=1", title: "The Mercedes-AMG Stand", titleAr: "جناح مرسيدس-AMG" },
    { url: "https://www.instagram.com/p/B6mb8vQF4cq/?img_index=1", title: "Canalview — Naseej Exhibition Project", titleAr: "مشروع كانال فيو ضمن معرض نسيج" },
    { url: "https://www.instagram.com/p/B44Drv-Fcac/?img_index=1", title: "Gulf Property Show 2019", titleAr: "معرض الخليج العقاري 2019" },
    { url: "https://www.instagram.com/p/B303qCcl0T5/?img_index=1", title: "National Oil & Gas Authority (NOGA)", titleAr: "الهيئة الوطنية للنفط والغاز" },
];

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

// Builds the Project[] straight from EXHIBITION_ITEMS, in the exact order
// the files appear in /public/ex (index 0 => exx1.png), identical to the
// "Our Work" page's Exhibition section.
function buildExhibitionProjects(items: SourceItem[]): Project[] {
    return items.map((item, i) => {
        const n = i + 1;
        const num = String(n).padStart(2, "0");
        return {
            id: n,
            title: item.title ?? `Exhibition ${num}`,
            titleAr: item.titleAr ?? `المعارض ${num}`,
            subtitle: "Exhibition Stand",
            subAr: "جناح معرض",
            img: `/ex/exx${n}.png`,
            href: item.url,
            code: `EX-${num}`,
        };
    });
}

const EXHIBITION_PROJECTS: Project[] = buildExhibitionProjects(EXHIBITION_ITEMS);

// Encode spaces and special characters, keep the "/" separators intact
const enc = (p: string) => p.split("/").map(encodeURIComponent).join("/");

// How many tiles render on first paint, and per "load more" batch
const PAGE_SIZE = 10;

// --- SEO: Structured data (JSON-LD) ---
const STRUCTURED_DATA = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Exhibition Design & Fabrication",
    provider: {
        "@type": "Organization",
        name: "Colours Bahrain",
        url: "https://coloursbahrain.com",
        areaServed: ["Bahrain", "Saudi Arabia", "GCC", "Worldwide"]
    },
    description:
        "From production headquarters in Bahrain and KSA, Colours delivers world-class exhibition stands, country pavilions, and branded environments across the GCC and international markets.",
    hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Exhibition Design & Fabrication",
        itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bespoke Exhibition Stands" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pavilions & International Showcases" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Immersive Digital Integration" } }
        ]
    }
};

// Animation Variants
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } }
};

// Custom smooth easing curve (matches "Our Work" gallery tiles)
const customEase = [0.22, 1, 0.36, 1] as const;

// Context for App-wide Language State
const LangContext = createContext({ isAr: false, toggleLang: () => {}, t: TEXT_EN });

export default function ExhibitionsPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(true);
    const [isAr, setIsAr] = useState(false);

    // Gallery pagination (same pattern as "Our Work")
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [loadingMore, setLoadingMore] = useState(false);

    const toggleLang = () => setIsAr((prev) => !prev);
    const t = isAr ? TEXT_AR : TEXT_EN;

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // SEO / accessibility: keep <html> lang & dir in sync with the active language
    useEffect(() => {
        if (typeof document !== "undefined") {
            document.documentElement.lang = isAr ? "ar" : "en";
            document.documentElement.dir = isAr ? "rtl" : "ltr";
        }
    }, [isAr]);

    const visibleProjects = EXHIBITION_PROJECTS.slice(0, visibleCount);
    const hasMore = visibleCount < EXHIBITION_PROJECTS.length;
    const remaining = EXHIBITION_PROJECTS.length - visibleCount;

    const handleLoadMore = () => {
        if (loadingMore) return;
        setLoadingMore(true);
        window.setTimeout(() => {
            setVisibleCount((c) => Math.min(c + PAGE_SIZE, EXHIBITION_PROJECTS.length));
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
            id="colours-exhibitions-structured-data"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />

        <main ref={containerRef} className={`bg-[#050505] h-screen w-full text-white font-sans selection:bg-violet-500/30 overflow-y-auto overflow-x-hidden relative scroll-smooth custom-scrollbar ${isAr ? 'dir-rtl' : 'dir-ltr'}`} dir={isAr ? "rtl" : "ltr"} lang={isAr ? "ar" : "en"}>

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
            <section className="relative h-[85svh] md:h-[100svh] w-full overflow-hidden flex items-end pb-12 md:pb-24 px-6 md:px-12 lg:px-24 shrink-0" aria-labelledby="exhibitions-hero-heading">

                {/* Parallax Image */}
                <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 z-0" aria-hidden="true">
                    <Image
                        src={HERO_IMAGE}
                        alt="Colours Bahrain — custom exhibition stand build"
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
                        <h1 id="exhibitions-hero-heading" className="text-[10vw] md:text-[9vw] lg:text-[9rem] font-black uppercase tracking-tighter leading-[0.8] text-white mix-blend-plus-lighter drop-shadow-2xl">
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
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white leading-tight">{t.fabricationHq}</span>
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

            {/* 4. IMAGE-BASED CAPABILITIES */}
            <section className="relative z-20 py-24 md:py-32 px-6 md:px-12 lg:px-24 shrink-0" aria-labelledby="competencies-heading">
                <div className="max-w-[1800px] mx-auto">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-12 mb-12 md:mb-16 gap-6">
                        <div>
                            <span id="competencies-heading" className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block" style={{ color: THEME_COLOR }}>{t.coreCompetencies}</span>
                            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-white drop-shadow-md">{t.structEng}</h2>
                        </div>
                        <p className={`text-xs font-light text-white/50 tracking-wide max-w-sm leading-relaxed ${isAr ? 'md:text-left' : 'md:text-right'}`}>
                            {t.structEngDesc}
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

            {/* 5. EXECUTION TIMELINE */}
            <section className="relative z-20 py-24 md:py-40 px-6 md:px-12 lg:px-24 shrink-0 border-t border-white/10 bg-black/60 backdrop-blur-sm" ref={timelineRef} aria-labelledby="methodology-heading">
                <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-5 lg:sticky lg:top-32 self-start">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block" style={{ color: THEME_COLOR }}>{t.methodology}</span>
                        <h2 id="methodology-heading" className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-white leading-[0.9] mb-6 drop-shadow-lg">
                            {t.builtPrecision}
                        </h2>
                        <p className="text-white/70 font-light text-base md:text-lg leading-relaxed">
                            {t.methodDesc}
                        </p>
                    </motion.div>

                    <div className="lg:col-span-7 relative">
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

            {/* 6. EDITORIAL MASONRY GALLERY — same design/tile as "Our Work" (Exhibition data only) */}
            <section className="py-24 md:py-40 px-4 md:px-12 lg:px-24 shrink-0 border-t border-white/10" aria-labelledby="portfolio-heading">
                <div className="max-w-[1800px] mx-auto">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col items-center text-center mb-16 md:mb-24">
                        <Compass size={24} className="mb-6" style={{ color: THEME_COLOR }} aria-hidden="true" />
                        <span className="text-[10px] font-mono text-white/50 mb-4 tracking-[0.3em] uppercase">{t.selectDeps}</span>
                        <h2 id="portfolio-heading" className="text-4xl md:text-7xl font-medium tracking-tighter text-white drop-shadow-md mb-6">{t.archiveTitle}</h2>
                        <p className="text-sm md:text-lg font-light text-white/60 leading-relaxed max-w-2xl">{t.archiveDesc}</p>
                    </motion.div>

                    {/* Responsive masonry — 2 / 3 / 4 / 5 columns, identical to Our Work */}
                    <motion.div layout className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-1.5 md:gap-2">
                        <AnimatePresence mode="popLayout">
                            {visibleProjects.map((project, i) => (
                                <ExhibitionTile key={project.id} project={project} index={i} priority={i < 4} />
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* LOAD MORE */}
                    {EXHIBITION_PROJECTS.length > PAGE_SIZE && (
                        <div className="flex flex-col items-center gap-6 mt-16 md:mt-20">
                            <div className="w-full max-w-xs h-[2px] bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-violet-400 via-white to-violet-400"
                                    initial={false}
                                    animate={{ width: `${Math.min((Math.min(visibleCount, EXHIBITION_PROJECTS.length) / EXHIBITION_PROJECTS.length) * 100, 100)}%` }}
                                    transition={{ duration: 0.6, ease: customEase }}
                                />
                            </div>

                            <p className="text-[10px] uppercase tracking-widest text-white/40 font-mono">
                                {t.showing} {Math.min(visibleCount, EXHIBITION_PROJECTS.length)} {t.of} {EXHIBITION_PROJECTS.length} {t.projects}
                            </p>

                            {hasMore ? (
                                <button
                                    onClick={handleLoadMore}
                                    disabled={loadingMore}
                                    className="group relative inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl text-white hover:border-violet-400/50 hover:bg-white/10 transition-all duration-500 disabled:opacity-60 disabled:cursor-wait shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
                                >
                                    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
                                        {loadingMore ? t.loadingMore : `${t.loadMore} (${Math.min(remaining, PAGE_SIZE)})`}
                                    </span>
                                    {loadingMore ? (
                                        <Loader2 size={16} className="animate-spin text-violet-400" />
                                    ) : (
                                        <Plus size={16} className="text-violet-400 group-hover:rotate-90 transition-transform duration-500" />
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

// --- EXHIBITION GALLERY TILE (identical design language to the "Our Work" GalleryTile) ---
function ExhibitionTile({
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
            className="group relative block w-full mb-1.5 md:mb-2 break-inside-avoid overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] cursor-pointer shadow-lg transition-shadow duration-500 hover:shadow-2xl hover:shadow-violet-500/30"
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
            <div className={`absolute top-0 ${isAr ? "right-0" : "left-0"} h-full w-[3px] bg-gradient-to-b from-violet-400 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            {/* --- HEADER ROW (always visible) --- */}
            <div className="absolute top-0 inset-x-0 flex items-start justify-between gap-2 p-3 md:p-4">
                <div className="min-w-0 flex items-center gap-1.5 px-2 py-1 md:px-2.5 md:py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 shrink-0">
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 shrink-0" />
                    <span className="text-[7px] md:text-[8px] font-mono uppercase tracking-widest text-white/80 whitespace-nowrap">
                        {project.code}
                    </span>
                </div>
            </div>

            {/* --- TITLE / FOOTER (always visible, clamped so nothing overlaps) --- */}
            <div className="absolute inset-x-0 bottom-0 p-3 pt-8 md:p-5 md:pt-12 bg-gradient-to-t from-black/95 via-black/60 to-transparent">
                <div className="flex items-end justify-between gap-2 md:gap-3">
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