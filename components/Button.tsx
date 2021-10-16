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
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`p-2 text-sm rounded-md bg-green-500 hover:bg-green-700 text-white transition duration-300 ease-in-out ${
        fullWidth && "w-full"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
