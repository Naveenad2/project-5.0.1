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
    Leaf, Globe2, Lightbulb
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ColoursLogoHeader } from "@/components/ui/ColoursLogoHeader";

// --- BILINGUAL DICTIONARY ---
const TEXT_EN = {
    return: "Return",
    mainGrid: "MAIN_GRID",
    est: "17 Years Experience // Bahrain",
    active: "GCC_OPERATIONS_ACTIVE",
    design: "DESIGN.",
    build: "BUILD.",
    deliver: "DELIVER.",
    desc: "A dynamic, full-service event management agency based in Bahrain. With 17 years of experience, we deliver end-to-end brand experiences across the GCC.",
    scroll: "Scroll to Explore",
    
    // Capabilities
    cap1: "Event Build", cap1Desc: "Design & Build Event Setups",
    cap2: "Project Management", cap2Desc: "Event & Project Management",
    cap3: "AV Solutions", cap3Desc: "Provide AV Solutions",
    cap4: "Exhibition Stand", cap4Desc: "Design & Build Custom Stands",

    // Mission & Vision
    mvTitle: "Core Directives",
    missionTitle: "Our Mission",
    missionText: "Our mission is to deliver exceptional events and exhibitions that create lasting impressions, foster meaningful connections, and drive business success. By combining creativity, innovation, and meticulous attention to detail, we aim to exceed client expectations and elevate the experience for attendees. We are committed to providing end-to-end event management solutions that inspire, engage, and deliver value.",
    visionTitle: "Our Vision",
    visionText: "To be recognized as a global leader in event and exhibition management, known for our creativity, commitment to excellence, and the ability to transform ideas into extraordinary experiences. We envision a future where every event we create is a catalyst for meaningful connections, innovation, and success, shaping industries and communities worldwide.",
    
    // Goals
    goalsTitle: "Our Goals",
    goal1: "Unmatched Experiences", goal1Desc: "Consistently provide high-quality, seamless events.",
    goal2: "Strong Partnerships", goal2Desc: "Build long-term relationships with clients & vendors.",
    goal3: "Innovate and Adapt", goal3Desc: "Stay ahead of trends to offer innovative solutions.",
    goal4: "Sustainability", goal4Desc: "Incorporate eco-friendly practices into event planning.",
    goal5: "Expand Reach", goal5Desc: "Target new markets and diversify our portfolio.",

    // Process
    opLogic: "Operational Logic",
    processTitle: "Precision in every dimension.",
    processDesc: "We don't just build stands; we engineer environments. Our methodology combines rigorous strategic planning with in-house industrial capabilities to guarantee flawless execution, regardless of scale.",
    step1: "Blueprint & Strategy", step1Desc: "Mapping the spatial and digital constraints to engineer a flawless activation strategy.",
    step2: "Custom Fabrication", step2Desc: "Precision manufacturing in our state-of-the-art Bahrain facility.",
    step3: "Live Deployment", step3Desc: "On-site execution, management, and real-time operational oversight.",

    // Gallery
    visualArchive: "Visual_Archive",
    portfolioTitle: "The Portfolio",
    index: "Index",
    viewConcept: "View Concept",
    
    // Partners
    trustedPartners: "Trusted Partners",

    // Network
    globalUplink: "03 // Global_Uplink",
    hq: "Headquarters",
    secureLine: "Secure Line",
    physCoords: "Physical Coordinates",
    bahrainHq: "Bahrain HQ",
    online: "ONLINE",

    // Footer & Modal
    readyToDeploy: "Ready to deploy?",
    initProject: "Initiate Project",
    developedBy: "Developed by WhitehillsIntl",
    rights: "All rights reserved.",
    sysUplink: "Secure Uplink // Active",
    dialogue: "Start a Dialogue.",
    contactDesc: "Our team is ready to engineer your next experience. Copy the secure uplink below to initialize contact.",
    official: "Official Inquiries",
    copy: "COPY LINK",
    copied: "COPIED"
};

