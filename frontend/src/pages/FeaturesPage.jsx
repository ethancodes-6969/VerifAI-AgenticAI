import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity,
    Brain,
    Bell,
    Settings,
    Globe,
    Eye,
    Zap,
    Shield,
    ArrowRight,
    X,
    CheckCircle2,
    AlertCircle,
    CheckCircle,
    Mail
} from 'lucide-react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/Button';
import ContactModal from '../components/ContactModal';

// --- Feature Data ---
const FEATURES = [
    {
        id: 'risk-scoring',
        title: 'Real-time Risk Scoring',
        shortDesc: 'Decisions in <100ms.',
        fullDesc: 'Combine behavioral signals, device fingerprinting, velocity rules and model ensembles for immediate accept/block/hold decisions based on live transaction data.',
        icon: Activity
    },
    {
        id: 'ml-models',
        title: 'Adaptive ML Models',
        shortDesc: 'Models that learn from live data.',
        fullDesc: 'Ensemble of tree + neural models with drift detection and automated retraining pipelines to absorb new fraud patterns instantly.',
        icon: Brain
    },
    {
        id: 'alerts',
        title: 'Multi-Channel Alerts',
        shortDesc: 'Email/SMS/Web/Push instant alerts.',
        fullDesc: 'Prebuilt, templated alerts (Fraud / Hold / Approved / Account Lock) and webhook connectors for 3rd-party ops tools like Slack or PagerDuty.',
        icon: Bell
    },
    {
        id: 'rule-engine',
        title: 'Rule Engine & Workflows',
        shortDesc: 'Human-friendly rules + automated pipelines.',
        fullDesc: 'Low-code rule builder, escalation queues, case management and audit logs allowing fraud teams to implement logic without engineering support.',
        icon: Settings
    },
    {
        id: 'geo-intel',
        title: 'Device & Geo Intelligence',
        shortDesc: 'Detect device reuse, VPNs, geo anomalies.',
        fullDesc: 'Advanced fingerprinting, proxy detection, distance & velocity heuristics to flag suspicious locations and device switching behavior.',
        icon: Globe
    },
    {
        id: 'explainability',
        title: 'Explainable Decisions',
        shortDesc: 'Transparency for disputes/regulation.',
        fullDesc: 'Per-transaction decision trace revealing exactly which features, model scores, or specific rule triggers led to a block or approval.',
        icon: Eye
    },
    {
        id: 'integrations',
        title: 'High-Trust Integrations',
        shortDesc: 'Drop-in SDKs & API-first design.',
        fullDesc: 'Webhooks, REST API, Google & Aadhaar login placeholders, and easy connectors for payments stacks like Stripe, Razorpay, or custom gateways.',
        icon: Zap
    },
    {
        id: 'compliance',
        title: 'Compliance & Audit Trail',
        shortDesc: 'Bank-ready logs & reporting.',
        fullDesc: 'Immutable audit logs, role-based access control (RBAC), and exportable CSV/JSON reports ready for regulatory inspections.',
        icon: Shield
    }
];

// --- Modal Component ---
const FeatureModal = ({ feature, onClose }) => {
    if (!feature) return null;
    const Icon = feature.icon;

    return (
        <React.Fragment>
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
                onClick={onClose}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden pointer-events-auto border border-white/10"
                >
                    <div className="relative p-6 sm:p-8">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-text-muted transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex items-start gap-4 mb-6">
                            <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                <Icon size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-text-primary mb-1">{feature.title}</h3>
                                <p className="text-sm font-medium text-primary">{feature.shortDesc}</p>
                            </div>
                        </div>

                        <div className="prose dark:prose-invert">
                            <p className="text-text-muted leading-relaxed">
                                {feature.fullDesc}
                            </p>
                        </div>

                        <div className="mt-8 pt-6 border-t border-border-subtle flex justify-end">
                            <Button onClick={onClose} variant="secondary">
                                Close
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </React.Fragment>
    );
};


// --- Feature Card Component ---
const FeatureCard = ({ feature, onLearnMore }) => {
    const Icon = feature.icon;

    return (
        <motion.div
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group relative flex flex-col h-full bg-white/60 dark:bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300"
        >
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform duration-300">
                <Icon size={24} />
            </div>

            <h3 className="text-lg font-bold text-text-primary mb-2 line-clamp-1">
                {feature.title}
            </h3>

            <p className="text-sm text-text-muted leading-relaxed mb-6 flex-grow">
                {feature.shortDesc}
            </p>

            <div className="pt-4 border-t border-black/5 dark:border-white/5 mt-auto">
                <button
                    onClick={() => onLearnMore(feature)}
                    className="text-sm font-semibold text-primary hover:text-secondary inline-flex items-center gap-1 transition-colors group-hover:gap-2"
                >
                    Learn more <ArrowRight size={14} />
                </button>
            </div>
        </motion.div>
    );
};

// --- Main Page Component ---
const FeaturesPage = () => {
    const navigate = useNavigate();
    const [selectedFeature, setSelectedFeature] = useState(null);
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background text-text-primary selection:bg-primary/20">
            <Navbar />

            {/* Background Gradients */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-70" />
                <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-secondary/5 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-70" />
            </div>

            <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

                {/* Hero Section */}
                <section className="text-center max-w-4xl mx-auto mb-20 sm:mb-28">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-text-primary mb-6 leading-tight">
                            Enterprise-grade fraud detection, <span className="text-primary text-sheen">real-time.</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
                            AI-first risk scoring, lightning-fast alerts, and bank-grade controls — designed for payments, neobanks, marketplaces, and exchanges.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                onClick={() => navigate('/auth?view=signup')}
                                className="h-12 px-8 text-base bg-primary hover:bg-primary-dark shadow-lg shadow-primary/25 rounded-full w-full sm:w-auto"
                            >
                                Get Started
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setIsContactOpen(true)}
                                className="h-12 px-8 text-base border-2 border-border-subtle hover:bg-gray-50 dark:hover:bg-white/5 rounded-full w-full sm:w-auto"
                            >
                                Request Demo
                            </Button>
                        </div>
                    </motion.div>
                </section>

                {/* Features Grid */}
                <section>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {FEATURES.map((feature, idx) => (
                            <motion.div
                                key={feature.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <FeatureCard
                                    feature={feature}
                                    onLearnMore={setSelectedFeature}
                                />
                            </motion.div>
                        ))}
                    </div>
                </section>

            </main>

            {/* Modals */}
            <AnimatePresence>
                {selectedFeature && (
                    <FeatureModal
                        feature={selectedFeature}
                        onClose={() => setSelectedFeature(null)}
                    />
                )}
                {isContactOpen && (
                    <ContactModal
                        isOpen={isContactOpen}
                        onClose={() => setIsContactOpen(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default FeaturesPage;
