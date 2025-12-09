import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Activity, Bell, Smartphone, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import Navbar from '../components/Navbar';
import githubDark from "../assets/github-dark.svg";
import DemoSlideshow from './DemoSlideshow';

const LandingPage = () => {
    const navigate = useNavigate();
    const [isDemoOpen, setIsDemoOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background font-sans overflow-hidden">
            <Navbar />
            <AnimatePresence>
                {isDemoOpen && (
                    <DemoSlideshow
                        isOpen={isDemoOpen}
                        onClose={() => setIsDemoOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* background + subtle overlay for contrast */}
                <div className="absolute inset-0 -z-20">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-white/0 to-primary-dark/4"></div>
                    {/* subtle noise or vignette for depth */}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,47,79,0.02),rgba(10,47,79,0.03))] pointer-events-none"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-left"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-6">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-60"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                                </span>
                                Live Fraud Protection
                            </div>

                            <h1 className="text-5xl lg:text-6xl font-extrabold text-primary leading-tight mb-6 text-sheen">
                                Real-Time Fraud Detection for the <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary/95 to-accent/95 md:from-secondary md:to-accent gradient-stroke">Modern Era</span>
                            </h1>

                            <p className="text-lg text-text-primary/80 mb-8 leading-relaxed max-w-xl font-medium">
                                AI-driven risk scoring, instant alerting, and transaction intelligence to secure your business and customers in milliseconds.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    size="lg"
                                    className="shadow-lg shadow-primary/20 btn-strong-shadow bg-primary text-white hover:bg-primary-light"
                                    onClick={() => navigate('/auth?view=signup')}
                                >
                                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="text-primary/90 border-border-subtle hover:bg-primary/5"
                                    onClick={() => setIsDemoOpen(true)}
                                >
                                    View Demo
                                </Button>
                            </div>

                            <div className="mt-10 flex items-center gap-4 text-sm text-text-muted">
                                <div className="flex">
                                    <img
                                        src={githubDark}
                                        alt="Github Icon"
                                        className="h-8 w-8 rounded-full border-2 border-white object-cover"
                                    />
                                </div>
                                <p>Developed by Krish Sanghavi</p>
                            </div>
                        </motion.div>

                        {/* Right Visual (3D Card Mockup) */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative z-10 bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-2xl transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                                <div className="flex justify-between items-center mb-8">
                                    <div className="h-8 w-12 bg-primary/20 rounded" />
                                    <div className="h-8 w-8 bg-secondary/20 rounded-full" />
                                </div>
                                <div className="space-y-4 mb-8">
                                    <div className="h-4 w-3/4 bg-gray-200 rounded" />
                                    <div className="h-4 w-1/2 bg-gray-200 rounded" />
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="text-primary font-bold text-2xl">₹24,500.00</div>
                                    <div className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-bold">Verified</div>
                                </div>

                                {/* Floating Badge */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                    className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="bg-green-100 p-2 rounded-full">
                                            <Shield className="h-6 w-6 text-green-600" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500">Risk Score</div>
                                            <div className="text-lg font-bold text-primary">0.02%</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Decorative Blob */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-full blur-3xl -z-10" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* LIVE TRANSACTION TICKER */}
            <section className="bg-primary py-4 overflow-hidden border-y border-white/10">
                <div className="flex whitespace-nowrap animate-scroll-ticker px-6">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="inline-flex items-center mx-8 text-white font-mono text-sm">
                            <span className="w-2 h-2 bg-accent rounded-full mr-3 animate-pulse" />
                            <span className="opacity-95">User_{1000 + i} • ₹{2000 + i * 150} • Amazon • </span>
                            <span className="text-accent font-semibold ml-2">✅ Approved</span>
                        </div>
                    ))}
                </div>
            </section>


            {/* FEATURES SECTION */}
            <section className="py-24 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-primary mb-4">Enterprise-Grade Security</h2>
                        <p className="text-text-muted text-lg">Comprehensive protection built for scale, speed, and accuracy.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Activity, title: "Real-Time Detection", desc: "Analyze transactions in under 100ms with ML models." },
                            { icon: Shield, title: "Adaptive AI Scoring", desc: "Models that learn from new fraud patterns instantly." },
                            { icon: Bell, title: "Instant Alerts", desc: "Multi-channel notifications via Email, SMS, and Webhook." },
                            { icon: Smartphone, title: "Device Fingerprinting", desc: "Track suspicious devices across multiple accounts." }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border-subtle group"
                            >
                                <div className="h-12 w-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                                    <feature.icon className="h-6 w-6 text-secondary" />
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
                                <p className="text-text-muted leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark -z-20" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10" />

                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-primary leading-tight mb-6 text-sheen">Ready to secure your transactions?</h2>
                    <p className="text-xl text-sheen /80 mb-10">Join thousands of businesses trusting VerifAI for their fraud prevention.</p>
                    <Button
                        size="lg"
                        className="bg-accent text-white hover:bg-accent-light font-bold px-10 py-4 h-auto text-lg shadow-xl shadow-black/20"
                        onClick={() => navigate('/auth?view=signup')}
                    >
                        Get Started Now
                    </Button>
                </div>
            </section >
            {/* FOOTER */}
            <footer className="bg-white py-12 border-t border-border-subtle">
                <div className="max-w-7xl mx-auto px-4 text-center text-text-muted">
                    <div className="flex justify-center items-center gap-2 mb-4">
                        <Shield className="h-6 w-6 text-primary" />
                        <span className="font-bold text-xl text-primary">VerifAI</span>
                    </div>
                    <p>© 2025 VerifAI Inc. All rights reserved.</p>
                </div>
            </footer>
        </div >
    );
};

export default LandingPage;
