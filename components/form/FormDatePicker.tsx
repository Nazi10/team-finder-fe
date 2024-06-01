"use client";

import Alert from "../ui/Alert";
import DatePicker from "../ui/DatePicker";

type FormDatePickerProps = {
  name: string;
  error?: string;
  label?: string;
  optional?: boolean;
  disabledDate?: (date: Date) => boolean;
  defaultValue?: Date;
  placeholder: string;
  onChange?: (startDate: Date | null) => void;
  value?: Date | null;
};

export default function FormDatePicker(props: FormDatePickerProps) {
  const {
    name,
    error,
    label,
    optional,
    placeholder,
    disabledDate,
    defaultValue,
    onChange,
    value,
  } = props;

  return (
    <div className="w-full">
      {label ? (
        <label className="flex self-start pb-1.5 text-sm font-medium leading-normal">
          {label}
          {optional ? (
            <p className="text-gray-500">(Optional)</p>
          ) : (
            <p className="text-red-500">*</p>
          )}
        </label>
      ) : null}

      <div className="space-y-2">
        <DatePicker
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          size="large"
          picker="date"
          className="!w-full !rounded-full"
          disabledDate={disabledDate}
          onChange={onChange}
          value={value}
        />
        <div>{error ? <Alert type="error" message={error} /> : null}</div>
      </div>
    </div>
  );
}
