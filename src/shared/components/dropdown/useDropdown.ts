import { useState, useRef, useEffect, useCallback } from 'react';
import type { Option } from './types';

interface UseDropdownProps {
  value?: Option;
  onChange: (option: Option) => void;
  onClose?: () => void;
  onOpen?: () => void;
}

export const useDropdown = ({ value, onChange, onClose, onOpen }: UseDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleSelect = useCallback(
    (option: Option) => {
      onChange(option);
      close();
    },
    [onChange, close]
  );

  useEffect(() => {
    if (isOpen) {
      onOpen?.();
    } else {
      onClose?.();
    }
  }, [isOpen, onClose, onOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, close]);

  return {
    isOpen,
    dropdownRef,
    open,
    close,
    toggle,
    handleSelect,
    selectedOption: value,
  };
};
