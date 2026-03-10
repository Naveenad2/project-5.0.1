"use client";

import { useState, useEffect, useRef } from "react";
import { ColoursLogoHeader } from "@/components/ui/ColoursLogoHeader";
import Carousel3D from "@/components/landing/Carousel3D";
import { 
    ArrowRight, MessageSquare, Mail, X, Send, Bot, 
    Sparkles, User, Loader2, Command, ChevronRight,
    Radio, Activity, Globe, Zap, Menu
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// --- MAIN PAGE COMPONENT ---
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="h-screen w-full bg-[#020202] text-white relative overflow-hidden font-sans selection:bg-emerald-500/30">
      
      {/* 1. DECONSTRUCTED HUD NAVIGATION */}
      <Navbar onOpenContact={() => setIsModalOpen(true)} />

      {/* 2. MAIN 3D CAROUSEL */}
      <Carousel3D />

      {/* 3. OMNI-MODAL SYSTEM */}
      <ContactOmniModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
    </main>
  );
}

// --- COMPONENT: DECONSTRUCTED NAVBAR (NO BAR) ---
function Navbar({ onOpenContact }: { onOpenContact: () => void }) {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-8 flex items-start justify-between pointer-events-none">
            
            {/* ZONE 1: BRAND LOGO (Top Left) */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="pointer-events-auto"
            >
                <Link href="/" className="group relative block">
                    <div className="w-32 md:w-40 relative z-10 transition-transform duration-500 group-hover:scale-105">
                        <ColoursLogoHeader className="w-full h-auto fill-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                    </div>
                </Link>
            </motion.div>

            {/* ZONE 3: ACTIONS (Top Right) */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "circOut" }}
                className="pointer-events-auto flex items-center gap-3 ml-auto"
            >
                {/* Menu Link */}
                <Link 
                    href="/about"
                    className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all group"
                >
                    <span className="text-[10px] font-bold uppercase tracking-widest">About Colours</span>
                </Link>

                {/* Initiate Button */}
                <button 
                    onClick={onOpenContact}
                    className="group relative px-6 py-3 bg-white text-black rounded-full flex items-center gap-3 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 flex items-center gap-2">
                        <Zap size={12} className="fill-black" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Talk To US</span>
                    </div>
                </button>
            </motion.div>

        </nav>
    );
}

