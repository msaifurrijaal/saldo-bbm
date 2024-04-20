import React from "react";

type InputProps = {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  required?: boolean;
};

const Input = ({ type, name, id, placeholder, required }: InputProps) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      placeholder={placeholder}
      required={required}
    />
  );
};

export default Input;
