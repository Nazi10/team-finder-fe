"use client";

import type {
  IconType,
  NotificationPlacement,
} from "antd/es/notification/interface";
import type { CSSProperties, ReactNode } from "react";
import React from "react";
import { notification } from "antd";

const classNameMappingForEachType = new Map<string, string>([
  ["error", "notification_error"],
  ["success", "notification_success"],
  ["info", "notification_info"],
  ["warning", "notification_warning"],
]);

interface NotificationProps {
  message: ReactNode;
  description?: ReactNode;
  btn?: ReactNode;
  key?: string;
  onClose?: () => void;
  duration?: number | null;
  icon?: ReactNode;
  placement?: NotificationPlacement;
  style?: CSSProperties;
  readonly type?: IconType;
  onClick?: () => void;
  top?: number;
  bottom?: number;
  closeIcon?: ReactNode;
  className?: string;
}

class Component extends React.Component {
  static open = (args: NotificationProps) => {
    const props = { ...args };
    props.className = `${props.className} ${classNameMappingForEachType.get(
      props.type ?? "info",
    )}`;
    return notification.open({ ...props });
  };

  static success = (message: string, placement?: NotificationPlacement) => {
    return notification.open({
      message,
      placement,
      type: "success",
    });
  };

  static error = (
    message: string,
    placement?: NotificationPlacement,
    onClick?: () => void,
  ) => {
    return notification.open({
      message,
      placement,
      type: "error",
      onClick: onClick,
    });
  };
}

export { Component as notification };
