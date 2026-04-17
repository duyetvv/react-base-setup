export interface Option {
  value: string;
  label: string;
}

export interface DropdownProps {
  placeholder?: string;
  options: Option[];
  value?: Option;
  onChange: (option: Option) => void;
  onClose?: () => void;
  onOpen?: () => void;
  renderOption?: (option: Option) => React.ReactNode;
}

