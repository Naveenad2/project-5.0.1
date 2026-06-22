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
    Globe, Compass, Asterisk, Target,
    Users, Trophy, Zap, Hexagon, Sparkles,
    Aperture, MousePointer2, Fingerprint, X,
    Mail, Copy, Check, Phone, Facebook,
    Instagram, Monitor, Box, MapPin,
    CornerDownRight, Command, Eye, Flag,
    Leaf, Globe2, Lightbulb, Menu, Info,
    Bot, User, Send, ArrowRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { ColoursLogoHeader } from "@/components/ui/ColoursLogoHeader";
import React from "react";

// --- BILINGUAL DICTIONARY (Content sourced verbatim from brand document) ---
const TEXT_EN = {
    return: "Return",
    mainGrid: "MAIN_GRID",
    est: "20+ Years of Excellence // Bahrain",
    active: "GCC // EUROPE // WORLDWIDE REACH",
    design: "DESIGN.",
    build: "BUILD.",
    deliver: "ELEVATE.",
    desc: "We create immersive environments, transformative brand experiences, and world-class events that move people and businesses forward. Headquartered in Bahrain with a global outlook, Colours Bahrain delivers end-to-end event, exhibition, and spatial solutions across the GCC and beyond.",
    scroll: "Scroll to Explore",

    // Capabilities
    cap1: "Event Experiences", cap1Desc: "From concept development to live execution, we transform ideas into unforgettable environments designed to inspire engagement and human connection.",
    cap2: "Exhibition Stand Design & Build", cap2Desc: "Custom-built exhibition stands engineered with precision, innovation, and in-house manufacturing capabilities to deliver impactful brand presence on a global stage.",
    cap3: "Project & Event Management", cap3Desc: "Seamless coordination, operational excellence, and meticulous oversight — ensuring every detail performs flawlessly from inception to completion.",
    cap4: "AV & Immersive Solutions", cap4Desc: "Advanced LED displays, integrated sound systems, digital storytelling, and immersive content designed to captivate audiences.",

    // Mission & Vision
    mvTitle: "Core Directives",
    missionTitle: "Our Mission",
    missionText: "To craft exceptional experiences that inspire connection, amplify brands, and create meaningful impact. Through innovation, strategic thinking, and uncompromising attention to detail, we deliver integrated event and exhibition solutions that transcend expectations and transform visions into reality.",
    visionTitle: "Our Vision",
    visionText: "To redefine the future of experiential design and event management through creativity, innovation, and world-class execution. We envision a world where every environment we create becomes a catalyst for conversation, engagement, and lasting human experiences — shaping industries, communities, and global brands alike.",

    // Core Values & Goals
    goalsTitle: "Core Values & Goals",
    goal1: "Excellence Without Compromise", goal1Desc: "Delivering seamless, high-impact experiences with precision at every stage.",
    goal2: "Enduring Partnerships", goal2Desc: "Building trusted, long-term relationships with clients, collaborators, and global partners.",
    goal3: "Innovation in Motion", goal3Desc: "Continuously evolving through emerging technologies, creative thinking, and adaptive strategies.",
    goal4: "Sustainable Thinking", goal4Desc: "Integrating environmentally conscious practices into modern event and exhibition production.",
    goal5: "Global Expansion", goal5Desc: "Extending our reach across new markets while diversifying creative and operational capabilities.",

    // Operational Methodology
    opLogic: "Operational Methodology",
    processTitle: "Precision in Every Dimension.",
    processDesc: "We do not simply construct spaces — we engineer experiences. Our integrated methodology combines strategic intelligence, creative direction, and industrial-grade production capabilities to ensure flawless delivery at any scale.",
    step1: "Strategy & Spatial Intelligence", step1Desc: "Understanding audience behavior, technical requirements, and environmental dynamics to engineer impactful experiential solutions.",
    step2: "Custom Fabrication & Production", step2Desc: "Precision manufacturing and detail-driven production executed through our advanced in-house facility in Bahrain.",
    step3: "Live Deployment & Execution", step3Desc: "Real-time operational management, on-site coordination, and flawless activation delivery under dynamic event conditions.",

    // Gallery / Portfolio
    visualArchive: "Visual Archive",
    portfolioTitle: "Selected Works",
    portfolioDesc: "A curated showcase of immersive environments, exhibition architecture, and experiential activations engineered across industries and international markets.",
    index: "Index",
    viewConcept: "View Concept",

    // Partners & Network
    trustedPartners: "Trusted By Visionaries, Brands & Institutions",
    globalUplink: "Headquarters Section",
    hq: "Global Presence. Local Precision.",
    hqIntro: "Operating from Bahrain with an expanding international network, Colours Bahrain delivers globally aligned standards with regionally rooted expertise.",
    secureLine: "Secure Line",
    physCoords: "Physical Coordinates",
    bahrainHq: "Bahrain HQ",
    saudiBase: "Saudi Location",
    saudiAddress: "Bldg: 7073, Street : Abaad Ibn Abbar, Sinaiyah Al awaziyah, Khobar, KSA",
    address: "Unit 7, Building 2568, Road 4450, Block 744, Manama, Kingdom of Bahrain",
    online: "ONLINE",
    philosophy: "Philosophy",
    overview: "With over two decades of industry expertise, we merge strategy, design, technology, and precision execution to craft experiences that leave a lasting impression. We do not simply construct spaces — we engineer experiences.",

    // Navigation & Omni Modal
    about: "About Colours",
    gallery: "Our Work",
    talk: "Talk To Us",
    uplink: "Direct Uplink",
    traditional: "Traditional",
    neural: "Neural Agent",
    aiAssist: "AI Assistant",
    serverOn: "Server Online",
    latency: "Latency: 12ms \nEncryption: AES-256",
    dossier: "Submit your dossier. Our strategy team will intercept.",
    identity: "Identity",
    nameOrg: "Name / Organization",
    coords: "Coordinates",
    emailAddr: "Email Address",
    brief: "Briefing",
    outline: "Outline mission parameters...",
    transmit: "Transmit Data",
    neuralInt: "Neural Interface",
    listening: "Listening",
    aiGreeting: "Systems online. I am the Colours Interface. How can we engineer your next experience?",
    aiReply: "Signal received. I've flagged this for our creative directors. Would you like to upload a project brief?",
    enterCmd: "Enter command...",

    // Footer & Modal Configs
    readyToDeploy: "Ready to Create Something Exceptional?",
    initProject: "Initiate Your Project",
    developedBy: "Developed by WhitehillsIntl",
    rights: "All rights reserved.",
    sysUplink: "Secure Uplink // Active",
    dialogue: "Let’s Begin a Conversation.",
    contactDesc: "Whether you are launching a brand, building an immersive exhibition, or orchestrating a large-scale event, our team is ready to transform ambition into reality. Copy the email below to get in touch.",
    official: "Official Inquiries",
    copy: "COPY EMAIL",
    copied: "COPIED"
};

