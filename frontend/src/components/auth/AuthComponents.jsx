import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../lib/utils';

export const AuthInput = React.forwardRef(({ label, error, className, ...props }, ref) => {
    return (
        <div className="space-y-1.5">
            {label && <label className="text-sm font-medium text-text-primary ml-1">{label}</label>}
            <input
                ref={ref}
                className={cn(
                    "w-full px-4 py-3 rounded-xl border border-border-subtle bg-white/40 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all placeholder:text-text-muted/60 text-text-primary",
                    error && "border-status-error focus:ring-status-error/30 focus:border-status-error",
                    className
                )}
                {...props}
            />
            {error && <p className="text-xs text-status-error ml-1 font-medium">{error.message}</p>}
        </div>
    );
});

export const PasswordInput = React.forwardRef(({ label, error, className, ...props }, ref) => {
    const [show, setShow] = useState(false);

    return (
        <div className="space-y-1.5">
            {label && <label className="text-sm font-medium text-text-primary ml-1">{label}</label>}
            <div className="relative">
                <input
                    type={show ? 'text' : 'password'}
                    ref={ref}
                    className={cn(
                        "w-full px-4 py-3 rounded-xl border border-border-subtle bg-white/40 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all placeholder:text-text-muted/60 text-text-primary pr-12",
                        error && "border-status-error focus:ring-status-error/30 focus:border-status-error",
                        className
                    )}
                    {...props}
                />
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors"
                >
                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
            {error && <p className="text-xs text-status-error ml-1 font-medium">{error.message}</p>}
        </div>
    );
});

export const SocialButton = ({ icon: Icon, children, onClick, className }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-border-subtle bg-white/60 hover:bg-white shadow-sm hover:shadow-md transition-all duration-200 text-text-primary font-medium",
                className
            )}
        >
            {Icon && <Icon className="h-5 w-5" />}
            {children}
        </button>
    );
};
