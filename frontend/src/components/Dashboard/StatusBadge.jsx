import React from 'react';
import { getStatusColor } from '../../utils/transactionHelpers';
import { cn } from '../../utils/transactionHelpers';

const StatusBadge = ({ status }) => {
    return (
        <span
            className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                getStatusColor(status)
            )}
        >
            {status}
        </span>
    );
};

export default StatusBadge;