const TEXT_AR = {
    return: "عودة",
    mainGrid: "القائمة_الرئيسية",
    est: "أكثر من 20 عامًا من التميز // البحرين",
    active: "دول الخليج // أوروبا // حضور عالمي",
    design: "تصميم.",
    build: "بناء.",
    deliver: "ارتقاء.",
    desc: "نبتكر بيئات غامرة، وتجارب علامات تجارية تحويلية، وفعاليات عالمية المستوى تدفع الأفراد والشركات نحو الأمام. مقرها البحرين مع رؤية عالمية، تقدم كلرز البحرين حلولاً متكاملة للفعاليات والمعارض والمساحات في جميع أنحاء دول مجلس التعاون الخليجي وخارجها.",
    scroll: "قم بالتمرير للاستكشاف",

    cap1: "تجارب الفعاليات", cap1Desc: "من تطوير الفكرة إلى التنفيذ المباشر، نحوّل الأفكار إلى بيئات لا تُنسى مصممة لإلهام التفاعل والتواصل الإنساني.",
    cap2: "تصميم وبناء أجنحة المعارض", cap2Desc: "أجنحة معارض مصممة خصيصًا بدقة وابتكار وقدرات تصنيع داخلية لتقديم حضور مؤثر للعلامة التجارية على المسرح العالمي.",
    cap3: "إدارة المشاريع والفعاليات", cap3Desc: "تنسيق سلس، وتميز تشغيلي، وإشراف دقيق — لضمان أداء كل التفاصيل بشكل لا تشوبه شائبة من البداية إلى النهاية.",
    cap4: "حلول الصوت والصورة والحلول الغامرة", cap4Desc: "شاشات LED متقدمة، وأنظمة صوت متكاملة، وسرد رقمي، ومحتوى غامر مصمم لأسر الجماهير.",

    mvTitle: "الموجهات الأساسية",
    missionTitle: "مهمتنا",
    missionText: "صياغة تجارب استثنائية تلهم التواصل، وتعزز العلامات التجارية، وتصنع تأثيرًا هادفًا. من خلال الابتكار والتفكير الاستراتيجي والاهتمام الذي لا يقبل المساومة بالتفاصيل، نقدم حلولاً متكاملة للفعاليات والمعارض تتجاوز التوقعات وتحوّل الرؤى إلى واقع.",
    visionTitle: "رؤيتنا",
    visionText: "إعادة تعريف مستقبل التصميم التجريبي وإدارة الفعاليات من خلال الإبداع والابتكار والتنفيذ عالمي المستوى. نتصور عالمًا تصبح فيه كل بيئة نبتكرها حافزًا للحوار والتفاعل والتجارب الإنسانية الدائمة — تشكل الصناعات والمجتمعات والعلامات التجارية العالمية على حد سواء.",

    goalsTitle: "القيم والأهداف الأساسية",
    goal1: "التميز دون مساومة", goal1Desc: "تقديم تجارب سلسة وعالية التأثير بدقة في كل مرحلة.",
    goal2: "شراكات دائمة", goal2Desc: "بناء علاقات موثوقة وطويلة الأمد مع العملاء والمتعاونين والشركاء العالميين.",
    goal3: "الابتكار في حركة", goal3Desc: "التطور المستمر من خلال التقنيات الناشئة والتفكير الإبداعي والاستراتيجيات المرنة.",
    goal4: "التفكير المستدام", goal4Desc: "دمج الممارسات الواعية بيئيًا في إنتاج الفعاليات والمعارض الحديثة.",
    goal5: "التوسع العالمي", goal5Desc: "توسيع نطاقنا عبر أسواق جديدة مع تنويع القدرات الإبداعية والتشغيلية.",

    opLogic: "المنهجية التشغيلية",
    processTitle: "دقة في كل بُعد.",
    processDesc: "نحن لا نبني المساحات فحسب — بل نهندس التجارب. تجمع منهجيتنا المتكاملة بين الذكاء الاستراتيجي والتوجيه الإبداعي وقدرات الإنتاج الصناعي لضمان تنفيذ لا تشوبه شائبة على أي نطاق.",
    step1: "الاستراتيجية والذكاء المكاني", step1Desc: "فهم سلوك الجمهور والمتطلبات التقنية والديناميكيات البيئية لهندسة حلول تجريبية مؤثرة.",
    step2: "التصنيع والإنتاج المخصص", step2Desc: "تصنيع دقيق وإنتاج قائم على التفاصيل يُنفَّذ عبر منشأتنا الداخلية المتطورة في البحرين.",
    step3: "النشر والتنفيذ المباشر", step3Desc: "إدارة تشغيلية فورية، وتنسيق ميداني، وتنفيذ فعاليات لا تشوبه شائبة في ظل ظروف ديناميكية.",

    visualArchive: "الأرشيف البصري",
    portfolioTitle: "أعمال مختارة",
    portfolioDesc: "عرض منسق لبيئات غامرة، وهندسة معارض، وفعاليات تجريبية تم تصميمها وتنفيذها عبر مختلف القطاعات والأسواق الدولية.",
    index: "فهرس",
    viewConcept: "عرض المفهوم",

    trustedPartners: "موثوق به من قبل أصحاب الرؤى والعلامات التجارية والمؤسسات",

    globalUplink: "قسم المقر الرئيسي",
    hq: "حضور عالمي. دقة محلية.",
    hqIntro: "نعمل من البحرين مع شبكة دولية متنامية، وتقدم كلرز البحرين معايير متوائمة عالميًا مع خبرة متجذرة إقليميًا.",
    secureLine: "الخط الآمن",
    physCoords: "الإحداثيات المادية",
    bahrainHq: "مقر البحرين",
    saudiBase: "موقع السعودية",
    saudiAddress: "مبنى: 7073، شارع: عباد بن عبار، الصناعية العوازية، الخبر، المملكة العربية السعودية",
    address: "الوحدة 7، مبنى 2568، طريق 4450، مجمع 744، المنامة، مملكة البحرين",
    online: "متصل",
    philosophy: "فلسفتنا",
    overview: "بخبرة تمتد لأكثر من عقدين في هذا المجال، ندمج الاستراتيجية والتصميم والتكنولوجيا والتنفيذ الدقيق لصياغة تجارب تترك انطباعًا دائمًا. نحن لا نبني المساحات فحسب — بل نهندس التجارب.",

    about: "عن كلرز",
    gallery: "أعمالنا",
    talk: "تحدث إلينا",
    uplink: "اتصال مباشر",
    traditional: "تقليدي",
    neural: "الوكيل العصبي",
    aiAssist: "مساعد ذكي",
    serverOn: "الخادم متصل",
    latency: "زمن الاستجابة: 12ms \nالتشفير: AES-256",
    dossier: "أرسل ملفك. سيقوم فريق الاستراتيجية لدينا بالاستلام.",
    identity: "الهوية",
    nameOrg: "الاسم / المنظمة",
    coords: "الإحداثيات",
    emailAddr: "البريد الإلكتروني",
    brief: "الموجز",
    outline: "حدد معالم المهمة...",
    transmit: "إرسال البيانات",
    neuralInt: "الواجهة العصبية",
    listening: "يستمع",
    aiGreeting: "الأنظمة متصلة. أنا واجهة كلرز. كيف يمكننا هندسة تجربتك القادمة؟",
    aiReply: "تم استلام الإشارة. لقد قمنا بتحويل هذا إلى مديرينا المبدعين. هل ترغب في تحميل موجز المشروع؟",
    enterCmd: "أدخل الأمر...",

    readyToDeploy: "مستعد لصنع شيء استثنائي؟",
    initProject: "ابدأ مشروعك",
    developedBy: "تم التطوير بواسطة WhitehillsIntl",
    rights: "جميع الحقوق محفوظة.",
    sysUplink: "رابط آمن // نشط",
    dialogue: "لنبدأ الحوار.",
    contactDesc: "سواء كنت تطلق علامة تجارية، أو تبني معرضًا غامرًا، أو تنظم فعالية واسعة النطاق، فإن فريقنا مستعد لتحويل الطموح إلى واقع. انسخ البريد الإلكتروني أدناه للتواصل معنا.",
    official: "الاستفسارات الرسمية",
    copy: "نسخ البريد",
    copied: "تم النسخ"
};

