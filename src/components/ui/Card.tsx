import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'filled' | 'outlined';
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'outlined',
  className = '',
  onClick,
  hoverable = false,
}) => {
  const baseStyles = 'rounded-[24px] p-6 transition-all duration-300 overflow-hidden';
  
  const variants = {
    elevated: 'bg-white dark:bg-slate-900 shadow-md border border-gray-100/50 dark:border-slate-800/50',
    filled: 'bg-slate-50 dark:bg-slate-900/60 border border-transparent',
    outlined: 'bg-transparent border border-slate-200 dark:border-slate-800',
  };

  const hoverStyle = hoverable
    ? 'hover:shadow-lg hover:-translate-y-1 hover:border-primary/20 dark:hover:border-cyan-500/20 cursor-pointer'
    : '';

  if (onClick || hoverable) {
    return (
      <motion.div
        whileHover={hoverable ? { y: -4, transition: { duration: 0.2 } } : {}}
        whileTap={onClick ? { scale: 0.99 } : {}}
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]} ${hoverStyle} ${className}`}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};