const TEXT_AR = {
    return: "عودة",
    mainGrid: "القائمة_الرئيسية",
    est: "17 عاماً من الخبرة // البحرين",
    active: "العمليات_في_الخليج_نشطة",
    design: "تصميم.",
    build: "بناء.",
    deliver: "تنفيذ.",
    desc: "وكالة ديناميكية متكاملة الخدمات لإدارة الفعاليات مقرها البحرين. بخبرة تمتد لـ 17 عاماً، نقدم تجارب شاملة في جميع أنحاء دول مجلس التعاون الخليجي.",
    scroll: "قم بالتمرير للاستكشاف",

    cap1: "بناء الفعاليات", cap1Desc: "تصميم وبناء تجهيزات الفعاليات",
    cap2: "إدارة المشاريع", cap2Desc: "إدارة الفعاليات والمشاريع",
    cap3: "حلول الصوت والصورة", cap3Desc: "توفير حلول تقنية متكاملة",
    cap4: "أجنحة المعارض", cap4Desc: "تصميم وبناء أجنحة مخصصة",

    mvTitle: "الموجهات الأساسية",
    missionTitle: "مهمتنا",
    missionText: "مهمتنا هي تقديم فعاليات ومعارض استثنائية تترك انطباعات دائمة، وتعزز الروابط الهادفة، وتدفع نجاح الأعمال. من خلال الجمع بين الإبداع والابتكار والاهتمام الدقيق بالتفاصيل، نهدف إلى تجاوز توقعات العملاء والارتقاء بتجربة الحضور.",
    visionTitle: "رؤيتنا",
    visionText: "أن نكون رواداً عالميين في إدارة الفعاليات والمعارض، معروفين بإبداعنا والتزامنا بالتميز. نتصور مستقبلاً يكون فيه كل حدث نبتكره حافزاً للتواصل الهادف والابتكار والنجاح في جميع أنحاء العالم.",

    goalsTitle: "أهدافنا",
    goal1: "تجارب لا تضاهى", goal1Desc: "تقديم فعاليات سلسة وعالية الجودة باستمرار.",
    goal2: "شراكات قوية", goal2Desc: "بناء علاقات طويلة الأمد مع العملاء والموردين.",
    goal3: "الابتكار والتكيف", goal3Desc: "البقاء في طليعة الاتجاهات لتقديم حلول مبتكرة.",
    goal4: "الاستدامة", goal4Desc: "دمج الممارسات الصديقة للبيئة في تخطيط الفعاليات.",
    goal5: "توسيع النطاق", goal5Desc: "استهداف أسواق جديدة وتنويع محفظتنا.",

    opLogic: "المنطق التشغيلي",
    processTitle: "دقة في كل بُعد.",
    processDesc: "نحن لا نبني أجنحة فحسب؛ بل نهندس بيئات. تجمع منهجيتنا بين التخطيط الاستراتيجي الصارم والقدرات الصناعية لضمان تنفيذ لا تشوبه شائبة.",
    step1: "المخطط والاستراتيجية", step1Desc: "تخطيط القيود المكانية لهندسة استراتيجية خالية من العيوب.",
    step2: "تصنيع مخصص", step2Desc: "تصنيع دقيق في منشأتنا المتطورة في البحرين.",
    step3: "النشر المباشر", step3Desc: "التنفيذ في الموقع، والإدارة، والإشراف التشغيلي المباشر.",

    visualArchive: "الأرشيف_البصري",
    portfolioTitle: "محفظة الأعمال",
    index: "فهرس",
    viewConcept: "عرض المفهوم",
    
    trustedPartners: "شركاء موثوقون",

    globalUplink: "03 // الاتصال_العالمي",
    hq: "المقر الرئيسي",
    secureLine: "الخط الآمن",
    physCoords: "الإحداثيات المادية",
    bahrainHq: "مقر البحرين",
    online: "متصل",

    readyToDeploy: "مستعد للبدء؟",
    initProject: "بدء المشروع",
    developedBy: "تم التطوير بواسطة WhitehillsIntl",
    rights: "جميع الحقوق محفوظة.",
    sysUplink: "رابط آمن // نشط",
    dialogue: "ابدأ الحوار.",
    contactDesc: "فريقنا مستعد لهندسة تجربتك القادمة. انسخ الرابط الآمن أدناه لبدء الاتصال.",
    official: "الاستفسارات الرسمية",
    copy: "نسخ الرابط",
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

const CLIENTS = [
    { name: "Bahrain EDB", logo: "/logos/ebd.png" },
    { name: "Gulf Air", logo: "/logos/gulfair.png" },
    { name: "DO & CO", logo: "/logos/DOCO.png" },
    { name: "The Avenues", logo: "/logos/avenues.png" },
    { name: "Seef Mall", logo: "/logos/seef.png" },
    { name: "BIC", logo: "/logos/bic.png" },
    { name: "Tamkeen", logo: "/logos/tamkeen.png" },
    { name: "Marassi", logo: "/logos/marassi.png" },
    { name: "Edamah", logo: "/logos/edamah.png" },
    { name: "Bahrain Marina", logo: "/logos/marina.png" }
];

const CONTACT_INFO = {
    phone: "+973 17295917",
    address: "Unit 07, Building 2568, Road 4450, Block 744, A'ali, Bahrain",
    email: "info@coloursbahrain.com",
    instagram: "https://www.instagram.com/colours.bahrain/?hl=en",
    facebook: "https://www.facebook.com/ColoursEventsBahrain?_rdc=1&_rdr"
};

// Animation Variants restored
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } }
};

