"use client";

import { useState, useEffect, useRef, useContext, createContext } from "react";
import { ColoursLogoHeader } from "@/components/ui/ColoursLogoHeader";
import { 
    motion, 
    useSpring, 
    AnimatePresence,
    PanInfo
} from "framer-motion";
import { 
    ArrowRight, Mail, X, Send, Bot, 
    Sparkles, User, ChevronLeft, ChevronRight,
    Zap, ArrowUpRight, MapPin, Phone,
    LayoutGrid, Info, Globe, Menu
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";

// --- BILINGUAL DICTIONARY ---
const TEXT_EN = {
    init: "INITIALIZING_PROTOCOL",
    engineer: "We Engineer",
    spatial: "Spatial",
    rendering: "RENDERING_AESTHETICS",
    realities: "Realities.",
    colours: "COLOURS.",
    about: "About Colours",
    gallery: "Our Work",
    talk: "Talk To Us",
    comms: "Communications",
    hq: "Global HQ",
    base: "Bahrain Location",
    saudiBase: "Saudi Location",
    saudiAddress: "Bldg: 7073, Street : Abaad Ibn Abbar, Sinaiyah Al awaziyah, Khobar, Kingdom of Saudi Arabia",
    address: "Unit 7, Building 2568, Road 4450, Block 744, Manama, Kingdom of Bahrain",
    directLine: "Direct Line",
    email: "email",
    trusted: "Trusted Partners",
    explore: "KNOW MORE",
    activeForm: "Active Form",
    sysUplink: "System_Uplink_v2.0",
    uplink: "Direct Uplink",
    traditional: "Traditional",
    neural: "Neural Agent",
    aiAssist: "AI Assistant",
    serverOn: "Server Online",
    latency: "Latency: 12ms \nEncryption: AES-256",
    initProject: "Initialize Project",
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
    langToggle: "عربي",
    viewMap: "View Map",
    hideMap: "Hide Map",
    seoHeading: "Colours — Events, Exhibitions, Interior Fit-Out & Retail Kiosks in Bahrain",
    seoDescription: "Colours Events Management Co WLL designs and builds events, exhibition stands, interior fit-outs and mall kiosks across Bahrain and Saudi Arabia, trusted by Bahrain EDB, Gulf Air, Tamkeen and the Bahrain International Circuit.",
    navAria: "Primary navigation",
    langAria: "Switch language between English and Arabic",
    menuAria: "Toggle menu",
    prevAria: "Previous service",
    nextAria: "Next service",
    closeAria: "Close contact panel"
};

const TEXT_AR = {
    init: "تهيئة_البروتوكول",
    engineer: "نحن نهندس",
    spatial: "المكان",
    rendering: "تقديم_الجماليات",
    realities: "الحقائق.",
    colours: "كلرز.",
    about: "عن كلرز",
    gallery: "أعمالنا",
    talk: "تحدث إلينا",
    comms: "الاتصالات",
    hq: "المقر العالمي",
    base: "موقع البحرين",
    saudiBase: "موقع السعودية",
    saudiAddress: "مبنى: 7073، شارع: عباد بن عبار، الصناعية العوازية، الخبر، المملكة العربية السعودية",
    address: "الوحدة 7، مبنى 2568، طريق 4450، مجمع 744، المنامة، مملكة البحرين",
    directLine: "الخط المباشر",
    email: "البريد الإلكتروني",
    trusted: "شركاء موثوقون",
    explore: "انقر هنا لمعرفة المزيد",
    activeForm: "النموذج النشط",
    sysUplink: "رابط_النظام_الإصدار_2.0",
    uplink: "اتصال مباشر",
    traditional: "تقليدي",
    neural: "الوكيل العصبي",
    aiAssist: "مساعد ذكي",
    serverOn: "الخادم متصل",
    latency: "زمن الاستجابة: 12ms \nالتشفير: AES-256",
    initProject: "بدء المشروع",
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
    langToggle: "EN",
    viewMap: "عرض الخريطة",
    hideMap: "إخفاء الخريطة",
    seoHeading: "كلرز — إدارة الفعاليات والمعارض والتصميم الداخلي وأكشاك التجزئة في البحرين",
    seoDescription: "تصمم شركة كلرز لإدارة الفعاليات وتنفذ الفعاليات وأجنحة المعارض والتصميم الداخلي وأكشاك المولات في البحرين والسعودية، وتحظى بثقة هيئة تنمية الاقتصاد وطيران الخليج وتمكين وحلبة البحرين الدولية.",
    navAria: "التنقل الرئيسي",
    langAria: "تبديل اللغة بين الإنجليزية والعربية",
    menuAria: "فتح القائمة",
    prevAria: "الخدمة السابقة",
    nextAria: "الخدمة التالية",
    closeAria: "إغلاق نافذة التواصل"
};

// -- Content Configuration (4 services repeated 3x to fill a full 3D circle) --
// Each of the 12 card slots gets its own unique accent color so no two cards
// in the ring ever share an identical background wash, even though the
// underlying service repeats.
const SERVICES = [
  { id: 1, title: "EVENTS", titleAr: "الفعاليات", subtitle: "MANAGEMENT", subAr: "إدارة", color: "#E11D48", image: "/insta/events.jpeg", link: "/events" },
  { id: 2, title: "EXHIBITIONS", titleAr: "المعارض", subtitle: "STAND BUILD", subAr: "بناء الأجنحة", color: "#EC4899", image: "/insta/exhibitions.jpeg", link: "/exhibitions" },
  { id: 3, title: "INTERIORS", titleAr: "التصميم الداخلي", subtitle: "FIT-OUT", subAr: "تجهيزات", color: "#3B82F6", image: "/insta/interiors.jpeg", link: "/interiors" },
  { id: 4, title: "MALL KIOSKS", titleAr: "أكشاك", subtitle: "RETAIL", subAr: "تجزئة", color: "#10B981", image: "/insta/mallkioski.jpeg", link: "/kiosks" },
  { id: 5, title: "EVENTS", titleAr: "الفعاليات", subtitle: "MANAGEMENT", subAr: "إدارة", color: "#F97316", image: "/insta/events.jpeg", link: "/events" },
  { id: 6, title: "EXHIBITIONS", titleAr: "المعارض", subtitle: "STAND BUILD", subAr: "بناء الأجنحة", color: "#F472B6", image: "/insta/exhibitions.jpeg", link: "/exhibitions" },
  { id: 7, title: "INTERIORS", titleAr: "التصميم الداخلي", subtitle: "FIT-OUT", subAr: "تجهيزات", color: "#06B6D4", image: "/insta/interiors.jpeg", link: "/interiors" },
  { id: 8, title: "MALL KIOSKS", titleAr: "أكشاك", subtitle: "RETAIL", subAr: "تجزئة", color: "#84CC16", image: "/insta/mallkioski.jpeg", link: "/kiosks" },
  { id: 9, title: "EVENTS", titleAr: "الفعاليات", subtitle: "MANAGEMENT", subAr: "إدارة", color: "#F43F5E", image: "/insta/events.jpeg", link: "/events" },
  { id: 10, title: "EXHIBITIONS", titleAr: "المعارض", subtitle: "STAND BUILD", subAr: "بناء الأجنحة", color: "#DB2777", image: "/insta/exhibitions.jpeg", link: "/exhibitions" },
  { id: 11, title: "INTERIORS", titleAr: "التصميم الداخلي", subtitle: "FIT-OUT", subAr: "تجهيزات", color: "#0EA5E9", image: "/insta/interiors.jpeg", link: "/interiors" },
  { id: 12, title: "MALL KIOSKS", titleAr: "أكشاك", subtitle: "RETAIL", subAr: "تجزئة", color: "#14B8A6", image: "/insta/mallkioski.jpeg", link: "/kiosks" }
];

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

// Clickable Location Info Array for the sliding ticker
const LOCATIONS = [
    { icon: MapPin, label: "BHR", text: "Unit 7, Bldg 2568, Rd 4450, Blk 744, Manama", link: "https://maps.app.goo.gl/1hjew3B1hCtoKq496" },
    { icon: MapPin, label: "KSA", text: "Bldg: 7073, Abaad Ibn Abbar, Khobar", link: "https://maps.app.goo.gl/vZ5XGjFBtwAcrE8D7" },
    { icon: Phone, label: "DIR", text: "+973 17295917", link: "tel:+97317295917" },
    { icon: Mail, label: "MAIL", text: "info@coloursbahrain.com", link: "mailto:info@coloursbahrain.com" }
];

const ANGLE_STEP = 360 / SERVICES.length; 

// Context for App-wide Language State
const LangContext = createContext({ isAr: false, toggleLang: () => {}, t: TEXT_EN });

// =========================================================================
// --- LOCAL AI KNOWLEDGE ENGINE ---
// 100% local, keyword/intent-driven "agent" built from the Colours Events
// Management Co WLL 2025 Company Profile. No third-party API calls.
// =========================================================================

const KNOWLEDGE_BASE = {
    legalName: "Colours Events Management Co WLL",
    yearsInOperation: 17,
    country: "Kingdom of Bahrain",
    totalStaff: 68,
    director: "Devadas Chozhiyattil Kumaran",
    owners: [
        { name: "Devadas Chozhiyattil Kumaran", stake: "50%", nationality: "Indian" },
        { name: "Smitha Devadas", stake: "50%", nationality: "Indian" }
    ],
    leadership: [
        { name: "Noel George", role: "General Manager" },
        { name: "Vibin Haridharan", role: "Business Head – Events & Exhibitions" },
        { name: "Suresh Karuvath Vasu", role: "Projects & Production Head" }
    ],
    team: [
        { name: "Vibin Hari", role: "Business Head – Events & Exhibitions", experience: "11+ years", focus: "Local & international projects" },
        { name: "Marc Ortega", role: "Senior Project Manager", experience: "15+ years", focus: "Formula1, Tamkeen & many international projects" },
        { name: "Suresh Vasu", role: "Production Manager & Quality Control", experience: "18+ years", focus: "All Colours projects for the past 17 years" },
        { name: "Adnan Al Moaber", role: "Project Coordinator", experience: "15+ years", focus: "MYS Youth City & international projects worldwide" },
        { name: "Richy George Prince", role: "Project Coordinator", experience: "5+ years", focus: "International projects for Formula1" }
    ],
    services: [
        "Event Build – Design & Build Event Setups",
        "Event & Project Management",
        "AV Solutions",
        "Exhibition Stand – Design & Build Custom Exhibition Stands"
    ],
    mission: "Colours' mission is to deliver exceptional events and exhibitions that create lasting impressions, foster meaningful connections, and drive business success through creativity, innovation, and meticulous attention to detail.",
    vision: "Colours' vision is to be recognized as a global leader in event and exhibition management — transforming ideas into extraordinary experiences that build meaningful connections and success worldwide.",
    goals: [
        "Deliver unmatched, seamless event experiences tailored to each client",
        "Foster strong long-term partnerships with clients, vendors and stakeholders",
        "Innovate and adapt with the latest trends and technology",
        "Champion sustainability and social responsibility in every production",
        "Expand reach into new markets and diversify the event portfolio"
    ],
    majorClients: [
        "Exhibition World Bahrain", "Bahrain International Circuit", "The Economic Development Board (EDB)",
        "Moda Mall", "Seef Properties (Seef Mall, Al Liwan, Souq Al Baraha)", "The Avenues",
        "Marassi Galleria", "Tamkeen", "Gulf Air", "DO & CO", "Edamah", "Alba", "Bapco"
    ],
    projects: [
        { name: "Fintech Forward 2024", client: "Bahrain Fintech Bay & EDB", date: "October 2024", scope: "Conceptualize, design, manufacture, install, AV & full event management" },
        { name: "Fintech Forward 2023", client: "Bahrain Fintech Bay & EDB", date: "October 2023", scope: "Conceptualize, design, manufacture, install, AV & full event management" },
        { name: "The Crown Prince Scholarship Award Event", client: "The Court of the Crown Prince", date: "January 2024", scope: "Conceptualize, design, manufacture, AV & event management" },
        { name: "Mashroo3i Demo Day 2025", client: "The Labour Fund (TAMKEEN)", date: "February 2025", scope: "Conceptualize, design, manufacture, AV & event management" },
        { name: "Formula1 Pre-Season Testing Event", client: "Bahrain International Circuit (BIC)", date: "February 2025", scope: "Conceptualize, design, manufacture, AV & event management" },
        { name: "Nuances Colour Launch Event", client: "Jotun Bahrain", date: "January 2025", scope: "Manufacture, AV & event management" },
        { name: "BIC F1 Launch Event", client: "Bahrain International Circuit (BIC)", date: "February 2020", scope: "Conceptualize, design, manufacture, AV & event management" }
    ],
    certifications: [
        "Commercial Registration (CR No. 069149-01) – Ministry of Industry and Commerce, Kingdom of Bahrain",
        "Bahrainization Certificate – Ministry of Labour",
        "SME Classification Certificate – classified as a Medium enterprise"
    ],
    contact: {
        bahrainAddress: "Unit 7, Building 2568, Road 4450, Block 744, Manama, Kingdom of Bahrain",
        saudiAddress: "Bldg: 7073, Street: Abaad Ibn Abbar, Sinaiyah Al Awaziyah, Khobar, Kingdom of Saudi Arabia",
        phone: "+973 17295917",
        email: "info@coloursbahrain.com",
        instagram: "https://www.instagram.com/colours.bahrain/",
        facebook: "https://www.facebook.com/ColoursEventsBahrain"
    }
};
const AI_INTENTS: {
    id: string;
    keywords: string[];
    en: () => string;
    ar: () => string;
    suggestionsEn: string[];
    suggestionsAr: string[];
}[] = [
    {
        id: "greeting",
        keywords: ["hi", "hello", "hey", "marhaba", "salam", "good morning", "good evening", "good day", "assalam"],
        en: () => "Hello, welcome to Colours. We're an events, exhibitions, interiors and media house based in Bahrain with 17 years of experience. What would you like to know?",
        ar: () => "مرحباً بكم في كلرز. نحن بيت خبرة في الفعاليات والمعارض والتصميم الداخلي والإعلام في مملكة البحرين بخبرة 17 عاماً. بماذا يمكنني مساعدتكم؟",
        suggestionsEn: ["What services do you offer?", "Tell me about your team", "Show me past projects"],
        suggestionsAr: ["ما هي خدماتكم؟", "أخبرني عن فريقكم", "أرني مشاريعكم السابقة"]
    },
    {
        id: "about",
        keywords: ["about", "company", "who are you", "colours profile", "history", "established", "founded", "background", "overview", "wll", "how long", "years of operation"],
        en: () => `Colours Events Management Co WLL has been operating in Bahrain for 17 years, with a full-time team of 68 employees. We specialize in event build, event & project management, AV solutions, and custom exhibition stand design & build.`,
        ar: () => `تعمل شركة كلرز لإدارة الفعاليات في مملكة البحرين منذ 17 عاماً، ويضم فريقنا 68 موظفاً. نحن متخصصون في بناء الفعاليات، وإدارة الفعاليات والمشاريع، وحلول الصوت والصورة.`,
        suggestionsEn: ["What's your mission?", "Who are your clients?", "How do I contact you?"],
        suggestionsAr: ["ما هي رسالتكم؟", "من هم عملاؤكم؟", "كيف أتواصل معكم؟"]
    },
    {
        id: "mission_vision",
        keywords: ["mission", "vision", "goal", "goals", "values", "philosophy", "purpose"],
        en: () => `Mission: Deliver exceptional events and exhibitions that create lasting impressions and drive business success through creativity and attention to detail.\n\nVision: To be recognized as a global leader in event and exhibition management.`,
        ar: () => `رسالتنا: تقديم فعاليات ومعارض استثنائية تترك انطباعاً دائماً وتحقق نجاح الأعمال.\n\nرؤيتنا: أن نكون رواداً عالميين في إدارة الفعاليات والمعارض.`,
        suggestionsEn: ["What services do you offer?", "Show me your projects"],
        suggestionsAr: ["ما هي خدماتكم؟", "أرني مشاريعكم"]
    },
    {
        id: "services",
        keywords: ["service", "services", "what do you offer", "what do you do", "capability", "capabilities", "specialize", "specialise", "what can you do", "solutions", "event build", "exhibition stand"],
        en: () => `Our core services:\n• Event Build – Design & Build Event Setups\n• Event & Project Management\n• AV Solutions\n• Exhibition Stand – Design & Build Custom Stands\n\nWe deliver end-to-end, from concept through manufacturing, installation and on-site management.`,
        ar: () => `خدماتنا الأساسية:\n• بناء الفعاليات\n• إدارة الفعاليات والمشاريع\n• حلول الصوت والصورة\n• تصميم وبناء أجنحة المعارض`,
        suggestionsEn: ["What's the pricing like?", "Show me past projects", "Contact your team"],
        suggestionsAr: ["ما هي الأسعار؟", "أرني مشاريعكم السابقة", "تواصل مع الفريق"]
    },
    {
        id: "project_f1",
        keywords: ["formula1", "formula 1", "f1", "bic", "bahrain international circuit", "grand prix", "paddock"],
        en: () => "We're a long-standing partner of the Bahrain International Circuit: the BIC F1 Launch Event (2020), Formula1 Pre-Season Testing (Feb 2025), and paddock lounges for EDB, Gulf Air and Do&Co.",
        ar: () => "نحن شريك طويل الأمد لحلبة البحرين الدولية، نفذنا فعالية إطلاق فورمولا 1 (2020)، واختبارات ما قبل الموسم (فبراير 2025)، وصالات جناح خاصة لعدة عملاء.",
        suggestionsEn: ["Tell me about Fintech Forward", "Who is your team?"],
        suggestionsAr: ["أخبرني عن فينتك فورورد", "من هو فريقكم؟"]
    },
    {
        id: "project_fintech",
        keywords: ["fintech", "fintech forward", "fintech bay"],
        en: () => "Fintech Forward is our flagship annual project with Bahrain Fintech Bay & the EDB — delivered October 2023 and October 2024, covering full conceptualization, design, manufacturing, AV and event management.",
        ar: () => "فينتك فورورد هو مشروعنا السنوي الرئيسي مع خليج البحرين للتقنية المالية وهيئة تنمية الاقتصاد، نُفذ في أكتوبر 2023 و2024.",
        suggestionsEn: ["Show me other projects", "How do I request a quote?"],
        suggestionsAr: ["أرني مشاريع أخرى", "كيف أطلب عرض سعر؟"]
    },
    {
        id: "projects_general",
        keywords: ["project", "projects", "portfolio", "past work", "case study", "case studies", "clientele events", "done before", "examples of work"],
        en: () => `Some of our recent major projects:\n• Fintech Forward 2024 & 2023 — Bahrain Fintech Bay & EDB\n• Crown Prince Scholarship Award — Jan 2024\n• Mashroo3i Demo Day — Tamkeen, Feb 2025\n• F1 Pre-Season Testing — BIC, Feb 2025\n\nAsk me about any of these by name for more detail.`,
        ar: () => `من أبرز مشاريعنا:\n• فينتك فورورد 2024 و2023\n• جائزة ولي العهد للمنحة الدراسية — يناير 2024\n• مشروعي ديمو داي — تمكين، فبراير 2025\n• اختبارات فورمولا 1 — فبراير 2025`,
        suggestionsEn: ["Tell me about Formula 1 projects", "Who is on the project team?"],
        suggestionsAr: ["أخبرني عن مشاريع فورمولا 1", "من هو فريق المشروع؟"]
    },
    {
        id: "team",
        keywords: ["team", "staff", "employee", "employees", "who works", "management", "director", "manager", "leadership", "organization", "who runs"],
        en: () => `Colours is led by Managing Director Devadas Chozhiyattil Kumaran and General Manager Noel George, supported by 68 employees. Key project leads: Vibin Hari (Business Head, Events & Exhibitions), Marc Ortega (Senior Project Manager, 15+ yrs), Suresh Vasu (Production Manager, 18+ yrs).`,
        ar: () => `تُدار كلرز من قبل المدير العام ديفاداس تشوزهياتيل كومران، ويدعمه فريق من 68 موظفاً.`,
        suggestionsEn: ["What certifications do you hold?", "How can I contact the team?"],
        suggestionsAr: ["ما هي شهاداتكم؟", "كيف أتواصل مع الفريق؟"]
    },
    {
        id: "clients",
        keywords: ["client", "clients", "partner", "partners", "customer", "brands", "who do you work with", "trusted", "worked with"],
        en: () => `We've worked with some of Bahrain's most prominent organizations, including Bahrain EDB, Gulf Air, DO & CO, The Avenues, Seef Mall, Tamkeen, Marassi, Alba and Bapco.`,
        ar: () => `عملنا مع بعض أبرز المؤسسات في البحرين، منها هيئة تنمية الاقتصاد، طيران الخليج، ذا أفنيوز، سيف مول، وتمكين.`,
        suggestionsEn: ["Show me a specific project", "What services do you offer?"],
        suggestionsAr: ["أرني مشروعاً محدداً", "ما هي خدماتكم؟"]
    },
    {
        id: "certifications",
        keywords: ["certificate", "certification", "cr number", "commercial registration", "license", "licence", "sme", "bahrainization", "legal", "registered", "compliance"],
        en: () => `We hold a full Commercial Registration (CR No. 069149-01), a valid Bahrainization Certificate, and are classified as a Medium enterprise under the SME Classification.`,
        ar: () => `نعمل بموجب سجل تجاري رسمي (رقم 069149-01)، ونحمل شهادة بحرنة سارية، ونحن مصنفون كمؤسسة متوسطة.`,
        suggestionsEn: ["How do I contact you?", "Tell me about the company"],
        suggestionsAr: ["كيف أتواصل معكم؟", "أخبرني عن الشركة"]
    },
    {
        id: "contact",
        keywords: ["contact", "email", "e-mail", "phone", "call", "reach you", "address", "location", "where are you", "office", "khobar", "saudi office", "manama office"],
        en: () => `Phone: +973 17295917\nEmail: info@coloursbahrain.com\nBahrain Office: Unit 7, Building 2568, Road 4450, Block 744, Manama\nSaudi Office: Bldg 7073, Khobar\n\nOr submit a brief in the "Direct Uplink" tab and our strategy team will follow up.`,
        ar: () => `الهاتف: 17295917 973+\nالبريد الإلكتروني: info@coloursbahrain.com\nمكتب البحرين: الوحدة 7، مبنى 2568، طريق 4450، مجمع 744، المنامة`,
        suggestionsEn: ["What are your working hours?", "I'd like to request a quote"],
        suggestionsAr: ["ما هي ساعات العمل؟", "أرغب بطلب عرض سعر"]
    },
    {
        id: "pricing",
        keywords: ["price", "pricing", "cost", "quote", "quotation", "budget", "how much", "estimate"],
        en: () => "Pricing depends on scope, scale and location. The fastest way to get an accurate quote is submitting your project brief through the \"Direct Uplink\" tab — our team responds with tailored costing after reviewing your requirements.",
        ar: () => "تعتمد التكلفة على حجم ونطاق ومكان الفعالية. أسرع طريقة للحصول على عرض سعر دقيق هي إرسال موجز مشروعكم.",
        suggestionsEn: ["What services do you offer?", "How do I submit a brief?"],
        suggestionsAr: ["ما هي خدماتكم؟", "كيف أرسل موجز المشروع؟"]
    },
];

const DEFAULT_SUGGESTIONS_EN = ["What services do you offer?", "Tell me about your team", "How do I contact you?"];
const DEFAULT_SUGGESTIONS_AR = ["ما هي خدماتكم؟", "أخبرني عن فريقكم", "كيف أتواصل معكم؟"];

function normalize(str: string) {
    return str.toLowerCase().replace(/[^\w\s\u0600-\u06FF]/g, " ").replace(/\s+/g, " ").trim();
}

function getLocalAIResponse(rawInput: string, isAr: boolean, t: typeof TEXT_EN): { text: string; suggestions: string[] } {
    const query = normalize(rawInput);
    if (!query) {
        return { text: t.aiGreeting, suggestions: isAr ? DEFAULT_SUGGESTIONS_AR : DEFAULT_SUGGESTIONS_EN };
    }

    let bestIntent: (typeof AI_INTENTS)[number] | null = null;
    let bestScore = 0;

    for (const intent of AI_INTENTS) {
        let score = 0;
        for (const kw of intent.keywords) {
            const kwNorm = normalize(kw);
            const wordCount = kwNorm.split(" ").length;
            // whole-phrase / whole-word boundary match only — avoids "hi" matching "this"
            const pattern = new RegExp(`(^|\\s)${kwNorm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(\\s|$)`);
            if (pattern.test(query)) {
                score += wordCount * 2; // longer, more specific phrases win
            }
        }
        if (score > bestScore) {
            bestScore = score;
            bestIntent = intent;
        }
    }

    if (bestIntent && bestScore > 0) {
        return {
            text: isAr ? bestIntent.ar() : bestIntent.en(),
            suggestions: isAr ? bestIntent.suggestionsAr : bestIntent.suggestionsEn
        };
    }

    return {
        text: isAr
            ? "لم أجد إجابة دقيقة لهذا السؤال ضمن بيانات الشركة المتوفرة لدي. جربوا أحد الأسئلة أدناه، أو أرسلوا موجز مشروعكم مباشرة."
            : "I don't have an exact answer to that yet. Try one of the topics below, or submit a project brief directly and our team will follow up personally.",
        suggestions: isAr ? DEFAULT_SUGGESTIONS_AR : DEFAULT_SUGGESTIONS_EN
    };
}
// --- MAIN PAGE COMPONENT ---
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bootPhase, setBootPhase] = useState(0); 
  const [isAr, setIsAr] = useState(false);

  const toggleLang = () => setIsAr(!isAr);
  const t = isAr ? TEXT_AR : TEXT_EN;

  // Session-Aware Boot Logic
  useEffect(() => {
    const hasBooted = sessionStorage.getItem("app_has_booted");
    if (hasBooted) {
        setBootPhase(3); // Skip loader if already visited
        return;
    }
    const timers = [
        setTimeout(() => setBootPhase(1), 400),
        setTimeout(() => setBootPhase(2), 2000),
        setTimeout(() => {
            setBootPhase(3);
            sessionStorage.setItem("app_has_booted", "true");
        }, 3600),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <LangContext.Provider value={{ isAr, toggleLang, t }}>
        <main className={`h-screen w-full bg-[#020204] text-white relative overflow-hidden selection:bg-emerald-500/30 ${isAr ? 'font-sans' : 'font-sans'}`} dir={isAr ? "rtl" : "ltr"}>
        
        {/* CSS INJECTIONS FOR SCROLLBAR, PREMIUM DOTS & MASKING */}
        <style dangerouslySetInnerHTML={{__html: `
            .scrollbar-hide::-webkit-scrollbar { display: none; }
            .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            
            /* Bright Premium Dots Engine */
            .premium-dots {
                background-image: radial-gradient(circle, rgba(255,255,255,0.6) 2px, transparent 2px);
                background-size: 32px 32px;
                filter: drop-shadow(0 0 4px rgba(255,255,255,0.4));
            }

            /* Cinematic Edge Fade for Tickers */
            .mask-linear-fade {
                mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
                -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
            }

            /* Pure-CSS infinite marquee — no JS scroll math, so it never
               jumps/snaps and stays perfectly smooth at any viewport width
               (including narrow foldable cover screens). */
            @keyframes marquee-scroll {
                from { transform: translate3d(0, 0, 0); }
                to { transform: translate3d(-50%, 0, 0); }
            }
            .marquee-track {
                animation-name: marquee-scroll;
                animation-timing-function: linear;
                animation-iteration-count: infinite;
            }

            /* Forces its own compositing layer so GPU-accelerated transforms
               (3D carousel, tickers) render crisp instead of blurry, and
               eliminates the flicker some browsers show on rotateY/translateZ. */
            .gpu-boost {
                transform: translateZ(0);
                -webkit-transform: translateZ(0);
                backface-visibility: hidden;
                -webkit-backface-visibility: hidden;
            }

            /* Crisp small-caps rendering for UI labels sitting on blurred glass */
            .crisp-label {
                font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, sans-serif;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                text-rendering: optimizeLegibility;
                transform: translateZ(0);
                backface-visibility: hidden;
            }

            @media (prefers-reduced-motion: reduce) {
                .marquee-track { animation: none !important; }
            }
        `}} />

        <AnimatePresence mode="wait">
          {bootPhase < 3 ? (
                <motion.div 
                    key="loader"
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(15px)" }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-[#020204] overflow-hidden"
                >
                    {/* DEEP DARK BACKGROUND WITH VIBRANT BLUE & VIOLET ORBS */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <motion.div 
                            animate={{ 
                                x: ["-10%", "10%", "-10%"],
                                y: ["-10%", "10%", "-10%"],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{ duration: 15, ease: "easeInOut", repeat: Infinity }}
                            className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-violet-600/30 blur-[120px] rounded-full mix-blend-screen saturate-[200%] will-change-transform"
                        />
                        <motion.div 
                            animate={{ 
                                x: ["10%", "-10%", "10%"],
                                y: ["10%", "-10%", "10%"],
                                scale: [1.2, 1, 1.2]
                            }}
                            transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
                            className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-blue-600/30 blur-[120px] rounded-full mix-blend-screen saturate-[200%] will-change-transform"
                        />
                    </div>

                    {/* Cinematic Grain Texture */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay pointer-events-none z-0" />

                    {/* MEDIUM BREATHING LOGO */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }} 
                        animate={{ opacity: 1, scale: [1, 1.02, 1] }} 
                        transition={{ 
                            opacity: { duration: 1.2, ease: "easeOut" },
                            scale: { duration: 4, ease: "easeInOut", repeat: Infinity }
                        }}
                        className="relative z-10 flex flex-col items-center justify-center w-full px-6 h-full"
                        dir="ltr"
                    >
                        <div className="w-48 sm:w-64 md:w-80 lg:w-96 relative will-change-transform">
                            <ColoursLogoHeader className="w-full h-auto fill-white drop-shadow-[0_0_40px_rgba(255,255,255,0.6)]" />
                        </div>
                    </motion.div>
                </motion.div>
            ) : (
                <motion.div key="main-ui" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} className="h-full w-full relative">
                    {/* Visually hidden but fully crawlable/screen-reader accessible heading —
                        the visible UI is a highly animated 3D carousel with no static <h1>,
                        so this gives search engines and assistive tech real page content. */}
                    <h1 className="sr-only">{t.seoHeading}</h1>
                    <p className="sr-only">{t.seoDescription}</p>
                    <Navbar onOpenContact={() => setIsModalOpen(true)} />
                    <Carousel3D />
                    <ContactOmniModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                </motion.div>
            )}
        </AnimatePresence>
        </main>
    </LangContext.Provider>
  );
}

// --- COMPONENT: RESPONSIVE NAVBAR ---
function Navbar({ onOpenContact }: { onOpenContact: () => void }) {
    const { isAr, toggleLang, t } = useContext(LangContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav aria-label={t.navAria} className="fixed top-0 left-0 w-full z-50 px-4 py-4 md:px-10 md:py-8 flex items-center justify-between pointer-events-none">
            
            {/* BRAND LOGO */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "circOut" }} className="pointer-events-auto shrink-0">
                <Link href="/" className="group relative block">
                    <div className="w-24 sm:w-32 md:w-44 relative z-10 transition-transform duration-500 group-hover:scale-105">
                        <ColoursLogoHeader className="w-full h-auto fill-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                    </div>
                </Link>
            </motion.div>

            {/* DESKTOP NAV BUTTONS */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: "circOut" }}
                className="pointer-events-auto hidden md:flex items-center justify-end gap-3 w-full ml-auto"
            >
                {/* LANGUAGE TOGGLE BUTTON */}
                <button 
                    onClick={toggleLang}
                    aria-label={t.langAria}
                    className="flex shrink-0 group relative px-5 py-3 bg-transparent backdrop-blur-sm border border-white/10 text-white/70 hover:text-white rounded-full transition-all will-change-transform hover:bg-white/5 hover:border-white/30"
                >
                    <div className="relative z-10 flex items-center gap-2">
                        <Globe size={16} className="group-hover:text-emerald-400 transition-colors" />
                        <span className="text-[10px] font-black uppercase tracking-widest mt-[1px]">(ENGLISH/ARABIC)</span>
                    </div>
                </button>

                <Link 
                    href="/about"
                    className="flex shrink-0 group relative px-5 py-3 bg-transparent backdrop-blur-sm border border-white/10 text-white/70 hover:text-white rounded-full transition-all will-change-transform hover:bg-white/5 hover:border-white/30"
                >
                    <div className="relative z-10 flex items-center gap-2">
                        <Info size={16} className="group-hover:text-emerald-400 transition-colors" />
                        <span className="text-[10px] font-black uppercase tracking-widest mt-[1px]">{t.about}</span>
                    </div>
                </Link>

                <Link 
                    href="/our-work"
                    className="flex shrink-0 group relative px-5 py-3 bg-transparent backdrop-blur-sm border border-white/10 text-white/70 hover:text-white rounded-full transition-all will-change-transform hover:bg-white/5 hover:border-white/30"
                >
                    <div className="relative z-10 flex items-center gap-2">
                        <LayoutGrid size={16} className="group-hover:text-emerald-400 transition-colors" />
                        <span className="text-[10px] font-black uppercase tracking-widest mt-[1px]">{t.gallery}</span>
                    </div>
                </Link>

                <button 
                    onClick={onOpenContact}
                    className="flex shrink-0 items-center gap-2 px-5 py-3 bg-transparent backdrop-blur-sm border border-white/10 text-white/70 hover:text-white rounded-full transition-all will-change-transform hover:bg-white/5 hover:border-white/30 group"
                >
                    <Zap size={16} className="group-hover:text-emerald-400 transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-widest mt-[1px]">{t.talk}</span>
                </button>
            </motion.div>

            {/* MOBILE NAV COLLAPSE TOGGLE */}
            <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: "circOut" }}
                className="pointer-events-auto flex md:hidden items-center"
            >
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={t.menuAria} aria-expanded={isMenuOpen} className="p-3 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/10 transition-colors shadow-lg">
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
                        <button onClick={() => { toggleLang(); setIsMenuOpen(false); }} className="flex items-center gap-3 px-4 py-3.5 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-colors w-full">
                            <Globe size={16} className="text-white/50" />
                            <span className="text-[10px] font-black uppercase tracking-widest mt-[1px]">(EN/AR)</span>
                        </button>
                        <Link href="/about" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3.5 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-colors w-full">
                            <Info size={16} className="text-white/50" />
                            <span className="text-[10px] font-black uppercase tracking-widest mt-[1px]">{t.about}</span>
                        </Link>
                        <Link href="/our-work" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3.5 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-colors w-full">
                            <LayoutGrid size={16} className="text-white/50" />
                            <span className="text-[10px] font-black uppercase tracking-widest mt-[1px]">{t.gallery}</span>
                        </Link>
                        <button onClick={() => { onOpenContact(); setIsMenuOpen(false); }} className="flex items-center gap-3 px-4 py-3.5 bg-emerald-500/20 border border-emerald-500/50 text-white rounded-xl hover:bg-emerald-500/30 transition-colors w-full">
                            <Zap size={16} className="text-emerald-400" />
                            <span className="text-[10px] font-black uppercase tracking-widest mt-[1px]">{t.talk}</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

