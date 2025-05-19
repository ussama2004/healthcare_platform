import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  labelClassName?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  labelClassName = '',
  ...rest
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className={`form-label ${labelClassName}`}>
          {label}
        </label>
      )}
      <input
        className={`form-input ${error ? 'border-error-500 focus:ring-error-500' : ''} ${className}`}
        {...rest}
      />
      {error && (
        <p className="mt-1 text-sm text-error-600">{error}</p>
      )}
    </div>
  );
};

export default Input;