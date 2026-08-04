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
    Globe, Compass, Asterisk, Sofa, Store, Briefcase, Coffee,
    X, ChevronLeft, ChevronRight, Loader2
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
    ctaBtn: "Return to Home"
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
    ctaBtn: "العودة للرئيسية"
};

const THEME_COLOR = "#3B82F6"; // Electric Blue
const HERO_IMAGE = "/insta/interiors.jpeg";

const CAPABILITIES_ICONS = [Store, Coffee, Briefcase, Sofa];

const CAPABILITIES_IMAGES = [
    "/insta/image6.png",
    "/insta/image7.png",
    "/insta/image8.png",
    "/insta/image9.png"
];

/* ------------------------------------------------------------------
   ARCHIVE — mixed sources, interleaved so no single project clusters.
   Paths are encoded at render time (spaces -> %20) so filenames stay
   readable and editable here.
------------------------------------------------------------------- */
const GALLERY_IMAGES: string[] = [
    "/EXHIBITION/EDAMAH 2025/EDAMAH 01.jpg",
    // "/Events/JOTUN EVENT AT LA FONTAINE/JOTUN EVENT AT LA FONTAINE 1.jpg",
    // "/EXHIBITION/AMG STAND AT MARASSI 2025/AMG STAND AT MARASSI GALLERIA 01.jpeg",
    // "/KIOSK/BATEEL KIOSK AT CITY CENTER 2025.jpg",
    // "/EXHIBITION/MASSOUD JEWELLERY ARABIA 2025/MASSOUD JEWELLERY 04.JPG",
    // "/Events/BANK ABC GHABGA AT GULF HOTEL 2025/BANK ABC GHABGA AT GULF HOTEL 2.jpg",
    // "/EXHIBITION/EDAMAH 2025/EDAMAH 02.jpg",
    // "/EXHIBITION/BAHRAIN MARINA 2025/BAHRAIN MARINA 01.jpg",
    // "/Events/FINTECH 2025/2J5A0953.JPG",
    // "/EXHIBITION/AL JIWAN JEWELLERY 01.JPG",
    // "/EXHIBITION/The Avenues Winter Fest 2024/The Avenues Winter Fest 01.jpg",
    // "/Events/JOTUN EVENT AT LA FONTAINE/JOTUN EVENT AT LA FONTAINE 2.jpg",

    "/EXHIBITION/EDAMAH 2025/EDAMAH 07.jpg",
    // "/EXHIBITION/AMG STAND AT MARASSI 2025/AMG STAND AT MARASSI GALLERIA 03.jpeg",
    // "/Events/BANK ABC GHABGA AT GULF HOTEL 2025/BANK ABC GHABGA AT GULF HOTEL 16.jpg",
    // "/EXHIBITION/BINAA STAND AT CITY CENTER 2025/BINAA STAND AT CITY CENTER 02.jpg",
    // "/EXHIBITION/MASSOUD JEWELLERY ARABIA 2025/MASSOUD JEWELLERY 06.JPG",
    // "/Events/FINTECH 2025/2J5A0954.JPG",
    // "/EXHIBITION/BAHRAIN MARINA 2025/BAHRAIN MARINA 05.jpg",
    // "/EXHIBITION/F1 STAND @ CITY CENTER 2025/F1 STAND AT CITY CENTER 3.jpg",
    // "/Events/JOTUN EVENT AT LA FONTAINE/JOTUN EVENT AT LA FONTAINE 3.jpg",
    // "/EXHIBITION/EDAMAH 2025/EDAMAH 11.jpg",
    // "/EXHIBITION/The Avenues Winter Fest 2024/The Avenues Winter Fest 03.jpg",
    // "/EXHIBITION/01.jpg",

    "/Events/F1 2025 - EDB PADDOCK LOUNGE/ECONOMIC DEVELOPMENT BOARD  PADDOCK CLUB 3.jpg",
    // "/EXHIBITION/EDAMAH 2025/EDAMAH 13.jpg",
    // "/EXHIBITION/AMG STAND AT MARASSI 2025/AMG STAND AT MARASSI GALLERIA 07.jpeg",
    // "/EXHIBITION/BAHRAIN MARINA 2025/BAHRAIN MARINA 06.jpg",
    // "/Events/BANK ABC GHABGA AT GULF HOTEL 2025/BANK ABC GHABGA AT GULF HOTEL 19.jpg",
    // "/EXHIBITION/BINAA STAND AT CITY CENTER 2025/BINAA STAND AT CITY CENTER 06.jpg",
    // "/EXHIBITION/BACK TO SCHOOL  2025/MARASSI GALLERIA MALL BACK TO SCHOOL 02.jpg",
    // "/Events/FINTECH 2025/2J5A0955.JPG",
    // "/EXHIBITION/EDAMAH 2025/EDAMAH 15.jpg",
    // "/EXHIBITION/011.jpg",
    // "/Events/JOTUN EVENT AT LA FONTAINE/JOTUN EVENT AT LA FONTAINE 17.jpg",
    // "/EXHIBITION/The Avenues Winter Fest 2024/The Avenues Winter Fest 07.jpg",

    "/EXHIBITION/BAHRAIN MARINA AT AVENUES 2025/BAHRAIN MARINA AT AVENUES 2.jpg",
    // "/EXHIBITION/EDAMAH 2025/EDAMAH 17.jpg",
    // "/Events/F1 2025 - GULF AIR/GULF AIR PADDOCK CLUB 12.jpg",
    // "/EXHIBITION/F1 STAND @ CITY CENTER 2025/F1 STAND AT CITY CENTER 6.jpg",
    // "/EXHIBITION/BACK TO SCHOOL  2025/MARASSI GALLERIA MALL BACK TO SCHOOL 04.jpg",
    // "/Events/BANK ABC GHABGA AT GULF HOTEL 2025/BANK ABC GHABGA AT GULF HOTEL 25.jpg",
    // "/EXHIBITION/EDAMAH 2025/EDAMAH 18.jpg",
    // "/EXHIBITION/MODA MALL SHOP AND WIN 12.jpg",
    // "/Events/FINTECH 2025/2J5A0956.JPG",
    // "/EXHIBITION/BAHRAIN MARINA AT AVENUES 2025/BAHRAIN MARINA AT AVENUES 4.jpg",
    // "/EXHIBITION/The Avenues Winter Fest 2024/The Avenues Winter Fest 08.jpg",
    // "/Events/JOTUN EVENT AT LA FONTAINE/JOTUN EVENT AT LA FONTAINE 32.jpg",

    "/EXHIBITION/EDAMAH 2025/EDAMAH 19.jpg",
    // "/EXHIBITION/AVENUES RAMADAN STAND 2025.jpg",
    // "/Events/F1 2025 - GULF AIR/GULF AIR PADDOCK CLUB 32.jpg",
    // "/EXHIBITION/BACK TO SCHOOL  2025/MARASSI GALLERIA MALL BACK TO SCHOOL 06.jpg",
    // "/EXHIBITION/LOVE YOUR SKIN AT AVENUES 2025/LOVE YOUR SKIN AT AVENUES 40.jpg",
    // "/Events/BANK ABC GHABGA AT GULF HOTEL 2025/BANK ABC GHABGA AT GULF HOTEL 27.jpg",
    // "/EXHIBITION/BESTUNE STAND AT CITY CENTER 2025.jpg",
    // "/EXHIBITION/F1 STAND @ CITY CENTER 2025/F1 STAND AT CITY CENTER 12.jpg",
    // "/Events/FINTECH 2025/3N5A0017.JPG",
    // "/EXHIBITION/BAHRAIN MARINA AT AVENUES 2025/BAHRAIN MARINA AT AVENUES 9.jpg",
    // "/EXHIBITION/The Avenues Winter Fest 2024/The Avenues Winter Fest 24.jpg",
    // "/Events/JOTUN EVENT AT LA FONTAINE/JOTUN EVENT AT LA FONTAINE 50.jpg",

    "/EXHIBITION/LOVE YOUR SKIN AT AVENUES 2025/LOVE YOUR SKIN AT AVENUES 45.jpg",
    // "/EXHIBITION/BACK TO SCHOOL  2025/MARASSI GALLERIA MALL BACK TO SCHOOL 07.jpg",
    // "/Events/F1 2025 - GULF AIR/GULF AIR PADDOCK CLUB 35.jpg",
    // "/EXHIBITION/TOYOTA LAND CRUISER STAND SITRA 2025/TOYOTA LAND CRUISER STAND SITRA 2.jpg",
    // "/EXHIBITION/MARASSI GALLERIA SUPER HERO TRAINING CAMP/MARASSI GALLERIA SUPER HERO TRAINING CAMP 6.jpg",
    // "/Events/FINTECH 2025/3N5A0018.JPG",
    // "/EXHIBITION/F1 STAND @ CITY CENTER 2025/F1 STAND AT CITY CENTER 20.jpg",
    // "/EXHIBITION/LOVE YOUR SKIN AT AVENUES 2025/LOVE YOUR SKIN AT AVENUES 64.jpg",
    // "/Events/JOTUN EVENT AT LA FONTAINE/JOTUN EVENT AT LA FONTAINE 55.jpg",
    // "/EXHIBITION/BACK TO SCHOOL  2025/MARASSI GALLERIA MALL BACK TO SCHOOL 08.jpg",
    // "/EXHIBITION/F1 STAND AT GULF AIR OFFICE - 2025.jpg",
    // "/Events/F1 2025 - GULF AIR/GULF AIR PADDOCK CLUB 46.jpg",

    "/EXHIBITION/TOYOTA LAND CRUISER STAND SITRA 2025/TOYOTA LAND CRUISER STAND SITRA 4.jpg",
    // "/EXHIBITION/MARASSI GALLERIA SUPER HERO TRAINING CAMP/MARASSI GALLERIA SUPER HERO TRAINING CAMP 16.jpg",
    // "/Events/TAMKEEN MASHROO3i EVENT AT EWB/TAMKEEN MASHROO3i EVENT AT EWB 1.jpg",
    // "/EXHIBITION/LOVE YOUR SKIN AT AVENUES 2025/LOVE YOUR SKIN AT AVENUES 67.jpg",
    "/EXHIBITION/BACK TO SCHOOL  2025/MARASSI GALLERIA MALL BACK TO SCHOOL 15.jpg",
    // "/Events/F1 2025 - GULF AIR/GULF AIR PADDOCK CLUB 68.jpg",
    // "/EXHIBITION/F1 STAND AT MARASSI - 2025.jpg",
    // "/EXHIBITION/TOYOTA LAND CRUISER STAND SITRA 2025/TOYOTA LAND CRUISER STAND SITRA 5.jpg",
    // "/Events/RIFFA VIEW SCHOOL EVENT AT NATIONAL THEATRE 2025/RIFFA VIEW SCHOOL EVENT AT NATIONAL THEATRE 1.jpg",
    // "/EXHIBITION/LOVE YOUR SKIN AT AVENUES 2025/LOVE YOUR SKIN AT AVENUES 69.jpg",
    // "/EXHIBITION/MARASSI GALLERIA SUPER HERO TRAINING CAMP/MARASSI GALLERIA SUPER HERO TRAINING CAMP 37.jpg",
    // "/Events/TAMKEEN MASHROO3i EVENT AT EWB/TAMKEEN MASHROO3i EVENT AT EWB 2.jpg",

    "/EXHIBITION/BACK TO SCHOOL  2025/MARASSI GALLERIA MALL BACK TO SCHOOL 066.jpg",
    "/Events/F1 2025 - EDB PADDOCK LOUNGE/ECONOMIC DEVELOPMENT BOARD  PADDOCK CLUB 34.jpg",
    // "/EXHIBITION/TOYOTA RAMADAN16.jpg",
    // "/Events/RIFFA VIEW SCHOOL EVENT AT NATIONAL THEATRE 2025/RIFFA VIEW SCHOOL EVENT AT NATIONAL THEATRE 4.jpg",
    // "/Events/F1 PRE SEASON TESTING 2025/F1 PRE - SEASON TESTING 20.jpg",
    // "/Events/TAMKEEN MASHROO3i EVENT AT EWB/TAMKEEN MASHROO3i EVENT AT EWB 42.jpg",
    // "/Events/FINTECH 2025/_HUS1999.JPG",
    // "/Events/RIFFA VIEW SCHOOL EVENT AT NATIONAL THEATRE 2025/RIFFA VIEW SCHOOL EVENT AT NATIONAL THEATRE 6.jpg",
    // "/Events/F1 PRE SEASON TESTING 2025/F1 PRE - SEASON TESTING 54.jpg",
    // "/Events/TAMKEEN MASHROO3i EVENT AT EWB/TAMKEEN MASHROO3i EVENT AT EWB 59.jpg",
    // "/Events/F1 2025 - EDB PADDOCK LOUNGE/ECONOMIC DEVELOPMENT BOARD  PADDOCK CLUB 49.jpg",
    // "/Events/RIFFA VIEW SCHOOL EVENT AT NATIONAL THEATRE 2025/RIFFA VIEW SCHOOL EVENT AT NATIONAL THEATRE 8.jpg",

    "/Events/F1 PRE SEASON TESTING 2025/F1 PRE - SEASON TESTING 57.jpg",
    "/Events/TAMKEEN MASHROO3i EVENT AT EWB/TAMKEEN MASHROO3i EVENT AT EWB 73.jpg",
    // "/Events/FINTECH 2025/_HUS2737.JPG",
    // "/Events/RIFFA VIEW SCHOOL EVENT AT NATIONAL THEATRE 2025/RIFFA VIEW SCHOOL EVENT AT NATIONAL THEATRE 9.jpg",
    // "/Events/F1 PRE SEASON TESTING 2025/F1 PRE - SEASON TESTING 60.jpg",
    // "/Events/TAMKEEN MASHROO3i EVENT AT EWB/TAMKEEN MASHROO3i EVENT AT EWB 75.jpg",
    // "/Events/F1 PRE SEASON TESTING 2025/F1 PRE - SEASON TESTING 62.jpg",
    // "/Events/TAMKEEN MASHROO3i EVENT AT EWB/TAMKEEN MASHROO3i EVENT AT EWB 78.jpg"
];