// --- DATA CONFIGURATION & ANIMATIONS ---

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
    "/insta/image4.png", "/insta/image5.png", "/insta/image6.png",
    "/insta/image7.png"
];

const CAPABILITIES_DATA = [
    { idTitle: "cap1", idDesc: "cap1Desc", icon: Box },
    { idTitle: "cap2", idDesc: "cap2Desc", icon: Sparkles },
    { idTitle: "cap3", idDesc: "cap3Desc", icon: Aperture },
    { idTitle: "cap4", idDesc: "cap4Desc", icon: Fingerprint }
];

const PROCESS_DATA = [
    { step: "01", idTitle: "step1", idDesc: "step1Desc" },
    { step: "02", idTitle: "step2", idDesc: "step2Desc" },
    { step: "03", idTitle: "step3", idDesc: "step3Desc" }
];

// UPDATED LOGOS ARRAY WITH SVGS
const CLIENTS = [
    { name: "Bahrain EDB", logo: "/logos/edb.svg" },
    { name: "Gulf Air", logo: "/logos/gulfair.svg" },
    { name: "DO & CO", logo: "/logos/DOCO.png" },
    { name: "The Avenues", logo: "/logos/avenues.svg" },
    { name: "Seef Mall", logo: "/logos/seef.png" },
    { name: "BIC", logo: "/logos/bic.svg" },
    { name: "Tamkeen", logo: "/logos/tamkeen.png" },
    { name: "Marassi", logo: "/logos/marassi.png" },
    { name: "Edamah", logo: "/logos/edamah.svg" },
    { name: "Alba", logo: "/logos/alba.svg" },
    { name: "Bapco", logo: "/logos/bapco.svg" }
];

const CONTACT_INFO = {
    phone: "+973 17295917",
    address: "Unit 07, Building 2568, Road 4450, Block 744, A'ali, Bahrain",
    email: "info@coloursbahrain.com",
    instagram: "https://www.instagram.com/colours.bahrain/?hl=en",
    facebook: "https://www.facebook.com/ColoursEventsBahrain?_rdc=1&_rdr"
};

// --- SEO: Structured data (JSON-LD) ---
const STRUCTURED_DATA = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Colours Bahrain",
    url: "https://coloursbahrain.com",
    email: CONTACT_INFO.email,
    telephone: CONTACT_INFO.phone,
    foundingDate: "2000",
    slogan: "Design. Build. Elevate.",
    description:
        "Colours Bahrain delivers end-to-end event, exhibition, and spatial solutions across the GCC and beyond, merging strategy, design, technology, and precision execution.",
    areaServed: ["Bahrain", "GCC", "Europe", "Worldwide"],
    knowsAbout: [
        "Event Experiences",
        "Exhibition Stand Design & Build",
        "Project & Event Management",
        "AV & Immersive Solutions"
    ],
    address: [
        {
            "@type": "PostalAddress",
            streetAddress: "Unit 7, Building 2568, Road 4450, Block 744",
            addressLocality: "Manama",
            addressCountry: "BH"
        },
        {
            "@type": "PostalAddress",
            streetAddress: "Bldg 7073, Abaad Ibn Abbar, Sinaiyah Al awaziyah",
            addressLocality: "Khobar",
            addressCountry: "SA"
        }
    ],
    sameAs: [CONTACT_INFO.instagram, CONTACT_INFO.facebook]
};

// Animation Variants
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } }
};

// Context for App-wide Language State
const LangContext = createContext({ isAr: false, toggleLang: () => {}, t: TEXT_EN });