// --- 1. HIGHLY SATURATED BRIGHT BACKGROUND ENGINE (NO TEXT) ---
const BackgroundLayer = React.memo(({ activeColor }: { activeColor: string, activeIndex: number }) => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-[#020204]">
            
            {/* HIGHLY SATURATED BASE COLOR INJECTION */}
            <motion.div 
                animate={{ backgroundColor: activeColor }}
                transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 opacity-[0.75] saturate-[400%] mix-blend-color-dodge will-change-[background-color]"
            />
            
            {/* BUTTER SMOOTH ANIMATED ORBS FOR EXTRA BRIGHTNESS */}
            <div className="absolute inset-0 z-0 opacity-100 mix-blend-screen overflow-hidden pointer-events-none">
                <motion.div 
                    animate={{ 
                        backgroundColor: activeColor,
                        x: ['-5%', '10%', '-5%'],
                        y: ['-10%', '5%', '-10%'],
                        scale: [1, 1.15, 1]
                    }}
                   transition={{ 
    backgroundColor: { duration: 2.2, ease: [0.22, 1, 0.36, 1] },
    default: { duration: 25, ease: "easeInOut", repeat: Infinity }
}}
                    className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full blur-[140px] opacity-70 mix-blend-screen will-change-transform"
                />
                <motion.div 
                    animate={{ 
                        backgroundColor: activeColor,
                        x: ['10%', '-5%', '10%'],
                        y: ['10%', '-10%', '10%'],
                        scale: [1.1, 0.95, 1.1]
                    }}
                 transition={{ 
    backgroundColor: { duration: 2.2, ease: [0.22, 1, 0.36, 1] },
    default: { duration: 30, ease: "easeInOut", repeat: Infinity }
}}
                    className="absolute -bottom-[20%] -right-[10%] w-[80vw] h-[80vw] rounded-full blur-[130px] opacity-60 mix-blend-screen will-change-transform"
                />
            </div>

            {/* BRIGHT PREMIUM DOTS */}
            <div className="absolute inset-0 premium-dots z-0 opacity-80 pointer-events-none mix-blend-screen" />
            
            {/* EXTREME VIGNETTE FOR DEPTH */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.98)_110%)] z-0 pointer-events-none" />
        </div>
    );
});
BackgroundLayer.displayName = "BackgroundLayer";