// Encode spaces and special characters, keep the "/" separators intact
const enc = (p: string) => p.split("/").map(encodeURIComponent).join("/");

// How many images render on first paint, and per "load more" batch
const BATCH_SIZE = 12;

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

// Context for App-wide Language State
const LangContext = createContext({ isAr: false, toggleLang: () => {}, t: TEXT_EN });

export default function InteriorsPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(true);
    const [isAr, setIsAr] = useState(false);

    // Gallery: progressive rendering + fullscreen viewer
    const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
                            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-white drop-shadow-md">{t.spatialArch}</h2>
                        </div>
                        <p className={`text-xs font-light text-white/50 tracking-wide max-w-sm leading-relaxed ${isAr ? 'md:text-left' : 'md:text-right'}`}>
                            {t.spatialArchDesc}
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
                                        alt={`${cap.title} — Colours Bahrain interiors`}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        loading="lazy"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-90"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                                </div>

                                {/* Content Overlay */}
                                <div className={`relative z-10 p-6 md:p-8 flex flex-col ${isAr ? 'items-end text-right' : 'items-start text-left'}`}>
                                    <div className="w-10 h-10 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm flex items-center justify-center mb-4">
                                        <cap.icon size={16} className="text-white" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider text-white mb-3 drop-shadow-md leading-tight">{cap.title}</h3>
                                    <p className="text-xs text-white/70 font-light leading-relaxed">{cap.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
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

            {/* 6. EDITORIAL GALLERY */}
            <section className="py-24 md:py-40 px-4 md:px-12 lg:px-24 shrink-0 border-t border-white/10" aria-labelledby="portfolio-heading">
                <div className="max-w-[1800px] mx-auto">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col items-center text-center mb-16 md:mb-24">
                        <Compass size={24} className="mb-6" style={{ color: THEME_COLOR }} aria-hidden="true" />
                        <span className="text-[10px] font-mono text-white/50 mb-4 tracking-[0.3em] uppercase">{t.selectDeps}</span>
                        <h2 id="portfolio-heading" className="text-4xl md:text-7xl font-medium tracking-tighter text-white drop-shadow-md mb-6">{t.archiveTitle}</h2>
                        <p className="text-sm md:text-lg font-light text-white/60 leading-relaxed max-w-2xl">{t.archiveDesc}</p>
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
                                    alt={`Colours Bahrain interior project ${i + 1}`}
                                    width={1600}
                                    height={1067}
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                    loading={i < 4 ? "eager" : "lazy"}
                                    className="w-full h-auto object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04] will-change-transform opacity-85 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                                <div className={`absolute bottom-4 ${isAr ? 'left-4' : 'right-4'} w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-xl`} aria-hidden="true">
                                    <ArrowUpRight size={16} strokeWidth={2} className={isAr ? '-rotate-90' : ''} />
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    {/* Infinite-scroll sentinel */}
                    {visibleCount < GALLERY_IMAGES.length && (
                        <div ref={sentinelRef} className="flex flex-col items-center justify-center gap-4 pt-16">
                            <Loader2 size={18} className="animate-spin text-white/40" aria-hidden="true" />
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
                                alt={`Colours Bahrain interior project ${lightboxIndex + 1}`}
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