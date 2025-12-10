import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    CreditCard,
    Settings,
    User,
    LogOut,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { cn } from '../../utils/transactionHelpers';
import useAuthStore from '../../stores/useAuthStore';
import { motion } from 'framer-motion';

const SidebarItem = ({ icon: Icon, label, to, collapsed }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 transition-all duration-200 group relative border-l-4",
                isActive
                    ? "border-primary bg-primary/5 text-primary font-medium"
                    : "border-transparent text-text-muted hover:bg-gray-100 dark:hover:bg-white/5 hover:text-text-primary"
            )}
        >
            <Icon size={20} className="shrink-0" />
            {!collapsed && (
                <span className="whitespace-nowrap overflow-hidden transition-all duration-200">
                    {label}
                </span>
            )}
            {collapsed && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                    {label}
                </div>
            )}
        </NavLink>
    );
};

const Sidebar = ({ isOpen, onClose, isMobile }) => {
    const [collapsed, setCollapsed] = useState(false);
    const { logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        // Redirect handled by protected route/App logic
    };

    const logo = "VerifAI"; // Or use an image

    // Mobile Sidebar Drawer
    if (isMobile) {
        return (
            <>
                {/* Backdrop */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={onClose}
                    />
                )}

                {/* Drawer */}
                <div
                    className={cn(
                        "fixed inset-y-0 left-0 w-64 bg-background border-r border-border-subtle z-50 transform transition-transform duration-300 ease-in-out flex flex-col p-4 shadow-2xl",
                        isOpen ? "translate-x-0" : "-translate-x-full"
                    )}
                >
                    <div className="flex items-center justify-between mb-8 px-2">
                        <span className="text-xl font-bold text-primary tracking-tight">{logo}</span>
                        <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100">
                            <ChevronLeft size={20} />
                        </button>
                    </div>

                    <div className="space-y-1 flex-1">
                        <SidebarItem icon={LayoutDashboard} label="Dashboard" to="/dashboard" />
                        <SidebarItem icon={CreditCard} label="Transactions" to="/transactions" />
                        <SidebarItem icon={Settings} label="Settings" to="/settings" />
                        <SidebarItem icon={User} label="Profile" to="/profile" />
                    </div>

                    <div className="pt-4 border-t border-border-subtle">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                        >
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </>
        );
    }

    // Desktop Sidebar
    return (
        <motion.div
            animate={{ width: collapsed ? 80 : 250 }}
            className="hidden md:flex flex-col h-screen sticky top-0 bg-background border-r border-border-subtle z-20 transition-all duration-300"
        >
            <div className="h-16 flex items-center justify-between px-4 border-b border-border-subtle">
                {!collapsed && (
                    <span className="text-xl font-bold text-primary tracking-tight truncate">{logo}</span>
                )}
                {collapsed && <span className="text-xl font-bold text-primary mx-auto">V</span>}

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-text-muted"
                >
                    {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            <div className="flex-1 py-6 space-y-1 overflow-y-auto">
                <SidebarItem icon={LayoutDashboard} label="Dashboard" to="/dashboard" collapsed={collapsed} />
                <SidebarItem icon={CreditCard} label="Transactions" to="/transactions" collapsed={collapsed} />
                <SidebarItem icon={Settings} label="Settings" to="/settings" collapsed={collapsed} />
                <SidebarItem icon={User} label="Profile" to="/profile" collapsed={collapsed} />
            </div>

            <div className="p-3 border-t border-border-subtle">
                <button
                    onClick={handleLogout}
                    className={cn(
                        "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-text-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors",
                        collapsed && "justify-center"
                    )}
                >
                    <LogOut size={20} />
                    {!collapsed && <span>Logout</span>}
                </button>
            </div>
        </motion.div>
    );
};

export default Sidebar;
