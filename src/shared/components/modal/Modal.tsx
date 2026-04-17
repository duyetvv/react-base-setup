import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { ModalFooter } from "./views/ModalFooter";
import { ModalHeader } from "./views/ModalHeader";
import { ModalBody } from "./views/ModalBody";
import { ModalView } from "./views/ModalView";

import type { IModalProps } from "./Modal.types";
import { ensurePortalContainer, removePortalContainer } from "./Modal.helpers";

import "./styles.scss";

export const Modal = ({
  isOpen,
  onClose,
  children,
  className = "",
  closeOnBackdropClick = true,
  closeOnEsc = true,
}: IModalProps) => {
  const portalRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    portalRef.current = ensurePortalContainer();

    return () => {
      removePortalContainer();
      portalRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeOnEsc, onClose]);

  if (!portalRef.current) {
    return null;
  }

  return createPortal(
    <ModalView
      isOpen={isOpen}
      onClose={onClose}
      className={className}
      closeOnBackdropClick={closeOnBackdropClick}
    >
      {children}
    </ModalView>,
    portalRef.current,
  );
};

Modal.displayName = "Modal";
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
