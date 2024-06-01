"use client";

import type { CheckboxProps as AntdCheckboxProps } from "antd";
import { Checkbox as AntDCheckbox } from "antd";

type CheckboxProps = AntdCheckboxProps;

export default function Checkbox(props: CheckboxProps) {
  return <AntDCheckbox {...props} />;
}
