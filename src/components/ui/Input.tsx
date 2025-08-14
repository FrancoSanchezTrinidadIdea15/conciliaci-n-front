import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id || props.name || undefined;

    return (
      <div className="space-y-1">
        {label ? (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        ) : null}
        <input
          id={inputId}
          ref={ref}
          className={`block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-black focus:ring-0 ${className}`}
          {...props}
        />
        {error ? (
          <p className="text-xs text-red-600">{error}</p>
        ) : null}
      </div>
    );
  }
);
