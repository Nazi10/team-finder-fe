"use client";

import Alert from "../ui/Alert";
import { PasswordInput } from "../ui/Input";

type FormInputProps = {
  name: string;
  error?: string;
  placeholder: string;
  label?: string;
  defaultValue?: string;
  optional?: boolean;
  className?: string;
};

export default function FormPasswordInput(props: FormInputProps) {
  const { name, error, placeholder, label, defaultValue, optional, className } =
    props;

  return (
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
        <PasswordInput
          name={name}
          placeholder={placeholder}
          className={`px-3 py-2 ${className}`}
          defaultValue={defaultValue}
        />
        {error ? <Alert type="error" className="p-5" message={error} /> : null}
      </div>
    </div>
  );
}
