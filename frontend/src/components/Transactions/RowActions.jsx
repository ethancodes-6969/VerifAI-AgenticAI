import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Eye, CheckCircle, Ban, ShieldAlert, FileText, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RowActions = ({ onAction }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleAction = (action) => {
        setIsOpen(false);
        onAction(action);
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
                className="p-1.5 rounded-lg text-text-muted hover:bg-gray-100 dark:hover:bg-white/5 hover:text-text-primary transition-colors"
            >
                <MoreVertical size={16} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.1 }}
                        className="absolute right-0 top-full mt-1 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-border-subtle z-50 overflow-hidden"
                    >
                        <div className="py-1">
                            <button onClick={() => handleAction('view')} className="w-full text-left px-4 py-2.5 text-sm text-text-primary hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2">
                                <Eye size={16} className="text-text-muted" /> View Details
                            </button>
                            <button onClick={() => handleAction('approve')} className="w-full text-left px-4 py-2.5 text-sm text-text-primary hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2">
                                <CheckCircle size={16} className="text-green-500" /> Mark as Safe
                            </button>
                            <button onClick={() => handleAction('escalate')} className="w-full text-left px-4 py-2.5 text-sm text-text-primary hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2">
                                <ShieldAlert size={16} className="text-orange-500" /> Escalate Case
                            </button>
                            <div className="h-px bg-border-subtle my-1"></div>
                            <button onClick={() => handleAction('note')} className="w-full text-left px-4 py-2.5 text-sm text-text-primary hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2">
                                <FileText size={16} className="text-text-muted" /> Add Note
                            </button>
                            <button onClick={() => handleAction('block')} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-2">
                                <Ban size={16} /> Block Card
                            </button>
                            <button onClick={() => handleAction('block_user')} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-2">
                                <Lock size={16} /> Block User
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RowActions;
