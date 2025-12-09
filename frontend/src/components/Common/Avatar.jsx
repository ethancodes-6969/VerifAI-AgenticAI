import React from 'react';
import { cn } from '../../utils/transactionHelpers';

const Avatar = ({ name, email, src, size = 'md', className }) => {
    const initials = name
        ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        : 'U';

    const sizeClass = {
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-16 w-16 text-xl',
    }[size];

    return (
        <div className={cn("relative inline-block", className)}>
            {src ? (
                <img
                    src={src}
                    alt={name}
                    className={cn("rounded-full object-cover border border-border-subtle", sizeClass)}
                />
            ) : (
                <div className={cn("rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold border border-primary/20", sizeClass)}>
                    {initials}
                </div>
            )}
        </div>
    );
};

export default Avatar;
