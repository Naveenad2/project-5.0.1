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
    Globe, Compass, Asterisk
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
    ctaBtn: "Return to Core System"
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
    ctaBtn: "العودة إلى النظام الأساسي"
};

const THEME_COLOR = "#E11D48"; // Rose Red
const HERO_IMAGE = "/insta/events.jpeg";

const CAPABILITIES_IMAGES = [
    "/insta/image2.png",
    "/insta/image3.png",
    "/insta/image4.png",
    "/insta/image5.png"
];

const GALLERY_IMAGES = [
    "/insta/image1.png", "/insta/image2.png", "/insta/image3.png",
    "/insta/image4.png", "/insta/image5.png", "/insta/image6.png", "/insta/image7.png"
];

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

// Context for App-wide Language State
const LangContext = createContext({ isAr: false, toggleLang: () => {}, t: TEXT_EN });

export default function EventsPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(true);
    const [isAr, setIsAr] = useState(false);

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
    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest mt-[1px]">(EN/AR)</span>
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

            {/* 6. EDITORIAL GALLERY */}
            <section className="py-24 md:py-40 px-4 md:px-12 lg:px-24 shrink-0 border-t border-white/10" aria-labelledby="portfolio-heading">
                <div className="max-w-[1800px] mx-auto">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col items-center text-center mb-16 md:mb-24">
                        <Compass size={24} className="mb-6" style={{ color: THEME_COLOR }} aria-hidden="true" />
                        <span className="text-[10px] font-mono text-white/50 mb-4 tracking-[0.3em] uppercase">{t.selectDeps}</span>
                        <h2 id="portfolio-heading" className="text-4xl md:text-7xl font-medium tracking-tighter text-white drop-shadow-md mb-6">{t.archiveTitle}</h2>
                        <p className="text-sm md:text-lg font-light text-white/60 leading-relaxed max-w-2xl">{t.archiveDesc}</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[250px] md:auto-rows-[350px] gap-3 md:gap-5">
                        {GALLERY_IMAGES.map((src, i) => {
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
                                        src={src} alt={`Colours Bahrain event case study ${i + 1}`} fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        loading="lazy"
                                        className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105 will-change-transform opacity-80 group-hover:opacity-100"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />

                                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                                        <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out flex items-end justify-between">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[9px] font-bold uppercase tracking-widest text-white">{t.caseStudy}</span>
                                                <span className="text-[10px] font-mono text-white/60 tracking-widest uppercase">{t.archiveIndex}{i + 1}</span>
                                            </div>
                                            <div className={`w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-300 shadow-xl ${isAr ? 'group-hover:-rotate-45' : 'group-hover:rotate-45'}`} aria-hidden="true">
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