// Context for App-wide Language State
const LangContext = createContext({ isAr: false, toggleLang: () => {}, t: TEXT_EN });

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [showContact, setShowContact] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isAr, setIsAr] = useState(false);

  const toggleLang = () => setIsAr(!isAr);
  const t = isAr ? TEXT_AR : TEXT_EN;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    container: containerRef, 
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const yHero = useTransform(smoothProgress, [0, 0.2], [0, isMobile ? -100 : -250]);
  const opacityHero = useTransform(smoothProgress, [0, 0.15], [1, 0]);

  return (
    <LangContext.Provider value={{ isAr, toggleLang, t }}>
    <div ref={containerRef} className={`bg-[#050508] h-[100dvh] w-full relative overflow-y-auto overflow-x-hidden text-white selection:bg-emerald-500/30 font-sans scroll-smooth custom-scrollbar ${isAr ? 'dir-rtl' : 'dir-ltr'}`} dir={isAr ? "rtl" : "ltr"}>
      
      {/* DEVELOPED BY SIDE BADGE */}
      <div className={`fixed ${isAr ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 ${isAr ? '-rotate-90' : 'rotate-90'} origin-center text-[10px] text-white/30 tracking-[0.3em] uppercase mix-blend-difference hidden xl:block z-50 pointer-events-none`}>
          {t.developedBy}
      </div>

      {/* 1. OPTIMIZED GALAXY ATMOSPHERE */}
      <div className="fixed inset-0 pointer-events-none z-0">
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

      {/* 2. HUD NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full z-50 px-5 py-6 md:px-10 md:py-8 flex justify-between items-start pointer-events-none mix-blend-difference">
        
        <Link href="/" className="pointer-events-auto group flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <ArrowLeft size={18} className={isAr ? "rotate-180" : ""} />
            </div>
            <div className="hidden sm:flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] leading-none mb-1 text-white">{t.return}</span>
                <span className="text-[8px] font-mono text-white/50 leading-none">{t.mainGrid}</span>
            </div>
        </Link>

        <div className="pointer-events-auto flex items-center gap-4 md:gap-6">
            <button onClick={toggleLang} className="flex items-center gap-2 text-white/60 hover:text-emerald-400 transition-colors group">
                <Globe size={14} className="md:w-4 md:h-4 group-hover:text-emerald-400 transition-colors" />
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest mt-[1px]">(EN/AR)</span>
            </button>
            <div className="w-24 sm:w-32 md:w-44 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                <ColoursLogoHeader className="w-full h-auto fill-white" />
            </div>
        </div>

      </nav>

      {/* 3. HERO SECTION */}
      <section className="relative min-h-[100svh] flex flex-col justify-center px-6 md:px-12 lg:px-24 z-10 pt-24 pb-12">
        <motion.div style={{ y: yHero, opacity: opacityHero }} className="max-w-[1800px] mx-auto w-full">
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-wrap items-center gap-3 md:gap-4 mb-8 md:mb-12"
            >
                <div className="px-3 py-1.5 md:px-4 md:py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center gap-2 md:gap-3 shadow-lg">
                    <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[8px] md:text-[10px] font-mono text-emerald-300 uppercase tracking-widest">{t.est}</span>
                </div>
                <div className="hidden md:block h-[1px] w-16 bg-gradient-to-r from-white/40 to-transparent" />
                <span className="text-[8px] md:text-[10px] font-mono text-white/40 tracking-wider">{t.active}</span>
            </motion.div>
            
            <div className="relative z-20 max-w-5xl">
                <motion.h1 
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
                    <div className={`absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500 to-blue-500 ${isAr ? 'right-0' : 'left-0'}`} />
                    <p className={`text-lg md:text-2xl font-light text-white/80 leading-relaxed ${isAr ? 'pr-6 md:pr-8' : 'pl-6 md:pl-8'}`}>
                        {t.desc}
                    </p>
                </div>
                
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {CAPABILITIES_DATA.map((cap, i) => (
                        <div key={i} className="group relative overflow-hidden p-5 md:p-6 border border-white/10 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-emerald-500/50 group-hover:text-emerald-400 transition-colors">
                                    <cap.icon size={20} className="text-white/60 group-hover:text-emerald-400 transition-colors" />
                                </div>
                                <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-white">{(t as any)[cap.idTitle]}</h3>
                            </div>
                            <p className={`text-[10px] md:text-xs text-white/40 uppercase tracking-wide ${isAr ? 'mr-14' : 'ml-14'}`}>{(t as any)[cap.idDesc]}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 1, delay: 1 }}
                className="mt-16 flex items-center gap-4"
            >
                <MousePointer2 size={14} className="animate-bounce" />
                <span className="text-[9px] font-mono uppercase tracking-widest">{t.scroll}</span>
            </motion.div>
        </motion.div>
      </section>

      {/* 3.5. STYLISH MISSION, VISION & GOALS BENTO BOX */}
      <section className="relative z-20 py-24 md:py-32 px-6 md:px-12 lg:px-24">
          <div className="max-w-[1800px] mx-auto">
              <div className="flex items-center gap-3 mb-10">
                  <Target size={18} className="text-emerald-500" />
                  <span className="text-[10px] md:text-xs font-mono text-emerald-500 uppercase tracking-[0.3em]">{t.mvTitle}</span>
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
                      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] group-hover:bg-emerald-500/10 transition-colors duration-500" />
                      <Flag size={32} className="text-emerald-400 mb-6 opacity-80" />
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
                      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] group-hover:bg-blue-500/10 transition-colors duration-500" />
                      <Eye size={32} className="text-blue-400 mb-6 opacity-80" />
                      <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white mb-4 relative z-10">{t.visionTitle}</h3>
                      <p className="text-sm md:text-base text-white/70 leading-relaxed font-light relative z-10 lg:w-3/4">
                          {t.visionText}
                      </p>
                  </motion.div>

                  {/* Goals */}
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
                              <div className="flex items-center gap-2"><Sparkles size={16} className="text-purple-400"/><span className="font-bold text-sm text-white">{t.goal1}</span></div>
                              <p className="text-xs text-white/50">{t.goal1Desc}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2"><Users size={16} className="text-purple-400"/><span className="font-bold text-sm text-white">{t.goal2}</span></div>
                              <p className="text-xs text-white/50">{t.goal2Desc}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2"><Lightbulb size={16} className="text-purple-400"/><span className="font-bold text-sm text-white">{t.goal3}</span></div>
                              <p className="text-xs text-white/50">{t.goal3Desc}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2"><Leaf size={16} className="text-purple-400"/><span className="font-bold text-sm text-white">{t.goal4}</span></div>
                              <p className="text-xs text-white/50">{t.goal4Desc}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2"><Globe2 size={16} className="text-purple-400"/><span className="font-bold text-sm text-white">{t.goal5}</span></div>
                              <p className="text-xs text-white/50">{t.goal5Desc}</p>
                          </div>
                      </div>
                  </motion.div>
              </div>
          </div>
      </section>

     {/* 4. OVERVIEW (Stats Removed) */}
      <section className="relative z-20 py-10 md:py-16 px-6 md:px-12 lg:px-24 shrink-0 bg-black/40 backdrop-blur-sm">
          <div className="max-w-[1200px] mx-auto flex flex-col text-center items-center">
              <motion.div 
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="flex flex-col items-center"
              >
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 text-emerald-500">{t.philosophy}</span>
                  <p className="text-2xl md:text-4xl font-light text-white/90 leading-snug md:leading-snug max-w-4xl">
                      {t.overview}
                  </p>
              </motion.div>
          </div>
      </section>

      {/* 5. PHILOSOPHY / PROCESS SECTION */}
    <section className="relative py-12 md:py-24 px-6 md:px-12 lg:px-24 z-10 bg-[#050508]">
          <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <motion.div 
                  initial={{ opacity: 0, x: isAr ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="lg:col-span-5 flex flex-col justify-center"
              >
                  <div className="flex items-center gap-3 mb-6">
                      <Command size={14} className="text-blue-500" />
                      <span className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em]">{t.opLogic}</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-white leading-tight mb-8">
                      {t.processTitle}
                  </h2>
                  <p className="text-white/50 font-light text-base md:text-lg leading-relaxed">
                      {t.processDesc}
                  </p>
              </motion.div>

              <div className="lg:col-span-7 flex flex-col gap-6">
                  {PROCESS_DATA.map((proc, i) => (
                      <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: isAr ? -30 : 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.6, delay: i * 0.15 }}
                          className="group relative p-6 md:p-8 bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl hover:border-white/30 transition-colors duration-500"
                      >
                          <div className={`absolute top-0 w-1 h-full bg-white/10 group-hover:bg-blue-500 transition-colors duration-500 ${isAr ? 'right-0 rounded-r-2xl' : 'left-0 rounded-l-2xl'}`} />
                          <div className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-8 ${isAr ? 'mr-4' : 'ml-4'}`}>
                              <span className="text-4xl md:text-5xl font-black text-white/10 group-hover:text-white/20 font-mono transition-colors">{proc.step}</span>
                              <div>
                                  <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest text-white mb-2">{(t as any)[proc.idTitle]}</h3>
                                  <p className="text-sm text-white/50 leading-relaxed font-light">{(t as any)[proc.idDesc]}</p>
                              </div>
                          </div>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* 6. EDITORIAL BENTO GALLERY */}
      <GallerySection />

      {/* 7. GLOBAL NETWORK */}
      <section className="relative py-24 md:py-40 px-6 md:px-12 lg:px-24 z-10 border-t border-white/10 bg-gradient-to-b from-black to-[#05050a] overflow-hidden">
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
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-12 md:mb-16">{t.hq}</h2>
                    
                    <div className="space-y-8 md:space-y-12">
                        <div className="group">
                            <span className="text-[9px] md:text-[10px] font-mono text-white/40 uppercase tracking-widest mb-3 block">{t.secureLine}</span>
                            <div className="flex items-center gap-4 md:gap-6">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50 transition-all duration-500">
                                    <Phone size={20} className="text-white/80 group-hover:text-emerald-400 transition-colors" />
                                </div>
                                <p className="text-2xl md:text-3xl lg:text-4xl text-white font-light tracking-tight" dir="ltr">{CONTACT_INFO.phone}</p>
                            </div>
                        </div>

                        <div className="group">
                            <span className="text-[9px] md:text-[10px] font-mono text-white/40 uppercase tracking-widest mb-3 block">{t.physCoords}</span>
                            <div className="flex items-start gap-4 md:gap-6">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-500/50 transition-all duration-500 shrink-0">
                                    <MapPin size={20} className="text-white/80 group-hover:text-blue-400 transition-colors" />
                                </div>
                                <p className="text-lg md:text-xl lg:text-2xl text-white/80 font-light leading-snug lg:w-3/4 pt-2">
                                    {CONTACT_INFO.address}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 md:gap-4 mt-16 md:mt-20">
                    <SocialButton href={CONTACT_INFO.instagram} icon={Instagram} label="Instagram" />
                    <SocialButton href={CONTACT_INFO.facebook} icon={Facebook} label="Facebook" />
                </div>
            </motion.div>

            {/* Abstract Network Visualizer */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center order-1 lg:order-2 pointer-events-none"
            >
                {/* Responsive rings */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 md:opacity-100">
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            animate={{ rotate: 360, rotateX: [0, 45, 0], rotateY: [0, 45, 0] }}
                            transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                            className="absolute rounded-full border border-white/10"
                            style={{ 
                                width: `${(i * 30) + 20}%`, 
                                height: `${(i * 30) + 20}%`,
                                borderWidth: '1px',
                                borderColor: `rgba(255,255,255,${0.1 - i * 0.02})`
                            }}
                        />
                    ))}
                </div>
                
                <div className="relative z-10 w-48 h-48 md:w-64 md:h-64 bg-black/80 backdrop-blur-xl border border-white/20 rounded-full flex flex-col items-center justify-center shadow-[0_0_80px_rgba(16,185,129,0.15)]">
                    <Hexagon size={48} strokeWidth={0.5} className="text-white/60 mb-4 animate-spin-slow" />
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white">{t.bahrainHq}</span>
                    <span className="text-[8px] md:text-[9px] font-mono text-emerald-400 mt-1">{t.online}</span>
                </div>
            </motion.div>

         </div>
      </section>

      {/* 7.5 TRUSTED PARTNERS TICKER (Logos Only) */}
      <section className="relative py-12 md:py-20 border-t border-white/10 bg-black z-20 overflow-hidden">
          <style dangerouslySetInnerHTML={{__html: `
            .mask-linear-fade {
                mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
                -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
            }
          `}} />
          <div className="max-w-[1800px] mx-auto flex items-center">
                <div className={`hidden md:flex items-center gap-3 z-20 bg-black shrink-0 ${isAr ? 'pl-8 pr-12 border-l border-white/10' : 'pr-8 pl-12 border-r border-white/10'}`}>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_#10b981]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80 whitespace-nowrap">{t.trustedPartners}</span>
                </div>

                <div className="flex-1 overflow-hidden relative mask-linear-fade w-full">
                     <motion.div animate={{ x: isAr ? ["-50%", "0%"] : ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }} className="flex items-center gap-12 md:gap-24 whitespace-nowrap will-change-transform">
                        {[...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, i) => (
                            <div key={i} className="flex items-center justify-center opacity-80 hover:opacity-100 transition-all duration-500 cursor-default group hover:scale-110 pointer-events-auto shrink-0">
                                <div className="relative h-10 md:h-16 flex items-center justify-center pointer-events-none">
                                    <Image src={client.logo} alt={client.name} width={160} height={64} className="h-full w-auto max-w-[120px] md:max-w-[160px] object-contain drop-shadow-xl pointer-events-none" />
                                </div>
                            </div>
                        ))}
                     </motion.div>
                </div>
          </div>
      </section>

      {/* 8. FOOTER CTA */}
      <section className="relative py-24 md:py-32 border-t border-white/10 bg-[#050508] z-20 text-center overflow-hidden px-6 flex flex-col">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />
         
         <div className="relative z-10 max-w-4xl mx-auto mb-20 md:mb-32">
             <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                 {t.readyToDeploy}
             </h2>
             
             <button 
                onClick={() => setShowContact(true)}
                className="group relative inline-flex items-center gap-4 md:gap-6 px-10 py-5 md:px-16 md:py-8 bg-white text-black rounded-full hover:scale-105 transition-transform duration-500 shadow-[0_0_60px_rgba(255,255,255,0.2)] overflow-hidden"
             >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 text-xs md:text-sm font-black uppercase tracking-[0.25em]">{t.initProject}</span>
                <CornerDownRight size={18} className={`relative z-10 transition-transform duration-300 ${isAr ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`} />
             </button>
         </div>

         {/* Bottom Footer Credits */}
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

// --- SUB-COMPONENTS ---

function GallerySection() {
    const { isAr, t } = useContext(LangContext);
    return (
        <section className="relative py-24 md:py-40 px-4 md:px-12 lg:px-24 z-10 bg-[#020202]">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center text-center mb-16 md:mb-24"
            >
                <span className="text-[9px] md:text-[10px] font-mono text-white/50 border border-white/10 px-3 py-1 rounded-full mb-6 tracking-[0.3em] uppercase">{t.visualArchive}</span>
                <h2 className="text-4xl md:text-6xl lg:text-8xl font-medium tracking-tighter text-white">
                    {t.portfolioTitle}
                </h2>
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
                                alt={`Project ${i+1}`} 
                                fill 
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110 will-change-transform"
                            />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                            
                            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                                <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out flex items-end justify-between">
                                    <div>
                                        <span className="text-[9px] font-mono text-emerald-400 mb-2 block tracking-widest uppercase">{t.index} // 0{i + 1}</span>
                                        <h3 className="text-lg md:text-xl font-bold uppercase text-white tracking-widest">{t.viewConcept}</h3>
                                    </div>
                                    <div className={`w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-300 ${isAr ? 'group-hover:-rotate-45' : 'group-hover:rotate-45'}`}>
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
        >
            <Icon size={16} className="md:w-[18px] md:h-[18px]" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">{label}</span>
            <ArrowUpRight size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity ${isAr ? '-mr-3 group-hover:mr-0' : '-ml-3 group-hover:ml-0'}`} />
        </a>
    );
}

