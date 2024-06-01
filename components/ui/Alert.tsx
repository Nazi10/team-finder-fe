"use client";

import { Alert as AntDAlert } from "antd";

type AlertProps = React.ComponentProps<typeof AntDAlert>;

export default function Alert(props: AlertProps) {
  return (
    <AntDAlert {...props} className="!rounded-full !p-0 !px-3 !text-red-500" />
  );
}
