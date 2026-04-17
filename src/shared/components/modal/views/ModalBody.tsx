import React from "react";
import type { IModalSectionProps } from "../Modal.types";

const BASE_CLASS = "modal__body";

export const ModalBody: React.FC<IModalSectionProps> = ({
  children,
  className = "",
}) => <div className={`${BASE_CLASS} ${className}`.trim()}>{children}</div>;

ModalBody.displayName = "ModalBody";
