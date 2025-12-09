import React, { useState } from 'react';
import { Scan, Smartphone, X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency, getRiskColor } from '../../utils/transactionHelpers';

const QuickActions = ({ onScan }) => {
    const [isScanning, setIsScanning] = useState(false);
    const [scanResults, setScanResults] = useState(null);

    const handleScan = async () => {
        setIsScanning(true);
        // Mock Scan Simulation
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock Results (High Risk)
        setScanResults([
            { id: 1, merchant: 'Unknown Vendor', amount: 45000, risk: 92 },
            { id: 2, merchant: 'Crypto Exchange', amount: 12000, risk: 88 }
        ]);
        setIsScanning(false);
    };

    const closeScan = () => setScanResults(null);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-border-subtle h-full flex flex-col">
            <h3 className="font-bold text-lg text-text-primary mb-4">Quick Actions</h3>

            <div className="flex-1 grid grid-cols-1 gap-4">
                <button
                    onClick={handleScan}
                    disabled={isScanning}
                    className="flex items-center justify-between p-4 bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-xl group transition-all"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary text-white rounded-lg">
                            <Scan size={20} className={isScanning ? "animate-pulse" : ""} />
                        </div>
                        <div className="text-left">
                            <p className="font-semibold text-text-primary group-hover:text-primary transition-colors">Scan Transactions</p>
                            <p className="text-xs text-text-muted">Check for high-risk anomalies</p>
                        </div>
                    </div>
                </button>

                <button className="flex items-center justify-between p-4 bg-secondary/5 hover:bg-secondary/10 border border-secondary/20 rounded-xl group transition-all">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-secondary text-white rounded-lg">
                            <Smartphone size={20} />
                        </div>
                        <div className="text-left">
                            <p className="font-semibold text-text-primary group-hover:text-secondary transition-colors">Review Devices</p>
                            <p className="text-xs text-text-muted">Manage trusted fingerprints</p>
                        </div>
                    </div>
                </button>
            </div>

            {/* Scan Results Modal */}
            <AnimatePresence>
                {scanResults && (
                    <>
                        <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" onClick={closeScan} />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-50 p-6 border border-border-subtle"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 text-status-error">
                                    <AlertTriangle size={24} />
                                    <h2 className="text-xl font-bold">Threats Detected</h2>
                                </div>
                                <button onClick={closeScan} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10">
                                    <X size={20} />
                                </button>
                            </div>

                            <p className="text-sm text-text-muted mb-4">
                                The AI scan identified <strong className="text-text-primary">{scanResults.length}</strong> critical transactions requiring immediate attention.
                            </p>

                            <div className="space-y-3 mb-6">
                                {scanResults.map(r => (
                                    <div key={r.id} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg">
                                        <div>
                                            <p className="font-semibold text-sm">{r.merchant}</p>
                                            <p className="text-xs text-text-muted">{formatCurrency(r.amount)}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs font-bold text-status-error">{r.risk}/100 Risk</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button onClick={closeScan} className="w-full py-2.5 bg-status-error hover:bg-red-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-red-500/20">
                                Take Action
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default QuickActions;
