import React from "react";
import type { DropdownProps } from "./types";
import { useDropdown } from "./useDropdown";

// import "./styles.scss";

const Dropdown: React.FC<DropdownProps> = ({
  placeholder = "Select an option",
  options,
  value,
  onChange,
  onClose,
  onOpen,
  renderOption,
}) => {
  const { isOpen, dropdownRef, toggle, handleSelect, selectedOption } = useDropdown({
    value,
    onChange,
    onClose,
    onOpen,
  });

  const normalizedOptions = options ?? [];

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        type="button"
        className="dropdown__header"
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedOption?.label ?? placeholder}
      </button>

      {isOpen && normalizedOptions.length > 0 && (
        <ul className="dropdown__list" role="listbox">
          {normalizedOptions.map(option => {
            const isSelected = selectedOption?.value === option.value;

            return (
              <li
                key={option.value}
                className={`dropdown__item ${isSelected ? "selected" : ""}`.trim()}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option)}
              >
                {renderOption ? renderOption(option) : option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default React.memo(Dropdown);
