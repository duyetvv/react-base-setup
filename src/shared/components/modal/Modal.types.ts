import { type ReactNode } from "react";

export interface IModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  ariaLabel?: string;
  backdropClassName?: string;
  closeOnBackdropClick?: boolean;
  closeOnEsc?: boolean;
}

export interface IModalViewProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  closeOnBackdropClick?: boolean;
}

export interface IModalSectionProps {
  children: ReactNode;
  className?: string;
}

export interface IModalContext {
  isOpen: boolean;
  toggleIsOpen: (isOpen: boolean) => void;
}
