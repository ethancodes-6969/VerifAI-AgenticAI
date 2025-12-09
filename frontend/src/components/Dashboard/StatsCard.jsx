import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/transactionHelpers';

const StatsCard = ({ title, value, label, icon: Icon, trend, trendValue, index }) => {
    const isPositive = trend === 'up';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-border-subtle group"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-gray-100 dark:bg-white/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Icon size={24} />
                </div>
                {trend && (
                    <div className={cn(
                        "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full",
                        isPositive ? "text-status-success bg-status-success/10" : "text-status-error bg-status-error/10"
                    )}>
                        {isPositive ? '+' : '-'}{trendValue}%
                    </div>
                )}
            </div>

            <div className="space-y-1">
                <h3 className="text-2xl font-bold text-text-primary">{value}</h3>
                <p className="text-sm text-text-muted">{title}</p>
            </div>
        </motion.div>
    );
};

export default StatsCard;
