import { useEffect, type RefObject } from "react";

/**
 * @name useFocusTrap
 * @description A hook to trap focus within a specified element.
 * @param {RefObject<HTMLElement>} ref - The ref of the element to trap focus within.
 * @param {boolean} [active=true] - Whether the focus trap is active.
 *
 * @example
 * const Modal = ({ isOpen, onClose }) => {
 *   const modalRef = useRef(null);
 *   useFocusTrap(modalRef, isOpen);
 *
 *   if (!isOpen) return null;
 *
 *   return (
 *     <div ref={modalRef} role="dialog" aria-modal="true">
 *       <h2>Modal Title</h2>
 *       <p>This is a modal. Focus is trapped inside.</p>
 *       <button>A focusable button</button>
 *       <button onClick={onClose}>Close</button>
 *     </div>
 *   );
 * };
 */
const useFocusTrap = (ref: RefObject<HTMLElement>, active: boolean = true) => {
  useEffect(() => {
    if (!active || !ref.current) {
      return;
    }

    const focusableElements = ref.current.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
    );

    if (focusableElements.length === 0) {
      return;
    }

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") {
        return;
      }

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    };

    const currentRef = ref.current;
    currentRef.addEventListener("keydown", handleKeyDown);

    // Focus the first element when the trap becomes active
    firstElement.focus();

    return () => {
      currentRef.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, active]);
};

export default useFocusTrap;
