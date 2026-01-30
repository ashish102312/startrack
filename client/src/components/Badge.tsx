import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant: 'red' | 'amber' | 'green' | 'blue' | 'gray';
}

export const Badge = ({ children, variant }: BadgeProps) => {
    const variants = {
        red: 'text-red-500 bg-red-500/10 border-red-500/20',
        amber: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
        green: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
        blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
        gray: 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20',
    };

    return (
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${variants[variant]}`}>
            {children}
        </span>
    );
};
