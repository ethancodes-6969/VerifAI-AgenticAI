import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronLeft,
    ChevronRight,
    X,
    Activity,
    Brain,
    Zap,
    TrendingUp,
    Target,
    Shield,
    Clock,
    Mail,
    MessageSquare,
    Code,
    BarChart3,
    CheckCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";

const SLIDE_DURATION = 5000;

import ContactModal from "../components/ContactModal";

const DemoSlideshow = ({ isOpen, onClose }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const navigate = useNavigate();

    const slides = [
        { id: 0, title: "How VerifAI Works" },
        { id: 1, title: "Live Detection Performance" },
        { id: 2, title: "Risk Scoring Example" },
        { id: 3, title: "Multi-Channel Alerts" },
        { id: 4, title: "Ready to Launch?" },
    ];

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);

    // Auto-advance
    useEffect(() => {
        if (!isOpen || isPaused || isContactOpen) return; // Pause if contact modal is open
        const timer = setInterval(nextSlide, SLIDE_DURATION);
        return () => clearInterval(timer);
    }, [isOpen, isPaused, isContactOpen, nextSlide]);

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen || isContactOpen) return; // Disable keyboard nav if contact modal open
            if (e.key === "ArrowRight") nextSlide();
            if (e.key === "ArrowLeft") prevSlide();
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, isContactOpen, nextSlide, prevSlide, onClose]);

    if (!isOpen) return null;

    return (
        <React.Fragment>
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative w-full max-w-5xl bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col h-[600px] md:h-[650px]"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 transition-colors"
                    >
                        <X size={24} className="text-text-primary" />
                    </button>

                    {/* Slides Container */}
                    <div className="flex-1 relative overflow-hidden p-6 md:p-12">
                        <AnimatePresence mode="wait">
                            <SlideContent
                                key={currentSlide}
                                step={currentSlide}
                                navigate={navigate}
                                onClose={onClose}
                                onOpenContact={() => setIsContactOpen(true)}
                            />
                        </AnimatePresence>
                    </div>

                    {/* Footer Navigation */}
                    <div className="p-6 md:p-8 border-t border-border-subtle bg-gray-50/50 dark:bg-black/20 flex items-center justify-between">
                        <button
                            onClick={prevSlide}
                            className="p-3 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                            aria-label="Previous Slide"
                        >
                            <ChevronLeft size={24} className="text-text-muted" />
                        </button>

                        <div className="flex gap-3">
                            {slides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`h-2.5 rounded-full transition-all duration-300 ${currentSlide === idx
                                        ? "w-8 bg-primary"
                                        : "w-2.5 bg-gray-300 dark:bg-white/20 hover:bg-primary/50"
                                        }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextSlide}
                            className="p-3 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                            aria-label="Next Slide"
                        >
                            <ChevronRight size={24} className="text-text-muted" />
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Contact Modal Layered on Top */}
            <AnimatePresence>
                {isContactOpen && (
                    <ContactModal
                        isOpen={isContactOpen}
                        onClose={() => setIsContactOpen(false)}
                    />
                )}
            </AnimatePresence>
        </React.Fragment>
    );
};

const SlideContent = ({ step, navigate, onClose, onOpenContact }) => {
    switch (step) {
        case 0: return <Slide1 />;
        case 1: return <Slide2 />;
        case 2: return <Slide3 />;
        case 3: return <Slide4 />;
        case 4: return <Slide5 navigate={navigate} onClose={onClose} onOpenContact={onOpenContact} />;
        default: return null;
    }
};

/* ---------------- SLIDE 1: How VerifAI Works ---------------- */
const Slide1 = () => (
    <motion.div
        className="h-full flex flex-col justify-center text-center"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5 }}
    >
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2">
            Real-time Fraud Detection in 3 Steps
        </h2>
        <p className="text-text-muted mb-12 text-lg">See how we secure every transaction instantly.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { icon: Activity, title: "1. Ingest", desc: "Transaction + device + identity signals flow in real-time" },
                { icon: Brain, title: "2. Score", desc: "ML models + rules compute risk score (0-100) instantly" },
                { icon: Zap, title: "3. Action", desc: "Auto approve, block, or escalate based on risk tier" }
            ].map((item, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.2 }}
                    className="flex flex-col items-center p-6 rounded-2xl bg-white dark:bg-white/5 shadow-lg border border-border-subtle"
                >
                    <div className="p-4 bg-primary/10 rounded-full text-primary mb-4">
                        <item.icon size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-text-primary mb-2">{item.title}</h3>
                    <p className="text-text-muted">{item.desc}</p>
                </motion.div>
            ))}
        </div>
    </motion.div>
);

/* ---------------- SLIDE 2: Live Performance ---------------- */
const Slide2 = () => {
    // Animated Counter Hook
    const useCounter = (end, duration = 2000, prefix = "", suffix = "") => {
        const [count, setCount] = useState(0);
        useEffect(() => {
            let start = 0;
            const increment = end / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(start);
                }
            }, 16);
            return () => clearInterval(timer);
        }, [end, duration]);

        // Formatting
        if (prefix === "$" && suffix === "K") return `$${Math.floor(count)}K`;
        if (suffix === "%") return `${count.toFixed(1)}%`;
        if (suffix === "M") return `${count.toFixed(1)}M`;
        if (prefix === "<") return `<${Math.floor(count)}ms`;
        return Math.floor(count);
    };

    return (
        <motion.div
            className="h-full flex flex-col justify-center text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-12">
                See Real-Time Impact
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                    { icon: TrendingUp, val: useCounter(2.4, 1500, "", "M"), label: "Processed in 2024" },
                    { icon: Target, val: useCounter(99.2, 2000, "", "%"), label: "Detection rate" },
                    { icon: Shield, val: useCounter(847, 1800, "$", "K"), label: "Fraud prevented (This month)" },
                    { icon: Clock, val: useCounter(100, 1200, "<", "ms"), label: "Avg decision time" }
                ].map((card, idx) => (
                    <motion.div
                        key={idx}
                        className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-white/10 dark:to-transparent border border-border-subtle shadow-sm hover:shadow-lg transition-all"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <card.icon size={28} className="text-primary" />
                            <span className="text-3xl md:text-4xl font-bold text-text-primary">{card.val}</span>
                        </div>
                        <p className="text-text-muted font-medium">{card.label}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

/* ---------------- SLIDE 3: Risk Scoring Example ---------------- */
const Slide3 = () => (
    <motion.div
        className="h-full flex flex-col justify-center items-center"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
    >
        <h2 className="text-3xl font-bold text-text-primary mb-8">See a Live Transaction Score</h2>

        <div className="w-full max-w-2xl bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div className="flex justify-between items-start mb-6 border-b border-border-subtle pb-4">
                <div>
                    <h3 className="text-xl font-bold text-text-primary">Amazon Electronics</h3>
                    <p className="text-text-muted text-sm">Txn ID: #8823-99FA-2AB9</p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-mono font-bold text-text-primary">₹45,999</p>
                    <p className="text-xs text-text-muted">Just now</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[
                    { label: "Device", val: "New device (first login)", score: "+25 pts", color: "text-status-error" },
                    { label: "Velocity", val: "3 transactions in 2 hours", score: "+20 pts", color: "text-status-warning" },
                    { label: "Amount", val: "High amount for user", score: "+15 pts", color: "text-status-warning" },
                    { label: "Location", val: "Bangalore, India", score: "+5 pts", color: "text-status-success" }
                ].map((factor, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.15 }}
                        className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-white/5"
                    >
                        <div>
                            <p className="text-xs font-bold text-text-muted uppercase">{factor.label}</p>
                            <p className="text-sm font-medium text-text-primary">{factor.val}</p>
                        </div>
                        <span className={`text-sm font-bold ${factor.color}`}>{factor.score}</span>
                    </motion.div>
                ))}
            </div>

            {/* Risk Bar */}
            <div className="mb-2">
                <div className="flex justify-between text-sm font-bold mb-2">
                    <span>Risk Score</span>
                    <span className="text-orange-500">65/100 (Medium)</span>
                </div>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-orange-500"
                        initial={{ width: 0 }}
                        animate={{ width: "65%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
                className="mt-6 flex justify-center"
            >
                <span className="px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-bold border border-orange-200 shadow-sm animate-pulse">
                    🟠 HOLD - Review Required
                </span>
            </motion.div>
        </div>
    </motion.div>
);

/* ---------------- SLIDE 4: Multi-Channel Alerts ---------------- */
const Slide4 = () => (
    <motion.div
        className="h-full flex flex-col justify-center text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        <h2 className="text-3xl font-bold text-text-primary mb-10">Instant Notifications Across Channels</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Email */}
            <motion.div
                className="p-5 rounded-xl bg-white dark:bg-gray-800 shadow-md border border-border-subtle text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <div className="flex items-center gap-3 mb-3 text-primary">
                    <Mail size={20} /> <span className="font-bold text-sm">Email Alert</span>
                </div>
                <p className="font-semibold text-text-primary text-sm mb-1">Subject: ⚠️ Unusual transaction detected</p>
                <p className="text-xs text-text-muted mb-3">A high-risk transaction of ₹45,999 was flagged...</p>
                <div className="w-20 h-6 bg-primary/20 rounded text-center text-xs leading-6 text-primary font-bold">Review</div>
            </motion.div>

            {/* SMS */}
            <motion.div
                className="p-5 rounded-xl bg-white dark:bg-gray-800 shadow-md border border-border-subtle text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <div className="flex items-center gap-3 mb-3 text-blue-500">
                    <MessageSquare size={20} /> <span className="font-bold text-sm">SMS Alert</span>
                </div>
                <div className="bg-gray-100 dark:bg-white/5 p-3 rounded-lg rounded-tl-none text-xs font-mono text-text-primary shadow-inner">
                    ⚠️ VerifAI: Unusual txn ₹45,999 @ Amazon. Confirm: verifai.app/approve
                </div>
            </motion.div>

            {/* Webhook */}
            <motion.div
                className="p-5 rounded-xl bg-gray-900 text-white shadow-md border border-border-subtle text-left font-mono overflow-hidden relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <div className="flex items-center gap-3 mb-3 text-green-400">
                    <Code size={20} /> <span className="font-bold text-sm font-sans">Webhook Payload</span>
                </div>
                <pre className="text-[10px] leading-relaxed opacity-80">
                    {`{
  "event": "transaction.flagged",
  "risk_score": 65,
  "merchant": "Amazon",
  "action": "hold"
}`}
                </pre>
            </motion.div>

            {/* Dashboard */}
            <motion.div
                className="p-5 rounded-xl bg-white dark:bg-gray-800 shadow-md border border-border-subtle text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
            >
                <div className="flex items-center gap-3 mb-3 text-purple-500">
                    <BarChart3 size={20} /> <span className="font-bold text-sm">Dashboard</span>
                </div>
                <div className="flex items-center justify-between p-3 border border-orange-200 bg-orange-50 dark:bg-orange-900/10 rounded-lg">
                    <div>
                        <p className="text-xs font-bold text-orange-700 dark:text-orange-400">Pending Review</p>
                        <p className="text-[10px] text-text-muted">#8823-99FA • 2 mins ago</p>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                </div>
            </motion.div>
        </div>
    </motion.div>
);

/* ---------------- SLIDE 5: CTA ---------------- */
const Slide5 = ({ navigate, onClose, onOpenContact }) => (
    <motion.div
        className="h-full flex flex-col justify-center items-center text-center px-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
    >
        <h2 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-4">Protect Your Transactions Today</h2>
        <p className="text-xl text-text-muted mb-10 max-w-xl">Enterprise-grade fraud detection, production-ready.</p>

        <ul className="space-y-4 mb-12 text-left inline-block">
            {[
                "Real-time decisions in <100ms",
                "99.2% accuracy with adaptive ML",
                "Bank-grade compliance & audit logs"
            ].map((item, idx) => (
                <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.2 }}
                    className="flex items-center gap-3 text-lg font-medium text-text-primary"
                >
                    <CheckCircle className="text-primary" size={24} />
                    {item}
                </motion.li>
            ))}
        </ul>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
                onClick={() => { onClose(); navigate("/auth?view=signup"); }}
                className="h-14 px-10 text-lg rounded-full shadow-xl shadow-primary/30 hover:scale-105 transition-transform"
            >
                Get Started
            </Button>
            <Button
                variant="outline"
                onClick={onOpenContact}
                className="h-14 px-10 text-lg rounded-full border-2 border-border-subtle hover:bg-gray-50 dark:hover:bg-white/10 hover:scale-105 transition-transform"
            >
                Request Demo
            </Button>
        </div>
    </motion.div>
);

export default DemoSlideshow;
