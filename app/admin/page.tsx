"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { ref, onValue, push, serverTimestamp } from "firebase/database";
import { auth, db } from "@/lib/firebase"; // Make sure this path exists
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Save, 
  Plus, 
  TrendingUp, 
  Users, 
  Eye,
  Send, 
  User as UserIcon, 
  CheckCircle, 
  Search,
  Activity,
  LucideIcon // Import type for icons
} from "lucide-react";

// --- TYPES (Crucial for Build) ---
interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: number;
}

interface MessageData {
  id: string;
  text: string;
  sender: string;
  timestamp: number;
}

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

// --- COMPONENTS ---

// 1. LOGIN SCREEN
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Access Denied. Check credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#111] border border-white/10 p-8 rounded-2xl shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4F93C] to-transparent opacity-50" />
        <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Colours <span className="text-[#D4F93C]">Admin</span></h1>
            <p className="text-gray-500 text-sm mt-2">Restricted Access Portal</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-[#D4F93C] outline-none transition-colors"
              placeholder="admin@colours.bahrain"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-[#D4F93C] outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
          <button 
            type="submit"
            className="w-full py-4 bg-[#D4F93C] text-black font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-colors"
          >
            Authenticate
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// 2. DASHBOARD WIDGETS
const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend }) => (
    <motion.div 
        whileHover={{ y: -5 }}
        className="bg-[#111] border border-white/10 p-6 rounded-2xl flex flex-col justify-between h-32 relative overflow-hidden group"
    >
        <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Icon size={64} />
        </div>
        <div className="flex justify-between items-start z-10">
            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest">{title}</h3>
            <span className={`text-xs font-bold flex items-center gap-1 ${trend > 0 ? 'text-[#D4F93C]' : 'text-gray-600'}`}>
                {trend > 0 ? '+' : ''}{trend}% <TrendingUp size={12} />
            </span>
        </div>
        <div className="z-10">
            <span className="text-4xl font-black text-white">{value}</span>
        </div>
    </motion.div>
);

