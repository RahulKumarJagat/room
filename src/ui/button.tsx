import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
  
  const variantStyles = {
    default: "glass-button text-blue-600",
    outline: "glass-button text-gray-700",
    destructive: "bg-gradient-to-r from-red-500/80 to-red-600/80 backdrop-blur-sm text-white border border-red-400/30 hover:from-red-600/80 hover:to-red-700/80"
  };
  
  const sizeStyles = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-2",
    lg: "text-base px-4 py-3"
  };
  
  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};