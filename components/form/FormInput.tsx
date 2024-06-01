"use client";

import Alert from "../ui/Alert";
import { Input } from "../ui/Input";

interface FormInputProps {
  name: string;
  error?: string;
  placeholder: string;
  label?: string;
  type?: string;
  optional?: boolean;
  defaultValue?: string | number;
  className?: string;
  disabled?: boolean;
}

export default function FormInput(props: FormInputProps) {
  const { name, error, placeholder, label, optional, defaultValue, disabled } =
    props;

  return (
    <>
      <div className="w-full">
        {label ? (
          <div className="flex">
            <label className="flex self-start pb-1.5 text-sm font-medium leading-normal">
              {label}
              {optional ? (
                <p className="text-gray-500">(Optional)</p>
              ) : (
                <p className="text-red-500">*</p>
              )}
            </label>
          </div>
        ) : null}
        <div className="space-y-2">
          <Input
            name={name}
            type={props.type ?? "text"}
            placeholder={placeholder}
            defaultValue={defaultValue}
            className={`!rounded-full px-3 py-2 ${props.className}`}
            disabled={disabled}
          />
          {error ? <Alert type="error" message={error} /> : null}
        </div>
      </div>
    </>
  );
}
