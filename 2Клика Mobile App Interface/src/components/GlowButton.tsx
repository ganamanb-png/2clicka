import React from 'react';

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
}

export const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false
}) => {
  if (variant === 'primary') {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          relative px-6 py-3 rounded-2xl bg-[#0A84FF] text-white
          shadow-[0_0_20px_rgba(10,132,255,0.5)]
          hover:shadow-[0_0_30px_rgba(10,132,255,0.8)]
          active:scale-95
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative px-6 py-3 rounded-2xl
        bg-white/10 backdrop-blur-md
        border border-white/20
        text-white
        hover:bg-white/15
        active:scale-95
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
};
