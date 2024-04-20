"use client";
import React, { ReactNode, MouseEvent } from "react";

type ButtonProps = {
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled: boolean;
};

const Button = ({
  type,
  className = "w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center",
  disabled = false,
  children,
}: ButtonProps) => {
  return (
    <button type={type} className={className} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
