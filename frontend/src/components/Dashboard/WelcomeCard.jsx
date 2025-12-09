import React from 'react';
import { motion } from 'framer-motion';
import { formatDate } from '../../utils/transactionHelpers';

const WelcomeCard = ({ user }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-primary/90 to-secondary/90 text-white rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[50px] transform translate-x-1/3 -translate-y-1/3 pointer-events-none" />

            <div className="relative z-10">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                    Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
                </h1>
                <p className="text-white/80 max-w-xl">
                    Here's what's happening with your transactions today. You have <span className="font-semibold text-white">42 blocked</span> attempts requiring review.
                </p>

                <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium text-white/70">
                    <span className="bg-white/10 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                        {formatDate(new Date().toISOString())}
                    </span>
                    <span className="bg-white/10 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                        Last Login: Today, 9:24 AM
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default WelcomeCard;