// 3. MESSAGING CONSOLE (REAL-TIME)
const MessagesInbox = () => {
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [replyText, setReplyText] = useState("");
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 1. Listen to Realtime Database
    useEffect(() => {
        const chatRef = ref(db, 'support_chats');

        const unsubscribe = onValue(chatRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const loadedMessages = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...(value as Omit<MessageData, 'id'>)
                }));
                // Sort by timestamp
                loadedMessages.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
                setMessages(loadedMessages);
            } else {
                setMessages([]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // 2. Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // 3. Send Reply
    const handleSendReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyText.trim()) return;

        const chatRef = ref(db, 'support_chats');
        
        await push(chatRef, {
            text: replyText,
            sender: "admin", 
            timestamp: serverTimestamp()
        });
        
        setReplyText("");
    };

    const formatTime = (timestamp: number) => {
        if (!timestamp) return "Just now";
        return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const lastMessage = messages.length > 0 ? messages[messages.length - 1].text : "No messages yet";

    return (
        <div className="h-[75vh] flex bg-[#111] border border-white/10 rounded-2xl overflow-hidden animate-in fade-in duration-500 shadow-2xl">
            {/* LEFT SIDEBAR: ACTIVE SESSIONS */}
            <div className="w-80 border-r border-white/10 flex flex-col hidden md:flex bg-[#0a0a0a]">
                <div className="p-6 border-b border-white/10">
                    <h2 className="text-white font-bold text-lg mb-1 flex items-center gap-2">
                        Inbox <span className="bg-[#D4F93C] text-black text-[10px] px-2 py-0.5 rounded-full">{messages.length}</span>
                    </h2>
                    <p className="text-gray-500 text-xs">Live Support Queue</p>
                    
                    <div className="mt-4 relative">
                        <Search size={14} className="absolute left-3 top-3 text-gray-500" />
                        <input type="text" placeholder="Search chats..." className="w-full bg-[#1a1a1a] border border-white/5 rounded-lg py-2 pl-9 text-xs text-white focus:border-[#D4F93C] outline-none" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="p-4 border-b border-white/5 bg-[#1a1a1a]/50 border-l-2 border-l-[#D4F93C] cursor-pointer hover:bg-[#1a1a1a] transition-colors">
                        <div className="flex justify-between mb-1">
                            <span className="text-white font-bold text-sm">Website Visitor</span>
                            <span className="text-gray-500 text-[10px]">Active</span>
                        </div>
                        <p className="text-gray-400 text-xs line-clamp-1">{lastMessage}</p>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: CHAT WINDOW */}
            <div className="flex-1 flex flex-col bg-[#050505] relative">
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#111]/80 backdrop-blur-md z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-900 flex items-center justify-center border border-white/10">
                            <UserIcon size={18} className="text-white/50" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-sm">Public Channel</h3>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-[#D4F93C] animate-pulse" />
                                <span className="text-[#D4F93C] text-xs">Live Connection</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
                    {loading ? (
                        <div className="flex justify-center mt-10"><div className="w-6 h-6 border-2 border-[#D4F93C] border-t-transparent rounded-full animate-spin"/></div>
                    ) : messages.length === 0 ? (
                        <div className="text-center text-gray-600 mt-20 flex flex-col items-center">
                            <MessageSquare size={48} className="opacity-20 mb-4" />
                            <p>No messages found in the database.</p>
                            <p className="text-xs mt-2">Waiting for user interaction...</p>
                        </div>
                    ) : (
                        messages.map((msg, idx) => {
                            const isAdmin = msg.sender === 'admin';
                            return (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[70%] flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}>
                                        <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${
                                            isAdmin 
                                            ? 'bg-[#D4F93C] text-black rounded-tr-none' 
                                            : 'bg-[#1a1a1a] text-gray-200 border border-white/10 rounded-tl-none'
                                        }`}>
                                            {msg.text}
                                        </div>
                                        <span className="text-[10px] text-gray-600 mt-2 flex items-center gap-1">
                                            {formatTime(msg.timestamp)}
                                            {isAdmin && <CheckCircle size={10} />}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 bg-[#111] border-t border-white/10">
                    <form onSubmit={handleSendReply} className="relative flex items-center gap-4">
                        <input 
                            type="text" 
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Type a reply as Admin..." 
                            className="flex-1 bg-[#050505] border border-white/10 rounded-xl px-5 py-4 text-white focus:border-[#D4F93C] focus:ring-1 focus:ring-[#D4F93C] outline-none transition-all placeholder:text-gray-600"
                        />
                        <button 
                            type="submit" 
                            disabled={!replyText.trim()}
                            className="bg-[#D4F93C] text-black p-4 rounded-xl hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

// 4. HERO EDITOR
const HeroEditor = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
        <h2 className="text-2xl font-bold text-white mb-6">Hero Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase font-bold">Main Headline</label>
                <input type="text" defaultValue="Step into the Spotlight" className="w-full bg-black border border-white/10 p-4 rounded-xl text-white focus:border-[#D4F93C] outline-none" />
            </div>
            <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase font-bold">Sub Headline</label>
                <input type="text" defaultValue="We craft world-class spaces" className="w-full bg-black border border-white/10 p-4 rounded-xl text-white focus:border-[#D4F93C] outline-none" />
            </div>
            <div className="col-span-full space-y-2">
                <label className="text-xs text-gray-400 uppercase font-bold">Video Asset URL</label>
                <input type="text" defaultValue="/video.mp4" className="w-full bg-black border border-white/10 p-4 rounded-xl text-white focus:border-[#D4F93C] outline-none" />
            </div>
        </div>
        <div className="flex justify-end">
            <button className="flex items-center gap-2 bg-[#D4F93C] text-black px-6 py-3 rounded-lg font-bold uppercase text-xs tracking-widest hover:opacity-90 transition-opacity">
                <Save size={16} /> Save Changes
            </button>
        </div>
    </div>
);

// 5. GALLERY MANAGER
const GalleryManager = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Media Library</h2>
            <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-bold uppercase text-xs tracking-widest hover:opacity-90">
                <Plus size={16} /> Upload Media
            </button>
        </div>
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-white/10 rounded-2xl bg-[#111]">
             <ImageIcon size={48} className="text-gray-600 mb-4" />
             <p className="text-gray-400 text-sm">No media items found</p>
             <p className="text-gray-600 text-xs">Upload images to populate the gallery</p>
        </div>
    </div>
);

// --- MAIN ADMIN LAYOUT ---

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
          <div className="w-8 h-8 border-4 border-[#D4F93C] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#D4F93C] text-xs font-bold uppercase tracking-widest">System Initializing...</p>
      </div>
  );
  
  if (!user) return <LoginScreen />;

  const menuItems: MenuItem[] = [
    { id: "dashboard", label: "Overview", icon: LayoutDashboard },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "hero", label: "Hero Section", icon: Eye },
    { id: "gallery", label: "Gallery Media", icon: ImageIcon },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden font-sans">
        {/* SIDEBAR */}
        <motion.aside 
            animate={{ width: isSidebarOpen ? 280 : 80 }}
            className="fixed md:relative h-screen bg-[#0a0a0a] border-r border-white/10 z-40 flex flex-col justify-between hidden md:flex"
        >
            <div>
                <div className="p-8 flex items-center gap-3 overflow-hidden whitespace-nowrap">
                    <div className="w-8 h-8 rounded-full bg-[#D4F93C] flex-shrink-0" />
                    {isSidebarOpen && (
                        <motion.span initial={{opacity:0}} animate={{opacity:1}} className="font-black text-xl tracking-tighter uppercase">
                            Colours
                        </motion.span>
                    )}
                </div>

                <nav className="px-4 space-y-2 mt-8">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                                activeTab === item.id 
                                ? "bg-[#D4F93C] text-black shadow-[0_0_20px_rgba(212,249,60,0.3)]" 
                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                            }`}
                        >
                            <item.icon size={20} className="flex-shrink-0" />
                            {isSidebarOpen && (
                                <span className="font-bold text-sm tracking-wide uppercase whitespace-nowrap overflow-hidden">
                                    {item.label}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="p-4">
                <button onClick={() => signOut(auth)} className="w-full flex items-center gap-4 p-4 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors">
                    <LogOut size={20} />
                    {isSidebarOpen && <span className="font-bold text-sm uppercase">Logout</span>}
                </button>
            </div>
        </motion.aside>

        {/* MOBILE HEADER */}
        <div className="md:hidden fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 p-4 border-b border-white/10 flex justify-between items-center">
            <span className="font-black text-lg uppercase">Colours Admin</span>
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-white">
                {isSidebarOpen ? <X /> : <Menu />}
            </button>
        </div>

        {/* MOBILE MENU OVERLAY */}
        <AnimatePresence>
            {isSidebarOpen && (
                <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    className="md:hidden fixed inset-0 bg-black z-40 pt-20 px-6 space-y-4"
                >
                    {menuItems.map((item) => (
                         <button
                            key={item.id}
                            onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                            className={`w-full flex items-center gap-4 p-4 rounded-xl text-left ${activeTab === item.id ? "bg-[#D4F93C] text-black" : "text-white"}`}
                        >
                            <item.icon size={20} />
                            <span className="font-bold uppercase">{item.label}</span>
                        </button>
                    ))}
                     <button onClick={() => signOut(auth)} className="w-full flex items-center gap-4 p-4 text-red-500 mt-8">
                        <LogOut size={20} /> Logout
                    </button>
                </motion.div>
            )}
        </AnimatePresence>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-6 md:p-12 pt-24 md:pt-12 relative">
            {/* Top Bar */}
            <header className="flex justify-between items-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
                        {menuItems.find(i => i.id === activeTab)?.label}
                    </h1>
                    <p className="text-gray-500 text-sm">Dashboard Overview</p>
                </div>
                <div className="hidden md:flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-white font-bold text-sm">System Status</p>
                        <p className="text-[#D4F93C] text-xs uppercase flex items-center justify-end gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#D4F93C] animate-pulse"/> Online
                        </p>
                    </div>
                </div>
            </header>

            {/* DYNAMIC CONTENT */}
            <div className="max-w-7xl mx-auto">
                {activeTab === "dashboard" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-5 fade-in duration-500">
                        <StatCard title="Total Visits" value="0" icon={Users} trend={0} />
                        <StatCard title="Projects" value="0" icon={ImageIcon} trend={0} />
                        <StatCard title="Enquiries" value="0" icon={MessageSquare} trend={0} />
                        
                        <div className="col-span-1 md:col-span-2 bg-[#111] border border-white/10 rounded-2xl p-6 h-64 flex flex-col justify-center items-center text-gray-600 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-0" />
                            <Activity size={48} className="mb-4 opacity-20" />
                            <span className="text-xs uppercase font-bold tracking-widest text-gray-500">Traffic Analytics</span>
                            <span className="text-xs text-gray-600 mt-1">No data available for display</span>
                        </div>
                        
                         <div className="col-span-1 bg-[#D4F93C] rounded-2xl p-6 h-64 flex flex-col justify-between text-black shadow-lg shadow-[#D4F93C]/20">
                             <h3 className="font-black text-2xl uppercase leading-none">Quick<br/>Actions</h3>
                             <div className="space-y-2">
                                <button className="w-full bg-black/10 hover:bg-black/20 p-3 rounded-lg text-xs font-bold uppercase text-left transition-colors flex justify-between items-center">
                                    New Project <Plus size={14}/>
                                </button>
                                <button onClick={() => setActiveTab("messages")} className="w-full bg-black/10 hover:bg-black/20 p-3 rounded-lg text-xs font-bold uppercase text-left transition-colors flex justify-between items-center">
                                    Check Inbox <MessageSquare size={14}/>
                                </button>
                             </div>
                        </div>
                    </div>
                )}

                {activeTab === "hero" && <HeroEditor />}
                {activeTab === "gallery" && <GalleryManager />}
                {activeTab === "messages" && <MessagesInbox />}
                {activeTab === "settings" && (
                    <div className="text-center py-20 text-gray-500">
                        <Settings size={48} className="mx-auto mb-4 opacity-20" />
                        <p className="uppercase tracking-widest text-sm">Global Settings Configuration</p>
                    </div>
                )}
            </div>
        </main>
    </div>
  );
}