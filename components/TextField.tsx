import React, { ForwardedRef, InputHTMLAttributes } from "react";

interface ITextField extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  error?: string;
  fullWidth?: boolean;
}

export const TextFieldStyle =
  "p-2 break-words transition-all ease-in-out duration-300 bg-white rounded-md outline-none text-gray-500 border";

const TextField = (
  {
    label,
    name,
    error,
    type,
    placeholder,
    fullWidth,
    ...restProps
  }: ITextField,
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <>
      <div className="mb-6">
        {label && (
          <span className="block mb-2 text-xs text-gray-400">{label}</span>
        )}
        <input
          type={type}
          name={name}
          ref={ref}
          placeholder={placeholder}
          className={`${TextFieldStyle} ${fullWidth ? "w-full" : "w-1/2"} ${
            error ? "focus:border-red-300" : "focus:border-blue-200  "
          }`}
          {...restProps}
        />
        {error && <span className="text-red-700 text-xs">{error}</span>}
      </div>
    </>
  );
};

export default React.forwardRef<HTMLInputElement, ITextField>(TextField);
