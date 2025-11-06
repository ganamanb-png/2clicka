import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white/5 backdrop-blur-md
        border border-white/10
        rounded-3xl
        p-4
        shadow-lg
        ${onClick ? 'cursor-pointer hover:bg-white/10 active:scale-98' : ''}
        transition-all duration-200
        ${className}
      `}
    >
      {children}
    </div>
  );
};
