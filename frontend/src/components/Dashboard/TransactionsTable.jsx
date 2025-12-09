import React, { useState } from 'react';
import {
    Filter,
    MoreHorizontal,
    Search,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Eye,
    Shield,
    ShieldAlert
} from 'lucide-react';
import StatusBadge from './StatusBadge';
import { formatDate, formatCurrency, getRiskBgColor, getRiskColor, cn } from '../../utils/transactionHelpers';
import { motion, AnimatePresence } from 'framer-motion';

const TransactionsTable = ({
    transactions,
    pagination,
    filters,
    isLoading,
    onFilterChange,
    onPageChange,
    onAction
}) => {
    // Actions Dropdown Logic could be complex, simple version here
    const [actionId, setActionId] = useState(null);

    const toggleActions = (id) => {
        if (actionId === id) setActionId(null);
        else setActionId(id);
    };

    if (isLoading) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-border-subtle h-[500px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="text-text-muted text-sm">Loading transactions...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-border-subtle overflow-hidden flex flex-col">

            {/* Table Header / Filters */}
            <div className="p-4 sm:p-6 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="font-bold text-lg text-text-primary">Recent Transactions</h3>

                <div className="flex items-center gap-3">
                    {/* Status Filter */}
                    <div className="relative">
                        <select
                            value={filters.status}
                            onChange={(e) => onFilterChange(e.target.value)}
                            className="appearance-none pl-4 pr-10 py-2 bg-gray-100 dark:bg-white/5 border border-transparent focus:border-primary/50 rounded-lg text-sm text-text-primary outline-none cursor-pointer"
                        >
                            <option value="ALL">All Status</option>
                            <option value="APPROVED">Approved</option>
                            <option value="BLOCKED">Blocked</option>
                            <option value="HOLD">Hold</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 dark:bg-black/20 text-text-muted font-medium">
                        <tr>
                            <th className="px-6 py-4">Merchant</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Risk Score</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle">
                        {transactions.map((t) => (
                            <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4 font-medium text-text-primary">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-gray-200 dark:bg-white/10 flex items-center justify-center text-xs font-bold text-text-muted">
                                            {t.merchant[0]}
                                        </div>
                                        {t.merchant}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-text-primary font-mono">
                                    {formatCurrency(t.amount)}
                                </td>
                                <td className="px-6 py-4 text-text-muted">
                                    <span className="bg-gray-100 dark:bg-white/5 px-2 py-1 rounded text-xs">
                                        {t.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <div
                                                className={cn("h-full rounded-full", getRiskBgColor(t.risk_score))}
                                                style={{ width: `${t.risk_score}%` }}
                                            />
                                        </div>
                                        <span className={cn("font-bold w-6 text-right", getRiskColor(t.risk_score))}>
                                            {t.risk_score}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={t.status} />
                                </td>
                                <td className="px-6 py-4 text-text-muted whitespace-nowrap">
                                    {formatDate(t.timestamp)}
                                </td>
                                <td className="px-6 py-4 text-right relative">
                                    <button
                                        onClick={() => toggleActions(t.id)}
                                        className="p-1.5 text-text-muted hover:text-primary hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        <MoreHorizontal size={18} />
                                    </button>

                                    {/* Action Menu */}
                                    <AnimatePresence>
                                        {actionId === t.id && (
                                            <>
                                                <div
                                                    className="fixed inset-0 z-10"
                                                    onClick={() => setActionId(null)}
                                                />
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.95, x: 20 }}
                                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    className="absolute right-10 top-2 z-20 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-border-subtle py-1 overflow-hidden"
                                                >
                                                    <button className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2">
                                                        <Eye size={14} /> View Details
                                                    </button>
                                                    {t.status === 'BLOCKED' && (
                                                        <button
                                                            onClick={() => onAction(t.id, 'APPROVED')}
                                                            className="w-full text-left px-4 py-2 text-xs font-medium text-status-success hover:bg-status-success/5 flex items-center gap-2"
                                                        >
                                                            <Shield size={14} /> Approve
                                                        </button>
                                                    )}
                                                    {t.status === 'APPROVED' && (
                                                        <button
                                                            onClick={() => onAction(t.id, 'BLOCKED')}
                                                            className="w-full text-left px-4 py-2 text-xs font-medium text-status-error hover:bg-status-error/5 flex items-center gap-2"
                                                        >
                                                            <ShieldAlert size={14} /> Block
                                                        </button>
                                                    )}
                                                </motion.div>
                                            </>
                                        )}
                                    </AnimatePresence>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards (Stacked) */}
            <div className="md:hidden divide-y divide-border-subtle">
                {transactions.map((t) => (
                    <div key={t.id} className="p-4 flex flex-col gap-3">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded bg-gray-200 dark:bg-white/10 flex items-center justify-center text-sm font-bold text-text-muted">
                                    {t.merchant[0]}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-text-primary">{t.merchant}</h4>
                                    <p className="text-xs text-text-muted">{t.category}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-mono font-bold text-text-primary">{formatCurrency(t.amount)}</p>
                                <p className="text-xs text-text-muted">{formatDate(t.timestamp)}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-border-subtle/50">
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-text-muted">Risk:</span>
                                <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/5", getRiskColor(t.risk_score))}>
                                    {t.risk_score}/100
                                </span>
                            </div>
                            <StatusBadge status={t.status} />
                        </div>

                        {/* Mobile Actions */}
                        <div className="grid grid-cols-2 gap-2 mt-1">
                            <button className="py-1.5 text-xs font-medium bg-gray-100 dark:bg-white/5 rounded-lg">Details</button>
                            {t.status === 'BLOCKED' ? (
                                <button onClick={() => onAction(t.id, 'APPROVED')} className="py-1.5 text-xs font-medium bg-status-success/10 text-status-success rounded-lg">Approve</button>
                            ) : (
                                <button onClick={() => onAction(t.id, 'BLOCKED')} className="py-1.5 text-xs font-medium bg-status-error/10 text-status-error rounded-lg">Block</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-border-subtle flex items-center justify-between">
                <span className="text-sm text-text-muted hidden sm:inline">
                    Page {pagination.current_page} of {pagination.total_pages}
                </span>
                <span className="text-xs text-text-muted sm:hidden">
                    {pagination.current_page}/{pagination.total_pages}
                </span>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onPageChange(pagination.current_page - 1)}
                        disabled={pagination.current_page <= 1}
                        className="p-2 border border-border-subtle rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={() => onPageChange(pagination.current_page + 1)}
                        disabled={!pagination.has_next}
                        className="p-2 border border-border-subtle rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionsTable;
