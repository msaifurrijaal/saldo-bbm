import React from "react";
import Label from "./Label";
import Input from "./Input";

type InputFormProps = {
  id: string;
  title: string;
  type: string;
  placeholder: string;
  required: boolean;
};

const InputForm = ({
  id,
  title,
  type,
  placeholder,
  required = false,
}: InputFormProps) => {
  return (
    <div>
      <Label htmlFor={id}>{title}</Label>
      <Input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default InputForm;
