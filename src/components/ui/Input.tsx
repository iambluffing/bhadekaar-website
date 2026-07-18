import React, { useId, useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  onFocus,
  onBlur,
  ...props
}) => {
  const id = useId();
  const [focused, setFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(e.target.value !== '');
    if (onBlur) onBlur(e);
  };

  const isFloating = focused || (props.value !== undefined && props.value !== '') || props.placeholder;

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative">
        <input
          id={id}
          className={`peer w-full rounded-2xl border bg-transparent px-4 py-3.5 font-sans text-sm text-slate-900 transition-all outline-none dark:text-slate-100
            ${error 
              ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
              : 'border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary dark:border-slate-700 dark:focus:border-cyan-400 dark:focus:ring-cyan-400'
            }
          `}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        <label
          htmlFor={id}
          className={`absolute left-4 top-1/2 -translate-y-1/2 font-sans text-sm transition-all duration-200 pointer-events-none origin-left
            ${isFloating
              ? 'top-0 -translate-y-1/2 scale-85 bg-white px-1.5 text-xs dark:bg-slate-950 ' + 
                (error ? 'text-red-500' : 'text-primary dark:text-cyan-400')
              : 'text-slate-500 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:scale-85 peer-focus:bg-white peer-focus:px-1.5 peer-focus:text-xs peer-focus:text-primary dark:peer-focus:bg-slate-950 dark:peer-focus:text-cyan-400'
            }
          `}
        >
          {label}
        </label>
      </div>
      {error && (
        <span className="mt-1 text-xs text-red-500 font-sans block pl-2">
          {error}
        </span>
      )}
      {!error && helperText && (
        <span className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-sans block pl-2">
          {helperText}
        </span>
      )}
    </div>
  );
};
