import React from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, type = "text", error, ...rest }, ref) => {
    return (
      <>
        <input
          ref={ref}
          type={type}
          id={id}
          className={`bg-white border-1 rounded-lg ${
            error ? "border-red-500" : "border-[#b0b0b0]"
          } p-1 outline-black text-right font-vazir pr-2 text-[14px] sm:text-[16px] sm:w-[320px] w-[250px]`}
          {...rest}
        />
        {error && (
          <span className="sm:text-[14px] text-[12px] text-red-500 font-vazir">
            {error.message}
          </span>
        )}
      </>
    );
  }
);

Input.displayName = "Input"; // Required when using forwardRef

export default Input;
