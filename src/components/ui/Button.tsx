import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'filled' | 'elevated' | 'tonal' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'filled',
  color = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'm3-ripple inline-flex items-center justify-center font-display font-semibold text-sm h-10 px-6 rounded-full transition-shadow duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const widthStyle = fullWidth ? 'w-full' : '';

  // M3 Colors
  const colors = {
    primary: {
      filled: 'bg-primary text-white hover:bg-primary-hover shadow-sm',
      elevated: 'bg-white dark:bg-m3-surface-variant-dark text-primary border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-lg',
      tonal: 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-cyan-400 hover:bg-primary/15',
      outlined: 'border border-m3-outline dark:border-m3-outline-dark text-primary hover:bg-primary/5',
      text: 'text-primary hover:bg-primary/5',
    },
    secondary: {
      filled: 'bg-secondary text-white hover:bg-secondary-hover shadow-sm',
      elevated: 'bg-white dark:bg-m3-surface-variant-dark text-secondary border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-lg',
      tonal: 'bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-cyan-400 hover:bg-secondary/15',
      outlined: 'border border-m3-outline dark:border-m3-outline-dark text-secondary hover:bg-secondary/5',
      text: 'text-secondary hover:bg-secondary/5',
    },
    error: {
      filled: 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
      elevated: 'bg-white dark:bg-m3-surface-variant-dark text-red-600 border border-gray-100 dark:border-gray-800 shadow-md',
      tonal: 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 hover:bg-red-100/50',
      outlined: 'border border-red-300 dark:border-red-800 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20',
      text: 'text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20',
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${widthStyle} ${colors[color][variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
