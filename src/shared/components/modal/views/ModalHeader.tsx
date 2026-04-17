import React from "react";
import type { IModalSectionProps } from "../Modal.types";

const BASE_CLASS = "modal__header";

export const ModalHeader: React.FC<IModalSectionProps> = ({
  children,
  className = "",
}) => <div className={`${BASE_CLASS} ${className}`.trim()}>{children}</div>;

ModalHeader.displayName = "ModalHeader";
