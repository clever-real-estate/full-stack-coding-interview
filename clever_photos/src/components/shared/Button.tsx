import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className="bg-blue-500 text-white p-2 rounded-lg w-full cursor-pointer"
      {...props}
    >
      {children}
    </button>
  );
};
