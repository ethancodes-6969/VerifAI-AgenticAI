import React, { useState, useEffect } from 'react';
import { useDashboard } from '../../hooks/useDashboard';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import WelcomeCard from './WelcomeCard';
import StatsCard from './StatsCard';
import HeatmapChart from './HeatmapChart';
import QuickActions from './QuickActions';
import TransactionsTable from './TransactionsTable';
import { Activity, ShieldAlert, BarChart2, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const {
        user,
        stats,
        heatmapData,
        transactions,
        pagination,
        statsLoading,
        tableLoading,
        filters,
        handleSearch,
        handleStatusFilter,
        handlePageChange,
        handleTransactionAction
    } = useDashboard();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Responsive Handler
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Skeleton Loader for Stats
    const StatSkeleton = () => (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-border-subtle animate-pulse h-32">
            <div className="h-10 w-10 bg-gray-200 dark:bg-white/10 rounded-lg mb-4"></div>
            <div className="h-8 w-24 bg-gray-200 dark:bg-white/10 rounded mb-2"></div>
            <div className="h-4 w-32 bg-gray-200 dark:bg-white/10 rounded"></div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-background transition-colors duration-300">
            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                isMobile={isMobile}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                <Topbar onMenuClick={() => setIsSidebarOpen(true)} />

                <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">

                    {/* Welcome Section */}
                    <div className="max-w-7xl mx-auto w-full">
                        <WelcomeCard user={user} />
                    </div>

                    {/* Stats Grid */}
                    <div className="max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {statsLoading ? (
                            <>
                                <StatSkeleton /><StatSkeleton /><StatSkeleton /><StatSkeleton />
                            </>
                        ) : (
                            <>
                                <StatsCard
                                    title="Total Transactions"
                                    value={stats?.total_transactions.toLocaleString()}
                                    icon={Activity}
                                    trend="up"
                                    trendValue={12}
                                    index={0}
                                />
                                <StatsCard
                                    title="Blocked Today"
                                    value={stats?.blocked_today}
                                    icon={ShieldAlert}
                                    trend="up"
                                    trendValue={5}
                                    index={1}
                                />
                                <StatsCard
                                    title="Avg Risk Score"
                                    value={stats?.avg_risk_score}
                                    icon={BarChart2}
                                    trend="down"
                                    trendValue={2}
                                    index={2}
                                />
                                <StatsCard
                                    title="Active Devices"
                                    value={stats?.active_devices.toLocaleString()}
                                    icon={Smartphone}
                                    trend="up"
                                    trendValue={8}
                                    index={3}
                                />
                            </>
                        )}
                    </div>

                    {/* Middle Section: Heatmap + Quick Actions */}
                    <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <HeatmapChart data={heatmapData} />
                            </motion.div>
                        </div>
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="h-full"
                            >
                                <QuickActions />
                            </motion.div>
                        </div>
                    </div>

                    {/* Transactions Section */}
                    <div className="max-w-7xl mx-auto w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <TransactionsTable
                                transactions={transactions}
                                pagination={pagination}
                                filters={filters}
                                isLoading={tableLoading}
                                onFilterChange={handleStatusFilter}
                                onPageChange={handlePageChange}
                                onAction={handleTransactionAction}
                            />
                        </motion.div>
                    </div>

                </main>
            </div>
        </div>
    );
};

export default Dashboard;
