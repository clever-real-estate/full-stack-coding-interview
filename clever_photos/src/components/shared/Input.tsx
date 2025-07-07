import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string | React.ReactNode;
  error?: string;
  trailingIcon?: React.ReactNode;
}

export const Input = ({ label, error, trailingIcon, ...props }: InputProps) => {
  return (
    <div className="mb-4">
      {typeof label === "string" ? (
        <label
          htmlFor={props.id}
          className="block text-sm font-bold text-black mb-2"
        >
          {label}
        </label>
      ) : (
        label
      )}
      <div className="relative">
        <input
          {...props}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white focus:bg-white auto-fill-data"
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        {trailingIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {trailingIcon}
          </div>
        )}
      </div>
    </div>
  );
};
