import React from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';

const SettingsPage = () => {
    return (
        <React.Fragment>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto"
            >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-border-subtle text-center py-20">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                        <Settings size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-text-primary mb-4">Settings Page</h2>
                    <p className="text-text-muted text-lg max-w-md mx-auto">
                        Configure your VerifAI environment, API keys, and notification preferences here. Coming soon.
                    </p>
                </div>
            </motion.div>
        </React.Fragment>
    );
};

export default SettingsPage;