// --- CUSTOM INTERACTIVE TICKER COMPONENT ---
// Pure CSS-driven infinite marquee. The track is rendered twice back-to-back
// and animated from translateX(0) to translateX(-50%), which loops perfectly
// forever with zero JS math and zero snap-back — this is what removes the
// stutter/glitch the old scrollLeft-based version had, and it's why the
// ticker now stays smooth and fully visible at any screen width, including
// very narrow foldable cover displays, since it never depends on measuring
// container/scroll widths at runtime.
function InteractiveTicker({ children, speed = 32, isAr = false, innerClassName = "" }: {
    children: React.ReactNode;
    speed?: number; // seconds for one full loop — lower is faster
    isAr?: boolean;
    innerClassName?: string;
}) {
    const [isPaused, setIsPaused] = useState(false);

    return (
        <div
            className="w-full overflow-hidden relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
        >
            <div
                className="marquee-track gpu-boost flex w-max"
                style={{
                    animationDuration: `${speed}s`,
                    animationDirection: isAr ? "reverse" : "normal",
                    animationPlayState: isPaused ? "paused" : "running",
                }}
            >
                <div className={`flex items-center shrink-0 ${innerClassName}`}>{children}</div>
                <div className={`flex items-center shrink-0 ${innerClassName}`} aria-hidden="true">{children}</div>
            </div>
        </div>
    );
}