// --- COMPONENT: OMNI-MODAL SYSTEM ---
function ContactOmniModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [activeTab, setActiveTab] = useState<'email' | 'ai'>('email');

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 10 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-4xl h-[600px] bg-[#050505] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col md:flex-row"
                    >
                        {/* Sidebar / Tabs */}
                        <div className="w-full md:w-64 bg-[#0a0a0f] border-b md:border-b-0 md:border-r border-white/10 p-6 flex flex-col justify-between relative overflow-hidden">
                            {/* Decorative Grid */}
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                            
                            <div className="relative z-10">
                                <h3 className="text-[9px] font-mono text-emerald-500 uppercase tracking-widest mb-8 border-b border-white/10 pb-4">
                                    System_Uplink_v2.0
                                </h3>
                                <div className="space-y-2">
                                    <TabButton 
                                        isActive={activeTab === 'email'} 
                                        onClick={() => setActiveTab('email')} 
                                        icon={Mail} 
                                        label="Direct Uplink" 
                                        desc="Traditional Inquiry"
                                    />
                                    <TabButton 
                                        isActive={activeTab === 'ai'} 
                                        onClick={() => setActiveTab('ai')} 
                                        icon={Bot} 
                                        label="Neural Agent" 
                                        desc="AI Assistant"
                                    />
                                </div>
                            </div>
                            
                            {/* Footer Info */}
                            <div className="hidden md:block relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                                    <span className="text-[9px] font-bold uppercase text-white/60">Server Online</span>
                                </div>
                                <p className="text-[9px] text-white/30 leading-relaxed font-mono">
                                    Latency: 12ms <br/>
                                    Encryption: AES-256
                                </p>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 relative bg-black">
                            {/* Close Button */}
                            <button 
                                onClick={onClose}
                                className="absolute top-6 right-6 z-20 p-2 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 transition-colors text-white/60 hover:text-white"
                            >
                                <X size={16} />
                            </button>

                            <div className="h-full w-full p-6 md:p-10 overflow-hidden relative">
                                <AnimatePresence mode="wait">
                                    {activeTab === 'email' ? (
                                        <EmailInterface key="email" />
                                    ) : (
                                        <AIInterface key="ai" />
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

// --- SUB-COMPONENT: TAB BUTTON ---
function TabButton({ isActive, onClick, icon: Icon, label, desc }: any) {
    return (
        <button 
            onClick={onClick}
            className={`w-full relative flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-left group overflow-hidden border ${isActive ? 'bg-white/5 border-white/20' : 'hover:bg-white/5 border-transparent'}`}
        >
            {isActive && (
                <motion.div 
                    layoutId="activeTabGlow"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" 
                />
            )}
            <div className={`relative z-10 p-2 rounded-lg transition-colors ${isActive ? 'bg-white text-black' : 'bg-white/5 text-white/60 group-hover:text-white'}`}>
                <Icon size={18} />
            </div>
            <div className="relative z-10">
                <span className={`block text-xs font-bold uppercase tracking-wider ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                    {label}
                </span>
                <span className="text-[9px] text-white/40 font-mono">{desc}</span>
            </div>
        </button>
    );
}

// --- SUB-COMPONENT: EMAIL INTERFACE ---
function EmailInterface() {
    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full flex flex-col justify-center max-w-lg mx-auto"
        >
            <div className="mb-8">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                    <Mail size={18} className="text-white" />
                </div>
                <h2 className="text-3xl font-medium tracking-tight text-white mb-2">Initialize Project</h2>
                <p className="text-sm text-white/50">Submit your dossier. Our strategy team will intercept.</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-[9px] font-mono text-emerald-500 uppercase">Identity</label>
                        <input type="text" placeholder="Name / Organization" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all placeholder:text-white/20" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[9px] font-mono text-emerald-500 uppercase">Coordinates</label>
                        <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all placeholder:text-white/20" />
                    </div>
                </div>
                
                <div className="space-y-1">
                    <label className="text-[9px] font-mono text-emerald-500 uppercase">Briefing</label>
                    <textarea rows={4} placeholder="Outline mission parameters..." className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all resize-none placeholder:text-white/20" />
                </div>

                <button className="w-full group bg-white text-black h-12 rounded-lg font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-emerald-400 transition-colors mt-4 shadow-lg hover:shadow-emerald-500/20">
                    <span>Transmit Data</span>
                    <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
            </form>
        </motion.div>
    );
}

// --- SUB-COMPONENT: AI CHAT INTERFACE ---
function AIInterface() {
    const [messages, setMessages] = useState([
        { role: 'ai', text: "Systems online. I am the Colours Interface. How can we engineer your next experience?" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleSend = () => {
        if (!input.trim()) return;
        
        const newMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, newMsg]);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, { 
                role: 'ai', 
                text: "Signal received. I've flagged this for our creative directors. Would you like to upload a project brief?" 
            }]);
        }, 1500);
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full flex flex-col"
        >
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 to-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                        <Sparkles size={14} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white">Neural Interface</h3>
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[9px] text-white/50 uppercase tracking-wider">Listening</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar mb-4">
                {messages.map((msg, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'ai' ? 'bg-white/10 border border-white/10' : 'bg-white text-black'}`}>
                            {msg.role === 'ai' ? <Bot size={14} /> : <User size={14} />}
                        </div>
                        <div className={`p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                            msg.role === 'ai' 
                                ? 'bg-white/5 text-white/90 rounded-tl-none border border-white/10' 
                                : 'bg-white text-black rounded-tr-none shadow-lg'
                        }`}>
                            {msg.text}
                        </div>
                    </motion.div>
                ))}
                
                {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                            <Bot size={14} />
                        </div>
                        <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tl-none border border-white/10 flex gap-1">
                            <span className="w-1 h-1 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-1 h-1 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-1 h-1 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Input Area */}
            <div className="relative">
                <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    type="text" 
                    placeholder="Enter command or query..." 
                    className="w-full bg-[#0a0a0f] border border-white/20 rounded-full pl-6 pr-12 py-3.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-white/20 shadow-inner"
                />
                <button 
                    onClick={handleSend}
                    className="absolute right-2 top-2 p-1.5 bg-white text-black rounded-full hover:scale-110 transition-transform"
                >
                    <ArrowRight size={16} />
                </button>
            </div>
        </motion.div>
    );
}