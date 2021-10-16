import React, { InputHTMLAttributes } from "react";

interface ITextField extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  error?: string;
  fullWidth?: boolean;
}

export const TextFieldStyle =
  "p-2 break-words transition-all ease-in-out duration-300 bg-white rounded-md border-blue-200 border outline-none focus:ring-2 focus:ring-blue-300 text-gray-500";

const TextField: React.FC<ITextField> = ({
  label,
  name,
  error,
  type,
  placeholder,
  fullWidth,
}) => {
  return (
    <>
      <div className="mb-6">
        {error && <span className="text-red-700">{error}</span>}
        {label && !error && <span className="block">{label}</span>}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className={`${TextFieldStyle} ${fullWidth ? "w-full" : "w-1/2"}`}
        />
      </div>
    </>
  );
};

export default TextField;
