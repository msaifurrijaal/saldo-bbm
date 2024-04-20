import React from "react";

type LabelProps = {
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
};

const Label = ({ htmlFor, children }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium text-gray-900 block mb-2"
    >
      {children}
    </label>
  );
};

export default Label;
