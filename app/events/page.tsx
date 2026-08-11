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
    mainGrid: "Main_Grid",
    langToggle: "عربي",
    title: "EVENTS",
    subtitle: "Creating Experiences That Resonate. Environments That Endure.",
    globalReach: "Global Reach. Regional Intelligence.",
    heroDesc: "From our headquarters in Bahrain to destinations across the world, we design and deliver exceptional event experiences that transcend geography and expectations.",
    philosophy: "Our Perspective",
    overview: "We believe every event is more than a gathering — it is a moment of influence, a platform for connection, and an opportunity to create lasting impact. Through strategic thinking, creative innovation, and flawless execution, we transform spaces into stories and audiences into participants.",

    perspectiveTitle: "Engineering Moments That Matter.",
    perspectiveText: "The most memorable events are not measured by attendance alone, but by the emotions they evoke, the conversations they inspire, and the impressions they leave behind. At Colours, we conceive, design, and execute high-impact experiences that engage audiences on a deeper level. From executive summits and government ceremonies to public festivals, product launches, and large-scale celebrations, we orchestrate every detail with purpose and precision.",
    perspectiveNote: "Every project is approached as a unique narrative — carefully crafted to reflect your vision, strengthen your brand, and create meaningful human connections.",

    coreCompetencies: "Event Design & Delivery",
    eventArch: "From Vision to Reality.",
    eventArchDesc: "Combining creative direction, technical expertise, and operational excellence, we deliver events that are both visually compelling and strategically effective.",

    cap1Title: "Corporate Conferences & Leadership Summits", cap1Desc: "Purpose-built environments that foster dialogue, inspire collaboration, and elevate corporate presence through seamless execution and thoughtful design.",
    cap2Title: "Concerts, Festivals & Public Experiences", cap2Desc: "Large-scale productions featuring advanced staging, immersive technologies, audience engagement strategies, and meticulous operational management.",
    cap3Title: "Brand Activations & Experiential Marketing", cap3Desc: "Dynamic physical experiences that transform brand messages into memorable interactions, building authentic connections between brands and audiences.",
    cap4Title: "VIP Events & Protocol Experiences", cap4Desc: "Highly curated environments designed for distinguished guests, executive audiences, diplomatic engagements, and royal protocol requirements, delivered with discretion and precision.",

    methodology: "Methodology",
    artOfExec: "The Art of Execution.",
    methodDesc: "Exceptional experiences are never accidental. They are meticulously engineered. Our methodology combines strategic planning, creative innovation, and operational discipline to ensure every event unfolds with confidence and clarity.",

    step1Vol: "01", step1Title: "Strategy & Experience Architecture", step1Desc: "We begin by understanding objectives, audiences, venues, and operational realities. Through this process, we develop a cohesive experience framework that aligns vision with execution.",
    step2Vol: "02", step2Title: "Design Development & Technical Integration", step2Desc: "Creative concepts are translated into detailed production plans, integrating staging, audiovisual systems, lighting design, content creation, and spatial experiences into a unified ecosystem.",
    step3Vol: "03", step3Title: "Live Production & Event Command", step3Desc: "Our teams oversee every aspect of deployment, directing operations in real time and ensuring flawless coordination from opening moment to final applause.",

    archiveTitle: "A Portfolio of Experiences",
    selectDeps: "Selected Works",
    archiveDesc: "Each project represents a unique challenge, a distinct vision, and a commitment to transforming ideas into unforgettable realities.",
    caseStudy: "Event Case Study",
    archiveIndex: "Archive_0",

    ctaTitle: "Ready to Create Something Extraordinary?",
    ctaDesc: "Whether you are launching a brand, hosting a global conference, producing a landmark celebration, or creating an immersive public experience, our team is ready to bring your vision to life. Let’s build an experience that people remember long after the lights go down.",
    ctaBtn: "Return to Core System",

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
    mainGrid: "القائمة_الرئيسية",
    langToggle: "EN",
    title: "الفعاليات",
    subtitle: "نصنع تجارب تترك صدى. وبيئات تدوم.",
    globalReach: "وصول عالمي. ذكاء إقليمي.",
    heroDesc: "من مقرنا الرئيسي في البحرين إلى وجهات في جميع أنحاء العالم، نصمم ونقدم تجارب فعاليات استثنائية تتجاوز الجغرافيا والتوقعات.",
    philosophy: "منظورنا",
    overview: "نؤمن بأن كل فعالية أكثر من مجرد تجمع — إنها لحظة تأثير، ومنصة للتواصل، وفرصة لخلق أثر دائم. من خلال التفكير الاستراتيجي والابتكار الإبداعي والتنفيذ الخالي من العيوب، نحوّل المساحات إلى قصص والجماهير إلى مشاركين.",

    perspectiveTitle: "هندسة اللحظات التي تهم.",
    perspectiveText: "أكثر الفعاليات التي لا تُنسى لا تُقاس بعدد الحضور وحده، بل بالمشاعر التي تثيرها، والحوارات التي تلهمها، والانطباعات التي تتركها. في كلرز، نتصور ونصمم وننفذ تجارب عالية التأثير تشرك الجماهير على مستوى أعمق. من قمم القيادة والمراسم الحكومية إلى المهرجانات العامة وإطلاق المنتجات والاحتفالات واسعة النطاق، ننسق كل التفاصيل بهدف ودقة.",
    perspectiveNote: "يتم التعامل مع كل مشروع كسرد فريد — مصمم بعناية ليعكس رؤيتك، ويعزز علامتك التجارية، ويخلق روابط إنسانية هادفة.",

    coreCompetencies: "تصميم وتنفيذ الفعاليات",
    eventArch: "من الرؤية إلى الواقع.",
    eventArchDesc: "بالجمع بين التوجيه الإبداعي والخبرة التقنية والتميز التشغيلي، نقدم فعاليات مقنعة بصريًا وفعّالة استراتيجيًا.",

    cap1Title: "المؤتمرات المؤسسية وقمم القيادة", cap1Desc: "بيئات مصممة لغرض محدد تعزز الحوار، وتلهم التعاون، وترتقي بالحضور المؤسسي من خلال تنفيذ سلس وتصميم مدروس.",
    cap2Title: "الحفلات والمهرجانات والتجارب العامة", cap2Desc: "إنتاجات واسعة النطاق تتميز بمسارح متقدمة وتقنيات غامرة واستراتيجيات إشراك الجمهور وإدارة تشغيلية دقيقة.",
    cap3Title: "تنشيط العلامات التجارية والتسويق التجريبي", cap3Desc: "تجارب مادية ديناميكية تحوّل رسائل العلامة التجارية إلى تفاعلات لا تُنسى، وتبني روابط أصيلة بين العلامات والجماهير.",
    cap4Title: "فعاليات كبار الشخصيات وتجارب البروتوكول", cap4Desc: "بيئات منسقة بعناية فائقة مصممة للضيوف المميزين والجماهير التنفيذية والمشاركات الدبلوماسية ومتطلبات البروتوكول الملكي، تُقدَّم بتكتم ودقة.",

    methodology: "المنهجية",
    artOfExec: "فن التنفيذ.",
    methodDesc: "التجارب الاستثنائية لا تحدث بالصدفة أبدًا. بل تُهندَس بدقة متناهية. تجمع منهجيتنا بين التخطيط الاستراتيجي والابتكار الإبداعي والانضباط التشغيلي لضمان أن تتكشف كل فعالية بثقة ووضوح.",

    step1Vol: "01", step1Title: "الاستراتيجية وهندسة التجربة", step1Desc: "نبدأ بفهم الأهداف والجماهير والأماكن والواقع التشغيلي. من خلال هذه العملية، نطور إطار تجربة متماسكًا يوائم الرؤية مع التنفيذ.",
    step2Vol: "02", step2Title: "تطوير التصميم والتكامل التقني", step2Desc: "تُترجم المفاهيم الإبداعية إلى خطط إنتاج مفصلة، تدمج المسارح وأنظمة الصوت والصورة وتصميم الإضاءة وإنشاء المحتوى والتجارب المكانية في منظومة موحدة.",
    step3Vol: "03", step3Title: "الإنتاج المباشر وقيادة الفعالية", step3Desc: "تشرف فرقنا على كل جانب من جوانب التنفيذ، وتوجه العمليات في الوقت الفعلي، وتضمن تنسيقًا لا تشوبه شائبة من اللحظة الافتتاحية إلى التصفيق الأخير.",

    archiveTitle: "محفظة من التجارب",
    selectDeps: "أعمال مختارة",
    archiveDesc: "يمثل كل مشروع تحديًا فريدًا، ورؤية مميزة، والتزامًا بتحويل الأفكار إلى حقائق لا تُنسى.",
    caseStudy: "دراسة حالة لفعالية",
    archiveIndex: "أرشيف_0",

    ctaTitle: "مستعد لصنع شيء استثنائي؟",
    ctaDesc: "سواء كنت تطلق علامة تجارية، أو تستضيف مؤتمرًا عالميًا، أو تنتج احتفالًا بارزًا، أو تبتكر تجربة عامة غامرة، فإن فريقنا مستعد لتحويل رؤيتك إلى واقع. لنبنِ تجربة يتذكرها الناس طويلًا بعد أن تنطفئ الأضواء.",
    ctaBtn: "العودة إلى النظام الأساسي",

    // gallery / pagination
    viewInsta: "عرض على إنستغرام",
    showing: "عرض",
    of: "من",
    loadMore: "تحميل المزيد",
    loadingMore: "جاري التحميل",
    allLoaded: "لقد وصلت إلى النهاية",
    projects: "مشروع",
};

