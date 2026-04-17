import { useState, useCallback } from 'react';

/**
 * @name useToggle
 * @description A hook to manage a boolean state, with a function to toggle it.
 * @param {boolean} [initialState=false] - The initial state of the toggle.
 * @returns {[boolean, () => void]} - A tuple with the current state and a function to toggle it.
 *
 * @example
 * const MyComponent = () => {
 *   const [isOpen, toggleOpen] = useToggle(false);
 *
 *   return (
 *     <div>
 *       <button onClick={toggleOpen}>
 *         {isOpen ? 'Close' : 'Open'}
 *       </button>
 *       {isOpen && <div>Content</div>}
 *     </div>
 *   );
 * };
 */
const useToggle = (initialState: boolean = false): [boolean, () => void] => {
  const [state, setState] = useState<boolean>(initialState);

  const toggle = useCallback(() => {
    setState(prevState => !prevState);
  }, []);

  return [state, toggle];
};

export default useToggle;
