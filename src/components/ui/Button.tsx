import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asLink?: boolean;
  href?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  asLink = false,
  href = '#',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coconut-lime focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-full cursor-pointer tracking-wide';

  const variants = {
    primary: 'bg-coconut-lime text-coconut-dark hover:bg-[#c9ea6b] active:scale-95 shadow-lg shadow-coconut-lime/10',
    secondary: 'bg-coconut-cream text-coconut-dark hover:bg-white active:scale-95',
    outline: 'border border-coconut-cream/30 text-coconut-cream hover:border-coconut-cream hover:bg-coconut-cream/10 active:scale-95',
    ghost: 'text-coconut-cream/80 hover:text-coconut-cream hover:bg-coconut-cream/5 active:scale-95',
  };

  const sizes = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-3 gap-2',
    lg: 'text-base px-8 py-4 gap-2.5 font-semibold',
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (asLink) {
    return (
      <a href={href} className={combinedClasses} role="link">
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};