const THEME_COLOR = "#E11D48"; // Rose Red
const HERO_IMAGE = "/insta/events.jpeg";

const CAPABILITIES_IMAGES = [
    "/insta/ee1.jpeg",
    "/insta/ee2.jpeg",
    "/insta/ee3.jpeg",
    "/insta/ee4.jpeg"
];

/* ------------------------------------------------------------------
   EVENTS PORTFOLIO — same data source & image paths as the "Our Work"
   page (folder /ev, files ev1.png, ev2.png ... in source order), so
   the gallery here always mirrors that catalogue 1:1.
------------------------------------------------------------------- */
interface SourceItem {
    url: string;
    title?: string;
    titleAr?: string;
}

const EVENT_ITEMS: SourceItem[] = [
    { url: "https://www.instagram.com/p/DQBWzOSFcsX/", title: "The Third Edition of Fintech Forward", titleAr: "النسخة الثالثة من فينتك فوروارد" },
    { url: "https://www.instagram.com/p/Dbm-DHYlC3S/", title: "Talabat Annual Riders Appreciation", titleAr: "حفل تقدير سائقي طلبات السنوي" },
    { url: "https://www.instagram.com/p/DaZ0KajFeZG/?img_index=1", title: "The Avenues Fan Zone", titleAr: "منطقة المشجعين في أفنيوز" },
    { url: "https://www.instagram.com/p/DaSLpqLDDG2/?img_index=1", title: "F1 Pre-Season Testing Hospitality Lounge 2026", titleAr: "صالة ضيافة اختبارات ما قبل الموسم للفورمولا 1، 2026" },
    { url: "https://www.instagram.com/p/DN5e_E4AncG/?img_index=1", title: "Back to School Activation at Marassi Galleria", titleAr: "فعالية العودة إلى المدارس في مراسي غاليريا" },
    { url: "https://www.instagram.com/p/DMFZjwBvFa0/", title: "The Avenues SHOP & WIN 2025", titleAr: "تسوّق واربح في أفنيوز 2025" },
    { url: "https://www.instagram.com/p/DKJmnNgK5oU/", title: "Super Hero Camp at Marassi Galleria", titleAr: "معسكر الأبطال الخارقين في مراسي غاليريا" },
    { url: "https://www.instagram.com/p/DJqwabbIZH4/", title: "Bank ABC — Staff Ghabga 2025", titleAr: "بنك ABC — غبقة الموظفين 2025" },
    { url: "https://www.instagram.com/p/DIibQO0M5H2/", title: "Gulf Air Hospitality Lounge, BIC F1 2025 Paddock Club", titleAr: "صالة ضيافة طيران الخليج، نادي بادوك BIC F1 2025" },
    { url: "https://www.instagram.com/p/DIa_up-MEKj/", title: "F1 Pre-Season Testing Hospitality", titleAr: "ضيافة اختبارات ما قبل الموسم للفورمولا 1" },
    { url: "https://www.instagram.com/p/DGsnkUBCx6T/", title: "Tamkeen Mashroo3i Demo Day 2025", titleAr: "يوم عرض مشروعي — تمكين 2025" },
    { url: "https://www.instagram.com/p/DF7kcPYM8Y1/", title: "Jotun's Nuances 2025", titleAr: "فعالية نوانسز — جوتن 2025" },
    { url: "https://www.instagram.com/p/DEOxQZUCU1-/?img_index=1", title: "The Avenues Winterland 2024", titleAr: "وينترلاند في أفنيوز 2024" },
    { url: "https://www.instagram.com/p/DBdNtAnMtiq/", title: "Fintech Forward 2024", titleAr: "فينتك فوروارد 2024" },
    { url: "https://www.instagram.com/p/C5NhAQ_sXCV/?img_index=1", title: "Ramadan Décor at Exhibition World", titleAr: "ديكور رمضان في إكزيبيشن وورلد" },
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

// Builds the Project[] straight from EVENT_ITEMS, in the exact order the
// files appear in /public/ev (index 0 => ev1.png), identical to the
// "Our Work" page's Events section.
function buildEventProjects(items: SourceItem[]): Project[] {
    return items.map((item, i) => {
        const n = i + 1;
        const num = String(n).padStart(2, "0");
        return {
            id: n,
            title: item.title ?? `Events ${num}`,
            titleAr: item.titleAr ?? `الفعاليات ${num}`,
            subtitle: "Event Production",
            subAr: "إنتاج الفعاليات",
            img: `/ev/ev${n}.png`,
            href: item.url,
            code: `EV-${num}`,
        };
    });
}

const EVENT_PROJECTS: Project[] = buildEventProjects(EVENT_ITEMS);

// How many tiles render on first paint, and per "load more" batch
const PAGE_SIZE = 10;

// --- SEO: Structured data (JSON-LD) ---
const STRUCTURED_DATA = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Event Design & Delivery",
    provider: {
        "@type": "Organization",
        name: "Colours Bahrain",
        url: "https://coloursbahrain.com",
        areaServed: ["Bahrain", "GCC", "Worldwide"]
    },
    description:
        "From our headquarters in Bahrain to destinations across the world, Colours designs and delivers exceptional event experiences that transcend geography and expectations.",
    hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Event Design & Delivery",
        itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Corporate Conferences & Leadership Summits" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Concerts, Festivals & Public Experiences" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brand Activations & Experiential Marketing" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "VIP Events & Protocol Experiences" } }
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

export default function EventsPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(true);
 const [isAr, setIsAr] = useState(() => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("colours_lang") === "ar";
    }
    return false;
});
    // Gallery pagination (same pattern as "Our Work")
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

    const visibleProjects = EVENT_PROJECTS.slice(0, visibleCount);
    const hasMore = visibleCount < EVENT_PROJECTS.length;
    const remaining = EVENT_PROJECTS.length - visibleCount;

    const handleLoadMore = () => {
        if (loadingMore) return;
        setLoadingMore(true);
        window.setTimeout(() => {
            setVisibleCount((c) => Math.min(c + PAGE_SIZE, EVENT_PROJECTS.length));
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
            id="colours-events-structured-data"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />

        <main ref={containerRef} className={`bg-[#050505] h-screen w-full text-white font-sans selection:bg-rose-500/30 overflow-y-auto overflow-x-hidden relative scroll-smooth custom-scrollbar ${isAr ? 'dir-rtl' : 'dir-ltr'}`} dir={isAr ? "rtl" : "ltr"} lang={isAr ? "ar" : "en"}>

            {/* 0. HIGHLY VISIBLE DOT GRID BACKGROUND */}
            <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
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
            <section className="relative h-[85svh] md:h-[100svh] w-full overflow-hidden flex items-end pb-12 md:pb-24 px-6 md:px-12 lg:px-24 shrink-0" aria-labelledby="events-hero-heading">

                {/* Parallax Image */}
                <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 z-0" aria-hidden="true">
                    <Image
                        src={HERO_IMAGE}
                        alt="Colours Bahrain — large-scale event experience"
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
                        <h1 id="events-hero-heading" className="text-[14vw] md:text-[10vw] lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] text-white mix-blend-plus-lighter drop-shadow-2xl">
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
                                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: THEME_COLOR }} aria-hidden="true" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">{t.globalReach}</span>
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

            {/* 3. OVERVIEW & PERSPECTIVE */}
            <section className="relative z-20 py-24 md:py-32 px-6 md:px-12 lg:px-24 shrink-0 border-t border-white/10 bg-black/40 backdrop-blur-sm" aria-labelledby="perspective-heading">
                <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 lg:gap-24 items-start">

                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                        className="lg:col-span-7 flex flex-col"
                    >
                        <span id="perspective-heading" className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8" style={{ color: THEME_COLOR }}>{t.philosophy}</span>
                        <p className="text-2xl md:text-4xl font-light text-white/90 leading-snug md:leading-snug">
                            {t.overview}
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                        className="lg:col-span-5 flex flex-col gap-6 border-t border-white/10 pt-10 lg:border-t-0 lg:pt-0"
                    >
                        <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-white">{t.perspectiveTitle}</h2>
                        <p className="text-sm md:text-base text-white/70 leading-relaxed font-light">
                            {t.perspectiveText}
                        </p>
                        <p className="text-sm md:text-base text-white/60 leading-relaxed font-light border-t border-white/10 pt-6">
                            {t.perspectiveNote}
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
                            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-white drop-shadow-md">{t.eventArch}</h2>
                        </div>
                        <p className={`text-xs font-light text-white/50 tracking-wide max-w-sm leading-relaxed ${isAr ? 'md:text-left' : 'md:text-right'}`}>
                            {t.eventArchDesc}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {[
                            { title: t.cap1Title, desc: t.cap1Desc, image: CAPABILITIES_IMAGES[0] },
                            { title: t.cap2Title, desc: t.cap2Desc, image: CAPABILITIES_IMAGES[1] },
                            { title: t.cap3Title, desc: t.cap3Desc, image: CAPABILITIES_IMAGES[2] },
                            { title: t.cap4Title, desc: t.cap4Desc, image: CAPABILITIES_IMAGES[3] }
                        ].map((cap, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] min-h-[400px] flex flex-col justify-end"
                            >
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={cap.image}
                                        alt={`${cap.title} — Colours Bahrain events`}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        loading="lazy"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-90"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                                </div>

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
                            {t.artOfExec}
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

            {/* 6. EDITORIAL MASONRY GALLERY — same design/tile as "Our Work" (Events data only) */}
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
                                <EventTile key={project.id} project={project} index={i} priority={i < 4} />
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* LOAD MORE */}
                    {EVENT_PROJECTS.length > PAGE_SIZE && (
                        <div className="flex flex-col items-center gap-6 mt-16 md:mt-20">
                            <div className="w-full max-w-xs h-[2px] bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-rose-400 via-white to-rose-400"
                                    initial={false}
                                    animate={{ width: `${Math.min((Math.min(visibleCount, EVENT_PROJECTS.length) / EVENT_PROJECTS.length) * 100, 100)}%` }}
                                    transition={{ duration: 0.6, ease: customEase }}
                                />
                            </div>

                            <p className="text-[10px] uppercase tracking-widest text-white/40 font-mono">
                                {t.showing} {Math.min(visibleCount, EVENT_PROJECTS.length)} {t.of} {EVENT_PROJECTS.length} {t.projects}
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

// --- EVENT GALLERY TILE (identical design language to the "Our Work" GalleryTile) ---
function EventTile({
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
            className="group relative block w-full mb-1.5 md:mb-2 break-inside-avoid overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] cursor-pointer shadow-lg transition-shadow duration-500 hover:shadow-2xl hover:shadow-rose-500/30"
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
            <div className={`absolute top-0 ${isAr ? "right-0" : "left-0"} h-full w-[3px] bg-gradient-to-b from-rose-400 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            {/* --- HEADER ROW (always visible) --- */}
            <div className="absolute top-0 inset-x-0 flex items-start justify-between gap-2 p-3 md:p-4">
                <div className="min-w-0 flex items-center gap-1.5 px-2 py-1 md:px-2.5 md:py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 shrink-0">
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 shrink-0" />
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