function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { isAr, t } = useContext(LangContext);
    const [copied, setCopied] = useState(false);
    const email = CONTACT_INFO.email;

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
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
                                <Monitor size={16} className="text-emerald-400 animate-pulse" />
                                <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-white/80">{t.sysUplink}</span>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X size={20} className="text-white/60" />
                            </button>
                        </div>
                        <div className="p-6 md:p-12">
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">{t.dialogue}</h3>
                            <p className="text-white/50 text-xs md:text-sm mb-8 md:mb-10 font-light leading-relaxed">
                                {t.contactDesc}
                            </p>
                            <div onClick={handleCopy} className="group relative h-20 md:h-24 bg-black border border-white/20 rounded-xl md:rounded-2xl flex items-center justify-between px-5 md:px-8 cursor-pointer hover:border-emerald-500/50 transition-all duration-300 shadow-lg">
                                <div className="flex items-center gap-4 md:gap-5 overflow-hidden">
                                    <div className={`shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors ${copied ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white'}`}>
                                        {copied ? <Check size={18} /> : <Mail size={18} />}
                                    </div>
                                    <div className="flex flex-col gap-1 truncate">
                                        <span className="text-[8px] md:text-[9px] font-mono text-white/40 uppercase tracking-wider">{t.official}</span>
                                        <span className="text-sm md:text-xl font-mono text-white truncate" dir="ltr">{email}</span>
                                    </div>
                                </div>
                                <div className={`hidden sm:flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity ${isAr ? 'pr-4' : 'pl-4'}`}>
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