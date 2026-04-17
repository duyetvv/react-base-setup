import React from "react";
import type { IModalViewProps } from "../Modal.types";

export const ModalView: React.FC<IModalViewProps> = ({
  isOpen,
  onClose,
  className,
  closeOnBackdropClick,
  children,
}) => {
  const onBackdropClick = (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    evt.preventDefault();

    if (closeOnBackdropClick && typeof onClose === "function") {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal__overlay"
      onClick={onBackdropClick}
      role="presentation"
    >
      <div
        className={`modal__container ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        onClick={(evt) => evt.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
