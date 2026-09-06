"use client";

import { useRef, useState, useEffect, createContext, useContext } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    AnimatePresence,
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
    Loader2,
    Plus,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ColoursLogoHeader } from "@/components/ui/ColoursLogoHeader";

// --- CONFIG ---
const HERO_IMAGE = "/insta/ex3.jpeg";
const PAGE_SIZE = 10; // how many tiles are visible per "page"

// --- BILINGUAL DICTIONARY ---
const TEXT_EN = {
    return: "Return",
    mainHome: "Home",
    est: "20+ Years of Excellence",
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
    viewInsta: "View on Instagram",
    rights: "All rights reserved.",
    developedBy: "Developed by WhitehillsIntl",
    showing: "Showing",
    of: "of",
    loadMore: "Load More",
    loadingMore: "Loading",
    allLoaded: "You've reached the end",
    projects: "Projects",
};

const TEXT_AR = {
    return: "عودة",
    mainHome: "الرئيسية",
    est : "أكثر من 20 عاماً من التميز",
    active: "نخدم منطقة دول مجلس التعاون",
    title1: "معرض",
    title2: "أعمالنا.",
    desc: "معرض مخصص لأبرز مشاريعنا. نصمم ونبني المساحات بتنفيذ متقن لا تشوبه شائبة حيث تلتقي الدقة بالجمال المذهل.",
    scroll: "قم بالتمرير للاستكشاف",
    filterAll: "الكل",
    ctaTitle: "مستعد للبدء؟",
    ctaBtn: "بدأ مشروعك",
    secureUplink: "اتصل بنا",
    dialogue: "ابدأ الحوار.",
    contactDesc: "فريقنا مستعد لتحقيق تجربتكم القادمة. انسخ البريد الإلكتروني أدناه للتواصل معنا.",
    official: "الاستفسارات الرسمية",
    copy: "نسخ البريد",
    copied: "تم النسخ!",
    viewInsta: "عرض على إنستغرام",
    rights: "جميع الحقوق محفوظة.",
    developedBy: "تم التطوير بواسطة WhitehillsIntl",
    showing: "عرض",
    of: "من",
    loadMore: "تحميل المزيد",
    loadingMore: "جاري التحميل",
    allLoaded: "لقد وصلت إلى النهاية",
    projects: "مشاريع",
};

// --- CATEGORY SETUP ---
type CategoryKey = "Events" | "Exhibition" | "Interiors" | "Kiosk";

const CATEGORY_META: Record<
    CategoryKey,
    { en: string; ar: string; accent: string; ring: string }
> = {
    Events: {
        en: "Events",
        ar: "الفعاليات",
        accent: "from-emerald-400 to-emerald-600",
        ring: "group-hover:shadow-emerald-500/30",
    },
    Exhibition: {
        en: "Exhibition",
        ar: "المعارض",
        accent: "from-blue-400 to-blue-600",
        ring: "group-hover:shadow-blue-500/30",
    },
    Interiors: {
        en: "Interiors",
        ar: "التصميم الداخلي",
        accent: "from-amber-400 to-amber-600",
        ring: "group-hover:shadow-amber-500/30",
    },
    Kiosk: {
        en: "Mall Kiosk",
        ar: "أكشاك المولات",
        accent: "from-rose-400 to-rose-600",
        ring: "group-hover:shadow-rose-500/30",
    },
};

interface Project {
    id: number;
    category: CategoryKey;
    title: string;
    titleAr: string;
    subtitle: string;
    subAr: string;
    img: string;
    href: string; // the real Instagram post this tile deep-links to
    code: string; // short badge, e.g. "EV-07"
}

interface SourceItem {
    url: string;
    title?: string;
    titleAr?: string;
}

// --- SOURCE DATA ---
// Each entry pairs the real Instagram post with its real project title
// (English + Arabic), in the exact order the images appear in each
// /public subfolder (index 0 => file 1). Entries without a known title
// (extra archive posts not in the project brief) fall back to a generic
// "Category ##" label inside buildProjects.
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

