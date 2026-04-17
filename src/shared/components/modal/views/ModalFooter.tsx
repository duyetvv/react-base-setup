import React from "react";
import type { IModalSectionProps } from "../Modal.types";

const BASE_CLASS = "modal__footer";

export const ModalFooter: React.FC<IModalSectionProps> = ({
  children,
  className = "",
}) => <div className={`${BASE_CLASS} ${className}`.trim()}>{children}</div>;

ModalFooter.displayName = "ModalFooter";
