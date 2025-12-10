import React from 'react';
import { cn } from '../../utils/transactionHelpers';
import { Plus } from 'lucide-react';

const SavedViews = ({ currentView, onViewChange, counts }) => {
    const views = [
        { id: 'all', label: 'All Transactions' },
        { id: 'high_risk', label: 'High Risk', count: counts?.high_risk },
        { id: 'pending', label: 'Pending Review', count: counts?.pending },
        { id: 'chargebacks', label: 'Chargebacks', count: counts?.chargebacks },
        { id: 'recent', label: 'Recent (24h)' },
    ];

    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {views.map((view) => (
                <button
                    key={view.id}
                    onClick={() => onViewChange(view.id)}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border",
                        currentView === view.id
                            ? "bg-primary/10 border-primary text-primary"
                            : "bg-white dark:bg-gray-800 border-border-subtle text-text-muted hover:border-text-muted hover:text-text-primary"
                    )}
                >
                    {view.label}
                    {view.count !== undefined && (
                        <span className={cn(
                            "px-1.5 py-0.5 rounded-full text-xs",
                            currentView === view.id ? "bg-primary/20 text-primary" : "bg-gray-100 dark:bg-gray-700 text-text-muted"
                        )}>
                            {view.count}
                        </span>
                    )}
                </button>
            ))}

            <button className="flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium border border-dashed border-border-subtle text-text-muted hover:text-primary hover:border-primary transition-colors whitespace-nowrap">
                <Plus size={14} />
                <span>New View</span>
            </button>
        </div>
    );
};

export default SavedViews;
