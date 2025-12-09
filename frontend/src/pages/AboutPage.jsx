import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail,
    Shield,
    Zap,
    Lock,
    Server,
    Database,
    Cpu,
    Code,
    CheckCircle2,
    X
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/Button';
import myPhoto from "../assets/my-photo.jpg";
import DemoSlideshow from './DemoSlideshow';


// --- Contact Modal Component (Reused for consistency) ---
const ContactModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <React.Fragment>
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
                onClick={onClose}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl p-6 pointer-events-auto border border-white/10"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-text-primary">Schedule a Demo</h3>
                        <button onClick={onClose}><X size={20} className="text-text-muted" /></button>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
                        <div>
                            <label className="block text-sm font-medium text-text-muted mb-1">Work Email</label>
                            <input
                                type="email"
                                placeholder="you@company.com"
                                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-border-subtle focus:border-primary outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-muted mb-1">Role</label>
                            <select className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-border-subtle focus:border-primary outline-none transition-colors">
                                <option>Risk Manager</option>
                                <option>Developer</option>
                                <option>Executive</option>
                            </select>
                        </div>
                        <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white">
                            Submit Request
                        </Button>
                    </form>
                </motion.div>
            </div>
        </React.Fragment>
    );
};

const AboutPage = () => {
    const navigate = useNavigate();
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isDemoOpen, setIsDemoOpen] = useState(false);

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="min-h-screen bg-background text-text-primary selection:bg-primary/20 flex flex-col">
            <Navbar />

            {/* Background Gradients */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-primary/5 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-50" />
            </div>

            <main className="flex-1 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full" role="main">

                {/* Hero Section */}
                <section className="text-center max-w-4xl mx-auto mb-20 sm:mb-28">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-text-primary mb-6 leading-tight">
                            VerifAI — Protecting payments with <span className="text-primary text-sheen">AI</span>
                        </h1>
                        <p className="text-xl sm:text-2xl text-text-muted mb-8 max-w-2xl mx-auto leading-relaxed font-light">
                            Built for modern finance. Transparent. Fast. Auditable.
                        </p>
                    </motion.div>
                </section>

                {/* Mission & How it Works Grid */}
                <section className="mb-24">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                    >
                        {/* Our Mission Card */}
                        <motion.div
                            variants={fadeInUp}
                            whileHover={{ y: -5 }}
                            className="bg-white/60 dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                    <Shield size={24} />
                                </div>
                                <h2 className="text-2xl font-bold">Our Mission</h2>
                            </div>

                            <p className="text-lg text-text-muted mb-8 leading-relaxed">
                                We build low-friction fraud prevention that scales from startups to banks — combining ML, rules, and clear audit logs without compromising performance or privacy.
                            </p>

                            <ul className="space-y-4">
                                {[
                                    "High-precision scoring with sub-100ms decision times",
                                    "Transparent, explainable decisions for disputes",
                                    "Security-first design with full auditability"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-text-primary">
                                        <CheckCircle2 size={20} className="text-primary mt-1 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* How it Works Card */}
                        <motion.div
                            variants={fadeInUp}
                            whileHover={{ y: -5 }}
                            className="bg-white/60 dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-secondary/10 rounded-xl text-secondary">
                                    <Zap size={24} />
                                </div>
                                <h2 className="text-2xl font-bold">How it Works</h2>
                            </div>

                            <div className="space-y-8 relative">
                                {/* Connector Line (Optional visual flourish) */}
                                <div className="absolute left-[19px] top-8 bottom-8 w-0.5 bg-border-subtle/50 -z-10" />

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-background border-2 border-primary text-primary flex items-center justify-center font-bold text-sm shrink-0 z-10">1</div>
                                    <div>
                                        <h3 className="text-lg font-bold text-text-primary mb-1">Ingest</h3>
                                        <p className="text-text-muted">Real-time processing of transaction details, device fingerprinting, and user identity signals.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-background border-2 border-primary text-primary flex items-center justify-center font-bold text-sm shrink-0 z-10">2</div>
                                    <div>
                                        <h3 className="text-lg font-bold text-text-primary mb-1">Score</h3>
                                        <p className="text-text-muted">Ensemble of ML models and custom rules analyze data to produce a risk score (0-100).</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-background border-2 border-primary text-primary flex items-center justify-center font-bold text-sm shrink-0 z-10">3</div>
                                    <div>
                                        <h3 className="text-lg font-bold text-text-primary mb-1">Action</h3>
                                        <p className="text-text-muted">Immediate decision: Auto Approve, Block, Hold, or trigger Ops escalation workflows.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Tech & Trust Section */}
                <section className="mb-24">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                    >
                        {/* Tech Stack */}
                        <motion.div
                            variants={fadeInUp}
                            className="bg-white/40 dark:bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col gap-4"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <Cpu size={20} className="text-primary" />
                                <h3 className="text-lg font-bold">Modern Tech Stack</h3>
                            </div>
                            <p className="text-text-muted leading-relaxed">
                                Built on a robust foundation for speed and reliability: React, TailwindCSS, FastAPI, PostgreSQL, Redis, XGBoost/PyTorch, and WebSockets.
                            </p>
                            <div className="flex gap-2 flex-wrap mt-auto pt-4">
                                {['React', 'FastAPI', 'Postgres', 'Redis', 'ML', 'Docker'].map(tag => (
                                    <span key={tag} className="px-2.5 py-1 rounded-md bg-white/50 dark:bg-black/20 text-xs font-mono border border-white/10 text-text-muted">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Security */}
                        <motion.div
                            variants={fadeInUp}
                            className="bg-white/40 dark:bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col gap-4"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <Lock size={20} className="text-secondary" />
                                <h3 className="text-lg font-bold">Security & Compliance</h3>
                            </div>
                            <p className="text-text-muted leading-relaxed">
                                Enterprise-grade security controls: TLS/AES encryption, role-based access control (RBAC), immutable audit logs, GDPR-compliant data handling, and 2FA for ops.
                            </p>
                            <div className="flex gap-2 flex-wrap mt-auto pt-4">
                                {['AES-256', 'RBAC', 'Audit Logs', 'GDPR', '2FA', 'SOC2 Ready'].map(tag => (
                                    <span key={tag} className="px-2.5 py-1 rounded-md bg-white/50 dark:bg-black/20 text-xs font-mono border border-white/10 text-text-muted">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Team Section */}
                <section className="mb-24 text-center max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[40px] transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                        <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 shadow-xl shadow-primary/20">
                            <img src={myPhoto} alt="Avatar" className="h-full w-full object-cover rounded-full" />
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Built with intention</h2>
                        <p className="text-text-muted text-lg mb-8 leading-relaxed">
                            VerifAI is built by <span className="font-semibold text-text-primary">Krish Sanghavi</span>, a student and engineering lead passionate about making payments safer for the next generation of fintechs.
                        </p>

                        <a
                            href="mailto:krishsanghavi09@gmail.com"
                            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors group"
                            aria-label="Send an email to krishsanghavi09@gmail.com"
                        >
                            <Mail size={18} className="group-hover:scale-110 transition-transform" />
                            Get in touch
                        </a>
                    </motion.div>
                </section>



            </main>

            {/* Modals */}
            <AnimatePresence>
                {isContactOpen && (
                    <ContactModal
                        isOpen={isContactOpen}
                        onClose={() => setIsContactOpen(false)}
                    />
                )}
                {isDemoOpen && ( // Render DemoSlideshow conditionally
                    <DemoSlideshow
                        isOpen={isDemoOpen}
                        onClose={() => setIsDemoOpen(false)}
                    />
                )}
            </AnimatePresence>

        </div>
    );
};

export default AboutPage;
