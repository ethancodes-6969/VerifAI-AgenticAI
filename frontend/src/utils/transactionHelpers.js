import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
};

export const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    }).format(new Date(dateString));
};

export const getRiskColor = (score) => {
    if (score >= 80) return 'text-status-error';
    if (score >= 50) return 'text-status-warning';
    return 'text-status-success';
};

export const getRiskBgColor = (score) => {
    if (score >= 80) return 'bg-status-error';
    if (score >= 50) return 'bg-status-warning';
    return 'bg-status-success';
};

export const getStatusColor = (status) => {
    switch (status) {
        case 'APPROVED': return 'bg-status-success/10 text-status-success border-status-success/20';
        case 'BLOCKED': return 'bg-status-error/10 text-status-error border-status-error/20';
        case 'HOLD': return 'bg-status-warning/10 text-status-warning border-status-warning/20';
        default: return 'bg-gray-100 text-gray-600';
    }
};
