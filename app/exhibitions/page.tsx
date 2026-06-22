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
    ctaBtn: "Return to Home"
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
    ctaBtn: "العودة للرئيسية"
};

const THEME_COLOR = "#8B5CF6"; // Electric Violet
const HERO_IMAGE = "/insta/exhibitions.jpeg";

const CAPABILITIES_IMAGES = [
    "/insta/image6.png",
    "/insta/image7.png",
    "/insta/image8.png",
    "/insta/image9.png"
];

const GALLERY_IMAGES = [
    "/insta/image2.png", "/insta/image3.png", "/insta/image4.png",
    "/insta/image5.png", "/insta/image6.png", "/insta/image7.png", "/insta/image8.png"
];

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

// Context for App-wide Language State
const LangContext = createContext({ isAr: false, toggleLang: () => {}, t: TEXT_EN });

export default function ExhibitionsPage() {
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
    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest mt-[1px]">(EN/AR)</span>
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
                                        src={cap.image}
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
                                        src={src} alt={`Colours Bahrain exhibition project ${i + 1}`} fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        loading="lazy"
                                        className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105 will-change-transform opacity-80 group-hover:opacity-100"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />

                                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                                        <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out flex items-end justify-between">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[9px] font-bold uppercase tracking-widest text-white">{t.caseStudy}</span>
                                                <span className="text-[10px] font-mono text-white/60 tracking-widest uppercase">{t.archiveIndex} {i + 1}</span>
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