"use client";

import type { SelectProps } from "antd/es/select";
import { Select as AntdSelect } from "antd";

export default function Select(props: SelectProps) {
  return (
    <AntdSelect
      filterOption={false}
      {...props}
      className={`w-full ${props.className}}`}
    />
  );
}
