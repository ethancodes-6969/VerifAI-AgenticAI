import React, { useState } from 'react';
import { Search, Calendar, Filter, X } from 'lucide-react';
import { Button } from '../ui/Button';

const TransactionFilters = ({ filters, onFilterChange, onClear }) => {
    const [localFilters, setLocalFilters] = useState(filters);

    const handleChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);
        // Debounce calling parent onFilterChange could be done here or in parent
        onFilterChange(newFilters);
    };

    return (
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-border-subtle rounded-xl p-4 mb-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-text-muted" size={18} />
                    <input
                        type="text"
                        placeholder="Search merchant or user..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white dark:bg-gray-900 border border-border-subtle focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-all"
                        value={localFilters.search || ''}
                        onChange={(e) => handleChange('search', e.target.value)}
                    />
                </div>

                {/* Status Filter */}
                <div>
                    <select
                        className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-gray-900 border border-border-subtle focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-all appearance-none"
                        value={localFilters.status || ''}
                        onChange={(e) => handleChange('status', e.target.value)}
                    >
                        <option value="">All Statuses</option>
                        <option value="approved">Approved</option>
                        <option value="pending">Pending Review</option>
                        <option value="blocked">Blocked</option>
                        <option value="flagged">Flagged</option>
                    </select>
                </div>

                {/* Date Range - Simplified */}
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <input
                            type="date"
                            className="w-full px-3 py-2.5 rounded-lg bg-white dark:bg-gray-900 border border-border-subtle focus:border-primary outline-none text-sm text-text-muted"
                            value={localFilters.dateFrom || ''}
                            onChange={(e) => handleChange('dateFrom', e.target.value)}
                        />
                    </div>
                    <div className="relative flex-1">
                        <input
                            type="date"
                            className="w-full px-3 py-2.5 rounded-lg bg-white dark:bg-gray-900 border border-border-subtle focus:border-primary outline-none text-sm text-text-muted"
                            value={localFilters.dateTo || ''}
                            onChange={(e) => handleChange('dateTo', e.target.value)}
                        />
                    </div>
                </div>

                {/* Risk Score Range */}
                <div className="flex items-center gap-2 bg-white dark:bg-gray-900 border border-border-subtle rounded-lg px-3 py-2">
                    <span className="text-xs text-text-muted font-medium whitespace-nowrap">Risk:</span>
                    <input
                        type="number"
                        placeholder="Min"
                        className="w-16 bg-transparent outline-none text-sm"
                        min="0" max="100"
                        value={localFilters.riskMin || ''}
                        onChange={(e) => handleChange('riskMin', e.target.value)}
                    />
                    <span className="text-text-muted">-</span>
                    <input
                        type="number"
                        placeholder="Max"
                        className="w-16 bg-transparent outline-none text-sm"
                        min="0" max="100"
                        value={localFilters.riskMax || ''}
                        onChange={(e) => handleChange('riskMax', e.target.value)}
                    />
                </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 items-center">
                <span className="text-xs font-semibold text-text-muted uppercase tracking-wider mr-2">Quick Filters:</span>
                {['High Amount', 'International', 'New Device', 'Velocity Risk'].map(tag => (
                    <button
                        key={tag}
                        onClick={() => handleChange('tags', tag)}
                        className="px-3 py-1 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full text-xs text-text-muted transition-colors border border-transparent hover:border-border-subtle"
                    >
                        {tag}
                    </button>
                ))}

                <div className="flex-1"></div>

                <button
                    onClick={() => {
                        setLocalFilters({});
                        onClear();
                    }}
                    className="text-sm text-text-muted hover:text-red-500 transition-colors flex items-center gap-1"
                >
                    <X size={14} /> Clear All
                </button>
            </div>
        </div>
    );
};

export default TransactionFilters;
