import React from 'react';
import { Button } from '../ui/Button';
import { X, CheckCircle, ShieldAlert, Ban, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const BulkActions = ({ selectedCount, onClearSelection, onAction }) => {
    if (selectedCount === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-primary/5 border border-primary/20 rounded-xl mb-6 shadow-sm"
        >
            <div className="flex items-center gap-4">
                <span className="font-semibold text-primary flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                        {selectedCount}
                    </div>
                    selected
                </span>
                <button
                    onClick={onClearSelection}
                    className="text-sm text-text-muted hover:text-text-primary flex items-center gap-1"
                >
                    <X size={14} /> Clear
                </button>
            </div>

            <div className="flex items-center gap-2 flex-wrap justify-end">
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onAction('approve')}
                    className="bg-white dark:bg-gray-800 text-green-600 border-green-200 hover:bg-green-50 dark:hover:bg-green-900/20"
                >
                    <CheckCircle size={16} className="mr-2" /> Approve
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onAction('hold')}
                    className="bg-white dark:bg-gray-800 text-orange-600 border-orange-200 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                >
                    <ShieldAlert size={16} className="mr-2" /> Hold
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onAction('block')}
                    className="bg-white dark:bg-gray-800 text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                    <Ban size={16} className="mr-2" /> Block
                </Button>

                <div className="h-6 w-px bg-border-subtle mx-1 hidden sm:block"></div>

                <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onAction('export')}
                    className="text-text-muted hover:text-primary"
                >
                    <Download size={16} className="mr-2" /> Export
                </Button>
            </div>
        </motion.div>
    );
};

export default BulkActions;