// --- MAIN CAROUSEL COMPONENT ---
function Carousel3D() {
    const { isAr, t } = useContext(LangContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const targetRotationRef = useRef(0);
  const wheelAccumulator = useRef(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const RADIUS = isMobile ? 480 : 750;       
  const CARD_WIDTH = isMobile ? 220 : 320;

  // Slightly overdamped (damping ratio > 1) so every rotation eases to a
  // full, clean stop with zero bounce-back before the next transition can
  // begin — this is what makes the carousel feel butter smooth instead of
  // occasionally jittering when autoplay fires mid-settle.
  const rotationSpring = useSpring(0, { stiffness: 60, damping: 26, mass: 1 });
  const scaleSpring = useSpring(1, { stiffness: 120, damping: 22 });

  useEffect(() => {
    const unsubscribe = rotationSpring.on("change", (currentRotation) => {
      const index = Math.round(-currentRotation / ANGLE_STEP);
      const wrapped = ((index % SERVICES.length) + SERVICES.length) % SERVICES.length;
      if (wrapped !== activeIndex) setActiveIndex(wrapped);
    });
    return () => unsubscribe();
  }, [activeIndex, rotationSpring]);

  useEffect(() => {
    if (!isAutoPlaying) return;
   const interval = setInterval(() => {
    targetRotationRef.current -= (isAr ? -ANGLE_STEP : ANGLE_STEP);
    rotationSpring.set(targetRotationRef.current);
}, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, rotationSpring, isAr]);

  const pauseAutoplay = () => {
      setIsAutoPlaying(false);
      if (autoplayTimeoutRef.current) clearTimeout(autoplayTimeoutRef.current);
  };

  const resumeAutoplay = () => {
      if (autoplayTimeoutRef.current) clearTimeout(autoplayTimeoutRef.current);
      autoplayTimeoutRef.current = setTimeout(() => setIsAutoPlaying(true), 4000); 
  };
const next = () => {
    pauseAutoplay();
    targetRotationRef.current -= ANGLE_STEP;
    rotationSpring.set(targetRotationRef.current);
    resumeAutoplay();
};
const prev = () => {
    pauseAutoplay();
    targetRotationRef.current += ANGLE_STEP;
    rotationSpring.set(targetRotationRef.current);
    resumeAutoplay();
};

  const handleWheel = (e: React.WheelEvent) => {
      pauseAutoplay();
      wheelAccumulator.current += e.deltaY;
      if (wheelAccumulator.current > 150) { 
          isAr ? prev() : next();
          wheelAccumulator.current = 0;
      } else if (wheelAccumulator.current < -150) { 
          isAr ? next() : prev();
          wheelAccumulator.current = 0;
      }
      resumeAutoplay();
  };

  const handlePanStart = () => {
      pauseAutoplay();
      scaleSpring.set(0.95); 
  };
  const handlePan = (e: any, info: PanInfo) => rotationSpring.set(rotationSpring.get() + info.delta.x / (isMobile ? 3 : 5));
  const handlePanEnd = (e: any, info: PanInfo) => {
    const current = rotationSpring.get();
    const velocity = info.velocity.x / 10;
const target = Math.round((current + velocity) / ANGLE_STEP) * ANGLE_STEP;
targetRotationRef.current = target;
rotationSpring.set(target);
    scaleSpring.set(1);
    resumeAutoplay();
  };

  const activeColor = SERVICES[activeIndex].color;
  const activeSubtitle = isAr ? SERVICES[activeIndex].subAr : SERVICES[activeIndex].subtitle;
  const activeTitle = isAr ? SERVICES[activeIndex].titleAr : SERVICES[activeIndex].title;

  return (
    <div 
        className="relative w-full h-full flex flex-col items-center justify-center bg-black overflow-hidden perspective-[1200px] md:perspective-[2000px]"
        onWheel={handleWheel} 
    >
      <BackgroundLayer activeColor={activeColor} activeIndex={activeIndex} />

      {/* SWIPE CATCHER & 3D CAROUSEL STAGE */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center z-10 -mt-16 md:-mt-24 touch-none cursor-grab active:cursor-grabbing"
        style={{ transformStyle: "preserve-3d", WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden" }}
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
      >
        <motion.div
          className="relative flex items-center justify-center will-change-transform"
          style={{ 
            rotateY: rotationSpring,
            scale: scaleSpring,
            z: -RADIUS + (isMobile ? 120 : 250),
            transformStyle: "preserve-3d",
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden"
          }}
        >
          {SERVICES.map((item, i) => (
            <CarouselItem 
              key={item.id} item={item} index={i} isActive={i === activeIndex}
              cardWidth={CARD_WIDTH} radius={RADIUS} angleStep={ANGLE_STEP}
              onHoverStart={pauseAutoplay} onHoverEnd={resumeAutoplay}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* BOTTOM HUD UI & NAVIGATION (DUAL TICKERS) */}
      <div className="absolute bottom-0 w-full z-50 pointer-events-none">
        
        {/* Gradient Backdrop for Text Readability */}
        <div className="absolute bottom-0 inset-x-0 h-56 md:h-72 bg-gradient-to-t from-black via-black/90 to-transparent z-[-1]" />

        <div className="max-w-[1800px] mx-auto flex flex-col">
            
            {/* CAROUSEL CONTROLS */}
            <div className="flex items-end justify-center w-full gap-4 md:gap-8 relative px-6 md:px-12 pb-4 md:pb-6">
                <button onClick={prev} aria-label={t.prevAria} className={`absolute ${isAr ? 'right-6 lg:right-[30%]' : 'left-6 lg:left-[30%]'} pointer-events-auto group w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 bg-black/60 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white hover:text-black transition-all active:scale-95 shadow-[0_0_30px_rgba(0,0,0,0.8)]`}>
                    <ChevronLeft size={24} className={`transition-transform ${isAr ? 'group-hover:translate-x-1 rotate-180' : 'group-hover:-translate-x-1'}`} />
                </button>

                {/* SERVICE NAME PILL — width is now content-driven (w-fit) instead of a
                    fixed min-width, and the title text is forced to a single line
                    (whitespace-nowrap) with slightly tighter tracking/size only on the
                    smallest screens. Previously the fixed h-14 height combined with a
                    wrappable title meant long labels like "MALL KIOSKS" broke onto two
                    lines and spilled outside the pill on mobile. */}
                <div className="pointer-events-auto flex items-center justify-center mx-auto px-4 max-w-[88%] md:max-w-none md:w-auto">
                    <div className="min-h-[56px] md:h-16 px-5 sm:px-8 md:px-12 py-2 border border-white/10 bg-black/60 backdrop-blur-2xl rounded-full flex flex-col items-center justify-center w-fit max-w-full shadow-[0_0_40px_rgba(0,0,0,0.9)] relative overflow-hidden group transition-all hover:border-white/30">
                        <div className="flex flex-col items-center relative z-10">
                            <motion.span 
                                key={activeIndex}
                                initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                                className="text-[9px] md:text-[11px] uppercase tracking-[0.3em] font-black mb-1 drop-shadow-md whitespace-nowrap"
                                style={{ color: activeColor }}
                            >
                                {activeSubtitle}
                            </motion.span>
                            <motion.span 
                                key={activeIndex + "_t"}
                                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                className="text-[13px] sm:text-base md:text-xl font-black uppercase tracking-[0.08em] sm:tracking-[0.15em] md:tracking-[0.2em] text-white transition-transform duration-500 drop-shadow-lg whitespace-nowrap"
                            >
                                {activeTitle}
                            </motion.span>
                        </div>
                    </div>
                </div>

                <button onClick={next} aria-label={t.nextAria} className={`absolute ${isAr ? 'left-6 lg:left-[30%]' : 'right-6 lg:right-[30%]'} pointer-events-auto group w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 bg-black/60 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white hover:text-black transition-all active:scale-95 shadow-[0_0_30px_rgba(0,0,0,0.8)]`}>
                    <ChevronRight size={24} className={`transition-transform ${isAr ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
                </button>
            </div>

            {/* 1. STATIC LOCATION / DIRECT-LINE TICKER — centered on desktop, freely
                horizontally scrollable on mobile. The previous version applied
                `justify-center` to the *scrollable* container itself: when flex
                content wider than its box is centered, the browser positions the
                scroll offset so it starts already scrolled past the first item,
                and that space is unreachable — which is exactly why BHR was
                stuck off-screen and only KSA→MAIL were visible. Centering is now
                only applied at md+ where the row wraps and no scrolling is
                needed; on mobile the row is left-aligned inside a scroll
                container so the full BHR→MAIL range is reachable by swiping. */}
            <div className="w-full border-t border-white/10 py-3 md:py-4 flex items-center md:justify-center overflow-hidden pointer-events-auto relative px-4 md:px-12">
                <div className="flex-1 overflow-x-auto scrollbar-hide w-full snap-x snap-proximity scroll-pl-1 scroll-pr-6">
                    <div className="flex items-center justify-start md:justify-center gap-6 md:gap-10 whitespace-nowrap w-max md:w-full md:flex-wrap pl-1 pr-6 md:px-6 mx-auto">
                        {LOCATIONS.map((loc, i) => {
                            const innerContent = (
                                <>
                                    <div className="p-1.5 md:p-2 bg-white/5 rounded-full border border-white/10 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/20 transition-all duration-300">
                                        <loc.icon size={10} className="md:w-[12px] md:h-[12px] text-white/60 group-hover:text-emerald-400 transition-colors" />
                                    </div>
                                    <span className="text-[12px] md:text-[14px] font-bold text-white uppercase tracking-widest">{loc.label}:</span>
                                    <span className="text-[12px] md:text-[14px] text-white/70 font-mono group-hover:text-white transition-colors">{loc.text}</span>
                                    {loc.link && <ArrowUpRight size={10} className="text-white/30 group-hover:text-emerald-400 -ml-1 transition-colors" />}
                                </>
                            );

                            return loc.link ? (
                                <a key={i} href={loc.link} target={loc.link.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className="flex items-center gap-2 md:gap-3 opacity-80 hover:opacity-100 transition-all duration-300 group hover:scale-[1.02] cursor-pointer shrink-0 snap-start">
                                    {innerContent}
                                </a>
                            ) : (
                                <div key={i} className="flex items-center gap-2 md:gap-3 opacity-80 hover:opacity-100 transition-all duration-300 group shrink-0 snap-start">
                                    {innerContent}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* 2. TRUSTED PARTNERS TICKER */}
            <div className={`w-full border-t border-white/10 py-4 md:py-5 flex items-center overflow-hidden pointer-events-auto relative ${isAr ? 'pr-4 md:pr-12' : 'pl-4 md:pl-12'}`}>
                <div className={`hidden md:flex items-center gap-3 z-20 bg-transparent shrink-0 ${isAr ? 'pl-8 border-l border-white/10' : 'pr-8 border-r border-white/10'}`}>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_#10b981]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80 whitespace-nowrap">TRUSTED PARTNERS</span>
                </div>

                <div className="flex-1 overflow-hidden relative mask-linear-fade w-full min-w-0">
                     <InteractiveTicker speed={30} isAr={isAr} innerClassName="gap-10 sm:gap-12 md:gap-24 whitespace-nowrap pr-10 sm:pr-12 md:pr-24">
                        {CLIENTS.map((client, i) => {
                            const isSvg = client.logo.toLowerCase().endsWith('.svg');
                            return (
                            <div key={i} className="flex items-center justify-center opacity-80 hover:opacity-100 transition-all duration-500 cursor-default group hover:scale-110 shrink-0">
                                <div className={`relative flex items-center justify-center pointer-events-none ${isSvg ? 'h-10 sm:h-14 md:h-24 max-w-[100px] sm:max-w-[140px] md:max-w-[200px]' : 'h-6 sm:h-8 md:h-12 max-w-[70px] sm:max-w-[90px] md:max-w-[130px]'}`}>
                                    <img src={client.logo} alt={client.name} loading="lazy" decoding="async" className="h-full w-auto object-contain drop-shadow-xl pointer-events-none" />
                                </div>
                            </div>
                        )})}
                     </InteractiveTicker>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}

// -- UPGRADED UI: MEMOIZED & REDUCED CARD ITEM --
const CarouselItem = React.memo(({ item, index, isActive, cardWidth, radius, angleStep, onHoverStart, onHoverEnd }: any) => {
    const { isAr, t } = useContext(LangContext);
    const angle = index * angleStep;

    const title = isAr ? item.titleAr : item.title;
    const subtitle = isAr ? item.subAr : item.subtitle;

    return (
        <motion.div
            className="absolute top-1/2 left-1/2 will-change-transform"
            style={{
                width: cardWidth,
                height: cardWidth * 1.5, 
                marginLeft: -cardWidth / 2,
                marginTop: -(cardWidth * 1.5) / 2,
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                transformStyle: 'preserve-3d',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden'
            }}
        >
            <Link 
                href={item.link || "#"} 
                onMouseEnter={onHoverStart}
                onMouseLeave={onHoverEnd}
                className={`block w-full h-full relative group transition-transform duration-500 ${isActive ? 'cursor-pointer hover:scale-[1.03]' : 'pointer-events-none'}`}
                style={{ transformStyle: 'preserve-3d' }}
            >
                <div 
                    className={`
                        relative w-full h-full overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.2,1,0.3,1)]
                        rounded-[2rem] border
                        ${isActive 
                            ? 'border-white/50 scale-100 opacity-100 shadow-[0_0_80px_rgba(0,0,0,0.8)] group-hover:shadow-[0_0_100px_rgba(255,255,255,0.15)] z-30 ring-1 ring-white/20' 
                            : 'border-white/20 scale-[0.80] opacity-100 brightness-[0.75] saturate-100 z-10'}
                    `}
                    style={{ 
                        transformStyle: 'preserve-3d',
                        transform: isActive ? 'translateZ(40px)' : 'translateZ(0px)',
                        backgroundColor: isActive ? '#000' : '#111'
                    }}
                >
                    
                    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
                        <Image
                            src={item.image} alt={title} fill sizes="(max-width: 768px) 250px, 350px" priority={isActive}
                            className={`object-cover transition-transform duration-[2000ms] ease-out ${isActive ? 'scale-100 opacity-100' : 'scale-125 opacity-70'}`} draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/80 z-10 pointer-events-none" />
                    </div>
                    
                    {isActive && (
                        <div 
                            className="absolute inset-x-0 bottom-0 h-[50%] z-10 pointer-events-none opacity-40 mix-blend-screen transition-opacity duration-1000 will-change-transform"
                            style={{ background: `linear-gradient(to top, ${item.color}, transparent)` }}
                        />
                    )}

                    {/* CENTERED AND PERFECTLY ALIGNED TEXT */}
                    <div 
                        className={`absolute inset-0 z-30 flex flex-col justify-center p-5 md:p-6 transition-all duration-[600ms] ease-out delay-100 ${isActive ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'}`}
                        style={{ transform: "translateZ(40px)" }}
                    >
                        <div className="w-full flex flex-col items-center text-center drop-shadow-2xl">
                            <div className={`flex items-center justify-center gap-2.5 mb-2.5 ${isAr ? 'flex-row-reverse' : ''}`}>
                                <div className="h-[2px] w-5 md:w-6" style={{ backgroundColor: item.color }} />
                                <span className="text-[8px] md:text-[10px] font-black text-white uppercase tracking-[0.3em]">{subtitle}</span>
                                <div className="h-[2px] w-5 md:w-6" style={{ backgroundColor: item.color }} />
                            </div>
                            
                            <h2 className="text-3xl md:text-4xl font-black text-white leading-[0.9] tracking-tighter uppercase mb-4 md:mb-5 drop-shadow-xl">
                                {title}
                            </h2>
                            
                            <div className="flex items-center justify-center w-full border-t border-white/20 pt-4 md:pt-5">
                                <div className={`group/btn relative inline-flex items-center justify-center gap-3 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-xl transition-all duration-500 shadow-2xl ${isAr ? 'flex-row-reverse' : ''} ${isActive ? 'group-hover:text-black' : ''}`}>
                                    {/* Glass panel lives on its own layer, separate from the text below,
                                        so the backdrop-blur filter never softens the label itself. */}
                                    <div className={`absolute inset-0 rounded-xl border backdrop-blur-md transition-all duration-500 ${isActive ? 'bg-white/10 border-white/20 group-hover:bg-white' : 'bg-transparent border-transparent'}`} />
                                    <span className="crisp-label relative z-10 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.15em]">{t.explore}</span>
                                    <div className="relative z-10 w-5 h-5 md:w-7 md:h-7 rounded-full flex items-center justify-center overflow-hidden transition-colors duration-500 bg-black/10 group-hover:bg-black/5">
                                        <ArrowUpRight size={12} className={`text-current transition-transform duration-500 absolute ${isAr ? 'group-hover/btn:-translate-x-4 group-hover/btn:-translate-y-4' : 'group-hover/btn:translate-x-4 group-hover/btn:-translate-y-4'} group-hover:translate-x-4 group-hover:-translate-y-4`} />
                                        <ArrowUpRight size={12} className={`text-current transition-transform duration-500 absolute ${isAr ? 'translate-x-4 translate-y-4' : '-translate-x-4 translate-y-4'} group-hover/btn:translate-x-0 group-hover/btn:translate-y-0 group-hover:translate-x-0 group-hover:translate-y-0`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Link>
        </motion.div>
    );
});
CarouselItem.displayName = "CarouselItem";

// --- OMNI-MODAL SYSTEM ---
function ContactOmniModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { isAr, t } = useContext(LangContext);
    const [activeTab, setActiveTab] = useState<'email' | 'ai'>('email');

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6" dir={isAr ? "rtl" : "ltr"}>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 10 }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-4xl h-[90vh] md:h-[650px] bg-[#050508] border border-white/10 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col md:flex-row"
                    >
                        <div className={`w-full md:w-64 bg-[#0a0a0f] border-b md:border-b-0 p-5 md:p-8 flex flex-col justify-between relative overflow-hidden ${isAr ? 'md:border-l border-white/10' : 'md:border-r border-white/10'}`}>
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                            <div className="relative z-10">
                                <h3 className="text-[9px] md:text-xs font-mono text-emerald-500 uppercase tracking-widest mb-4 md:mb-8 border-b border-white/5 pb-3">{t.sysUplink}</h3>
                                <div className="grid grid-cols-2 md:flex md:flex-col gap-2 md:gap-3">
                                    <TabButton isActive={activeTab === 'email'} onClick={() => setActiveTab('email')} icon={Mail} label={t.uplink} desc={t.traditional} />
                                    <TabButton isActive={activeTab === 'ai'} onClick={() => setActiveTab('ai')} icon={Bot} label={t.neural} desc={t.aiAssist} />
                                </div>
                            </div>
                            <div className="hidden sm:block relative z-10 mt-6 md:mt-0">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                                    <span className="text-[9px] font-bold uppercase text-white/60 tracking-widest">{t.serverOn}</span>
                                </div>
                                <p className="text-[9px] text-white/30 leading-relaxed font-mono whitespace-pre-line">{t.latency}</p>
                            </div>
                        </div>

                        <div className="flex-1 relative bg-[#020203] overflow-hidden flex flex-col">
                            <button onClick={onClose} aria-label={t.closeAria} className={`absolute top-6 ${isAr ? 'left-6' : 'right-6'} z-20 p-2 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 transition-colors text-white/60 hover:text-white`}><X size={16} /></button>
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-5 md:p-10">
                                <AnimatePresence mode="wait">
                                    {activeTab === 'email' ? <EmailInterface key="email" /> : <AIInterface key="ai" />}
                                </AnimatePresence>
                            </div>
                        </div>
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
                        <label htmlFor="contact-name" className="text-[9px] md:text-[10px] font-mono text-emerald-500 uppercase tracking-widest">{t.identity}</label>
                        <input id="contact-name" name="name" type="text" autoComplete="name" placeholder={t.nameOrg} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 md:py-4 text-xs md:text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all placeholder:text-white/20" />
                    </div>
                    <div className="space-y-1.5">
                        <label htmlFor="contact-email" className="text-[9px] md:text-[10px] font-mono text-emerald-500 uppercase tracking-widest">{t.coords}</label>
                        <input id="contact-email" name="email" type="email" autoComplete="email" placeholder={t.emailAddr} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 md:py-4 text-xs md:text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all placeholder:text-white/20" />
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label htmlFor="contact-brief" className="text-[9px] md:text-[10px] font-mono text-emerald-500 uppercase tracking-widest">{t.brief}</label>
                    <textarea id="contact-brief" name="brief" rows={4} placeholder={t.outline} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 md:py-4 text-xs md:text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all resize-none placeholder:text-white/20" />
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
    const [messages, setMessages] = useState<{ role: string; text: string; time: string }[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>(DEFAULT_SUGGESTIONS_EN);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const nowStr = () => new Date().toLocaleTimeString(isAr ? "ar-BH" : "en-US", { hour: "2-digit", minute: "2-digit" });

    useEffect(() => {
        setMessages([{ role: "ai", text: t.aiGreeting, time: nowStr() }]);
        setSuggestions(isAr ? DEFAULT_SUGGESTIONS_AR : DEFAULT_SUGGESTIONS_EN);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [t.aiGreeting]);

    const sendMessage = (text: string) => {
        if (!text.trim()) return;
        setMessages(prev => [...prev, { role: "user", text, time: nowStr() }]);
        setInput("");
        setIsTyping(true);
        setSuggestions([]);

        const { text: reply, suggestions: nextSuggestions } = getLocalAIResponse(text, isAr, t);

        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, { role: "ai", text: reply, time: nowStr() }]);
            setSuggestions(nextSuggestions);
        }, 500 + Math.min(text.length * 6, 600));
    };

    useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, isTyping]);

    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full flex flex-col">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-4 md:mb-6 border-b border-white/10 pb-4 md:pb-6 shrink-0">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="relative">
                        <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-gradient-to-tr from-emerald-400 to-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                            <Sparkles size={16} className="text-white" />
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#020203]" />
                    </div>
                    <div>
                        <h3 className="text-xs md:text-sm font-black text-white uppercase tracking-wider">{t.neuralInt}</h3>
                        <span className="text-[9px] md:text-[10px] text-emerald-400/90 uppercase tracking-[0.15em] font-mono">{t.listening}</span>
                    </div>
                </div>
            </div>

            {/* MESSAGES */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar mb-3">
                {messages.map((msg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                        <div className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center shrink-0 ${msg.role === "ai" ? "bg-white/10 border border-white/10" : "bg-white text-black shadow-md"}`}>
                            {msg.role === "ai" ? <Sparkles size={13} className="text-emerald-400" /> : <User size={13} />}
                        </div>
                        <div className="flex flex-col max-w-[85%] md:max-w-[78%]">
                            <div className={`p-3 md:p-4 rounded-2xl text-xs md:text-sm leading-relaxed whitespace-pre-line ${
                                msg.role === "ai"
                                    ? `bg-white/5 text-white/90 border border-white/10 ${isAr ? "rounded-tr-none" : "rounded-tl-none"}`
                                    : `bg-white text-black shadow-lg ${isAr ? "rounded-tl-none" : "rounded-tr-none"}`
                            }`}>
                                {msg.text}
                            </div>
                            <span className={`text-[8px] text-white/25 font-mono mt-1 ${msg.role === "user" ? "text-right" : "text-left"}`}>{msg.time}</span>
                        </div>
                    </motion.div>
                ))}

                {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                        <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10"><Sparkles size={13} className="text-emerald-400" /></div>
                        <div className={`bg-white/5 px-4 py-3 rounded-2xl border border-white/10 flex gap-1.5 items-center h-10 ${isAr ? "rounded-tr-none" : "rounded-tl-none"}`}>
                            <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                    </motion.div>
                )}
            </div>

            {/* SUGGESTION CHIPS */}
            {!isTyping && suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3 shrink-0">
                    {suggestions.map((s, i) => (
                        <button
                            key={i}
                            onClick={() => sendMessage(s)}
                            className="text-[10px] md:text-[11px] px-3 py-2 rounded-full border border-white/15 bg-white/5 text-white/70 hover:text-white hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all"
                        >
                            {s}
                        </button>
                    ))}
                </div>
            )}

            {/* INPUT */}
            <div className="relative mt-auto shrink-0 pb-2 md:pb-0">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                    type="text"
                    placeholder={t.enterCmd}
                    className={`w-full bg-[#0a0a0f] border border-white/20 rounded-2xl py-3.5 md:py-4 text-xs md:text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-white/20 shadow-inner ${isAr ? "pr-5 md:pr-6 pl-12 md:pl-14" : "pl-5 md:pl-6 pr-12 md:pr-14"}`}
                />
                <button onClick={() => sendMessage(input)} className={`absolute top-2 md:top-2.5 p-1.5 md:p-2 bg-white text-black rounded-xl hover:scale-105 active:scale-95 transition-transform shadow-md ${isAr ? "left-2 md:left-3" : "right-2 md:right-3"}`}>
                    <ArrowRight size={16} className={`md:w-[18px] md:h-[18px] ${isAr ? "rotate-180" : ""}`} />
                </button>
            </div>
        </motion.div>
    );
}