// --- CUSTOM INTERACTIVE TICKER COMPONENT ---
function InteractiveTicker({ children, direction = 1, speed = 1, isAr = false, innerClassName = "" }: any) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeftPos, setScrollLeftPos] = useState(0);

    useEffect(() => {
        let animationId: number;
        const scroll = () => {
            if (containerRef.current && !isHovered && !isDragging) {
                const container = containerRef.current;
                const dir = isAr ? -direction : direction;
                container.scrollLeft += dir * speed;

                // Snap to half point seamlessly (since items are duplicated 4x)
                if (dir > 0 && container.scrollLeft >= container.scrollWidth / 2) {
                    container.scrollLeft = 1; // offset prevents jitter
                } else if (dir < 0 && container.scrollLeft <= 0) {
                    container.scrollLeft = (container.scrollWidth / 2) - 1;
                }
            }
            animationId = requestAnimationFrame(scroll);
        };
        animationId = requestAnimationFrame(scroll);
        return () => cancelAnimationFrame(animationId);
    }, [isHovered, isDragging, isAr, direction, speed]);

    const handleWheel = (e: React.WheelEvent) => {
        if (containerRef.current) {
            containerRef.current.scrollLeft += (e.deltaY > 0 || e.deltaX > 0) ? 40 : -40;
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        if (containerRef.current) {
            setStartX(e.pageX - containerRef.current.offsetLeft);
            setScrollLeftPos(containerRef.current.scrollLeft);
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !containerRef.current) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        containerRef.current.scrollLeft = scrollLeftPos - walk;
    };

    return (
        <div
            ref={containerRef}
            className="flex-1 overflow-x-auto relative scrollbar-hide cursor-grab active:cursor-grabbing w-full"
            onWheel={handleWheel}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setIsDragging(false); }}
            onMouseDown={handleMouseDown}
            onMouseUp={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
            role="marquee"
            aria-label="Trusted partners"
        >
            <div className={innerClassName}>
                {children}
            </div>
        </div>
    );
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showContact, setShowContact] = useState(false);
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

  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const yHero = useTransform(smoothProgress, [0, 0.2], [0, isMobile ? -100 : -250]);
  const opacityHero = useTransform(smoothProgress, [0, 0.15], [1, 0]);

  return (
    <LangContext.Provider value={{ isAr, toggleLang, t }}>
    {/* SEO: machine-readable structured data */}
    <Script
        id="colours-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
    />

    <div ref={containerRef} className={`bg-[#050508] h-[100dvh] w-full relative overflow-y-auto overflow-x-hidden text-white selection:bg-emerald-500/30 font-sans scroll-smooth custom-scrollbar ${isAr ? 'dir-rtl' : 'dir-ltr'}`} dir={isAr ? "rtl" : "ltr"} lang={isAr ? "ar" : "en"}>

      {/* DEVELOPED BY SIDE BADGE */}
      <div className={`fixed ${isAr ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 ${isAr ? '-rotate-90' : 'rotate-90'} origin-center text-[10px] text-white/30 tracking-[0.3em] uppercase mix-blend-difference hidden xl:block z-50 pointer-events-none`} aria-hidden="true">
          {t.developedBy}
      </div>

      {/* 1. OPTIMIZED GALAXY ATMOSPHERE */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
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

      {/* 2. HUD NAVIGATION (RESPONSIVE) */}
      <Navbar onOpenContact={() => setShowContact(true)} />

      {/* 3. HERO SECTION */}
      <section className="relative min-h-[100svh] flex flex-col justify-center px-6 md:px-12 lg:px-24 z-10 pt-24 pb-12" aria-labelledby="hero-heading">
        <motion.div style={{ y: yHero, opacity: opacityHero }} className="max-w-[1800px] mx-auto w-full">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-wrap items-center gap-3 md:gap-4 mb-8 md:mb-12"
            >
                <div className="px-3 py-1.5 md:px-4 md:py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center gap-2 md:gap-3 shadow-lg">
                    <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2" aria-hidden="true">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[8px] md:text-[10px] font-mono text-emerald-300 uppercase tracking-widest">{t.est}</span>
                </div>
                <div className="hidden md:block h-[1px] w-16 bg-gradient-to-r from-white/40 to-transparent" aria-hidden="true" />
                <span className="text-[8px] md:text-[10px] font-mono text-white/40 tracking-wider">{t.active}</span>
            </motion.div>

            <div className="relative z-20 max-w-5xl">
                <motion.h1
                    id="hero-heading"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter leading-[0.9] mb-6 md:mb-8 uppercase text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                >
                    {t.design} <br />
                    {t.build} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-white to-blue-300 animate-gradient-x">{t.deliver}</span>
                </motion.h1>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-12 md:mt-20 items-start"
            >
                <div className="lg:col-span-5 relative">
                    <div className={`absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500 to-blue-500 ${isAr ? 'right-0' : 'left-0'}`} aria-hidden="true" />
                    <p className={`text-lg md:text-2xl font-light text-white/80 leading-relaxed ${isAr ? 'pr-6 md:pr-8' : 'pl-6 md:pl-8'}`}>
                        {t.desc}
                    </p>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {CAPABILITIES_DATA.map((cap, i) => (
                        <div key={i} className="group relative overflow-hidden p-5 md:p-6 border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-emerald-500/50 group-hover:text-emerald-400 transition-colors">
                                    <cap.icon size={20} className="text-white/60 group-hover:text-emerald-400 transition-colors" aria-hidden="true" />
                                </div>
                                <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-white">{(t as never)[cap.idTitle]}</h3>
                            </div>
                            <p className={`text-[10px] md:text-xs text-white/40 tracking-wide ${isAr ? 'mr-14' : 'ml-14'}`}>{(t as never)[cap.idDesc]}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 1, delay: 1 }}
                className="mt-16 flex items-center gap-4"
                aria-hidden="true"
            >
                <MousePointer2 size={14} className="animate-bounce" />
                <span className="text-[9px] font-mono uppercase tracking-widest">{t.scroll}</span>
            </motion.div>
        </motion.div>
      </section>

      {/* 3.5. STYLISH MISSION, VISION & GOALS BENTO BOX */}
      <section className="relative z-20 py-24 md:py-32 px-6 md:px-12 lg:px-24" aria-labelledby="directives-heading">
          <div className="max-w-[1800px] mx-auto">
              <div className="flex items-center gap-3 mb-10">
                  <Target size={18} className="text-emerald-500" aria-hidden="true" />
                  <span id="directives-heading" className="text-[10px] md:text-xs font-mono text-emerald-500 uppercase tracking-[0.3em]">{t.mvTitle}</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                  {/* Mission */}
                  <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6 }}
                      className="lg:col-span-1 lg:row-span-2 p-8 md:p-12 border border-white/10 bg-black/40 backdrop-blur-xl rounded-3xl hover:border-emerald-500/40 transition-all duration-500 relative overflow-hidden group shadow-lg"
                  >
                      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] group-hover:bg-emerald-500/10 transition-colors duration-500" aria-hidden="true" />
                      <Flag size={32} className="text-emerald-400 mb-6 opacity-80" aria-hidden="true" />
                      <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white mb-6 relative z-10">{t.missionTitle}</h3>
                      <p className="text-sm md:text-base text-white/70 leading-relaxed font-light relative z-10">
                          {t.missionText}
                      </p>
                  </motion.div>

                  {/* Vision */}
                  <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="lg:col-span-2 p-8 md:p-12 border border-white/10 bg-black/40 backdrop-blur-xl rounded-3xl hover:border-blue-500/40 transition-all duration-500 relative overflow-hidden group shadow-lg"
                  >
                      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] group-hover:bg-blue-500/10 transition-colors duration-500" aria-hidden="true" />
                      <Eye size={32} className="text-blue-400 mb-6 opacity-80" aria-hidden="true" />
                      <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white mb-4 relative z-10">{t.visionTitle}</h3>
                      <p className="text-sm md:text-base text-white/70 leading-relaxed font-light relative z-10 lg:w-3/4">
                          {t.visionText}
                      </p>
                  </motion.div>

                  {/* Core Values & Goals */}
                  <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="lg:col-span-2 p-8 md:p-10 border border-white/10 bg-black/40 backdrop-blur-xl rounded-3xl hover:border-purple-500/30 transition-all duration-500 relative overflow-hidden group shadow-lg"
                  >
                      <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white mb-6 relative z-10">{t.goalsTitle}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
                          <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2"><Sparkles size={16} className="text-purple-400" aria-hidden="true"/><span className="font-bold text-sm text-white">{t.goal1}</span></div>
                              <p className="text-xs text-white/50">{t.goal1Desc}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2"><Users size={16} className="text-purple-400" aria-hidden="true"/><span className="font-bold text-sm text-white">{t.goal2}</span></div>
                              <p className="text-xs text-white/50">{t.goal2Desc}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2"><Lightbulb size={16} className="text-purple-400" aria-hidden="true"/><span className="font-bold text-sm text-white">{t.goal3}</span></div>
                              <p className="text-xs text-white/50">{t.goal3Desc}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2"><Leaf size={16} className="text-purple-400" aria-hidden="true"/><span className="font-bold text-sm text-white">{t.goal4}</span></div>
                              <p className="text-xs text-white/50">{t.goal4Desc}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2"><Globe2 size={16} className="text-purple-400" aria-hidden="true"/><span className="font-bold text-sm text-white">{t.goal5}</span></div>
                              <p className="text-xs text-white/50">{t.goal5Desc}</p>
                          </div>
                      </div>
                  </motion.div>
              </div>
          </div>
      </section>

     {/* 4. OVERVIEW (Stats Removed) */}
      <section className="relative z-20 py-10 md:py-16 px-6 md:px-12 lg:px-24 shrink-0 bg-black/40 backdrop-blur-sm" aria-labelledby="philosophy-heading">
          <div className="max-w-[1200px] mx-auto flex flex-col text-center items-center">
              <motion.div
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="flex flex-col items-center"
              >
                  <span id="philosophy-heading" className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 text-emerald-500">{t.philosophy}</span>
                  <p className="text-2xl md:text-4xl font-light text-white/90 leading-snug md:leading-snug max-w-4xl">
                      {t.overview}
                  </p>
              </motion.div>
          </div>
      </section>

      {/* 5. PHILOSOPHY / PROCESS SECTION */}
    <section className="relative py-12 md:py-24 px-6 md:px-12 lg:px-24 z-10 bg-[#050508]" aria-labelledby="methodology-heading">
          <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <motion.div
                  initial={{ opacity: 0, x: isAr ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="lg:col-span-5 flex flex-col justify-center"
              >
                  <div className="flex items-center gap-3 mb-6">
                      <Command size={14} className="text-blue-500" aria-hidden="true" />
                      <span className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em]">{t.opLogic}</span>
                  </div>
                  <h2 id="methodology-heading" className="text-4xl md:text-6xl font-medium tracking-tighter text-white leading-tight mb-8">
                      {t.processTitle}
                  </h2>
                  <p className="text-white/50 font-light text-base md:text-lg leading-relaxed">
                      {t.processDesc}
                  </p>
              </motion.div>

              <ol className="lg:col-span-7 flex flex-col gap-6 list-none">
                  {PROCESS_DATA.map((proc, i) => (
                      <motion.li
                          key={i}
                          initial={{ opacity: 0, x: isAr ? -30 : 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.6, delay: i * 0.15 }}
                          className="group relative p-6 md:p-8 bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl hover:border-white/30 transition-colors duration-500"
                      >
                          <div className={`absolute top-0 w-1 h-full bg-white/10 group-hover:bg-blue-500 transition-colors duration-500 ${isAr ? 'right-0 rounded-r-2xl' : 'left-0 rounded-l-2xl'}`} aria-hidden="true" />
                          <div className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-8 ${isAr ? 'mr-4' : 'ml-4'}`}>
                              <span className="text-4xl md:text-5xl font-black text-white/10 group-hover:text-white/20 font-mono transition-colors">{proc.step}</span>
                              <div>
                                  <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest text-white mb-2">{(t as never)[proc.idTitle]}</h3>
                                  <p className="text-sm text-white/50 leading-relaxed font-light">{(t as never)[proc.idDesc]}</p>
                              </div>
                          </div>
                      </motion.li>
                  ))}
              </ol>
          </div>
      </section>

      {/* 6. EDITORIAL BENTO GALLERY */}
      <GallerySection />

      {/* 7. GLOBAL NETWORK (UPDATED WITH MAP AND ADDRESSES) */}
      <section className="relative py-24 md:py-40 px-6 md:px-12 lg:px-24 z-10 border-t border-white/10 bg-gradient-to-b from-black to-[#05050a] overflow-hidden" aria-labelledby="hq-heading">
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-20">

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col justify-between h-full order-2 lg:order-1"
            >
                <div>
                    <span className="text-[9px] font-mono text-emerald-500 mb-4 md:mb-6 block uppercase tracking-[0.2em]">{t.globalUplink}</span>
                    <h2 id="hq-heading" className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-6">{t.hq}</h2>
                    <p className="text-sm md:text-base text-white/60 font-light leading-relaxed mb-12 md:mb-16 lg:w-4/5">{t.hqIntro}</p>

                    <div className="space-y-8 md:space-y-10">
                        {/* BAHRAIN LOCATION */}
                        <div className="group">
                            <span className="text-[9px] md:text-[10px] font-mono text-white/40 uppercase tracking-widest mb-3 block">{t.physCoords}</span>
                            <div className="flex items-start gap-4 md:gap-6">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-500/50 transition-all duration-500 shrink-0">
                                    <MapPin size={20} className="text-white/80 group-hover:text-blue-400 transition-colors" aria-hidden="true" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-white uppercase tracking-widest block mb-1">{t.bahrainHq}</span>
                                    <address className="not-italic text-sm md:text-base lg:text-lg text-white/80 font-light leading-snug lg:w-3/4">
                                        {t.address}
                                    </address>
                                </div>
                            </div>
                        </div>

                        {/* SAUDI LOCATION */}
                        <div className="group">
                            <div className="flex items-start gap-4 md:gap-6">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50 transition-all duration-500 shrink-0">
                                    <MapPin size={20} className="text-white/80 group-hover:text-emerald-400 transition-colors" aria-hidden="true" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-white uppercase tracking-widest block mb-1">{t.saudiBase}</span>
                                    <address className="not-italic text-sm md:text-base lg:text-lg text-white/80 font-light leading-snug lg:w-3/4">
                                        {t.saudiAddress}
                                    </address>
                                </div>
                            </div>
                        </div>

                        {/* PHONE */}
                        <div className="group pt-4 border-t border-white/10">
                            <span className="text-[9px] md:text-[10px] font-mono text-white/40 uppercase tracking-widest mb-3 block">{t.secureLine}</span>
                            <div className="flex items-center gap-4 md:gap-6">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-rose-500/20 group-hover:border-rose-500/50 transition-all duration-500 shrink-0">
                                    <Phone size={20} className="text-white/80 group-hover:text-rose-400 transition-colors" aria-hidden="true" />
                                </div>
                                <a href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`} className="text-2xl md:text-3xl lg:text-4xl text-white font-light tracking-tight hover:text-rose-400 transition-colors" dir="ltr" aria-label={`Call Colours Bahrain at ${CONTACT_INFO.phone}`}>
                                    {CONTACT_INFO.phone}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 md:gap-4 mt-16 md:mt-20">
                    <SocialButton href={CONTACT_INFO.instagram} icon={Instagram} label="Instagram" />
                    <SocialButton href={CONTACT_INFO.facebook} icon={Facebook} label="Facebook" />
                </div>
            </motion.div>

            {/* Static Google Map Visualizer */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative h-[300px] md:h-[500px] w-full flex items-center justify-center order-1 lg:order-2 overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_80px_rgba(59,130,246,0.15)] group"
            >
                <div className="absolute inset-0 bg-blue-500/10 mix-blend-screen opacity-50 transition-opacity duration-1000 group-hover:opacity-0 z-10 pointer-events-none" aria-hidden="true" />
                <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    loading="lazy"
                    title="Colours Bahrain headquarters location on Google Maps"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ border: 0, filter: 'invert(100%) hue-rotate(180deg) contrast(1.2) grayscale(0.2)' }}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.5290680650974!2d50.51865957640523!3d26.212001589832264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49b01511f6291d%3A0xc31db3a6774eebbe!2sColours%20Events%20%26%20Exhibitions!5e0!3m2!1sen!2sbh!4v1713865449772!5m2!1sen!2sbh"
                    allowFullScreen={false}
                    aria-hidden="false"
                    tabIndex={-1}
                    className="relative z-0"
                />
                <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] pointer-events-none z-20" aria-hidden="true" />
            </motion.div>

         </div>
      </section>

      {/* 7.5 TRUSTED PARTNERS TICKER (Logos Only) */}
      <section className="relative py-4 md:py-5 border-t border-white/10 bg-black z-20 overflow-hidden" aria-label={isAr ? "شركاء موثوقون" : "Trusted partners"}>
          <style dangerouslySetInnerHTML={{__html: `
            .mask-linear-fade {
                mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
                -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
            }
          `}} />
          <div className="max-w-[1800px] mx-auto flex items-center">
                <div className={`hidden md:flex items-center gap-3 z-20 bg-black shrink-0 ${isAr ? 'pl-8 pr-12 border-l border-white/10' : 'pr-8 pl-12 border-r border-white/10'}`}>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_#10b981]" aria-hidden="true" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80 whitespace-nowrap">{t.trustedPartners}</span>
                </div>

                <div className="flex-1 overflow-hidden relative mask-linear-fade w-full">
                     <InteractiveTicker direction={1} speed={1} isAr={isAr} innerClassName="flex items-center gap-16 md:gap-32 whitespace-nowrap w-max pr-32">
                        {[...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, i) => {
                            const isSvg = client.logo.toLowerCase().endsWith('.svg');
                            return (
                            <div key={i} className="flex items-center justify-center opacity-80 hover:opacity-100 transition-all duration-500 cursor-default group hover:scale-110 pointer-events-auto shrink-0">
                                <div className={`relative flex items-center justify-center pointer-events-none ${isSvg ? 'h-14 md:h-24 max-w-[140px] md:max-w-[200px]' : 'h-8 md:h-12 max-w-[90px] md:max-w-[130px]'}`}>
                                    <img src={client.logo} alt={`${client.name} — Colours Bahrain client`} loading="lazy" className="h-full w-auto object-contain drop-shadow-xl pointer-events-none" />
                                </div>
                            </div>
                        )})}
                     </InteractiveTicker>
                </div>
          </div>
      </section>

      {/* 8. FOOTER CTA */}
      <section className="relative py-24 md:py-32 border-t border-white/10 bg-[#050508] z-20 text-center overflow-hidden px-6 flex flex-col" aria-labelledby="cta-heading">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" aria-hidden="true" />

         <div className="relative z-10 max-w-4xl mx-auto mb-20 md:mb-32">
             <h2 id="cta-heading" className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                 {t.readyToDeploy}
             </h2>

             <button
                onClick={() => setShowContact(true)}
                className="group relative inline-flex items-center gap-4 md:gap-6 px-10 py-5 md:px-16 md:py-8 bg-white text-black rounded-full hover:scale-105 transition-transform duration-500 shadow-[0_0_60px_rgba(255,255,255,0.2)] overflow-hidden"
                aria-haspopup="dialog"
             >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                <span className="relative z-10 text-xs md:text-sm font-black uppercase tracking-[0.25em]">{t.initProject}</span>
                <CornerDownRight size={18} className={`relative z-10 transition-transform duration-300 ${isAr ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`} aria-hidden="true" />
             </button>
         </div>

         {/* Bottom Footer Credits */}
         <footer className="relative z-10 max-w-[1800px] w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 text-white/40 text-[10px] uppercase tracking-widest">
                <p>© {new Date().getFullYear()} Colours. {t.rights}</p>
                <div className="flex items-center gap-2">
                    <p>{t.developedBy}</p>
                </div>
        </footer>
      </section>

      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />

    </div>
    </LangContext.Provider>
  );
}