const EXHIBITION_ITEMS: SourceItem[] = [
    { url: "https://www.instagram.com/p/DSAT1Xtj2Ph/", title: "EDAMAH Stand @ Cityscape Bahrain 2025", titleAr: "جناح إدامة في سيتي سكيب البحرين 2025" },
    { url: "https://www.instagram.com/p/DV7_vc1lBol/", title: "TAMKEEN Bahrain Pavilion @ Gulfood 2026 Dubai", titleAr: "جناح مملكة البحرين في معرض الخليج للأغذية 2026 (دبي)، دبي" },
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

// Builds the Project[] for one category from its folder, file prefix, and
// ordered source items — so the catalogue stays typo-proof. Items without a
// known title/titleAr fall back to a generic "Category ##" label.
function buildProjects(
    category: CategoryKey,
    folder: string,
    filePrefix: string,
    codePrefix: string,
    subtitleEn: string,
    subtitleAr: string,
    items: SourceItem[],
    idOffset: number
): Project[] {
    const meta = CATEGORY_META[category];
    return items.map((item, i) => {
        const n = i + 1;
        const num = String(n).padStart(2, "0");
        return {
            id: idOffset + n,
            category,
            title: item.title ?? `${meta.en} ${num}`,
            titleAr: item.titleAr ?? `${meta.ar} ${num}`,
            subtitle: subtitleEn,
            subAr: subtitleAr,
            img: `/${folder}/${filePrefix}${n}.png`,
            href: item.url,
            code: `${codePrefix}-${num}`,
        };
    });
}

// Folder map (all under /public):
//   Events      -> /ev/ev{n}.png
//   Exhibition  -> /ex/exx{n}.png
//   Interiors   -> /int/inn{n}.png
//   Mall Kiosk  -> /mall/mall{n}.png
const PORTFOLIO: Project[] = [
    ...buildProjects("Events", "ev", "ev", "EV", "Event Production", "إنتاج الفعاليات", EVENT_ITEMS, 0),
    ...buildProjects("Exhibition", "ex", "exx", "EX", "Exhibition Stand", "جناح معرض", EXHIBITION_ITEMS, 100),
    ...buildProjects("Interiors", "int", "inn", "IN", "Interior Fit-Out", "تجهيزات داخلية", INTERIOR_ITEMS, 200),
    ...buildProjects("Kiosk", "mall", "mall", "MK", "Retail Kiosk", "كشك تجزئة", KIOSK_ITEMS, 300),
];

const CATEGORIES: ("All" | CategoryKey)[] = ["All", "Events", "Exhibition", "Interiors", "Kiosk"];

// Custom smooth easing curve
const customEase = [0.22, 1, 0.36, 1] as const;

// Context for App-wide Language State
const LangContext = createContext({ isAr: false, toggleLang: () => {}, t: TEXT_EN });

export default function GalleryPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showContact, setShowContact] = useState(false);
    const [activeCategory, setActiveCategory] = useState<"All" | CategoryKey>("All");
    const [isMobile, setIsMobile] = useState(true);
   const [isAr, setIsAr] = useState(() => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("colours_lang") === "ar";
    }
    return false;
});
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [loadingMore, setLoadingMore] = useState(false);

    const toggleLang = () => setIsAr(!isAr);
    const t = isAr ? TEXT_AR : TEXT_EN;

    useEffect(() => {
         localStorage.setItem("colours_lang", isAr ? "ar" : "en");
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, [isAr]);

    // Reset pagination every time the category changes, so switching filters
    // always starts back at the first 10 tiles of that section.
    useEffect(() => {
        setVisibleCount(PAGE_SIZE);
    }, [activeCategory]);

    const { scrollYProgress } = useScroll({
        container: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
    const yHero = useTransform(smoothProgress, [0, 0.2], [0, isMobile ? -100 : -250]);
    const opacityHero = useTransform(smoothProgress, [0, 0.15], [1, 0]);

    const filteredPortfolio = PORTFOLIO.filter((item) =>
        activeCategory === "All" ? true : item.category === activeCategory
    );
    const visiblePortfolio = filteredPortfolio.slice(0, visibleCount);
    const hasMore = visibleCount < filteredPortfolio.length;
    const remaining = filteredPortfolio.length - visibleCount;

    const categoryCounts = PORTFOLIO.reduce<Record<string, number>>((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
    }, {});

    const handleLoadMore = () => {
        if (loadingMore) return;
        setLoadingMore(true);
        window.setTimeout(() => {
            setVisibleCount((c) => Math.min(c + PAGE_SIZE, filteredPortfolio.length));
            setLoadingMore(false);
        }, 450);
    };

    return (
        <LangContext.Provider value={{ isAr, toggleLang, t }}>
            <div
                ref={containerRef}
                className={`bg-[#050508] h-[100dvh] w-full relative overflow-y-auto overflow-x-hidden text-white selection:bg-emerald-500/30 font-sans scroll-smooth custom-scrollbar ${isAr ? "dir-rtl" : "dir-ltr"}`}
                dir={isAr ? "rtl" : "ltr"}
            >
                {/* SIDE DEVELOPER BADGE */}
                <div className={`fixed ${isAr ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 ${isAr ? "-rotate-90" : "rotate-90"} origin-center text-[10px] text-white/30 tracking-[0.3em] uppercase mix-blend-difference hidden xl:block z-50 pointer-events-none`}>
                    {t.developedBy}
                </div>

                {/* 1. CINEMATIC BACKGROUND */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div
                        className="absolute inset-0 z-0 opacity-[0.15]"
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
                            backgroundSize: "40px 40px",
                            maskImage: "radial-gradient(circle at center, black 40%, transparent 80%)",
                            WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 80%)",
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
                <section className="relative min-h-[80svh] flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-32 pb-12 overflow-hidden">
                    <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute top-0 left-0 right-0 h-[80svh] z-0 overflow-hidden bg-[#050508]" aria-hidden="true">
                        <Image
                            src={HERO_IMAGE}
                            alt="Colours Bahrain — selected works"
                            fill
                            sizes="100vw"
                            quality={80}
                            className="object-cover object-center scale-105"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/75 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/55 via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/50 via-transparent to-[#050508]/50" />
                    </motion.div>

                    <div className="relative z-10 max-w-[1800px] mx-auto w-full">
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
                                <div className={`absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 to-emerald-500 ${isAr ? "right-0" : "left-0"}`} />
                                <p className={`text-lg md:text-2xl font-light text-white/80 leading-relaxed ${isAr ? "pr-6 md:pr-8" : "pl-6 md:pl-8"}`}>
                                    {t.desc}
                                </p>
                            </div>
                        </div>

                        <div className="mt-16 flex items-center gap-4 opacity-50">
                            <MousePointer2 size={14} className="animate-bounce" />
                            <span className="text-[9px] font-medium uppercase tracking-widest">{t.scroll}</span>
                        </div>
                    </div>
                </section>

                {/* 4. FILTER BAR */}
                <div className="relative z-40 px-6 md:px-12 lg:px-24 flex justify-start mb-12 pointer-events-auto max-w-[1800px] mx-auto">
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 p-2 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                        {CATEGORIES.map((cat) => {
                            const label = cat === "All" ? t.filterAll : isAr ? CATEGORY_META[cat].ar : CATEGORY_META[cat].en;
                            const count = cat === "All" ? PORTFOLIO.length : categoryCounts[cat] || 0;
                            const isActive = activeCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`relative px-5 py-2.5 md:px-6 md:py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300 ${isActive ? "text-black" : "text-white/50 hover:text-white hover:bg-white/5"}`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeFilterBubble"
                                            className="absolute inset-0 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10 inline-flex items-center gap-1.5">
                                        {label}
                                        <span className={`font-mono font-normal ${isActive ? "text-black/40" : "text-white/30"}`}>{count}</span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 5. EDITORIAL MASONRY GALLERY */}
                <section className="relative px-6 md:px-12 lg:px-24 pb-16 z-20">
                    <motion.div layout className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-1.5 md:gap-2 max-w-[1800px] mx-auto">
                        <AnimatePresence mode="popLayout">
                            {visiblePortfolio.map((project, i) => (
                                <GalleryTile key={project.id} project={project} index={i} priority={i < 4} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </section>

                {/* 5b. LOAD MORE */}
                {filteredPortfolio.length > PAGE_SIZE && (
                    <section className="relative px-6 md:px-12 lg:px-24 pb-32 md:pb-40 z-20 flex flex-col items-center gap-6 max-w-[1800px] mx-auto">
                        <div className="w-full max-w-xs h-[2px] bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-emerald-400 via-blue-400 to-rose-400"
                                initial={false}
                                animate={{ width: `${Math.min((Math.min(visibleCount, filteredPortfolio.length) / filteredPortfolio.length) * 100, 100)}%` }}
                                transition={{ duration: 0.6, ease: customEase }}
                            />
                        </div>

                        <p className="text-[10px] uppercase tracking-widest text-white/40 font-mono">
                            {t.showing} {Math.min(visibleCount, filteredPortfolio.length)} {t.of} {filteredPortfolio.length} {t.projects}
                        </p>

                        {hasMore ? (
                            <button
                                onClick={handleLoadMore}
                                disabled={loadingMore}
                                className="group relative inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl text-white hover:border-emerald-400/50 hover:bg-white/10 transition-all duration-500 disabled:opacity-60 disabled:cursor-wait shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
                            >
                                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
                                    {loadingMore ? t.loadingMore : `${t.loadMore} (${Math.min(remaining, PAGE_SIZE)})`}
                                </span>
                                {loadingMore ? (
                                    <Loader2 size={16} className="animate-spin text-emerald-400" />
                                ) : (
                                    <Plus size={16} className="text-emerald-400 group-hover:rotate-90 transition-transform duration-500" />
                                )}
                            </button>
                        ) : (
                            <span className="text-[9px] uppercase tracking-widest text-white/25 font-mono">{t.allLoaded}</span>
                        )}
                    </section>
                )}

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
                            <CornerDownRight size={18} className={`relative z-10 transition-transform duration-300 ${isAr ? "group-hover:-translate-x-2" : "group-hover:translate-x-2"}`} />
                        </button>
                    </div>

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
// Header (category pill + code) is always visible at the top. The title is
// always visible in a bottom bar too — clamped to 2 lines with an ellipsis
// so long titles (EN or AR) never overflow or collide with the subtitle or
// the Instagram icon, on any screen size. Hover just adds emphasis/detail.
function GalleryTile({
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
    const meta = CATEGORY_META[project.category];
    const categoryLabel = isAr ? meta.ar : meta.en;

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
            className={`group relative block w-full mb-1.5 md:mb-2 break-inside-avoid overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] cursor-pointer shadow-lg transition-shadow duration-500 hover:shadow-2xl ${meta.ring}`}
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
            <div className={`absolute top-0 ${isAr ? "right-0" : "left-0"} h-full w-[3px] bg-gradient-to-b ${meta.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            {/* --- HEADER ROW (always visible) --- */}
            <div className={`absolute top-0 inset-x-0 flex items-start justify-between gap-2 p-3 md:p-4`}>
                <div className="min-w-0 flex items-center gap-1.5 px-2 py-1 md:px-2.5 md:py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 shrink-0">
                    <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${meta.accent} shrink-0`} />
                    <span className="text-[7px] md:text-[8px] font-mono uppercase tracking-widest text-white/80 whitespace-nowrap">
                        {project.code}
                    </span>
                </div>

                <div className="shrink-0 px-2 py-1 md:px-2.5 md:py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    <span
                        className={`text-[7px] md:text-[8px] font-black uppercase tracking-widest whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r ${meta.accent}`}
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
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
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
                            <p className="text-white/50 text-xs md:text-sm mb-8 md:mb-10 font-light leading-relaxed">{t.contactDesc}</p>
                            <div onClick={handleCopy} className="group relative h-20 md:h-24 bg-black border border-white/20 rounded-xl md:rounded-2xl flex items-center justify-between px-5 md:px-8 cursor-pointer hover:border-emerald-500/50 transition-all duration-300 shadow-lg">
                                <div className="flex items-center gap-4 md:gap-5 overflow-hidden">
                                    <div className={`shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors ${copied ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white"}`}>
                                        {copied ? <Check size={18} /> : <Mail size={18} />}
                                    </div>
                                    <div className="flex flex-col gap-1 truncate">
                                        <span className="text-[8px] md:text-[9px] font-mono text-white/40 uppercase tracking-wider">{t.official}</span>
                                        <span className="text-sm md:text-xl font-mono text-white truncate" dir="ltr">{email}</span>
                                    </div>
                                </div>
                                <div className={`hidden sm:flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity ${isAr ? "pr-4" : "pl-4"}`}>
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