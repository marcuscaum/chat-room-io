import React, { ButtonHTMLAttributes } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

const Button: React.FC<IButton> = ({
  children,
  type,
  onClick,
  fullWidth,
  className,
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`p-2 text-sm disabled:bg-gray-300 rounded-md bg-green-500 active:bg-green-700 text-white transition duration-300 ease-in-out ${
        fullWidth && "w-full"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