// --- SUB-COMPONENTS ---

function Navbar({ onOpenContact }: { onOpenContact: () => void }) {
    const { isAr, toggleLang, t } = useContext(LangContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-4 py-4 md:px-10 md:py-8 flex items-center justify-between pointer-events-none" aria-label={isAr ? "التنقل الرئيسي" : "Primary navigation"}>

            {/* BRAND LOGO */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "circOut" }} className="pointer-events-auto shrink-0">
                <Link href="/" className="group relative block" aria-label="Colours Bahrain — Home">
                    <div className="w-24 sm:w-32 md:w-44 relative z-10 transition-transform duration-500 group-hover:scale-105">
                        <ColoursLogoHeader className="w-full h-auto fill-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" aria-label="Colours Bahrain" />
                    </div>
                </Link>
            </motion.div>

            {/* DESKTOP NAV BUTTONS */}
            <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: "circOut" }}
                className="pointer-events-auto hidden md:flex items-center justify-end gap-3 w-full ml-auto"
            >
                <button onClick={toggleLang} className="flex shrink-0 group relative px-5 py-3 bg-transparent backdrop-blur-sm border border-white/10 text-white/70 hover:text-white rounded-full transition-all will-change-transform hover:bg-white/5 hover:border-white/30" aria-label={isAr ? "التبديل إلى الإنجليزية" : "Switch to Arabic"} aria-pressed={isAr}>
                    <div className="relative z-10 flex items-center gap-2">
                        <Globe size={16} className="group-hover:text-emerald-400 transition-colors" aria-hidden="true" />
                        <span className="text-[10px] font-black uppercase tracking-widest mt-[1px]">(EN/AR)</span>
                    </div>
                </button>
                <Link href="/about" className="flex shrink-0 group relative px-5 py-3 bg-transparent backdrop-blur-sm border border-white/10 text-white/70 hover:text-white rounded-full transition-all will-change-transform hover:bg-white/5 hover:border-white/30">
                    <div className="relative z-10 flex items-center gap-2">
                        <Info size={16} className="group-hover:text-emerald-400 transition-colors" aria-hidden="true" />
                        <span className="text-[10px] font-black uppercase tracking-widest mt-[1px]">{t.about}</span>
                    </div>
                </Link>
                <Link href="/our-work" className="flex shrink-0 group relative px-5 py-3 bg-transparent backdrop-blur-sm border border-white/10 text-white/70 hover:text-white rounded-full transition-all will-change-transform hover:bg-white/5 hover:border-white/30">
                    <div className="relative z-10 flex items-center gap-2">
                        <LayoutGrid size={16} className="group-hover:text-emerald-400 transition-colors" aria-hidden="true" />
                        <span className="text-[10px] font-black uppercase tracking-widest mt-[1px]">{t.gallery}</span>
                    </div>
                </Link>
                <button onClick={onOpenContact} className="flex shrink-0 items-center gap-2 px-5 py-3 bg-transparent backdrop-blur-sm border border-white/10 text-white/70 hover:text-white rounded-full transition-all will-change-transform hover:bg-white/5 hover:border-white/30 group" aria-haspopup="dialog">
                    <Zap size={16} className="group-hover:text-emerald-400 transition-colors" aria-hidden="true" />
                    <span className="text-[10px] font-black uppercase tracking-widest mt-[1px]">{t.talk}</span>
                </button>
            </motion.div>

            {/* MOBILE NAV COLLAPSE TOGGLE */}
            <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: "circOut" }}
                className="pointer-events-auto flex md:hidden items-center"
            >
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-3 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/10 transition-colors shadow-lg" aria-label={isMenuOpen ? (isAr ? "إغلاق القائمة" : "Close menu") : (isAr ? "فتح القائمة" : "Open menu")} aria-expanded={isMenuOpen}>
                    {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
            </motion.div>

            {/* MOBILE MENU DROPDOWN */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-[72px] right-4 bg-black/90 backdrop-blur-2xl border border-white/10 p-4 rounded-2xl flex flex-col gap-3 pointer-events-auto shadow-[0_20px_40px_rgba(0,0,0,0.8)] min-w-[220px]"
                        dir={isAr ? "rtl" : "ltr"}
                    >
                        <button onClick={() => { toggleLang(); setIsMenuOpen(false); }} className="flex items-center gap-3 px-4 py-3.5 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-colors w-full" aria-label={isAr ? "التبديل إلى الإنجليزية" : "Switch to Arabic"}>
                            <Globe size={16} className="text-white/50" aria-hidden="true" />
                            <span className="text-[10px] font-black uppercase tracking-widest mt-[1px]">(EN/AR)</span>
                        </button>
                        <Link href="/about" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3.5 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-colors w-full">
                            <Info size={16} className="text-white/50" aria-hidden="true" />
                            <span className="text-[10px] font-black uppercase tracking-widest mt-[1px]">{t.about}</span>
                        </Link>
                        <Link href="/our-work" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3.5 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-colors w-full">
                            <LayoutGrid size={16} className="text-white/50" aria-hidden="true" />
                            <span className="text-[10px] font-black uppercase tracking-widest mt-[1px]">{t.gallery}</span>
                        </Link>
                        <button onClick={() => { onOpenContact(); setIsMenuOpen(false); }} className="flex items-center gap-3 px-4 py-3.5 bg-emerald-500/20 border border-emerald-500/50 text-white rounded-xl hover:bg-emerald-500/30 transition-colors w-full" aria-haspopup="dialog">
                            <Zap size={16} className="text-emerald-400" aria-hidden="true" />
                            <span className="text-[10px] font-black uppercase tracking-widest mt-[1px]">{t.talk}</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

function GallerySection() {
    const { isAr, t } = useContext(LangContext);
    return (
        <section className="relative py-24 md:py-40 px-4 md:px-12 lg:px-24 z-10 bg-[#020202]" aria-labelledby="portfolio-heading">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center text-center mb-16 md:mb-24"
            >
                <span className="text-[9px] md:text-[10px] font-mono text-white/50 border border-white/10 px-3 py-1 rounded-full mb-6 tracking-[0.3em] uppercase">{t.visualArchive}</span>
                <h2 id="portfolio-heading" className="text-4xl md:text-6xl lg:text-8xl font-medium tracking-tighter text-white mb-6">
                    {t.portfolioTitle}
                </h2>
                <p className="text-sm md:text-lg font-light text-white/60 leading-relaxed max-w-2xl">
                    {t.portfolioDesc}
                </p>
            </motion.div>

            {/* Performance Optimized CSS Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[250px] md:auto-rows-[300px] gap-4 md:gap-6 max-w-[1800px] mx-auto">
                {GALLERY_IMAGES.map((src, i) => {
                    let spanClass = "col-span-1 row-span-1";
                    if (i === 0) spanClass = "md:col-span-2 md:row-span-2";
                    else if (i === 3) spanClass = "md:col-span-2 row-span-1";
                    else if (i === 4) spanClass = "lg:col-span-2 lg:row-span-2";
                    else if (i === 6) spanClass = "md:col-span-3 lg:col-span-2 row-span-1";

                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                            className={`group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 ${spanClass}`}
                        >
                            <Image
                                src={src}
                                alt={`Colours Bahrain selected work — project ${i + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                loading="lazy"
                                className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110 will-change-transform"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" aria-hidden="true" />

                            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                                <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out flex items-end justify-between">
                                    <div>
                                        <span className="text-[9px] font-mono text-emerald-400 mb-2 block tracking-widest uppercase">{t.index} // 0{i + 1}</span>
                                        <h3 className="text-lg md:text-xl font-bold uppercase text-white tracking-widest">{t.viewConcept}</h3>
                                    </div>
                                    <div className={`w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-300 ${isAr ? 'group-hover:-rotate-45' : 'group-hover:rotate-45'}`} aria-hidden="true">
                                        <ArrowUpRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}

function SocialButton({ href, icon: Icon, label }: any) {
    const { isAr } = useContext(LangContext);
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 md:gap-4 px-6 py-3 md:px-8 md:py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
            aria-label={`${label} (opens in a new tab)`}
        >
            <Icon size={16} className="md:w-[18px] md:h-[18px]" aria-hidden="true" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">{label}</span>
            <ArrowUpRight size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity ${isAr ? '-mr-3 group-hover:mr-0' : '-ml-3 group-hover:ml-0'}`} aria-hidden="true" />
        </a>
    );
}

function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { isAr, t } = useContext(LangContext);
    const [copied, setCopied] = useState(false);
    const email = CONTACT_INFO.email;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        if (isOpen) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={t.dialogue}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                        aria-hidden="true"
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
                                <Monitor size={16} className="text-emerald-400 animate-pulse" aria-hidden="true" />
                                <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-white/80">{t.sysUplink}</span>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label={isAr ? "إغلاق" : "Close"}>
                                <X size={20} className="text-white/60" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="p-6 md:p-12">
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">{t.dialogue}</h3>
                            <p className="text-white/50 text-xs md:text-sm mb-8 md:mb-10 font-light leading-relaxed">
                                {t.contactDesc}
                            </p>
                            <button type="button" onClick={handleCopy} className="group relative w-full h-20 md:h-24 bg-black border border-white/20 rounded-xl md:rounded-2xl flex items-center justify-between px-5 md:px-8 cursor-pointer hover:border-emerald-500/50 transition-all duration-300 shadow-lg text-left" aria-label={copied ? t.copied : `${t.copy}: ${email}`}>
                                <div className="flex items-center gap-4 md:gap-5 overflow-hidden">
                                    <div className={`shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors ${copied ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white'}`} aria-hidden="true">
                                        {copied ? <Check size={18} /> : <Mail size={18} />}
                                    </div>
                                    <div className="flex flex-col gap-1 truncate">
                                        <span className="text-[8px] md:text-[9px] font-mono text-white/40 uppercase tracking-wider">{t.official}</span>
                                        <span className="text-sm md:text-xl font-mono text-white truncate" dir="ltr">{email}</span>
                                    </div>
                                </div>
                                <div className={`hidden sm:flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity ${isAr ? 'pr-4' : 'pl-4'}`}>
                                    <span className="text-[9px] md:text-[10px] font-bold uppercase text-emerald-400 tracking-widest whitespace-nowrap">{copied ? t.copied : t.copy}</span>
                                    <Copy size={16} className="text-emerald-400 shrink-0" aria-hidden="true" />
                                </div>
                            </button>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1 md:h-1.5 bg-gradient-to-r from-emerald-500 via-blue-500 to-rose-500" aria-hidden="true" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function TabButton({ isActive, onClick, icon: Icon, label, desc }: any) {
    const { isAr } = useContext(LangContext);
    return (
        <button onClick={onClick} className={`w-full relative flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl transition-all duration-300 text-left group overflow-hidden border ${isActive ? 'bg-white/5 border-white/20 shadow-md' : 'hover:bg-white/5 border-transparent'}`}>
            {isActive && <motion.div layoutId="activeTabGlow" className={`absolute top-0 bottom-0 w-1 md:w-1.5 bg-emerald-500 ${isAr ? 'right-0' : 'left-0'}`} />}
            <div className={`relative z-10 p-2 md:p-2.5 rounded-lg transition-colors ${isActive ? 'bg-white text-black' : 'bg-white/5 text-white/60 group-hover:text-white'}`}><Icon size={16} className="md:w-5 md:h-5" /></div>
            <div className={`relative z-10 flex flex-col ${isAr ? 'text-right' : 'text-left'}`}>
                <span className={`text-[10px] md:text-xs font-black uppercase tracking-wider ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>{label}</span>
                <span className="text-[8px] md:text-[9px] text-white/40 font-mono mt-0.5">{desc}</span>
            </div>
        </button>
    );
}

function EmailInterface() {
    const { t } = useContext(LangContext);
    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full flex flex-col justify-start md:justify-center max-w-xl mx-auto pb-6 md:pb-0">
            <div className="mb-6 md:mb-10">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 md:mb-6 shadow-inner"><Mail size={18} className="text-white md:w-5 md:h-5" /></div>
                <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-white mb-2 uppercase">{t.initProject}</h2>
                <p className="text-xs md:text-sm text-white/50 tracking-wide font-light">{t.dossier}</p>
            </div>
            <form className="space-y-4 md:space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                    <div className="space-y-1.5">
                        <label className="text-[9px] md:text-[10px] font-mono text-emerald-500 uppercase tracking-widest">{t.identity}</label>
                        <input type="text" placeholder={t.nameOrg} aria-label={t.nameOrg} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 md:py-4 text-xs md:text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all placeholder:text-white/20" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[9px] md:text-[10px] font-mono text-emerald-500 uppercase tracking-widest">{t.coords}</label>
                        <input type="email" placeholder={t.emailAddr} aria-label={t.emailAddr} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 md:py-4 text-xs md:text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all placeholder:text-white/20" />
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className="text-[9px] md:text-[10px] font-mono text-emerald-500 uppercase tracking-widest">{t.brief}</label>
                    <textarea rows={4} placeholder={t.outline} aria-label={t.brief} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 md:py-4 text-xs md:text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all resize-none placeholder:text-white/20" />
                </div>
                <button className="w-full group bg-white text-black h-12 md:h-14 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] md:text-[11px] flex items-center justify-center gap-3 hover:bg-emerald-400 transition-all mt-6 shadow-[0_10px_20px_rgba(16,185,129,0.15)] hover:shadow-[0_15px_30px_rgba(16,185,129,0.3)]">
                    <span>{t.transmit}</span><Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
            </form>
        </motion.div>
    );
}

function AIInterface() {
    const { isAr, t } = useContext(LangContext);
    const [messages, setMessages] = useState([{ role: 'ai', text: t.aiGreeting }]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMessages([{ role: 'ai', text: t.aiGreeting }]);
    }, [t.aiGreeting]);

    const handleSend = () => {
        if (!input.trim()) return;
        const newMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, newMsg]);
        setInput("");
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, { role: 'ai', text: t.aiReply }]);
        }, 1500);
    };

    useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, isTyping]);

    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4 md:mb-6 border-b border-white/10 pb-4 md:pb-6 shrink-0">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-emerald-400 to-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]"><Sparkles size={16} className="text-white" /></div>
                    <div>
                        <h3 className="text-xs md:text-sm font-black text-white uppercase tracking-wider">{t.neuralInt}</h3>
                        <div className="flex items-center gap-1.5 md:gap-2 mt-0.5">
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[8px] md:text-[9px] text-white/50 uppercase tracking-[0.2em] font-mono">{t.listening}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar mb-4">
                {messages.map((msg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'ai' ? 'bg-white/10 border border-white/10' : 'bg-white text-black shadow-md'}`}>
                            {msg.role === 'ai' ? <Bot size={14} /> : <User size={14} />}
                        </div>
                        <div className={`p-3 md:p-4 rounded-2xl max-w-[85%] md:max-w-[80%] text-xs md:text-sm leading-relaxed ${msg.role === 'ai' ? (isAr ? 'bg-white/5 text-white/90 rounded-tr-none border border-white/10' : 'bg-white/5 text-white/90 rounded-tl-none border border-white/10') : (isAr ? 'bg-white text-black rounded-tl-none shadow-lg' : 'bg-white text-black rounded-tr-none shadow-lg')}`}>{msg.text}</div>
                    </motion.div>
                ))}
                {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10"><Bot size={14} /></div>
                        <div className={`bg-white/5 px-4 py-3 md:px-5 md:py-4 rounded-2xl border border-white/10 flex gap-1.5 items-center h-10 md:h-auto ${isAr ? 'rounded-tr-none' : 'rounded-tl-none'}`}>
                            <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                    </motion.div>
                )}
            </div>
            <div className="relative mt-auto shrink-0 pb-2 md:pb-0">
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} type="text" placeholder={t.enterCmd} aria-label={t.enterCmd} className={`w-full bg-[#0a0a0f] border border-white/20 rounded-2xl py-3.5 md:py-4 text-xs md:text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-white/20 shadow-inner ${isAr ? 'pr-5 md:pr-6 pl-12 md:pl-14' : 'pl-5 md:pl-6 pr-12 md:pr-14'}`} />
                <button onClick={handleSend} className={`absolute top-2 md:top-2.5 p-1.5 md:p-2 bg-white text-black rounded-xl hover:scale-105 active:scale-95 transition-transform shadow-md ${isAr ? 'left-2 md:left-3' : 'right-2 md:right-3'}`} aria-label={t.transmit}><ArrowRight size={16} className={`md:w-[18px] md:h-[18px] ${isAr ? 'rotate-180' : ''}`} /></button>
            </div>
        </motion.div>
    );
}