import React, { useState } from 'react';
import { Menu, Search, Bell } from 'lucide-react';
import ThemeToggle from '../Common/ThemeToggle';
import Avatar from '../Common/Avatar';
import useAuthStore from '../../stores/useAuthStore';
import { Link } from 'react-router-dom';

const Topbar = ({ onMenuClick }) => {
    const { user, logout } = useAuthStore();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <header className="h-16 flex items-center justify-between px-4 sticky top-0 bg-background/80 backdrop-blur-md border-b border-border-subtle z-10 transition-colors">
            {/* Left: Mobile Menu + Search */}
            <div className="flex items-center gap-4 flex-1">
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 -ml-2 text-text-muted hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg"
                >
                    <Menu size={24} />
                </button>

                <div className="hidden sm:flex items-center w-full max-w-xs relative text-text-muted focus-within:text-primary transition-colors">
                    <Search size={18} className="absolute left-3" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-white/5 border border-transparent focus:border-primary/50 rounded-full text-sm outline-none transition-all"
                    />
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 sm:gap-4">
                <button className="relative p-2 text-text-muted hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-status-error rounded-full border border-background"></span>
                </button>

                <ThemeToggle />

                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 focus:outline-none"
                    >
                        <Avatar name={user?.name || 'User'} className="cursor-pointer hover:ring-2 ring-primary/50 transition-all" size="md" />
                    </button>

                    {isDropdownOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setIsDropdownOpen(false)}
                            />
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-border-subtle rounded-xl shadow-xl z-20 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-200">
                                <div className="px-4 py-3 border-b border-border-subtle">
                                    <p className="text-sm font-semibold text-text-primary truncate">{user?.name || 'User'}</p>
                                    <p className="text-xs text-text-muted truncate">{user?.email || 'user@example.com'}</p>
                                </div>
                                <Link to="/dashboard/profile" className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-50 dark:hover:bg-white/5">Profile</Link>
                                <Link to="/dashboard/settings" className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-50 dark:hover:bg-white/5">Settings</Link>
                                <button
                                    onClick={() => logout()}
                                    className="block w-full text-left px-4 py-2 text-sm text-status-error hover:bg-status-error/5"
                                >
                                    Sign out
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Topbar;
