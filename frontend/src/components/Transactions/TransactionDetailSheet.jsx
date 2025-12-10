import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, MapPin, Clock, CreditCard, Shield, AlertTriangle, Globe, Activity, CheckCircle, Ban, MessageSquare } from 'lucide-react';
import { Button } from '../ui/Button';

const DetailRow = ({ label, value, icon: Icon, className }) => (
    <div className={`flex items-start justify-between py-3 border-b border-border-subtle last:border-0 ${className}`}>
        <div className="flex items-center gap-2 text-text-muted">
            {Icon && <Icon size={16} />}
            <span className="text-sm">{label}</span>
        </div>
        <span className="text-sm font-medium text-text-primary text-right">{value}</span>
    </div>
);

const RiskFactor = ({ factor, score, description }) => (
    <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/30">
        <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={16} />
        <div>
            <div className="flex justify-between items-center w-full mb-1">
                <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">{factor}</span>
                <span className="text-xs font-bold text-red-600">+{score}</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
        </div>
    </div>
);

const TransactionDetailSheet = ({ transaction, isOpen, onClose }) => {
    if (!transaction) return null;

    const riskColor = transaction.risk_score > 70 ? 'text-red-500' : transaction.risk_score > 30 ? 'text-orange-500' : 'text-green-500';
    const riskBg = transaction.risk_score > 70 ? 'bg-red-500' : transaction.risk_score > 30 ? 'bg-orange-500' : 'bg-green-500';

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                    />

                    {/* Sheet */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 w-full md:w-[600px] bg-white dark:bg-gray-900 shadow-2xl z-[70] flex flex-col border-l border-border-subtle"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-gray-50/50 dark:bg-black/20 backdrop-blur-md">
                            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                                <Shield size={18} className="text-primary" />
                                Transaction Details
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-text-muted"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">

                            {/* Summary Card */}
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-white/5 dark:to-white/10 rounded-2xl p-6 border border-border-subtle shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-10 -mt-10 blur-3xl"></div>

                                <div className="flex justify-between items-start mb-6 relative">
                                    <div>
                                        <h1 className="text-3xl font-bold text-text-primary mb-1">
                                            {transaction.amount_formatted || `₹${transaction.amount?.toLocaleString()}`}
                                        </h1>
                                        <div className="flex items-center gap-2 text-text-muted text-sm">
                                            <span className="font-medium">{transaction.merchant}</span>
                                            <span>•</span>
                                            <span>{new Date(transaction.timestamp).toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${transaction.status === 'blocked' ? 'bg-red-100 text-red-700 border-red-200' :
                                            transaction.status === 'approved' ? 'bg-green-100 text-green-700 border-green-200' :
                                                'bg-orange-100 text-orange-700 border-orange-200'
                                        }`}>
                                        {transaction.status}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 relative">
                                    <div className="flex-1">
                                        <div className="flex justify-between text-xs mb-2">
                                            <span className="font-medium text-text-muted">Risk Score</span>
                                            <span className={`font-bold ${riskColor}`}>{transaction.risk_score}/100</span>
                                        </div>
                                        <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${riskBg}`}
                                                style={{ width: `${transaction.risk_score}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Risk Breakdown */}
                            <div>
                                <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Activity size={16} /> Risk Analysis
                                </h3>
                                <div className="space-y-3">
                                    {transaction.risk_factors?.map((factor, idx) => (
                                        <RiskFactor key={idx} {...factor} />
                                    ))}
                                    {(!transaction.risk_factors || transaction.risk_factors.length === 0) && (
                                        <p className="text-sm text-text-muted italic">No specific risk flags detected.</p>
                                    )}
                                </div>
                            </div>

                            {/* Device & Location Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <Smartphone size={16} /> Device Fingerprint
                                    </h3>
                                    <div className="bg-white dark:bg-white/5 rounded-xl border border-border-subtle p-4 space-y-1">
                                        <DetailRow label="Device ID" value={transaction.device_id?.substring(0, 12) + '...'} icon={Smartphone} />
                                        <DetailRow label="IP Address" value="192.168.1.104" icon={Globe} />
                                        <DetailRow label="OS / Browser" value="iOS 17 / Safari" />
                                        <DetailRow label="Screen" value="390x844" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <MapPin size={16} /> Location
                                    </h3>
                                    <div className="h-[180px] bg-gray-200 dark:bg-white/10 rounded-xl overflow-hidden relative">
                                        {/* Mock Map */}
                                        <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s-l+000(77.5946,12.9716)/77.5946,12.9716,12,0,0/600x300?access_token=pk.mock')] bg-cover bg-center opacity-50 flex items-center justify-center">
                                            <span className="text-xs text-text-muted font-medium bg-white/80 px-2 py-1 rounded shadow-sm">Map View Placeholder</span>
                                        </div>
                                        <div className="absolute bottom-0 inset-x-0 bg-white/90 dark:bg-black/80 backdrop-blur p-3 text-xs flex justify-between items-center">
                                            <span>Bangalore, IN</span>
                                            <span className="text-text-muted">High Confidence</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline / Related */}
                            <div>
                                <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Clock size={16} /> Related Activity
                                </h3>
                                <div className="relative border-l-2 border-border-subtle ml-3 space-y-6 pl-6 pb-2">
                                    {[1, 2].map((i) => (
                                        <div key={i} className="relative">
                                            <div className="absolute -left-[31px] top-1 w-4 h-4 bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-black rounded-full"></div>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-sm font-medium text-text-primary">Zomato Order</p>
                                                    <p className="text-xs text-text-muted">2 hours ago</p>
                                                </div>
                                                <span className="text-sm font-medium">₹840</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="p-4 border-t border-border-subtle bg-white dark:bg-gray-900 flex gap-3">
                            <Button variant="outline" className="flex-1 border-border-subtle" onClick={() => alert('Add Note')}>
                                <MessageSquare size={16} className="mr-2" /> Note
                            </Button>
                            <Button variant="outline" className="flex-1 border-border-subtle text-green-600 hover:bg-green-50 hover:border-green-200" onClick={() => alert('Mark Safe')}>
                                <CheckCircle size={16} className="mr-2" /> Safe
                            </Button>
                            <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white" onClick={() => alert('Block')}>
                                <Ban size={16} className="mr-2" /> Block
                            </Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default TransactionDetailSheet;
