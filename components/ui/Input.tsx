"use client";

import { Input as AntDInput } from "antd";

type InputProps = React.ComponentProps<typeof AntDInput>;

export function Input(props: InputProps) {
  return (
    <AntDInput {...props} className={props.className + " !rounded-full"} />
  );
}

export function PasswordInput(props: InputProps) {
  return (
    <AntDInput.Password
      {...props}
      className={props.className + " !rounded-full"}
    />
  );
}
